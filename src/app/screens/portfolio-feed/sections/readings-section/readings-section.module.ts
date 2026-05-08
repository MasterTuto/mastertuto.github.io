import { NgModule } from "@angular/core";
import { ReadingsSectionComponent } from "./readings-section.component";
import { SectionModule } from "src/app/components/section/section.module";
import { ReadingItemModule } from "src/app/components/reading-item/reading-item.module";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [ReadingsSectionComponent],
  imports: [BrowserModule, SectionModule, ReadingItemModule],
  exports: [ReadingsSectionComponent]
})
export class ReadingsSectionModule {
}
