import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowDown, tablerArrowRight, tablerBrandWhatsapp, tablerMapPin, tablerSearch } from '@ng-icons/tabler-icons';
import { map } from 'rxjs';

import { BcsButtonComponent } from '@bcs/components/button/button.component';
import { LandingFaqComponent } from 'src/app/components/landing/faq/landing-faq.component';
import { industries } from 'src/app/data/industries.data';
import { regions } from 'src/app/data/regions.data';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { PERSON_REF, usePageSeo } from 'src/app/seo/page-seo';
import { createWhatsAppLink } from 'src/app/utils/html';

/** Service names in Portuguese (region pages are written in Portuguese whatever the URL language). */
const SERVICE_NAMES: Record<string, string> = {
  'landing-pages': 'Landing pages',
  'sites-para-autonomos': 'Sites para autônomos',
  'seo-e-geo': 'SEO e GEO',
  'blogs-e-portfolios': 'Blogs e portfólios',
  'lojas-virtuais': 'Lojas virtuais',
  'agentes-de-ia': 'Agentes de IA',
  'automacao-de-processos': 'Automação de processos',
  'integracoes': 'Integrações',
  'sistemas-sob-medida': 'Sistemas sob medida',
  'mvp-e-saas': 'MVP e SaaS',
  'cloud-e-devops': 'Cloud e DevOps',
  'modernizacao-de-sistemas': 'Modernização de sistemas',
};

/** A region page: how the place searches and buys, and where a site or automation pays off there. */
@Component({
  selector: 'app-region-page',
  templateUrl: './region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, BcsButtonComponent, LandingFaqComponent, LangLinkPipe],
  providers: [provideIcons({ tablerArrowDown, tablerArrowRight, tablerBrandWhatsapp, tablerMapPin, tablerSearch })],
})
export class RegionPageComponent {
  private slug = toSignal(inject(ActivatedRoute).data.pipe(map((data) => data['slug'] as string)));

  readonly region = computed(() => regions.find((item) => item.slug === this.slug()));
  readonly services = computed(() =>
    (this.region()?.services ?? []).map((service) => ({ ...service, name: SERVICE_NAMES[service.slug] ?? service.slug })),
  );
  readonly segments = computed(() =>
    (this.region()?.segments ?? []).map((slug) => industries.find((item) => item.slug === slug)).filter((item) => !!item),
  );
  readonly nearby = computed(() =>
    (this.region()?.nearby ?? []).map((slug) => regions.find((item) => item.slug === slug)).filter((item) => !!item),
  );
  readonly contact = computed(() =>
    createWhatsAppLink(`Olá, Breno! Tenho um negócio ${this.region()?.where ?? 'na sua região'} e quero conversar sobre um projeto.`),
  );

  constructor() {
    usePageSeo(() => {
      const page = this.region()!;
      const path = `/regioes/${page.slug}`;
      return {
        title: `Criação de sites e automação ${page.where}`,
        description: page.intro,
        path,
        // Region pages are written in Portuguese: every language prefix points to the same page.
        fixedLanguage: 'pt',
        breadcrumbs: [['Início', '/'], ['Por região', '/regioes'], [page.name, path]],
        jsonLd: [
          {
            '@type': 'Service',
            name: `Criação de sites e automação ${page.where}`,
            serviceType: 'Criação de sites, SEO local e automação',
            description: page.intro,
            provider: PERSON_REF,
            areaServed: page.isRegion
              ? page.places.map((name) => ({ '@type': 'City', name }))
              : { '@type': 'City', name: page.name, containedInPlace: { '@type': 'State', name: 'São Paulo' } },
          },
          {
            '@type': 'FAQPage',
            mainEntity: page.faq.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          },
        ],
      };
    });
  }
}
