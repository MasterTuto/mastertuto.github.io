import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverIconComponent } from './hover-icon.component';
import { NgIconsModule } from '@ng-icons/core';



@NgModule({
  declarations: [
    HoverIconComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule
  ],
  exports: [
    HoverIconComponent
  ]
})
export class HoverIconModule { }
