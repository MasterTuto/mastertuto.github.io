import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A tiny drawing of each game's board for the games index, in the site palette.
 * Pure SVG, decorative (`aria-hidden`), 64×64 viewBox.
 */
@Component({
  selector: 'app-game-glyph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'block' },
  templateUrl: './game-glyph.component.html',
})
export class GameGlyphComponent {
  readonly route = input.required<string>();
  protected readonly nonogram = [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [1, 2], [3, 2], [0, 3], [1, 3]];
  protected readonly binary = [1, 0, 1, 0, 1, 0, 1, 1, 0];
}
