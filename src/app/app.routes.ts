import { Routes } from "@angular/router";
import { HomeComponent } from "./screens/home/home.component";
import { LanguageWrapperComponent } from "./components/language-wrpaper/language-wrapper.component";
import { GamesComponent } from "./screens/games/games.component";
import { GamesListComponent } from "./screens/games/games-list/games-list.component";
import { QueensComponent } from "./screens/games/queens/queens.component";
import { SudokuComponent } from "./screens/games/sudoku/sudoku.component";
import { ServiceDetailComponent } from "./screens/services/service-detail/service-detail.component";
import { ServicesIndexComponent } from "./screens/services/services-index/services-index.component";
import { ToolsComponent } from "./screens/tools/tools.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'games',
    component: GamesComponent,
    children: [
      {
        path: '',
        component: GamesListComponent,
      },
      {
        path: 'queens',
        component: QueensComponent,
      },
      {
        path: 'sudoku',
        component: SudokuComponent,
      },
      {
        path: 'word-ladder',
        loadComponent: () =>
          import("./screens/games/word-ladder/word-ladder.component").then(
            (m) => m.WordLadderComponent,
          ),
      },
    ]
  },
  {
    path: 'tools',
    component: ToolsComponent,
  },
  {
    path: 'services',
    component: ServicesIndexComponent,
  },
  {
    path: 'services/:service',
    component: ServiceDetailComponent,
  },
  {
    path: ':lang',
    component: LanguageWrapperComponent,
    children: [
      {
        path: 'games',
        component: GamesComponent,
        children: [
          {
            path: '',
            component: GamesListComponent,
          },
          {
            path: 'queens',
            component: QueensComponent,
          },
          {
            path: 'sudoku',
            component: SudokuComponent,
          },
          {
            path: 'word-ladder',
            loadComponent: () =>
              import("./screens/games/word-ladder/word-ladder.component").then(
                (m) => m.WordLadderComponent,
              ),
          },
        ]
      },
      {
        path: 'tools',
        component: ToolsComponent,
      },
      {
        path: 'services',
        component: ServicesIndexComponent,
      },
      {
        path: 'services/:service',
        component: ServiceDetailComponent,
      },
    ]
  }
];
