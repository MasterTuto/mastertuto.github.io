import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowBackUp, tablerBulb, tablerEraser, tablerRefresh } from '@ng-icons/tabler-icons';

import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import { type BinaryPuzzle, findDeduction, findViolations, generateBinaryPuzzle, isComplete } from 'src/app/utils/binary-puzzle';
import { generateSeed } from 'src/app/utils/generate-seed';
import { useGameSeo } from '../game-seo';
import { GameShareButtonComponent } from '../shared/game-share-button.component';
import { GameTimer } from '../shared/game-timer';

type Size = 6 | 8 | 10;
type Mode = 'daily' | 'random';

interface Stroke {
  pointerId: number;
  value: number;
  snapshot: number[];
  last: number;
}

/** Tap order: empty → 0 → 1 → empty (reverse with the right mouse button). */
const NEXT: Record<number, number> = { [-1]: 0, 0: 1, 1: -1 };
const PREV: Record<number, number> = { [-1]: 1, 1: 0, 0: -1 };

@Component({
  selector: 'app-binary-puzzle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, NgIconComponent, GameShareButtonComponent],
  providers: [provideIcons({ tablerArrowBackUp, tablerBulb, tablerEraser, tablerRefresh })],
  templateUrl: './binary-puzzle.component.html',
  styleUrl: './binary-puzzle.component.css',
})
export class BinaryPuzzleComponent {
  private readonly i18n = inject(TranslateService);
  private readonly boardRef = viewChild<ElementRef<HTMLElement>>('board');

  readonly sizes: Size[] = [6, 8, 10];
  readonly timer = new GameTimer();
  readonly size = signal<Size>(8);
  readonly mode = signal<Mode>('daily');
  readonly puzzle = signal<BinaryPuzzle | null>(null);
  readonly cells = signal<number[]>(new Array(64).fill(-1));
  readonly won = signal(false);
  readonly cursor = signal(0);
  readonly hintsUsed = signal(0);
  /** Last hint: the cell it touched and the explanation key. */
  readonly hint = signal<{ index: number; key: string } | null>(null);
  private readonly history = signal<number[][]>([]);
  readonly canUndo = computed(() => this.history().length > 0 && !this.won());
  private stroke: Stroke | null = null;

  readonly indexes = computed(() => Array.from({ length: this.size() * this.size() }, (_, i) => i));
  readonly givens = computed(() => this.puzzle()?.givens ?? this.cells().map(() => -1));
  readonly violations = computed(() => findViolations(this.cells(), this.size()));
  readonly filledCount = computed(() => {
    const g = this.givens();
    return this.cells().filter((v, i) => v !== -1 && g[i] === -1).length;
  });
  readonly openCount = computed(() => this.givens().filter((v) => v === -1).length);
  readonly showHint = computed(() => !this.timer.running() && this.timer.elapsed() === 0 && !this.won());

  readonly solvedText = computed(() =>
    this.t('binaryPuzzle.solvedIn').replace('{size}', `${this.size()}×${this.size()}`).replace('{time}', this.timer.label()),
  );

  readonly shareText = computed(() => {
    const n = this.size();
    const daily = this.mode() === 'daily' ? ` · ${this.t('binaryPuzzle.dailyTag')}` : '';
    const hints = this.hintsUsed() ? ` · 💡${this.hintsUsed()}` : '';
    return `🟣🟠 ${this.t('binaryPuzzle.name')} ${n}×${n} · ${this.timer.label()}${hints}${daily}`;
  });

  constructor() {
    useGameSeo('binary-puzzle', 'binaryPuzzle.seo');
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
    const seed = this.mode() === 'daily' ? generateSeed() * 100 + n : Math.floor(Math.random() * 2 ** 31);
    const puzzle = generateBinaryPuzzle(n, seed);
    this.stroke = null;
    this.puzzle.set(puzzle);
    this.cells.set([...puzzle.givens]);
    this.history.set([]);
    this.won.set(false);
    this.hintsUsed.set(0);
    this.hint.set(null);
    this.cursor.set(Math.min(this.cursor(), n * n - 1));
    this.timer.reset();
  }

  undo(): void {
    const stack = this.history();
    if (!stack.length || this.won()) return;
    this.cells.set(stack[stack.length - 1]);
    this.history.set(stack.slice(0, -1));
    this.hint.set(null);
  }

  clear(): void {
    if (this.won() || !this.filledCount()) return;
    this.hint.set(null);
    this.commit([...this.givens()]);
  }

