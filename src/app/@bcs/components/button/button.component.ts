import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

import { BcsRippleDirective } from '@bcs/directives/ripple/ripple.directive';
import { BcsColor, BcsSize } from '@bcs/types/bcs.types';

export type BcsButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';

/**
 * The only button. Works on `<button>` and `<a>` (keep links as links: navigation stays crawlable).
 *
 *   <a bcs-button href="#form">Request a quote</a>
 *   <button bcs-button variant="outline" color="secondary" size="sm">Clear</button>
 *
 * Hover/press use a state layer of the button's own ink, focus uses the global ring, and a ripple
 * answers every press within the Doherty threshold.
 */
@Component({
  selector: 'button[bcs-button], a[bcs-button]',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [BcsRippleDirective],
  host: {
    class: 'bcs-button',
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-color]': 'color()',
  },
})
export class BcsButtonComponent {
  readonly size = input<BcsSize>('md');
  readonly variant = input<BcsButtonVariant>('solid');
  readonly color = input<BcsColor>('primary');
}
