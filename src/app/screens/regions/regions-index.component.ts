import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight, tablerMapPin } from '@ng-icons/tabler-icons';

import { regions } from 'src/app/data/regions.data';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { usePageSeo } from 'src/app/seo/page-seo';

/** /regioes: the Baixada Santista from north to south as a coastline, then São Paulo. */
@Component({
  selector: 'app-regions-index',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, LangLinkPipe],
  providers: [provideIcons({ tablerArrowRight, tablerMapPin })],
  templateUrl: './regions-index.component.html',
})
export class RegionsIndexComponent {
  readonly overview = regions.find((item) => item.slug === 'baixada-santista')!;
  readonly coast = regions.filter((item) => item.group === 'baixada' && !item.isRegion);
  readonly capital = regions.filter((item) => item.group === 'sp');

  constructor() {
    usePageSeo(() => ({
      title: 'Criação de sites e automação por região: Baixada Santista e São Paulo',
      description:
        'Sites, SEO local, automação e agentes de IA para negócios de Santos, Guarujá, São Vicente, Praia Grande, Cubatão, Bertioga, Mongaguá, Itanhaém, Peruíbe, São Paulo e ABC.',
      path: '/regioes',
      fixedLanguage: 'pt',
      breadcrumbs: [['Início', '/'], ['Por região', '/regioes']],
    }));
  }
}
