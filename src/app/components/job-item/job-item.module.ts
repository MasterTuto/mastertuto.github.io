import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobItemComponent } from './job-item.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  tablerBrandAngular,
  tablerServer,
  tablerBrandBootstrap,
  tablerBrandFigma,
  tablerBrandHtml5,
  tablerBrandCss3,
  tablerBrandJavascript,
  tablerBrandReact,
  tablerBrandRedux,
  tablerBrandGit,
  tablerBrandTailwind,
  tablerGlobe
} from '@ng-icons/tabler-icons';
import { HoverIconModule } from '../hover-icon/hover-icon.module';


@NgModule({
  declarations: [
    JobItemComponent
  ],
  exports: [
    JobItemComponent
  ],
  imports: [
    CommonModule,
    HoverIconModule,
    NgIconsModule.withIcons({
      tablerBrandAngular,
      tablerBrandBootstrap,
      tablerBrandFigma,
      tablerServer,
      tablerBrandHtml5,
      tablerBrandCss3,
      tablerBrandJavascript,
      tablerBrandReact,
      tablerBrandRedux,
      tablerBrandGit,
      tablerBrandTailwind,
      tablerGlobe
    })
  ]
})
export class JobItemModule { }
