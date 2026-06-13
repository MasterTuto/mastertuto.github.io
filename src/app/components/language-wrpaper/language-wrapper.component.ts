import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute, RouterOutlet } from "@angular/router";

@Component({
  selector: "language-wrapper",
  templateUrl: "./language-wrapper.component.html",
  styleUrls: ["./language-wrapper.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet]
})
export class LanguageWrapperComponent {
  private _activateRoute = inject(ActivatedRoute);

  language = this._activateRoute.snapshot.paramMap.get("lang");
}
