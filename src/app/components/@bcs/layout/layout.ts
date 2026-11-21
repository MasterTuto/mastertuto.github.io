import { booleanAttribute, Directive, input } from '@angular/core';

import { BcsGap, BcsWidth } from '@bcs/core';

export type BcsStackDirection = 'column' | 'row' | 'adaptive';
export type BcsAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type BcsJustify = 'start' | 'center' | 'end' | 'between';
export type BcsGridMin = 'sm' | 'md' | 'lg';
export type BcsSectionSpace = 'md' | 'lg' | 'xl';

/**
 * One-dimensional flow. `adaptive` is a column on phones and a row from 48rem up.
 *
 *   <div bcs-stack gap="lg" direction="adaptive" align="center">…</div>
 */
@Directive({
  selector: '[bcs-stack]',
  host: {
    class: 'bcs-stack',
    '[attr.data-gap]': 'gap()',
    '[attr.data-direction]': 'direction()',
    '[attr.data-align]': 'align()',
    '[attr.data-justify]': 'justify()',
    '[attr.data-wrap]': 'wrap() || null',
  },
})
export class BcsStack {
  readonly gap = input<BcsGap>('md');
  readonly direction = input<BcsStackDirection>('column');
  readonly align = input<BcsAlign>('stretch');
  readonly justify = input<BcsJustify>('start');
  readonly wrap = input(false, { transform: booleanAttribute });
}

/**
 * Responsive grid without breakpoints: as many columns as fit, each at least `min` wide
 * (sm ≈ 14rem, md ≈ 18rem, lg ≈ 24rem).
 */
@Directive({
  selector: '[bcs-grid]',
  host: { class: 'bcs-grid', '[attr.data-gap]': 'gap()', '[attr.data-min]': 'min()' },
})
export class BcsGrid {
  readonly gap = input<BcsGap>('md');
  readonly min = input<BcsGridMin>('md');
}

/** Centers content at one of the three page widths. */
@Directive({
  selector: '[bcs-container]',
  host: { class: 'bcs-container', '[attr.data-width]': 'width()' },
})
export class BcsContainer {
  readonly width = input<BcsWidth>('content');
}

/** Vertical rhythm between page sections. Sections never set their own margins. */
@Directive({
  selector: '[bcs-section]',
  host: { class: 'bcs-section', '[attr.data-space]': 'space()' },
})
export class BcsSection {
  readonly space = input<BcsSectionSpace>('lg');
}

export const BCS_LAYOUT = [BcsStack, BcsGrid, BcsContainer, BcsSection] as const;
