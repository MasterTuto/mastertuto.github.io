import { Injectable } from '@angular/core';
import { Translations } from '../i18n/english';

@Injectable({ providedIn: 'root' })
export class TranslationStore {
  dict: Translations = {} as Translations;
}
