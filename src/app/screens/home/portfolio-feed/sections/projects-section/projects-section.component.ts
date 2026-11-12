import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight, tablerExternalLink } from '@ng-icons/tabler-icons';

import { ButtonComponent } from 'src/app/components/@my/button/button.component';
import { CaseMockupComponent } from 'src/app/components/case-mockup/case-mockup.component';
import { SectionComponent } from 'src/app/components/section/section.component';
import { projectCases } from 'src/app/data/cases.data';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

/** Home portfolio: one full-width section per case, each linking to its case page. */
@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SectionComponent,
    TranslatePipe,
    LangLinkPipe,
    RouterLink,
    NgIconComponent,
    ButtonComponent,
    CaseMockupComponent,
  ],
  providers: [provideIcons({ tablerArrowRight, tablerExternalLink })],
})
export class ProjectsSectionComponent {
  readonly projects = projectCases;
}
