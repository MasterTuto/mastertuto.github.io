import { RouterLink } from '@angular/router';

import { BcsButtonComponent } from '@bcs/components/button/button.component';
import { BcsListComponent } from '@bcs/components/list/list.component';
import { BcsContainerDirective } from '@bcs/directives/container/container.directive';
import { BcsGridDirective } from '@bcs/directives/grid/grid.directive';
import { BcsSectionDirective } from '@bcs/directives/section/section.directive';
import { BcsStackDirective } from '@bcs/directives/stack/stack.directive';
import { BcsSurfaceDirective } from '@bcs/directives/surface/surface.directive';
import { BcsTextDirective } from '@bcs/directives/text/text.directive';
import { LandingContactComponent } from 'src/app/components/landing/contact/landing-contact.component';
import { LandingFaqComponent } from 'src/app/components/landing/faq/landing-faq.component';
import { LandingHeroComponent } from 'src/app/components/landing/hero/landing-hero.component';
import { LandingPriceComponent } from 'src/app/components/landing/price/landing-price.component';
import { LandingQuoteComponent } from 'src/app/components/landing/quote/landing-quote.component';
import { LandingRelatedComponent } from 'src/app/components/landing/related/landing-related.component';
import { LandingStatComponent } from 'src/app/components/landing/stat/landing-stat.component';
import { LandingStepsComponent } from 'src/app/components/landing/steps/landing-steps.component';

/** Building blocks every service page template may use (layouts differ, vocabulary doesn't). */
export const LANDING_PAGE_IMPORTS = [
  RouterLink,
  BcsButtonComponent,
  BcsListComponent,
  BcsContainerDirective,
  BcsGridDirective,
  BcsSectionDirective,
  BcsStackDirective,
  BcsSurfaceDirective,
  BcsTextDirective,
  LandingContactComponent,
  LandingFaqComponent,
  LandingHeroComponent,
  LandingPriceComponent,
  LandingQuoteComponent,
  LandingRelatedComponent,
  LandingStatComponent,
  LandingStepsComponent,
] as const;
