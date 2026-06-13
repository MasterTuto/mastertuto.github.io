import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  PLATFORM_ID,
  afterNextRender,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { TranslateService } from "src/app/service/translate.service";
import { generateSeed } from "src/app/utils/generate-seed";
import { generatePuzzle } from "src/app/utils/queens-puzzle";
import type { Puzzle } from "src/app/utils/queens-puzzle";

interface BoardCell {
  row: number;
  col: number;
  region: number;
  hasQueen: boolean;
  hasX: boolean;
  locked: boolean;
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

@Component({
  selector: "queens",
  templateUrl: "./queens.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslatePipe],
})
export class QueensComponent {
  private platformId = inject(PLATFORM_ID);
  private translateService = inject(TranslateService);

  @ViewChild("boardEl") boardRef?: ElementRef<HTMLElement>;

  levels = [1, 2, 3, 4, 5];
  level = signal(3);
  board = signal<BoardCell[]>([]);
  puzzle = signal<Puzzle | null>(null);
  size = signal(0);
  won = signal(false);
  queenCount = signal(0);
  errorCells = signal<Set<number>>(new Set());
  hintsRemaining = signal(3);
  lastTouchedCell = -1;

  get lang(): string | null {
    return this.translateService.currentLang;
  }

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.newGame();
      }
    });
  }

  newGame(): void {
    const seed = generateSeed();
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
    this.queenCount.set(0);
    this.errorCells.set(new Set());
    this.hintsRemaining.set(3);
    this.lastTouchedCell = -1;
  }

  interact(index: number): void {
    if (this.won()) return;
    const cells = this.board().map((c) => ({ ...c }));
    const cell = cells[index];
    if (cell.locked) return;

    if (!cell.hasQueen && !cell.hasX) {
      cell.hasX = true;
    } else if (cell.hasX) {
      cell.hasX = false;
      cell.hasQueen = true;
    } else if (cell.hasQueen) {
      cell.hasQueen = false;
    }

    cells[index] = cell;
    this.board.set(cells);
    this.queenCount.set(cells.filter((c) => c.hasQueen).length);
    this.validate();
  }

  slideMark(index: number): void {
    if (this.won()) return;
    if (index < 0 || index >= this.board().length) return;
    if (index === this.lastTouchedCell) return;
    this.lastTouchedCell = index;

    const cells = this.board().map((c) => ({ ...c }));
    const cell = cells[index];
    if (cell.locked || cell.hasQueen) return;

    cell.hasX = !cell.hasX;
    cells[index] = cell;
    this.board.set(cells);
    this.queenCount.set(cells.filter((c) => c.hasQueen).length);
    this.validate();
  }

  useHint(): void {
    if (this.won() || this.hintsRemaining() <= 0) return;
    const puzzle = this.puzzle();
    if (!puzzle) return;

    const cells = this.board().map((c) => ({ ...c }));

    for (const [r, c] of puzzle.solution) {
      const idx = r * this.size() + c;
      if (!cells[idx].hasQueen && !cells[idx].locked) {
        cells[idx].hasQueen = true;
        cells[idx].hasX = false;
        cells[idx].locked = true;
        this.board.set(cells);
        this.hintsRemaining.update((h) => h - 1);
        this.queenCount.set(cells.filter((cell) => cell.hasQueen).length);
        this.validate();
        return;
      }
    }
  }

  onTouchStart(event: TouchEvent): void {
    const idx = this.cellFromTouch(event);
    if (idx >= 0) {
      this.lastTouchedCell = idx;
      this.slideMark(idx);
    }
  }

  onTouchMove(event: TouchEvent): void {
    event.preventDefault();
    const idx = this.cellFromTouch(event);
    if (idx >= 0) {
      this.slideMark(idx);
    }
  }

  onTouchEnd(): void {
    this.lastTouchedCell = -1;
  }

  private cellFromTouch(event: TouchEvent): number {
    const touch = event.touches[0];
    const el = this.boardRef?.nativeElement;
    if (!el) return -1;
    const rect = el.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const N = this.size();
    const cellSize = rect.width / N;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    if (row >= 0 && row < N && col >= 0 && col < N) {
      return row * N + col;
    }
    return -1;
  }

  private validate(): void {
    const cells = this.board();
    const N = this.size();
    const errors = new Set<number>();

    if (this.queenCount() === 0) {
      this.errorCells.set(errors);
      this.won.set(false);
      return;
    }

    for (let r = 0; r < N; r++) {
      const qs: number[] = [];
      for (let c = 0; c < N; c++) {
        const i = r * N + c;
        if (cells[i].hasQueen) qs.push(i);
      }
      if (qs.length > 1) qs.forEach((i) => errors.add(i));
    }

    for (let c = 0; c < N; c++) {
      const qs: number[] = [];
      for (let r = 0; r < N; r++) {
        const i = r * N + c;
        if (cells[i].hasQueen) qs.push(i);
      }
      if (qs.length > 1) qs.forEach((i) => errors.add(i));
    }

    const regionQueens = new Map<number, number[]>();
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].hasQueen) {
        const reg = cells[i].region;
        if (!regionQueens.has(reg)) regionQueens.set(reg, []);
        regionQueens.get(reg)!.push(i);
      }
    }
    for (const [, indices] of regionQueens) {
      if (indices.length > 1) indices.forEach((i) => errors.add(i));
    }

    for (let i = 0; i < cells.length; i++) {
      if (!cells[i].hasQueen) continue;
      const r1 = cells[i].row;
      const c1 = cells[i].col;
      for (let j = i + 1; j < cells.length; j++) {
        if (!cells[j].hasQueen) continue;
        const r2 = cells[j].row;
        const c2 = cells[j].col;
        if (Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1) {
          errors.add(i);
          errors.add(j);
        }
      }
    }

    this.errorCells.set(errors);

    const total = cells.filter((c) => c.hasQueen).length;
    this.won.set(total === N && errors.size === 0);
  }

  getCellClass(index: number): string {
    const cells = this.board();
    const cell = cells[index];
    const N = this.size();
    const r = cell.row;
    const c = cell.col;
    const parts: string[] = [];

    parts.push(REGION_BG[cell.region % REGION_BG.length]);

    const topS = r > 0 && cells[(r - 1) * N + c].region === cell.region;
    const botS =
      r < N - 1 && cells[(r + 1) * N + c].region === cell.region;
    const lS = c > 0 && cells[r * N + (c - 1)].region === cell.region;
    const rS =
      c < N - 1 && cells[r * N + (c + 1)].region === cell.region;

    parts.push(
      topS
        ? "border-t-[0.5px] border-t-white/15"
        : "border-t-2 border-t-white/60",
    );
    parts.push(
      botS
        ? "border-b-[0.5px] border-b-white/15"
        : "border-b-2 border-b-white/60",
    );
    parts.push(
      lS
        ? "border-l-[0.5px] border-l-white/15"
        : "border-l-2 border-l-white/60",
    );
    parts.push(
      rS
        ? "border-r-[0.5px] border-r-white/15"
        : "border-r-2 border-r-white/60",
    );

    if (this.errorCells().has(index)) {
      parts.push("bg-red-500/40");
    }

    if (cell.locked) {
      parts.push("ring-2 ring-amber-400/60 ring-inset");
    }

    parts.push(
      "cursor-pointer",
      "select-none",
      "touch-manipulation",
      "transition-colors",
      "duration-150",
    );

    return parts.join(" ");
  }
}
