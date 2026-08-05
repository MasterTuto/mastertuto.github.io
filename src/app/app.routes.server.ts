import { RenderMode, ServerRoute } from "@angular/ssr";
import { translations } from "./i18n/translations";
import { Routes } from "@angular/router";
import { routes } from "./app.routes";
import { serviceLinks } from "./data/sections.data";

function flattenRoutes(
  routes: Routes,
  parent = ''
): string[] {
  const result: string[] = [];

  for (const route of routes) {
    const current =
      [parent, route.path]
        .filter(Boolean)
        .join('/');

    if (route.children?.length) {
      result.push(...flattenRoutes(route.children, current));
    }
    result.push(current);
  }

  return result;
}

const serviceSlugs = serviceLinks
  .map(link => link.href.split('/').pop())
  .filter((slug): slug is string => Boolean(slug));

function paramsFor(path: string): Record<string, string>[] {
  if (path.includes(':service')) {
    return serviceSlugs.map(service => ({ service }));
  }
  return Object.keys(translations).map(lang => ({ lang }));
}


export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Object.keys(translations)
        .map(lang => ({ lang }));
    }
  },
  ...flattenRoutes(routes).map(path => ({
    path,
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return paramsFor(path);
    }
  })),
];

