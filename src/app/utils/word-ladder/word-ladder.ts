import { WORD_LADDER_DICTIONARY } from "./dictionary";
import { environment } from "src/environments/environment";

export type WordLadderDifficulty = "easy" | "medium" | "hard";

export interface WordLadderPuzzle {
  id: string;
  start: string;
  target: string;
  difficulty: WordLadderDifficulty;
  optimalMoves: number;
}

export interface WordLadderPuzzleDef {
  start: string;
  target: string;
  difficulty: WordLadderDifficulty;
}

let wordSet: Set<string> | null = null;

function getWordSet(): Set<string> {
  if (wordSet === null) {
    wordSet = new Set(WORD_LADDER_DICTIONARY.map((w) => w.toUpperCase()));
  }
  return wordSet;
}

export function normalizeWord(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z]/g, "");
}

export function isValidWord(word: string): boolean {
  const normalized = normalizeWord(word);
  return getWordSet().has(normalized);
}

export function isOneLetterApart(previous: string, next: string): boolean {
  const a = normalizeWord(previous);
  const b = normalizeWord(next);
  if (a.length !== b.length) return false;
  let differences = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      differences++;
      if (differences > 1) return false;
    }
  }
  return differences === 1;
}

export function isWinningMove(word: string, target: string): boolean {
  return normalizeWord(word) === normalizeWord(target);
}

function neighborsOf(word: string, set: Set<string>): string[] {
  const result: string[] = [];
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < word.length; i++) {
    for (const c of chars) {
      if (c === word[i]) continue;
      const candidate = word.slice(0, i) + c + word.slice(i + 1);
      if (set.has(candidate)) result.push(candidate);
    }
  }
  return result;
}

const pathCache = new Map<string, string[] | null>();

function cacheKey(start: string, target: string): string {
  return `${start}|${target}`;
}

export function findShortestPath(
  start: string,
  target: string,
  dict: readonly string[] = WORD_LADDER_DICTIONARY,
): string[] | null {
  const s = normalizeWord(start);
  const t = normalizeWord(target);
  const key = cacheKey(s, t);
  if (pathCache.has(key)) return pathCache.get(key) ?? null;

  let result: string[] | null = null;
  if (s === t) {
    result = [s];
  } else if (s.length !== t.length || !getWordSet().has(s) || !getWordSet().has(t)) {
    result = null;
  } else {
    const length = s.length;
    const set = new Set(
      dict.filter((w) => w.length === length).map((w) => w.toUpperCase()),
    );
    const visited = new Set<string>([s]);
    const queue: string[][] = [[s]];
    while (queue.length > 0) {
      const path = queue.shift()!;
      const current = path[path.length - 1];
      for (const candidate of neighborsOf(current, set)) {
        if (visited.has(candidate)) continue;
        const nextPath = [...path, candidate];
        if (candidate === t) {
          result = nextPath;
          break;
        }
        visited.add(candidate);
        queue.push(nextPath);
      }
      if (result !== null) break;
    }
  }

  pathCache.set(key, result);
  return result;
}

export function buildPuzzle(def: WordLadderPuzzleDef): WordLadderPuzzle {
  const start = normalizeWord(def.start);
  const target = normalizeWord(def.target);
  const path = findShortestPath(start, target);
  if (path === null) {
    if (!environment.production) {
      throw new Error(`Word ladder puzzle has no solution: ${start} → ${target}`);
    }
    return {
      id: `${start}-${target}`,
      start,
      target,
      difficulty: def.difficulty,
      optimalMoves: -1,
    };
  }
  return {
    id: `${start}-${target}`,
    start,
    target,
    difficulty: def.difficulty,
    optimalMoves: path.length - 1,
  };
}

