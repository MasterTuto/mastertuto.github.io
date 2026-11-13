/**
 * Binary puzzle (Takuzu / Binairo) logic: valid lines, a human-style logical solver, a solution counter,
 * a seeded generator with unique solutions and live rule checking. No Angular imports so it can be tested
 * with Node (`node --test scripts/test-binary-puzzle.mjs`).
 *
 * Grids are flat row-major arrays: -1 = empty, 0 or 1 = digit.
 * Rules: no more than two equal digits side by side, each row and column has as many 0s as 1s, and no two
 * rows (or two columns) are identical.
 */

export type BinaryLevel = 'basic' | 'line';
export type DeductionRule = 'pair' | 'gap' | 'count' | 'line';

export interface BinaryPuzzle {
  size: number;
  /** Row-major givens: -1 for the cells the player fills. */
  givens: number[];
  solution: number[];
}

export interface Deduction {
  index: number;
  value: number;
  rule: DeductionRule;
}

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

function shuffle<T>(items: T[], rng: () => number): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

const lineCache = new Map<number, number[]>();

/** Every complete line of length n that is balanced and has no three equal digits in a row, as bit masks. */
export function validLines(n: number): number[] {
  const cached = lineCache.get(n);
  if (cached) return cached;
  const out: number[] = [];
  for (let mask = 0; mask < 1 << n; mask++) {
    let ones = 0;
    let ok = true;
    for (let i = 0; i < n; i++) {
      const bit = (mask >> i) & 1;
      ones += bit;
      if (i >= 2 && bit === ((mask >> (i - 1)) & 1) && bit === ((mask >> (i - 2)) & 1)) {
        ok = false;
        break;
      }
    }
    if (ok && ones * 2 === n) out.push(mask);
  }
  lineCache.set(n, out);
  return out;
}

function lineIndices(n: number, line: number): number[] {
  // Lines 0..n-1 are rows, n..2n-1 are columns.
  return line < n
    ? Array.from({ length: n }, (_, c) => line * n + c)
    : Array.from({ length: n }, (_, r) => r * n + (line - n));
}

/** Known/value masks of a line: bit i set in `known` when cell i is filled, `value` holds the digits. */
function lineMasks(grid: readonly number[], cells: readonly number[]): { known: number; value: number } {
  let known = 0;
  let value = 0;
  cells.forEach((cell, i) => {
    if (grid[cell] === -1) return;
    known |= 1 << i;
    if (grid[cell] === 1) value |= 1 << i;
  });
  return { known, value };
}

/** Pair, gap and count deductions available right now, in that order of simplicity. */
export function simpleDeductions(grid: readonly number[], n: number): Deduction[] {
  const found = new Map<number, Deduction>();
  const add = (index: number, value: number, rule: DeductionRule) => {
    if (grid[index] === -1 && !found.has(index)) found.set(index, { index, value, rule });
  };
  const lines = Array.from({ length: n * 2 }, (_, l) => lineIndices(n, l));
  for (const rule of ['pair', 'gap', 'count'] as const) {
    for (const cells of lines) {
      const v = cells.map((c) => grid[c]);
      if (rule === 'pair') {
        for (let i = 0; i + 1 < n; i++) {
          if (v[i] === -1 || v[i] !== v[i + 1]) continue;
          if (i > 0) add(cells[i - 1], 1 - v[i], 'pair');
          if (i + 2 < n) add(cells[i + 2], 1 - v[i], 'pair');
        }
      } else if (rule === 'gap') {
        for (let i = 0; i + 2 < n; i++) {
          if (v[i] !== -1 && v[i] === v[i + 2]) add(cells[i + 1], 1 - v[i], 'gap');
        }
      } else {
        const zeros = v.filter((x) => x === 0).length;
        const ones = v.filter((x) => x === 1).length;
        if (zeros + ones === n) continue;
        if (zeros * 2 === n) cells.forEach((c) => add(c, 1, 'count'));
        else if (ones * 2 === n) cells.forEach((c) => add(c, 0, 'count'));
      }
    }
  }
  return [...found.values()];
}

