export interface Puzzle {
  size: number;
  regions: number[][];
  solution: [number, number][];
}

function seededRng(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return (s >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function placeQueens(N: number, rng: () => number): number[] | null {
  const cols = Array.from({ length: N }, (_, i) => i);

  function backtrack(
    row: number,
    usedCols: Set<number>,
    prevCol: number,
  ): number[] | null {
    if (row === N) return [];
    const candidates = shuffle(
      cols.filter(
        (c) => !usedCols.has(c) && (row === 0 || Math.abs(c - prevCol) > 1),
      ),
      rng,
    );
    for (const col of candidates) {
      usedCols.add(col);
      const result = backtrack(row + 1, usedCols, col);
      if (result !== null) return [col, ...result];
      usedCols.delete(col);
    }
    return null;
  }

  return backtrack(0, new Set(), -2);
}

type GrowMode = "normal" | "h-line" | "v-line";

function growRegions(
  N: number,
  queens: [number, number][],
  rng: () => number,
): number[][] {
  const regions: number[][] = Array.from({ length: N }, () =>
    Array(N).fill(-1),
  );
  const regionCells: [number, number][][] = queens.map(() => []);

  for (let i = 0; i < N; i++) {
    const [r, c] = queens[i];
    regions[r][c] = i;
    regionCells[i].push([r, c]);
  }

  const dirs: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const hDirs: [number, number][] = [[0, -1], [0, 1]];
  const vDirs: [number, number][] = [[-1, 0], [1, 0]];
  let remaining = N * N - N;

  // Assign growth modes to create region shape variety
  const modes: GrowMode[] = Array.from({ length: N }, () => {
    const t = rng();
    if (t < 0.2) return "h-line";
    if (t < 0.4) return "v-line";
    return "normal";
  });

  // Track growth direction preference for each region
  const prefDir: [number, number][] = Array.from({ length: N }, () =>
    dirs[Math.floor(rng() * 4)]);

  // Phase 1: restricted growth (line regions only grow in their axis)
  for (let iter = 0; iter < 100 && remaining > 0; iter++) {
    const order = shuffle(Array.from({ length: N }, (_, i) => i), rng);
    let grew = false;

    for (const regionId of order) {
      if (remaining <= 0) break;

      const allowedDirs =
        modes[regionId] === "h-line"
          ? hDirs
          : modes[regionId] === "v-line"
            ? vDirs
            : dirs;

      const allCandidates: [number, number, number][] = [];

      for (const [r, c] of regionCells[regionId]) {
        for (const [dr, dc] of allowedDirs) {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 && nr < N && nc >= 0 && nc < N && regions[nr][nc] === -1
          ) {
            let priority = rng();
            // Slightly bias toward growing in preferred direction
            if (modes[regionId] === "normal") {
              const [pdr, pdc] = prefDir[regionId];
              if (dr === pdr && dc === pdc) priority -= 0.15;
            }
            allCandidates.push([nr, nc, priority]);
          }
        }
      }

      if (allCandidates.length > 0) {
        allCandidates.sort((a, b) => a[2] - b[2]);
        const [nr, nc] = allCandidates[0];
        regions[nr][nc] = regionId;
        regionCells[regionId].push([nr, nc]);
        remaining--;
        grew = true;

        // Occasionally shift preferred direction
        if (rng() < 0.12) {
          prefDir[regionId] = dirs[Math.floor(rng() * 4)];
        }
      }
    }

    if (!grew) break;
  }

  // Phase 2: fill remaining cells with normal growth
  while (remaining > 0) {
    const order = shuffle(Array.from({ length: N }, (_, i) => i), rng);
    let grew = false;

    for (const regionId of order) {
      if (remaining <= 0) break;

      const allCandidates: [number, number][] = [];
      for (const [r, c] of regionCells[regionId]) {
        for (const [dr, dc] of dirs) {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 && nr < N && nc >= 0 && nc < N && regions[nr][nc] === -1
          ) {
            allCandidates.push([nr, nc]);
          }
        }
      }

      if (allCandidates.length > 0) {
        const [nr, nc] =
          allCandidates[Math.floor(rng() * allCandidates.length)];
        regions[nr][nc] = regionId;
        regionCells[regionId].push([nr, nc]);
        remaining--;
        grew = true;
      }
    }

    if (!grew) break;
  }

  // Phase 3: create nesting patterns - let compact regions swallow isolated cells
  // from line regions to create more interlocking shapes
  for (let iter = 0; iter < 3; iter++) {
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const rid = regions[r][c];
        if (modes[rid] === "normal") continue;

        // Check if this cell is an "island" of a line region (surrounded by other regions)
        let sameNeighbors = 0;
        let totalNeighbors = 0;
        for (const [dr, dc] of dirs) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < N && nc >= 0 && nc < N) {
            totalNeighbors++;
            if (regions[nr][nc] === rid) sameNeighbors++;
          }
        }

        // If most neighbors are from other regions, and this isn't the queen cell
        const isQueen = queens.some(([qr, qc]) => qr === r && qc === c);
        if (!isQueen && sameNeighbors <= 1 && totalNeighbors > 2) {
          // Reassign to one of the neighboring regions
          const neighborRegions: number[] = [];
          for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (
              nr >= 0 && nr < N && nc >= 0 && nc < N && regions[nr][nc] !== rid
            ) {
              neighborRegions.push(regions[nr][nc]);
            }
          }
          if (neighborRegions.length > 0) {
            const newRid =
              neighborRegions[Math.floor(rng() * neighborRegions.length)];
            regions[r][c] = newRid;
            // Remove from old region, add to new
            const idx = regionCells[rid].findIndex(
              ([cr, cc]) => cr === r && cc === c,
            );
            if (idx >= 0) regionCells[rid].splice(idx, 1);
            regionCells[newRid].push([r, c]);
          }
        }
      }
    }
  }

  return regions;
}

const SIZES = [5, 6, 7, 8, 10];

export function generatePuzzle(seed: number, level: number = 3): Puzzle {
  const N = SIZES[Math.min(level - 1, SIZES.length - 1)];
  const rng = seededRng(seed * 1000 + level);

  const queenCols = placeQueens(N, rng);
  if (!queenCols) return generatePuzzle(seed + 1, level);

  const solution: [number, number][] = queenCols.map((col, row) => [row, col]);
  const regions = growRegions(N, solution, rng);

  return { size: N, regions, solution };
}
