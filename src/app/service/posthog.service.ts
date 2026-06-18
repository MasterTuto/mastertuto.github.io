import { Injectable, NgZone } from "@angular/core";
import posthog from "posthog-js";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class PosthogService {
  constructor(
    private ngZone: NgZone,
  ) {
    this.initPostHog();
  }
  private initPostHog() {
    this.ngZone.runOutsideAngular(() => {
      posthog.init(environment.posthogKey, {
        api_host: environment.posthogHost,
        defaults: '2026-01-30',
      });
    });
  }
}
