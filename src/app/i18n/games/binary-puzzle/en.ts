/** Binary puzzle strings (en). */
export const binaryPuzzle = {
  name: "Binary Puzzle",
  description:
    'Fill the grid with 0s and 1s: no three alike in a row, equal counts in every line and no identical rows, in 6×6, 8×8 and 10×10 sizes.',
  seo: {
    title: 'Binary Puzzle Online: Free Takuzu / Binairo, Daily',
    description:
      'Play the free binary puzzle (Takuzu, Binairo) in your browser: 6×6, 8×8 and 10×10 grids, a daily puzzle, drag to fill, live rule checks, hints and one solution.',
  },
  size: 'Grid size',
  mode: 'Puzzle',
  daily: 'Daily',
  random: 'Random',
  undo: 'Undo',
  clear: 'Clear',
  hint: 'Hint',
  hints: 'Hints',
  filled: 'Filled',
  board: 'Binary puzzle grid',
  cell: 'Row {r}, column {c}',
  empty: 'empty',
  given: 'given',
  broken: 'breaks a rule',
  controlsTip: 'Tap to cycle empty → 0 → 1. Drag to paint the same digit over several cells. Keys 0 and 1 work too.',
  solved: 'Solved!',
  solvedIn: 'You finished the {size} grid in {time}.',
  dailyTag: 'daily puzzle',
  hintRules: {
    pair: 'Two equal digits side by side: the cells at both ends must hold the other digit.',
    gap: 'A cell between two equal digits must hold the other digit.',
    count: 'This line already has half of one digit, so the rest gets the other one.',
    line: 'Only one digit fits here: the other would break a rule later in this line.',
    fix: 'This cell was wrong, so it has been cleared.',
    reveal: 'This cell has been revealed.',
  },
  howTo: {
    title: 'How to play',
    s1: 'Fill every empty cell with a 0 or a 1.',
    s2: 'No more than two equal digits may sit next to each other in a row or column: 0 0 is fine, 0 0 0 is not.',
    s3: 'Each row and each column holds as many 0s as 1s.',
    s4: 'No two rows are identical, and no two columns are identical.',
  },
  tips: {
    title: 'Tips',
    t1: 'Look for pairs first: next to 1 1 there must be a 0 on each side. Then look for gaps: in 0 _ 0 the middle is a 1.',
    t2: 'Count as you go. Once a row of 8 has four 1s, every empty cell left in it is a 0.',
    t3: 'Stuck? Try a digit in your head and follow it a few cells; if it leads to three in a row or too many of one digit, the other digit is right. Red outlines show broken rules.',
  },
  faq: {
    title: 'Frequently asked questions',
    q1: 'Does every puzzle have a single solution?',
    a1: 'Yes. Each grid is generated from a complete solution and digits are removed only while a logical solver can still finish it, so there is exactly one answer and you never need to guess.',
    q2: 'What do the red outlines mean?',
    a2: 'They point out a broken rule right away: three equal digits in a row, too many 0s or 1s in a line, or two identical complete rows or columns. They do not tell you whether a cell matches the solution.',
    q3: 'How does the hint work?',
    a3: 'It fixes a wrong cell if you have one, otherwise it fills a cell you can deduce from the board right now and explains the reasoning. The number of hints you used is shown next to your time.',
    q4: 'Is it the same as Takuzu and Binairo?',
    a4: 'Yes. Binary puzzle, Takuzu, Binairo, Binero and 0h h1 are names for the same set of rules. Some versions use two colours instead of digits; here you get both.',
  },
  about: {
    title: 'About the binary puzzle',
    p1: 'The binary puzzle is a logic game with three simple rules and surprisingly deep reasoning. It became popular in the Netherlands and France under the names Binairo and Takuzu, and it is now a classic next to Sudoku in puzzle magazines.',
    p2: 'Each deduction rests on a small pattern: a pair forces its neighbours, a gap forces its middle, a full count closes a line, and the ban on identical rows settles the last open cells. Bigger grids ask you to read whole lines at once.',
    p3: 'This free version runs in your browser with no sign-up. Start with 6×6 to learn the patterns, move to 8×8 and try 10×10 when you want a real workout. A new daily puzzle for each size waits for you every day.',
  },
};

export type BinaryPuzzleStrings = typeof binaryPuzzle;
