import { Landing } from './landing.model';

/**
 * The twelve service categories, in menu order: visibility first, then operations, then engineering.
 * Only identity lives here (this file ships with the menu); each page's words load with the page.
 */
export const landings: readonly Landing[] = [
  {
    slug: 'landing-pages',
    key: 'landingPages',
    icon: 'tablerDeviceDesktop',
    related: ['seo-e-geo', 'integracoes', 'sites-para-autonomos'],
  },
  {
    slug: 'sites-para-autonomos',
    key: 'websitesForFreelancers',
    icon: 'tablerGlobe',
    related: ['landing-pages', 'seo-e-geo', 'agentes-de-ia'],
  },
  {
    slug: 'seo-e-geo',
    key: 'seoGeo',
    icon: 'tablerSearch',
    related: ['landing-pages', 'blogs-e-portfolios', 'sites-para-autonomos'],
  },
  {
    slug: 'blogs-e-portfolios',
    key: 'blogsAndPortfolios',
    icon: 'tablerPencil',
    related: ['seo-e-geo', 'sites-para-autonomos', 'landing-pages'],
  },
  {
    slug: 'lojas-virtuais',
    key: 'ecommerce',
    icon: 'tablerShoppingBag',
    related: ['integracoes', 'seo-e-geo', 'agentes-de-ia'],
  },
  {
    slug: 'agentes-de-ia',
    key: 'aiAgents',
    icon: 'tablerMessageChatbot',
    related: ['automacao-de-processos', 'integracoes', 'sistemas-sob-medida'],
  },
  {
    slug: 'automacao-de-processos',
    key: 'automation',
    icon: 'tablerRobot',
    related: ['agentes-de-ia', 'integracoes', 'sistemas-sob-medida'],
  },
  {
    slug: 'integracoes',
    key: 'integrations',
    icon: 'tablerPlugConnected',
    related: ['automacao-de-processos', 'agentes-de-ia', 'lojas-virtuais'],
  },
  {
    slug: 'sistemas-sob-medida',
    key: 'customSoftware',
    icon: 'tablerLayoutDashboard',
    related: ['mvp-e-saas', 'modernizacao-de-sistemas', 'automacao-de-processos'],
  },
  {
    slug: 'mvp-e-saas',
    key: 'mvpSaas',
    icon: 'tablerRocket',
    related: ['sistemas-sob-medida', 'cloud-e-devops', 'agentes-de-ia'],
  },
  {
    slug: 'cloud-e-devops',
    key: 'cloudDevops',
    icon: 'tablerCloud',
    related: ['modernizacao-de-sistemas', 'mvp-e-saas', 'sistemas-sob-medida'],
  },
  {
    slug: 'modernizacao-de-sistemas',
    key: 'modernization',
    icon: 'tablerRefresh',
    related: ['cloud-e-devops', 'sistemas-sob-medida', 'integracoes'],
  },
];

export const landingBySlug = new Map(landings.map((landing) => [landing.slug, landing]));
