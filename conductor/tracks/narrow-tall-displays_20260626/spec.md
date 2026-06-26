# Specification: Mobile Layout Fixes (`narrow-tall-displays`)

## 1. Overview
This track addresses UI crowding, visual stretching, and horizontal clipping on narrow-and-tall mobile devices (e.g., aspect ratios of 19.5:9 or 21:9 like iPhone SE, iPhone 12/13/14/15 Pro/Mini, and standard 360px-wide Android screens). Currently, compact spacing is only triggered by height-based media queries (`@media (max-height: 680px)`). This specification introduces width-based responsive rules (`@media (max-width: 390px)`) to automatically adjust text sizes, SVGs, paddings, and margins on narrow viewports, ensuring a premium, scroll-free experience.

---

## 2. Responsive Styling Strategy
- **Primary Threshold:** Viewport widths `≤ 390px` will trigger the `.compact-*` styles.
- **Combined Media Queries:** In `src/index.css`, media queries will combine height and width thresholds to apply the compact design system:
  ```css
  @media (max-height: 680px), (max-width: 390px) { ... }
  ```
- **Container Constraining:** 
  - On viewports `<= 390px`, the app container takes `width: 100%` with zero border radius to maximize display area.
  - On larger viewports, the app container centers with a crisp `max-width: 448px` (`max-w-md`) and elegant rounded borders, maintaining "The Restorative Sanctuary" premium studio aesthetic.

---

## 3. Functional Requirements

### 3.1 Styling System Refactoring (`src/index.css`)
- Modify `@media (max-height: 680px)` to `@media (max-height: 680px), (max-width: 390px)` to apply layout, padding, margin, and typography scale compressions.
- Verify typography scales and padding adjustments to ensure text fits comfortably without clipping or pushing items off-screen.
- Adjust SVG timer and visualizer clamps:
  - SVG progress ring `.compact-timer-svg`: clamp the width/height to look proportional on narrow displays.
  - Ensure the internal SVG visualizer scaling handles narrow viewports perfectly.

### 3.2 Main Layout Adaptation (`src/App.tsx`)
- Ensure the main container incorporates the centered styling system.
- Audit current padding and margins on the main app shell and tutorial overlays to make sure they compress elegantly when the `.compact-*` classes are active.

---

## 4. Non-Functional Requirements
- **Viewport Constraints:** Strict adherence to portrait-locked, scroll-free PWA viewport constraints. No scrollbars are allowed during the active routine.
- **Visual Contrast:** Ensure tabular numbers and high-contrast styling tokens of "Impeccable" remain active under compact scaling.
- **Cross-Device Fidelity:** Fully responsive and pixel-perfect across:
  - iPhone SE (320x568px)
  - Standard smartphones (e.g., 360x800px, 390x844px)
  - Desktop viewports (displays centered app card)

---

## 5. Acceptance Criteria
1. **No Horizontal Overflow:** The page fits perfectly within viewports down to 320px wide with no horizontal scrolling or clipped buttons.
2. **Compact View Activation:** On screen widths `≤ 390px` (or height `≤ 680px`), elements automatically shrink to their compact, responsive values.
3. **No Vertical Scrolling:** The active routine remains 100% scroll-free on all tested mobile viewports (e.g., 320x568, 360x800, 390x844).
4. **Desktop Aesthetics:** On displays with width `> 390px` and height `> 680px`, the app renders as a centered, premium modal card (`max-w-md`) with soft shadow and borders.
