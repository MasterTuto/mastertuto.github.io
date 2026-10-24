import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EditorialColor, EditorialSize, EditorialVariant } from './editorial.types';

@Component({
  selector: 'app-editorial-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<header class="hero" [attr.data-variant]="variant()" [attr.data-size]="size()" [attr.data-color]="color()"><div class="hero-copy"><p class="eyebrow">{{ eyebrow() }}</p><h1>{{ title() }}</h1><p class="intro">{{ description() }}</p><ng-content select="[actions]" /></div><div class="hero-media"><ng-content /></div></header>`,
  styleUrl: './hero.scss',
})
export class EditorialHeroComponent {
  readonly eyebrow = input(''); readonly title = input.required<string>(); readonly description = input('');
  readonly variant = input<EditorialVariant>('split'); readonly size = input<EditorialSize>('lg'); readonly color = input<EditorialColor>('primary');
}

@Component({
  selector: 'app-prompt-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<figure class="prompt-image" [attr.data-variant]="variant()" [attr.data-size]="size()" [attr.data-color]="color()"><p>{{ prompt() }}</p></figure>`,
  styleUrl: './prompt.scss',
})
export class PromptImageComponent {
  readonly prompt = input.required<string>(); readonly variant = input<'landscape' | 'portrait' | 'square'>('landscape');
  readonly size = input<EditorialSize>('md'); readonly color = input<EditorialColor>('primary');
}

@Component({
  selector: 'app-text-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="text-section" [attr.data-variant]="variant()" [attr.data-size]="size()" [attr.data-color]="color()"><div><p class="eyebrow">{{ eyebrow() }}</p><h2>{{ title() }}</h2></div><div class="text-body"><p>{{ body() }}</p><ng-content /></div></section>`,
  styleUrl: './text.scss',
})
export class TextSectionComponent {
  readonly eyebrow = input(''); readonly title = input.required<string>(); readonly body = input('');
  readonly variant = input<'split' | 'statement' | 'inset'>('split'); readonly size = input<EditorialSize>('md'); readonly color = input<EditorialColor>('primary');
}

@Component({
  selector: 'app-detail-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="detail-list" [attr.data-variant]="variant()" [attr.data-size]="size()" [attr.data-color]="color()"><p class="eyebrow">{{ eyebrow() }}</p><h2>{{ title() }}</h2><ol>@for (item of items(); track item; let i = $index) { <li><span class="number">{{ i + 1 < 10 ? '0' : '' }}{{ i + 1 }}</span><p>{{ item }}</p></li> }</ol></section>`,
  styleUrl: './detail.scss',
})
export class DetailListComponent {
  readonly eyebrow = input(''); readonly title = input.required<string>(); readonly items = input.required<string[]>();
  readonly variant = input<'rows' | 'columns' | 'steps'>('rows'); readonly size = input<EditorialSize>('md'); readonly color = input<EditorialColor>('primary');
}

@Component({
  selector: 'app-media-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PromptImageComponent],
  template: `<section class="media-section" [attr.data-size]="size()"><p class="eyebrow">{{ eyebrow() }}</p><h2>{{ title() }}</h2><div class="media-grid" [attr.data-variant]="variant()">@for (prompt of prompts(); track prompt; let i = $index) { <app-prompt-image [prompt]="prompt" [variant]="(variant() === 'masonry' && i % 2 === 0) || (variant() === 'bento' && i === 0) ? 'portrait' : 'landscape'" [color]="color()" [size]="size()" /> }</div></section>`,
  styleUrl: './media.scss',
})
export class MediaGridComponent {
  readonly eyebrow = input(''); readonly title = input.required<string>(); readonly prompts = input.required<string[]>();
  readonly variant = input<'bento' | 'masonry'>('bento'); readonly size = input<EditorialSize>('md'); readonly color = input<EditorialColor>('primary');
}
