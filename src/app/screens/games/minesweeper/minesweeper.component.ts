import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerBomb, tablerChevronDown, tablerClick, tablerRefresh } from '@ng-icons/tabler-icons';
import { tablerBombFill, tablerFlag3Fill } from '@ng-icons/tabler-icons/fill';

import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import {
  MINES_LEVELS,
  act,
  canChord,
  chord,
  createBoard,
  levelConfig,
  minesLeft,
  toggleFlag,
} from 'src/app/utils/minesweeper';
import type { MinesBoard, MinesLevel, MinesMode } from 'src/app/utils/minesweeper';
import { useGameSeo } from '../game-seo';
import { GameShareButtonComponent } from '../shared/game-share-button.component';
import { GameTimer, formatDuration } from '../shared/game-timer';

type CellKind = 'hidden' | 'flag' | 'open' | 'mine' | 'boom' | 'wrong';

interface CellView {
  kind: CellKind;
  /** Number shown on an open cell (0 = blank). */
  n: number;
  label: string;
}

/** Long-press duration that places a flag on touch screens. */
const LONG_PRESS_MS = 350;
/** Finger travel that turns a press into a scroll. */
const MOVE_TOLERANCE = 10;
const BEST_KEY = 'minesweeper-best-v1';
/** Widest board per level, so cells stay finger-sized without filling a desktop screen. */
const BOARD_MAX: Record<MinesLevel, string> = { easy: '25rem', medium: '31rem', hard: '38rem' };

interface Press {
  id: number;
  index: number;
  x: number;
  y: number;
  long: boolean;
  timer: ReturnType<typeof setTimeout> | null;
}

