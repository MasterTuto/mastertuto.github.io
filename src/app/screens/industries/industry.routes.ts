import { Routes } from '@angular/router';
import { industries } from '../../data/industries.data';
const loadComponent = () => import('./industry-page.component').then(m => m.IndustryPageComponent);
export const industryRoutes: Routes = [
 { path: 'para', loadComponent },
 ...industries.map(industry => ({ path: `para/${industry.slug}`, data: { industry }, loadComponent })),
];
