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
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  tablerArrowBackUp,
  tablerBulb,
  tablerCalendar,
  tablerArrowsShuffle,
  tablerEraser,
  tablerWand,
  tablerRefresh,
} from "@ng-icons/tabler-icons";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { TranslateService } from "src/app/service/translate.service";
import { useGameSeo } from "../game-seo";
import { GameTimer } from "../shared/game-timer";
import { GameShareButtonComponent } from "../shared/game-share-button.component";
import { generateSeed } from "src/app/utils/generate-seed";
import { generatePuzzle } from "src/app/utils/queens-puzzle";
import type { Puzzle } from "src/app/utils/queens-puzzle";
import {
  attackedCells,
  cellsOnSegment,
  findConflicts,
} from "src/app/utils/queens-board";

interface BoardCell {
  row: number;
  col: number;
  region: number;
  hasQueen: boolean;
  hasX: boolean;
  locked: boolean;
}

type PuzzleMode = "daily" | "random";
type DragMode = "mark" | "erase";

interface DragState {
  pointerId: number;
  start: number;
  last: number;
  mode: DragMode | null;
  before: BoardCell[];
}

const REGION_BG: string[] = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-500",
  "bg-rose-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-sky-500",
];

const SIZES = [5, 6, 7, 8, 10];
const AUTO_X_KEY = "queens.autoX";
const MAX_HINTS = 3;

@Component({
  selector: "queens",
  templateUrl: "./queens.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, NgIconComponent, GameShareButtonComponent],
  providers: [
    provideIcons({
      tablerArrowBackUp,
      tablerBulb,
      tablerCalendar,
      tablerArrowsShuffle,
      tablerEraser,
      tablerWand,
      tablerRefresh,
    }),
  ],
  styles: [
    `:host button:focus-visible,:host [role=gridcell]:focus-visible{outline:2px solid #7a70e1;outline-offset:2px}
     :host [role=gridcell]:focus-visible{outline-color:#fff;outline-offset:-4px}`,
  ],
})
export class QueensComponent {
  private platformId = inject(PLATFORM_ID);
  private translate = inject(TranslateService);

  readonly boardRef = viewChild<ElementRef<HTMLElement>>("boardEl");
  readonly winRef = viewChild<ElementRef<HTMLElement>>("winEl");

  readonly timer = new GameTimer();
  readonly levels = [1, 2, 3, 4, 5];
  readonly sizes = SIZES;
  readonly modes: PuzzleMode[] = ["daily", "random"];

  level = signal(3);
  mode = signal<PuzzleMode>("daily");
  board = signal<BoardCell[]>([]);
  puzzle = signal<Puzzle | null>(null);
  size = signal(0);
  won = signal(false);
  hintsRemaining = signal(MAX_HINTS);
  cursor = signal(0);
  autoX = signal(false);
  started = signal(false);
  canUndo = signal(false);
  announcement = signal("");

  readonly queenCount = computed(
    () => this.board().filter((c) => c.hasQueen).length,
  );
  readonly errorCells = computed(() =>
    findConflicts(this.queenFlags(), this.regionList(), this.size()),
  );
  /** Cells a placed queen rules out, shown as faint ✕ when Auto ✕ is on. */
  readonly attacked = computed(() =>
    this.autoX()
      ? attackedCells(this.queenFlags(), this.regionList(), this.size())
      : new Set<number>(),
  );
  readonly rows = computed(() =>
    Array.from({ length: this.size() }, (_, r) => r),
  );
  readonly shareText = computed(() => {
    const hints = MAX_HINTS - this.hintsRemaining();
    return this.translate
      .translate("queens.share-text")
      .replace("{puzzle}", this.puzzleLabel())
      .replace("{time}", this.timer.label())
      .replace("{hints}", String(hints));
  });

  private history: BoardCell[][] = [];
  private drag: DragState | null = null;

