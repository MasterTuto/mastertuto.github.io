/**
 * Minesweeper rules, free of Angular so they can be tested with Node (`scripts/test-minesweeper.mjs`).
 *
 * The board is immutable: every action returns a new `MinesBoard` (or the same object when nothing
 * changed), which suits signals. Mines are placed on the first reveal, never on or around that cell,
 * so the first click always opens an area.
 */

export type MinesLevel = 'easy' | 'medium' | 'hard';
export type CellState = 'hidden' | 'revealed' | 'flagged';
export type MinesStatus = 'ready' | 'playing' | 'won' | 'lost';
export type MinesMode = 'reveal' | 'flag';

export interface MinesLevelConfig {
  id: MinesLevel;
  rows: number;
  cols: number;
  mines: number;
}

export const MINES_LEVELS: readonly MinesLevelConfig[] = [
  { id: 'easy', rows: 9, cols: 9, mines: 10 },
  { id: 'medium', rows: 12, cols: 12, mines: 24 },
  { id: 'hard', rows: 16, cols: 16, mines: 40 },
];

export interface MinesBoard {
  rows: number;
  cols: number;
  mineCount: number;
  /** `true` where a mine is. All `false` until the first reveal. */
  mines: readonly boolean[];
  /** Mines among the 8 neighbours of each cell. */
  adjacent: readonly number[];
  state: readonly CellState[];
  status: MinesStatus;
  /** Cell of the mine that went off, or -1. */
  exploded: number;
  revealed: number;
  flags: number;
}

/** Small, fast, seedable PRNG (mulberry32). Returns floats in [0, 1). */
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

export function levelConfig(level: MinesLevel): MinesLevelConfig {
  return MINES_LEVELS.find((item) => item.id === level) ?? MINES_LEVELS[0];
}

export function createBoard(rows: number, cols: number, mineCount: number): MinesBoard {
  const total = rows * cols;
  if (mineCount < 1 || mineCount >= total) throw new Error('Invalid mine count');
  return {
    rows,
    cols,
    mineCount,
    mines: new Array<boolean>(total).fill(false),
    adjacent: new Array<number>(total).fill(0),
    state: new Array<CellState>(total).fill('hidden'),
    status: 'ready',
    exploded: -1,
    revealed: 0,
    flags: 0,
  };
}

/** Indices of the (up to 8) cells around `index`. */
export function neighbors(rows: number, cols: number, index: number): number[] {
  const row = Math.floor(index / cols);
  const col = index % cols;
  const result: number[] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < rows && c >= 0 && c < cols) result.push(r * cols + c);
    }
  }
  return result;
}

/**
 * Places the mines with `seed`, keeping `safeIndex` and its neighbours free (only `safeIndex` when the
 * board is too crowded for that). Flags already on the board are kept.
 */
export function placeMines(board: MinesBoard, safeIndex: number, seed: number): MinesBoard {
  const total = board.rows * board.cols;
  const around = new Set([safeIndex, ...neighbors(board.rows, board.cols, safeIndex)]);
  const excluded = total - around.size >= board.mineCount ? around : new Set([safeIndex]);
  const candidates: number[] = [];
  for (let i = 0; i < total; i++) if (!excluded.has(i)) candidates.push(i);

  const random = seededRandom(seed);
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  const mines = new Array<boolean>(total).fill(false);
  for (const index of candidates.slice(0, board.mineCount)) mines[index] = true;
  return { ...board, mines, adjacent: countAdjacent(board.rows, board.cols, mines) };
}

export function countAdjacent(rows: number, cols: number, mines: readonly boolean[]): number[] {
  return mines.map((_, index) => neighbors(rows, cols, index).filter((n) => mines[n]).length);
}

/** Whether mines have been placed yet (they are on the first reveal). */
export function isGenerated(board: MinesBoard): boolean {
  return board.status !== 'ready';
}

/**
 * Reveals one hidden cell: a mine ends the game, a zero opens its whole empty area (flood fill).
 * The first reveal places the mines with `seed`. Flagged and revealed cells are left alone.
 */
