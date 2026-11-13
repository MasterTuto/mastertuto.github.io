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
import { tablerArrowBackUp, tablerArrowsShuffle, tablerCalendarEvent, tablerEraser, tablerRefresh } from '@ng-icons/tabler-icons';

import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import { generateSeed } from 'src/app/utils/generate-seed';
import {
  COLOR_LINK_SIZES,
  applyStroke,
  beginStroke,
  evaluate,
  extendStroke,
  generateColorLink,
  isPathComplete,
  samePaths,
} from 'src/app/utils/color-link';
import type { ColorLinkPaths, ColorLinkPuzzle, Stroke } from 'src/app/utils/color-link';
import { useGameSeo } from '../game-seo';
import { GameShareButtonComponent } from '../shared/game-share-button.component';
import { GameTimer } from '../shared/game-timer';

/**
 * Colors chosen to stay apart for the common color-vision deficiencies (Okabe–Ito first, then Tol's
 * extras), ordered so small boards get the most distinct ones. Each endpoint also shows a letter.
 * `ink` is the letter color that reads on top of the fill.
 */
const PALETTE: readonly { fill: string; ink: string }[] = [
  { fill: '#E69F00', ink: '#1f1a10' }, // orange
  { fill: '#0072B2', ink: '#ffffff' }, // blue
  { fill: '#009E73', ink: '#ffffff' }, // bluish green
  { fill: '#CC79A7', ink: '#1f1a1d' }, // reddish purple
  { fill: '#56B4E9', ink: '#10202b' }, // sky blue
  { fill: '#D55E00', ink: '#ffffff' }, // vermillion
  { fill: '#E3C016', ink: '#1f1a10' }, // yellow (darkened for a light board)
  { fill: '#5B3A9B', ink: '#ffffff' }, // violet
  { fill: '#8C564B', ink: '#ffffff' }, // brown
  { fill: '#882255', ink: '#ffffff' }, // wine
  { fill: '#8F8F2B', ink: '#ffffff' }, // olive
  { fill: '#4B5563', ink: '#ffffff' }, // slate
];

const CELL = 100;
const MAX_HISTORY = 200;

type Mode = 'daily' | 'random';

interface Pulse {
  id: number;
  color: number;
  cells: number[];
}

