import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface BcsFaqItem {
  readonly question: string;
  readonly answer: string;
}

/** Questions as native disclosure widgets: keyboard and screen readers work without script. */
@Component({
  selector: 'bcs-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bcs-faq' },
  template: `
    @for (item of items(); track item.question) {
      <details class="bcs-faq__item" name="bcs-faq">
        <summary class="bcs-faq__question">{{ item.question }}</summary>
        <p class="bcs-faq__answer">{{ item.answer }}</p>
      </details>
    }
  `,
})
export class BcsFaq {
  readonly items = input.required<readonly BcsFaqItem[]>();
}
