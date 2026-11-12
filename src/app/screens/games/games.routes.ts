import { Route } from '@angular/router';

import { GamesLayoutComponent } from 'src/app/layouts/games-layout.component';
import { GamesListComponent } from './games-list/games-list.component';
import { QueensComponent } from './queens/queens.component';
import { SudokuComponent } from './sudoku/sudoku.component';

export const gamesRoute: Route = {
  path: 'games',
  component: GamesLayoutComponent,
  children: [
    { path: '', component: GamesListComponent },
    { path: 'queens', component: QueensComponent },
    { path: 'sudoku', component: SudokuComponent },
    {
      path: 'word-ladder',
      loadComponent: () =>
        import('./word-ladder/word-ladder.component').then((m) => m.WordLadderComponent),
    },
  ],
};
