import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerArrowDown,
  tablerAirConditioning,
  tablerArrowRight,
  tablerBabyCarriage,
  tablerBolt,
  tablerBrandWhatsapp,
  tablerGavel,
  tablerReportMoney,
  tablerCheck,
  tablerClockExclamation,
  tablerPlus,
  tablerSparkles,
  tablerX,
} from '@ng-icons/tabler-icons';
import { map } from 'rxjs';

import { ButtonComponent } from 'src/app/components/@my/button/button.component';
import { industries } from 'src/app/data/industries.data';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { PERSON_REF, usePageSeo } from 'src/app/seo/page-seo';
import { createWhatsAppLink } from 'src/app/utils/html';
import { proTools } from 'src/app/screens/tools/pro-tools/pro-tools.data';

/** A segment page: the niche's routine, its problems and how a site with automation changes them. */
@Component({
  selector: 'app-industry-page',
  templateUrl: './industry-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, ButtonComponent, LangLinkPipe],
  providers: [
    provideIcons({
      tablerArrowDown,
      tablerAirConditioning,
      tablerArrowRight,
      tablerBabyCarriage,
      tablerBolt,
      tablerBrandWhatsapp,
      tablerGavel,
      tablerReportMoney,
      tablerCheck,
      tablerClockExclamation,
      tablerPlus,
      tablerSparkles,
      tablerX,
    }),
  ],
})
export class IndustryPageComponent {
  private slug = toSignal(inject(ActivatedRoute).data.pipe(map((data) => data['slug'] as string)));

  readonly industry = computed(() => industries.find((item) => item.slug === this.slug()));
  readonly tool = computed(() => proTools.find((item) => item.segment === this.slug()));
  readonly others = computed(() => industries.filter((item) => item.slug !== this.slug()));
  readonly activeProblem = signal(0);
  readonly contact = computed(() =>
    createWhatsAppLink(`Olá, Breno! Quero conversar sobre um site e automação para ${this.industry()?.name ?? 'meu negócio'}.`),
  );

  constructor() {
    usePageSeo(() => {
      const page = this.industry()!;
      const path = `/para/${page.slug}`;
      return {
        title: `Site e automação para ${page.name}: menos tarefa manual, mais clientes`,
        description: page.intro,
        path,
        // Segment pages are written in Portuguese: every language prefix points to the same page.
        fixedLanguage: 'pt',
        breadcrumbs: [['Início', '/'], ['Segmentos', '/para'], [page.name, path]],
        jsonLd: [
          {
            '@type': 'Service',
            name: `Site e automação para ${page.name}`,
            serviceType: 'Criação de sites e automação',
            description: page.intro,
            audience: { '@type': 'Audience', audienceType: page.name },
            provider: PERSON_REF,
            areaServed: { '@type': 'Country', name: 'Brasil' },
          },
        ],
      };
    });
    // A new segment opens on its first problem.
    effect(() => {
      this.slug();
      this.activeProblem.set(0);
    });
  }

  /** Arrow keys, Home and End move between tabs, as in the WAI-ARIA tabs pattern. */
  onTabKey(event: KeyboardEvent, count: number): void {
    const moves: Record<string, number> = {
      ArrowRight: (this.activeProblem() + 1) % count,
      ArrowLeft: (this.activeProblem() - 1 + count) % count,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    this.activeProblem.set(moves[event.key]);
    (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="tab"]')[moves[event.key]]?.focus();
  }
}
