import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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
import { tablerChevronDown, tablerRefresh, tablerStar } from '@ng-icons/tabler-icons';
import { tablerStarFill } from '@ng-icons/tabler-icons/fill';

import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import { MEMORY_LEVELS, createGame, flip, hideOpen, memoryLevel, starRating } from 'src/app/utils/memory-game';
import type { MemoryLevel, MemoryState } from 'src/app/utils/memory-game';
import { useGameSeo } from '../game-seo';
import { GameShareButtonComponent } from '../shared/game-share-button.component';
import { GameTimer, formatDuration } from '../shared/game-timer';

/** The card faces: a fruit market, each fruit on its own pastel tile. */
const FACES = [
  { key: 'strawberry', emoji: '🍓', bg: '#ffe0e6' },
  { key: 'lemon', emoji: '🍋', bg: '#fff3bf' },
  { key: 'grapes', emoji: '🍇', bg: '#ebe3ff' },
  { key: 'orange', emoji: '🍊', bg: '#ffe4cc' },
  { key: 'watermelon', emoji: '🍉', bg: '#d9f4e1' },
  { key: 'cherries', emoji: '🍒', bg: '#fde0f0' },
  { key: 'pineapple', emoji: '🍍', bg: '#f1f2c6' },
  { key: 'kiwi', emoji: '🥝', bg: '#e3f3cf' },
  { key: 'peach', emoji: '🍑', bg: '#ffe7da' },
  { key: 'coconut', emoji: '🥥', bg: '#efe6dc' },
  { key: 'banana', emoji: '🍌', bg: '#fdf6d3' },
  { key: 'apple', emoji: '🍎', bg: '#e0eefe' },
] as const;

/** How long a wrong pair stays visible. A third tap hides it sooner. */
const MISMATCH_MS = 800;
const BEST_KEY = 'memory-best-v1';
const BOARD_MAX: Record<MemoryLevel, string> = { easy: '26rem', medium: '26rem', hard: '36rem' };

interface CardView {
  up: boolean;
  matched: boolean;
  missed: boolean;
  emoji: string;
  bg: string;
  label: string;
}

@Component({
  selector: 'app-memory',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, NgIconComponent, GameShareButtonComponent],
  providers: [provideIcons({ tablerRefresh, tablerStar, tablerStarFill, tablerChevronDown })],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.css',
})
export class MemoryComponent {
  private readonly translate = inject(TranslateService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly grid = viewChild<ElementRef<HTMLElement>>('grid');

  readonly levels = MEMORY_LEVELS;
  readonly timer = new GameTimer();
  readonly level = signal<MemoryLevel>('medium');
  readonly game = signal<MemoryState>(this.deal('medium', 1));
  readonly focusIndex = signal(0);
  readonly bestTimes = signal<Partial<Record<MemoryLevel, number>>>({});
  readonly newRecord = signal(false);
  readonly announcement = signal('');

  readonly config = computed(() => memoryLevel(this.level()));
  readonly status = computed(() => this.game().status);
  readonly won = computed(() => this.status() === 'won');
  readonly stars = computed(() => starRating(this.game().moves, this.game().pairs));
  readonly progress = computed(() => (this.game().matchedPairs / this.game().pairs) * 100);
  readonly boardWidth = computed(() => `min(100%, ${BOARD_MAX[this.level()]})`);
  readonly bestLabel = computed(() => {
    const best = this.bestTimes()[this.level()];
    return best === undefined ? '' : formatDuration(best);
  });
  readonly levelName = computed(() => this.t(`memory.levels.${this.level()}`));
  readonly wonText = computed(() =>
    fill(this.t('memory.wonText'), { moves: this.game().moves, time: this.timer.label() }),
  );
  readonly starsLabel = computed(() => fill(this.t('memory.stars'), { n: this.stars() }));
  readonly shareText = computed(() =>
    fill(this.t('memory.share'), { level: this.levelName(), time: this.timer.label(), moves: this.game().moves }),
  );
  readonly boardLabel = computed(() =>
    fill(this.t('memory.boardLabel'), { rows: this.config().rows, cols: this.config().cols }),
  );

  readonly cards = computed<CardView[]>(() => {
    const g = this.game();
    const words = {
      hidden: this.t('memory.card.hidden'),
      shown: this.t('memory.card.shown'),
      matched: this.t('memory.card.matched'),
    };
    const missed = g.open.length === 2;
    return g.cards.map((card, i) => {
      const face = FACES[card.face];
      const open = g.open.includes(i);
      const up = card.matched || open;
      const template = card.matched ? words.matched : up ? words.shown : words.hidden;
      return {
        up,
        matched: card.matched,
        missed: missed && open,
        emoji: face.emoji,
        bg: face.bg,
        label: fill(template, { n: i + 1, face: this.faceName(card.face) }),
      };
    });
  });

  readonly stepKeys = [1, 2, 3, 4];

  private hideTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    useGameSeo('memory', 'memory.seo', () => [this.faqJsonLd()]);
    inject(DestroyRef).onDestroy(() => clearTimeout(this.hideTimer));
    afterNextRender(() => {
      this.bestTimes.set(readBest());
      this.newGame();
    });
  }

