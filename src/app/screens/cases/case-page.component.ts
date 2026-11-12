import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerArrowLeft,
  tablerArrowRight,
  tablerBrandWhatsapp,
  tablerCode,
  tablerExternalLink,
  tablerPalette,
  tablerServer,
  tablerTerminal2,
  tablerTool,
} from '@ng-icons/tabler-icons';
import { map } from 'rxjs';

import { ButtonComponent } from 'src/app/components/@my/button/button.component';
import { CaseMockupComponent } from 'src/app/components/case-mockup/case-mockup.component';
import { CaseRole, projectCases } from 'src/app/data/cases.data';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import { createWhatsAppLink } from 'src/app/utils/html';

/** Full case study of a project; the case is chosen by the route's `slug` data. */
@Component({
  selector: 'app-case-page',
  templateUrl: './case-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, TranslatePipe, LangLinkPipe, ButtonComponent, CaseMockupComponent],
  providers: [
    provideIcons({
      tablerArrowLeft,
      tablerArrowRight,
      tablerBrandWhatsapp,
      tablerCode,
      tablerExternalLink,
      tablerPalette,
      tablerServer,
      tablerTerminal2,
      tablerTool,
    }),
  ],
})
export class CasePageComponent {
  private translateService = inject(TranslateService);
  private title = inject(Title);
  private meta = inject(Meta);

  private slug = toSignal(inject(ActivatedRoute).data.pipe(map((data) => data['slug'] as string)));

  readonly project = computed(() => projectCases.find((item) => item.slug === this.slug()));
  readonly others = computed(() => projectCases.filter((item) => item.slug !== this.slug()));

  readonly roleIcons: Record<CaseRole, string> = {
    design: 'tablerPalette',
    implementation: 'tablerCode',
    hosting: 'tablerServer',
    maintenance: 'tablerTool',
  };

  get whatsappLink(): string {
    return createWhatsAppLink(this.translateService.translate('home.whatsappMessage'));
  }

  constructor() {
    effect(() => {
      const project = this.project();
      if (!project) return;
      const title = `${project.name} — ${this.translateService.translate(`cases.items.${project.key}.tagline`)}`;
      const description = this.translateService.translate(`cases.items.${project.key}.summary`);
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ property: 'og:image', content: `https://brenocs.dev.br/${project.desktop}` });
    });
  }
}
