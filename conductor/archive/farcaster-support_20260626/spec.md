# Specification: Farcaster Mini App Support (Track: farcaster-support)

## 1. Overview
This track introduces official support for Farcaster Mini Apps (Frame v2) in Foldable (Morning Mobility). This enables the app to run natively within Farcaster client webviews (Warpcast, etc.), allowing users to interact with Foldable without leaving their social feed, and allowing them to share their progress and add the application to their client bookmarks.

---

## 2. Functional Requirements

### 2.1 SDK Integration & Lifecycle
- Install the official `@farcaster/miniapp-sdk` package.
- On application mount, await/initialize the Farcaster SDK and trigger `sdk.actions.ready()`. This ensures the Farcaster splash screen disappears and reveals the loaded PWA.
- Gracefully detect if the app is running within a Farcaster client. If running in a regular web browser, Farcaster-specific UI controls should be hidden, with no console or runtime exceptions thrown.

### 2.2 Mini App Embed & Manifest Config
- Create a static Farcaster Manifest file served at `public/.well-known/farcaster.json`.
- Populate the manifest with compliant fields:
  - Name: "Foldable"
  - Description: "Interactive guided morning mobility routine for physical therapy & forward-fold progression."
  - Home URL & metadata
  - Splash Background Color: Calm therapeutic teal (`#0d151c` or `#f0f7f6` depending on default theme).
- Add the `fc:miniapp` and legacy `fc:frame` meta tags to the HTML head in `index.html`, including the stringified JSON metadata to support rich inline cards inside cast feeds.

### 2.3 Interactive Social Features (UI Controls)
- **Share Completion Action:**
  - Upon completing a mobility routine (or as an option in the progress/history section), show a sleek **Share Completion** button.
  - Clicking this button invokes `sdk.actions.composeCast({ text, embeds })` where the text includes a custom personalized message: e.g., `"I just completed my 🧘‍♂️ Morning Mobility session! Currently on a {currentStreak} day streak. #Foldable"`.
- **Add Mini App Shortcut:**
  - Introduce an elegant **Add to Farcaster** bookmark button (visible in Settings, Sidebar, or post-completion) that triggers `sdk.actions.addMiniApp()`. This allows users to add Foldable directly to their client navigation interface.

---

## 3. Design & Spacing Constraints (IMPECCABLE System)
- The UI controls must seamlessly blend with the existing "The Restorative Sanctuary" style (clean dark/teal physical therapy studio theme).
- Standardise on strict layout bounds: no screen overflows or scrolling during active routine, complying with portrait mobile viewports (e.g. iPhone SE height queries).
- Display numbers (timers, streaks) must strictly use tabular numerals (`font-variant-numeric: tabular-nums`).

---

## 4. Acceptance Criteria
- [ ] Serves a valid `farcaster.json` manifest at `/.well-known/farcaster.json`.
- [ ] `index.html` has compliant `fc:miniapp` stringified JSON headers.
- [ ] App launches smoothly in Farcaster developer playground and removes splash screen via `sdk.actions.ready()`.
- [ ] "Share Completion" button correctly invokes `composeCast` with streak info.
- [ ] "Add to Farcaster" button calls `addMiniApp` safely.
- [ ] Safe fallback handles standalone/web users without breaking the app.

---

## 5. Out of Scope
- Server-side Sign-in with Farcaster (SIWF) verification.
- Storage of Farcaster accounts/fids in a remote database (persisted offline in local-storage).
- Direct onchain transacting/tipping.
