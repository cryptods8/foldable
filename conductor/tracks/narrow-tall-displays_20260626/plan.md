# Implementation Plan: Mobile Layout Fixes (`narrow-tall-displays`)

## Phase 1: Stylesheet Refactoring

- [ ] Task: Update CSS Media Queries in `src/index.css`
    - [ ] Modify `@media (max-height: 680px)` to include `(max-width: 390px)` as an alternative trigger.
    - [ ] Ensure any subsequent height overrides (like `@media (max-height: 580px)`) also incorporate narrower widths (e.g. `(max-width: 340px)`) if necessary, or let them trigger on height.
    - [ ] Verify that all compact classes (`.compact-container`, `.compact-header-p`, `.compact-timer-svg`, etc.) are activated properly.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Stylesheet Refactoring' (Protocol in workflow.md)

## Phase 2: App Sizing & Layout Polish

- [ ] Task: Audit Main App Layout Sizing
    - [ ] Check `src/App.tsx` container layout styling and ensure it coordinates perfectly with `.compact-container` and other styling classes.
    - [ ] Review padding, flex-grow, and margin behaviors to prevent vertical crowding on moderately tall but narrow displays (like iPhone 13 Pro at 390x844px).
    - [ ] Review the tutorial onboarding drawer spacing to make sure it handles width scaling smoothly on narrow screens.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: App Sizing & Layout Polish' (Protocol in workflow.md)
