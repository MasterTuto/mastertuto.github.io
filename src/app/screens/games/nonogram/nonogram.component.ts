import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { useGameSeo } from '../game-seo';

/** TODO(agent): implement the game. */
@Component({
  selector: 'app-nonogram',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  template: `<div class="game-page"><header class="catalog-page-header"><h1>{{ 'nonogram.name' | translate }}</h1><p>{{ 'nonogram.description' | translate }}</p></header></div>`,
})
export class NonogramComponent {
  constructor() {
    useGameSeo('nonogram', 'nonogram.seo');
  }
}
