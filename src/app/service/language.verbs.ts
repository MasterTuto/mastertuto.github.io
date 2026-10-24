import { DOCUMENT } from '@angular/common';
import { inject, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { translations } from '../i18n/translations';
import { TranslationInitializer } from './translation.initializer';
import { VERBS, VerbRecord } from './verb';

const languageNames: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  ja: '日本語',
  pt: 'Português',
  ru: 'Русский',
  es: 'Español',
};

export function provideLanguageVerb(): Provider {
  return {
    provide: VERBS,
    multi: true,
    useFactory: (): VerbRecord => {
      const router = inject(Router);
      const document = inject(DOCUMENT);
      const translationInitializer = inject(TranslationInitializer);

      return {
        changeLanguage: {
          id: 'changeLanguage',
          title: 'Change language',
          description: 'Choose the language for this page',
          queries: ['change language', 'switch language', 'language', 'idioma', 'mudar idioma', 'trocar idioma', 'langue', 'sprache'],
          run: () => ({
            message: 'Choose a language.',
            actionSheet: {
              title: 'Choose a language',
              description: 'The current page will open in your selected language.',
              actions: Object.keys(translations).map((language) => ({
                id: language,
                label: languageNames[language] ?? language,
                description: language.toUpperCase(),
                selected: translationInitializer.currentLang === language,
                run: () => {
                  const url = router.url;
                  const path = url.split(/[?#]/, 1)[0];
                  const suffix = url.slice(path.length);
                  const segments = path.split('/').filter(Boolean);
                  if (segments.length && segments[0] in translations) segments.shift();
                  const destination = '/' + [language, ...segments].join('/') + suffix;
                  document.defaultView?.location.assign(destination);
                  return { message: 'Opening this page in ' + (languageNames[language] ?? language) + '.', close: true };
                },
              })),
            },
          }),
        },
      };
    },
  };
}
