# Kaleidoscope Brand Book

The Kaleidoscope identity is built from concentric hexagonal layers, like looking down a lens: a dark outer gear that fades inward to a bright, airy aperture.

## Color Palette

| Role            | Name            | Hex       | CSS variable         |
| --------------- | --------------- | --------- | -------------------- |
| Base            | Pure White      | `#FFFFFF` | `--color-white`      |
| Outer gear      | Navy-Teal       | `#0F4F7A` | `--color-navy`       |
| Second layer    | Deep Teal-Blue  | `#2F7FA3` | `--color-deep-teal`  |
| Middle hex      | Teal            | `#4FA3B8` | `--color-teal`       |
| Inner hex       | Light Teal      | `#79C2CF` | `--color-light-teal` |
| Center aperture | Very Light Cyan | `#A9D6DE` | `--color-cyan`       |

All tokens live in [src/styles/tokens.css](../src/styles/tokens.css). Use semantic variables (`--color-primary`, `--color-surface`, ...) in components, not raw hex values.

### Usage

- **White** is the default page background.
- **Navy** is for body text, headings, and primary buttons.
- **Deep Teal** is for links, hover states, and focus rings.
- **Teal** is for accents, icons, and borders.
- **Light Teal / Cyan** are for surfaces, section backgrounds, and subtle highlights.

### Contrast guidance (approximate WCAG ratios; verify before shipping)

| Pairing            | Ratio  | Use                                             |
| ------------------ | ------ | ----------------------------------------------- |
| Navy on White      | ~8.7:1 | Body text, all sizes                            |
| White on Deep Teal | ~4.5:1 | Large text, buttons (borderline for small text) |
| Navy on Cyan       | ~5.5:1 | Body text                                       |
| Navy on Light Teal | ~4.3:1 | Large text only                                 |
| White on Teal      | ~2.9:1 | Do not use for text                             |

## Typography

System font stack for now (`--font-sans`, `--font-mono`). Scale: 14 / 16 / 20 / 28 / 40 px (`--text-sm` to `--text-2xl`). Swap in a brand typeface by changing `--font-sans`.

## Spacing and Shape

4px base spacing scale (`--space-1` to `--space-16`). Radii: 4 / 8 / 16 px.

## Principles

1. Layered depth: dark outside, light inside.
2. Generous white space.
3. Accessible by default: visible focus states and sufficient contrast.
