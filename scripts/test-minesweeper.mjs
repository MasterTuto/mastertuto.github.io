import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  MINES_LEVELS,
  act,
  canChord,
  chord,
  countAdjacent,
  createBoard,
  minesLeft,
  neighbors,
  placeMines,
  reveal,
  seededRandom,
  toggleFlag,
} from '../src/app/utils/minesweeper.ts';

/** A board with mines at fixed positions, already in play. */
function fixedBoard(rows, cols, mineList) {
  const board = createBoard(rows, cols, mineList.length);
  const mines = new Array(rows * cols).fill(false);
  for (const index of mineList) mines[index] = true;
  return { ...board, mines, adjacent: countAdjacent(rows, cols, mines), status: 'playing' };
}

test('levels fit the expected sizes', () => {
  assert.deepEqual(
    MINES_LEVELS.map(({ rows, cols, mines }) => [rows, cols, mines]),
    [[9, 9, 10], [12, 12, 24], [16, 16, 40]],
  );
});

test('the RNG is deterministic', () => {
  const a = seededRandom(42);
  const b = seededRandom(42);
  const first = Array.from({ length: 5 }, a);
  assert.deepEqual(first, Array.from({ length: 5 }, b));
  assert.ok(first.every((value) => value >= 0 && value < 1));
  assert.notDeepEqual(first, Array.from({ length: 5 }, seededRandom(43)));
});

test('neighbors handles corners, edges and the middle', () => {
  assert.deepEqual(neighbors(3, 3, 0).sort(), [1, 3, 4]);
  assert.equal(neighbors(3, 3, 1).length, 5);
  assert.equal(neighbors(3, 3, 4).length, 8);
});

test('mines are placed with the right count, away from the first click, reproducibly', () => {
  for (const { rows, cols, mines } of MINES_LEVELS) {
    for (let seed = 1; seed <= 50; seed++) {
      const safe = (seed * 7) % (rows * cols);
      const board = placeMines(createBoard(rows, cols, mines), safe, seed);
      assert.equal(board.mines.filter(Boolean).length, mines);
      for (const index of [safe, ...neighbors(rows, cols, safe)]) assert.equal(board.mines[index], false);
      assert.deepEqual(placeMines(createBoard(rows, cols, mines), safe, seed).mines, board.mines);
    }
  }
});

test('the first reveal is always safe and opens an area', () => {
  for (let seed = 1; seed <= 200; seed++) {
    const board = reveal(createBoard(9, 9, 10), 40, seed);
    assert.equal(board.status === 'playing' || board.status === 'won', true);
    assert.equal(board.adjacent[40], 0);
    assert.ok(board.revealed >= 9);
  }
});

test('a crowded board still keeps the first cell safe', () => {
  const board = reveal(createBoard(3, 3, 8), 4, 7);
  assert.equal(board.mines[4], false);
  assert.equal(board.status, 'won');
});

test('flood fill opens zeros and stops at numbers', () => {
  // 4x4 with one mine in the bottom-right corner.
  const board = reveal(fixedBoard(4, 4, [15]), 0);
  assert.equal(board.status, 'won');
  assert.equal(board.revealed, 15);
  assert.equal(board.state[15], 'flagged');
  assert.equal(minesLeft(board), 0);

  const two = reveal(fixedBoard(4, 4, [15, 3]), 0);
  assert.equal(two.status, 'playing');
  assert.equal(two.state[3], 'hidden');
  assert.equal(two.state[2], 'revealed');
  assert.equal(two.adjacent[2], 1);
});

test('revealing a mine loses and records it', () => {
  const board = reveal(fixedBoard(3, 3, [0]), 0);
  assert.equal(board.status, 'lost');
  assert.equal(board.exploded, 0);
  assert.equal(reveal(board, 8), board, 'no moves after the end');
});

test('flags block reveals, count down the mines and toggle back', () => {
  let board = fixedBoard(3, 3, [0]);
  board = toggleFlag(board, 0);
  assert.equal(board.state[0], 'flagged');
  assert.equal(minesLeft(board), 0);
  assert.equal(reveal(board, 0), board);
  board = toggleFlag(board, 0);
  assert.equal(board.state[0], 'hidden');
  assert.equal(minesLeft(board), 1);
});

test('chording reveals neighbours when flags match, and loses on a wrong flag', () => {
  // Row of 3x3: mine at 0. Reveal 4 (number 1), flag 0, chord 4.
  let board = reveal(fixedBoard(3, 3, [0, 8]), 4);
  assert.equal(board.adjacent[4], 2);
  assert.equal(canChord(board, 4), false);
  board = toggleFlag(toggleFlag(board, 0), 8);
  assert.equal(canChord(board, 4), true);
  board = chord(board, 4);
  assert.equal(board.status, 'won');

  let wrong = reveal(fixedBoard(3, 3, [0, 8]), 4);
  wrong = toggleFlag(toggleFlag(wrong, 0), 2);
  wrong = act(wrong, 4, 'reveal');
  assert.equal(wrong.status, 'lost');
  assert.equal(wrong.exploded, 8);
});

test('act follows the mode, and the first tap reveals even in flag mode', () => {
  const fresh = createBoard(9, 9, 10);
  const first = act(fresh, 40, 'flag', 3);
  assert.equal(first.state[40], 'revealed');
  const hidden = first.state.findIndex((state) => state === 'hidden');
  const flagged = act(first, hidden, 'flag');
  assert.equal(flagged.state[hidden], 'flagged');
  assert.equal(act(flagged, hidden, 'reveal'), flagged, 'reveal mode ignores flagged cells');
});

test('random games end in a win when every safe cell is revealed', () => {
  for (let seed = 1; seed <= 20; seed++) {
    let board = reveal(createBoard(12, 12, 24), 0, seed);
    for (let i = 0; i < board.mines.length; i++) if (!board.mines[i]) board = reveal(board, i);
    assert.equal(board.status, 'won');
    assert.equal(board.revealed, 144 - 24);
  }
});
