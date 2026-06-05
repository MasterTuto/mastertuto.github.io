import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabItemComponent } from './lab-item.component';
import { NgIconsModule } from '@ng-icons/core';
import { tablerExternalLink } from '@ng-icons/tabler-icons';
import { JoinModule } from 'src/app/pipes/join/join.module';



@NgModule({
  declarations: [
    LabItemComponent
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      tablerExternalLink
    }),
    JoinModule
  ],
  exports: [
    LabItemComponent
  ]
})
export class LabItemModule { }
