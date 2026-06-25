# Implementation Plan: Initialize Vite and PWA scaffolding with pnpm

This plan outlines the specific steps required to initialize a local Vite development server, configure pnpm dependencies, relocate the existing mobility component, and establish a Progressive Web App (PWA) with offline capabilities.

---

## Phase 1: Environment & Toolchain Initialization

- [x] Task: Initialize pnpm environment and install core packages
    - [x] Execute `pnpm init` in the root directory to generate a package.json
    - [x] Install React 18 dependencies: `pnpm add react react-dom` and Lucide icons `pnpm add lucide-react`
    - [x] Install dev dependencies: `pnpm add -D vite typescript @types/react @types/react-dom tailwindcss postcss autoprefixer`
- [x] Task: Configure TypeScript compiler
    - [x] Create `tsconfig.json` in the root directory with modern, robust react configurations
- [x] Task: Configure Tailwind CSS and PostCSS
    - [x] Configure Tailwind CSS v4 using @tailwindcss/vite in vite.config.ts
- [x] Task: Conductor - User Manual Verification 'Environment & Toolchain Initialization' (Protocol in workflow.md)

---

## Phase 2: App Shell & Component Integration

- [x] Task: Scaffold folder directory and entry files
    - [x] Create directory structure: `src/` and `public/`
    - [x] Relocate the standalone `forward_fold_routine_app.tsx` file to `src/App.tsx`
    - [x] Create `src/main.tsx` as the React mounting entrypoint
    - [x] Create `src/index.css` to import Tailwind directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`)
    - [x] Create `index.html` at the root directory referencing `/src/main.tsx`
- [x] Task: Verify and compile local build
    - [x] Run typescript checks using `pnpm exec tsc --noEmit` to ensure type safety in `src/App.tsx`
    - [x] Perform local production build test `pnpm run build` using Vite to check for compilation issues
- [x] Task: Conductor - User Manual Verification 'App Shell & Component Integration' (Consolidated with Phase 3)

---

## Phase 3: PWA Scaffolding & Offline Manifest

- [x] Task: Set up Web Application Manifest
    - [x] Create `public/manifest.json` with standalone display settings, brand theme colors, and basic icon definitions
- [x] Task: Implement Offline Service Worker
    - [x] Create a basic service worker script `public/sw.js` to cache the index shell and script assets
    - [x] Add service worker registration block inside `src/main.tsx`
- [x] Task: Verify final local PWA builds
    - [x] Re-run full build compilation using `pnpm run build`
    - [x] Launch Vite's production preview server using `pnpm run preview` and manually verify offline loading
- [x] Task: Conductor - User Manual Verification 'PWA Scaffolding & Offline Manifest' (Consolidated)
