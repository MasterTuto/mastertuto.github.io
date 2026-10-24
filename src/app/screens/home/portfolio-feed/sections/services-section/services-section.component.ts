import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerDeviceDesktop, tablerGlobe, tablerPencil, tablerPlugConnected } from '@ng-icons/tabler-icons';
import { SectionComponent } from 'src/app/components/section/section.component';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslationInitializer } from 'src/app/service/translation.initializer';

@Component({
    selector: 'app-services-section',
    templateUrl: './services-section.component.html',
    imports: [
      SectionComponent,
      TranslatePipe,
      NgIconComponent,
      RouterLink
    ],
    providers: [
      provideIcons({
        tablerDeviceDesktop,
        tablerGlobe,
        tablerPencil,
        tablerPlugConnected,
      })
    ]
})
export class ServicesSectionComponent {
  private translationInitializer = inject(TranslationInitializer);

  get lang(): string | null {
    return this.translationInitializer.currentLang;
  }
}
