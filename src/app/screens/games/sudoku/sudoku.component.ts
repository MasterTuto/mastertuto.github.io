import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  PLATFORM_ID,
  afterNextRender,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { TranslateService } from "src/app/service/translate.service";
import { generateSeed } from "src/app/utils/generate-seed";
import { generateSudoku } from "src/app/utils/sudoku-puzzle";
import type { SudokuPuzzle } from "src/app/utils/sudoku-puzzle";

interface SudokuCell {
  row: number;
  col: number;
  value: number;
  given: boolean;
  notes: number[];
}

interface HistoryEntry {
  value: number;
  notes: number[];
}

@Component({
  selector: "sudoku",
  templateUrl: "./sudoku.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslatePipe],
})
export class SudokuComponent {
  private platformId = inject(PLATFORM_ID);
  private translateService = inject(TranslateService);

  sizes = [4, 6, 9];
  difficulties = [0, 1, 2];
  gridSize = signal(9);
  difficulty = signal(1);
  puzzle = signal<SudokuPuzzle | null>(null);
  board = signal<SudokuCell[]>([]);
  selected = signal<number | null>(null);
  notesMode = signal(false);
  won = signal(false);
  mistakes = signal(0);
  hintsRemaining = signal(3);
  elapsed = signal(0);

  private timerId: ReturnType<typeof setInterval> | null = null;
  private history: HistoryEntry[][] = [];

  get lang(): string | null {
    return this.translateService.currentLang;
  }

  get digits(): number[] {
    return Array.from({ length: this.gridSize() }, (_, i) => i + 1);
  }

