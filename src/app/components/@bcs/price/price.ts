import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BcsList } from '@bcs/list';
import { BcsText } from '@bcs/text';

/**
 * Price anchor. Showing a starting price filters leads and builds trust; the details stay in the
 * conversation. Projected content goes under the list (usually the call to action).
 */
@Component({
  selector: 'bcs-price',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsText, BcsList],
  host: { class: 'bcs-price' },
  template: `
    <p bcs-text="label" tone="muted">{{ label() }}</p>
    <p class="bcs-price__amount">
      @if (prefix()) {
        <span class="bcs-price__prefix">{{ prefix() }}</span>
      }
      <span class="bcs-price__value">{{ amount() }}</span>
      @if (period()) {
        <span class="bcs-price__period">{{ period() }}</span>
      }
    </p>
    @if (includes().length) {
      <bcs-list [items]="includes()" marker="check" />
    }
    @if (note()) {
      <p bcs-text="small" tone="muted">{{ note() }}</p>
    }
    <ng-content />
  `,
})
export class BcsPrice {
  readonly label = input.required<string>();
  readonly amount = input.required<string>();
  readonly prefix = input<string>('');
  readonly period = input<string>('');
  readonly includes = input<readonly string[]>([]);
  readonly note = input<string>('');
}
