# Specification: Farcaster manifest and metadata optimization

## 1. Overview
This track focuses on finalizing the Farcaster Mini App and OpenGraph metadata configuration for Foldable. Since the application is now deployed live at `https://foldable.onfc.xyz/`, we must update all placeholder URLs, configure comprehensive OpenGraph and Twitter Cards metadata for premium social link previews, and modernize the standard PWA web manifest.

## 2. Functional Requirements

### 2.1 Domain & URL Transition
- Update all references of `foldable.app` to `foldable.onfc.xyz` inside:
  - Farcaster Manifest (`public/.well-known/farcaster.json`)
  - Legacy Frame metadata in `index.html`
  - Share templates / `composeCast` links in `src/App.tsx`

### 2.2 Farcaster Manifest (`farcaster.json`) Optimization
- Update the base64-encoded domain payload inside `accountAssociation` to represent `{"domain":"foldable.onfc.xyz"}`.
  - Value: `eyJkb21haW4iOiJmb2xkYWJsZS5vbmZjLnh5eiJ9` (which is `{"domain":"foldable.onfc.xyz"}`).
- Ensure all other `miniapp` fields (such as `homeUrl`, `iconUrl`, `imageUrl`, and `splashImageUrl`) reference the correct `foldable.onfc.xyz` URLs.

### 2.3 Comprehensive OpenGraph & Twitter Cards Meta Tags
- Inject or update the following standard meta tags in `index.html` inside the `<head>` tag:
  - `og:title` & `twitter:title`: `"Morning Mobility - Foldable"`
  - `og:description` & `twitter:description`: `"A calming morning stretch and physical therapy companion for deep hip and lower back relief."`
  - `og:image` & `twitter:image`: `"https://foldable.onfc.xyz/screenshot.png"`
  - `twitter:card`: `"summary_large_image"`
  - `og:url`: `"https://foldable.onfc.xyz/"`
  - `og:type`: `"website"`

### 2.4 Standard PWA Web Manifest (`manifest.json`) Synchronization
- Ensure the name and short_name inside `public/manifest.json` are clean and consistent:
  - `name`: `"Morning Mobility - Foldable"`
  - `short_name`: `"Foldable"`
  - Ensure theme and background colors match 'The Restorative Sanctuary' aesthetics.

## 3. Non-Functional Requirements
- **Validation**: All JSON manifest files must be strictly valid JSON.
- **Zero Redirection/Broken Links**: Ensure that all resource references are fully qualified HTTPS URLs or valid relative paths.
- **Consistency**: Keep all color tokens aligned with the visual constraints in `DESIGN.md`.

## 4. Acceptance Criteria
1. The Farcaster Manifest (`public/.well-known/farcaster.json`) is served successfully with `accountAssociation.payload` set to `eyJkb21haW4iOiJmb2xkYWJsZS5vbmZjLnh5eiJ9`.
2. The index HTML file (`index.html`) serves fully valid OpenGraph and Twitter Cards metadata targeting the `foldable.onfc.xyz` domain.
3. The PWA `manifest.json` utilizes the optimized short name `"Foldable"`.
4. Sharing actions in `src/App.tsx` now correctly share links to `https://foldable.onfc.xyz/`.
5. Static type-checking (`tsc --noEmit`) and bundle compilation (`pnpm run build`) pass without warnings or errors.
