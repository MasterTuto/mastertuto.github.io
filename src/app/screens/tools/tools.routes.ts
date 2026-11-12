import { Route } from '@angular/router';

import { ToolsLayoutComponent } from 'src/app/layouts/tools-layout.component';
import { ToolsComponent } from './tools.component';
import { invoiceTool, proTools } from './pro-tools/pro-tools.data';

const loadDevTool = () =>
  import('./dev-tools/dev-tool.component').then((m) => m.DevToolComponent);

export const toolsRoute: Route = {
  path: 'tools',
  component: ToolsLayoutComponent,
  children: [
    { path: '', component: ToolsComponent },
    { path: 'dev-tools', component: ToolsComponent },
    { path: 'dev-tools/json-beautifier', data: { tool: 'json' }, loadComponent: loadDevTool },
    { path: 'dev-tools/jwt-decoder', data: { tool: 'jwt' }, loadComponent: loadDevTool },
    {
      path: proTools[0].slug,
      loadComponent: () => import('./bitola/wire-gauge.component').then((m) => m.WireGaugeCalculatorComponent),
    },
    {
      path: proTools[1].slug,
      loadComponent: () => import('./btu/btu.component').then((m) => m.BtuCalculatorComponent),
    },
    {
      path: proTools[2].slug,
      loadComponent: () => import('./prazos/deadline.component').then((m) => m.DeadlineCalculatorComponent),
    },
    {
      path: proTools[3].slug,
      loadComponent: () => import('./simples/simples.component').then((m) => m.SimplesCalculatorComponent),
    },
    {
      path: proTools[4].slug,
      loadComponent: () =>
        import('./gestacional/gestational.component').then((m) => m.GestationalCalculatorComponent),
    },
    {
      path: invoiceTool.slug,
      loadComponent: () => import('./invoice/invoice.component').then((m) => m.InvoiceGeneratorComponent),
    },
  ],
};
