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
];
