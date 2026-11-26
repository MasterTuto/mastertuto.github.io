import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight, tablerBrandWhatsapp, tablerCheck } from '@ng-icons/tabler-icons';
import { map } from 'rxjs';

import { BcsButtonComponent } from '@bcs/components/button/button.component';
import { LandingFaqComponent } from 'src/app/components/landing/faq/landing-faq.component';
import { industries } from 'src/app/data/industries.data';
import { regions } from 'src/app/data/regions.data';
import { ofPlace, regionOffers } from 'src/app/data/regions/region-offers';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { PERSON_REF, usePageSeo } from 'src/app/seo/page-seo';
import { createWhatsAppLink } from 'src/app/utils/html';

/**
 * A region page, written for the searches of someone looking for a programmer in that place
 * ("programador em Santos", "criação de sites em Santos", "quanto custa fazer um site em Santos"):
 * the term and the place lead the title, the headline, the section headings and the link anchors.
 */
@Component({
  selector: 'app-region-page',
  templateUrl: './region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, BcsButtonComponent, LandingFaqComponent, LangLinkPipe],
  providers: [provideIcons({ tablerArrowRight, tablerBrandWhatsapp, tablerCheck })],
})
export class RegionPageComponent {
  private slug = toSignal(inject(ActivatedRoute).data.pipe(map((data) => data['slug'] as string)));

  readonly offers = regionOffers;
  /** How a project goes, from the first message to the site live. */
  readonly steps = [
    { title: 'Você chama no WhatsApp', text: 'Conta o que faz, quem é o seu cliente e o que precisa. Uma conversa de 20 a 30 minutos resolve.' },
    { title: 'Proposta com preço e prazo', text: 'Você recebe por escrito o escopo, o valor fechado e a data de entrega.' },
    { title: 'Desenvolvimento', text: 'Eu escrevo, desenho e programo. Você acompanha e aprova pelo celular.' },
    { title: 'Site no ar', text: 'Publicado no seu domínio, com Google Meu Negócio e WhatsApp configurados.' },
  ];
  /** Who you would be hiring, in the hero card. */
  readonly facts = [
    'Programador full stack há mais de 5 anos (TypeScript, Angular, Node.js, AWS)',
    'Baseado em Santos, na Baixada Santista',
    'Sites, landing pages, lojas virtuais, sistemas e agentes de IA',
    'Código, domínio e contas no seu nome',
    'Conversa direta pelo WhatsApp, sem intermediários',
  ];
  readonly region = computed(() => regions.find((item) => item.slug === this.slug()));
  /** "de Santos", "da Praia Grande", "do Guarujá". */
  readonly of = computed(() => ofPlace(this.region()?.where ?? ''));
  readonly segments = computed(() =>
    (this.region()?.segments ?? []).map((slug) => industries.find((item) => item.slug === slug)).filter((item) => !!item),
  );
  readonly nearby = computed(() =>
    (this.region()?.nearby ?? []).map((slug) => regions.find((item) => item.slug === slug)).filter((item) => !!item),
  );
  readonly contact = computed(() =>
    createWhatsAppLink(`Olá, Breno! Procurei um programador ${this.region()?.where ?? 'na minha região'} e quero um orçamento.`),
  );
  /** Questions every region page answers (the searches it is written for), before the local ones. */
  readonly faq = computed(() => {
    const page = this.region();
    if (!page) return [];
    const where = page.where;
    return [
      {
        question: `Onde encontrar um programador ${where}?`,
        answer: `Sou o Breno Carvalho, programador full stack de Santos. Crio sites, landing pages, lojas virtuais, sistemas web e automações para empresas e profissionais ${this.of()}, com conversa direta pelo WhatsApp e reuniões por vídeo.`,
      },
      {
        question: `Quanto custa fazer um site ${where}?`,
        answer:
          'Um site para autônomo ou pequena empresa começa em R$ 1.500, uma landing page em R$ 1.900, uma loja virtual em R$ 4.500 e um sistema sob medida em R$ 12.000. O valor fechado sai depois de uma conversa curta sobre o que você precisa.',
      },
      {
        question: 'Qual a diferença entre web designer, desenvolvedor de sites e programador?',
        answer:
          'O web designer cuida principalmente do visual. O desenvolvedor de sites, ou programador, faz o site funcionar: velocidade, formulários, integração com WhatsApp e sistemas, SEO técnico. Eu faço o layout e o código, então você fala com uma pessoa só.',
      },
      ...page.faq,
    ];
  });

  constructor() {
    usePageSeo(() => {
      const page = this.region()!;
      const path = `/regioes/${page.slug}`;
      const description = `Programador e criador de sites ${page.where}: sites, landing pages, lojas virtuais, sistemas e automação, a partir de R$ 1.500. Fale direto com o desenvolvedor.`;
      return {
        title: `Programador ${page.where}: criação de sites, sistemas e automação`,
        description,
        path,
        // Region pages are written in Portuguese: every language prefix points to the same page.
        fixedLanguage: 'pt',
        breadcrumbs: [['Início', '/'], ['Por região', '/regioes'], [page.name, path]],
        jsonLd: [
          {
            '@type': 'Service',
            name: `Criação de sites ${page.where}`,
            serviceType: 'Criação de sites, desenvolvimento de sistemas e automação',
            description,
            provider: PERSON_REF,
            areaServed: page.isRegion
              ? page.places.map((name) => ({ '@type': 'City', name }))
              : { '@type': 'City', name: page.name, containedInPlace: { '@type': 'State', name: 'São Paulo' } },
            offers: regionOffers.map((offer) => ({
              '@type': 'Offer',
              name: offer.label,
              priceCurrency: 'BRL',
              description: `a partir de ${offer.amount}${offer.period ? ' ' + offer.period : ''}`,
            })),
          },
          {
            '@type': 'FAQPage',
            mainEntity: this.faq().map((item) => ({
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
