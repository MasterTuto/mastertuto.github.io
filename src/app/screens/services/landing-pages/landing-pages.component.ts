import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerArrowDown,
  tablerArrowLeft,
  tablerBolt,
  tablerBrandWhatsapp,
  tablerPlus,
  tablerTarget,
  tablerWriting,
} from '@ng-icons/tabler-icons';

import { ButtonComponent } from 'src/app/components/@my/button/button.component';
import { projectCases } from 'src/app/data/cases.data';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import { createWhatsAppLink } from 'src/app/utils/html';
import { OtherServicesComponent } from '../shared/other-services.component';
import { ServicePage } from '../shared/service-page';

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgIconComponent,
    TranslatePipe,
    LangLinkPipe,
    ButtonComponent,
    OtherServicesComponent,
  ],
  providers: [
    provideIcons({
      tablerArrowDown,
      tablerArrowLeft,
      tablerBolt,
      tablerBrandWhatsapp,
      tablerPlus,
      tablerTarget,
      tablerWriting,
    }),
  ],
})
/** The landing page service, laid out as the anatomy it describes: title, social proof, offer, form and one repeated call to action. */
export class LandingPagesComponent extends ServicePage {
  private translate = inject(TranslateService);

  readonly cases = projectCases;
  readonly name = signal('');
  readonly offer = signal('');
  benefitSteps = ['1', '2', '3', '4'];
  anatomySteps = ['1', '2', '3', '4', '5'];
  processSteps = ['1', '2', '3', '4'];
  faqSteps = ['1', '2', '3'];
  details = [
    { step: '1', icon: 'tablerTarget' },
    { step: '2', icon: 'tablerWriting' },
    { step: '3', icon: 'tablerBolt' },
  ];

  /** The form has no backend: it opens WhatsApp with the answers already written. */
  requestQuote(event: Event): void {
    event.preventDefault();
    const t = (key: string) => this.translate.translate(`servicesPage.landingPages.${key}`);
    const message = `${t('messageIntro')}\n${t('messageName')}: ${this.name().trim()}\n${t('messageOffer')}: ${this.offer().trim()}`;
    window.open(createWhatsAppLink(message), '_blank', 'noopener');
  }
}