@Component({
  selector: 'app-minesweeper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, NgIconComponent, GameShareButtonComponent],
  providers: [
    provideIcons({ tablerBomb, tablerBombFill, tablerFlag3Fill, tablerRefresh, tablerClick, tablerChevronDown }),
  ],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.css',
})
export class MinesweeperComponent {
  private readonly translate = inject(TranslateService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly grid = viewChild<ElementRef<HTMLElement>>('grid');

  readonly levels = MINES_LEVELS;
  readonly timer = new GameTimer();
  readonly level = signal<MinesLevel>('easy');
  readonly mode = signal<MinesMode>('reveal');
  readonly board = signal<MinesBoard>(this.blankBoard('easy'));
  readonly focusIndex = signal(0);
  readonly bestTimes = signal<Partial<Record<MinesLevel, number>>>({});
  readonly newRecord = signal(false);
  readonly announcement = signal('');

  readonly status = computed(() => this.board().status);
  readonly ended = computed(() => this.status() === 'won' || this.status() === 'lost');
  readonly minesLeft = computed(() => minesLeft(this.board()));
  readonly best = computed(() => this.bestTimes()[this.level()]);
  readonly bestLabel = computed(() => {
    const best = this.best();
    return best === undefined ? '' : formatDuration(best);
  });
  readonly boardWidth = computed(() => `min(calc(100vw - 8px), ${BOARD_MAX[this.level()]})`);
  readonly percentCleared = computed(() => {
    const b = this.board();
    return Math.floor((b.revealed / (b.rows * b.cols - b.mineCount)) * 100);
  });
  readonly levelName = computed(() => this.t(`minesweeper.levels.${this.level()}`));
  readonly wonText = computed(() =>
    fill(this.t('minesweeper.wonText'), { level: this.levelName(), time: this.timer.label() }),
  );
  readonly lostText = computed(() =>
    fill(this.t('minesweeper.lostText'), { percent: this.percentCleared(), time: this.timer.label() }),
  );
  readonly shareText = computed(() =>
    fill(this.t(this.status() === 'won' ? 'minesweeper.shareWon' : 'minesweeper.shareLost'), {
      level: this.levelName(),
      time: this.timer.label(),
      percent: this.percentCleared(),
    }),
  );
  readonly boardLabel = computed(() =>
    fill(this.t('minesweeper.boardLabel'), { rows: this.board().rows, cols: this.board().cols }),
  );

  readonly cells = computed<CellView[]>(() => {
    const b = this.board();
    const lost = b.status === 'lost';
    const words = {
      position: this.t('minesweeper.cell.position'),
      hidden: this.t('minesweeper.cell.hidden'),
      flag: this.t('minesweeper.cell.flagged'),
      open: this.t('minesweeper.cell.empty'),
      number: this.t('minesweeper.cell.number'),
      mine: this.t('minesweeper.cell.mine'),
      boom: this.t('minesweeper.cell.exploded'),
      wrong: this.t('minesweeper.cell.wrongFlag'),
    };
    return b.state.map((state, i) => {
      let kind: CellKind = state === 'revealed' ? 'open' : state === 'flagged' ? 'flag' : 'hidden';
      if (lost) {
        if (i === b.exploded) kind = 'boom';
        else if (b.mines[i] && state === 'hidden') kind = 'mine';
        else if (!b.mines[i] && state === 'flagged') kind = 'wrong';
      }
      const n = kind === 'open' ? b.adjacent[i] : 0;
      const what = n > 0 ? fill(words.number, { n }) : words[kind];
      const where = fill(words.position, { row: Math.floor(i / b.cols) + 1, col: (i % b.cols) + 1 });
      return { kind, n, label: `${where}: ${what}` };
    });
  });

  readonly faqKeys = [1, 2, 3, 4];
  readonly stepKeys = [1, 2, 3, 4];

  private seed = 1;
  private press: Press | null = null;
  private lastPointerType = 'mouse';

  constructor() {
    useGameSeo('minesweeper', 'minesweeper.seo', () => [this.faqJsonLd()]);
    afterNextRender(() => {
      this.bestTimes.set(readBest());
      this.newGame();
    });
  }

  setLevel(level: MinesLevel): void {
    this.level.set(level);
    this.newGame();
  }

  newGame(): void {
    this.clearPress();
    this.seed = this.isBrowser ? Math.floor(Math.random() * 2 ** 32) : 1;
    this.board.set(this.blankBoard(this.level()));
    this.timer.reset();
    this.newRecord.set(false);
    this.announcement.set('');
    this.focusIndex.update((i) => Math.min(i, this.board().state.length - 1));
  }

  // --- Pointer input: one path for mouse, touch and pen; `click` is never used, so nothing fires twice.

  onPointerDown(event: PointerEvent): void {
    const index = cellIndex(event);
    this.lastPointerType = event.pointerType;
    if (index < 0 || (event.pointerType === 'mouse' && event.button !== 0)) return;
    this.clearPress();
    const press: Press = { id: event.pointerId, index, x: event.clientX, y: event.clientY, long: false, timer: null };
    if (event.pointerType !== 'mouse') {
      press.timer = setTimeout(() => {
        press.long = true;
        press.timer = null;
        this.flagAt(index, true);
      }, LONG_PRESS_MS);
    }
    this.press = press;
  }

  onPointerMove(event: PointerEvent): void {
    const press = this.press;
    if (!press || press.id !== event.pointerId) return;
    if (Math.hypot(event.clientX - press.x, event.clientY - press.y) > MOVE_TOLERANCE) this.clearPress();
  }

  onPointerUp(event: PointerEvent): void {
    const press = this.press;
    if (!press || press.id !== event.pointerId) return;
    this.clearPress();
    if (!press.long) {
      this.focusIndex.set(press.index);
      this.play(press.index);
    }
  }

  clearPress(): void {
    if (this.press?.timer) clearTimeout(this.press.timer);
    this.press = null;
  }

  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    // Touch long-presses also fire contextmenu; they are handled by the long-press timer.
    if (this.lastPointerType !== 'mouse') return;
    const index = cellIndex(event);
    if (index >= 0) {
      this.focusIndex.set(index);
      this.flagAt(index);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    const b = this.board();
    const i = this.focusIndex();
    const row = Math.floor(i / b.cols);
    const col = i % b.cols;
    let next = -1;
    switch (event.key) {
      case 'ArrowUp': next = row > 0 ? i - b.cols : i; break;
      case 'ArrowDown': next = row < b.rows - 1 ? i + b.cols : i; break;
      case 'ArrowLeft': next = col > 0 ? i - 1 : i; break;
      case 'ArrowRight': next = col < b.cols - 1 ? i + 1 : i; break;
      case 'Home': next = row * b.cols; break;
      case 'End': next = row * b.cols + b.cols - 1; break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.play(i);
        return;
      case 'f':
      case 'F':
        event.preventDefault();
        this.flagAt(i);
        return;
      default:
        return;
    }
    event.preventDefault();
    this.focusIndex.set(next);
    this.grid()?.nativeElement.querySelector<HTMLElement>(`[data-i="${next}"]`)?.focus();
  }

  /** A tap or Enter: reveal or flag depending on the mode; numbers chord. */
  private play(index: number): void {
    this.apply(act(this.board(), index, this.mode(), this.seed));
  }

  /** Long-press, right-click or F: flag a hidden cell, chord a number. */
  private flagAt(index: number, vibrate = false): void {
    const b = this.board();
    if (b.status !== 'playing') return;
    const next = b.state[index] === 'revealed' ? (canChord(b, index) ? chord(b, index) : b) : toggleFlag(b, index);
    if (next !== b && vibrate && typeof navigator !== 'undefined') navigator.vibrate?.(18);
    this.apply(next);
  }

  private apply(next: MinesBoard): void {
    const previous = this.board();
    if (next === previous) return;
    if (previous.status === 'ready') this.timer.start();
    this.board.set(next);
    if (next.status === 'won' || next.status === 'lost') this.finish(next);
  }

  private finish(board: MinesBoard): void {
    this.timer.stop();
    if (board.status === 'won') {
      const time = this.timer.elapsed();
      const best = this.best();
      if (best === undefined || time < best) {
        this.newRecord.set(best !== undefined);
        this.bestTimes.update((all) => ({ ...all, [this.level()]: time }));
        writeBest(this.bestTimes());
      }
      this.announcement.set(`${this.t('minesweeper.wonTitle')} ${this.wonText()}`);
    } else {
      this.announcement.set(`${this.t('minesweeper.lostTitle')} ${this.lostText()}`);
    }
  }

  private blankBoard(level: MinesLevel): MinesBoard {
    const { rows, cols, mines } = levelConfig(level);
    return createBoard(rows, cols, mines);
  }

  private t(key: string): string {
    return this.translate.translate(key);
  }

  private faqJsonLd(): Record<string, unknown> {
    return {
      '@type': 'FAQPage',
      mainEntity: this.faqKeys.map((n) => ({
        '@type': 'Question',
        name: this.t(`minesweeper.faq.q${n}`),
        acceptedAnswer: { '@type': 'Answer', text: this.t(`minesweeper.faq.a${n}`) },
      })),
    };
  }
}

/** Replaces `{name}` placeholders. */
function fill(text: string, params: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in params ? String(params[key]) : match));
}

function cellIndex(event: Event): number {
  const cell = (event.target as HTMLElement | null)?.closest?.('[data-i]');
  return cell ? Number(cell.getAttribute('data-i')) : -1;
}

function readBest(): Partial<Record<MinesLevel, number>> {
  try {
    return JSON.parse(localStorage.getItem(BEST_KEY) ?? '{}') ?? {};
  } catch {
    return {};
  }
}

function writeBest(value: Partial<Record<MinesLevel, number>>): void {
  try {
    localStorage.setItem(BEST_KEY, JSON.stringify(value));
  } catch {
    /* storage disabled */
  }
}
