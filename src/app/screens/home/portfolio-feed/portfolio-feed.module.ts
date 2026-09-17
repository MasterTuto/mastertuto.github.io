import { RouterLink } from '@angular/router';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { SchedulingSectionComponent } from './sections/scheduling-section/scheduling-section.component';
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
    RouterLink,
    TranslatePipe,
    HomeSectionComponent,
    ServicesSectionComponent,
    WhyMeSectionComponent,
    ProjectsSectionModule,
    TestimonialsSectionComponent,
    SchedulingSectionComponent,
],
  exports: [
    PortfolioFeedComponent
  ]
})
export class PortfolioFeedModule { }
