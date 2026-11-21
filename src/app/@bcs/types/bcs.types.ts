/**
 * The closed vocabularies every @bcs component speaks. Components accept these names only — never a
 * length, a hex value or a class — so a page cannot drift from the design tokens.
 */

/** Control and text size. */
export type BcsSize = 'sm' | 'md' | 'lg';

/** Color roles, mapped 1:1 to the `--color-<role>` tokens. */
export type BcsColor = 'primary' | 'secondary' | 'tertiary' | 'muted' | 'accent' | 'error' | 'success';

/** Gap steps (Law of Proximity: related < group < section). */
export type BcsGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Inner padding of a surface. */
export type BcsPad = 'sm' | 'md' | 'lg';

/** Page widths. */
export type BcsWidth = 'prose' | 'content' | 'wide';

export type BcsAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type BcsJustify = 'start' | 'center' | 'end' | 'between';