const CANDIDATE_DEFS: WordLadderPuzzleDef[] = [
  // Easy — 2–4 move chains, common words
  { start: "CAT", target: "DOG", difficulty: "easy" },
  { start: "COLD", target: "WARM", difficulty: "easy" },
  { start: "MORE", target: "LESS", difficulty: "easy" },
  { start: "HATE", target: "LOVE", difficulty: "easy" },
  { start: "FIVE", target: "NINE", difficulty: "easy" },
  { start: "WARM", target: "HARD", difficulty: "easy" },
  { start: "BEAR", target: "DEER", difficulty: "easy" },
  { start: "WOLF", target: "GOLD", difficulty: "easy" },
  { start: "HEAD", target: "BEAR", difficulty: "easy" },
  { start: "BOOK", target: "COOL", difficulty: "easy" },
  { start: "PLAY", target: "GRAY", difficulty: "easy" },
  { start: "MOON", target: "NOUN", difficulty: "easy" },
  // Medium — 5–7 move chains
  { start: "GOOD", target: "BEST", difficulty: "medium" },
  { start: "LAKE", target: "POND", difficulty: "medium" },
  { start: "HEAD", target: "TAIL", difficulty: "medium" },
  { start: "FISH", target: "BIRD", difficulty: "medium" },
  { start: "MOON", target: "STAR", difficulty: "medium" },
  { start: "LOVE", target: "GOLD", difficulty: "medium" },
  { start: "HATE", target: "PITY", difficulty: "medium" },
  { start: "GOOD", target: "SAND", difficulty: "medium" },
  { start: "DARK", target: "SILK", difficulty: "medium" },
  { start: "WRITE", target: "CHOSE", difficulty: "medium" },
  { start: "TEACH", target: "PITCH", difficulty: "medium" },
  { start: "BRAIN", target: "BLOWN", difficulty: "medium" },
  { start: "THINK", target: "DRINK", difficulty: "medium" },
  { start: "SLEEP", target: "SPEAK", difficulty: "medium" },
  // Hard — 8+ move chains
  { start: "SLOW", target: "FAST", difficulty: "hard" },
  { start: "SNOW", target: "RAIN", difficulty: "hard" },
  { start: "THINK", target: "GLOBE", difficulty: "hard" },
  { start: "TEACH", target: "WATCH", difficulty: "hard" },
  { start: "WHITE", target: "LEAVE", difficulty: "hard" },
  { start: "WRITE", target: "WEAVE", difficulty: "hard" },
  { start: "THINK", target: "DRIVE", difficulty: "hard" },
  { start: "LOVE", target: "YOUR", difficulty: "hard" },
  { start: "PLAY", target: "THIN", difficulty: "hard" },
  { start: "WORK", target: "KEEP", difficulty: "hard" },
];

export const WORD_LADDER_PUZZLES: WordLadderPuzzle[] = CANDIDATE_DEFS.map(
  (def) => buildPuzzle(def),
).filter((p) => p.optimalMoves > 0);

function puzzlesFor(difficulty: WordLadderDifficulty): WordLadderPuzzle[] {
  return WORD_LADDER_PUZZLES.filter((p) => p.difficulty === difficulty);
}

export function pickRandomPuzzle(
  difficulty: WordLadderDifficulty,
  excludeId?: string,
): WordLadderPuzzle {
  const pool = puzzlesFor(difficulty);
  const candidates = excludeId ? pool.filter((p) => p.id !== excludeId) : pool;
  const fallback = candidates.length > 0 ? candidates : pool;
  const index = Math.floor(Math.random() * fallback.length);
  return fallback[index];
}

function dateKey(date: Date): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

function daysSinceEpoch(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
}

export function getDailyPuzzle(date: Date = new Date()): WordLadderPuzzle {
  const all = WORD_LADDER_PUZZLES;
  const index = Math.abs(daysSinceEpoch(date)) % all.length;
  const puzzle = all[index];
  return {
    ...puzzle,
    difficulty: puzzle.difficulty,
  };
}

export function todayKey(date: Date = new Date()): number {
  return dateKey(date);
}