  get timeLabel(): string {
    const total = this.elapsed();
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  get canUndo(): boolean {
    return this.history.length > 0;
  }

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.newGame();
        this.startTimer();
      }
    });
  }

  newGame(): void {
    const size = this.gridSize();
    const seed = generateSeed() * 31 + size * 100 + this.difficulty() * 7 + Math.floor(Math.random() * 100000);
    const p = generateSudoku(seed, size, this.difficulty());
    if (!p) {
      this.newGame();
      return;
    }
    this.puzzle.set(p);
    this.board.set(this.buildBoard(p));
    this.selected.set(null);
    this.won.set(false);
    this.mistakes.set(0);
    this.hintsRemaining.set(3);
    this.elapsed.set(0);
    this.history = [];
  }

  select(index: number): void {
    this.selected.set(index);
  }

  inputValue(value: number): void {
    if (this.won()) return;
    const sel = this.selected();
    if (sel === null) return;
    const cells = this.board().map((c) => ({ ...c, notes: [...c.notes] }));
    const cell = cells[sel];
    if (cell.given) return;

    if (cell.value === value) {
      this.clearCell();
      return;
    }

    this.history.push(this.snapshot());
    cell.value = value;
    cell.notes = [];
    this.board.set(cells);

    if (this.hasConflict(sel)) {
      this.mistakes.update((m) => m + 1);
    }
    this.checkWin(cells);
  }

  toggleNote(value: number): void {
    if (this.won()) return;
    const sel = this.selected();
    if (sel === null) return;
    const cells = this.board().map((c) => ({ ...c, notes: [...c.notes] }));
    const cell = cells[sel];
    if (cell.given) return;

    this.history.push(this.snapshot());
    if (cell.value !== 0) {
      cell.value = 0;
    }
    const idx = cell.notes.indexOf(value);
    if (idx >= 0) {
      cell.notes.splice(idx, 1);
    } else {
      cell.notes.push(value);
      cell.notes.sort((a, b) => a - b);
    }
    this.board.set(cells);
  }

  clearCell(): void {
    if (this.won()) return;
    const sel = this.selected();
    if (sel === null) return;
    const cells = this.board().map((c) => ({ ...c, notes: [...c.notes] }));
    const cell = cells[sel];
    if (cell.given) return;
    if (cell.value === 0 && cell.notes.length === 0) return;

    this.history.push(this.snapshot());
    cell.value = 0;
    cell.notes = [];
    this.board.set(cells);
    this.checkWin(cells);
  }

  undo(): void {
    const last = this.history.pop();
    if (!last) return;
    const cells = this.board().map((c, i) => ({
      ...c,
      value: last[i].value,
      notes: [...last[i].notes],
    }));
    this.board.set(cells);
  }

  useHint(): void {
    if (this.won() || this.hintsRemaining() <= 0) return;
    const puzzle = this.puzzle();
    if (!puzzle) return;

    const sel = this.selected();
    let target = sel !== null ? sel : this.firstIncorrectCell();
    if (target < 0) return;

    const cells = this.board().map((c) => ({ ...c, notes: [...c.notes] }));
    const cell = cells[target];
    const r = Math.floor(target / this.gridSize());
    const c = target % this.gridSize();
    const solutionValue = puzzle.solution[r][c];
    if (cell.given || cell.value === solutionValue) return;

    this.history.push(this.snapshot());
    cell.value = solutionValue;
    cell.notes = [];
    this.board.set(cells);
    this.hintsRemaining.update((h) => h - 1);
    this.selected.set(target);
    this.checkWin(cells);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const tag = (event.target as HTMLElement)?.tagName;
    if (tag === "SELECT" || tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;

    const N = this.gridSize();
    const sel = this.selected();
    const num = parseInt(event.key, 10);

    if (num >= 1 && num <= N) {
      event.preventDefault();
      if (this.notesMode()) {
        this.toggleNote(num);
      } else {
        this.inputValue(num);
      }
      return;
    }

    switch (event.key) {
      case "Backspace":
      case "Delete":
        event.preventDefault();
        this.clearCell();
        break;
      case "ArrowUp":
        if (sel !== null) {
          event.preventDefault();
          this.select(Math.max(Math.floor(sel / N) - 1, 0) * N + (sel % N));
        }
        break;
      case "ArrowDown":
        if (sel !== null) {
          event.preventDefault();
          this.select(Math.min(Math.floor(sel / N) + 1, N - 1) * N + (sel % N));
        }
        break;
      case "ArrowLeft":
        if (sel !== null) {
          event.preventDefault();
          this.select(Math.floor(sel / N) * N + Math.max((sel % N) - 1, 0));
        }
        break;
      case "ArrowRight":
        if (sel !== null) {
          event.preventDefault();
          this.select(Math.floor(sel / N) * N + Math.min((sel % N) + 1, N - 1));
        }
        break;
      case "n":
      case "N":
        this.notesMode.update((v) => !v);
        break;
    }
  }

  cellClass(index: number): string {
    const N = this.gridSize();
    const cells = this.board();
    const cell = cells[index];
    const sel = this.selected();
    const r = Math.floor(index / N);
    const c = index % N;
    const p = this.puzzle();
    const boxRows = p?.boxRows ?? 3;
    const boxCols = p?.boxCols ?? 3;
    const parts: string[] = [];

    const left = c % boxCols === 0;
    const top = r % boxRows === 0;
    const right = c === N - 1 || c % boxCols === boxCols - 1;
    const bottom = r === N - 1 || r % boxRows === boxRows - 1;

    parts.push(
      left ? "border-l-2 border-l-blue-400/70" : "border-l border-l-slate-700",
      top ? "border-t-2 border-t-blue-400/70" : "border-t border-t-slate-700",
      right ? "border-r-2 border-r-blue-400/70" : "border-r border-r-slate-700",
      bottom ? "border-b-2 border-b-blue-400/70" : "border-b border-b-slate-700",
    );

    const isSelected = sel === index;
    const sameGroup =
      sel !== null &&
      !isSelected &&
      (Math.floor(sel / N) === r ||
        sel % N === c ||
        (Math.floor(r / boxRows) === Math.floor(Math.floor(sel / N) / boxRows) &&
          Math.floor(c / boxCols) === Math.floor((sel % N) / boxCols)));
    const selectedValue = sel !== null ? cells[sel].value : 0;
    const sameNumber = !isSelected && selectedValue !== 0 && cell.value === selectedValue;
    const conflict = !cell.given && cell.value !== 0 && this.hasConflict(index);

    let bg = "bg-slate-900";
    if (conflict) {
      bg = "bg-red-500/30";
    } else if (isSelected) {
      bg = "bg-blue-500/25";
    } else if (sameNumber) {
      bg = "bg-sky-500/25";
    } else if (sameGroup) {
      bg = "bg-sky-400/10";
    }
    parts.push(bg);

    if (cell.given) {
      parts.push("text-white");
    } else if (conflict) {
      parts.push("text-red-300");
    } else {
      parts.push("text-blue-300");
    }

    if (!cell.given) {
      parts.push("cursor-pointer");
    }

    parts.push(
      "flex",
      "items-center",
      "justify-center",
      "aspect-square",
      "select-none",
      "touch-manipulation",
      "transition-colors",
      "duration-100",
    );

    return parts.join(" ");
  }

  isSelected(index: number): boolean {
    return this.selected() === index;
  }

  valueSizeClass(): string {
    const N = this.gridSize();
    if (N === 4) return "text-2xl sm:text-3xl font-bold";
    if (N === 6) return "text-xl sm:text-2xl font-bold";
    return "text-base sm:text-xl font-bold";
  }

  noteGridClass(): string {
    return this.gridSize() === 4 ? "grid-cols-2" : "grid-cols-3";
  }

  noteTextClass(): string {
    const N = this.gridSize();
    if (N === 4) return "text-xs sm:text-sm font-semibold";
    if (N === 6) return "text-[0.6rem] sm:text-xs font-semibold";
    return "text-[0.45rem] sm:text-[0.6rem] font-semibold";
  }

  private buildBoard(p: SudokuPuzzle): SudokuCell[] {
    const cells: SudokuCell[] = [];
    for (let r = 0; r < p.size; r++) {
      for (let c = 0; c < p.size; c++) {
        cells.push({
          row: r,
          col: c,
          value: p.puzzle[r][c] ?? 0,
          given: p.puzzle[r][c] !== null,
          notes: [],
        });
      }
    }
    return cells;
  }

  private snapshot(): HistoryEntry[] {
    return this.board().map((c) => ({ value: c.value, notes: [...c.notes] }));
  }

  private hasConflict(index: number): boolean {
    const cells = this.board();
    const N = this.gridSize();
    const cell = cells[index];
    const value = cell.value;
    if (value === 0) return false;
    const r = Math.floor(index / N);
    const c = index % N;
    const p = this.puzzle();
    const boxRows = p?.boxRows ?? 3;
    const boxCols = p?.boxCols ?? 3;

    for (let i = 0; i < N; i++) {
      if (i !== c && cells[r * N + i].value === value) return true;
    }
    for (let i = 0; i < N; i++) {
      if (i !== r && cells[i * N + c].value === value) return true;
    }
    const br = Math.floor(r / boxRows) * boxRows;
    const bc = Math.floor(c / boxCols) * boxCols;
    for (let i = br; i < br + boxRows; i++) {
      for (let j = bc; j < bc + boxCols; j++) {
        const idx = i * N + j;
        if (idx !== index && cells[idx].value === value) return true;
      }
    }
    return false;
  }

  private firstIncorrectCell(): number {
    const puzzle = this.puzzle();
    if (!puzzle) return -1;
    const cells = this.board();
    const N = this.gridSize();
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      if (cell.given) continue;
      const r = Math.floor(i / N);
      const c = i % N;
      if (cell.value === 0 || cell.value !== puzzle.solution[r][c]) return i;
    }
    return -1;
  }

  private checkWin(cells: SudokuCell[]): void {
    const N = this.gridSize();
    if (cells.every((c) => c.value !== 0)) {
      for (let i = 0; i < cells.length; i++) {
        if (this.hasConflict(i)) return;
      }
      this.won.set(true);
      this.stopTimer();
    }
  }

  private startTimer(): void {
    this.stopTimer();
    this.timerId = setInterval(() => {
      if (!this.won()) {
        this.elapsed.update((e) => e + 1);
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
