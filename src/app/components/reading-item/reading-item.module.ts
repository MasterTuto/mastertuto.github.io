import { NgModule } from "@angular/core";
import { ReadingItemComponent } from "./reading-item.component";
import { NgIconsModule } from "@ng-icons/core";
import { tablerArticle, tablerBook, tablerExternalLink } from "@ng-icons/tabler-icons";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [ReadingItemComponent],
  imports: [
    BrowserModule,
    NgIconsModule.withIcons({
      tablerBook,
      tablerArticle,
      tablerExternalLink
    })
  ],
  exports: [ReadingItemComponent],
})
export class ReadingItemModule {}
