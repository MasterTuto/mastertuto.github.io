import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import {
  tablerArrowRight,
  tablerDeviceMobile,
  tablerWorldSearch,
} from '@ng-icons/tabler-icons';
import { BcsButton } from '@bcs/button';
import { SectionComponent } from 'src/app/components/section/section.component';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import { createWhatsAppLink } from 'src/app/utils/html';

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  imports: [TranslatePipe, SectionComponent, NgIconComponent, BcsButton],
  changeDetection: ChangeDetectionStrategy.Eager,
  providers: [
    provideIcons({
      tablerArrowRight,
      tablerDeviceMobile,
      tablerWorldSearch,
    }),
  ],
})
export class HomeSectionComponent {
  private translateService = inject(TranslateService);

  get whatsappLink(): string {
    return createWhatsAppLink(
      this.translateService.translate('home.whatsappMessage'),
    );
  }
}
