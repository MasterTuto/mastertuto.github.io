import { Routes } from '@angular/router';

import { regions } from 'src/app/data/regions.data';
import { RegionsLayoutComponent } from 'src/app/layouts/regions-layout.component';

/** Region pages (/regioes and /regioes/<slug>), mounted at the root and under /:lang. One route per region so each is prerendered. */
export const regionRoutes: Routes = [
  {
    path: 'regioes',
    component: RegionsLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./regions-index.component').then((m) => m.RegionsIndexComponent),
      },
      ...regions.map((region) => ({
        path: region.slug,
        data: { slug: region.slug },
        loadComponent: () => import('./region-page.component').then((m) => m.RegionPageComponent),
      })),
    ],
  },
];
