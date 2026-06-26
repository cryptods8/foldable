# Implementation Plan: Farcaster Mini App Support

## Phase 1: Environment Setup & SDK Installation
- [x] Task: Install `@farcaster/miniapp-sdk` and update dev configuration
    - [x] Run `pnpm add @farcaster/miniapp-sdk` to install the SDK
    - [x] Run `pnpm run build` to verify compatibility and successful compilation
- [x] Task: Conductor - User Manual Verification 'Phase 1: Environment Setup & SDK Installation' (Protocol in workflow.md)

## Phase 2: Static Meta Configurations & Manifest Integration
- [x] Task: Define the Farcaster Manifest Schema
    - [x] Create `public/.well-known/farcaster.json` serving directory
    - [x] Populate `farcaster.json` with app details, logo url, calming green theme background, and placeholder signature
- [x] Task: Embed Farcaster meta tags
    - [x] Edit `index.html` to inject `fc:miniapp` and legacy `fc:frame` meta headers
    - [x] Verify static file serving via dev preview
- [x] Task: Conductor - User Manual Verification 'Phase 2: Static Meta Configurations & Manifest Integration' (Protocol in workflow.md)

## Phase 3: Core SDK Initialization & Ready Lifecycle
- [x] Task: Initialize Farcaster SDK on launch
    - [x] Update `src/App.tsx` (or `main.tsx`) to import the Farcaster SDK
    - [x] Await and resolve `sdk.context` and call `sdk.actions.ready()` to dismiss the Farcaster splash screen
    - [x] Save Farcaster-specific client metadata in React state for conditional actions
- [x] Task: Create standalone fallback check
    - [x] Implement conditional visibility of Farcaster components to hide them for regular browser users
    - [x] Verify no runtime errors when accessing the application through a normal browser
- [x] Task: Conductor - User Manual Verification 'Phase 3: Core SDK Initialization & Ready Lifecycle' (Protocol in workflow.md)

## Phase 4: UI Controls & Functional Actions
- [x] Task: Add Social Action UI Buttons
    - [x] Design and build Farcaster buttons inside the session completion viewport
    - [x] Style the buttons according to 'The Restorative Sanctuary' aesthetics
    - [x] Ensure layout fits without vertical overflows on compact mobile screens (iPhone SE)
- [x] Task: Implement Composer & Bookmark logic
    - [x] Wire up **Share Completion** button to trigger `sdk.actions.composeCast()` with dynamic streak info
    - [x] Wire up **Add to Farcaster** button to trigger `sdk.actions.addMiniApp()`
- [x] Task: Conductor - User Manual Verification 'Phase 4: UI Controls & Functional Actions' (Protocol in workflow.md)

## Phase: Review Fixes
- [x] Task: Apply review suggestions c7e538c
