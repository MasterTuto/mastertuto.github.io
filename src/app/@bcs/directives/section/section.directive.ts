import { Directive, input } from '@angular/core';

export type BcsSectionSpace = 'md' | 'lg' | 'xl';

/** Vertical rhythm between page sections. Sections never set their own margins. */
@Directive({
  selector: '[bcs-section]',
  host: { class: 'bcs-section', '[attr.data-space]': 'space()' },
})
export class BcsSectionDirective {
  readonly space = input<BcsSectionSpace>('lg');
}
