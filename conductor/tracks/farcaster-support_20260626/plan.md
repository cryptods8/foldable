# Implementation Plan: Farcaster Mini App Support

## Phase 1: Environment Setup & SDK Installation
- [x] Task: Install `@farcaster/miniapp-sdk` and update dev configuration
    - [x] Run `pnpm add @farcaster/miniapp-sdk` to install the SDK
    - [x] Run `pnpm run build` to verify compatibility and successful compilation
- [x] Task: Conductor - User Manual Verification 'Phase 1: Environment Setup & SDK Installation' (Protocol in workflow.md)

## Phase 2: Static Meta Configurations & Manifest Integration
- [ ] Task: Define the Farcaster Manifest Schema
    - [ ] Create `public/.well-known/farcaster.json` serving directory
    - [ ] Populate `farcaster.json` with app details, logo url, calming green theme background, and placeholder signature
- [ ] Task: Embed Farcaster meta tags
    - [ ] Edit `index.html` to inject `fc:miniapp` and legacy `fc:frame` meta headers
    - [ ] Verify static file serving via dev preview
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Static Meta Configurations & Manifest Integration' (Protocol in workflow.md)

## Phase 3: Core SDK Initialization & Ready Lifecycle
- [ ] Task: Initialize Farcaster SDK on launch
    - [ ] Update `src/App.tsx` (or `main.tsx`) to import the Farcaster SDK
    - [ ] Await and resolve `sdk.context` and call `sdk.actions.ready()` to dismiss the Farcaster splash screen
    - [ ] Save Farcaster-specific client metadata in React state for conditional actions
- [ ] Task: Create standalone fallback check
    - [ ] Implement conditional visibility of Farcaster components to hide them for regular browser users
    - [ ] Verify no runtime errors when accessing the application through a normal browser
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Core SDK Initialization & Ready Lifecycle' (Protocol in workflow.md)

## Phase 4: UI Controls & Functional Actions
- [ ] Task: Add Social Action UI Buttons
    - [ ] Design and build Farcaster buttons inside the session completion viewport
    - [ ] Style the buttons according to 'The Restorative Sanctuary' aesthetics
    - [ ] Ensure layout fits without vertical overflows on compact mobile screens (iPhone SE)
- [ ] Task: Implement Composer & Bookmark logic
    - [ ] Wire up **Share Completion** button to trigger `sdk.actions.composeCast()` with dynamic streak info
    - [ ] Wire up **Add to Farcaster** button to trigger `sdk.actions.addMiniApp()`
- [ ] Task: Conductor - User Manual Verification 'Phase 4: UI Controls & Functional Actions' (Protocol in workflow.md)
