import { inject, Pipe, PipeTransform } from '@angular/core';

import { TranslationInitializer } from 'src/app/service/translation.initializer';

/** Turns an app path (`games/sudoku`) into router commands under the current language (`['/', 'pt', 'games', 'sudoku']`). */
@Pipe({ name: 'langLink' })
export class LangLinkPipe implements PipeTransform {
  private translationInitializer = inject(TranslationInitializer);

  transform(path: string = ''): string[] {
    const lang = this.translationInitializer.currentLang ?? 'pt';
    return ['/', lang, ...path.split('/').filter(Boolean)];
  }
}
