import { Directive, inject } from '@angular/core';

import { TranslateService } from 'src/app/service/translate.service';
import { TranslationInitializer } from 'src/app/service/translation.initializer';
import { createWhatsAppLink } from 'src/app/utils/html';

/** Common state shared by every service page: current language and the WhatsApp contact link. */
@Directive()
export abstract class ServicePage {
  private translateService = inject(TranslateService);
  private translationInitializer = inject(TranslationInitializer);

  get lang(): string | null {
    return this.translationInitializer.currentLang;
  }

  get whatsappLink(): string {
    return createWhatsAppLink(
      this.translateService.translate('servicesPage.common.whatsappMessage'),
    );
  }
}
