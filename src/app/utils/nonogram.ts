/**
 * Nonogram (paint-by-numbers) logic: clues, a line solver and a seeded generator that only produces
 * puzzles solvable by pure line logic, which also guarantees a unique solution. No Angular imports so it
 * can be tested with Node (`node --test scripts/test-nonogram.mjs`).
 *
 * Grids are flat arrays in row-major order. Solver cells use -1 = unknown, 0 = empty, 1 = filled.
 */

export type NonogramSize = 5 | 10 | 15;

export interface NonogramPuzzle {
  size: number;
  /** Clue numbers of each row, left to right. An empty line has the clue `[0]`. */
  rows: number[][];
  /** Clue numbers of each column, top to bottom. */
  cols: number[][];
  /** Row-major solution, 1 = filled. */
  solution: number[];
  /** Id of a hand-drawn picture, or null for a generated image. */
  picture: string | null;
}

export interface LineSolveResult {
  /** Row-major cells: -1 unknown, 0 empty, 1 filled. */
  grid: number[];
  solved: boolean;
  contradiction: boolean;
}

/** Most clue numbers a line may have per size, so the clue gutters keep a fixed size on small screens. */
export const MAX_CLUES: Record<number, number> = { 5: 3, 10: 5, 15: 5 };

/** Small seeded PRNG (mulberry32), returns floats in [0, 1). */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Run lengths of the filled cells of a line; `[0]` when it has none. */
export function lineClue(line: ArrayLike<number>): number[] {
  const clue: number[] = [];
  let run = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === 1) run++;
    else if (run) {
      clue.push(run);
      run = 0;
    }
  }
  if (run) clue.push(run);
  return clue.length ? clue : [0];
}

export function rowOf(grid: ArrayLike<number>, size: number, r: number): number[] {
  return Array.from({ length: size }, (_, c) => grid[r * size + c]);
}

export function colOf(grid: ArrayLike<number>, size: number, c: number): number[] {
  return Array.from({ length: size }, (_, r) => grid[r * size + c]);
}

export function cluesOf(grid: ArrayLike<number>, size: number): { rows: number[][]; cols: number[][] } {
  const rows: number[][] = [];
  const cols: number[][] = [];
  for (let i = 0; i < size; i++) {
    rows.push(lineClue(rowOf(grid, size, i)));
    cols.push(lineClue(colOf(grid, size, i)));
  }
  return { rows, cols };
}

export function sameClue(a: readonly number[], b: readonly number[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

/**
 * Everything that can be deduced about one line from its clue and the known cells. Returns the refined
 * line (-1 unknown, 0 empty, 1 filled) or null if no arrangement of the clue fits the known cells.
 */
export function solveLine(clue: readonly number[], cells: readonly number[]): number[] | null {
  const n = cells.length;
  const blocks = clue.length === 1 && clue[0] === 0 ? [] : clue;
  const k = blocks.length;
  // filledBefore[i] = number of cells known filled in [0, i).
  const filledBefore = new Int32Array(n + 1);
  const emptyBefore = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    filledBefore[i + 1] = filledBefore[i] + (cells[i] === 1 ? 1 : 0);
    emptyBefore[i + 1] = emptyBefore[i] + (cells[i] === 0 ? 1 : 0);
  }
  // fits[i][j]: blocks j..k-1 can be placed in cells i..n-1.
  const fits: Uint8Array[] = Array.from({ length: n + 2 }, () => new Uint8Array(k + 1));
  for (let i = n; i >= 0; i--) {
    for (let j = k; j >= 0; j--) {
      if (j === k) {
        fits[i][j] = filledBefore[n] - filledBefore[i] === 0 ? 1 : 0;
        continue;
      }
      let ok = false;
      if (i < n && cells[i] !== 1 && fits[i + 1][j]) ok = true;
      const len = blocks[j];
      const end = i + len;
      if (!ok && end <= n && emptyBefore[end] - emptyBefore[i] === 0 && (end === n || cells[end] !== 1)) {
        ok = !!fits[Math.min(end + 1, n)][j + 1];
      }
      fits[i][j] = ok ? 1 : 0;
    }
  }
  if (!fits[0][0]) return null;

  const canFill = new Uint8Array(n);
  const canEmpty = new Uint8Array(n);
  const reach: Uint8Array[] = Array.from({ length: n + 2 }, () => new Uint8Array(k + 1));
  reach[0][0] = 1;
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= k; j++) {
      if (!reach[i][j] || !fits[i][j]) continue;
      if (i === n) continue;
      if (j === k) {
        for (let t = i; t < n; t++) canEmpty[t] = 1;
        continue;
      }
      if (cells[i] !== 1 && fits[i + 1][j]) {
        canEmpty[i] = 1;
        reach[i + 1][j] = 1;
      }
      const len = blocks[j];
      const end = i + len;
      if (end <= n && emptyBefore[end] - emptyBefore[i] === 0 && (end === n || cells[end] !== 1)) {
        const next = Math.min(end + 1, n);
        if (fits[next][j + 1]) {
          for (let t = i; t < end; t++) canFill[t] = 1;
          if (end < n) canEmpty[end] = 1;
          reach[next][j + 1] = 1;
        }
      }
    }
  }
  const out = new Array<number>(n);
  for (let i = 0; i < n; i++) out[i] = canFill[i] && canEmpty[i] ? -1 : canFill[i] ? 1 : 0;
  return out;
}

