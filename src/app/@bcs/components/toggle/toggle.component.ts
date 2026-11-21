import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  input,
  model,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { BcsSize } from '@bcs/types/bcs.types';
import { BcsToggleOptionDirective } from './toggle-option.directive';

/** An option given through the `options` input. `text` is what shows inside the track (defaults to the label). */
export interface BcsToggleOption {
  readonly value: string;
  readonly label: string;
  readonly text?: string;
}

interface ResolvedOption {
  readonly value: string;
  readonly label: string;
  readonly text: string;
  readonly template: TemplateRef<unknown> | null;
}

/**
 * Segmented switch with a glass knob that rolls to the selected option (and back, spinning the other
 * way). Options come from the `options` input or from `ng-template[bcsToggleOption]` children.
 *
 * Semantics are a radio group: arrow keys move, Home/End jump, and pressing the selected option again
 * moves to the next one, so a two-option toggle flips with a single click or tap.
 */
@Component({
  selector: 'bcs-toggle',
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: {
    class: 'bcs-toggle',
    role: 'radiogroup',
    '[attr.aria-label]': 'label()',
    '[attr.data-size]': 'size()',
    '[style.--_count]': 'resolved().length',
    '[style.--_index]': 'index()',
  },
})
export class BcsToggleComponent {
  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly value = model.required<string>();
  /** Accessible name of the whole group. */
  readonly label = input.required<string>();
  readonly options = input<readonly BcsToggleOption[]>([]);
  readonly size = input<BcsSize>('md');

  private readonly projected = contentChildren(BcsToggleOptionDirective);

  protected readonly resolved = computed<readonly ResolvedOption[]>(() => {
    const projected = this.projected();
    if (projected.length) {
      return projected.map((option) => ({
        value: option.value(),
        label: option.label(),
        text: option.label(),
        template: option.template,
      }));
    }
    return this.options().map((option) => ({
      value: option.value,
      label: option.label,
      text: option.text ?? option.label,
      template: null,
    }));
  });

  protected readonly index = computed(() =>
    Math.max(0, this.resolved().findIndex((option) => option.value === this.value())),
  );

  protected press(index: number): void {
    const options = this.resolved();
    const next = index === this.index() ? (index + 1) % options.length : index;
    this.select(next);
  }

  protected key(event: KeyboardEvent): void {
    const count = this.resolved().length;
    const moves: Record<string, number> = {
      ArrowRight: this.index() + 1,
      ArrowDown: this.index() + 1,
      ArrowLeft: this.index() - 1,
      ArrowUp: this.index() - 1,
      Home: 0,
      End: count - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    this.select((moves[event.key] + count) % count);
    this.host.querySelectorAll<HTMLElement>('.bcs-toggle__option')[this.index()]?.focus();
  }

  private select(index: number): void {
    const option = this.resolved()[index];
    if (option) this.value.set(option.value);
  }
}
