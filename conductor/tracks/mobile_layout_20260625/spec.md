# Specification: Flawless Mobile Experience (iPhone SE support)

## 1. Overview
The goal of this track is to deliver a flawless mobile experience for the Morning Mobility web application. Currently, the UI has elements scaled for larger mobile displays, leading to vertical scrolling or layout overflow on small screens like the iPhone SE (320x568px to 375x667px). To maintain high visual elegance and eliminate scrolling, the application will use a dynamic full-viewport layout that fits the entire interface perfectly on any screen, dynamically scaling down fonts, margins, paddings, the progress ring, and the tutorial drawer when height constraints are tight.

## 2. Functional Requirements
- **No Scroll Viewport:** The entire application interface must be visible within a single screen viewport on all devices down to 320x568px (iPhone SE). There should be no vertical page scrolling.
- **Scalable Progress Ring:**
  - Standard/large screens: 256x256px (`w-64 h-64`).
  - Small/short screens (height < 680px): Scale down to 176x176px (`w-44 h-44`) or 192x192px (`w-48 h-48`).
- **Scalable SVG Visualizer:**
  - Standard/large screens: 80x80px (`w-20 h-20`).
  - Small/short screens: Scale down to 56x56px (`w-14 h-14`) or 48x48px (`w-12 h-12`).
- **Compressed Controls & Text:**
  - Reduce margins and paddings dynamically on height-constrained viewports.
  - Scale down heading and paragraph text slightly so everything is easily readable but compact.
- **Responsive Tutorial Drawer:**
  - The sliding drawer must use a tighter grid layout or tighter flex layout instead of vertical block margins when displayed on short screens.
  - Ensure the "How" and "Why" sections are presented in a compact layout with smaller text sizes (`text-xs` / `text-sm`) and smaller CTA button height so the entire drawer remains within the safe screen boundaries and does not require scrolling.

## 3. Non-Functional Requirements
- **Fluid & Seamless Transitions:** Resizing the browser window or rotating a device should smoothly transition between layout scales.
- **Performance:** Dynamic CSS scale overrides must be processed via CSS media queries to ensure smooth performance without causing React re-renders or layout thrashing.
- **Tailwind v4 Styling Guidelines:** Since Tailwind CSS v4 is used (`@import "tailwindcss"` in `index.css`), we will declare custom utility overrides in `src/index.css`.

## 4. Acceptance Criteria
- [ ] No vertical scroll bar appears on any viewport down to 320x568px (iPhone SE).
- [ ] The full circular timer ring, dynamic SVG animation, current step text, and control buttons are fully visible and perfectly aligned on an iPhone SE frame.
- [ ] The sliding Tutorial Drawer, when active, fits comfortably on an iPhone SE viewport and has a clearly visible and clickable "Got it, let's go!" button that doesn't overflow the screen.
- [ ] Swapping steps or toggling volume/tutorial settings operates smoothly with zero regressions.
- [ ] Static compiler type checking passes cleanly via `pnpm exec tsc --noEmit`.
- [ ] Production build succeeds with `pnpm run build`.

## 5. Out of Scope
- Redesigning the core mobility exercises or state machines.
- Adding physical landscape support overrides.
