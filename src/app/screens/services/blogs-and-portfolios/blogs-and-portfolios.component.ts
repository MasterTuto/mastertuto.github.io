import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerArrowLeft,
  tablerArrowRight,
  tablerFileText,
  tablerPencil,
  tablerPhoto,
} from '@ng-icons/tabler-icons';

import { ButtonComponent } from 'src/app/components/@my/button/button.component';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { OtherServicesComponent } from '../shared/other-services.component';
import { ServicePage } from '../shared/service-page';

@Component({
  selector: 'app-blogs-and-portfolios',
  templateUrl: './blogs-and-portfolios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgIconComponent,
    TranslatePipe,
    ButtonComponent,
    OtherServicesComponent,
  ],
  providers: [
    provideIcons({
      tablerArrowLeft,
      tablerArrowRight,
      tablerFileText,
      tablerPencil,
      tablerPhoto,
    }),
  ],
})
export class BlogsAndPortfoliosComponent extends ServicePage {
  formats = [
    { key: 'portfolio', icon: 'tablerPhoto' },
    { key: 'blog', icon: 'tablerFileText' },
  ] as const;
  formatItems = ['1', '2', '3'];
  benefitSteps = ['1', '2', '3', '4'];
  processSteps = ['1', '2', '3', '4'];
  faqSteps = ['1', '2', '3'];
  details = [
    { step: '1', icon: 'tablerPhoto', cover: 'bg-secondary-surface text-secondary-surface-foreground' },
    { step: '2', icon: 'tablerFileText', cover: 'bg-surface-decoration text-surface-decoration-foreground' },
    { step: '3', icon: 'tablerPencil', cover: 'bg-foreground-emphasis/20 text-foreground-emphasis' },
  ];
}
