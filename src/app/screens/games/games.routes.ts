import { Route } from '@angular/router';

import { GamesLayoutComponent } from 'src/app/layouts/games-layout.component';
import { GamesListComponent } from './games-list/games-list.component';

export const gamesRoute: Route = {
  path: 'games',
  component: GamesLayoutComponent,
  children: [
    { path: '', component: GamesListComponent },
    {
      path: 'queens',
      loadComponent: () => import('./queens/queens.component').then((m) => m.QueensComponent),
    },
    {
      path: 'sudoku',
      loadComponent: () => import('./sudoku/sudoku.component').then((m) => m.SudokuComponent),
    },
    {
      path: 'word-ladder',
      loadComponent: () =>
        import('./word-ladder/word-ladder.component').then((m) => m.WordLadderComponent),
    },
    {
      path: 'minesweeper',
      loadComponent: () =>
        import('./minesweeper/minesweeper.component').then((m) => m.MinesweeperComponent),
    },
    {
      path: 'nonogram',
      loadComponent: () => import('./nonogram/nonogram.component').then((m) => m.NonogramComponent),
    },
    {
      path: 'binary-puzzle',
      loadComponent: () =>
        import('./binary-puzzle/binary-puzzle.component').then((m) => m.BinaryPuzzleComponent),
    },
    {
      path: 'memory',
      loadComponent: () => import('./memory/memory.component').then((m) => m.MemoryComponent),
    },
    {
      path: 'color-link',
      loadComponent: () =>
        import('./color-link/color-link.component').then((m) => m.ColorLinkComponent),
    },
  ],
};
