import { NgModule } from "@angular/core";
import { ProjectItemComponent } from "./project-item.component";
import { AsyncPipe } from "@angular/common";
import { NgIconsModule } from "@ng-icons/core";
import { tablerHourglass, tablerCheck, tablerCircleX } from '@ng-icons/tabler-icons';

@NgModule({
  declarations: [ ProjectItemComponent ],
  imports: [
    AsyncPipe,
    NgIconsModule.withIcons({
      tablerHourglass,
      tablerCheck,
      tablerCircleX
    })
  ],
  exports: [ ProjectItemComponent ]
})
export class ProjectItemModule { }