/** Solves as far as line-by-line logic goes, starting from `start` (all unknown by default). */
export function lineSolve(rows: number[][], cols: number[][], start?: readonly number[]): LineSolveResult {
  const size = rows.length;
  const grid = start ? [...start] : new Array<number>(size * size).fill(-1);
  // Lines are 0..size-1 for rows and size..2*size-1 for columns.
  const dirty = new Uint8Array(size * 2).fill(1);
  let pending = size * 2;
  while (pending > 0) {
    for (let l = 0; l < size * 2; l++) {
      if (!dirty[l]) continue;
      dirty[l] = 0;
      pending--;
      const isRow = l < size;
      const idx = isRow ? l : l - size;
      const line = isRow ? rowOf(grid, size, idx) : colOf(grid, size, idx);
      const solvedLine = solveLine(isRow ? rows[idx] : cols[idx], line);
      if (!solvedLine) return { grid, solved: false, contradiction: true };
      for (let t = 0; t < size; t++) {
        if (solvedLine[t] === line[t]) continue;
        const cell = isRow ? idx * size + t : t * size + idx;
        grid[cell] = solvedLine[t];
        const other = isRow ? size + t : t;
        if (!dirty[other]) {
          dirty[other] = 1;
          pending++;
        }
      }
    }
  }
  return { grid, solved: grid.every((v) => v !== -1), contradiction: false };
}

/** True when line logic alone fully determines the image (hence the solution is unique). */
export function isLineSolvable(solution: readonly number[], size: number): boolean {
  const { rows, cols } = cluesOf(solution, size);
  return lineSolve(rows, cols).solved;
}

function maxClueCount(solution: readonly number[], size: number): number {
  const { rows, cols } = cluesOf(solution, size);
  return Math.max(...rows.map((c) => c.length), ...cols.map((c) => c.length));
}

function hasEmptyLine(grid: readonly number[], size: number): boolean {
  for (let i = 0; i < size; i++) {
    if (rowOf(grid, size, i).every((v) => v !== 1)) return true;
    if (colOf(grid, size, i).every((v) => v !== 1)) return true;
  }
  return false;
}

/** A blobby random image: noise smoothed by a majority filter so it looks less like static. */
function randomImage(size: number, rng: () => number): number[] {
  const density = 0.5 + rng() * 0.1;
  let grid = Array.from({ length: size * size }, () => (rng() < density ? 1 : 0));
  if (size >= 10) {
    const next = [...grid];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        let filled = 0;
        let total = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const rr = r + dr;
            const cc = c + dc;
            if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue;
            total++;
            filled += grid[rr * size + cc];
          }
        }
        const ratio = filled / total;
        // Majority with a bit of noise kept, so shapes are compact but not boring.
        if (ratio > 0.6) next[r * size + c] = 1;
        else if (ratio < 0.4) next[r * size + c] = 0;
      }
    }
    grid = next;
  }
  return grid;
}

/**
 * Generates a random image that is solvable with line logic and keeps at most MAX_CLUES numbers per line.
 * When the first image is ambiguous, cells that line logic could not settle are flipped a few times
 * before starting over, which converges quickly.
 */
