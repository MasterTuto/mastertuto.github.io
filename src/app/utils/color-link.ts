/**
 * Color Link: a path-drawing puzzle in the Numberlink family. A square grid holds pairs of colored
 * endpoints; the player joins each pair with an orthogonal path, paths never share a cell, and the
 * puzzle is solved when every pair is joined and every cell is covered.
 *
 * Pure TypeScript (no Angular, no runtime imports) so `scripts/test-color-link.mjs` can run it with Node.
 * Cells are indexed `row * size + col`.
 */

export interface ColorLinkPair {
  /** The two endpoint cells of this color. */
  a: number;
  b: number;
}

export interface ColorLinkPuzzle {
  size: number;
  seed: number;
  pairs: ColorLinkPair[];
  /** One full solution (the generator's). Any other valid filling also wins. */
  solution: number[][];
}

/** Paths drawn by the player, one per color. Each starts at one of the color's endpoints (or is empty). */
export type ColorLinkPaths = number[][];

export interface ColorLinkProgress {
  /** Pairs whose path joins both endpoints. */
  connected: number;
  /** Cells covered by some path (lone endpoints count as covered). */
  covered: number;
  total: number;
  solved: boolean;
}

export const COLOR_LINK_SIZES = [5, 7, 9] as const;

/** Mulberry32: small, fast, well distributed. */
export function seededRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function areAdjacent(size: number, a: number, b: number): boolean {
  const ra = Math.floor(a / size);
  const rb = Math.floor(b / size);
  const ca = a % size;
  const cb = b % size;
  return Math.abs(ra - rb) + Math.abs(ca - cb) === 1;
}

function neighbors(size: number, cell: number): number[] {
  const r = Math.floor(cell / size);
  const c = cell % size;
  const out: number[] = [];
  if (r > 0) out.push(cell - size);
  if (r < size - 1) out.push(cell + size);
  if (c > 0) out.push(cell - 1);
  if (c < size - 1) out.push(cell + 1);
  return out;
}

/** Number of pairs for a size: roughly one color per 8 cells, with a little seeded variety. */
function pairCount(size: number, rng: () => number): number {
  if (size <= 5) return 4 + Math.floor(rng() * 2); // 4–5
  if (size <= 7) return 6 + Math.floor(rng() * 2); // 6–7
  return 9 + Math.floor(rng() * 2); // 9–10
}

/**
 * Partitions the grid into paths by merging: every cell starts as its own path, then the shortest
 * path is repeatedly joined end-to-end with a neighboring path, as long as the joined path does not
 * "touch itself" (two non-consecutive cells side by side, which would leave an obvious shortcut).
 * Stops at `target` paths. Returns null when it gets stuck with paths shorter than 3 or more than
 * `target + slack` paths.
 */
function mergePartition(size: number, target: number, slack: number, rng: () => number): number[][] | null {
  const total = size * size;
  const paths = new Map<number, number[]>();
  const owner = new Int32Array(total);
  for (let cell = 0; cell < total; cell++) {
    paths.set(cell, [cell]);
    owner[cell] = cell;
  }
  let nextId = total;
  const stuck = new Set<number>();
  while (paths.size > target) {
    // Shortest non-stuck path, ties broken at random.
    let bestId = -1;
    let bestLen = Infinity;
    let ties = 0;
    for (const [id, path] of paths) {
      if (stuck.has(id)) continue;
      if (path.length < bestLen) {
        bestLen = path.length;
        bestId = id;
        ties = 1;
      } else if (path.length === bestLen && rng() < 1 / ++ties) {
        bestId = id;
      }
    }
    if (bestId === -1) break;
    const p = paths.get(bestId)!;
    const options: [number[], number[], number][] = [];
    const ends = p.length === 1 ? [p[0]] : [p[0], p[p.length - 1]];
    for (const end of ends) {
      const head = end === p[p.length - 1] ? p : [...p].reverse();
      for (const nb of neighbors(size, end)) {
        const qid = owner[nb];
        if (qid === bestId) continue;
        const q = paths.get(qid)!;
        let tail: number[];
        if (q[0] === nb) tail = q;
        else if (q[q.length - 1] === nb) tail = [...q].reverse();
        else continue;
        const joined = head.concat(tail);
        // Keep lengths balanced: no path longer than about twice the average.
        if (joined.length > Math.ceil((2.2 * total) / target)) continue;
        if (touchesItself(size, joined)) continue;
        options.push([joined, q, qid]);
      }
    }
    if (!options.length) {
      stuck.add(bestId);
      continue;
    }
    const [joined, , qid] = options[Math.floor(rng() * options.length)];
    paths.delete(bestId);
    paths.delete(qid);
    stuck.delete(qid);
    const id = nextId++;
    paths.set(id, joined);
    for (const cell of joined) owner[cell] = id;
    // A merge can unblock paths around it.
    stuck.clear();
  }
  const result = [...paths.values()];
  if (result.some((p) => p.length < 3)) return null;
  if (result.length > target + slack) return null;
  return result;
}

