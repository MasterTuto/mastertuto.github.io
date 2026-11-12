import { Routes } from '@angular/router';

import { industries } from 'src/app/data/industries.data';
import { IndustriesLayoutComponent } from 'src/app/layouts/industries-layout.component';

/** Segment pages (/para and /para/<slug>), mounted at the root and under /:lang. One route per segment so each is prerendered. */
export const industryRoutes: Routes = [
  {
    path: 'para',
    component: IndustriesLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./industries-index.component').then((m) => m.IndustriesIndexComponent),
      },
      ...industries.map((industry) => ({
        path: industry.slug,
        data: { slug: industry.slug },
        loadComponent: () => import('./industry-page.component').then((m) => m.IndustryPageComponent),
      })),
    ],
  },
];
