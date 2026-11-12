import { Directive, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { services } from 'src/app/data/services.data';
import { PERSON_REF, usePageSeo } from 'src/app/seo/page-seo';
import { TranslateService } from 'src/app/service/translate.service';
import { TranslationInitializer } from 'src/app/service/translation.initializer';
import { createWhatsAppLink } from 'src/app/utils/html';

/** Common state shared by every service page: current language, the WhatsApp contact link and the page's SEO. */
@Directive()
export abstract class ServicePage {
  private translateService = inject(TranslateService);
  private translationInitializer = inject(TranslationInitializer);

  constructor() {
    const slug = inject(ActivatedRoute).snapshot.routeConfig?.path;
    const service = services.find((item) => item.slug === slug);
    if (!service) return;
    // `servicesPage.landingPages.name` → `landingPages`, the key of the page under `seo`.
    const key = service.nameKey.split('.')[1];
    const t = (path: string) => this.translateService.translate(path);
    usePageSeo(() => ({
      title: t(`seo.${key}.title`),
      description: t(`seo.${key}.description`),
      path: `/services/${service.slug}`,
      breadcrumbs: [
        [t('home.nav.home'), '/'],
        [t('home.nav.services'), '/services'],
        [t(service.nameKey), `/services/${service.slug}`],
      ],
      jsonLd: [
        {
          '@type': 'Service',
          name: t(service.nameKey),
          serviceType: t(service.nameKey),
          description: t(`seo.${key}.description`),
          provider: PERSON_REF,
          areaServed: 'Worldwide',
        },
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
