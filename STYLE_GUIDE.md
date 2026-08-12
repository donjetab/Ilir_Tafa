# Styling guide

The site uses three layers. Keeping each kind of change in its layer makes the CSS predictable.

1. `src/styles/tokens.css` contains the visual system: brand colors, spacing, radii, motion, and content width. Start here for site-wide visual changes.
2. `src/styles/global.css` contains global element defaults and reusable classes such as `.btn-gold` and reveal animations.
3. A component's own `<style>` block contains layout that belongs only to that component. Tailwind classes in the markup handle small, local spacing and responsive adjustments.

Avoid adding new inline `style="..."` attributes. Existing inline styles can be migrated gradually when that component is next edited.

## Common edits

- Change the palette in `src/styles/tokens.css`.
- Change global typography and links in `src/styles/global.css`.
- Change the navigation in `src/components/Header.astro`.
- Change an individual section beside its markup in the corresponding component under `src/components`.

## Conventions

- Prefer a design token over repeating a hex color.
- Prefer Tailwind for one-off layout declarations.
- Prefer a named class in the component `<style>` block when several elements share a rule or the rule has multiple states.
- Keep mobile rules beside the component they affect.
- Use `!important` only when overriding third-party output; do not use it for normal component styling.
