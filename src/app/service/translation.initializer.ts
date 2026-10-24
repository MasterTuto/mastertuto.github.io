import { inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { TranslationStore } from './translation.store';
import { TranslationLoader } from './translation-loader.service';
import { translations } from '../i18n/translations';

@Injectable({ providedIn: 'root' })
export class TranslationInitializer {
  private location = inject(Location);
  private translationLoader = inject(TranslationLoader);
  private translationStore = inject(TranslationStore);

  private _currentLang: string | null = null;

  async init() {
    return this.translationLoader
      .load(this.currentLang ?? 'en')
      .then((d) => (this.translationStore.dict = d));
  }

  get currentLang(): string | null {
    if (this._currentLang !== null) {
      return this._currentLang;
    }

    const possiblyLangName = this.location.path(false).split('/')[1];
    if (possiblyLangName && possiblyLangName in translations) {
      this._currentLang = possiblyLangName;
    }
    return this._currentLang ?? this.systemLang;
  }

  get systemLang(): string {
    if (!('navigator' in (globalThis['window'] ?? {}))) {
      return 'pt';
    }
    const lang = navigator.language.split('-')[0];
    return lang;
  }
}
