# Implementation Plan: Farcaster manifest and metadata optimization

## Phase 1: Domain transition and manifest updates
- [x] Task: Refactor Farcaster Manifest (`public/.well-known/farcaster.json`)
    - [x] Update `accountAssociation.payload` to `"eyJkb21haW4iOiJmb2xkYWJsZS5vbmZjLnh5eiJ9"` (representing `"foldable.onfc.xyz"`)
    - [x] Update all URL fields to target `https://foldable.onfc.xyz/`
- [x] Task: Refactor PWA Web Manifest (`public/manifest.json`)
    - [x] Update `short_name` to `"Foldable"`
    - [x] Ensure name is `"Morning Mobility - Foldable"`
- [x] Task: Conductor - User Manual Verification 'Phase 1: Domain transition and manifest updates' (Protocol in workflow.md)

## Phase 2: HTML Head Optimization (Meta Tags & OpenGraph)
- [x] Task: Inject and verify OpenGraph/Twitter Cards metadata in `index.html`
    - [x] Update `fc:miniapp` and `fc:frame` meta URLs to target `foldable.onfc.xyz`
    - [x] Add OpenGraph properties: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
    - [x] Add Twitter properties: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [x] Task: Conductor - User Manual Verification 'Phase 2: HTML Head Optimization (Meta Tags & OpenGraph)' (Protocol in workflow.md)

## Phase 3: Source Code URL updates
- [x] Task: Update share URLs in React source code (`src/App.tsx`)
    - [x] Replace `https://foldable.app/` sharing URL with `https://foldable.onfc.xyz/` in composer action
- [x] Task: Verify build and compile stability
    - [x] Run `pnpm exec tsc --noEmit` and `pnpm run build` to confirm static checking passes cleanly
- [x] Task: Conductor - User Manual Verification 'Phase 3: Source Code URL updates' (Protocol in workflow.md)
