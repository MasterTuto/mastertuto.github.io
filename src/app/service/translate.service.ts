import { inject, Injectable } from '@angular/core';
import type { TranslationKeyChecker } from '../i18n/english';
import { DeepRecord } from '../utils/type-utils';
import { TranslationStore } from './translation.store';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private translationStore = inject(TranslationStore);

  translate<TranslationPath extends string>(
    key: TranslationKeyChecker<TranslationPath>,
    params?: any,
  ): string {
    const path = key.split('.');

    let result: DeepRecord | string = this.translationStore.dict;
    while (path.length > 0) {
      const part = path.shift()!;

      if (typeof result == 'string' || !result) break;

      result = result[part];
    }

    if (typeof result === 'string') {
      return result;
    }

    return key;
  }
}
