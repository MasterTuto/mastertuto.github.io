import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  COLOR_LINK_SIZES,
  areAdjacent,
  generateColorLink,
  evaluate,
  beginStroke,
  extendStroke,
  applyStroke,
  orthogonalSteps,
  isPathComplete,
} from '../src/app/utils/color-link.ts';

const SEEDS = [1, 7, 42, 20261112, 20260101, 123456789, 987654321, 31337];

test('generator covers every cell exactly once with valid paths and endpoints', () => {
  for (const size of COLOR_LINK_SIZES) {
    for (const seed of SEEDS) {
      const p = generateColorLink(size, seed);
      assert.equal(p.size, size);
      assert.equal(p.pairs.length, p.solution.length);
      const seen = new Set();
      p.solution.forEach((path, color) => {
        assert.ok(path.length >= 3, `path too short (${size}/${seed})`);
        for (let i = 1; i < path.length; i++) assert.ok(areAdjacent(size, path[i - 1], path[i]));
        for (const cell of path) {
          assert.ok(!seen.has(cell), 'cell used twice');
          seen.add(cell);
        }
        const { a, b } = p.pairs[color];
        assert.equal(a, path[0]);
        assert.equal(b, path[path.length - 1]);
        assert.ok(!areAdjacent(size, a, b), 'trivial adjacent endpoints');
      });
      assert.equal(seen.size, size * size, 'full coverage');
      const min = size === 5 ? 4 : size === 7 ? 6 : 9;
      assert.ok(p.pairs.length >= min && p.pairs.length <= min + 3);
      assert.ok(p.pairs.length <= 12, "palette has 12 colors");
      assert.equal(evaluate(p, p.solution).solved, true);
    }
  }
});

test('generator is deterministic per seed and varies across seeds', () => {
  for (const size of COLOR_LINK_SIZES) {
    assert.deepEqual(generateColorLink(size, 99), generateColorLink(size, 99));
    assert.notDeepEqual(generateColorLink(size, 99).pairs, generateColorLink(size, 100).pairs);
  }
});

test('validator detects win and non-win states', () => {
  const p = generateColorLink(5, 2024);
  const empty = p.pairs.map(() => []);
  let r = evaluate(p, empty);
  assert.equal(r.solved, false);
  assert.equal(r.connected, 0);
  assert.equal(r.covered, p.pairs.length * 2);

  // Reversed paths (drawn from the other endpoint) still win.
  const reversed = p.solution.map((path) => [...path].reverse());
  assert.equal(evaluate(p, reversed).solved, true);

  // Missing one cell: connected count may stay, but not solved.
  const partial = p.solution.map((path) => [...path]);
  partial[0] = partial[0].slice(0, -1);
  r = evaluate(p, partial);
  assert.equal(r.solved, false);
  assert.equal(r.connected, p.pairs.length - 1);

  // Overlap between two colors is invalid.
  const overlap = p.solution.map((path) => [...path]);
  overlap[1] = [...overlap[1], overlap[0][1]];
  assert.equal(evaluate(p, overlap).solved, false);

  // Non-adjacent jump is invalid even when all cells are covered.
  const jump = p.solution.map((path) => [...path]);
  const longest = jump.reduce((best, path, i) => (path.length > jump[best].length ? i : best), 0);
  const path = jump[longest];
  [path[1], path[2]] = [path[2], path[1]];
  assert.equal(evaluate(p, jump).solved, false);
});

test('validator accepts an alternative full solution', () => {
  // Hand-made 3x3 puzzle: color 0 from cell 0 to 2, color 1 from 3 to 8, solvable two ways? Use a grid
  // where one pair can take two routes: endpoints 0 and 8 alone (single color) -> serpentine or column snake.
  const puzzle = { size: 3, seed: 0, pairs: [{ a: 0, b: 8 }], solution: [[0, 1, 2, 5, 4, 3, 6, 7, 8]] };
  assert.equal(evaluate(puzzle, [[0, 3, 6, 7, 4, 1, 2, 5, 8]]).solved, true);
  assert.equal(evaluate(puzzle, [[0, 1, 2, 5, 8]]).solved, false);
});

test('strokes extend, retract, cut other colors and stop at the matching endpoint', () => {
  // 4x4: color 0 from 0 to 3 (top row), color 1 from 12 to 15 (bottom row).
  const puzzle = {
    size: 4,
    seed: 0,
    pairs: [
      { a: 0, b: 3 },
      { a: 12, b: 15 },
    ],
    solution: [],
  };
  let paths = [[], [12, 8, 9, 10, 11, 15]];
  const s = beginStroke(puzzle, paths, 0);
  assert.equal(s.color, 0);
  assert.ok(extendStroke(puzzle, s, 4));
  assert.ok(extendStroke(puzzle, s, 8)); // cuts color 1 at cell 8
  assert.deepEqual(applyStroke(s)[1], [12]);
  assert.ok(extendStroke(puzzle, s, 4)); // retract restores color 1
  assert.deepEqual(s.path, [0, 4]);
  assert.deepEqual(applyStroke(s)[1], [12, 8, 9, 10, 11, 15]);
  assert.equal(extendStroke(puzzle, s, 12 - 4 + 2), false); // not adjacent to head (4)
  assert.equal(extendStroke(puzzle, s, 0), true); // back to start
  assert.deepEqual(s.path, [0]);
  for (const cell of [1, 2]) assert.ok(extendStroke(puzzle, s, cell));
  assert.ok(extendStroke(puzzle, s, 3));
  assert.equal(s.done, true);
  assert.equal(extendStroke(puzzle, s, 7), false);
  paths = applyStroke(s);
  assert.ok(isPathComplete(puzzle, 0, paths[0]));

  // Another color's endpoint blocks.
  const t = beginStroke(puzzle, paths, 12);
  assert.deepEqual(t.path, [12]);
  assert.ok(extendStroke(puzzle, t, 8));
  assert.ok(extendStroke(puzzle, t, 4)); // cuts color 0 at 4? cell 4 is not on color 0's path now
  assert.equal(extendStroke(puzzle, t, 0), false); // color 0 endpoint

  // Starting in the middle of a path truncates after that cell.
  const u = beginStroke(puzzle, paths, 2);
  assert.deepEqual(u.path, [0, 1, 2]);
  assert.equal(beginStroke(puzzle, paths, 5), null);
});

test('orthogonal interpolation steps one cell at a time', () => {
  const steps = orthogonalSteps(5, 0, 12); // (0,0) -> (2,2)
  assert.equal(steps.length, 4);
  let prev = 0;
  for (const cell of steps) {
    assert.ok(areAdjacent(5, prev, cell));
    prev = cell;
  }
  assert.equal(prev, 12);
});

test('many seeds: full coverage, no adjacent endpoints, paths of at least 3 cells', () => {
  for (const size of COLOR_LINK_SIZES) {
    for (let seed = 1; seed <= 60; seed++) {
      const p = generateColorLink(size, seed * 7919);
      const cells = p.solution.flat();
      assert.equal(new Set(cells).size, size * size);
      assert.equal(cells.length, size * size);
      for (const { a, b } of p.pairs) assert.ok(!areAdjacent(size, a, b));
      assert.ok(p.solution.every((path) => path.length >= 3));
      assert.equal(evaluate(p, p.solution).solved, true);
    }
  }
});
