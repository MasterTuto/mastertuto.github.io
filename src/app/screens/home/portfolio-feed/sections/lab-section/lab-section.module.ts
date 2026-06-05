import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabSectionComponent } from './lab-section.component';
import { SectionModule } from 'src/app/components/section/section.module';
import { LabItemModule } from 'src/app/components/lab-item/lab-item.module';
import { NgIconsModule } from '@ng-icons/core';
import { tablerChevronLeft, tablerChevronRight } from '@ng-icons/tabler-icons';
import { LabOtherExperimentsComponent } from './lab-other-experiments/lab-other-experiments.component';


@NgModule({
  declarations: [
    LabSectionComponent,
    LabOtherExperimentsComponent
  ],
  imports: [
    CommonModule,
    SectionModule,
    LabItemModule,
    NgIconsModule.withIcons({
      tablerChevronLeft,
      tablerChevronRight
    })
  ],
  exports: [
    LabSectionComponent
  ]
})
export class LabSectionModule { }
