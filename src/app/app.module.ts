import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationModule } from './components/navigation/navigation.module';
import { PortfolioFeedModule } from './screens/portfolio-feed/portfolio-feed.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NavigationModule,
    PortfolioFeedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
