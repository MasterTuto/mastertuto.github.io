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
      path: proTools[5].slug,
      loadComponent: () => import('./tijolos/bricks.component').then((m) => m.BricksCalculatorComponent),
    },
    {
      path: proTools[6].slug,
      loadComponent: () => import('./concreto/concrete.component').then((m) => m.ConcreteCalculatorComponent),
    },
    {
      path: proTools[7].slug,
      loadComponent: () => import('./piso/tiles.component').then((m) => m.TilesCalculatorComponent),
    },
    {
      path: proTools[8].slug,
      loadComponent: () => import('./escada/stairs.component').then((m) => m.StairsCalculatorComponent),
    },
    {
      path: proTools[9].slug,
      loadComponent: () => import('./salario/net-salary.component').then((m) => m.NetSalaryCalculatorComponent),
    },
    {
      path: proTools[10].slug,
      loadComponent: () =>
        import('./custo-funcionario/employee-cost.component').then((m) => m.EmployeeCostCalculatorComponent),
    },
    {
      path: proTools[11].slug,
      loadComponent: () => import('./rescisao/severance.component').then((m) => m.SeveranceCalculatorComponent),
    },
    {
      path: proTools[12].slug,
      loadComponent: () => import('./honorarios/fees.component').then((m) => m.FeesCalculatorComponent),
    },
    {
      path: proTools[13].slug,
      loadComponent: () => import('./solar/solar.component').then((m) => m.SolarCalculatorComponent),
    },
    {
      path: proTools[14].slug,
      loadComponent: () => import('./luminotecnico/lighting.component').then((m) => m.LightingCalculatorComponent),
    },
    {
      path: invoiceTool.slug,
      loadComponent: () => import('./invoice/invoice.component').then((m) => m.InvoiceGeneratorComponent),
    },
  ],
};
