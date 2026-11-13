/**
 * Board rules for the Queens game, kept free of Angular so they can be unit-tested with Node.
 * Cells are indexed row-major: index = row * size + col.
 */

/** Indexes of queens that break a rule: same row, column or region, or touching (also diagonally). */
export function findConflicts(
  queens: readonly boolean[],
  regions: readonly number[],
  size: number,
): Set<number> {
  const errors = new Set<number>();
  const placed: number[] = [];
  for (let i = 0; i < queens.length; i++) if (queens[i]) placed.push(i);
  for (let a = 0; a < placed.length; a++) {
    for (let b = a + 1; b < placed.length; b++) {
      const i = placed[a];
      const j = placed[b];
      const r1 = Math.floor(i / size);
      const c1 = i % size;
      const r2 = Math.floor(j / size);
      const c2 = j % size;
      const clash =
        r1 === r2 ||
        c1 === c2 ||
        regions[i] === regions[j] ||
        (Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1);
      if (clash) {
        errors.add(i);
        errors.add(j);
      }
    }
  }
  return errors;
}

/** Empty cells that cannot hold a queen because of the queens already placed (for auto ✕). */
export function attackedCells(
  queens: readonly boolean[],
  regions: readonly number[],
  size: number,
): Set<number> {
  const out = new Set<number>();
  for (let q = 0; q < queens.length; q++) {
    if (!queens[q]) continue;
    const qr = Math.floor(q / size);
    const qc = q % size;
    for (let i = 0; i < queens.length; i++) {
      if (queens[i]) continue;
      const r = Math.floor(i / size);
      const c = i % size;
      if (
        r === qr ||
        c === qc ||
        regions[i] === regions[q] ||
        (Math.abs(r - qr) <= 1 && Math.abs(c - qc) <= 1)
      ) {
        out.add(i);
      }
    }
  }
  return out;
}

/**
 * Cells crossed when the pointer jumps from cell `from` to cell `to` (both included, `from` first),
 * so a fast swipe does not skip cells between two pointer events.
 */
export function cellsOnSegment(from: number, to: number, size: number): number[] {
  const r0 = Math.floor(from / size);
  const c0 = from % size;
  const r1 = Math.floor(to / size);
  const c1 = to % size;
  const steps = Math.max(Math.abs(r1 - r0), Math.abs(c1 - c0));
  const out: number[] = [];
  for (let s = 0; s <= steps; s++) {
    const t = steps === 0 ? 0 : s / steps;
    const idx = Math.round(r0 + (r1 - r0) * t) * size + Math.round(c0 + (c1 - c0) * t);
    if (out[out.length - 1] !== idx) out.push(idx);
  }
  return out;
}
