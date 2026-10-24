import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerBrandGithub,
  tablerBrandWhatsapp,
  tablerClipboardCheck,
  tablerCode,
  tablerDownload,
  tablerLifebuoy,
  tablerMail,
  tablerMessageCircle,
  tablerRoute,
} from '@ng-icons/tabler-icons';

import { sections, serviceLinks } from 'src/app/data/sections.data';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslationInitializer } from 'src/app/service/translation.initializer';
import { createWhatsAppLink } from 'src/app/utils/html';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  providers: [
    provideIcons({
      tablerBrandGithub,
      tablerBrandWhatsapp,
      tablerClipboardCheck,
      tablerCode,
      tablerDownload,
      tablerLifebuoy,
      tablerMail,
      tablerMessageCircle,
      tablerRoute,
    }),
  ],
  imports: [NgIconComponent, RouterLink, TranslatePipe],
})
export class FooterComponent {
  private translationInitializer = inject(TranslationInitializer);

  currentYear = new Date().getFullYear();
  navItems = sections;
  serviceItems = serviceLinks;
  whatsappLink = createWhatsAppLink();

  get lang(): string | null {
    return this.translationInitializer.currentLang;
  }

  featureCards = [
    {
      icon: 'tablerMessageCircle',
      titleKey: 'home.footer.cards.closeService.title',
      subtitleKey: 'home.footer.cards.closeService.subtitle',
    },
    {
      icon: 'tablerRoute',
      titleKey: 'home.footer.cards.transparentProcess.title',
      subtitleKey: 'home.footer.cards.transparentProcess.subtitle',
    },
    {
      icon: 'tablerLifebuoy',
      titleKey: 'home.footer.cards.properSupport.title',
      subtitleKey: 'home.footer.cards.properSupport.subtitle',
    },
  ];
}
