import { ChangeDetectionStrategy, Component } from '@angular/core';

import { automacaoDeProcessosCopy } from '../../content/automacao-de-processos';
import { LandingPageBase } from '../../landing-page.base';
import { LANDING_PAGE_ICONS, LANDING_PAGE_IMPORTS } from '../../landing-page.imports';

@Component({
  selector: 'app-automacao-de-processos-page',
  templateUrl: './automacao-de-processos-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...LANDING_PAGE_IMPORTS],
  providers: [LANDING_PAGE_ICONS],
  host: { class: 'landing-page' },
})
export class AutomacaoDeProcessosPageComponent extends LandingPageBase {
  /** One recurring task per weekday (problems, same order). */
  protected readonly weekdays = this.pt ? ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'] : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  /** Nodes of the example flow drawn in the hero. */
  protected readonly flow = (
    this.pt
      ? ['Ler 3 planilhas', 'Montar relatório', 'Enviar por e-mail']
      : ['Read 3 spreadsheets', 'Build the report', 'Email it']
  ).map((label, index) => ({ label, icon: ['tablerFileSpreadsheet', 'tablerRobot', 'tablerChecks'][index] }));

  constructor() {
    super(automacaoDeProcessosCopy);
  }
}
