export const englishTranslations = {
  "games": "Games",
  home: {
    relatedCompanies: "We use the same technologies used by companies:",
    cta: "Contact me",
    stopLosing: "Stop losing",
    time: "time,",
    startWinning: "And start earning",
    money: "money",
    subtitle: "Automate your processes, improve your productivity and let the computer work for you."
  },
  queens: {
    "queens": "Queens",
    "level": "Level",
    "level-1": "Beginner",
    "level-2": "Easy",
    "level-3": "Medium",
    "level-4": "Hard",
    "level-5": "Expert",
    "new-game": "New Game",
    "hint": "Hint",
    "congratulations": "Congratulations! Puzzle solved!",
    "queens-placed": "queens placed",
    "check-errors": "Check for rule violations",
    "loading": "Loading...",
    "how-to-play": "How to Play",
    "rule-row": "Place exactly one queen in each row.",
    "rule-col": "Place exactly one queen in each column.",
    "rule-region": "Place exactly one queen in each colored region.",
    "rule-adjacent": "No two queens can touch, even diagonally.",
    "tip-tap": "Tap once to mark ✕, tap again to place ♛, tap again to clear.",
    "tip-x": "Slide your finger across cells to quickly mark ✕ on multiple cells.",
    "tip-slide": "Use ✕ marks to flag cells you know cannot contain a queen.",
    "faq-title": "Frequently Asked Questions",
    "faq-q1": "What is the Queens game?",
    "faq-a1": "Queens is a logic puzzle where you place queens on a board so that each row, column, and colored region contains exactly one queen, and no two queens touch each other (horizontally, vertically, or diagonally).",
    "faq-q2": "How do I play?",
    "faq-a2": "Tap a cell to cycle through states: ✕ mark → ♛ queen → empty. Slide your finger across the board to quickly mark ✕ on multiple cells. The game highlights rule violations in red.",
    "faq-q3": "What happens if I make a mistake?",
    "faq-a3": "Conflicting queens are highlighted in red. Review your placements and adjust until all constraints are satisfied. The game does not have a move limit — experiment freely!",
    "faq-q4": "Is there a new puzzle every day?",
    "faq-a4": "Yes! The board is generated daily based on the current date, giving you a fresh challenge every day. Share your results with friends!",
    "seo-title": "Play Queens — Daily Logic Puzzle",
    "seo-p1": "Queens is a daily logic puzzle inspired by the classic N-Queens problem. Your goal is to place queens on the board following four simple rules: one queen per row, one per column, one per colored region, and no two queens may touch each other.",
    "seo-p2": "Choose from 5 difficulty levels — Beginner (5\u00d75), Easy (6\u00d76), Medium (7\u00d77), Hard (8\u00d78), and Expert (10\u00d710). Each puzzle is generated deterministically from the date, so everyone gets the same challenge every day.",
    "seo-p3": "Play online for free, no registration required. Train your logical reasoning and pattern recognition skills. A brand new puzzle awaits you every day. Bookmark this page and come back daily!",
  }
};

export type Translations = typeof englishTranslations;

export type IsGenericString<T> = [T] extends [string] ? [string] extends [T] ? true : false : false;

export type TranslationKeyChecker<TranslationPath extends string, Walking extends Record<string, any>=Translations> =
  IsGenericString<TranslationPath> extends true
    ? TranslationPath
    : TranslationPath extends `${infer Part1}.${infer Part2}`
      ? Part1 extends keyof Walking
        ? `${Part1}.${TranslationKeyChecker<Part2, Walking[Part1]>}`
        : never
      : TranslationPath extends keyof Walking
        ? Walking[TranslationPath] extends string
          ? TranslationPath
          : never
        : never;