  setLevel(level: MemoryLevel): void {
    this.level.set(level);
    this.newGame();
  }

  newGame(): void {
    clearTimeout(this.hideTimer);
    this.game.set(this.deal(this.level(), this.isBrowser ? Math.floor(Math.random() * 2 ** 32) : 1));
    this.timer.reset();
    this.newRecord.set(false);
    this.announcement.set('');
    this.focusIndex.update((i) => Math.min(i, this.game().cards.length - 1));
  }

  /** Buttons fire one `click` for mouse, touch, pen, Enter and Space alike. */
  flipCard(index: number): void {
    const before = this.game();
    const { state, result } = flip(before, index);
    if (result === 'ignored') return;
    clearTimeout(this.hideTimer);
    this.focusIndex.set(index);
    if (before.status === 'ready') this.timer.start();
    this.game.set(state);

    if (result === 'mismatch') {
      const [a, b] = state.open;
      this.announcement.set(
        fill(this.t('memory.announceMismatch'), {
          a: this.faceName(state.cards[a].face),
          b: this.faceName(state.cards[b].face),
        }),
      );
      this.hideTimer = setTimeout(() => {
        if (this.game() === state) this.game.set(hideOpen(state));
      }, MISMATCH_MS);
    } else if (result === 'match') {
      this.announcement.set(fill(this.t('memory.announceMatch'), { face: this.faceName(state.cards[index].face) }));
      if (state.status === 'won') this.finish();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    const { cols, rows } = this.config();
    const i = this.focusIndex();
    const row = Math.floor(i / cols);
    const col = i % cols;
    let next: number;
    switch (event.key) {
      case 'ArrowUp': next = row > 0 ? i - cols : i; break;
      case 'ArrowDown': next = row < rows - 1 ? i + cols : i; break;
      case 'ArrowLeft': next = col > 0 ? i - 1 : i; break;
      case 'ArrowRight': next = col < cols - 1 ? i + 1 : i; break;
      default: return;
    }
    event.preventDefault();
    this.focusIndex.set(next);
    this.grid()?.nativeElement.querySelector<HTMLElement>(`[data-i="${next}"]`)?.focus();
  }

  private finish(): void {
    this.timer.stop();
    const time = this.timer.elapsed();
    const best = this.bestTimes()[this.level()];
    if (best === undefined || time < best) {
      this.newRecord.set(best !== undefined);
      this.bestTimes.update((all) => ({ ...all, [this.level()]: time }));
      writeBest(this.bestTimes());
    }
    this.announcement.set(`${this.t('memory.wonTitle')} ${this.wonText()} ${this.starsLabel()}.`);
  }

  private deal(level: MemoryLevel, seed: number): MemoryState {
    return createGame(memoryLevel(level).pairs, FACES.length, seed);
  }

  private faceName(face: number): string {
    return this.t(`memory.faces.${FACES[face].key}`);
  }

  private t(key: string): string {
    return this.translate.translate(key);
  }

  private faqJsonLd(): Record<string, unknown> {
    return {
      '@type': 'FAQPage',
      mainEntity: this.stepKeys.map((n) => ({
        '@type': 'Question',
        name: this.t(`memory.faq.q${n}`),
        acceptedAnswer: { '@type': 'Answer', text: this.t(`memory.faq.a${n}`) },
      })),
    };
  }
}

/** Replaces `{name}` placeholders. */
function fill(text: string, params: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in params ? String(params[key]) : match));
}

function readBest(): Partial<Record<MemoryLevel, number>> {
  try {
    return JSON.parse(localStorage.getItem(BEST_KEY) ?? '{}') ?? {};
  } catch {
    return {};
  }
}

function writeBest(value: Partial<Record<MemoryLevel, number>>): void {
  try {
    localStorage.setItem(BEST_KEY, JSON.stringify(value));
  } catch {
    /* storage disabled */
  }
}
