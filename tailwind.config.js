/**
 * Tailwind only exposes the design tokens declared in `src/styles/tokens/`: color roles, the type
 * scale, the radius scale and the shadow scale. The default palette (slate, blue, …) is replaced, not
 * extended, so a template cannot reach for a hue that is not a role.
 *
 * Color utilities: `bg-<role>`, `text-<role>-foreground`, `border-<role>-300`, `bg-surface-2`, …
 * Roles: primary, secondary, tertiary, muted, accent, error, success. Surfaces: surface-0 … surface-3.
 *
 * @type {import('tailwindcss').Config}
 */
const ROLES = ['primary', 'secondary', 'tertiary', 'muted', 'accent', 'error', 'success'];
const SURFACES = ['surface-0', 'surface-1', 'surface-2', 'surface-3'];
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const channel = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  inherit: 'inherit',
  ...Object.fromEntries(
    ROLES.map((role) => [
      role,
      {
        DEFAULT: channel(role),
        foreground: channel(`${role}-foreground`),
        ...Object.fromEntries(STEPS.map((step) => [step, channel(`${role}-${step}`)])),
      },
    ]),
  ),
  ...Object.fromEntries(
    SURFACES.map((surface) => [surface, { DEFAULT: channel(surface), foreground: channel(`${surface}-foreground`) }]),
  ),
};

const size = (name, lineHeight) => [`var(--text-${name})`, { lineHeight }];

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors,
    fontFamily: {
      display: 'var(--font-display)',
      body: 'var(--font-body)',
      mono: 'var(--font-mono)',
    },
    fontSize: {
      '2xs': size('2xs', '1rem'),
      xs: size('xs', '1rem'),
      sm: size('sm', '1.25rem'),
      base: size('base', '1.5rem'),
      lg: size('lg', '1.75rem'),
      xl: size('xl', '1.75rem'),
      '2xl': size('2xl', '2rem'),
      '3xl': size('3xl', '2.25rem'),
      '4xl': size('4xl', '2.5rem'),
      '5xl': size('5xl', '1.1'),
      '6xl': size('6xl', '1.1'),
      '7xl': size('7xl', '1.05'),
    },
    borderRadius: {
      none: '0',
      xs: 'var(--radius-xs)',
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
      full: 'var(--radius-full)',
    },
    boxShadow: {
      DEFAULT: 'var(--shadow-sm)',
      none: 'none',
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
    },
    extend: {
      height: { dvh: '100dvh' },
      minHeight: { dvh: '100dvh' },
      spacing: { 46: '11.5rem' },
      maxWidth: {
        prose: 'var(--width-prose)',
        content: 'var(--width-content)',
        wide: 'var(--width-wide)',
      },
      listStyleImage: {
        'check-icon':
          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-linecap=\'round\' stroke-linejoin=\'round\' style=\'stroke-width:var(--ng-icon__stroke-width, 2)\'%3E%3Cpath stroke=\'none\' d=\'M0 0h24v24H0z\' fill=\'none\'%3E%3C/path%3E%3Cpath d=\'M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\'%3E%3C/path%3E%3Cpath d=\'M9 12l2 2l4 -4\'%3E%3C/path%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
};
