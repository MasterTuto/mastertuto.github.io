import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsSectionComponent } from './projects-section.component';
import { SectionModule } from 'src/app/components/section/section.module';
import { ProjectItemModule } from 'src/app/components/project-item/project-item.module';



@NgModule({
  declarations: [ ProjectsSectionComponent ],
  imports: [
    CommonModule,
    SectionModule,
    ProjectItemModule
  ],
  exports: [
    ProjectsSectionComponent
  ]
})
export class ProjectsSectionModule { }
