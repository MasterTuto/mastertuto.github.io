import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowBackUp, tablerEraser, tablerRefresh } from '@ng-icons/tabler-icons';

import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import { generateSeed } from 'src/app/utils/generate-seed';
import {
  MAX_CLUES,
  type NonogramPuzzle,
  colOf,
  generateRandomNonogram,
  isSolved,
  lineClue,
  pictureIds,
  pictureNonogram,
  rowOf,
  sameClue,
} from 'src/app/utils/nonogram';
import { useGameSeo } from '../game-seo';
import { GameShareButtonComponent } from '../shared/game-share-button.component';
import { GameTimer } from '../shared/game-timer';

/** Cell states on the board. */
const EMPTY = 0;
const FILLED = 1;
const CROSSED = 2;

type Size = 5 | 10 | 15;
type Mode = 'daily' | 'random';
type Tool = 'fill' | 'cross';

interface Stroke {
  pointerId: number;
  start: number;
  axis: 'h' | 'v' | null;
  /** Value written to the cells of the stroke. */
  target: number;
  /** Cells (other than the first) are only changed when they hold this value. */
  eligible: number;
  snapshot: number[];
  last: number;
  left: number;
  top: number;
  pitchX: number;
  pitchY: number;
}

/** Sizes in px: clue gutter slot per number, clue line height, font, and cell bounds. */
const LAYOUT: Record<Size, { slot: number; line: number; font: number; min: number; max: number }> = {
  5: { slot: 15, line: 17, font: 14, min: 36, max: 56 },
  10: { slot: 11, line: 13, font: 11.5, min: 20, max: 34 },
  15: { slot: 8.5, line: 11, font: 9.5, min: 17, max: 28 },
};

@Component({
  selector: 'app-nonogram',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, NgIconComponent, GameShareButtonComponent],
  providers: [provideIcons({ tablerArrowBackUp, tablerEraser, tablerRefresh })],
  templateUrl: './nonogram.component.html',
  styleUrl: './nonogram.component.css',
})
export class NonogramComponent {
  private readonly i18n = inject(TranslateService);
  private readonly boardRef = viewChild<ElementRef<HTMLElement>>('board');

  readonly sizes: Size[] = [5, 10, 15];
  readonly timer = new GameTimer();
  readonly size = signal<Size>(10);
  readonly mode = signal<Mode>('daily');
  readonly tool = signal<Tool>('fill');
  readonly puzzle = signal<NonogramPuzzle | null>(null);
  readonly cells = signal<number[]>(new Array(100).fill(EMPTY));
  readonly won = signal(false);
  /** Keyboard cursor. */
  readonly cursor = signal(0);
  /** Cell under the pointer or the cursor: its row and column clues are highlighted. */
  readonly active = signal(-1);
  private readonly history = signal<number[][]>([]);
  readonly canUndo = computed(() => this.history().length > 0 && !this.won());
  private stroke: Stroke | null = null;
  private lastPicture = '';

  readonly indexes = computed(() => Array.from({ length: this.size() }, (_, i) => i));
  readonly rowClues = computed(() => this.puzzle()?.rows ?? this.indexes().map(() => [] as number[]));
  readonly colClues = computed(() => this.puzzle()?.cols ?? this.indexes().map(() => [] as number[]));
  readonly rowDone = computed(() => {
    const n = this.size();
    const cells = this.cells();
    return this.rowClues().map((clue, r) => clue.length > 0 && sameClue(lineClue(rowOf(cells, n, r)), clue));
  });
  readonly colDone = computed(() => {
    const n = this.size();
    const cells = this.cells();
    return this.colClues().map((clue, c) => clue.length > 0 && sameClue(lineClue(colOf(cells, n, c)), clue));
  });
  readonly filledCount = computed(() => this.cells().filter((v) => v === FILLED).length);
  readonly totalFilled = computed(() => this.puzzle()?.solution.filter((v) => v === 1).length ?? 0);
  readonly activeRow = computed(() => (this.active() < 0 ? -1 : Math.floor(this.active() / this.size())));
  readonly activeCol = computed(() => (this.active() < 0 ? -1 : this.active() % this.size()));
  readonly showHint = computed(() => !this.timer.running() && this.timer.elapsed() === 0 && !this.won());

  /** Grid tracks: a fixed clue gutter plus cells that shrink with the container (container query units). */
  readonly layout = computed(() => {
    const n = this.size();
    const l = LAYOUT[n as Size];
    const clues = MAX_CLUES[n];
    const gutter = Math.ceil(clues * l.slot + 8);
    const head = Math.ceil(clues * l.line + 6);
    const cell = `clamp(${l.min}px, calc((100cqw - ${gutter}px) / ${n}), ${l.max}px)`;
    return {
      columns: `${gutter}px repeat(${n}, ${cell})`,
      rows: `${head}px repeat(${n}, ${cell})`,
      font: `${l.font}px`,
      line: `${l.line}px`,
    };
  });