/**
 * Deductions from looking at one whole line: every completion that keeps the rules (and differs from the
 * complete lines in the same direction) agrees on these cells. Returns null on a contradiction.
 */
export function lineDeductions(grid: readonly number[], n: number): Deduction[] | null {
  const all = validLines(n);
  const out: Deduction[] = [];
  const seen = new Set<number>();
  const full = (1 << n) - 1;
  for (let l = 0; l < n * 2; l++) {
    const cells = lineIndices(n, l);
    const { known, value } = lineMasks(grid, cells);
    if (known === full) continue;
    // Complete lines in the same direction this one must not copy.
    const taken = new Set<number>();
    const start = l < n ? 0 : n;
    for (let o = start; o < start + n; o++) {
      if (o === l) continue;
      const m = lineMasks(grid, lineIndices(n, o));
      if (m.known === full) taken.add(m.value);
    }
    let and = full;
    let or = 0;
    let count = 0;
    for (const cand of all) {
      if ((cand & known) !== value || taken.has(cand)) continue;
      and &= cand;
      or |= cand;
      count++;
    }
    if (!count) return null;
    for (let i = 0; i < n; i++) {
      const bit = 1 << i;
      if (known & bit) continue;
      const cell = cells[i];
      if (seen.has(cell)) continue;
      if (and & bit) out.push({ index: cell, value: 1, rule: 'line' });
      else if (!(or & bit)) out.push({ index: cell, value: 0, rule: 'line' });
      else continue;
      seen.add(cell);
    }
  }
  return out;
}

/** The simplest next step a person could find, or null when logic at this level is stuck. */
export function findDeduction(grid: readonly number[], n: number, level: BinaryLevel = 'line'): Deduction | null {
  const simple = simpleDeductions(grid, n);
  if (simple.length) return simple[0];
  if (level === 'basic') return null;
  const line = lineDeductions(grid, n);
  return line && line.length ? line[0] : null;
}

/** Solves as far as logic of the given level goes. */
export function logicSolve(
  start: readonly number[],
  n: number,
  level: BinaryLevel,
): { grid: number[]; solved: boolean; contradiction: boolean } {
  const grid = [...start];
  for (;;) {
    if (hasViolations(grid, n)) return { grid, solved: false, contradiction: true };
    let steps = simpleDeductions(grid, n);
    if (!steps.length && level === 'line') {
      const line = lineDeductions(grid, n);
      if (!line) return { grid, solved: false, contradiction: true };
      steps = line;
    }
    if (!steps.length) break;
    for (const s of steps) grid[s.index] = s.value;
  }
  const solved = grid.every((v) => v !== -1) && !hasViolations(grid, n);
  return { grid, solved, contradiction: false };
}

/** Counts completions of `givens` up to `limit` by trying valid lines row by row. */
export function countSolutions(givens: readonly number[], n: number, limit = 2): number {
  const all = validLines(n);
  const half = n / 2;
  const rows: number[] = [];
  let count = 0;
  const colOk = (rowsSoFar: number[]): boolean => {
    const r = rowsSoFar.length;
    for (let c = 0; c < n; c++) {
      let ones = 0;
      for (let i = 0; i < r; i++) ones += (rowsSoFar[i] >> c) & 1;
      if (ones > half || r - ones > half) return false;
      if (r >= 3) {
        const a = (rowsSoFar[r - 1] >> c) & 1;
        if (a === ((rowsSoFar[r - 2] >> c) & 1) && a === ((rowsSoFar[r - 3] >> c) & 1)) return false;
      }
    }
    return true;
  };
  const search = (r: number) => {
    if (count >= limit) return;
    if (r === n) {
      const cols = new Set<number>();
      for (let c = 0; c < n; c++) {
        let m = 0;
        for (let i = 0; i < n; i++) m |= ((rows[i] >> c) & 1) << i;
        cols.add(m);
      }
      if (cols.size === n) count++;
      return;
    }
    const { known, value } = lineMasks(givens, lineIndices(n, r));
    for (const cand of all) {
      if ((cand & known) !== value || rows.includes(cand)) continue;
      rows.push(cand);
      if (colOk(rows)) search(r + 1);
      rows.pop();
      if (count >= limit) return;
    }
  };
  search(0);
  return count;
}

