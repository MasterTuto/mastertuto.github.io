import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsSectionComponent } from './jobs-section.component';
import { SectionModule } from 'src/app/components/section/section.module';
import { JobItemModule } from 'src/app/components/job-item/job-item.module';
import { ControlledScrollModule } from 'src/app/directives/controlled-scroll.module';
import { BackgroundAnimationModule } from 'src/app/components/background-animation/background-animation.module';



@NgModule({
  declarations: [
    JobsSectionComponent
  ],
  imports: [
    CommonModule,
    SectionModule,
    JobItemModule,
    ControlledScrollModule,
    BackgroundAnimationModule
  ],
  exports: [
    JobsSectionComponent
  ]
})
export class JobsSectionModule { }
