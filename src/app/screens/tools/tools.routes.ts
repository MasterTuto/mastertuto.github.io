import { Route } from '@angular/router';

import { ToolsLayoutComponent } from 'src/app/layouts/tools-layout.component';
import { ToolsComponent } from './tools.component';

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
  ],
};
