import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import {provideRouter} from '@angular/router';

import { environment } from './environments/environment';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));

