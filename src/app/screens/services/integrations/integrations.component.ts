import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerArrowDown,
  tablerArrowLeft,
  tablerArrowRight,
  tablerBrandWhatsapp,
  tablerChartBar,
  tablerCheck,
  tablerChevronDown,
  tablerCreditCard,
  tablerMail,
  tablerTable,
  tablerTerminal2,
  tablerUsers,
  tablerWebhook,
  tablerWorld,
} from '@ng-icons/tabler-icons';

import { ButtonComponent } from 'src/app/components/@my/button/button.component';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { OtherServicesComponent } from '../shared/other-services.component';
import { ServicePage } from '../shared/service-page';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgIconComponent,
    TranslatePipe,
    ButtonComponent,
    OtherServicesComponent,
  ],
  providers: [
    provideIcons({
      tablerArrowDown,
      tablerArrowLeft,
      tablerArrowRight,
      tablerBrandWhatsapp,
      tablerChartBar,
      tablerCheck,
      tablerChevronDown,
      tablerCreditCard,
      tablerMail,
      tablerTable,
      tablerTerminal2,
      tablerUsers,
      tablerWebhook,
      tablerWorld,
    }),
  ],
})
export class IntegrationsComponent extends ServicePage {
  /** Tools placed around the hub, in a 3x3 grid with the website in the centre cell. */
  tools = [
    { step: '1', icon: 'tablerBrandWhatsapp', position: 'col-start-1 row-start-1' },
    { step: '2', icon: 'tablerMail', position: 'col-start-3 row-start-1' },
    { step: '3', icon: 'tablerUsers', position: 'col-start-1 row-start-2' },
    { step: '4', icon: 'tablerCreditCard', position: 'col-start-3 row-start-2' },
    { step: '5', icon: 'tablerTable', position: 'col-start-1 row-start-3' },
    { step: '6', icon: 'tablerChartBar', position: 'col-start-3 row-start-3' },
  ];
  /** Line endpoints (in a 300x300 viewBox) matching the tool cells above. */
  hubLines = [
    [50, 50],
    [250, 50],
    [50, 150],
    [250, 150],
    [50, 250],
    [250, 250],
  ];
  flowSteps = ['1', '2', '3'];
  benefitSteps = ['1', '2', '3', '4'];
  processSteps = ['1', '2', '3', '4'];
  faqSteps = ['1', '2', '3'];
  details = [
    { step: '1', icons: ['tablerMail', 'tablerUsers'] },
    { step: '2', icons: ['tablerBrandWhatsapp'] },
    { step: '3', icons: ['tablerCreditCard', 'tablerChartBar'] },
  ];
}
