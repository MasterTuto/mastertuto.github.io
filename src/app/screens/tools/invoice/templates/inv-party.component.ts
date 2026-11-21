import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { PartyView } from '../invoice.view';

@Component({
  selector: 'inv-party',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ip' },
  templateUrl: './inv-party.component.html',
})
export class InvPartyComponent {
  readonly party = input.required<PartyView>();
  readonly label = input('');
  readonly placeholder = input('—');
}
