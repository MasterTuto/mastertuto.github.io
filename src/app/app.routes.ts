import { Routes } from "@angular/router";
import { HomeComponent } from "./screens/home/home.component";
import { LanguageWrapperComponent } from "./components/language-wrpaper/language-wrapper.component";
import { GamesComponent } from "./screens/games/games.component";
import { GamesListComponent } from "./screens/games/games-list/games-list.component";
import { QueensComponent } from "./screens/games/queens/queens.component";
import { ServicePlaceholderComponent } from "./screens/service-placeholder/service-placeholder.component";
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
    ]
  },
  {
    path: 'tools',
    component: ToolsComponent,
  },
  {
    path: 'services/:service',
    component: ServicePlaceholderComponent,
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
        ]
      },
      {
        path: 'tools',
        component: ToolsComponent,
      },
    ]
  }
];
