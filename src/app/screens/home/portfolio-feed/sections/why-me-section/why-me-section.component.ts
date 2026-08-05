import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCircleCheck } from '@ng-icons/tabler-icons';
import { SectionComponent } from 'src/app/components/section/section.component';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

@Component({
    selector: 'app-why-me-section',
    templateUrl: './why-me-section.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      SectionComponent,
      TranslatePipe,
      NgIconComponent,
    ],
    providers: [
      provideIcons({tablerCircleCheck})
    ]
})
export class WhyMeSectionComponent {
}
