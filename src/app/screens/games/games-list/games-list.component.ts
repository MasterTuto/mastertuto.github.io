import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { tablerCrown, tablerGrid4x4, tablerStack2 } from "@ng-icons/tabler-icons";
import { games } from "src/app/data/games.data";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { usePageSeo } from "src/app/seo/page-seo";
import { TranslateService } from "src/app/service/translate.service";

@Component({
  selector: "games-list",
  templateUrl: "./games-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, TranslatePipe],
  providers: [provideIcons({ tablerCrown, tablerGrid4x4, tablerStack2 })],
})
export class GamesListComponent {
  readonly games = games;

  constructor() {
    const translate = inject(TranslateService);
    const t = (path: string) => translate.translate(path);
    usePageSeo(() => ({
      title: t("catalog.gamesTitle"),
      description: t("catalog.gamesIntro"),
      path: "/games",
      breadcrumbs: [
        [t("home.nav.home"), "/"],
        [t("games.label"), "/games"],
      ],
      jsonLd: [
        {
          "@type": "ItemList",
          itemListElement: games.map((game, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: t(game.nameKey),
            description: t(game.descriptionKey),
          })),
        },
      ],
    }));
  }
}