  constructor() {
    useGameSeo("queens", "queens");

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      try {
        this.autoX.set(localStorage.getItem(AUTO_X_KEY) === "1");
      } catch {
        // Storage blocked: Auto ✕ just starts off.
      }
      this.loadPuzzle();
    });
  }

  levelName(level = this.level()): string {
    return this.translate.translate("queens.level-" + level);
  }

  puzzleLabel(): string {
    const n = SIZES[this.level() - 1];
    const base = `${this.levelName()} ${n}×${n}`;
    if (this.mode() !== "daily") return base;
    return `${base} · ${this.translate.translate("queens.mode-daily")} ${new Date().toISOString().slice(0, 10)}`;
  }

  setLevel(level: number): void {
    if (level === this.level()) return;
    this.level.set(level);
    this.loadPuzzle();
  }

  setMode(mode: PuzzleMode): void {
    if (mode === this.mode() && mode === "daily") return;
    this.mode.set(mode);
    this.loadPuzzle();
  }

  /** A fresh random board at the current level. */
  newGame(): void {
    this.mode.set("random");
    this.loadPuzzle();
  }

  loadPuzzle(): void {
    const seed =
      this.mode() === "daily"
        ? generateSeed()
        : Math.floor(Math.random() * 1_000_000_000);
    const p = generatePuzzle(seed, this.level());
    this.puzzle.set(p);
    this.size.set(p.size);

    const cells: BoardCell[] = [];
    for (let r = 0; r < p.size; r++) {
      for (let c = 0; c < p.size; c++) {
        cells.push({
          row: r,
          col: c,
          region: p.regions[r][c],
          hasQueen: false,
          hasX: false,
          locked: false,
        });
      }
    }
    this.board.set(cells);
    this.won.set(false);
    this.hintsRemaining.set(MAX_HINTS);
    this.cursor.set(0);
    this.started.set(false);
    this.history = [];
    this.canUndo.set(false);
    this.drag = null;
    this.timer.reset();
  }

  toggleAutoX(): void {
    this.autoX.update((v) => !v);
    try {
      localStorage.setItem(AUTO_X_KEY, this.autoX() ? "1" : "0");
    } catch {
      // Ignore storage errors.
    }
  }

  // ---- Pointer input: tap cycles a cell, a stroke marks or erases ✕ ----

  onPointerDown(event: PointerEvent): void {
    if (this.won() || this.drag) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const idx = this.cellAt(event.clientX, event.clientY);
    if (idx < 0) return;
    const el = event.currentTarget as HTMLElement;
    el.setPointerCapture?.(event.pointerId);
    this.cursor.set(idx);
    this.drag = {
      pointerId: event.pointerId,
      start: idx,
      last: idx,
      mode: null,
      before: this.board(),
    };
  }

  onPointerMove(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    const idx = this.cellAt(event.clientX, event.clientY);
    if (idx < 0 || idx === drag.last) return;

    const cells = this.board().map((c) => ({ ...c }));
    if (drag.mode === null) {
      // The first cell decides the stroke: from a ✕ it erases, otherwise it marks.
      const first = cells[drag.start];
      drag.mode = first.hasX ? "erase" : "mark";
      this.paint(cells[drag.start], drag.mode);
    }
    const N = this.size();
    for (const i of cellsOnSegment(drag.last, idx, N)) {
      this.paint(cells[i], drag.mode);
    }
    drag.last = idx;
    this.cursor.set(idx);
    this.board.set(cells);
    this.markStarted();
  }

  onPointerUp(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    this.drag = null;
    if (drag.mode === null) {
      this.cycle(drag.start);
      return;
    }
    this.pushHistory(drag.before);
    this.afterChange();
  }

  onPointerCancel(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    this.drag = null;
    if (drag.mode !== null) {
      this.pushHistory(drag.before);
      this.afterChange();
    }
  }

  // ---- Keyboard ----

  onKeydown(event: KeyboardEvent): void {
    const N = this.size();
    if (!N) return;
    const cur = this.cursor();
    const r = Math.floor(cur / N);
    const c = cur % N;
    let next = -1;
    switch (event.key) {
      case "ArrowUp":
        next = Math.max(r - 1, 0) * N + c;
        break;
      case "ArrowDown":
        next = Math.min(r + 1, N - 1) * N + c;
        break;
      case "ArrowLeft":
        next = r * N + Math.max(c - 1, 0);
        break;
      case "ArrowRight":
        next = r * N + Math.min(c + 1, N - 1);
        break;
      case "Home":
        next = r * N;
        break;
      case "End":
        next = r * N + N - 1;
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        this.cycle(cur);
        return;
      case "Backspace":
      case "Delete":
        event.preventDefault();
        this.setCell(cur, false, false);
        return;
      case "x":
      case "X":
        event.preventDefault();
        this.setCell(cur, false, !this.board()[cur]?.hasX);
        return;
      case "q":
      case "Q":
        event.preventDefault();
        this.setCell(cur, !this.board()[cur]?.hasQueen, false);
        return;
      case "z":
      case "Z":
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          this.undo();
        }
        return;
      default:
        return;
    }
    event.preventDefault();
    this.cursor.set(next);
    this.boardRef()
      ?.nativeElement.querySelector<HTMLElement>(`[data-i="${next}"]`)
      ?.focus();
  }

  // ---- Actions ----

  /** Tap or Space: empty → ✕ → queen → empty. */
  cycle(index: number): void {
    const cell = this.board()[index];
    if (!cell || cell.locked || this.won()) return;
    if (cell.hasQueen) this.setCell(index, false, false);
    else if (cell.hasX) this.setCell(index, true, false);
    else this.setCell(index, false, true);
  }

  undo(): void {
    if (this.won()) return;
    const prev = this.history.pop();
    if (!prev) return;
    this.board.set(prev);
    this.canUndo.set(this.history.length > 0);
    this.announce(this.translate.translate("queens.undone"));
  }

  clearBoard(): void {
    if (this.won()) return;
    const cells = this.board();
    if (!cells.some((c) => (c.hasQueen || c.hasX) && !c.locked)) return;
    this.pushHistory(cells);
    this.board.set(
      cells.map((c) =>
        c.locked ? c : { ...c, hasQueen: false, hasX: false },
      ),
    );
    this.afterChange();
  }

  useHint(): void {
    if (this.won() || this.hintsRemaining() <= 0) return;
    const puzzle = this.puzzle();
    if (!puzzle) return;
    const N = this.size();
    const cells = this.board();
    for (const [r, c] of puzzle.solution) {
      const idx = r * N + c;
      if (cells[idx].hasQueen && cells[idx].locked) continue;
      this.pushHistory(cells);
      const next = cells.map((cell) => ({ ...cell }));
      // A hinted queen also clears wrong queens from its row, column and region.
      for (const cell of next) {
        if (
          cell.hasQueen &&
          !cell.locked &&
          (cell.row === r || cell.col === c || cell.region === next[idx].region)
        ) {
          cell.hasQueen = false;
        }
      }
      next[idx] = { ...next[idx], hasQueen: true, hasX: false, locked: true };
      this.board.set(next);
      this.hintsRemaining.update((h) => h - 1);
      this.cursor.set(idx);
      this.markStarted();
      this.afterChange();
      return;
    }
  }

  // ---- Rendering helpers ----

  cellClass(index: number): string {
    const cells = this.board();
    const cell = cells[index];
    const N = this.size();
    const { row: r, col: c } = cell;
    const same = (i: number) => cells[i].region === cell.region;
    const parts = [REGION_BG[cell.region % REGION_BG.length]];
    parts.push(
      r > 0 && same(index - N) ? "border-t-[0.5px] border-t-white/15" : "border-t-2 border-t-white/60",
      r < N - 1 && same(index + N) ? "border-b-[0.5px] border-b-white/15" : "border-b-2 border-b-white/60",
      c > 0 && same(index - 1) ? "border-l-[0.5px] border-l-white/15" : "border-l-2 border-l-white/60",
      c < N - 1 && same(index + 1) ? "border-r-[0.5px] border-r-white/15" : "border-r-2 border-r-white/60",
    );
    if (cell.locked) parts.push("ring-2 ring-inset ring-amber-300");
    return parts.join(" ");
  }

  cellLabel(cell: BoardCell): string {
    const state = cell.hasQueen
      ? "queens.cell-queen"
      : cell.hasX
        ? "queens.cell-x"
        : "queens.cell-empty";
    return this.translate
      .translate("queens.cell-label")
      .replace("{row}", String(cell.row + 1))
      .replace("{col}", String(cell.col + 1))
      .concat(", ", this.translate.translate(state));
  }

  // ---- Internals ----

  private queenFlags(): boolean[] {
    return this.board().map((c) => c.hasQueen);
  }

  private regionList(): number[] {
    return this.board().map((c) => c.region);
  }

  private paint(cell: BoardCell, mode: DragMode): void {
    if (cell.locked || cell.hasQueen) return;
    cell.hasX = mode === "mark";
  }

  private setCell(index: number, queen: boolean, x: boolean): void {
    const cells = this.board();
    const cell = cells[index];
    if (!cell || cell.locked || this.won()) return;
    if (cell.hasQueen === queen && cell.hasX === x) return;
    this.pushHistory(cells);
    const next = [...cells];
    next[index] = { ...cell, hasQueen: queen, hasX: x };
    this.board.set(next);
    this.markStarted();
    this.afterChange();
  }

  private pushHistory(cells: BoardCell[]): void {
    this.history.push(cells);
    if (this.history.length > 200) this.history.shift();
    this.canUndo.set(true);
  }

  private markStarted(): void {
    this.started.set(true);
    this.timer.start();
  }

  private afterChange(): void {
    const N = this.size();
    const solved = this.queenCount() === N && this.errorCells().size === 0;
    if (!solved) return;
    this.won.set(true);
    this.timer.stop();
    this.announce(this.translate.translate("queens.congratulations"));
    // Bring the result into view once it has rendered below the board.
    setTimeout(() => {
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      this.winRef()?.nativeElement.scrollIntoView({
        block: "nearest",
        behavior: reduce ? "auto" : "smooth",
      });
    });
  }

  private announce(text: string): void {
    this.announcement.set(text);
  }

  private cellAt(x: number, y: number): number {
    const el = this.boardRef()?.nativeElement;
    const N = this.size();
    if (!el || !N) return -1;
    const rect = el.getBoundingClientRect();
    const col = Math.floor(((x - rect.left) / rect.width) * N);
    const row = Math.floor(((y - rect.top) / rect.height) * N);
    if (row < 0 || row >= N || col < 0 || col >= N) return -1;
    return row * N + col;
  }
}
