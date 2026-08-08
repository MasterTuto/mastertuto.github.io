import {
  buildPuzzle,
  findShortestPath,
  getDailyPuzzle,
  isOneLetterApart,
  isWinningMove,
  isValidWord,
  normalizeWord,
  pickRandomPuzzle,
  WORD_LADDER_PUZZLES,
} from "./word-ladder";

describe("word-ladder", () => {
  describe("normalizeWord", () => {
    it("uppercases the input", () => {
      expect(normalizeWord("cold")).toBe("COLD");
    });

    it("strips non-letter characters", () => {
      expect(normalizeWord(" cold ")).toBe("COLD");
      expect(normalizeWord("ca-t!")).toBe("CAT");
    });

    it("returns an empty string when there are no letters", () => {
      expect(normalizeWord("123")).toBe("");
      expect(normalizeWord("")).toBe("");
    });
  });

  describe("isValidWord", () => {
    it("accepts words in the dictionary", () => {
      expect(isValidWord("CAT")).toBeTrue();
      expect(isValidWord("dog")).toBeTrue();
    });

    it("rejects words not in the dictionary", () => {
      expect(isValidWord("QQQ")).toBeFalse();
      expect(isValidWord("")).toBeFalse();
    });
  });

  describe("isOneLetterApart", () => {
    it("returns true when exactly one letter changes", () => {
      expect(isOneLetterApart("COLD", "CORD")).toBeTrue();
      expect(isOneLetterApart("cat", "cot")).toBeTrue();
    });

    it("returns false when the words are identical", () => {
      expect(isOneLetterApart("COLD", "COLD")).toBeFalse();
    });

    it("returns false when more than one letter changes", () => {
      expect(isOneLetterApart("COLD", "CARD")).toBeFalse();
      expect(isOneLetterApart("COLD", "WARM")).toBeFalse();
    });

    it("returns false for words of different lengths", () => {
      expect(isOneLetterApart("COLD", "COLDER")).toBeFalse();
    });
  });

  describe("isWinningMove", () => {
    it("matches the target ignoring case", () => {
      expect(isWinningMove("dog", "DOG")).toBeTrue();
    });

    it("returns false when the word differs from the target", () => {
      expect(isWinningMove("CAT", "DOG")).toBeFalse();
    });
  });

  describe("findShortestPath", () => {
    it("returns a valid chain between two dictionary words", () => {
      const path = findShortestPath("CAT", "DOG");
      expect(path).not.toBeNull();
      expect(path![0]).toBe("CAT");
      expect(path![path!.length - 1]).toBe("DOG");
      for (let i = 1; i < path!.length; i++) {
        expect(isOneLetterApart(path![i - 1], path![i])).toBeTrue();
        expect(isValidWord(path![i])).toBeTrue();
      }
    });

    it("returns null when the start word is not in the dictionary", () => {
      expect(findShortestPath("ZZZZ", "CAT")).toBeNull();
    });
  });

  describe("WORD_LADDER_PUZZLES", () => {
    it("contains only solvable puzzles with matching difficulty bands", () => {
      expect(WORD_LADDER_PUZZLES.length).toBeGreaterThan(0);
      for (const p of WORD_LADDER_PUZZLES) {
        const path = findShortestPath(p.start, p.target);
        expect(path).withContext(`${p.start} -> ${p.target}`).not.toBeNull();
        const moves = path!.length - 1;
        expect(p.optimalMoves).toBe(moves);
        if (p.difficulty === "easy") {
          expect(moves).toBeGreaterThanOrEqual(2);
          expect(moves).toBeLessThanOrEqual(4);
        } else if (p.difficulty === "medium") {
          expect(moves).toBeGreaterThanOrEqual(5);
          expect(moves).toBeLessThanOrEqual(7);
        } else {
          expect(moves).toBeGreaterThanOrEqual(8);
        }
      }
    });
  });

  describe("buildPuzzle", () => {
    it("computes optimalMoves from the shortest path", () => {
      const puzzle = buildPuzzle({ start: "CAT", target: "DOG", difficulty: "easy" });
      expect(puzzle.start).toBe("CAT");
      expect(puzzle.target).toBe("DOG");
      expect(puzzle.optimalMoves).toBeGreaterThan(0);
      expect(puzzle.id).toBe("CAT-DOG");
    });
  });

  describe("pickRandomPuzzle", () => {
    it("always returns a puzzle of the requested difficulty", () => {
      for (const difficulty of ["easy", "medium", "hard"] as const) {
        for (let i = 0; i < 20; i++) {
          expect(pickRandomPuzzle(difficulty).difficulty).toBe(difficulty);
        }
      }
    });

    it("avoids the excluded puzzle when possible", () => {
      const puzzle = pickRandomPuzzle("easy", "CAT-DOG");
      expect(puzzle.id).not.toBe("CAT-DOG");
    });
  });

  describe("getDailyPuzzle", () => {
    it("is deterministic for a given UTC day", () => {
      const a = getDailyPuzzle(new Date("2026-08-07T10:00:00Z"));
      const b = getDailyPuzzle(new Date("2026-08-07T23:59:00Z"));
      expect(a.id).toBe(b.id);
    });

    it("returns a different puzzle on the next day", () => {
      const a = getDailyPuzzle(new Date("2026-08-07T10:00:00Z"));
      const b = getDailyPuzzle(new Date("2026-08-08T10:00:00Z"));
      expect(a.id).not.toBe(b.id);
    });
  });
});
