import { inject } from '@angular/core';

import { games } from 'src/app/data/games.data';
import { PERSON_REF, usePageSeo } from 'src/app/seo/page-seo';
import { TranslateService } from 'src/app/service/translate.service';

/**
 * SEO of a game page: the title and description under `seo.<key>`, breadcrumbs and a free
 * browser game in schema.org terms, plus any extra nodes (FAQ, for example).
 */
export function useGameSeo(route: string, key: string, extra: () => Record<string, unknown>[] = () => []): void {
  const translate = inject(TranslateService);
  const t = (path: string) => translate.translate(path);
  const game = games.find((item) => item.route === route)!;
  usePageSeo(() => ({
    title: t(`seo.${key}.title`),
    description: t(`seo.${key}.description`),
    path: `/games/${route}`,
    breadcrumbs: [
      [t('home.nav.home'), '/'],
      [t('games.label'), '/games'],
      [t(game.nameKey), `/games/${route}`],
    ],
    jsonLd: [
      {
        '@type': ['VideoGame', 'WebApplication'],
        name: t(game.nameKey),
        description: t(`seo.${key}.description`),
        applicationCategory: 'GameApplication',
        gamePlatform: 'Web browser',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        numberOfPlayers: { '@type': 'QuantitativeValue', value: 1 },
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author: PERSON_REF,
      },
      ...extra(),
    ],
  }));
}
