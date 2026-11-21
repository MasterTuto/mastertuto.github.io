import { Directive, input } from '@angular/core';

export type BcsRevealEffect = 'rise' | 'fade' | 'scale';

/**
 * Entrance on scroll, driven by the element's own view timeline (CSS scroll-driven animations):
 * no JavaScript, no observers. Browsers without `animation-timeline` and visitors who prefer reduced
 * motion simply see the element in place.
 */
@Directive({
  selector: '[bcs-reveal]',
  host: { class: 'bcs-reveal', '[attr.data-reveal]': 'effect()' },
})
export class BcsRevealDirective {
  /** Bare `bcs-reveal` means `rise`. */
  readonly effect = input<BcsRevealEffect, BcsRevealEffect | ''>('rise', {
    alias: 'bcs-reveal',
    transform: (effect) => effect || 'rise',
  });
}
