import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule]
})
export class GamesComponent {}
