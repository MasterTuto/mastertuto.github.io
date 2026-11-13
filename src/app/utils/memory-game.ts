/**
 * Memory (pairs) game rules, free of Angular so they can be tested with Node
 * (`scripts/test-memory-game.mjs`). The state is immutable: every action returns a new object.
 *
 * Turn flow: the first card of a turn is flipped, the second one completes a move. A matching pair
 * stays face up; a mismatch stays visible until `hideOpen` (the page calls it after ~800 ms) or until
 * the player taps a third card, which turns the pair back down at once and starts the next turn with
 * that card, so fast players never wait.
 */

export type MemoryLevel = 'easy' | 'medium' | 'hard';
export type MemoryStatus = 'ready' | 'playing' | 'won';
export type FlipResult = 'ignored' | 'first' | 'match' | 'mismatch' | 'closed';

export interface MemoryLevelConfig {
  id: MemoryLevel;
  cols: number;
  rows: number;
  pairs: number;
}

export const MEMORY_LEVELS: readonly MemoryLevelConfig[] = [
  { id: 'easy', cols: 4, rows: 3, pairs: 6 },
  { id: 'medium', cols: 4, rows: 4, pairs: 8 },
  { id: 'hard', cols: 6, rows: 4, pairs: 12 },
];

export interface MemoryCard {
  /** Position in the deck. */
  id: number;
  /** Index of the picture in the face set; two cards share each face. */
  face: number;
  matched: boolean;
}

export interface MemoryState {
  cards: readonly MemoryCard[];
  /** Face-up cards that are not matched yet (0, 1 or 2 indices). */
  open: readonly number[];
  /** Pairs attempted (one move = two cards turned). */
  moves: number;
  matchedPairs: number;
  pairs: number;
  status: MemoryStatus;
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

/** Fisher–Yates shuffle into a new array. */
export function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function memoryLevel(level: MemoryLevel): MemoryLevelConfig {
  return MEMORY_LEVELS.find((item) => item.id === level) ?? MEMORY_LEVELS[0];
}

/**
 * A new shuffled game of `pairs` pairs, picking the faces at random among `faceCount` pictures.
 * The same seed always deals the same deck.
 */
export function createGame(pairs: number, faceCount: number, seed: number): MemoryState {
  if (pairs < 1 || pairs > faceCount) throw new Error('Not enough faces for this many pairs');
  const random = seededRandom(seed);
  const faces = shuffle(
    Array.from({ length: faceCount }, (_, i) => i),
    random,
  ).slice(0, pairs);
  const deck = shuffle([...faces, ...faces], random);
  return {
    cards: deck.map((face, id) => ({ id, face, matched: false })),
    open: [],
    moves: 0,
    matchedPairs: 0,
    pairs,
    status: 'ready',
  };
}

export function isFaceUp(state: MemoryState, index: number): boolean {
  return state.cards[index].matched || state.open.includes(index);
}

/** Turns a card over. See the file comment for the turn flow. */
export function flip(state: MemoryState, index: number): { state: MemoryState; result: FlipResult } {
  const card = state.cards[index];
  if (!card || state.status === 'won' || card.matched) return { state, result: 'ignored' };

  let current = state;
  if (current.open.length === 2) {
    // A mismatched pair is still showing: hide it now.
    const tappedOpen = current.open.includes(index);
    current = hideOpen(current);
    if (tappedOpen) return { state: current, result: 'closed' };
  }
  if (current.open.includes(index)) return { state: current, result: 'ignored' };

  const status: MemoryStatus = 'playing';
  if (current.open.length === 0) {
    return { state: { ...current, open: [index], status }, result: 'first' };
  }

  const first = current.open[0];
  const moves = current.moves + 1;
  if (current.cards[first].face === card.face) {
    const cards = current.cards.map((item) =>
      item.id === first || item.id === index ? { ...item, matched: true } : item,
    );
    const matchedPairs = current.matchedPairs + 1;
    return {
      state: {
        ...current,
        cards,
        open: [],
        moves,
        matchedPairs,
        status: matchedPairs === current.pairs ? 'won' : status,
      },
      result: 'match',
    };
  }
  return { state: { ...current, open: [first, index], moves, status }, result: 'mismatch' };
}

/** Turns a mismatched pair face down again. */
export function hideOpen(state: MemoryState): MemoryState {
  return state.open.length === 2 ? { ...state, open: [] } : state;
}

/**
 * 1 to 3 stars by efficiency. A perfect game takes `pairs` moves; with a good memory a random deal
 * needs about 1.6× that, so up to 1.5× earns 3 stars and up to 2.2× earns 2.
 */
export function starRating(moves: number, pairs: number): 1 | 2 | 3 {
  if (moves <= Math.ceil(pairs * 1.5)) return 3;
  if (moves <= Math.ceil(pairs * 2.2)) return 2;
  return 1;
}
