import { Component, computed, inject, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight, tablerBrandWhatsapp, tablerChevronLeft, tablerChevronRight, tablerQuote } from '@ng-icons/tabler-icons';
import { SectionComponent } from 'src/app/components/section/section.component';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import { createWhatsAppLink } from 'src/app/utils/html';

interface TestimonialItem {
  textKey: string;
  nameKey: string;
  professionKey: string;
}

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  imports: [
    SectionComponent,
    TranslatePipe,
    NgIconComponent,
  ],
  providers: [
    provideIcons({
      tablerArrowRight,
      tablerBrandWhatsapp,
      tablerChevronLeft,
      tablerChevronRight,
      tablerQuote,
    })
  ],
})
export class TestimonialsSectionComponent {
  private readonly pageSize = 2;
  private translateService = inject(TranslateService);

  get whatsappLink(): string {
    return createWhatsAppLink(this.translateService.translate("home.testimonials.whatsappMessage"));
  }

  testimonials: TestimonialItem[] = [
    {
      textKey: 'home.testimonials.items.1.text',
      nameKey: 'home.testimonials.items.1.name',
      professionKey: 'home.testimonials.items.1.profession',
    },
    {
      textKey: 'home.testimonials.items.2.text',
      nameKey: 'home.testimonials.items.2.name',
      professionKey: 'home.testimonials.items.2.profession',
    },
    {
      textKey: 'home.testimonials.items.3.text',
      nameKey: 'home.testimonials.items.3.name',
      professionKey: 'home.testimonials.items.3.profession',
    },
    {
      textKey: 'home.testimonials.items.4.text',
      nameKey: 'home.testimonials.items.4.name',
      professionKey: 'home.testimonials.items.4.profession',
    },
  ];

  currentPage = signal(0);
  lastPage = computed(() => Math.ceil(this.testimonials.length / this.pageSize) - 1);
  visibleTestimonials = computed(() => {
    const start = this.currentPage() * this.pageSize;
    return this.testimonials.slice(start, start + this.pageSize);
  });

  previousPage(): void {
    this.currentPage.update(page => Math.max(page - 1, 0));
  }

  nextPage(): void {
    this.currentPage.update(page => Math.min(page + 1, this.lastPage()));
  }
}