/** A random complete valid grid. */
export function generateSolution(n: number, rng: () => number): number[] {
  const all = validLines(n);
  const half = n / 2;
  const rows: number[] = [];
  const fits = (cand: number): boolean => {
    const r = rows.length;
    if (rows.includes(cand)) return false;
    for (let c = 0; c < n; c++) {
      const bit = (cand >> c) & 1;
      let ones = bit;
      for (let i = 0; i < r; i++) ones += (rows[i] >> c) & 1;
      if (ones > half || r + 1 - ones > half) return false;
      if (r >= 2 && bit === ((rows[r - 1] >> c) & 1) && bit === ((rows[r - 2] >> c) & 1)) return false;
    }
    if (r === n - 1) {
      const cols = new Set<number>();
      for (let c = 0; c < n; c++) {
        let m = 0;
        for (let i = 0; i < r; i++) m |= ((rows[i] >> c) & 1) << i;
        cols.add(m | (((cand >> c) & 1) << r));
      }
      if (cols.size !== n) return false;
    }
    return true;
  };
  const search = (): boolean => {
    if (rows.length === n) return true;
    for (const cand of shuffle([...all], rng)) {
      if (!fits(cand)) continue;
      rows.push(cand);
      if (search()) return true;
      rows.pop();
    }
    return false;
  };
  search();
  const grid: number[] = [];
  for (const row of rows) for (let c = 0; c < n; c++) grid.push((row >> c) & 1);
  return grid;
}

/** Logic level used for each size: small boards stay friendly, bigger ones need whole-line reasoning. */
export function levelForSize(n: number): BinaryLevel {
  return n <= 6 ? 'basic' : 'line';
}

/**
 * A puzzle with a unique solution: start from a full grid and remove givens in random order while the
 * puzzle stays solvable by logic of the chosen level (logic only makes sound deductions, so a full solve
 * proves uniqueness).
 */
export function generateBinaryPuzzle(n: number, seed: number, level: BinaryLevel = levelForSize(n)): BinaryPuzzle {
  const rng = seededRandom(seed);
  const solution = generateSolution(n, rng);
  const givens = [...solution];
  for (const i of shuffle(Array.from({ length: n * n }, (_, k) => k), rng)) {
    const keep = givens[i];
    givens[i] = -1;
    if (!logicSolve(givens, n, level).solved) givens[i] = keep;
  }
  return { size: n, givens, solution };
}

/** Indices of cells breaking a rule: three in a row, too many of one digit, or a duplicated full line. */
export function findViolations(grid: readonly number[], n: number): Set<number> {
  const bad = new Set<number>();
  const half = n / 2;
  const full = (1 << n) - 1;
  for (const dir of [0, 1]) {
    const seen = new Map<number, number[]>();
    for (let k = 0; k < n; k++) {
      const cells = lineIndices(n, dir * n + k);
      const v = cells.map((c) => grid[c]);
      for (let i = 0; i + 2 < n; i++) {
        if (v[i] !== -1 && v[i] === v[i + 1] && v[i] === v[i + 2]) {
          bad.add(cells[i]).add(cells[i + 1]).add(cells[i + 2]);
        }
      }
      for (const digit of [0, 1]) {
        if (v.filter((x) => x === digit).length > half) cells.forEach((c, i) => v[i] === digit && bad.add(c));
      }
      const m = lineMasks(grid, cells);
      if (m.known === full) {
        const twin = seen.get(m.value);
        if (twin) [...twin, ...cells].forEach((c) => bad.add(c));
        else seen.set(m.value, cells);
      }
    }
  }
  return bad;
}

export function hasViolations(grid: readonly number[], n: number): boolean {
  return findViolations(grid, n).size > 0;
}

/** Complete and breaks no rule (with a unique-solution puzzle, that is the solution). */
export function isComplete(grid: readonly number[], n: number): boolean {
  return grid.every((v) => v === 0 || v === 1) && !hasViolations(grid, n);
}
