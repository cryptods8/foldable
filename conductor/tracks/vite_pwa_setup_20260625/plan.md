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
- [~] Task: Conductor - User Manual Verification 'Environment & Toolchain Initialization' (Protocol in workflow.md)

---

## Phase 2: App Shell & Component Integration

- [ ] Task: Scaffold folder directory and entry files
    - [ ] Create directory structure: `src/` and `public/`
    - [ ] Relocate the standalone `forward_fold_routine_app.tsx` file to `src/App.tsx`
    - [ ] Create `src/main.tsx` as the React mounting entrypoint
    - [ ] Create `src/index.css` to import Tailwind directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`)
    - [ ] Create `index.html` at the root directory referencing `/src/main.tsx`
- [ ] Task: Verify and compile local build
    - [ ] Run typescript checks using `pnpm exec tsc --noEmit` to ensure type safety in `src/App.tsx`
    - [ ] Perform local production build test `pnpm run build` using Vite to check for compilation issues
- [ ] Task: Conductor - User Manual Verification 'App Shell & Component Integration' (Protocol in workflow.md)

---

## Phase 3: PWA Scaffolding & Offline Manifest

- [ ] Task: Set up Web Application Manifest
    - [ ] Create `public/manifest.json` with standalone display settings, brand theme colors, and basic icon definitions
- [ ] Task: Implement Offline Service Worker
    - [ ] Create a basic service worker script `public/sw.js` to cache the index shell and script assets
    - [ ] Add service worker registration block inside `src/main.tsx`
- [ ] Task: Verify final local PWA builds
    - [ ] Re-run full build compilation using `pnpm run build`
    - [ ] Launch Vite's production preview server using `pnpm run preview` and manually verify offline loading
- [ ] Task: Conductor - User Manual Verification 'PWA Scaffolding & Offline Manifest' (Protocol in workflow.md)
