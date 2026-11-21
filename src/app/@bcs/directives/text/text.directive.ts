import { Directive, input } from '@angular/core';

export type BcsTextVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'lead' | 'body' | 'small' | 'caption' | 'label';
export type BcsTextTone = 'default' | 'muted' | 'accent' | 'inherit';

/**
 * Typography as a role, decoupled from the tag: `<h2 bcs-text="h3">` keeps the outline right and the
 * visual size consistent. Headings use the display family, everything else the body family.
 */
@Directive({
  selector: '[bcs-text]',
  host: {
    class: 'bcs-text',
    '[attr.data-variant]': 'variant()',
    '[attr.data-tone]': 'tone()',
  },
})
export class BcsTextDirective {
  readonly variant = input<BcsTextVariant>('body', { alias: 'bcs-text' });
  readonly tone = input<BcsTextTone>('default');
}
