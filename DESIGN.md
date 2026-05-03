# Julien Mann — Design System

## Brand Tokens

### Color System (OKLCH-based)

**Core Palette**
```css
:root {
  /* Background: warm dark, almost black */
  --bg: #0d0b09;                 /* L90 / L80 equivalent */
  
  /* Foreground: warm off-white */
  --fg: #ede8d5;                /* L10 / L15 equivalent */
  
  /* Mid-tone: muted brownish-gray */
  --mid: #8a7f6e;              /* L45-50 */
  
  /* Accent: warm gold/amber */
  --accent: #c4922a;           /* Brand signature color */
  
  /* Tinted surface: deeper version of bg */
  --light: #1a1712;            /* L75 */
  
  /* Rule: subtle border color */
  --rule: rgba(237, 232, 213, 0.1);
  
  /* Rule + accent: softer accent borders */
  --rule-accent: rgba(196, 146, 42, 0.35);
}
```

**Neutral Scale (tinted toward warm brown)**
```
- bg     #0d0b09  (L85)  Primary background
- light  #1a1712  (L70)  Cards, modals
- fg     #ede8d5  (L93)  Primary text
- mid    #8a7f6e  (L50)  Secondary text, borders
- accent #c4922a  (L40)  CTAs, highlights
```

**Usage Guidelines**
- Never use pure #000 or #fff — always tint toward warm brown
- Foreground: --fg for primary, --mid for secondary
- Accent reserved for: CTAs, links, focus states, the gold accent
- --rule for subtle borders (1px opacity 0.1)
- --rule-accent for accent-related borders (opacity 0.35)

### Typography Scale

**Font Families**
```
--bebas: 'Bebas Neue', sans-serif;    /* Display, oversized headers */
--serif: 'Playfair Display', serif;   /* Elegant italic accents, quotes */
--mono: 'IBM Plex Mono', monospace;   /* Body copy, UI text */
```

**Scale (1.25 ratio for clear hierarchy)**
```
masthead-name     14rem (L7)  — Bebas, centered, massive
editorial-hed     2.6rem    — Playfair italic, section headers
modal-title       2.8rem    — Bebas, modal headers
retro-cta-label   0.64rem   — Mono, uppercase UI text
form-label        0.58rem   — Mono, uppercase labels
form-input        0.82rem   — Mono, readable body
```

**Line Length**
- Max 65-75ch for readability
- Current: constrained by editorial grid (7fr column)
- Body text line-height: 2.05 (relaxed, editorial feel)

### Elevation

**Z-Index Scale**
```
noise           9990      — Full-page overlay
cursor          9999      — Interactive element
modal-overlay   8000      — Dimmed backdrop
modal           8001      — Modal panel
fixed-ui        500       — Hire button, lang toggle
masthead        1         — Primary content
```

**Backdrop Blur**
```
- Default: 8px (hire-btn, UI controls)
- Modal open: 6px
- Noise: 0px (intentionally raw)
```

### Spacing System

**Rhythm Variations**
```
0.55rem   — Tight (rule-band gaps)
0.6rem    — Compact (form groups)
0.75rem   — Default (photo captions)
0.85rem   — Comfortable
0.9rem    — Section separation
1.6rem    — Visual break (dinkus spacing)
2.5rem    — Major section gap
2.8rem    — CTA spacing
3rem    — Horizontal padding (desktop)
```

**Padding Strategy**
- Masthead: 5.5rem top / 3rem horizontal
- Editorial: 3rem horizontal, photo column 2.5rem internal
- Footer: 3rem horizontal
- Modal: 3rem internal, 92vw width (mobile: 2rem padding, 92vw)

### Component Specs

**Cursor System**
- Desktop-only custom cursor (hidden on touch)
- Core dot: 10px → 5px (hover) → 16px (click)
- Ring: 32px → 48px (hover), opacity 0.45 → 0.2
- Smooth transitions: 0.2s / 0.3s

**Modal**
- Triggered via "Contact Me" button (top-right fixed)
- Close: X button, overlay click, Escape key
- Confirmation: Web3Forms success state
- Form fields: Bottom border only (no box), focus: accent underline

**CTAs (retro-cta)**
- Border-only style, transparent background
- Hover: Fills with accent, text inverts
- Arrow icon for directional cue
- Minimal padding (.75rem / 1.6rem)

**Qualities Word Cloud**
- Absolute positioned spans
- Opacity animates between visibility states
- Words cycle every 2.6-3.6s
- Shuffle prevents repetition

**Photo Treatment**
- Filter: grayscale(18%) sepia(22%) contrast(1.07) brightness(.9)
- Outline: 1px solid rgba(196,146,42,.2), offset -8px
- Frame: <figure> with caption <figcaption>

**Noise Texture**
- SVG turbulence filter, 4 octaves
- 0.06 opacity, repeat background
- 128px size for film grain feel

### Breakpoints

```
Desktop:   > 768px (full cursor, 3rem padding)
Tablet:    768px (reduced padding, single column photo)
Mobile:    < 600px (quality slots adjust, cursor hidden)
```

### Animation Guidelines

**Motion Philosophy**
- Purposeful only (cursor, modal transitions)
- Ease-out-quart for exponential decay
- No layout animations that cause jank
- Bounce/elastic avoided (too playful for brand)

**Timing**
- Cursor: 0.2s / 0.3s (instant feel)
- Modal: 0.35s (sustained entrance)
- Qualities: 0.5s fade, 2.6-3.6s cycles
- Stagger: 60-120ms between elements

**Transitions**
- Background: 0.25s (UI states)
- Opacity: 0.5s (qualities fade)
- Transform: 0.35s (modal translate)

### Absolute Bans

**Never:**
- Gradient text (background-clip: text)
- Side-stripe borders > 1px
- Glassmorphism as default
- Hero-metric template
- Identical card grids
- Modals as default (use inline alternatives)
- Em-dashes (use commas/colons instead)
- References to "this project" in copy

### Register

**Type:** Brand (personal portfolio)
**Commitment:** Full palette (accent used deliberately, not restrained)
**Theme:** Dark (intentional: "glancing at work in dim room at 2am")

**Scene:** A photographer, climber, storyteller presenting curated work. Not a SaaS, not a corporate page. An editorial page about a person.
