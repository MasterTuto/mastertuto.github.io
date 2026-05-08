import { NgModule } from "@angular/core";
import { ControlledScrollDirective } from "./controlled-scroll.directive";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    ControlledScrollDirective
  ],
  exports: [
    ControlledScrollDirective
  ],
  providers: [
    CommonModule
  ]
})
export class ControlledScrollModule {}