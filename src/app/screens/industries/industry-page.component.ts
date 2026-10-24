import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { industries, Industry } from '../../data/industries.data';
import { EditorialHeroComponent, PromptImageComponent, TextSectionComponent, DetailListComponent, MediaGridComponent } from '../../components/editorial/editorial.components';
import { createWhatsAppLink } from '../../utils/html';

@Component({
 selector: 'app-industry-page',
 imports: [RouterLink, EditorialHeroComponent, PromptImageComponent, TextSectionComponent, DetailListComponent, MediaGridComponent],
 templateUrl: './industry-page.component.html',
 styleUrl: './industry-page.component.scss',
 changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndustryPageComponent {
 private readonly route = inject(ActivatedRoute);
 private readonly data = toSignal(this.route.data, { initialValue: this.route.snapshot.data });
 readonly industry = computed(() => this.data()['industry'] as Industry | undefined);
 readonly industries = industries;
 readonly contact = computed(() => createWhatsAppLink(`Olá, Breno! Quero conversar sobre um site e automação para ${this.industry()?.name ?? 'meu negócio'}.`));
 private readonly title = inject(Title);
 private readonly meta = inject(Meta);
 constructor() {
  effect(() => {
   const page = this.industry();
   const title = page ? `Sites e automação para ${page.name} | BrenoCS` : 'Sites e automação por profissão | BrenoCS';
   const description = page?.intro ?? 'Explore soluções de presença online e automação para 12 profissões, com necessidades e jornadas próprias.';
   this.title.setTitle(title);
   this.meta.updateTag({ name: 'description', content: description });
   this.meta.updateTag({ property: 'og:title', content: title });
   this.meta.updateTag({ property: 'og:description', content: description });
   this.meta.updateTag({ property: 'og:url', content: `https://brenocs.dev.br/para${page ? '/' + page.slug : ''}` });
   this.meta.updateTag({ name: 'twitter:title', content: title });
   this.meta.updateTag({ name: 'twitter:description', content: description });
  });
 }
}
