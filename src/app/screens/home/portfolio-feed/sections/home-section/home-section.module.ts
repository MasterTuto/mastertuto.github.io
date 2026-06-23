import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSectionComponent } from './home-section.component';
import { SectionModule } from 'src/app/components/section/section.module';
import { NgIconsModule } from '@ng-icons/core';
import { tablerBrandOpenSource, tablerBrandUpwork, tablerStar, tablerBrandGithub, tablerBrandTwitter, tablerX, tablerMail, tablerDownload } from '@ng-icons/tabler-icons';
import { SocialIconComponent } from './social-icon/social-icon.component';
import { HoverIconComponent } from 'src/app/components/hover-icon/hover-icon.component';
import { ControlledScrollModule } from 'src/app/directives/controlled-scroll.module';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';


@NgModule({
  declarations: [
    HomeSectionComponent,
    SocialIconComponent
  ],
  imports: [
    CommonModule,
    SectionModule,
    NgIconsModule.withIcons({
      tablerBrandGithub,
      tablerBrandOpenSource,
      tablerBrandTwitter,
      tablerBrandUpwork,
      tablerMail,
      tablerStar,
      tablerX,
      tablerDownload
    }),
    HoverIconComponent,
    ControlledScrollModule,
    TranslatePipe
  ],
  exports: [
    HomeSectionComponent
  ]
})
export class HomeSectionModule { }
