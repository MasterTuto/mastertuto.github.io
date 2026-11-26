import { ChangeDetectionStrategy, Component } from '@angular/core';

import { agentesDeIaCopy } from '../../content/agentes-de-ia';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_ICONS, LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-agentes-de-ia-page',
  templateUrl: './agentes-de-ia-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  providers: [LANDING_PAGE_ICONS],
  host: { class: 'landing-page' },
})
export class AgentesDeIaPageComponent extends LandingPageBase {
  constructor() {
    super(agentesDeIaCopy);
  }
}
