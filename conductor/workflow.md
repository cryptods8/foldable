# Development Workflow: Morning Mobility (Foldable)

This document outlines the standard development process, branch management, quality gates, and deployment protocols for the Morning Mobility application. All changes must strictly follow this workflow.

## 1. Toolchain & Environments
- **Package Manager:** `pnpm` (required for all dependency management).
- **Development Bundler:** `Vite` (for ultra-fast Hot Module Replacement and light builds).
- **Runtime Environment:** React + TypeScript.
- **Core Commands:**
  - **Start Development Server:** `pnpm run dev`
  - **Build Production PWA Bundle:** `pnpm run build`
  - **Preview Production Build:** `pnpm run preview`

## 2. Git Branching Strategy (GitHub Flow)
To ensure rapid, clean, and reliable updates, we employ a short-lived branch workflow:
1. **Branch Creation:**
   - Always branch off of the `main` branch.
   - Use descriptive branch naming conventions: `feat/<feature-name>`, `fix/<bug-name>`, or `chore/<task-name>`.
2. **Development:**
   - Commit frequently with concise, clear, and descriptive commit messages (e.g., `feat: integrate Web Audio API synth tones`).
3. **Integration:**
   - Once a track is fully implemented and passes all verification gates, it must be merged back into `main`.

## 3. Verification & Quality Gates
Before any branch can be merged or declared complete, the developer (and Conductor) must satisfy the following Quality Gates:

### 3.1 Static Analysis & Compiler Checks
- **Type-Safety:** Ensure no TypeScript compiler errors exist. Run:
  ```bash
  pnpm exec tsc --noEmit
  ```
- **Linting & Formatting:** Keep the code formatting consistent using standard rules (e.g., ESLint / Prettier).

### 3.2 Manual Functional Walkthrough
Because there is **no automated testing** (unit/E2E/visual regression) in place for this stage of the project, thorough manual walkthroughs are the primary gatekeepers of production quality:
1. **Local Launch:** Spin up the dev server (`pnpm run dev`) and navigate to the application.
2. **Core Interactions Walkthrough:**
   - Verify that all mobility routine exercises render their corresponding SVG visualizers accurately.
   - Manually play, pause, skip, and rewind through the timer routine.
   - Verify the custom synthesized tones trigger exactly at the halfway switch points and completion states.
   - Test muting and unmuting audio functionality.
3. **Responsive Web Design Check:**
   - Inspect the application in multiple viewport aspect ratios (mobile phone views, tablet views, and desktop views) to ensure CSS/Tailwind layouts scale elegantly.
4. **Offline PWA Test:**
   - Test loading the application with disabled network throttling (simulated offline mode in DevTools) to ensure the service worker serves cached assets.

## 4. Feature Delivery Definition of Done (DoD)
A feature or bug fix track is considered "Done" when:
1. All changes are type-safe and compilation passes.
2. Code is formatted and free of syntax issues.
3. A manual walkthrough verifies the exact functionality requested without introducing UI or state-machine regressions.
4. The verified branch is merged back into `main`.

---

## 5. Phase Completion Verification and Checkpointing Protocol
This protocol is executed immediately after a task is completed that also concludes a phase in `plan.md`.

1. **Announce Protocol Start:** Inform the user that the active phase is complete and the verification protocol has begun.
2. **Type Checking & Linting:** Run static checks to ensure zero errors:
   ```bash
   pnpm exec tsc --noEmit
   ```
3. **Manual Functional Walkthrough:** Execute the complete manual walkthrough suite outlined in Section 3.2, validating every core user flow and visual asset of the phase.
4. **Checkpoint Commit:** Create a Git commit of the stable, verified state with a message formatted as `conductor(checkpoint): Phase <Phase Name> complete`.

