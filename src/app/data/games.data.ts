import { Game } from "../model/game.model";

export const games: Game[] = [
  {
    route: "sudoku",
    nameKey: "sudoku.sudoku",
    descriptionKey: "games.sudokuDescription",
    icon: "tablerGrid4x4",
  },
  {
    route: "queens",
    nameKey: "queens.queens",
    descriptionKey: "games.queensDescription",
    icon: "tablerCrown",
  },
  {
    route: "word-ladder",
    nameKey: "wordLadder.name",
    descriptionKey: "games.wordLadderDescription",
    icon: "tablerStack2",
  },
  {
    route: "minesweeper",
    nameKey: "minesweeper.name",
    descriptionKey: "minesweeper.description",
    icon: "tablerBomb",
  },
  {
    route: "nonogram",
    nameKey: "nonogram.name",
    descriptionKey: "nonogram.description",
    icon: "tablerGridDots",
  },
  {
    route: "binary-puzzle",
    nameKey: "binaryPuzzle.name",
    descriptionKey: "binaryPuzzle.description",
    icon: "tablerBinary",
  },
  {
    route: "memory",
    nameKey: "memory.name",
    descriptionKey: "memory.description",
    icon: "tablerCards",
  },
  {
    route: "color-link",
    nameKey: "colorLink.name",
    descriptionKey: "colorLink.description",
    icon: "tablerRoute",
  },
];
