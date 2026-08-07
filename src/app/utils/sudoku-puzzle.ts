export interface SudokuPuzzle {
  size: number;
  boxRows: number;
  boxCols: number;
  solution: number[][];
  puzzle: (number | null)[][];
}

function seededRng(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return (s >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function canPlace(
  grid: number[][],
  row: number,
  col: number,
  value: number,
  boxRows: number,
  boxCols: number,
): boolean {
  const size = grid.length;
  for (let i = 0; i < size; i++) {
    if (grid[row][i] === value) return false;
    if (grid[i][col] === value) return false;
  }
  const br = Math.floor(row / boxRows) * boxRows;
  const bc = Math.floor(col / boxCols) * boxCols;
  for (let i = br; i < br + boxRows; i++) {
    for (let j = bc; j < bc + boxCols; j++) {
      if (grid[i][j] === value) return false;
    }
  }
  return true;
}

function fillGrid(
  size: number,
  boxRows: number,
  boxCols: number,
  rng: () => number,
): number[][] | null {
  const grid: number[][] = Array.from({ length: size }, () => Array(size).fill(0));
  const numbers = Array.from({ length: size }, (_, i) => i + 1);

  function solve(): boolean {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] !== 0) continue;
        for (const v of shuffle(numbers, rng)) {
          if (canPlace(grid, r, c, v, boxRows, boxCols)) {
            grid[r][c] = v;
            if (solve()) return true;
            grid[r][c] = 0;
          }
        }
        return false;
      }
    }
    return true;
  }

  return solve() ? grid : null;
}

function countSolutions(
  grid: number[][],
  boxRows: number,
  boxCols: number,
  limit: number,
): number {
  const size = grid.length;
  let count = 0;

  function findEmpty(): [number, number] | null {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 0) return [r, c];
      }
    }
    return null;
  }

  function solve(): boolean {
    if (count >= limit) return false;
    const empty = findEmpty();
    if (!empty) {
      count++;
      return count < limit;
    }
    const [r, c] = empty;
    for (let v = 1; v <= size; v++) {
      if (canPlace(grid, r, c, v, boxRows, boxCols)) {
        grid[r][c] = v;
        if (!solve()) return false;
        grid[r][c] = 0;
      }
    }
    return true;
  }

  solve();
  return count;
}

interface SizeConfig {
  boxRows: number;
  boxCols: number;
  minClues: number;
  targetClues: number[];
}

const SIZE_CONFIG: Record<number, SizeConfig> = {
  4: { boxRows: 2, boxCols: 2, minClues: 6, targetClues: [12, 9, 7] },
  6: { boxRows: 2, boxCols: 3, minClues: 14, targetClues: [26, 20, 16] },
  9: { boxRows: 3, boxCols: 3, minClues: 28, targetClues: [46, 36, 30] },
};

export function generateSudoku(
  seed: number,
  size: number = 9,
  difficulty: number = 1,
): SudokuPuzzle | null {
  const config = SIZE_CONFIG[size];
  if (!config || difficulty < 0 || difficulty > 2) return null;
  const rng = seededRng(seed);

  const solution = fillGrid(size, config.boxRows, config.boxCols, rng);
  if (!solution) return null;

  const puzzle = solution.map((row) => row.map((v) => v as number | null));
  const target = config.targetClues[difficulty];
  const cells = Array.from({ length: size * size }, (_, i) => i);
  const order = shuffle(cells, rng);

  for (const idx of order) {
    const r = Math.floor(idx / size);
    const c = idx % size;
    const backup = puzzle[r][c];
    if (backup === null) continue;
    puzzle[r][c] = null;
    const remaining = puzzle.flat().filter((v) => v !== null).length;
    if (remaining < config.minClues || countSolutions(
      puzzle.map((row) => row.map((v) => v ?? 0)),
      config.boxRows,
      config.boxCols,
      2,
    ) > 1) {
      puzzle[r][c] = backup;
    }
    if (remaining - 1 <= target) break;
  }

  return { size, boxRows: config.boxRows, boxCols: config.boxCols, solution, puzzle };
}
