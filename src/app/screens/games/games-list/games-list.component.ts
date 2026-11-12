import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { games } from "src/app/data/games.data";
import { GameGlyphComponent } from "./game-glyph.component";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { usePageSeo } from "src/app/seo/page-seo";
import { TranslateService } from "src/app/service/translate.service";

@Component({
  selector: "games-list",
  templateUrl: "./games-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, GameGlyphComponent, TranslatePipe],
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
