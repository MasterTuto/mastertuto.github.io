import { Component, computed, inject, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight, tablerBrandWhatsapp, tablerChevronLeft, tablerChevronRight, tablerBrandUpwork } from '@ng-icons/tabler-icons';
import { SectionComponent } from 'src/app/components/section/section.component';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import { createWhatsAppLink } from 'src/app/utils/html';

interface TestimonialItem {
  title: string;
  date: string;
  quote?: string;

}

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss',
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
      tablerBrandUpwork,
    })
  ],
})
export class TestimonialsSectionComponent {
  private readonly pageSize = 2;
  private translateService = inject(TranslateService);

  get whatsappLink(): string {
    return createWhatsAppLink(this.translateService.translate("home.testimonials.whatsappMessage"));
  }

  readonly upworkProfileUrl = 'https://www.upwork.com/freelancers/~015b65b982c32771f6';
  readonly testimonials: TestimonialItem[] = [
    {
      title: 'Design For Online Platform',
      date: 'Mar 12, 2024 – Mar 19, 2024',
      quote: 'Breno has great insights and was invested in the success of our project!',
    },
    {
      title: 'PyThon test',
      date: 'Jul 25, 2023 – Aug 10, 2023',
      quote: 'Did a great job for this task and proved really adept at Py. I would be happy to work with him in a similar role',
    },
    {
      title: 'Software Engineer needed for growing EdTech company',
      date: 'Mar 13, 2024 – Aug 1, 2024',
    },
    {
      title: 'Python Developer for Refactoring',
      date: 'May 18, 2023 – Jun 7, 2023',
    },
  ];

  currentPage = signal(0);
  lastPage = computed(() => Math.ceil(this.testimonials.length / this.pageSize) - 1);
  readonly pages = Array.from(
    { length: Math.ceil(this.testimonials.length / this.pageSize) },
    (_, index) => this.testimonials.slice(index * this.pageSize, (index + 1) * this.pageSize),
  );

  previousPage(): void {
    this.currentPage.update(page => Math.max(page - 1, 0));
  }

  nextPage(): void {
    this.currentPage.update(page => Math.min(page + 1, this.lastPage()));
  }
}
