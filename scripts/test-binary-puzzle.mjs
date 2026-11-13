import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  countSolutions,
  findDeduction,
  findViolations,
  generateBinaryPuzzle,
  generateSolution,
  isComplete,
  levelForSize,
  lineDeductions,
  logicSolve,
  seededRandom,
  simpleDeductions,
  validLines,
} from '../src/app/utils/binary-puzzle.ts';

const parse = (rows) => rows.join('').split('').map((ch) => (ch === '.' ? -1 : Number(ch)));

test('validLines are balanced and never have three alike', () => {
  assert.equal(validLines(4).length, 6);
  assert.equal(validLines(6).length, 14);
  for (const n of [6, 8, 10]) {
    for (const mask of validLines(n)) {
      const bits = Array.from({ length: n }, (_, i) => (mask >> i) & 1);
      assert.equal(bits.filter(Boolean).length, n / 2);
      for (let i = 2; i < n; i++) assert.ok(!(bits[i] === bits[i - 1] && bits[i] === bits[i - 2]));
    }
  }
});

test('generated solutions follow every rule', () => {
  for (const n of [6, 8, 10]) {
    for (let seed = 1; seed <= 10; seed++) {
      const grid = generateSolution(n, seededRandom(seed));
      assert.equal(grid.length, n * n);
      assert.ok(isComplete(grid, n), `n=${n} seed=${seed}`);
    }
  }
});

test('violations: three in a row, count overflow and duplicate lines', () => {
  const three = parse(['000...', '......', '......', '......', '......', '......']);
  assert.deepEqual([...findViolations(three, 6)].sort((a, b) => a - b), [0, 1, 2]);
  const overflow = parse(['0.0.00', '......', '......', '......', '......', '......']);
  assert.deepEqual([...findViolations(overflow, 6)].sort((a, b) => a - b), [0, 2, 4, 5]);
  const dup = parse(['001101', '001101', '......', '......', '......', '......']);
  const bad = findViolations(dup, 6);
  for (let i = 0; i < 12; i++) assert.ok(bad.has(i));
  assert.equal(findViolations(parse(['0.1...', '......', '......', '......', '......', '......']), 6).size, 0);
});

test('simple deductions: pair, gap and count', () => {
  const pair = parse(['.00...', '......', '......', '......', '......', '......']);
  const d1 = simpleDeductions(pair, 6);
  assert.deepEqual(d1.filter((d) => d.rule === 'pair').map((d) => [d.index, d.value]).sort(), [[0, 1], [3, 1]]);
  const gap = parse(['1.1...', '......', '......', '......', '......', '......']);
  assert.deepEqual(findDeduction(gap, 6), { index: 1, value: 0, rule: 'gap' });
  const count = parse(['1.1.1.', '......', '......', '......', '......', '......']);
  const counted = simpleDeductions(count, 6).filter((d) => d.index < 6);
  assert.ok(counted.every((d) => d.value === 0));
  assert.deepEqual(counted.map((d) => d.index).sort(), [1, 3, 5]);
});

test('line deductions are sound (agree with the solution)', () => {
  for (let seed = 1; seed <= 10; seed++) {
    const p = generateBinaryPuzzle(8, seed, 'line');
    const deductions = lineDeductions(p.givens, 8);
    assert.ok(deductions);
    for (const d of deductions) assert.equal(d.value, p.solution[d.index]);
  }
});

test('generated puzzles have a unique solution reachable by logic', () => {
  for (const n of [6, 8, 10]) {
    for (let seed = 1; seed <= (n === 10 ? 4 : 10); seed++) {
      const p = generateBinaryPuzzle(n, seed * 101 + n);
      const level = levelForSize(n);
      assert.equal(p.givens.length, n * n);
      assert.ok(p.givens.some((v) => v === -1));
      p.givens.forEach((v, i) => v !== -1 && assert.equal(v, p.solution[i]));
      assert.ok(isComplete(p.solution, n));
      const solved = logicSolve(p.givens, n, level);
      assert.ok(solved.solved);
      assert.deepEqual(solved.grid, p.solution);
      assert.equal(countSolutions(p.givens, n, 2), 1, `n=${n} seed=${seed}`);
    }
  }
});

test('generation is deterministic per seed', () => {
  assert.deepEqual(generateBinaryPuzzle(8, 2026), generateBinaryPuzzle(8, 2026));
  assert.notDeepEqual(generateBinaryPuzzle(8, 2026).givens, generateBinaryPuzzle(8, 2027).givens);
});

test('the hint always finds a correct next step until the grid is full', () => {
  const p = generateBinaryPuzzle(8, 7);
  const grid = [...p.givens];
  while (grid.includes(-1)) {
    const step = findDeduction(grid, 8);
    assert.ok(step, 'stuck');
    assert.equal(step.value, p.solution[step.index]);
    grid[step.index] = step.value;
  }
  assert.ok(isComplete(grid, 8));
});

test('countSolutions detects ambiguity', () => {
  assert.ok(countSolutions(new Array(36).fill(-1), 6, 2) === 2);
});