  readonly cellClasses = computed(() => {
    const n = this.size();
    const cells = this.cells();
    const won = this.won();
    const ar = this.activeRow();
    const ac = this.activeCol();
    return cells.map((v, i) => {
      const r = Math.floor(i / n);
      const c = i % n;
      const parts = ['nono-cell'];
      if (c % 5 === 4 && c < n - 1) parts.push('major-r');
      if (r % 5 === 4 && r < n - 1) parts.push('major-b');
      if (v === FILLED) parts.push('is-filled');
      else if (!won && (r === ar || c === ac)) parts.push('is-band');
      return parts.join(' ');
    });
  });

  /** On a win, filled cells take a diagonal purple-to-pink gradient, revealed in a wave. */
  readonly revealStyle = computed(() => {
    const n = this.size();
    if (!this.won()) return this.cells().map(() => null);
    return this.cells().map((_, i) => {
      const t = (Math.floor(i / n) + (i % n)) / (2 * n - 2);
      const hue = 248 + t * 75;
      return { bg: `hsl(${hue} 68% ${62 - t * 4}%)`, delay: `${Math.round(t * 600)}ms` };
    });
  });

  readonly pictureName = computed(() => {
    const id = this.puzzle()?.picture;
    return id ? this.t(`nonogram.pictures.${id.replace(/\d+$/, '')}`) : '';
  });

  readonly solvedText = computed(() =>
    this.t('nonogram.solvedIn').replace('{size}', `${this.size()}×${this.size()}`).replace('{time}', this.timer.label()),
  );

  readonly shareText = computed(() => {
    const n = this.size();
    const daily = this.mode() === 'daily' ? ` · ${this.t('nonogram.dailyTag')}` : '';
    return `🧩 ${this.t('nonogram.name')} ${n}×${n} · ${this.timer.label()}${daily}`;
  });

  constructor() {
    useGameSeo('nonogram', 'nonogram.seo');
    afterNextRender(() => this.newPuzzle());
  }

  t(key: string): string {
    return this.i18n.translate(key);
  }

  setSize(size: Size): void {
    if (size === this.size() && this.puzzle()) return;
    this.size.set(size);
    this.newPuzzle();
  }

  setMode(mode: Mode): void {
    this.mode.set(mode);
    this.newPuzzle();
  }

  playAgain(): void {
    this.mode.set('random');
    this.newPuzzle();
  }

  newPuzzle(): void {
    const n = this.size();
    let puzzle: NonogramPuzzle;
    if (this.mode() === 'daily') {
      puzzle = generateRandomNonogram(n, generateSeed() * 100 + n);
    } else {
      const pictures = pictureIds(n).filter((id) => id !== this.lastPicture);
      if (pictures.length && Math.random() < 0.35) {
        puzzle = pictureNonogram(pictures[Math.floor(Math.random() * pictures.length)]);
        this.lastPicture = puzzle.picture ?? '';
      } else {
        puzzle = generateRandomNonogram(n, Math.floor(Math.random() * 2 ** 31));
      }
    }
    this.stroke = null;
    this.puzzle.set(puzzle);
    this.cells.set(new Array(n * n).fill(EMPTY));
    this.history.set([]);
    this.won.set(false);
    this.cursor.set(Math.min(this.cursor(), n * n - 1));
    this.active.set(-1);
    this.timer.reset();
  }

  undo(): void {
    const stack = this.history();
    if (!stack.length || this.won()) return;
    this.cells.set(stack[stack.length - 1]);
    this.history.set(stack.slice(0, -1));
  }

  clear(): void {
    if (this.won() || this.cells().every((v) => v === EMPTY)) return;
    this.commit(new Array(this.cells().length).fill(EMPTY));
  }

  cellLabel(i: number): string {
    const n = this.size();
    const v = this.cells()[i];
    const state = v === FILLED ? 'stateFilled' : v === CROSSED ? 'stateCrossed' : 'stateEmpty';
    return `${this.t('nonogram.cell').replace('{r}', String(Math.floor(i / n) + 1)).replace('{c}', String((i % n) + 1))}: ${this.t(`nonogram.${state}`)}`;
  }

  clueLabel(kind: 'row' | 'col', index: number, clue: number[]): string {
    return `${this.t(kind === 'row' ? 'nonogram.rowClue' : 'nonogram.colClue').replace('{n}', String(index + 1))}: ${clue.join(' ')}`;
  }

  // ---- Pointer: one stroke paints a straight line with the action chosen on the first cell. ----

  onPointerDown(event: PointerEvent): void {
    if (this.won() || !this.puzzle() || this.stroke) return;
    const el = (event.target as HTMLElement).closest<HTMLElement>('[data-i]');
    if (!el) return;
    if (event.pointerType === 'mouse' && event.button !== 0 && event.button !== 2) return;
    event.preventDefault();
    const board = event.currentTarget as HTMLElement;
    board.setPointerCapture?.(event.pointerId);
    const n = this.size();
    const first = board.querySelector('[data-i="0"]')!.getBoundingClientRect();
    const last = board.querySelector(`[data-i="${n * n - 1}"]`)!.getBoundingClientRect();
    const i = Number(el.dataset['i']);
    const current = this.cells()[i];
    const mark = this.tool() === 'cross' || event.button === 2 ? CROSSED : FILLED;
    const target = current === mark ? EMPTY : mark;
    this.stroke = {
      pointerId: event.pointerId,
      start: i,
      axis: null,
      target,
      eligible: target === EMPTY ? mark : EMPTY,
      snapshot: this.cells(),
      last: i,
      left: first.left,
      top: first.top,
      pitchX: (last.right - first.left) / n,
      pitchY: (last.bottom - first.top) / n,
    };
    this.cursor.set(i);
    this.active.set(i);
    this.paint(i);
  }

