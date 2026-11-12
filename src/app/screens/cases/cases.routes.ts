import { inject } from '@angular/core';
import { RedirectFunction, Route, Router, Routes } from '@angular/router';

import { projectCases } from 'src/app/data/cases.data';
import { CasesLayoutComponent } from 'src/app/layouts/cases-layout.component';
import { TranslationInitializer } from 'src/app/service/translation.initializer';
import { toCurrentLanguage } from '../services/service.routes';

/** /cases has no page of its own: send it to the projects section of the home page. */
const toHomeProjects: RedirectFunction = () =>
  inject(Router).createUrlTree(['/', inject(TranslationInitializer).currentLang ?? 'pt'], { fragment: 'projects' });

/** Language-less case URLs, redirected to the current language. */
export const caseRedirectRoutes: Routes = projectCases.map((project) => ({
  path: `cases/${project.slug}`,
  redirectTo: toCurrentLanguage,
}));

/** Case pages, mounted under /:lang. One route per case so each one is prerendered. */
export const casesRoute: Route = {
  path: 'cases',
  component: CasesLayoutComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: toHomeProjects },
    ...projectCases.map((project) => ({
      path: project.slug,
      data: { slug: project.slug },
      loadComponent: () => import('./case-page.component').then((m) => m.CasePageComponent),
    })),
  ],
};
