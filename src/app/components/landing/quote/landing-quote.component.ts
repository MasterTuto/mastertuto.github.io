import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

/** A testimonial or a line the visitor would say themselves. */
@Component({
  selector: 'app-landing-quote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'landing-quote' },
  templateUrl: './landing-quote.component.html',
  styleUrl: './landing-quote.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LandingQuoteComponent {
  readonly text = input.required<string>();
  readonly author = input<string>('');
}
