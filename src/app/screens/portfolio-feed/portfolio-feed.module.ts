import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioFeedComponent } from './portfolio-feed.component';
import { HomeSectionModule } from './sections/home-section/home-section.module';
import { JobsSectionModule } from './sections/jobs-section/jobs-section.module';
import { LabSectionModule } from './sections/lab-section/lab-section.module';
import { ProjectsSectionModule } from './sections/projects-section/projects-section.module';
import { ControlledScrollModule } from 'src/app/directives/controlled-scroll.module';
import { ReadingsSectionModule } from './sections/readings-section/readings-section.module';



@NgModule({
  declarations: [
    PortfolioFeedComponent,
  ],
  imports: [
    CommonModule,
    HomeSectionModule,
    JobsSectionModule,
    LabSectionModule,
    ProjectsSectionModule,
    ControlledScrollModule,
    ReadingsSectionModule,
],
  exports: [
    PortfolioFeedComponent
  ]
})
export class PortfolioFeedModule { }
