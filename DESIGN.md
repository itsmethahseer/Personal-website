---
name: Luminous Professional
colors:
  surface: '#f9f9fd'
  surface-dim: '#d9dade'
  surface-bright: '#f9f9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f7'
  surface-container: '#eeedf2'
  surface-container-high: '#e8e8ec'
  surface-container-highest: '#e2e2e6'
  on-surface: '#1a1c1f'
  on-surface-variant: '#434656'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f0f0f4'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004dea'
  primary: '#0041c8'
  on-primary: '#ffffff'
  primary-container: '#0055ff'
  on-primary-container: '#e3e6ff'
  inverse-primary: '#b6c4ff'
  secondary: '#b90040'
  on-secondary: '#ffffff'
  secondary-container: '#e31754'
  on-secondary-container: '#fffbff'
  tertiary: '#00576c'
  on-tertiary: '#ffffff'
  tertiary-container: '#00718b'
  on-tertiary-container: '#c4eeff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b3'
  secondary-fixed: '#ffd9dc'
  secondary-fixed-dim: '#ffb2ba'
  on-secondary-fixed: '#400011'
  on-secondary-fixed-variant: '#910030'
  tertiary-fixed: '#b7eaff'
  tertiary-fixed-dim: '#4cd6ff'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'
  background: '#f9f9fd'
  on-background: '#1a1c1f'
  surface-variant: '#e2e2e6'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The design system is centered on a high-end, professional portfolio aesthetic that balances clinical precision with creative energy. It targets a sophisticated audience that values clarity, modernism, and attention to detail. 

The style is a refined **Light-Mode Glassmorphism** mixed with **Minimalism**. It utilizes expansive white space, ultra-thin hairlines, and soft backdrop blurs to create a sense of layering and depth without the weight of traditional shadows. The emotional response should be one of "digital freshness"—crisp, breathable, and highly intentional. The interface feels like a high-end gallery: a quiet, structured environment where content is the primary focus, punctuated by vibrant, energetic accents.

## Colors
This design system utilizes a high-contrast palette built on a foundation of "Pure White" (#FFFFFF) and "Cloud" (#F8F9FA) surfaces. 

- **Primary (Electric Blue):** Used for primary actions, active states, and critical navigation elements. It provides a sense of technological competence.
- **Secondary (Vibrant Crimson):** Reserved for highlights, special callouts, and expressive accents to prevent the UI from feeling too corporate.
- **Tertiary (Cyan Spark):** Used for subtle gradients, data visualization, and secondary interactive cues.
- **Neutral (Deep Charcoal):** A near-black navy (#121417) used for typography to ensure maximum readability and a premium feel, avoiding the "flatness" of pure black.

Surfaces use varying levels of opacity (80-95%) over background blurs to maintain the glassmorphism aesthetic in a light environment.

## Typography
The typography system is engineered for maximum clarity and a "tech-forward" editorial feel. 

- **Headlines:** Hanken Grotesk provides a sharp, contemporary geometric feel with tight letter spacing for a high-impact look in larger sizes.
- **Body:** Inter is used for its exceptional legibility and neutral character, ensuring long-form content is effortless to read.
- **Labels/Technical Data:** Geist is employed for UI small-print, buttons, and metadata, providing a precise, developer-centric aesthetic that complements the professional tone.

Use "Deep Charcoal" for all primary text. Use a 60% opacity variant for secondary text and 40% for disabled or placeholder states.

## Layout & Spacing
The layout follows a **Fluid Grid** philosophy within a maximum container width. We use an 8px base unit to maintain a rigorous mathematical rhythm.

- **Desktop:** 12-column grid with 24px gutters. Large 64px outer margins provide a "frame" for the content, enhancing the gallery feel.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px gutters.

Whitespace is treated as a functional element. Large vertical gaps (120px+) between sections are encouraged to allow the eye to rest and to signify clear conceptual shifts in the portfolio narrative.

## Elevation & Depth
In this light-mode execution, depth is achieved through **Tonal Layering and Glassmorphism** rather than heavy shadows.

- **Level 0 (Canvas):** The base background (#F8F9FA).
- **Level 1 (Card/Surface):** Pure White (#FFFFFF) with a 1px stroke in 5% Neutral. 
- **Level 2 (Glass):** Semi-transparent white (80% opacity) with a 20px backdrop blur. This is used for navigation bars and floating menus.
- **Level 3 (Overlay):** Used for modals. A soft, ultra-diffused shadow (0px 20px 40px rgba(0, 0, 0, 0.04)) is permitted here to lift the element off the page.

Borders are kept ultra-thin (1px) and use low-contrast greys to define boundaries without cluttering the visual field.

## Shapes
The shape language is "Calculated Softness." Elements use a **Rounded** (0.5rem) base corner radius, which strikes a balance between the rigidity of corporate design and the playfulness of consumer apps. 

- **Buttons & Small Components:** 8px (0.5rem)
- **Cards & Large Containers:** 16px (1rem)
- **Interactive Pill Elements:** 24px+ (1.5rem+) for chips and status indicators.

Avoid "Sharp" (0px) corners to maintain the approachable, modern feel of the design system.

## Components
- **Buttons:** Primary buttons use a solid Electric Blue fill with white Geist typography. Secondary buttons use a transparent background with a 1px stroke of the primary color.
- **Input Fields:** Use the "Canvas" color for the background with a 1px border. On focus, the border transitions to Electric Blue with a subtle 4px outer glow of the same color at 10% opacity.
- **Cards:** White backgrounds with 1px light grey strokes. When used as links, cards should have a subtle scale-up transform (1.02x) on hover.
- **Chips/Badges:** Small, pill-shaped elements using high-saturation background tints (10% opacity of the accent color) with full-saturation text for high legibility.
- **Navigation Bar:** Fixed at the top, utilizing the Glassmorphism effect (Backdrop Blur: 20px, Background: White @ 80%) with a single 1px bottom border to separate it from the content.
- **Lists:** Clean, borderless rows with 16px vertical padding, separated by 1px dividers in "Cloud" grey. Use chevron icons for navigational list items.