export function generateRandomNonogram(size: number, seed: number): NonogramPuzzle {
  const rng = seededRandom(seed);
  const maxClues = MAX_CLUES[size] ?? Math.ceil(size / 2);
  const minDensity = size === 5 ? 0.4 : 0.45;
  const maxDensity = size === 5 ? 0.76 : 0.7;
  let fallback: number[] | null = null;
  for (let attempt = 0; attempt < 400; attempt++) {
    const image = randomImage(size, rng);
    for (let tweak = 0; tweak < 12; tweak++) {
      const density = image.reduce((a, b) => a + b, 0) / image.length;
      const valid =
        density >= minDensity && density <= maxDensity && !hasEmptyLine(image, size) && maxClueCount(image, size) <= maxClues;
      const { rows, cols } = cluesOf(image, size);
      const result = lineSolve(rows, cols);
      if (result.solved && valid) {
        return { size, rows, cols, solution: [...image], picture: null };
      }
      if (result.solved && !fallback) fallback = [...image];
      // Flip one undetermined cell (prefer filling, which usually adds information) and try again.
      const unknown: number[] = [];
      result.grid.forEach((v, i) => v === -1 && unknown.push(i));
      if (!unknown.length) {
        // Solved but outside the constraints: thin a crowded line or fill a gap at random.
        const i = Math.floor(rng() * image.length);
        image[i] = density > maxDensity ? 0 : 1;
        continue;
      }
      const pick = unknown[Math.floor(rng() * unknown.length)];
      image[pick] = image[pick] ? 0 : 1;
    }
  }
  // Practically unreachable; a line-solvable image is always better than nothing.
  const image = fallback ?? new Array<number>(size * size).fill(1);
  const { rows, cols } = cluesOf(image, size);
  return { size, rows, cols, solution: image, picture: null };
}

/**
 * Hand-drawn pictures ('#' = filled). Each one is checked by the tests to be solvable with line logic
 * and to respect MAX_CLUES.
 */
export const PICTURES: Record<string, { size: number; art: string[] }> = {
  heart5: { size: 5, art: ['.#.#.', '#####', '#####', '.###.', '..#..'] },
  house5: { size: 5, art: ['..#..', '.###.', '#####', '.#.#.', '.###.'] },
  smile5: { size: 5, art: ['.#.#.', '.#.#.', '#...#', '#...#', '.###.'] },
  arrow5: { size: 5, art: ['..#..', '.###.', '#.#.#', '..#..', '..#..'] },
  heart10: {
    size: 10,
    art: [
      '.##....##.',
      '####..####',
      '##########',
      '##########',
      '##########',
      '.########.',
      '..######..',
      '...####...',
      '....##....',
      '....##....',
    ],
  },
  house10: {
    size: 10,
    art: [
      '....##.##.',
      '...######.',
      '..########',
      '.#########',
      '##########',
      '.########.',
      '.##..#..#.',
      '.##..#..#.',
      '.##.....#.',
      '.########.',
    ],
  },
  cat10: {
    size: 10,
    art: [
      '#......#..',
      '##....##..',
      '########..',
      '#..##..#..',
      '########..',
      '.######...',
      '..####...#',
      '.######..#',
      '.#######.#',
      '.##..####.',
    ],
  },
  tree10: {
    size: 10,
    art: [
      '....##....',
      '...####...',
      '..######..',
      '...####...',
      '..######..',
      '.########.',
      '##########',
      '....##....',
      '....##....',
      '..######..',
    ],
  },
  note10: {
    size: 10,
    art: [
      '...#######',
      '...#######',
      '...#....##',
      '...#.....#',
      '...#.....#',
      '...#.....#',
      '.###...###',
      '####..####',
      '####..####',
      '.##....##.',
    ],
  },
  cup10: {
    size: 10,
    art: [
      '..#..#....',
      '...#..#...',
      '..#..#....',
      '..........',
      '########..',
      '##########',
      '########.#',
      '#########.',
      '.######...',
      '..####....',
    ],
  },
};

export function pictureIds(size: number): string[] {
  return Object.keys(PICTURES).filter((id) => PICTURES[id].size === size);
}

export function pictureNonogram(id: string): NonogramPuzzle {
  const { size, art } = PICTURES[id];
  const solution: number[] = [];
  for (const line of art) for (const ch of line) solution.push(ch === '#' ? 1 : 0);
  const { rows, cols } = cluesOf(solution, size);
  return { size, rows, cols, solution, picture: id };
}

/** True when the filled cells of `grid` (any value other than 1 counts as empty) match every clue. */
export function isSolved(grid: readonly number[], rows: number[][], cols: number[][]): boolean {
  const size = rows.length;
  for (let i = 0; i < size; i++) {
    if (!sameClue(lineClue(rowOf(grid, size, i)), rows[i])) return false;
    if (!sameClue(lineClue(colOf(grid, size, i)), cols[i])) return false;
  }
  return true;
}
