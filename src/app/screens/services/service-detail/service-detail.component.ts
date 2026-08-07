import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { map } from "rxjs";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  tablerArrowLeft,
  tablerArrowRight,
  tablerCheck,
  tablerCode,
  tablerDeviceDesktop,
  tablerGlobe,
  tablerPencil,
  tablerPlugConnected,
} from "@ng-icons/tabler-icons";

import { FooterComponent } from "src/app/components/footer/footer.component";
import { ButtonComponent } from "src/app/components/@my/button/button.component";
import { getServiceBySlug, services } from "src/app/data/services.data";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { TranslateService } from "src/app/service/translate.service";
import { createWhatsAppLink } from "src/app/utils/whatsapp";

@Component({
  selector: "app-service-detail",
  templateUrl: "./service-detail.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, TranslatePipe, ButtonComponent, FooterComponent],
  providers: [
    provideIcons({
      tablerArrowLeft,
      tablerArrowRight,
      tablerCheck,
      tablerCode,
      tablerDeviceDesktop,
      tablerGlobe,
      tablerPencil,
      tablerPlugConnected,
    }),
  ],
})
export class ServiceDetailComponent {
  private route = inject(ActivatedRoute);
  private translateService = inject(TranslateService);

  private serviceParam = toSignal(
    this.route.paramMap.pipe(map((params) => params.get("service"))),
    { initialValue: this.route.snapshot.paramMap.get("service") },
  );

  service = computed(() => getServiceBySlug(this.serviceParam() ?? ""));

  benefitSteps = ["1", "2", "3", "4"];
  detailSteps = ["1", "2", "3"];
  processSteps = ["1", "2", "3", "4"];
  faqSteps = ["1", "2", "3"];

  otherServices = computed(() => services.filter((s) => s.slug !== this.service()?.slug));

  get lang(): string | null {
    return this.translateService.currentLang;
  }

  get whatsappLink(): string {
    return createWhatsAppLink(this.translateService.translate("servicesPage.common.whatsappMessage"));
  }
}
