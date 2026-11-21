import { inject, Type } from '@angular/core';
import { RedirectFunction, Route, Router, Routes } from '@angular/router';

import { translations } from 'src/app/i18n/translations';
import { TranslationInitializer } from 'src/app/service/translation.initializer';
import { ServicesLayoutComponent } from 'src/app/layouts/services-layout.component';
import { landings } from './landings/landings.registry';
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

/** Lazy loader of each service page; one component per page so each layout ships alone. */
const pageLoaders: Record<string, () => Promise<Type<unknown>>> = {
  'landing-pages': () =>
    import('./landings/pages/landing-pages/landing-pages-page.component').then((m) => m.LandingPagesPageComponent),
  'sites-para-autonomos': () =>
    import('./landings/pages/sites-para-autonomos/sites-para-autonomos-page.component').then((m) => m.SitesParaAutonomosPageComponent),
  'seo-e-geo': () =>
    import('./landings/pages/seo-e-geo/seo-e-geo-page.component').then((m) => m.SeoEGeoPageComponent),
  'blogs-e-portfolios': () =>
    import('./landings/pages/blogs-e-portfolios/blogs-e-portfolios-page.component').then((m) => m.BlogsEPortfoliosPageComponent),
  'lojas-virtuais': () =>
    import('./landings/pages/lojas-virtuais/lojas-virtuais-page.component').then((m) => m.LojasVirtuaisPageComponent),
  'agentes-de-ia': () =>
    import('./landings/pages/agentes-de-ia/agentes-de-ia-page.component').then((m) => m.AgentesDeIaPageComponent),
  'automacao-de-processos': () =>
    import('./landings/pages/automacao-de-processos/automacao-de-processos-page.component').then((m) => m.AutomacaoDeProcessosPageComponent),
  'integracoes': () =>
    import('./landings/pages/integracoes/integracoes-page.component').then((m) => m.IntegracoesPageComponent),
  'sistemas-sob-medida': () =>
    import('./landings/pages/sistemas-sob-medida/sistemas-sob-medida-page.component').then((m) => m.SistemasSobMedidaPageComponent),
  'mvp-e-saas': () =>
    import('./landings/pages/mvp-e-saas/mvp-e-saas-page.component').then((m) => m.MvpESaasPageComponent),
  'cloud-e-devops': () =>
    import('./landings/pages/cloud-e-devops/cloud-e-devops-page.component').then((m) => m.CloudEDevopsPageComponent),
  'modernizacao-de-sistemas': () =>
    import('./landings/pages/modernizacao-de-sistemas/modernizacao-de-sistemas-page.component').then((m) => m.ModernizacaoDeSistemasPageComponent),
};

/** Language-less service URLs redirect to the visitor's language. */
export const serviceRedirectRoutes: Routes = landings.map((landing) => ({
  path: `services/${landing.slug}`,
  redirectTo: toCurrentLanguage,
}));

/** Language-less /services index. */
export const servicesIndexRoute: Route = {
  path: 'services',
  component: ServicesLayoutComponent,
  children: [{ path: '', component: ServicesIndexComponent }],
};

/** Service pages, mounted under /:lang. One route per page so each one is prerendered. */
export const servicesRoute: Route = {
  path: 'services',
  component: ServicesLayoutComponent,
  children: [
    { path: '', component: ServicesIndexComponent },
    ...landings.map((landing) => ({
      path: landing.slug,
      data: { slug: landing.slug },
      loadComponent: pageLoaders[landing.slug],
    })),
  ],
};
