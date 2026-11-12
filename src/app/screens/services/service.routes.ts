import { inject } from '@angular/core';
import { RedirectFunction, Route, Router, Routes } from '@angular/router';

import { translations } from 'src/app/i18n/translations';
import { TranslationInitializer } from 'src/app/service/translation.initializer';
import { ServicesLayoutComponent } from 'src/app/layouts/services-layout.component';
import { ServicesIndexComponent } from './services-index/services-index.component';

const DEFAULT_LANGUAGE = 'pt';

/** Redirects a language-less URL (e.g. /services/landing-pages) to the same path under the current language. */
export const toCurrentLanguage: RedirectFunction = ({
  url,
  queryParams,
  fragment,
}) => {
  const current = inject(TranslationInitializer).currentLang;
  const language =
    current && current in translations ? current : DEFAULT_LANGUAGE;
  return inject(Router).createUrlTree(
    ['/', language, ...url.map((segment) => segment.path)],
    {
      queryParams,
      fragment: fragment ?? undefined,
    },
  );
};

/** Language-less service URLs, kept so existing links keep working. */
export const serviceRedirectRoutes: Routes = [
  { path: 'services/landing-pages', redirectTo: toCurrentLanguage },
  { path: 'services/sites-para-autonomos', redirectTo: toCurrentLanguage },
  { path: 'services/blogs-e-portfolios', redirectTo: toCurrentLanguage },
  { path: 'services/integracoes', redirectTo: toCurrentLanguage },
];

/** Language-less /services index. */
export const servicesIndexRoute: Route = {
  path: 'services',
  component: ServicesLayoutComponent,
  children: [{ path: '', component: ServicesIndexComponent }],
};

/** Service pages, mounted under /:lang. */
export const servicesRoute: Route = {
  path: 'services',
  component: ServicesLayoutComponent,
  children: [
    { path: '', component: ServicesIndexComponent },
    {
      path: 'landing-pages',
      loadComponent: () =>
        import('./landing-pages/landing-pages.component').then(
          (m) => m.LandingPagesComponent,
        ),
    },
    {
      path: 'sites-para-autonomos',
      loadComponent: () =>
        import('./websites-for-freelancers/websites-for-freelancers.component').then(
          (m) => m.WebsitesForFreelancersComponent,
        ),
    },
    {
      path: 'blogs-e-portfolios',
      loadComponent: () =>
        import('./blogs-and-portfolios/blogs-and-portfolios.component').then(
          (m) => m.BlogsAndPortfoliosComponent,
        ),
    },
    {
      path: 'integracoes',
      loadComponent: () =>
        import('./integrations/integrations.component').then(
          (m) => m.IntegrationsComponent,
        ),
    },
  ],
};
