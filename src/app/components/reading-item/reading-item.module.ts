import { NgModule } from "@angular/core";
import { ReadingItemComponent } from "./reading-item.component";
import { NgIconsModule } from "@ng-icons/core";
import { tablerArticle, tablerBook, tablerExternalLink } from "@ng-icons/tabler-icons";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [ReadingItemComponent],
  imports: [
    NgIconsModule.withIcons({
      tablerBook,
      tablerArticle,
      tablerExternalLink
    }),
    DatePipe
  ],
  exports: [ReadingItemComponent],
})
export class ReadingItemModule {}
