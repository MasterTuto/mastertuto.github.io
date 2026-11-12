export type NavItem = {
  titleKey: string;
  href: string;
};

/** A link shown by the shared navigation, breadcrumbs and menus. */
export type NavLink = {
  /** Translation key, or the label itself when `literal` is true. */
  label: string;
  literal?: boolean;
  /** App path without the language prefix (e.g. `games/sudoku`). Omit for an anchor on the current page. */
  path?: string;
  fragment?: string;
  /** Only mark as active on an exact URL match. */
  exact?: boolean;
  /** Links shown in a menu under this item; a child with its own children is a group in that menu. */
  children?: NavLink[];
};
