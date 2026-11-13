import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MEMORY_LEVELS, createGame, flip, hideOpen, isFaceUp, seededRandom, shuffle, starRating } from '../src/app/utils/memory-game.ts';

const pairOf = (state, index) => state.cards.findIndex((card, i) => i !== index && card.face === state.cards[index].face);
const otherFace = (state, index) => state.cards.findIndex((card) => card.face !== state.cards[index].face && !card.matched);

test('levels have a full grid of pairs', () => {
  for (const { cols, rows, pairs } of MEMORY_LEVELS) assert.equal(cols * rows, pairs * 2);
});

test('shuffle keeps every item and is reproducible', () => {
  const items = Array.from({ length: 20 }, (_, i) => i);
  const a = shuffle(items, seededRandom(5));
  assert.deepEqual([...a].sort((x, y) => x - y), items);
  assert.deepEqual(a, shuffle(items, seededRandom(5)));
  assert.notDeepEqual(a, items);
});

test('a deal has each face exactly twice and the same seed deals the same deck', () => {
  for (const { pairs } of MEMORY_LEVELS) {
    const game = createGame(pairs, 12, 99);
    assert.equal(game.cards.length, pairs * 2);
    const counts = new Map();
    for (const card of game.cards) counts.set(card.face, (counts.get(card.face) ?? 0) + 1);
    assert.equal(counts.size, pairs);
    assert.ok([...counts.values()].every((count) => count === 2));
    assert.deepEqual(createGame(pairs, 12, 99), game);
  }
  assert.throws(() => createGame(13, 12, 1));
});

test('a matching pair stays face up and counts a move', () => {
  let { state, result } = flip(createGame(6, 12, 1), 0);
  assert.equal(result, 'first');
  assert.equal(state.status, 'playing');
  assert.equal(state.moves, 0);
  ({ state, result } = flip(state, pairOf(state, 0)));
  assert.equal(result, 'match');
  assert.equal(state.moves, 1);
  assert.equal(state.matchedPairs, 1);
  assert.deepEqual(state.open, []);
  assert.ok(isFaceUp(state, 0));
  assert.equal(flip(state, 0).result, 'ignored');
});

test('a mismatch stays open until hidden, and a third tap closes it and starts a new turn', () => {
  const start = createGame(6, 12, 2);
  const other = otherFace(start, 0);
  let { state, result } = flip(flip(start, 0).state, other);
  assert.equal(result, 'mismatch');
  assert.equal(state.moves, 1);
  assert.deepEqual(state.open, [0, other]);
  assert.deepEqual(hideOpen(state).open, []);

  const third = state.cards.findIndex((_, i) => i !== 0 && i !== other);
  const next = flip(state, third);
  assert.equal(next.result, 'first');
  assert.deepEqual(next.state.open, [third]);

  const closed = flip(state, other);
  assert.equal(closed.result, 'closed');
  assert.deepEqual(closed.state.open, []);
});

test('tapping the same card twice does nothing', () => {
  const { state } = flip(createGame(6, 12, 3), 4);
  assert.equal(flip(state, 4).result, 'ignored');
});

test('matching every pair wins with a perfect score', () => {
  let state = createGame(8, 12, 4);
  const done = new Set();
  for (let i = 0; i < state.cards.length; i++) {
    if (done.has(i)) continue;
    const j = pairOf(state, i);
    state = flip(flip(state, i).state, j).state;
    done.add(i).add(j);
  }
  assert.equal(state.status, 'won');
  assert.equal(state.moves, 8);
  assert.equal(starRating(state.moves, 8), 3);
  assert.equal(flip(state, 0).result, 'ignored');
});

test('star rating drops with wasted moves', () => {
  assert.equal(starRating(9, 6), 3);
  assert.equal(starRating(10, 6), 2);
  assert.equal(starRating(14, 6), 2);
  assert.equal(starRating(15, 6), 1);
});
