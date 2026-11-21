import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BcsText } from '@bcs/text';

/**
 * Problem-first hero: title and subtitle centered high on the screen, then deliberate empty space.
 * The emptiness is the message (no leads, no time, no visibility…); `note` puts one quiet detail at
 * the bottom of it that names the symptom. One action at most.
 *
 *   <bcs-hero title="…" subtitle="…" note="3 contatos de 1.240 visitas">
 *     <a bcs-button hero-action href="#form">Pedir orçamento</a>
 *   </bcs-hero>
 */
@Component({
  selector: 'bcs-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsText],
  host: { class: 'bcs-hero' },
  template: `
    <div class="bcs-hero__head">
      <h1 bcs-text="h1">{{ title() }}</h1>
      <p bcs-text="lead" tone="muted" class="bcs-hero__subtitle">{{ subtitle() }}</p>
      <div class="bcs-hero__actions"><ng-content select="[hero-action]" /></div>
    </div>
    <div class="bcs-hero__void">
      @if (note()) {
        <p bcs-text="small" tone="muted" class="bcs-hero__note">{{ note() }}</p>
      }
    </div>
  `,
})
export class BcsHero {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly note = input<string>('');
}
