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
- **Farcaster Mini App SDK (@farcaster/miniapp-sdk):** Deep client integration library for Frame v2, facilitating native initialization (`ready`), custom cast composition, and client navigation bookmarks.

## 4. Packaging & App Delivery
- **Progressive Web Application (PWA):**
  - Web Manifest (`manifest.json`) defines installability, custom branding colors, and app icons.
  - Responsive breakpoints tailored for mobile layout viewports (e.g., iPhone/Android sizes on the floor) as well as larger desktop monitors.

## 5. Server & Process Management (VPS Deployment)
- **Node.js / Express Server:** Lightweight static file server configured to host the static build and handle single-page application (SPA) routing with customized cache-control headers.
- **PM2 Process Manager:** Process manager used on the VPS to run, daemonize, and reload the server process, ensuring high availability and automatic startup on server reboots.
- **Nginx Reverse Proxy:** Serves as the primary public web server and reverse proxy, routing incoming traffic from `foldable.onfc.xyz` to the local Node.js port, implementing compression and performance headers.
- **Certbot (Let's Encrypt):** Utilized to obtain and automatically renew SSL/TLS certificates for the production domain, enforcing secure HTTPS redirection.
