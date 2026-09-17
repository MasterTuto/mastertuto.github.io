import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { tablerCrown, tablerGrid4x4, tablerStack2 } from "@ng-icons/tabler-icons";
import { games } from "src/app/data/games.data";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";

@Component({
  selector: "games-list",
  templateUrl: "./games-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, TranslatePipe],
  providers: [provideIcons({ tablerCrown, tablerGrid4x4, tablerStack2 })],
})
export class GamesListComponent {
  readonly games = games;
}
