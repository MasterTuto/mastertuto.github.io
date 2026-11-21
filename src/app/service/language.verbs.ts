import { inject, Provider } from '@angular/core';

import { translations } from '../i18n/translations';
import { LANGUAGE_NAMES, LanguageSwitchService, SiteLanguage } from './language-switch.service';
import { VERBS, VerbRecord } from './verb';

export function provideLanguageVerb(): Provider {
  return {
    provide: VERBS,
    multi: true,
    useFactory: (): VerbRecord => {
      const languages = inject(LanguageSwitchService);

      return {
        changeLanguage: {
          id: 'changeLanguage',
          title: 'Change language',
          description: 'Português ⇄ English',
          queries: ['change language', 'switch language', 'language', 'english', 'português', 'idioma', 'mudar idioma', 'trocar idioma', 'inglês'],
          run: () => ({
            message: 'Choose a language.',
            actionSheet: {
              title: 'Choose a language',
              description: 'The current page will open in your selected language.',
              actions: (Object.keys(translations) as SiteLanguage[]).map((language) => ({
                id: language,
                label: LANGUAGE_NAMES[language],
                description: language.toUpperCase(),
                selected: languages.current === language,
                run: () => {
                  languages.switchTo(language);
                  return { message: 'Opening this page in ' + LANGUAGE_NAMES[language] + '.', close: true };
                },
              })),
            },
          }),
        },
      };
    },
  };
}
