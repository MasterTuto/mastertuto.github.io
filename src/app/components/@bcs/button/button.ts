import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BcsColor, BcsSize } from '@bcs/core';
import { BcsRipple } from '@bcs/ripple';

export type BcsButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';

/**
 * The only button. Works on `<button>` and `<a>` (keep links as links: navigation stays crawlable).
 *
 *   <a bcs-button href="#form">Pedir orçamento</a>
 *   <button bcs-button variant="outline" color="secondary" size="sm">Limpar</button>
 *
 * Hover/press use a state layer of the button's own ink, focus uses the global ring, and a ripple
 * answers every press within the Doherty threshold.
 */
@Component({
  selector: 'button[bcs-button], a[bcs-button]',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [BcsRipple],
  host: {
    class: 'bcs-button',
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-color]': 'color()',
  },
})
export class BcsButton {
  readonly size = input<BcsSize>('md');
  readonly variant = input<BcsButtonVariant>('solid');
  readonly color = input<BcsColor>('primary');
}
