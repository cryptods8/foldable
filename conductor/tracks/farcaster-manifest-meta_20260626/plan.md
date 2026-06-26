# Implementation Plan: Farcaster manifest and metadata optimization

## Phase 1: Domain transition and manifest updates
- [ ] Task: Refactor Farcaster Manifest (`public/.well-known/farcaster.json`)
    - [ ] Update `accountAssociation.payload` to `"eyJkb21haW4iOiJmb2xkYWJsZS5vbmZjLnh5eiJ9"` (representing `"foldable.onfc.xyz"`)
    - [ ] Update all URL fields to target `https://foldable.onfc.xyz/`
- [ ] Task: Refactor PWA Web Manifest (`public/manifest.json`)
    - [ ] Update `short_name` to `"Foldable"`
    - [ ] Ensure name is `"Morning Mobility - Foldable"`
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Domain transition and manifest updates' (Protocol in workflow.md)

## Phase 2: HTML Head Optimization (Meta Tags & OpenGraph)
- [ ] Task: Inject and verify OpenGraph/Twitter Cards metadata in `index.html`
    - [ ] Update `fc:miniapp` and `fc:frame` meta URLs to target `foldable.onfc.xyz`
    - [ ] Add OpenGraph properties: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
    - [ ] Add Twitter properties: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Task: Conductor - User Manual Verification 'Phase 2: HTML Head Optimization (Meta Tags & OpenGraph)' (Protocol in workflow.md)

## Phase 3: Source Code URL updates
- [ ] Task: Update share URLs in React source code (`src/App.tsx`)
    - [ ] Replace `https://foldable.app/` sharing URL with `https://foldable.onfc.xyz/` in composer action
- [ ] Task: Verify build and compile stability
    - [ ] Run `pnpm exec tsc --noEmit` and `pnpm run build` to confirm static checking passes cleanly
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Source Code URL updates' (Protocol in workflow.md)
