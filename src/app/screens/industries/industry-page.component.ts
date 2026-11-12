import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerArrowDown,
  tablerArrowRight,
  tablerBrandWhatsapp,
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
import { createWhatsAppLink } from 'src/app/utils/html';

/** A segment page: the niche's routine, its problems and how a site with automation changes them. */
@Component({
  selector: 'app-industry-page',
  templateUrl: './industry-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, ButtonComponent, LangLinkPipe],
  providers: [
    provideIcons({
      tablerArrowDown,
      tablerArrowRight,
      tablerBrandWhatsapp,
      tablerCheck,
      tablerClockExclamation,
      tablerPlus,
      tablerSparkles,
      tablerX,
    }),
  ],
})
export class IndustryPageComponent {
  private title = inject(Title);
  private meta = inject(Meta);
  private slug = toSignal(inject(ActivatedRoute).data.pipe(map((data) => data['slug'] as string)));

  readonly industry = computed(() => industries.find((item) => item.slug === this.slug()));
  readonly others = computed(() => industries.filter((item) => item.slug !== this.slug()));
  readonly activeProblem = signal(0);
  readonly contact = computed(() =>
    createWhatsAppLink(`Olá, Breno! Quero conversar sobre um site e automação para ${this.industry()?.name ?? 'meu negócio'}.`),
  );

  constructor() {
    effect(() => {
      const page = this.industry();
      if (!page) return;
      const title = `Sites e automação para ${page.name} | BrenoCS`;
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: page.intro });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: page.intro });
      this.meta.updateTag({ property: 'og:url', content: `https://brenocs.dev.br/para/${page.slug}` });
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ name: 'twitter:description', content: page.intro });
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
