import { Directive, inject, InjectionToken, input } from '@angular/core';

import { BcsPad } from '@bcs/core';

/** How many surfaces wrap the current element (0 = the page). */
export const BCS_SURFACE_LEVEL = new InjectionToken<number>('BCS_SURFACE_LEVEL');

export type BcsSurfaceVariant = 'filled' | 'outline';

/**
 * A bounded region (card, panel, form box). It counts its surface ancestors, so nesting automatically
 * raises the elevation and tightens radius and padding — see `src/styles/_context.scss`.
 *
 *   <article bcs-surface pad="lg">…<div bcs-surface>…</div></article>
 */
@Directive({
  selector: '[bcs-surface]',
  providers: [
    {
      provide: BCS_SURFACE_LEVEL,
      useFactory: () => Math.min(3, (inject(BCS_SURFACE_LEVEL, { optional: true, skipSelf: true }) ?? 0) + 1),
    },
  ],
  host: {
    class: 'bcs-surface',
    '[attr.data-level]': 'level',
    '[attr.data-pad]': 'pad()',
    '[attr.data-variant]': 'variant()',
  },
})
export class BcsSurface {
  protected readonly level = inject(BCS_SURFACE_LEVEL, { self: true });

  readonly pad = input<BcsPad>('md');
  readonly variant = input<BcsSurfaceVariant>('filled');
}
