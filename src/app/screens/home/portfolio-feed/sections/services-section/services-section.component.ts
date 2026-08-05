import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerDeviceDesktop, tablerGlobe, tablerPencil, tablerPlugConnected } from '@ng-icons/tabler-icons';
import { SectionComponent } from 'src/app/components/section/section.component';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

@Component({
    selector: 'app-services-section',
    templateUrl: './services-section.component.html',
    imports: [
      SectionComponent,
      TranslatePipe,
      NgIconComponent
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
}
