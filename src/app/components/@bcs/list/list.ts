import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BcsListMarker = 'check' | 'cross' | 'dash' | 'number';

/** Bulleted list with a semantic marker: what you get (check), what hurts (cross), plain (dash), order (number). */
@Component({
  selector: 'bcs-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bcs-list', '[attr.data-marker]': 'marker()' },
  template: `
    @if (marker() === 'number') {
      <ol class="bcs-list__items">
        @for (item of items(); track item) { <li>{{ item }}</li> }
      </ol>
    } @else {
      <ul class="bcs-list__items" role="list">
        @for (item of items(); track item) { <li>{{ item }}</li> }
      </ul>
    }
  `,
})
export class BcsList {
  readonly items = input.required<readonly string[]>();
  readonly marker = input<BcsListMarker>('check');
}
