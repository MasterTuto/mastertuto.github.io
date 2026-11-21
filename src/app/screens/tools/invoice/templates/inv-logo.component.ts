import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input } from '@angular/core';

import type { DocView } from '../invoice.view';

@Component({
  selector: 'inv-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './inv-logo.component.html',
})
export class InvLogoComponent {
  readonly doc = input.required<DocView>();
  /** Without a logo, show the initials of the business in a brand-colored square. */
  readonly monogram = input(false);
  readonly initials = computed(() =>
    this.doc().emitter.name
      .split(/\s+/)
      .filter((word) => word.length > 2 || /^[A-Z]/.test(word))
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join(''),
  );
}
