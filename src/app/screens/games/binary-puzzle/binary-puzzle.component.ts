import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { useGameSeo } from '../game-seo';

/** TODO(agent): implement the game. */
@Component({
  selector: 'app-binary-puzzle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  template: `<div class="game-page"><header class="catalog-page-header"><h1>{{ 'binaryPuzzle.name' | translate }}</h1><p>{{ 'binaryPuzzle.description' | translate }}</p></header></div>`,
})
export class BinaryPuzzleComponent {
  constructor() {
    useGameSeo('binary-puzzle', 'binaryPuzzle.seo');
  }
}
