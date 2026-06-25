# Technology Stack: Morning Mobility (Foldable)

This document maps out the specific technologies, frameworks, and libraries that constitute the Morning Mobility application, ensuring engineering alignment and consistency during development.

## 1. Frontend Core
- **React (v18+):** Leveraged for functional, hook-based components (`useState`, `useEffect`, `useCallback`) to build a reactive, single-page state-driven mobility app.
- **TypeScript (v5+):** Utilized for strict type safety, predictable interfaces, and robust compile-time contract checking in TSX files.

## 2. User Interface & Styling
- **Tailwind CSS (v3+ / v4+):** Employed for utility-first styling to build lightweight, highly customized components, animations, responsive spacing, and theme configurations.
- **Lucide React:** Used for high-quality, lightweight, consistent vector icons (Play, Pause, Skip, Vol, etc.) to support a clean, tactile user interface.

## 3. Media & Web APIs
- **Web Audio API:** Native browser API used to synthesize high-quality tone cues on-the-fly (with envelope gain ramps and custom oscillator wave types) to support a distraction-free, screen-free workout without downloading heavy audio files.
- **LocalStorage API:** Provides zero-dependency, permanent local persistence to track calendar dates, daily streaks, and completion sessions.
- **Service Worker API:** Core PWA technology to intercept network requests, cache the React single-page shell, styles, and assets, enabling instant, completely offline functionality.

## 4. Packaging & App Delivery
- **Progressive Web Application (PWA):**
  - Web Manifest (`manifest.json`) defines installability, custom branding colors, and app icons.
  - Responsive breakpoints tailored for mobile layout viewports (e.g., iPhone/Android sizes on the floor) as well as larger desktop monitors.
