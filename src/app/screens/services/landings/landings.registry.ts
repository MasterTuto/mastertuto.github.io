import { Landing } from './landing.model';

/**
 * The twelve service categories, in menu order: visibility first, then operations, then engineering.
 * Only identity and theme live here (this file ships with the menu); each page's words load with the page.
 */
export const landings: readonly Landing[] = [
  {
    slug: 'landing-pages',
    key: 'landingPages',
    icon: 'tablerDeviceDesktop',
    theme: 'landing-pages',
    fonts: 'family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600',
    related: ['seo-e-geo', 'integracoes', 'sites-para-autonomos'],
  },
  {
    slug: 'sites-para-autonomos',
    key: 'websitesForFreelancers',
    icon: 'tablerGlobe',
    theme: 'sites-para-autonomos',
    fonts: 'family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Figtree:wght@400;500;600',
    related: ['landing-pages', 'seo-e-geo', 'agentes-de-ia'],
  },
  {
    slug: 'seo-e-geo',
    key: 'seoGeo',
    icon: 'tablerSearch',
    theme: 'seo-e-geo',
    fonts: 'family=Gloock&family=Public+Sans:wght@400;500;600',
    related: ['landing-pages', 'blogs-e-portfolios', 'sites-para-autonomos'],
  },
  {
    slug: 'blogs-e-portfolios',
    key: 'blogsAndPortfolios',
    icon: 'tablerPencil',
    theme: 'blogs-e-portfolios',
    fonts: 'family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600',
    related: ['seo-e-geo', 'sites-para-autonomos', 'landing-pages'],
  },
  {
    slug: 'lojas-virtuais',
    key: 'ecommerce',
    icon: 'tablerShoppingBag',
    theme: 'lojas-virtuais',
    fonts: 'family=Young+Serif&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700',
    related: ['integracoes', 'seo-e-geo', 'agentes-de-ia'],
  },
  {
    slug: 'agentes-de-ia',
    key: 'aiAgents',
    icon: 'tablerMessageChatbot',
    theme: 'agentes-de-ia',
    fonts: 'family=Syne:wght@600;700&family=Inter+Tight:wght@400;500;600',
    related: ['automacao-de-processos', 'integracoes', 'sistemas-sob-medida'],
  },
  {
    slug: 'automacao-de-processos',
    key: 'automation',
    icon: 'tablerRobot',
    theme: 'automacao-de-processos',
    fonts: 'family=Archivo:wght@400;500;800&family=JetBrains+Mono:wght@500',
    related: ['agentes-de-ia', 'integracoes', 'sistemas-sob-medida'],
  },
  {
    slug: 'integracoes',
    key: 'integrations',
    icon: 'tablerPlugConnected',
    theme: 'integracoes',
    fonts: 'family=Space+Grotesk:wght@500;700&family=IBM+Plex+Sans:wght@400;500;600',
    related: ['automacao-de-processos', 'agentes-de-ia', 'lojas-virtuais'],
  },
  {
    slug: 'sistemas-sob-medida',
    key: 'customSoftware',
    icon: 'tablerLayoutDashboard',
    theme: 'sistemas-sob-medida',
    fonts: 'family=Schibsted+Grotesk:wght@400;500;700;800',
    related: ['mvp-e-saas', 'modernizacao-de-sistemas', 'automacao-de-processos'],
  },
  {
    slug: 'mvp-e-saas',
    key: 'mvpSaas',
    icon: 'tablerRocket',
    theme: 'mvp-e-saas',
    fonts: 'family=Unbounded:wght@500;700&family=Manrope:wght@400;500;700',
    related: ['sistemas-sob-medida', 'cloud-e-devops', 'agentes-de-ia'],
  },
  {
    slug: 'cloud-e-devops',
    key: 'cloudDevops',
    icon: 'tablerCloud',
    theme: 'cloud-e-devops',
    fonts: 'family=IBM+Plex+Mono:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600',
    related: ['modernizacao-de-sistemas', 'mvp-e-saas', 'sistemas-sob-medida'],
  },
  {
    slug: 'modernizacao-de-sistemas',
    key: 'modernization',
    icon: 'tablerRefresh',
    theme: 'modernizacao-de-sistemas',
    fonts: 'family=Libre+Caslon+Display&family=Libre+Franklin:wght@400;500;600',
    related: ['cloud-e-devops', 'sistemas-sob-medida', 'integracoes'],
  },
];

export const landingBySlug = new Map(landings.map((landing) => [landing.slug, landing]));
