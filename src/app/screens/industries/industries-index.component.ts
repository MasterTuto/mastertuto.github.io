import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight } from '@ng-icons/tabler-icons';

import { industries } from 'src/app/data/industries.data';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { usePageSeo } from 'src/app/seo/page-seo';

/** /para: every segment as a large typographic link; the one pointed at or focused is previewed beside it. */
@Component({
  selector: 'app-industries-index',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, LangLinkPipe],
  providers: [provideIcons({ tablerArrowRight })],
  templateUrl: './industries-index.component.html',
})
export class IndustriesIndexComponent {
  readonly industries = industries;
  private readonly selectedSlug = signal(industries[0].slug);
  readonly selected = computed(() => industries.find((item) => item.slug === this.selectedSlug()) ?? industries[0]);

  constructor() {
    usePageSeo(() => ({
      title: 'Sites com automação para cada profissão',
      description:
        'Problemas do dia a dia de cada profissão e como um site com automação resolve: advocacia, saúde, serviços residenciais, fotografia, contabilidade e mais.',
      path: '/para',
      fixedLanguage: 'pt',
      breadcrumbs: [['Início', '/'], ['Segmentos', '/para']],
    }));
  }

  select(slug: string): void {
    this.selectedSlug.set(slug);
  }
}
