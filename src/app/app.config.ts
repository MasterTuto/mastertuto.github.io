import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { TranslationInitializer } from './service/translation.initializer';
import { provideNavigationVerbs } from './service/navigation.verbs';
import { provideLanguageVerb } from './service/language.verbs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay()),
    provideNavigationVerbs(),
    provideLanguageVerb(),
    provideAppInitializer(() => {
      return inject(TranslationInitializer).init();
    }),
  ],
};