export function reveal(board: MinesBoard, index: number, seed = 1): MinesBoard {
  if (board.status === 'won' || board.status === 'lost') return board;
  if (board.state[index] !== 'hidden') return board;
  let current = board;
  if (current.status === 'ready') current = { ...placeMines(current, index, seed), status: 'playing' };
  return openCells(current, [index]);
}

/** Puts or removes a flag on a hidden cell. Does nothing on revealed cells or after the game ends. */
export function toggleFlag(board: MinesBoard, index: number): MinesBoard {
  if (board.status === 'won' || board.status === 'lost') return board;
  const cell = board.state[index];
  if (cell === 'revealed') return board;
  const state = board.state.slice();
  state[index] = cell === 'flagged' ? 'hidden' : 'flagged';
  return { ...board, state, flags: board.flags + (cell === 'flagged' ? -1 : 1) };
}

/** Number of flags around a cell. */
export function flagsAround(board: MinesBoard, index: number): number {
  return neighbors(board.rows, board.cols, index).filter((n) => board.state[n] === 'flagged').length;
}

/**
 * Chording: on a revealed number whose surrounding flags match it, reveals every other hidden
 * neighbour at once (a wrong flag makes this lose the game, as in the classic rules).
 */
export function chord(board: MinesBoard, index: number): MinesBoard {
  if (board.status !== 'playing' || board.state[index] !== 'revealed') return board;
  const number = board.adjacent[index];
  if (number === 0 || flagsAround(board, index) !== number) return board;
  const targets = neighbors(board.rows, board.cols, index).filter((n) => board.state[n] === 'hidden');
  return targets.length ? openCells(board, targets) : board;
}

/** Whether `chord` would open anything on this cell. */
export function canChord(board: MinesBoard, index: number): boolean {
  if (board.status !== 'playing' || board.state[index] !== 'revealed') return false;
  const number = board.adjacent[index];
  return (
    number > 0 &&
    flagsAround(board, index) === number &&
    neighbors(board.rows, board.cols, index).some((n) => board.state[n] === 'hidden')
  );
}

/**
 * What a tap does in the given mode: reveal mode reveals a hidden cell; flag mode toggles a flag.
 * In both modes a tap on a revealed number chords. The very first tap always reveals, since there is
 * nothing to flag on a blank board.
 */
export function act(board: MinesBoard, index: number, mode: MinesMode, seed = 1): MinesBoard {
  const cell = board.state[index];
  if (cell === 'revealed') return chord(board, index);
  if (mode === 'flag' && board.status !== 'ready') return toggleFlag(board, index);
  return cell === 'hidden' ? reveal(board, index, seed) : board;
}

/** Opens cells (flood-filling zeros); a mine among them ends the game. */
function openCells(board: MinesBoard, start: number[]): MinesBoard {
  const state = board.state.slice();
  let revealed = board.revealed;
  let flags = board.flags;
  let exploded = -1;
  const queue = [...start];
  while (queue.length) {
    const index = queue.pop()!;
    if (state[index] !== 'hidden') continue;
    if (board.mines[index]) {
      if (exploded < 0) exploded = index;
      continue;
    }
    state[index] = 'revealed';
    revealed++;
    if (board.adjacent[index] === 0) {
      for (const n of neighbors(board.rows, board.cols, index)) {
        if (state[n] === 'flagged' && !board.mines[n]) {
          // A wrong flag inside an empty area is cleared: the area proves it is safe.
          state[n] = 'hidden';
          flags--;
        }
        if (state[n] === 'hidden') queue.push(n);
      }
    }
  }
  if (exploded >= 0) return { ...board, state, revealed, flags, status: 'lost', exploded };
  if (revealed === board.rows * board.cols - board.mineCount) {
    // Win: flag every mine so the counter reads 0.
    for (let i = 0; i < state.length; i++) if (board.mines[i]) state[i] = 'flagged';
    return { ...board, state, revealed, flags: board.mineCount, status: 'won' };
  }
  return { ...board, state, revealed, flags };
}

/** Mines left according to the flags placed (can go negative with too many flags). */
export function minesLeft(board: MinesBoard): number {
  return board.mineCount - board.flags;
}