@Component({
  selector: 'app-color-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, NgIconComponent, GameShareButtonComponent],
  providers: [provideIcons({ tablerArrowBackUp, tablerArrowsShuffle, tablerCalendarEvent, tablerEraser, tablerRefresh })],
  templateUrl: './color-link.component.html',
  styleUrl: './color-link.component.css',
})
export class ColorLinkComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly i18n = inject(TranslateService);
  private readonly board = viewChild<ElementRef<SVGSVGElement>>('board');

  readonly sizes = COLOR_LINK_SIZES;
  readonly cellUnit = CELL;
  readonly palette = PALETTE;
  readonly letters = 'ABCDEFGHIJKL';
  readonly faqItems = [1, 2, 3, 4];
  readonly timer = new GameTimer();

  readonly size = signal<number>(7);
  readonly mode = signal<Mode>('daily');
  readonly puzzle = signal<ColorLinkPuzzle | null>(null);
  /** Committed paths (between strokes). */
  readonly committed = signal<ColorLinkPaths>([]);
  readonly stroke = signal<Stroke | null>(null);
  readonly history = signal<ColorLinkPaths[]>([]);
  readonly moves = signal(0);
  readonly won = signal(false);
  readonly cursor = signal(0);
  readonly showCursor = signal(false);
  readonly pulses = signal<Pulse[]>([]);

  /** What the board shows: the committed paths, or those with the current stroke applied. */
  readonly paths = computed<ColorLinkPaths>(() => {
    const stroke = this.stroke();
    return stroke ? applyStroke(stroke) : this.committed();
  });

  readonly progress = computed(() => {
    const puzzle = this.puzzle();
    if (!puzzle) return { connected: 0, pairs: 0, percent: 0, solved: false };
    const paths = this.paths();
    const result = evaluate(puzzle, paths);
    const filled = paths.reduce((sum, p) => sum + (p.length > 1 ? p.length : 0), 0);
    return {
      connected: result.connected,
      pairs: puzzle.pairs.length,
      percent: Math.floor((filled / result.total) * 100),
      solved: result.solved,
    };
  });

  /** Everything the SVG needs, precomputed once per change. */
  readonly view = computed(() => {
    const puzzle = this.puzzle();
    if (!puzzle) return null;
    const n = puzzle.size;
    const paths = this.paths();
    const center = (cell: number) => [(cell % n) * CELL + CELL / 2, Math.floor(cell / n) * CELL + CELL / 2];
    const tints: { x: number; y: number; fill: string }[] = [];
    const lines: { points: string; color: string; done: boolean }[] = [];
    paths.forEach((path, color) => {
      const fill = PALETTE[color % PALETTE.length].fill;
      if (path.length > 1) {
        for (const cell of path) tints.push({ x: (cell % n) * CELL, y: Math.floor(cell / n) * CELL, fill });
        lines.push({
          points: path.map((cell) => center(cell).join(',')).join(' '),
          color: fill,
          done: isPathComplete(puzzle, color, path),
        });
      }
    });
    const dots = puzzle.pairs.flatMap((pair, color) => {
      const done = isPathComplete(puzzle, color, paths[color] ?? []);
      return [pair.a, pair.b].map((cell) => {
        const [cx, cy] = center(cell);
        return { cell, cx, cy, color, done, ...PALETTE[color % PALETTE.length], letter: this.letters[color] ?? '' };
      });
    });
    let grid = '';
    for (let i = 1; i < n; i++) grid += `M${i * CELL} 0V${n * CELL}M0 ${i * CELL}H${n * CELL}`;
    const stroke = this.stroke();
    const head = stroke ? center(stroke.path[stroke.path.length - 1]) : null;
    const cursor = this.cursor();
    return {
      n,
      extent: n * CELL,
      tints,
      lines,
      dots,
      grid,
      head,
      headColor: stroke ? PALETTE[stroke.color % PALETTE.length].fill : '',
      cursorX: (cursor % n) * CELL,
      cursorY: Math.floor(cursor / n) * CELL,
    };
  });

  readonly started = computed(() => this.moves() > 0 || this.stroke() !== null || this.timer.running());

  readonly statusKey = computed(() => {
    const p = this.progress();
    if (p.solved) return 'colorLink.status.solved';
    if (!this.started()) return 'games.timerHint';
    if (p.pairs > 0 && p.connected === p.pairs) return 'colorLink.status.fill';
    return 'colorLink.status.drag';
  });

  readonly shareText = computed(() => {
    const n = this.size();
    const daily = this.mode() === 'daily' ? ` · ${this.i18n.translate('colorLink.daily')}` : '';
    return `🎨 ${this.i18n.translate('colorLink.name')} ${n}×${n}${daily} · ${this.timer.label()}`;
  });

  readonly liveText = computed(() => {
    const p = this.progress();
    if (!this.puzzle() || this.stroke()) return '';
    return `${this.i18n.translate('colorLink.pairs')} ${p.connected}/${p.pairs} · ${this.i18n.translate('colorLink.filled')} ${p.percent}%`;
  });

  readonly boardLabel = computed(() => {
    const n = this.size();
    return `${this.i18n.translate('colorLink.boardLabel')} ${n}×${n}. ${this.i18n.translate('colorLink.keyboardHint')}`;
  });

  // Pointer state (not signals: they never affect rendering).
  private pointerId: number | null = null;
  private rect: DOMRect | null = null;
  private lastPoint: { x: number; y: number } | null = null;
  private pulseId = 0;

  constructor() {
    useGameSeo('color-link', 'colorLink.seo', () => [this.faqJsonLd()]);
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) this.load();
    });
  }

  setSize(size: number): void {
    if (size === this.size() && this.puzzle()) return;
    this.size.set(size);
    this.load();
  }

  setMode(mode: Mode): void {
    if (mode === this.mode() && mode === 'daily') return;
    this.mode.set(mode);
    this.load();
  }

  /** A fresh random puzzle of the current size. */
  newRandom(): void {
    this.mode.set('random');
    this.load();
  }

  private load(): void {
    const seed = this.mode() === 'daily' ? generateSeed() : Math.floor(Math.random() * 2 ** 31);
    const puzzle = generateColorLink(this.size(), seed);
    this.puzzle.set(puzzle);
    this.committed.set(puzzle.pairs.map(() => []));
    this.stroke.set(null);
    this.history.set([]);
    this.moves.set(0);
    this.won.set(false);
    this.pulses.set([]);
    this.cursor.set(puzzle.pairs[0]?.a ?? 0);
    this.pointerId = null;
    this.timer.reset();
  }

  /* ----------------------------------------------------------------------------- strokes */

  private start(cell: number): boolean {
    const puzzle = this.puzzle();
    if (!puzzle || this.won()) return false;
    const stroke = beginStroke(puzzle, this.committed(), cell);
    if (!stroke) return false;
    this.stroke.set(stroke);
    this.timer.start();
    return true;
  }

  /** Walks the stroke head towards `target` one orthogonal step at a time. */
  private moveTowards(target: number): void {
    const puzzle = this.puzzle();
    const current = this.stroke();
    if (!puzzle || !current || current.done) return;
    const stroke: Stroke = { ...current };
    const n = puzzle.size;
    let changed = false;
    for (let guard = 0; guard < n * 2; guard++) {
      if (stroke.done) break;
      const head = stroke.path[stroke.path.length - 1];
      if (head === target) break;
      if (stroke.path.includes(target)) {
        // Pulling back over the own path: retract straight to that cell.
        extendStroke(puzzle, stroke, target);
        changed = true;
        break;
      }
      const dr = Math.floor(target / n) - Math.floor(head / n);
      const dc = (target % n) - (head % n);
      const vertical = dr !== 0 ? head + Math.sign(dr) * n : -1;
      const horizontal = dc !== 0 ? head + Math.sign(dc) : -1;
      const order = Math.abs(dr) >= Math.abs(dc) ? [vertical, horizontal] : [horizontal, vertical];
      const step = order.find((cell) => cell !== -1 && extendStroke(puzzle, stroke, cell));
      if (step === undefined) break;
      changed = true;
    }
    if (!changed) return;
    this.stroke.set(stroke);
    if (stroke.done) this.finish();
  }

  /** Commits the stroke: one stroke is one move and one undo step. */
  private finish(): void {
    const puzzle = this.puzzle();
    const stroke = this.stroke();
    if (!puzzle || !stroke) return;
    const before = this.committed();
    const after = applyStroke(stroke);
    this.stroke.set(null);
    if (samePaths(before, after)) return;
    this.history.update((h) => [...h.slice(-MAX_HISTORY + 1), before]);
    this.committed.set(after);
    this.moves.update((m) => m + 1);
    const newlyDone = puzzle.pairs
      .map((_, color) => color)
      .filter((color) => isPathComplete(puzzle, color, after[color]) && !isPathComplete(puzzle, color, before[color]));
    if (newlyDone.length) this.pulse(newlyDone.map((color) => ({ color, cells: [puzzle.pairs[color].a, puzzle.pairs[color].b] })));
    this.checkWin();
  }

  private checkWin(): void {
    const puzzle = this.puzzle();
    if (!puzzle) return;
    if (evaluate(puzzle, this.committed()).solved) {
      this.won.set(true);
      this.timer.stop();
    }
  }

  private pulse(items: { color: number; cells: number[] }[]): void {
    const added = items.map((item) => ({ id: ++this.pulseId, ...item }));
    this.pulses.update((list) => [...list.slice(-8), ...added]);
    const ids = new Set(added.map((p) => p.id));
    setTimeout(() => this.pulses.update((list) => list.filter((p) => !ids.has(p.id))), 900);
  }

  undo(): void {
    const history = this.history();
    if (!history.length || this.stroke() || this.won()) return;
    this.committed.set(history[history.length - 1]);
    this.history.set(history.slice(0, -1));
  }

  reset(): void {
    const puzzle = this.puzzle();
    if (!puzzle || this.won() || this.stroke()) return;
    const empty = puzzle.pairs.map(() => []);
    if (samePaths(this.committed(), empty)) return;
    this.history.update((h) => [...h, this.committed()]);
    this.committed.set(empty);
  }

  readonly canReset = computed(() => this.committed().some((p) => p.length > 1));

  /* ----------------------------------------------------------------------------- pointer */

  private cellAt(x: number, y: number): number {
    const rect = this.rect;
    const n = this.size();
    if (!rect) return -1;
    const col = Math.min(n - 1, Math.max(0, Math.floor(((x - rect.left) / rect.width) * n)));
    const row = Math.min(n - 1, Math.max(0, Math.floor(((y - rect.top) / rect.height) * n)));
    return row * n + col;
  }

  onPointerDown(event: PointerEvent): void {
    if (this.pointerId !== null || !event.isPrimary) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const svg = this.board()?.nativeElement;
    if (!svg) return;
    this.rect = svg.getBoundingClientRect();
    const cell = this.cellAt(event.clientX, event.clientY);
    this.showCursor.set(false);
    if (!this.start(cell)) return;
    event.preventDefault();
    this.cursor.set(cell);
    this.pointerId = event.pointerId;
    this.lastPoint = { x: event.clientX, y: event.clientY };
    svg.setPointerCapture?.(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (event.pointerId !== this.pointerId || !this.rect || !this.lastPoint) return;
    event.preventDefault();
    const points = typeof event.getCoalescedEvents === 'function' ? event.getCoalescedEvents() : [];
    for (const point of points.length ? points : [event]) this.trace(point.clientX, point.clientY);
  }

  /** Follows the pointer from the last position, sampling every third of a cell so fast moves don't skip. */
  private trace(x: number, y: number): void {
    const from = this.lastPoint!;
    const cellPx = this.rect!.width / this.size();
    const steps = Math.max(1, Math.ceil(Math.hypot(x - from.x, y - from.y) / (cellPx / 3)));
    for (let i = 1; i <= steps; i++) {
      if (!this.stroke()) break;
      const cell = this.cellAt(from.x + ((x - from.x) * i) / steps, from.y + ((y - from.y) * i) / steps);
      this.moveTowards(cell);
    }
    this.lastPoint = { x, y };
    const stroke = this.stroke();
    if (stroke) this.cursor.set(stroke.path[stroke.path.length - 1]);
  }

  onPointerUp(event: PointerEvent): void {
    if (event.pointerId !== this.pointerId) return;
    this.pointerId = null;
    this.lastPoint = null;
    this.finish();
  }

  /* ----------------------------------------------------------------------------- keyboard */

  onKeydown(event: KeyboardEvent): void {
    const puzzle = this.puzzle();
    if (!puzzle) return;
    const n = puzzle.size;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      this.undo();
      return;
    }
    const deltas: Record<string, [number, number]> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };
    const delta = deltas[event.key];
    if (delta) {
      event.preventDefault();
      this.showCursor.set(true);
      const cursor = this.cursor();
      const row = Math.floor(cursor / n) + delta[0];
      const col = (cursor % n) + delta[1];
      if (row < 0 || row >= n || col < 0 || col >= n) return;
      const target = row * n + col;
      if (this.stroke() && this.pointerId === null) {
        this.moveTowards(target);
        const stroke = this.stroke();
        this.cursor.set(stroke ? stroke.path[stroke.path.length - 1] : target);
      } else if (!this.stroke()) {
        this.cursor.set(target);
      }
      return;
    }
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.showCursor.set(true);
      if (this.stroke()) {
        if (this.pointerId === null) this.finish();
      } else {
        this.start(this.cursor());
      }
      return;
    }
    if (event.key === 'Escape' && this.stroke() && this.pointerId === null) {
      this.finish();
    }
  }

  onBlur(): void {
    this.showCursor.set(false);
    if (this.stroke() && this.pointerId === null) this.finish();
  }

  /* ----------------------------------------------------------------------------- SEO */

  private faqJsonLd(): Record<string, unknown> {
    const t = (key: string) => this.i18n.translate(key);
    return {
      '@type': 'FAQPage',
      mainEntity: this.faqItems.map((i) => ({
        '@type': 'Question',
        name: t(`colorLink.faq.q${i}`),
        acceptedAnswer: { '@type': 'Answer', text: t(`colorLink.faq.a${i}`) },
      })),
    };
  }
}
