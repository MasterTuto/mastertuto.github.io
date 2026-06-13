import { Routes } from "@angular/router";
import { HomeComponent } from "./screens/home/home.component";
import { LanguageWrapperComponent } from "./components/language-wrpaper/language-wrapper.component";
import { GamesComponent } from "./screens/games/games.component";
import { QueensComponent } from "./screens/games/queens/queens.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
            path: 'queens',
            component: QueensComponent,
          },
        ]
      },
    ]
  }
];

