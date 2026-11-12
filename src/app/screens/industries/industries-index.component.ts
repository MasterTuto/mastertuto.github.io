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
  template: `
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 pt-4" lang="pt-BR">
      <section class="flex max-w-3xl flex-col gap-4">
        <h1 class="text-4xl font-semibold leading-tight text-foreground sm:text-6xl">Cada profissão tem uma rotina própria.</h1>
        <p class="max-w-[60ch] text-lg leading-relaxed text-foreground-light">
          Seu site também deveria ter. Escolha seu segmento e veja os problemas do dia a dia que um site com automação resolve.
        </p>
      </section>

      <section class="grid items-start gap-12 lg:grid-cols-[1.3fr_1fr]" aria-label="Segmentos">
        <p class="min-w-0 text-3xl font-semibold leading-snug sm:text-4xl sm:leading-snug">
          @for (item of industries; track item.slug; let last = $last) {
            <a
              [routerLink]="'para/' + item.slug | langLink"
              class="transition-colors hover:text-foreground-emphasis focus-visible:text-foreground-emphasis"
              [class]="selected().slug === item.slug ? 'text-foreground' : 'text-foreground/35'"
              (mouseenter)="select(item.slug)"
              (focus)="select(item.slug)"
            >{{ item.name }}</a>@if (!last) {<span aria-hidden="true" class="text-foreground/20">{{ ' / ' }}</span>}
          }
        </p>

        <aside class="flex min-w-0 flex-col gap-5 lg:sticky lg:top-32" aria-live="polite">
          <div class="relative isolate">
            <div aria-hidden="true" class="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(closest-side,rgba(122,112,225,0.14),transparent)]"></div>
            <img [src]="selected().images.hero.src" [alt]="selected().images.hero.alt" width="800" height="600" class="w-full rounded-3xl">
          </div>
          <div class="flex flex-col gap-2">
            <h2 class="text-2xl font-semibold text-foreground">{{ selected().title }}</h2>
            <p class="leading-relaxed text-foreground-light">{{ selected().intro }}</p>
          </div>
          <a
            [routerLink]="'para/' + selected().slug | langLink"
            class="flex w-fit items-center gap-1 font-semibold text-foreground-emphasis"
          >
            Ver a página de {{ selected().name }}
            <ng-icon name="tablerArrowRight" />
          </a>
        </aside>
      </section>
    </div>
  `,
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
