import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerDeviceDesktop,
  tablerGlobe,
  tablerPencil,
  tablerPlugConnected,
} from '@ng-icons/tabler-icons';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from 'src/app/components/@my/button/button.component';
import { services } from 'src/app/data/services.data';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslationInitializer } from 'src/app/service/translation.initializer';
import { createWhatsAppLink } from 'src/app/utils/html';
import { TranslateService } from 'src/app/service/translate.service';
import { usePageSeo } from 'src/app/seo/page-seo';

@Component({
  selector: 'app-services-index',
  templateUrl: './services-index.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgIconComponent,
    TranslatePipe,
    ButtonComponent,
  ],
  providers: [
    provideIcons({
      tablerArrowRight,
      tablerDeviceDesktop,
      tablerGlobe,
      tablerPencil,
      tablerPlugConnected,
    }),
  ],
})
export class ServicesIndexComponent {
  private translateService = inject(TranslateService);
  private translationInitializer = inject(TranslationInitializer);

  services = services;

  constructor() {
    const t = (path: string) => this.translateService.translate(path);
    usePageSeo(() => ({
      title: t('seo.services.title'),
      description: t('seo.services.description'),
      path: '/services',
      breadcrumbs: [
        [t('home.nav.home'), '/'],
        [t('home.nav.services'), '/services'],
      ],
    }));
  }

  get lang(): string | null {
    return this.translationInitializer.currentLang;
  }

  get whatsappLink(): string {
    return createWhatsAppLink(
      this.translateService.translate('servicesPage.common.whatsappMessage'),
    );
  }
}
