import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { translations } from '../i18n/translations';
import { TranslationInitializer } from './translation.initializer';

export type SiteLanguage = 'pt' | 'en';

/** Native name of each site language. */
export const LANGUAGE_NAMES: Record<SiteLanguage, string> = { pt: 'Português', en: 'English' };

/** Opens the current page in another language (a full load, so prerendered SEO tags match). */
@Injectable({ providedIn: 'root' })
export class LanguageSwitchService {
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private initializer = inject(TranslationInitializer);

  get current(): SiteLanguage {
    return this.initializer.currentLang === 'en' ? 'en' : 'pt';
  }

  switchTo(language: SiteLanguage): void {
    if (language === this.current) return;
    const url = this.router.url;
    const path = url.split(/[?#]/, 1)[0];
    const suffix = url.slice(path.length);
    const segments = path.split('/').filter(Boolean);
    if (segments.length && segments[0] in translations) segments.shift();
    this.document.defaultView?.location.assign('/' + [language, ...segments].join('/') + suffix);
  }
}
