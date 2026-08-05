import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioFeedComponent } from './portfolio-feed.component';
import { ProjectsSectionModule } from './sections/projects-section/projects-section.module';
import { HomeSectionComponent } from './sections/home-section/home-section.component';
import { ServicesSectionComponent } from './sections/services-section/services-section.component';
import { WhyMeSectionComponent } from './sections/why-me-section/why-me-section.component';
import { TestimonialsSectionComponent } from './sections/testimonials-section/testimonials-section.component';



@NgModule({
  declarations: [
    PortfolioFeedComponent,
  ],
  imports: [
    CommonModule,
    HomeSectionComponent,
    ServicesSectionComponent,
    WhyMeSectionComponent,
    ProjectsSectionModule,
    TestimonialsSectionComponent,
],
  exports: [
    PortfolioFeedComponent
  ]
})
export class PortfolioFeedModule { }
