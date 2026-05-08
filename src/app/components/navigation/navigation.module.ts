import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { NavigationButtonComponent } from './navigation-button/navigation-button.component';



@NgModule({
  declarations: [
    NavigationComponent,
    NavigationButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
