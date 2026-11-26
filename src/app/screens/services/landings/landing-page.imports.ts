import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerAlertTriangle,
  tablerArrowDown,
  tablerArrowRight,
  tablerBrandWhatsapp,
  tablerCheck,
  tablerChecks,
  tablerClock,
  tablerCode,
  tablerFileSpreadsheet,
  tablerMessageCircle,
  tablerPlugConnected,
  tablerRobot,
  tablerSearch,
  tablerShoppingCart,
  tablerSparkles,
  tablerTerminal2,
  tablerX,
} from '@ng-icons/tabler-icons';

import { BcsButtonComponent } from '@bcs/components/button/button.component';
import { BcsListComponent } from '@bcs/components/list/list.component';
import { BcsRevealDirective } from '@bcs/directives/reveal/reveal.directive';
import { BcsSurfaceDirective } from '@bcs/directives/surface/surface.directive';
import { BcsTextDirective } from '@bcs/directives/text/text.directive';
import { LandingContactComponent } from 'src/app/components/landing/contact/landing-contact.component';
import { LandingFaqComponent } from 'src/app/components/landing/faq/landing-faq.component';
import { LandingPriceComponent } from 'src/app/components/landing/price/landing-price.component';
import { LandingRelatedComponent } from 'src/app/components/landing/related/landing-related.component';

/**
 * Building blocks every service page template may use. Pages share the site's fonts, colors and
 * components; what changes from page to page is the composition (each layout tells its own story).
 */
export const LANDING_PAGE_IMPORTS = [
  RouterLink,
  NgIconComponent,
  BcsButtonComponent,
  BcsListComponent,
  BcsRevealDirective,
  BcsSurfaceDirective,
  BcsTextDirective,
  LandingContactComponent,
  LandingFaqComponent,
  LandingPriceComponent,
  LandingRelatedComponent,
] as const;

/** Icons the service page templates draw with (one shared set, so every page reads the same). */
export const LANDING_PAGE_ICONS = provideIcons({
  tablerAlertTriangle,
  tablerArrowDown,
  tablerArrowRight,
  tablerBrandWhatsapp,
  tablerCheck,
  tablerChecks,
  tablerClock,
  tablerCode,
  tablerFileSpreadsheet,
  tablerMessageCircle,
  tablerPlugConnected,
  tablerRobot,
  tablerSearch,
  tablerShoppingCart,
  tablerSparkles,
  tablerTerminal2,
  tablerX,
});
