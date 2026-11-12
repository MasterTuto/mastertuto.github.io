import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A tiny drawing of each game's board for the games index, in the site palette.
 * Pure SVG, decorative (`aria-hidden`), 64×64 viewBox.
 */
@Component({
  selector: 'app-game-glyph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'block' },
  template: `
    <svg viewBox="0 0 64 64" class="h-full w-full" fill="none" stroke-linecap="round" stroke-linejoin="round">
      @switch (route()) {
        @case ('sudoku') {
          <rect x="4" y="4" width="56" height="56" rx="6" fill="#fafafa" stroke="#444a51" stroke-width="2.5" />
          <path d="M22.7 4v56M41.3 4v56M4 22.7h56M4 41.3h56" stroke="#444a51" stroke-width="1.2" opacity=".35" />
          <text x="13.3" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="#151c25">5</text>
          <text x="32" y="36.6" text-anchor="middle" font-size="11" font-weight="700" fill="#7a70e1">3</text>
          <text x="50.7" y="55.3" text-anchor="middle" font-size="11" font-weight="700" fill="#151c25">8</text>
          <text x="50.7" y="18" text-anchor="middle" font-size="11" font-weight="700" fill="#7a70e1">1</text>
        }
        @case ('queens') {
          <rect x="4" y="4" width="28" height="28" fill="#c4b5fd" /><rect x="32" y="4" width="28" height="28" fill="#fdba74" />
          <rect x="4" y="32" width="28" height="28" fill="#86efac" /><rect x="32" y="32" width="28" height="28" fill="#93c5fd" />
          <rect x="4" y="4" width="56" height="56" rx="6" stroke="#151c25" stroke-width="2.5" />
          <path d="M40 22l3-8 4 5 4-5 3 8z" fill="#151c25" /><path d="M10 50l3-8 4 5 4-5 3 8z" fill="#151c25" />
        }
        @case ('word-ladder') {
          @for (row of [0, 1, 2]; track row) {
            @for (col of [0, 1, 2, 3]; track col) {
              <rect [attr.x]="6 + col * 13.5" [attr.y]="7 + row * 18" width="11" height="14" rx="2.5"
                [attr.fill]="row === 1 && col === 2 ? '#7a70e1' : '#fafafa'" stroke="#444a51" stroke-width="1.5" />
            }
          }
        }
        @case ('minesweeper') {
          <rect x="4" y="4" width="56" height="56" rx="6" fill="#e5e7eb" stroke="#444a51" stroke-width="2.5" />
          <rect x="6" y="6" width="34" height="34" rx="3" fill="#fafafa" />
          <text x="15" y="20" text-anchor="middle" font-size="10" font-weight="800" fill="#646cfa">1</text>
          <text x="31" y="36" text-anchor="middle" font-size="10" font-weight="800" fill="#16a34a">2</text>
          <path d="M48 50V38l8 3-8 3" stroke="#dc2626" stroke-width="2" fill="#dc2626" />
          <path d="M19 41v18M10 50h18M12.6 43.6l12.8 12.8M25.4 43.6L12.6 56.4" stroke="#151c25" stroke-width="2" />
          <circle cx="19" cy="50" r="5.5" fill="#151c25" /><circle cx="17.2" cy="48.2" r="1.4" fill="#fafafa" />
        }
        @case ('nonogram') {
          <path d="M18 18h42v42H18z" fill="#fafafa" stroke="#444a51" stroke-width="2" />
          @for (cell of nonogram; track $index) {
            <rect [attr.x]="18 + cell[0] * 10.5" [attr.y]="18 + cell[1] * 10.5" width="10.5" height="10.5" fill="#151c25" />
          }
          <path d="M6 23h6M6 34h3M6 44h6M6 55h3M23 6v6M34 6v3M44 6v6M55 6v3" stroke="#7a70e1" stroke-width="2.5" />
        }
        @case ('binary-puzzle') {
          @for (cell of binary; track $index) {
            <circle [attr.cx]="14 + ($index % 3) * 18" [attr.cy]="14 + ($index - ($index % 3)) / 3 * 18" r="7.5"
              [attr.fill]="cell ? '#7a70e1' : '#f59e0b'" />
          }
        }
        @case ('memory') {
          <rect x="6" y="10" width="24" height="34" rx="4" fill="#151c25" transform="rotate(-8 18 27)" />
          <path d="M14 22l4 8 4-8" stroke="#7a70e1" stroke-width="2" transform="rotate(-8 18 27)" />
          <rect x="30" y="18" width="24" height="34" rx="4" fill="#fafafa" stroke="#444a51" stroke-width="2" transform="rotate(8 42 35)" />
          <circle cx="42" cy="35" r="6" fill="#f59e0b" transform="rotate(8 42 35)" />
        }
        @case ('color-link') {
          <rect x="4" y="4" width="56" height="56" rx="6" fill="#fafafa" stroke="#444a51" stroke-width="2" />
          <path d="M14 14h36v14" stroke="#7a70e1" stroke-width="6" /><circle cx="14" cy="14" r="5" fill="#7a70e1" /><circle cx="50" cy="28" r="5" fill="#7a70e1" />
          <path d="M14 30v20h24" stroke="#f59e0b" stroke-width="6" /><circle cx="14" cy="30" r="5" fill="#f59e0b" /><circle cx="38" cy="50" r="5" fill="#f59e0b" />
        }
      }
    </svg>
  `,
})
export class GameGlyphComponent {
  readonly route = input.required<string>();
  protected readonly nonogram = [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [1, 2], [3, 2], [0, 3], [1, 3]];
  protected readonly binary = [1, 0, 1, 0, 1, 0, 1, 1, 0];
}
