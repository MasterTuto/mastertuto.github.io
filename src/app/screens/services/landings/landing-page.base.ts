import { Directive, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LandingLinkItem } from 'src/app/components/landing/link-list/landing-link-list.component';
import { LandingFormSubmit } from 'src/app/components/landing/whatsapp-form/landing-whatsapp-form.component';
import { PERSON_REF, usePageSeo } from 'src/app/seo/page-seo';
import { PosthogService } from 'src/app/service/posthog.service';
import { TranslateService } from 'src/app/service/translate.service';
import { TranslationInitializer } from 'src/app/service/translation.initializer';
import { WHATSAPP_NUMBER } from 'src/app/utils/html';
import { landingCommon } from './content/common';
import { Landing, LandingContent, LandingCopy, LandingLanguage } from './landing.model';
import { landingBySlug } from './landings.registry';

/**
 * State shared by the twelve service pages: content in the current language, SEO, related
 * links and form tracking. Each page component only decides the layout.
 */
@Directive()
export abstract class LandingPageBase {
  private posthog = inject(PosthogService);
  private translator = inject(TranslateService);
  private t = (key: string) => this.translator.translate(key);

  protected readonly landing: Landing = landingBySlug.get(inject(ActivatedRoute).snapshot.data['slug'])!;
  protected readonly lang: LandingLanguage = inject(TranslationInitializer).currentLang === 'en' ? 'en' : 'pt';
  /** For the few illustrative words a layout draws (mockups), which are not page copy. */
  protected readonly pt = this.lang === 'pt';
  protected readonly copy: LandingCopy;
  protected readonly common = landingCommon[this.lang];
  protected readonly phone = WHATSAPP_NUMBER;
  protected readonly servicesPath = `/${this.lang}/services`;
  protected readonly name = this.t(`serviceCatalog.${this.landing.key}.name`);
  protected readonly related: readonly LandingLinkItem[] = this.landing.related.map((slug) => {
    const other = landingBySlug.get(slug)!;
    return {
      label: this.t(`serviceCatalog.${other.key}.name`),
      description: this.t(`serviceCatalog.${other.key}.short`),
      path: `${this.servicesPath}/${slug}`,
    };
  });

  constructor(content: LandingContent) {
    this.copy = content[this.lang];
    const { seo, faq, price } = this.copy;
    const t = (key: string) => this.t(key);
    usePageSeo(() => ({
      title: seo.title,
      description: seo.description,
      path: `/services/${this.landing.slug}`,
      breadcrumbs: [
        [t('home.nav.home'), '/'],
        [t('home.nav.services'), '/services'],
        [this.name, `/services/${this.landing.slug}`],
      ],
      jsonLd: [
        {
          '@type': 'Service',
          name: this.name,
          serviceType: this.name,
          description: seo.description,
          provider: PERSON_REF,
          areaServed: this.lang === 'pt' ? 'BR' : 'Worldwide',
          offers: {
            '@type': 'Offer',
            priceCurrency: this.lang === 'pt' ? 'BRL' : 'USD',
            description: `${price.prefix} ${price.amount}${price.period ? ' ' + price.period : ''}`,
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        },
      ],
    }));
  }

  protected track(submit: LandingFormSubmit): void {
    this.posthog.capture('service_form_sent', { service: this.landing.slug, fields: Object.keys(submit.values) });
  }
}
