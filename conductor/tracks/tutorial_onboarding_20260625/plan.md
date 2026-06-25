# Implementation Plan: Interactive Exercise Tutorial Explanations

## Phase 1: Extend Data Model and Configuration
- [ ] Task: Update the `ROUTINE` constant in `src/App.tsx`
    - [ ] Add `how` and `why` string properties containing the customized physical/physiological instructions for each of the 4 exercises.
- [ ] Task: Ensure TypeScript interfaces are fully updated and strict
    - [ ] Declare appropriate strict types for the routine object, resolving any TS warnings or implicit `any` definitions.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Extend Data Model and Configuration' (Protocol in workflow.md)

## Phase 2: Build Tutorial Mode State and Toggle UI
- [ ] Task: Add LocalStorage-backed Tutorial Mode state in `src/App.tsx`
    - [ ] Initialize `tutorialMode` state using a default value of `true` if `foldable_tutorial_mode` is not in LocalStorage.
    - [ ] Create a helper to synchronize `tutorialMode` changes to LocalStorage.
- [ ] Task: Add Header Toggle Icon
    - [ ] Import `HelpCircle` icon from `lucide-react`.
    - [ ] Place the toggle button adjacent to the sound toggle in the header.
    - [ ] Style the button with distinct active/inactive states (e.g., emerald green or rich blue when tutorial is ON, standard slate-400 when OFF) and hover tooltips.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Build Tutorial Mode State and Toggle UI' (Protocol in workflow.md)

## Phase 3: Implement Sliding Drawer Overlay & State-Machine Integration
- [ ] Task: Introduce Step-Level Tutorial Drawer State
    - [ ] Add a `showTutorial` state variable (boolean) to track whether the explanation drawer is active for the current step.
- [ ] Task: Hook into the State Transitions to Pause Timer and Trigger Drawer
    - [ ] Modify step change handlers (`setCurrentStepIndex`, `handleNext`, `handlePrev`, `resetRoutine`) to automatically set `showTutorial = tutorialMode` and `isActive = false` upon entering any step.
    - [ ] Ensure that if `tutorialMode` is `false`, the steps transition directly with standard timer behavior.
- [ ] Task: Construct the Slide-Up Drawer Component & JSX
    - [ ] Position the drawer container absolutely within the relative parent card frame (`absolute bottom-0 left-0 right-0 z-20`).
    - [ ] Style using pure Tailwind for transitions (`transition-transform duration-500 transform`, switching between `translate-y-full` and `translate-y-0` based on `showTutorial`).
    - [ ] Apply elegant styling: a subtle semi-transparent white card background, backdrop-blur, prominent bold headings, and clean grid layouts for **How** and **Why** sections.
    - [ ] Display an acknowledgment CTA button (`"Got it, let's go!"`) styled dynamically with the exercise's custom theme background color.
- [ ] Task: Handle Acknowledgment Action
    - [ ] Implement click handler on the button to close the drawer (`showTutorial = false`), activate the timer (`setIsActive(true)`), and call `initAudio()` so synth audio cues play correctly.
- [ ] Task: Handle Routine Completion Auto-Disable
    - [ ] In the routine completion screen rendering block, when writing completion states, set `foldable_has_completed_once` to `true` and toggle `tutorialMode` to `false` in both state and LocalStorage.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Implement Sliding Drawer Overlay & State-Machine Integration' (Protocol in workflow.md)

## Phase 4: Run Static Checks & Final Walkthrough Verification
- [ ] Task: Static Code Quality Checks
    - [ ] Run typescript type compiler to guarantee type-safety: `pnpm exec tsc --noEmit`.
- [ ] Task: Complete Functional Walkthrough
    - [ ] Verify that first-time loading renders the tutorial drawer paused while the SVG visualizer loops.
    - [ ] Verify that the header toggle can disable/enable the drawer dynamically.
    - [ ] Verify that starting the exercise plays sound successfully when the timer ticking begins.
    - [ ] Verify that finishing the routine once disables tutorial mode by default, persisting correctly across page reloads.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Run Static Checks & Final Walkthrough Verification' (Protocol in workflow.md)
