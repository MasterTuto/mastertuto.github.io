import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A testimonial or a line the visitor would say themselves. */
@Component({
  selector: 'bcs-quote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bcs-quote' },
  template: `
    <blockquote class="bcs-quote__text">{{ text() }}</blockquote>
    @if (author()) {
      <p class="bcs-quote__author">{{ author() }}</p>
    }
  `,
})
export class BcsQuote {
  readonly text = input.required<string>();
  readonly author = input<string>('');
}