  onPointerMove(event: PointerEvent): void {
    const s = this.stroke;
    if (!s) {
      if (event.pointerType === 'mouse') {
        const el = (event.target as HTMLElement).closest<HTMLElement>('[data-i]');
        this.active.set(el ? Number(el.dataset['i']) : -1);
      }
      return;
    }
    if (event.pointerId !== s.pointerId) return;
    const n = this.size();
    const clamp = (v: number) => Math.max(0, Math.min(n - 1, v));
    let r = clamp(Math.floor((event.clientY - s.top) / s.pitchY));
    let c = clamp(Math.floor((event.clientX - s.left) / s.pitchX));
    const r0 = Math.floor(s.start / n);
    const c0 = s.start % n;
    if (!s.axis) {
      if (r === r0 && c === c0) return;
      s.axis = Math.abs(r - r0) > Math.abs(c - c0) ? 'v' : 'h';
    }
    if (s.axis === 'h') r = r0;
    else c = c0;
    const end = r * n + c;
    if (end === s.last) return;
    s.last = end;
    this.active.set(end);
    this.paint(end);
  }

  onPointerUp(event: PointerEvent): void {
    const s = this.stroke;
    if (!s || event.pointerId !== s.pointerId) return;
    this.stroke = null;
    const changed = this.cells().some((v, i) => v !== s.snapshot[i]);
    if (changed) {
      this.history.update((h) => [...h.slice(-199), s.snapshot]);
      this.checkWin();
    }
    if (event.pointerType !== 'mouse') this.active.set(-1);
  }

  onPointerLeave(event: PointerEvent): void {
    if (!this.stroke && event.pointerType === 'mouse') this.active.set(-1);
  }

  /** Applies the current stroke from its first cell to `end` on top of the snapshot. */
  private paint(end: number): void {
    const s = this.stroke!;
    const n = this.size();
    const next = [...s.snapshot];
    const r0 = Math.floor(s.start / n);
    const c0 = s.start % n;
    const r1 = Math.floor(end / n);
    const c1 = end % n;
    const steps = Math.max(Math.abs(r1 - r0), Math.abs(c1 - c0));
    const dr = Math.sign(r1 - r0);
    const dc = Math.sign(c1 - c0);
    for (let k = 0; k <= steps; k++) {
      const i = (r0 + dr * k) * n + (c0 + dc * k);
      if (i === s.start || s.snapshot[i] === s.eligible) next[i] = s.target;
    }
    this.cells.set(next);
    if (next[s.start] !== s.snapshot[s.start] || steps > 0) this.timer.start();
  }

  // ---- Keyboard ----

  onKeydown(event: KeyboardEvent): void {
    const n = this.size();
    const i = this.cursor();
    const r = Math.floor(i / n);
    const c = i % n;
    const moves: Record<string, [number, number]> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };
    if (moves[event.key]) {
      event.preventDefault();
      const [dr, dc] = moves[event.key];
      const next = Math.max(0, Math.min(n - 1, r + dr)) * n + Math.max(0, Math.min(n - 1, c + dc));
      this.cursor.set(next);
      this.active.set(next);
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      this.undo();
      return;
    }
    if (this.won()) return;
    let mark = -1;
    if (event.key === ' ' || event.key === 'Enter') mark = this.tool() === 'cross' ? CROSSED : FILLED;
    else if (event.key.toLowerCase() === 'x') mark = CROSSED;
    else if (event.key.toLowerCase() === 'f') mark = FILLED;
    else if (event.key === 'Backspace' || event.key === 'Delete') mark = EMPTY;
    if (mark < 0) return;
    event.preventDefault();
    const cells = [...this.cells()];
    const value = mark !== EMPTY && cells[i] === mark ? EMPTY : mark;
    if (cells[i] === value) return;
    cells[i] = value;
    this.timer.start();
    this.commit(cells);
    this.active.set(i);
  }

  onFocus(): void {
    this.active.set(this.cursor());
  }

  onBlur(): void {
    if (!this.stroke) this.active.set(-1);
  }

  private commit(cells: number[]): void {
    this.history.update((h) => [...h.slice(-199), this.cells()]);
    this.cells.set(cells);
    this.checkWin();
  }

  private checkWin(): void {
    const p = this.puzzle();
    if (!p || !isSolved(this.cells(), p.rows, p.cols)) return;
    this.timer.stop();
    this.won.set(true);
    this.active.set(-1);
    this.boardRef()?.nativeElement.blur();
  }
}
