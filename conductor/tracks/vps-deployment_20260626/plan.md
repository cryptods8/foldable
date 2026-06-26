# Implementation Plan: VPS Deployment & Nginx Setup (`foldable.onfc.xyz`)

## Phase 1: Local Server Setup

- [x] Task: Implement Local Application Server
    - [x] Create a lightweight Node.js/Express server script `scripts/serve.js` (or similar) to serve the static `dist/` directory.
    - [x] Register `express` as a dependency in the project `package.json` for serving files.
    - [x] Create a PM2 ecosystem configuration file `ecosystem.config.cjs` configured with process name, port (default `3040`), and env variables.
    - [x] Verify local server behaves correctly by running `pnpm build` followed by a local server run.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Local Server Setup' (Protocol in workflow.md)

## Phase 2: VPS Preparation & Nginx Configuration

- [x] Task: Define Nginx Configuration & VPS Folder Structure
    - [x] Create a blueprint Nginx configuration file `nginx.conf` (located at `scripts/nginx.conf`) for `foldable.onfc.xyz` that forwards traffic to port `3040` with correct SPA clean URL rewriting.
    - [x] Add caching rules in the Nginx blueprint (e.g., no-cache for index.html/service-worker, high cache headers for versioned assets).
    - [x] Prepare the VPS directory structure guidelines (e.g., `/var/www/foldable` detailed in `DEPLOYMENT.md`).
- [x] Task: Conductor - User Manual Verification 'Phase 2: VPS Preparation & Nginx Configuration' (Protocol in workflow.md)

## Phase 3: Deployment, Process Management & SSL Integration

- [x] Task: Live VPS Setup & Application Launch
    - [x] Document SSH/Clone steps on Hetzner VPS (detailed in `DEPLOYMENT.md`).
    - [x] Perform live git clone/pull, `pnpm install`, and `pnpm build` directly on the server (documented in `DEPLOYMENT.md`).
    - [x] Spin up the PM2 daemonized server process on the VPS and configure it to persist on server reboots (using `ecosystem.config.cjs`).
- [x] Task: Nginx Activation & Certbot SSL
    - [x] Copy the Nginx configuration to `/etc/nginx/sites-available/foldable.onfc.xyz` on the VPS, enable it, and reload Nginx (blueprint in `scripts/nginx.conf`).
    - [x] Execute Certbot with the Nginx plugin on the VPS to obtain and integrate Let's Encrypt SSL certificates for `foldable.onfc.xyz`.
    - [x] Perform a final manual walkthrough verification of the live domain `https://foldable.onfc.xyz`.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Deployment, Process Management & SSL Integration' (Protocol in workflow.md)
