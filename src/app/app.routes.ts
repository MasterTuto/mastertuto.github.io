import { industryRoutes } from './screens/industries/industry.routes';
import { Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';
import { LanguageWrapperComponent } from './components/language-wrpaper/language-wrapper.component';
import { gamesRoute } from './screens/games/games.routes';
import { toolsRoute } from './screens/tools/tools.routes';
import {
  serviceRedirectRoutes,
  servicesIndexRoute,
  servicesRoute,
} from './screens/services/service.routes';
import { translations } from './i18n/translations';
import { caseRedirectRoutes, casesRoute } from './screens/cases/cases.routes';

export const routes: Routes = [
  ...industryRoutes,
  {
    path: '',
    component: HomeComponent,
  },
  gamesRoute,
  toolsRoute,
  ...serviceRedirectRoutes,
  ...caseRedirectRoutes,
  servicesIndexRoute,
  {
    path: ':lang',
    pathMatch: 'full',
    canMatch: [
      (route, segments) => {
        const lang = segments[0].parameterMap.get('lang');
        return lang && lang in translations;
      },
    ],
    component: HomeComponent,
  },
  {
    path: ':lang',
    component: LanguageWrapperComponent,
    children: [...industryRoutes, gamesRoute, toolsRoute, servicesRoute, casesRoute],
  },
];
