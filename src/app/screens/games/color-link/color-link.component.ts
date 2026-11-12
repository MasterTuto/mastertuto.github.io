import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { useGameSeo } from '../game-seo';

/** TODO(agent): implement the game. */
@Component({
  selector: 'app-color-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  template: `<div class="game-page"><header class="catalog-page-header"><h1>{{ 'colorLink.name' | translate }}</h1><p>{{ 'colorLink.description' | translate }}</p></header></div>`,
})
export class ColorLinkComponent {
  constructor() {
    useGameSeo('color-link', 'colorLink.seo');
  }
}
