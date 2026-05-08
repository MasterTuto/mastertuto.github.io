import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section.component';
import { ControlledScrollModule } from 'src/app/directives/controlled-scroll.module';



@NgModule({
  declarations: [
    SectionComponent
  ],
  imports: [
    CommonModule,
    ControlledScrollModule
  ],
  exports: [
    SectionComponent
  ]
})
export class SectionModule { }
