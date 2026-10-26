---
name: Literary Salon
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede9'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#59413a'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#8d7168'
  outline-variant: '#e1bfb5'
  surface-tint: '#ac3400'
  primary: '#9b2f00'
  on-primary: '#ffffff'
  primary-container: '#c2410c'
  on-primary-container: '#ffece7'
  inverse-primary: '#ffb59d'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#4a5569'
  on-tertiary: '#ffffff'
  tertiary-container: '#626d82'
  on-tertiary-container: '#eaefff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies the warmth of an independent curator's bookstore balanced with the disciplined structure required for an academic engineering portal. It moves away from clinical, generic SaaS palettes to evoke an intimate, scholarly salon: archival cream backgrounds, crisp parchment-white paper elevations, deep nocturnal inks, and terracotta accents reminiscent of clothbound spines and wax seals.

The aesthetic blends **Editorial Elegance** and **Modern Academic Utility**. Interfaces must feel contemplative, structured, and effortless to read over extended reading periods. Visual noise is minimized in favor of typographic contrast, subtle borders, and intentional tonal layering. Interactive surfaces balance tactile physical metaphors (deckled-edge warmth, book covers) with the clarity expected from standard server-rendered layouts and structured administrative workflows.

## Colors

The palette establishes an authentic literary environment through balanced contrast ratios and rich archival tones:

- **Primary (`#C2410C`)**: Deep Terracotta. Used for pivotal call-to-actions, active state highlights, link emphasis, and selected filter states.
- **Secondary (`#D97706`)**: Warm Amber. Reserved strictly for star ratings, badges, award ribbons, and cautionary alerts.
- **Tertiary (`#1E293B`)**: Deep Navy Ink. Applied to primary headings, high-emphasis text, top navigation bars, and data-dense administrative headers to maintain authoritative legibility.
- **Neutral (`#FAF7F2`)**: Warm Cream Canvas. Serves as the page foundation, replacing cold sterile whites to prevent visual fatigue.
- **Surface Crisp (`#FFFFFF`)**: Pure White. Dedicated to elevated reading cards, book covers, forms, and administrative data tables.
- **Border / Structural Tone (`#E2D9CE`)**: Soft Vellum Border. Distinguishes cards, dividers, and input borders without jarring chromatic interruption.
- **Muted Text (`#64748B`)**: Secondary slate for timestamps, publication metadata, ISBN tags, and form microcopy.

## Typography

The typographical pairing relies on the tension between a high-contrast editorial serif (`Playfair Display`) and a friendly geometric grotesque (`Plus Jakarta Sans`).

- **Display & Headings**: `Playfair Display` provides literary pedigree. It is applied to featured titles, book names, review section headers, and hero banners. Always maintain generous line heights to accommodate tall ascenders and elegant ligatures.
- **Body & Long-form Text**: `Plus Jakarta Sans` provides high legibility for student reviews, synopsis excerpts, technical documentation, and dense data lists.
- **Labels & Microcopy**: Form field titles, metadata headers (e.g., "GENRE", "ISBN", "PUBLISHED"), and table headings use medium or bold weights of `Plus Jakarta Sans` with expanded letter spacing to ensure rapid visual parsing.

## Layout & Spacing

The layout is grounded in a 12-column responsive fluid grid within a centered container constrained to a maximum width of `1200px` for standard catalogue views, expanding to `1360px` for the administration workspace.

- **Breakpoints**:
  - **Desktop (`>= 1024px`)**: 12 columns, `gutter: 1.5rem`, `margin: 2rem`. Allows three to four book cards per row or a split 4/8 column reading view.
  - **Tablet (`768px - 1023px`)**: 8 columns, `gutter: 1.25rem`, `margin: 1.5rem`. Adapts book listings to a dual-column layout.
  - **Mobile (`< 768px`)**: 4 columns, `gutter-mobile: 1rem`, `margin-mobile: 1rem`. Cards collapse into single-column vertical flows or horizontal listing strips.

Spacing adheres strictly to an 8-point baseline rhythm. Inner card padding leverages `space-lg` (`1.5rem`), while input field and pill paddings use `space-sm` (`0.5rem`) and `space-md` (`1rem`). Vertical cadence between narrative review paragraphs follows `space-md`.

## Elevation & Depth

Visual hierarchy rejects exaggerated drop shadows, opting instead for **tactile paper layering** and soft atmospheric diffusion:

