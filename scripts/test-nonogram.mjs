import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_CLUES,
  PICTURES,
  cluesOf,
  generateRandomNonogram,
  isLineSolvable,
  isSolved,
  lineClue,
  lineSolve,
  pictureIds,
  pictureNonogram,
  solveLine,
} from '../src/app/utils/nonogram.ts';

/** Brute-force count of grids matching the clues (small sizes only), stops at `limit`. */
function countSolutions(rows, cols, limit = 2) {
  const n = rows.length;
  const lineOptions = (clue) => {
    const out = [];
    for (let mask = 0; mask < 1 << n; mask++) {
      const line = Array.from({ length: n }, (_, i) => (mask >> i) & 1);
      if (lineClue(line).join() === clue.join()) out.push(line);
    }
    return out;
  };
  const options = rows.map(lineOptions);
  const grid = [];
  let count = 0;
  const search = (r) => {
    if (count >= limit) return;
    if (r === n) {
      if (cluesOf(grid.flat(), n).cols.every((c, i) => c.join() === cols[i].join())) count++;
      return;
    }
    for (const line of options[r]) {
      grid.push(line);
      search(r + 1);
      grid.pop();
    }
  };
  search(0);
  return count;
}

test('lineClue reads runs and marks empty lines with 0', () => {
  assert.deepEqual(lineClue([1, 1, 0, 1, 0, 0, 1, 1, 1]), [2, 1, 3]);
  assert.deepEqual(lineClue([0, 0, 0]), [0]);
  assert.deepEqual(lineClue([1, 1, 1]), [3]);
  // X marks (2) count as empty
  assert.deepEqual(lineClue([1, 2, 1]), [1, 1]);
});

test('solveLine finds overlaps, edges and contradictions', () => {
  const u = new Array(10).fill(-1);
  // 8 in 10: middle 6 are certain
  assert.deepEqual(solveLine([8], u), [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1]);
  // full line
  assert.deepEqual(solveLine([3, 1], [-1, -1, -1, -1, -1]), [1, 1, 1, 0, 1]);
  // empty clue
  assert.deepEqual(solveLine([0], [-1, -1, -1]), [0, 0, 0]);
  // a known filled cell at the edge pins the block
  assert.deepEqual(solveLine([2], [1, -1, -1, -1]), [1, 1, 0, 0]);
  // contradiction
  assert.equal(solveLine([3], [-1, 0, -1, -1]), null);
  assert.equal(solveLine([0], [1, -1]), null);
});

test('lineSolve solves a simple picture and reports ambiguity', () => {
  const plus = [0, 1, 0, 1, 1, 1, 0, 1, 0];
  const { rows, cols } = cluesOf(plus, 3);
  const res = lineSolve(rows, cols);
  assert.ok(res.solved);
  assert.deepEqual(res.grid, plus);
  // the diagonal is ambiguous (two solutions), line logic must not "solve" it
  const diag = cluesOf([1, 0, 0, 1], 2);
  assert.equal(lineSolve(diag.rows, diag.cols).solved, false);
});

test('hand-drawn pictures are valid, line-solvable and fit the clue gutters', () => {
  for (const id of Object.keys(PICTURES)) {
    const { size, art } = PICTURES[id];
    assert.equal(art.length, size, id);
    for (const line of art) assert.equal(line.length, size, id);
    const p = pictureNonogram(id);
    assert.ok(isLineSolvable(p.solution, size), `${id} needs guessing`);
    const maxClues = Math.max(...p.rows.map((c) => c.length), ...p.cols.map((c) => c.length));
    assert.ok(maxClues <= MAX_CLUES[size], `${id} has ${maxClues} clues`);
    assert.equal(p.picture, id);
  }
  assert.ok(pictureIds(5).length >= 3 && pictureIds(10).length >= 3);
});

test('generated puzzles are line-solvable, unique, dense enough and deterministic', () => {
  for (const size of [5, 10, 15]) {
    for (let seed = 1; seed <= 25; seed++) {
      const p = generateRandomNonogram(size, seed * 7919 + size);
      assert.equal(p.solution.length, size * size);
      assert.ok(isLineSolvable(p.solution, size), `size ${size} seed ${seed}`);
      assert.ok(isSolved(p.solution, p.rows, p.cols));
      const density = p.solution.reduce((a, b) => a + b, 0) / p.solution.length;
      assert.ok(density >= 0.4 && density <= 0.76, `density ${density}`);
      for (const clue of [...p.rows, ...p.cols]) {
        assert.ok(clue.length <= MAX_CLUES[size]);
        assert.notDeepEqual(clue, [0], 'no empty lines');
      }
    }
  }
  assert.deepEqual(generateRandomNonogram(10, 42), generateRandomNonogram(10, 42));
  assert.notDeepEqual(generateRandomNonogram(10, 42).solution, generateRandomNonogram(10, 43).solution);
});

test('line-solvable 5×5 puzzles have exactly one solution (brute force)', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const p = generateRandomNonogram(5, seed);
    assert.equal(countSolutions(p.rows, p.cols), 1);
  }
  for (const id of pictureIds(5)) {
    const p = pictureNonogram(id);
    assert.equal(countSolutions(p.rows, p.cols), 1, id);
  }
});

test('isSolved ignores X marks and accepts any grid matching the clues', () => {
  const p = pictureNonogram('heart5');
  const withMarks = p.solution.map((v) => (v ? 1 : 2));
  assert.ok(isSolved(withMarks, p.rows, p.cols));
  const wrong = [...p.solution];
  wrong[0] = 1 - wrong[0];
  assert.equal(isSolved(wrong, p.rows, p.cols), false);
});
