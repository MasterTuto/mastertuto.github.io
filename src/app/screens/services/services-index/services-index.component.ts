import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  tablerArrowLeft,
  tablerArrowRight,
  tablerCode,
  tablerDeviceDesktop,
  tablerGlobe,
  tablerPencil,
  tablerPlugConnected,
} from "@ng-icons/tabler-icons";
import { RouterLink } from "@angular/router";

import { FooterComponent } from "src/app/components/footer/footer.component";
import { ButtonComponent } from "src/app/components/@my/button/button.component";
import { services } from "src/app/data/services.data";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { TranslateService } from "src/app/service/translate.service";
import { createWhatsAppLink } from "src/app/utils/whatsapp";

@Component({
  selector: "app-services-index",
  templateUrl: "./services-index.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, TranslatePipe, ButtonComponent, FooterComponent],
  providers: [
    provideIcons({
      tablerArrowLeft,
      tablerArrowRight,
      tablerCode,
      tablerDeviceDesktop,
      tablerGlobe,
      tablerPencil,
      tablerPlugConnected,
    }),
  ],
})
export class ServicesIndexComponent {
  private translateService = inject(TranslateService);

  services = services;

  get lang(): string | null {
    return this.translateService.currentLang;
  }

  get whatsappLink(): string {
    return createWhatsAppLink(this.translateService.translate("servicesPage.common.whatsappMessage"));
  }
}