- **Level 0 (Canvas)**: Background surface `#FAF7F2`. Completely flat, non-elevated.
- **Level 1 (Card Default & Table Cells)**: Surface `#FFFFFF` encased in a crisp `1px solid #E2D9CE` border. Elevated with an ambient diffusion: `0 1px 3px rgba(30, 41, 59, 0.04), 0 4px 12px rgba(194, 65, 12, 0.03)`.
- **Level 2 (Hover States, Popovers & Floating Search)**: `0 8px 24px rgba(30, 41, 59, 0.08), 0 2px 6px rgba(194, 65, 12, 0.05)`, border shifts subtly to `#D4C7B8`.
- **Level 3 (Modals & Overlays)**: Surface `#FFFFFF` supported by `0 20px 40px rgba(15, 23, 42, 0.14)`. Backdrop features a muted scrim of `#0F172A` at 40% opacity with a subtle `2px` blur.

## Shapes

The roundedness level is strictly set to **Level 2** (`0.5rem` / `8px` baseline). This gives components a soft, modern tactile edge without crossing into casual bubble silhouettes.

- **Base Radius (`rounded-md`, 0.5rem / 8px)**: Applied to text input fields, dropdown selects, review text areas, standard buttons, and book cover images.
- **Container Radius (`rounded-lg`, 1rem / 16px)**: Applied to review cards, catalog display cards, modal dialogues, and metric summaries.
- **Pill Exception**: Genre filter chips, user status tags, and search action boundaries use fully rounded pill structures (`rounded-full` / `9999px`) to emphasize their interactive and categorizing nature.

## Components

### Buttons
- **Primary**: Solid background `#C2410C`, text `#FFFFFF`, border `none`, border-radius `0.5rem`, padding `0.625rem 1.25rem`. Hover state transitions to `#9A3412`. Active state compresses slightly with a `1px` downward translate.
- **Secondary / Outline**: Background `transparent`, border `1px solid #E2D9CE`, text `#1E293B`. Hover shifts background to `#F5EFEB` with border color darkening to `#CBD5E1`.
- **Destructive**: Soft cream background with `#991B1B` border and text, shifting to solid crimson upon confirmation states.

### Genre Filter Chips
- Rendered with pill borders (`rounded-full`), `padding: 0.375rem 0.875rem`, typography `label-md`.
- **Default State**: Surface `#FFFFFF`, border `1px solid #E2D9CE`, text `#64748B`.
- **Selected State**: Background `#C2410C`, border `1px solid #C2410C`, text `#FFFFFF`.

### Search Bar
- Unified search unit with elevated Level 1 styling. Input height `48px`, background `#FFFFFF`, leading book or search icon in `#64748B`. Integrated trailing "Search" button in primary terracotta.

### Rating Indicators (5-Star Scale)
- Individual stars sized at `18px` (body review) or `24px` (featured overview).
- Filled state: `#D97706` (warm amber); unfilled state: `#E2D9CE`. Interactive stars on review submission forms utilize smooth scale transitions (`scale(1.15)`) on hover.

### Book Cards
- Built with a `#FFFFFF` body, `1px solid #E2D9CE` border, and `rounded-lg` wrapper.
- Contains a 3:4 aspect ratio book cover preview featuring `0.5rem` roundedness, title set in `headline-sm` (`Playfair Display`), author in `body-sm` (`#64748B`), and an amber rating indicator with a numerical counter.

### Review Cards
- Nested inside `#FFFFFF` containers with `1.5rem` padding.
- Top section includes a student avatar circle, reviewer name, graduation/semester badge, post date, and user rating. Body text is formatted in `body-lg` with `1.6` line-height for effortless reading.

### Form Inputs & Textareas
- Optimized for standard JSP/Servlet form targets (`action` and `method="POST"`).
- Background `#FFFFFF`, border `1px solid #E2D9CE`, border-radius `0.5rem`, inner padding `0.75rem 1rem`.
- Focus ring: `2px solid #C2410C` offset with `2px` white space. Error validation uses `#B91C1C` border with inline helper text below.

### Administrative Tables & Metric Cards
- **Metric Cards**: Cream-white cards displaying review totals, active users, and flagged content with small uppercase `label-sm` titles and bold `display-hero-mobile` figures in `#1E293B`.
- **Data Tables**: Striped alternating backgrounds (`#FFFFFF` to `#FAF7F2`), header row styled with `#1E293B` text over a subtle `#F5EFEB` bar, bounded by crisp horizontal borders (`#E2D9CE`).