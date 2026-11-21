import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
  withNoIncrementalHydration,
} from '@angular/platform-browser';
import { TranslationInitializer } from './service/translation.initializer';
import { provideNavigationVerbs } from './service/navigation.verbs';
import { provideLanguageVerb } from './service/language.verbs';
import { provideContactVerbs } from './service/contact.verbs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay(), withNoIncrementalHydration()),
    provideNavigationVerbs(),
    provideLanguageVerb(),
    provideContactVerbs(),
    provideAppInitializer(() => {
      return inject(TranslationInitializer).init();
    }),
  ],
};
