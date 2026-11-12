import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerAddressBook,
  tablerArrowLeft,
  tablerArrowRight,
  tablerBrandWhatsapp,
  tablerBriefcase,
  tablerCheck,
  tablerClock,
  tablerHome,
  tablerKey,
  tablerMessageCircle,
  tablerPhoto,
  tablerShieldCheck,
  tablerUser,
  tablerX,
} from '@ng-icons/tabler-icons';

import { ButtonComponent } from 'src/app/components/@my/button/button.component';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { OtherServicesComponent } from '../shared/other-services.component';
import { ServicePage } from '../shared/service-page';

@Component({
  selector: 'app-websites-for-freelancers',
  templateUrl: './websites-for-freelancers.component.html',
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
      tablerAddressBook,
      tablerArrowLeft,
      tablerArrowRight,
      tablerBrandWhatsapp,
      tablerBriefcase,
      tablerCheck,
      tablerClock,
      tablerHome,
      tablerKey,
      tablerMessageCircle,
      tablerPhoto,
      tablerShieldCheck,
      tablerUser,
      tablerX,
    }),
  ],
})
export class WebsitesForFreelancersComponent extends ServicePage {
  compareSteps = ['1', '2', '3', '4'];
  detailSteps = ['1', '2', '3'];
  processSteps = ['1', '2', '3', '4'];
  faqSteps = ['1', '2', '3'];
  benefits = [
    { step: '1', icon: 'tablerShieldCheck' },
    { step: '2', icon: 'tablerClock' },
    { step: '3', icon: 'tablerBriefcase' },
    { step: '4', icon: 'tablerKey' },
  ];
  pageSteps = [
    { step: '1', icon: 'tablerHome' },
    { step: '2', icon: 'tablerBriefcase' },
    { step: '3', icon: 'tablerUser' },
    { step: '4', icon: 'tablerPhoto' },
    { step: '5', icon: 'tablerAddressBook' },
  ];
}
