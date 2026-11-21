import { Directive, inject, input } from '@angular/core';

import { BcsColor, BcsSize } from '@bcs/core';
import { BCS_FIELD } from '@bcs/field';

export type BcsInputVariant = 'outline' | 'filled';

/**
 * The only text control: `<input>`, `<textarea>` and `<select>` share size, variant and color.
 * `color` only tints the focus state; the resting look comes from the surface it sits on.
 */
@Directive({
  selector: 'input[bcs-input], textarea[bcs-input], select[bcs-input]',
  host: {
    class: 'bcs-input',
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-color]': 'color()',
    '[attr.id]': 'field?.id ?? null',
    '[attr.aria-describedby]': 'field?.describedBy() ?? null',
    '[attr.aria-invalid]': 'field?.invalid() ? "true" : null',
    '[attr.required]': 'field?.required() ? "" : null',
  },
})
export class BcsInput {
  protected readonly field = inject(BCS_FIELD, { optional: true });

  readonly size = input<BcsSize>('md');
  readonly variant = input<BcsInputVariant>('outline');
  readonly color = input<BcsColor>('accent');
}
