import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { tablerArrowLeft, tablerCrown } from "@ng-icons/tabler-icons";
import { games } from "src/app/data/games.data";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { TranslateService } from "src/app/service/translate.service";

@Component({
  selector: "games-list",
  templateUrl: "./games-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, TranslatePipe],
  providers: [provideIcons({ tablerArrowLeft, tablerCrown })],
})
export class GamesListComponent {
  private translateService = inject(TranslateService);

  games = games;

  get lang(): string | null {
    return this.translateService.currentLang;
  }
}
