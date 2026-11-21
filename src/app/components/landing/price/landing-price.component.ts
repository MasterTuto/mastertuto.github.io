import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { BcsListComponent } from '@bcs/components/list/list.component';
import { BcsTextDirective } from '@bcs/directives/text/text.directive';

/**
 * Price anchor. Showing a starting price filters leads and builds trust; the details stay in the
 * conversation. Projected content goes under the list (usually the call to action).
 */
@Component({
  selector: 'app-landing-price',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsTextDirective, BcsListComponent],
  host: { class: 'landing-price' },
  templateUrl: './landing-price.component.html',
  styleUrl: './landing-price.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LandingPriceComponent {
  readonly label = input.required<string>();
  readonly amount = input.required<string>();
  readonly prefix = input<string>('');
  readonly period = input<string>('');
  readonly includes = input<readonly string[]>([]);
  readonly note = input<string>('');
}
