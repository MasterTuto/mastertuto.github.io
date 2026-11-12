import { NavLink } from '../model/nav-item.model';
import { devTools } from '../screens/tools/dev-tools/dev-tools.data';
import { games } from './games.data';
import { services } from './services.data';

/** Header navigation, the same on every page. Items with `children` open a menu. */
export const siteNav: NavLink[] = [
  { label: 'home.nav.home', path: '', exact: true },
  { label: 'home.nav.projects', path: '', fragment: 'projects' },
  {
    label: 'home.nav.services',
    path: 'services',
    children: [
      { label: 'home.nav.allServices', path: 'services', exact: true },
      ...services.map((service) => ({ label: service.nameKey, path: `services/${service.slug}` })),
    ],
  },
  { label: 'home.nav.segments', path: 'para' },
  {
    label: 'home.nav.gamesAndTools',
    children: [
      {
        label: 'games.label',
        path: 'games',
        exact: true,
        children: games.map((game) => ({ label: game.nameKey, path: `games/${game.route}` })),
      },
      {
        label: 'tools.label',
        path: 'tools',
        exact: true,
        children: [
          { label: 'Dev Tools', literal: true, path: 'tools/dev-tools', exact: true },
          ...devTools.map((tool) => ({ label: tool.name, literal: true, path: `tools/dev-tools/${tool.slug}` })),
        ],
      },
    ],
  },
];
