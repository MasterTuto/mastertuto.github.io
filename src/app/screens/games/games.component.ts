import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CatalogLayoutComponent } from "src/app/components/catalog-layout/catalog-layout.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CatalogLayoutComponent]
})
export class GamesComponent {}