/** True when a path "touches itself": two cells that are not consecutive in the path sit side by side. */
function touchesItself(size: number, path: number[]): boolean {
  const index = new Map<number, number>();
  path.forEach((cell, i) => index.set(cell, i));
  for (let i = 0; i < path.length; i++) {
    for (const nb of neighbors(size, path[i])) {
      const j = index.get(nb);
      if (j !== undefined && Math.abs(j - i) > 1) return true;
    }
  }
  return false;
}

/** A seeded puzzle of `size`×`size`. The same seed and size always give the same puzzle. */
export function generateColorLink(size: number, seed: number): ColorLinkPuzzle {
  const rng = seededRng((seed ^ Math.imul(size, 0x9e3779b1)) >>> 0);
  const target = pairCount(size, rng);
  for (let attempt = 0; attempt < 600; attempt++) {
    // Accept one extra color at first, more if the board resists (rare).
    const paths = mergePartition(size, target, 1 + Math.floor(attempt / 150), rng);
    if (paths) return build(size, seed, paths, rng);
  }
  // Practically unreachable; a serpentine split keeps the game playable anyway.
  return build(size, seed, serpentine(size, target), rng);
}

function serpentine(size: number, parts: number): number[][] {
  const order: number[] = [];
  for (let r = 0; r < size; r++) for (let k = 0; k < size; k++) order.push(r * size + (r % 2 === 0 ? k : size - 1 - k));
  const len = Math.floor(order.length / parts);
  const out: number[][] = [];
  for (let i = 0; i < parts; i++) out.push(order.slice(i * len, i === parts - 1 ? order.length : (i + 1) * len));
  return out;
}

function build(size: number, seed: number, paths: number[][], rng: () => number): ColorLinkPuzzle {
  // Shuffle colors so color 0 is not always the top-left path, then sort pairs by the reading order
  // of their first endpoint: colors appear in a pleasant order and letters A, B, C… read naturally.
  const shuffled = [...paths];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const oriented = shuffled.map((p) => (p[0] < p[p.length - 1] ? p : [...p].reverse()));
  oriented.sort((x, y) => x[0] - y[0]);
  return {
    size,
    seed,
    pairs: oriented.map((p) => ({ a: p[0], b: p[p.length - 1] })),
    solution: oriented,
  };
}

/** Map cell → color of the endpoint sitting there, or -1. */
export function endpointMap(puzzle: ColorLinkPuzzle): Int16Array {
  const map = new Int16Array(puzzle.size * puzzle.size).fill(-1);
  puzzle.pairs.forEach((pair, color) => {
    map[pair.a] = color;
    map[pair.b] = color;
  });
  return map;
}

/** True when `path` (of `color`) runs from one endpoint to the other. */
export function isPathComplete(puzzle: ColorLinkPuzzle, color: number, path: number[]): boolean {
  if (path.length < 2) return false;
  const { a, b } = puzzle.pairs[color];
  const first = path[0];
  const last = path[path.length - 1];
  return (first === a && last === b) || (first === b && last === a);
}

/**
 * Checks the player's paths against the rules only (not against the stored solution): each complete
 * path must be an orthogonal walk between its endpoints, no cell may be used twice, no path may cross
 * another color's endpoint, and every cell must be covered.
 */
export function evaluate(puzzle: ColorLinkPuzzle, paths: ColorLinkPaths): ColorLinkProgress {
  const { size } = puzzle;
  const total = size * size;
  const owner = new Int16Array(total).fill(-1);
  const ends = endpointMap(puzzle);
  let valid = paths.length === puzzle.pairs.length;
  let connected = 0;
  for (let color = 0; color < puzzle.pairs.length; color++) {
    const path = paths[color] ?? [];
    for (let i = 0; i < path.length; i++) {
      const cell = path[i];
      if (!Number.isInteger(cell) || cell < 0 || cell >= total) {
        valid = false;
        continue;
      }
      if (owner[cell] !== -1 && owner[cell] !== color) valid = false;
      if (owner[cell] === color) valid = false; // revisits its own cell
      owner[cell] = color;
      if (ends[cell] !== -1 && ends[cell] !== color) valid = false;
      if (i > 0 && !areAdjacent(size, path[i - 1], cell)) valid = false;
    }
    if (isPathComplete(puzzle, color, path)) connected++;
  }
  let covered = 0;
  for (let cell = 0; cell < total; cell++) if (owner[cell] !== -1 || ends[cell] !== -1) covered++;
  let filledByPaths = 0;
  for (let cell = 0; cell < total; cell++) if (owner[cell] !== -1) filledByPaths++;
  const solved = valid && connected === puzzle.pairs.length && filledByPaths === total;
  return { connected, covered, total, solved };
}

