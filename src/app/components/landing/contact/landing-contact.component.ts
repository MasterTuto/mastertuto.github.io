import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';

import { BcsTextDirective } from '@bcs/directives/text/text.directive';
import { BcsColor } from '@bcs/types/bcs.types';
import {
  LandingFormField,
  LandingFormMessages,
  LandingFormSubmit,
  LandingWhatsAppFormComponent,
} from '../whatsapp-form/landing-whatsapp-form.component';

/** Heading, one line of context and the WhatsApp form, side by side on wide screens. */
@Component({
  selector: 'app-landing-contact',
  templateUrl: './landing-contact.component.html',
  styleUrl: './landing-contact.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsTextDirective, LandingWhatsAppFormComponent],
  host: { class: 'landing-contact' },
})
export class LandingContactComponent {
  readonly heading = input.required<string>();
  readonly text = input.required<string>();
  readonly fields = input.required<readonly LandingFormField[]>();
  readonly phone = input.required<string>();
  readonly message = input.required<string>();
  readonly submitLabel = input.required<string>();
  readonly messages = input.required<LandingFormMessages>();
  readonly note = input<string>('');
  readonly color = input<BcsColor>('accent');

  readonly sent = output<LandingFormSubmit>();
}
