import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findConflicts, attackedCells, cellsOnSegment } from '../src/app/utils/queens-board.ts';
import { generatePuzzle } from '../src/app/utils/queens-puzzle.ts';

const flags = (size, ...idx) => Array.from({ length: size * size }, (_, i) => idx.includes(i));

test('generated puzzles have a valid solution with one queen per row, column and region', () => {
  for (let level = 1; level <= 5; level++) {
    for (const seed of [20261112, 1, 987654321]) {
      const p = generatePuzzle(seed, level);
      const N = p.size;
      const regions = p.regions.flat();
      const queens = flags(N, ...p.solution.map(([r, c]) => r * N + c));
      assert.equal(findConflicts(queens, regions, N).size, 0);
      assert.equal(new Set(p.solution.map(([r, c]) => p.regions[r][c])).size, N);
      assert.equal(new Set(p.solution.map(([, c]) => c)).size, N);
    }
  }
});

test('same date seed gives the same daily board', () => {
  assert.deepEqual(generatePuzzle(20261112, 3), generatePuzzle(20261112, 3));
});

test('findConflicts flags rows, columns, regions and touching queens', () => {
  const N = 4;
  const regions = Array.from({ length: 16 }, (_, i) => i); // every cell its own region
  assert.deepEqual([...findConflicts(flags(N, 0, 2), regions, N)].sort(), [0, 2]); // same row
  assert.deepEqual([...findConflicts(flags(N, 1, 13), regions, N)].sort(), [1, 13]); // same column
  assert.deepEqual([...findConflicts(flags(N, 0, 5), regions, N)].sort(), [0, 5]); // diagonal touch
  assert.equal(findConflicts(flags(N, 0, 6), regions, N).size, 0);
  const shared = regions.map((r) => (r === 6 ? 0 : r));
  assert.deepEqual([...findConflicts(flags(N, 0, 6), shared, N)].sort(), [0, 6]); // same region
});

test('attackedCells covers row, column, region and neighbours but not the queen', () => {
  const N = 4;
  const regions = Array.from({ length: 16 }, () => 0).map((_, i) => (i === 15 ? 0 : i < 8 ? 1 : 2));
  const hit = attackedCells(flags(N, 0), regions, N);
  assert.ok(!hit.has(0));
  for (const i of [1, 2, 3, 4, 8, 12, 5]) assert.ok(hit.has(i), `cell ${i}`);
  assert.ok(hit.has(6) && hit.has(7)); // same region (1)
  assert.ok(!hit.has(10));
});

test('cellsOnSegment fills the cells skipped by a fast swipe', () => {
  assert.deepEqual(cellsOnSegment(0, 3, 5), [0, 1, 2, 3]);
  assert.deepEqual(cellsOnSegment(0, 12, 5), [0, 6, 12]);
  assert.deepEqual(cellsOnSegment(7, 7, 5), [7]);
  assert.deepEqual(cellsOnSegment(20, 0, 5), [20, 15, 10, 5, 0]);
});
