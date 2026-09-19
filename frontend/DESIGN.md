---
name: Academic Excellence
colors:
  # Base & Surfaces
  background: '#f8f9ff'
  on-background: '#081c32'
  surface: '#f8f9ff'
  surface-dim: '#c9dbf9'
  surface-bright: '#f8f9ff'
  surface-variant: '#d3e3ff'
  surface-gray: '#F8FAFC'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d3e3ff'
  on-surface: '#081c32'
  on-surface-variant: '#42474e'
  inverse-surface: '#1f3148'
  inverse-on-surface: '#ebf1ff'
  surface-tint: '#37618b'

  # Borders & Outlines
  border-subtle: '#E2E8F0'
  outline: '#72777f'
  outline-variant: '#c2c7cf'

  # Primary (Corporate Navy)
  primary: '#002643'
  primary-container: '#073c64'
  on-primary: '#ffffff'
  on-primary-container: '#7fa7d5'
  inverse-primary: '#a1cafa'
  primary-fixed: '#d0e4ff'
  primary-fixed-dim: '#a1cafa'
  on-primary-fixed: '#001d35'
  on-primary-fixed-variant: '#1c4972'

  # Secondary (Action Accent Yellow / Gold)
  secondary: '#755b00'
  secondary-container: '#fdcb2c'
  on-secondary: '#ffffff'
  on-secondary-container: '#6f5600'
  secondary-fixed: '#ffe08f'
  secondary-fixed-dim: '#f1c01f'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#584400'

  # Tertiary (Link / Category Cyan-Blue)
  tertiary: '#002933'
  tertiary-container: '#00404f'
  on-tertiary: '#ffffff'
  on-tertiary-container: '#37b1d3'
  tertiary-fixed: '#b5ebff'
  tertiary-fixed-dim: '#64d4f7'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'

  # Status
  error: '#ba1a1a'
  error-container: '#ffdad6'
  on-error: '#ffffff'
  on-error-container: '#93000a'
  success-emerald: '#10B981'

typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Open Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  caption:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'

rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px

spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-v-padding: 80px
---

# Alumni Network Portal – Design System

Extracted from Stitch Project `projects/4561378260896926936` (**Alumni Network Portal**).

## 1. Brand & Style

The design system establishes a professional, trustworthy, and prestigious digital environment for an alumni community. It balances the heritage of an academic institution with a modern, clean SaaS aesthetic. The goal is to foster a sense of belonging and **Corporate Elegance**—evoking pride in the institution while providing a highly functional tool for networking and news.

The style is **Corporate / Modern** with a focus on:
- **Precision:** Perfect alignment and systematic spacing to reflect academic rigor.
- **Clarity:** Generous white space and clear visual hierarchies for easy scanning of news and career opportunities.
- **Sophistication:** Subtle use of depth and a refined color palette to differentiate from standard social networks.

---

## 2. Color Palette

### Primary (Corporate Navy)
The palette is anchored by **Corporate Blue / Navy**, conveying trust, prestige, and academic heritage.

| Token | Hex | Role / Usage |
| :--- | :--- | :--- |
| `primary` | `#002643` | Primary branding, headers, dark text accents |
| `primary-container` | `#073c64` | Hero section background, prominent container fills |
| `on-primary` | `#ffffff` | Text and icons on primary backgrounds |
| `on-primary-container`| `#7fa7d5` | Subtle accents / subtext on primary container |
| `primary-fixed` | `#d0e4ff` | Light primary tint container |
| `primary-fixed-dim` | `#a1cafa` | Secondary tint container |
| `on-primary-fixed` | `#001d35` | Text on primary fixed tints |

### Secondary (Yellow / Gold Accent)
A vibrant yellow/gold accent used for calls to action, badges, and attention-grabbing UI elements.

| Token | Hex | Role / Usage |
| :--- | :--- | :--- |
| `secondary` | `#755b00` | Deep gold for high-contrast text or borders |
| `secondary-container`| `#fdcb2c` | Prominent CTA buttons, active state indicators |
| `on-secondary` | `#ffffff` | Inverted text on dark secondary elements |
| `on-secondary-container` | `#6f5600` | Dark text on yellow container buttons/chips |
| `secondary-fixed` | `#ffe08f` | Light yellow accent chip background |
| `secondary-fixed-dim`| `#f1c01f` | Medium yellow badge fill |

### Tertiary (Cyan / Blue Accent)
Used for links, secondary highlights, tags, and category labels.

| Token | Hex | Role / Usage |
| :--- | :--- | :--- |
| `tertiary` | `#002933` | Deep teal/cyan element base |
| `tertiary-container` | `#00404f` | Dark teal container |
| `on-tertiary-container` | `#37b1d3` | Bright cyan text on teal container |
| `tertiary-fixed` | `#b5ebff` | Tag and badge backgrounds |
| `tertiary-fixed-dim` | `#64d4f7` | Active cyan link / indicator |

### Neutral & Surfaces
Carefully calibrated light blue-gray surfaces that create depth and softness without feeling harsh.