  useHint(): void {
    const p = this.puzzle();
    if (!p || this.won()) return;
    const cells = [...this.cells()];
    const n = this.size();
    const wrong = cells.findIndex((v, i) => v !== -1 && p.givens[i] === -1 && v !== p.solution[i]);
    let index: number;
    let key: string;
    if (wrong >= 0) {
      index = wrong;
      key = 'fix';
      cells[wrong] = -1;
    } else {
      const step = findDeduction(cells, n);
      index = step ? step.index : cells.findIndex((v) => v === -1);
      if (index < 0) return;
      key = step ? step.rule : 'reveal';
      cells[index] = p.solution[index];
    }
    this.hintsUsed.update((h) => h + 1);
    this.hint.set({ index, key });
    this.cursor.set(index);
    this.timer.start();
    this.commit(cells);
  }

  cellLabel(i: number): string {
    const n = this.size();
    const v = this.cells()[i];
    const parts = [
      this.t('binaryPuzzle.cell').replace('{r}', String(Math.floor(i / n) + 1)).replace('{c}', String((i % n) + 1)),
      v === -1 ? this.t('binaryPuzzle.empty') : String(v),
    ];
    if (this.givens()[i] !== -1) parts.push(this.t('binaryPuzzle.given'));
    if (this.violations().has(i)) parts.push(this.t('binaryPuzzle.broken'));
    return parts.join(', ');
  }

  // ---- Pointer: the value chosen on the first cell is painted on every cell the stroke enters. ----

  onPointerDown(event: PointerEvent): void {
    if (this.won() || !this.puzzle() || this.stroke) return;
    const el = (event.target as HTMLElement).closest<HTMLElement>('[data-i]');
    if (!el) return;
    if (event.pointerType === 'mouse' && event.button !== 0 && event.button !== 2) return;
    event.preventDefault();
    const i = Number(el.dataset['i']);
    this.cursor.set(i);
    if (this.givens()[i] !== -1) return;
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    const current = this.cells()[i];
    const value = event.button === 2 ? PREV[current] : NEXT[current];
    this.stroke = { pointerId: event.pointerId, value, snapshot: this.cells(), last: i };
    this.hint.set(null);
    this.timer.start();
    this.set(i, value);
  }

  onPointerMove(event: PointerEvent): void {
    const s = this.stroke;
    if (!s || event.pointerId !== s.pointerId) return;
    const hit = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-i]');
    if (!hit || !this.boardRef()?.nativeElement.contains(hit)) return;
    const i = Number(hit.dataset['i']);
    if (i === s.last) return;
    s.last = i;
    this.cursor.set(i);
    if (this.givens()[i] === -1) this.set(i, s.value);
  }

  onPointerUp(event: PointerEvent): void {
    const s = this.stroke;
    if (!s || event.pointerId !== s.pointerId) return;
    this.stroke = null;
    if (this.cells().some((v, i) => v !== s.snapshot[i])) {
      this.history.update((h) => [...h.slice(-199), s.snapshot]);
      this.checkWin();
    }
  }

  private set(i: number, value: number): void {
    if (this.cells()[i] === value) return;
    const next = [...this.cells()];
    next[i] = value;
    this.cells.set(next);
  }

  // ---- Keyboard ----

  onKeydown(event: KeyboardEvent): void {
    const n = this.size();
    const i = this.cursor();
    const moves: Record<string, [number, number]> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };
    if (moves[event.key]) {
      event.preventDefault();
      const [dr, dc] = moves[event.key];
      const r = Math.max(0, Math.min(n - 1, Math.floor(i / n) + dr));
      const c = Math.max(0, Math.min(n - 1, (i % n) + dc));
      this.cursor.set(r * n + c);
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      this.undo();
      return;
    }
    if (this.won() || this.givens()[i] !== -1) return;
    const current = this.cells()[i];
    let value: number;
    if (event.key === ' ' || event.key === 'Enter') value = NEXT[current];
    else if (event.key === '0' || event.key === '1') value = Number(event.key);
    else if (event.key === 'Backspace' || event.key === 'Delete') value = -1;
    else return;
    event.preventDefault();
    if (value === current) return;
    const next = [...this.cells()];
    next[i] = value;
    this.hint.set(null);
    this.timer.start();
    this.commit(next);
  }

  private commit(cells: number[]): void {
    this.history.update((h) => [...h.slice(-199), this.cells()]);
    this.cells.set(cells);
    this.checkWin();
  }

  private checkWin(): void {
    if (!isComplete(this.cells(), this.size())) return;
    this.timer.stop();
    this.won.set(true);
    this.hint.set(null);
    this.boardRef()?.nativeElement.blur();
  }
}
