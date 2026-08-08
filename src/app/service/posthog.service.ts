import { Inject, Injectable, NgZone, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import posthog from "posthog-js";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class PosthogService {
  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.ngZone.runOutsideAngular(() => {
      posthog.init(environment.posthogKey, {
        api_host: environment.posthogHost,
        defaults: '2026-01-30',
      });
    });
  }

  capture(event: string, properties?: Record<string, unknown>): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.ngZone.runOutsideAngular(() => {
      posthog.capture(event, properties);
    });
  }
}