| Token | Hex | Role / Usage |
| :--- | :--- | :--- |
| `background` | `#f8f9ff` | Page background |
| `surface` | `#f8f9ff` | Standard component surface |
| `surface-container-lowest` | `#ffffff` | Cards, modals, elevated white containers |
| `surface-container-low` | `#eff4ff` | Soft tinted card backgrounds |
| `surface-container` | `#e6eeff` | Section backgrounds |
| `surface-container-high` | `#dde9ff` | Interactive hover states |
| `surface-container-highest` | `#d3e3ff` | Input fields, active chips |
| `surface-gray` | `#F8FAFC` | Neutral container fallback |
| `border-subtle` | `#E2E8F0` | Default card borders and dividers |
| `outline` | `#72777f` | Standard outline strokes |
| `outline-variant` | `#c2c7cf` | Subtle outlines |
| `on-surface` | `#081c32` | Primary heading and body text |
| `on-surface-variant` | `#42474e` | Secondary body text and helper labels |

### Feedback & Status
| Token | Hex | Role / Usage |
| :--- | :--- | :--- |
| `success-emerald` | `#10B981` | Success states, verified badges, active online status |
| `error` | `#ba1a1a` | Error text, danger buttons |
| `error-container` | `#ffdad6` | Error alert backgrounds |
| `on-error-container` | `#93000a` | Error alert text |

---

## 3. Typography

The design system implements a dual-font pairing:
- **Montserrat**: Geometric, modern sans-serif for display headings, card titles, navigation, and labels.
- **Open Sans**: Highly readable humanist sans-serif for body copy, descriptions, and captions.

### Type Scale

| Level | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Montserrat | 48px | 700 (Bold) | 1.2 | -0.02em | Hero headline |
| `headline-lg` | Montserrat | 32px | 600 (Semi-Bold) | 1.3 | Normal | Section headers (Desktop) |
| `headline-lg-mobile`| Montserrat | 28px | 600 (Semi-Bold) | 1.3 | Normal | Section headers (Mobile) |
| `headline-md` | Montserrat | 24px | 600 (Semi-Bold) | 1.4 | Normal | Card titles, modal headers |
| `body-lg` | Open Sans | 18px | 400 (Regular) | 1.6 | Normal | Lead paragraphs, intro text |
| `body-md` | Open Sans | 16px | 400 (Regular) | 1.6 | Normal | Standard body copy, articles |
| `label-md` | Montserrat | 14px | 600 (Semi-Bold) | 1.0 | 0.05em | Navigation items, buttons, chips |
| `caption` | Open Sans | 12px | 400 (Regular) | 1.4 | Normal | Timestamps, metadata, footnotes |

---

## 4. Spacing & Grid System

- **Desktop (1280px+)**: 12-column grid, 24px gutter, max-width 1280px.
- **Tablet (768px - 1024px)**: 8-column grid, 20px gutter, 32px side margins.
- **Mobile (< 768px)**: 4-column grid, 16px gutter, 16px side margins.
- **Vertical Rhythm**: 80px padding between major page sections (`section-v-padding`).

### Stack Spacing
- `stack-sm`: 8px (Between closely related inline elements or title + tag)
- `stack-md`: 16px (Between card elements, form groups)
- `stack-lg`: 32px (Between content blocks or sub-sections)

---

## 5. Shape & Elevation

### Border Radius
- `sm` (`0.125rem` / 2px): Micro badges, tags
- `DEFAULT` (`0.25rem` / 4px): Input fields, standard buttons, small cards
- `md` (`0.375rem` / 6px): Medium containers, dropdown menus
- `lg` (`0.5rem` / 8px): Content cards, modal dialogs
- `xl` (`0.75rem` / 12px): Image containers in news feeds, banners
- `full` (`9999px`): Avatars, pills, circular icon buttons

### Depth & Elevation
- **Level 0 (Base)**: `#FFFFFF` or `#F8F9FF` background without shadow.
- **Level 1 (Cards/Containers)**: `border: 1px solid #E2E8F0`, `box-shadow: 0 4px 6px -1px rgba(26, 44, 67, 0.05)`
- **Level 2 (Hover/Interactions)**: `box-shadow: 0 10px 15px -3px rgba(26, 44, 67, 0.1)`
- **Hero Elevation**: Deep navy background (`#073C64`) with high-contrast text and `#FDCB2C` accents.

---

## 6. Key Components Guide

- **Top Navigation Bar**: Sticky header, Montserrat `label-md` navigation links, 2px `#FDCB2C` active/hover indicator.
- **Hero Banner**: Deep Navy `#073C64` background, `display-lg` white heading, yellow `#FDCB2C` CTA button.
- **Cards (News / Alumni)**: Elevated Level 1 white cards with 8px corner radius, 12px radius on images, `headline-md` for titles.
- **Buttons**:
  - *Primary*: `#FDCB2C` fill, `#002643` bold text.
  - *Secondary*: Transparent with 2px `#002643` border, `#002643` text.
  - *Tertiary / Ghost*: Transparent with cyan or primary text.
- **Forms**: `#FFFFFF` background, 1px `#E2E8F0` border, 4px corner radius, focusing into `#073C64` stroke with subtle 2px glow.