/* ------------------------------------------------------------------------------------------------
 * Drawing model. A stroke edits one color. Other colors are cut where the stroke runs over them, but
 * only for display: they are computed from the paths as they were when the stroke began, so pulling
 * the stroke back restores what it had cut. The result is committed when the stroke ends.
 * ---------------------------------------------------------------------------------------------- */

export interface Stroke {
  color: number;
  /** Paths when the stroke began. */
  base: ColorLinkPaths;
  /** The active color's path, starting at one of its endpoints. */
  path: number[];
  /** Set when the path reached the other endpoint: the stroke accepts no more cells. */
  done: boolean;
}

/** The color whose path (or endpoint) occupies `cell`, or -1. */
export function colorAt(puzzle: ColorLinkPuzzle, paths: ColorLinkPaths, cell: number): number {
  for (let color = 0; color < paths.length; color++) if (paths[color].includes(cell)) return color;
  const pair = puzzle.pairs.findIndex((p) => p.a === cell || p.b === cell);
  return pair;
}

/**
 * Starts a stroke at `cell`: on an endpoint it restarts that color from there (or keeps the path
 * when it already starts there, truncated to the endpoint); on a path cell it keeps the path up to
 * that cell and continues from it. Returns null on an empty cell.
 */
export function beginStroke(puzzle: ColorLinkPuzzle, paths: ColorLinkPaths, cell: number): Stroke | null {
  const base = paths.map((p) => [...p]);
  const pairIndex = puzzle.pairs.findIndex((p) => p.a === cell || p.b === cell);
  if (pairIndex !== -1) {
    return { color: pairIndex, base, path: [cell], done: false };
  }
  for (let color = 0; color < paths.length; color++) {
    const i = paths[color].indexOf(cell);
    if (i !== -1) return { color, base, path: paths[color].slice(0, i + 1), done: false };
  }
  return null;
}

/**
 * Moves the stroke's head to the orthogonally adjacent `cell`. Returns false when the step is not
 * allowed (not adjacent, another color's endpoint, or the stroke already finished).
 */
export function extendStroke(puzzle: ColorLinkPuzzle, stroke: Stroke, cell: number): boolean {
  const head = stroke.path[stroke.path.length - 1];
  if (cell === head) return true;
  const own = stroke.path.indexOf(cell);
  if (own !== -1) {
    // Moving back over the path retracts it to that cell.
    stroke.path = stroke.path.slice(0, own + 1);
    stroke.done = false;
    return true;
  }
  if (stroke.done || !areAdjacent(puzzle.size, head, cell)) return false;
  const pair = puzzle.pairs[stroke.color];
  const isOwnEnd = cell === pair.a || cell === pair.b;
  if (!isOwnEnd && puzzle.pairs.some((p) => p.a === cell || p.b === cell)) return false;
  stroke.path = [...stroke.path, cell];
  if (isOwnEnd) stroke.done = true;
  return true;
}

/** The paths as they look with the stroke applied (other colors cut where the stroke covers them). */
export function applyStroke(stroke: Stroke): ColorLinkPaths {
  const taken = new Set(stroke.path);
  return stroke.base.map((path, color) => {
    if (color === stroke.color) return stroke.path;
    const cut = path.findIndex((cell) => taken.has(cell));
    return cut === -1 ? path : path.slice(0, cut);
  });
}

/** Paths equal (used to skip no-op strokes in the history). */
export function samePaths(x: ColorLinkPaths, y: ColorLinkPaths): boolean {
  if (x.length !== y.length) return false;
  for (let i = 0; i < x.length; i++) {
    if (x[i].length !== y[i].length) return false;
    for (let j = 0; j < x[i].length; j++) if (x[i][j] !== y[i][j]) return false;
  }
  return true;
}

/**
 * Cells from `from` to `to` (exclusive of `from`) walking one orthogonal step at a time along the
 * longer axis first, used to fill in fast pointer moves.
 */
export function orthogonalSteps(size: number, from: number, to: number): number[] {
  let r = Math.floor(from / size);
  let c = from % size;
  const tr = Math.floor(to / size);
  const tc = to % size;
  const out: number[] = [];
  while (r !== tr || c !== tc) {
    const dr = tr - r;
    const dc = tc - c;
    if (Math.abs(dr) >= Math.abs(dc)) r += Math.sign(dr);
    else c += Math.sign(dc);
    out.push(r * size + c);
  }
  return out;
}
