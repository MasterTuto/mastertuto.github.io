import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight } from '@ng-icons/tabler-icons';

import { regions } from 'src/app/data/regions.data';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { usePageSeo } from 'src/app/seo/page-seo';

/** /regioes: one link per city, anchored with the search term ("Programador em Santos"). */
@Component({
  selector: 'app-regions-index',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, LangLinkPipe],
  providers: [provideIcons({ tablerArrowRight })],
  templateUrl: './regions-index.component.html',
})
export class RegionsIndexComponent {
  /** The region overview first, then the cities from north to south. */
  readonly baixada = regions.filter((item) => item.group === 'baixada');
  readonly capital = regions.filter((item) => item.group === 'sp');

  constructor() {
    usePageSeo(() => ({
      title: 'Programador e criação de sites na Baixada Santista, São Paulo e ABC',
      description:
        'Programador e criação de sites em Santos, Guarujá, São Vicente, Praia Grande, Cubatão, Bertioga, Mongaguá, Itanhaém, Peruíbe, São Paulo e ABC: serviços, preços e bairros atendidos.',
      path: '/regioes',
      fixedLanguage: 'pt',
      breadcrumbs: [['Início', '/'], ['Por região', '/regioes']],
    }));
  }
}
