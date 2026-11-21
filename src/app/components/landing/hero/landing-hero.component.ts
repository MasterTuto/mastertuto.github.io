import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { BcsTextDirective } from '@bcs/directives/text/text.directive';

/**
 * Problem-first hero: title and subtitle centered high on the screen, then deliberate empty space.
 * The emptiness is the message (no leads, no time, no visibility…); `note` puts one quiet detail at
 * the bottom of it that names the symptom. One action at most.
 *
 *   <app-landing-hero title="…" subtitle="…" note="3 contatos de 1.240 visitas">
 *     <a bcs-button hero-action href="#form">Pedir orçamento</a>
 *   </app-landing-hero>
 */
@Component({
  selector: 'app-landing-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsTextDirective],
  host: { class: 'landing-hero' },
  templateUrl: './landing-hero.component.html',
  styleUrl: './landing-hero.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LandingHeroComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly note = input<string>('');
}
