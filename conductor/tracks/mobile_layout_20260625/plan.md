# Implementation Plan - Flawless Mobile Experience

This plan details the steps required to achieve a gorgeous, scroll-free, full-screen mobile layout down to iPhone SE viewports.

## Phase 1: Custom CSS & Dynamic Height Breakpoints
Establish the foundation by defining custom height-based classes and layout-level constraints.

- [ ] Task: Define custom height-based CSS media queries in `src/index.css`.
  - [ ] Add `@media (max-height: 680px)` and `@media (max-height: 580px)` media rules to define compact overrides (e.g., shorter rings, smaller texts, tighter spacings).
  - [ ] Define container rules for dynamic viewport height (`h-[100dvh]` or `h-screen`).
- [ ] Task: Refactor the top-level viewport container in `src/App.tsx` to utilize `h-[100dvh]` or equivalent flex logic to lock the layout within the viewport bounds.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Custom CSS & Dynamic Height Breakpoints' (Protocol in workflow.md)

## Phase 2: Scale Down the Circular Timer & Inner SVG Visualizer
Scale components and compress typography/margins on short viewports to make the layout fit.

- [ ] Task: Make the Circular Timer Ring responsive to height.
  - [ ] Replace fixed `w-64 h-64` SVG size with dynamic sizing classes that map to the custom height breakpoints (e.g., scaling to `w-44 h-44` or `w-48 h-48`).
  - [ ] Adjust the radius and SVG coordinate mathematics to scale cleanly or use CSS-based SVG scaling.
- [ ] Task: Make the Inner SVG Visualizer responsive to height.
  - [ ] Replace fixed `w-20 h-20` on the visualizer box with height-based scale down (e.g., scaling to `w-12 h-12` or `w-14 h-14`).
- [ ] Task: Compress margins, padding, and text sizing in the card and header dynamically on small heights.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Scale Down the Circular Timer & Inner SVG Visualizer' (Protocol in workflow.md)

## Phase 3: Optimize Tutorial Drawer & Controls Layout
Compress the sliding tutorial drawer and button layout so they are fully visible.

- [ ] Task: Optimize the sliding onboarding drawer for short viewport heights.
  - [ ] Use a compact CSS grid layout or side-by-side presentation for the "How" and "Why" sections instead of stacking them with large vertical gaps.
  - [ ] Apply smaller text (`text-xs` / `text-sm`) and compress the CTA button padding on short screens.
- [ ] Task: Test and verify the PWA manifest and offline support to guarantee zero regressions.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Optimize Tutorial Drawer & Controls Layout' (Protocol in workflow.md)

## Phase 4: Production Compilation & Multi-Viewport Verification
Run compiler checks, create a production build, and perform visual verification.

- [ ] Task: Run type check check to ensure zero compilation issues.
  - [ ] Command: `pnpm exec tsc --noEmit`
- [ ] Task: Build the production bundle.
  - [ ] Command: `pnpm run build`
- [ ] Task: Conduct a thorough visual audit on simulated iPhone SE viewports and verified browsers.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Production Compilation & Multi-Viewport Verification' (Protocol in workflow.md)
