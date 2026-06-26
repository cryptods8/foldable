# Specification: VPS Deployment & Nginx Setup (`foldable.onfc.xyz`)

## 1. Overview
This track specifies the infrastructure, deployment workflow, and Nginx reverse proxy configuration required to host the Morning Mobility (Foldable) application on a Hetzner VPS under the domain `foldable.onfc.xyz`. The application will coexist with other services running on the VPS, using Nginx as the primary reverse proxy and SSL terminator.

---

## 2. Infrastructure & Environment
- **Target Host:** Hetzner Virtual Private Server (VPS) running Linux (e.g., Ubuntu).
- **Domain Name:** `foldable.onfc.xyz`
- **Reverse Proxy:** Nginx (already installed and managing other virtual hosts on the VPS).
- **Application Server:** A local Node.js server process (using PM2 as the process manager) running on a dedicated port (e.g., `3040`) to serve the compiled static files.
- **SSL/TLS:** Let's Encrypt certificates managed and auto-renewed via Certbot.

---

## 3. Functional Requirements

### 3.1 Local Server Implementation
- Create a lightweight Node.js static file server (e.g., using `express` or a custom `http` server) to serve the `dist/` production folder.
- Configure this server to run on a configurable port (default: `3040`) to prevent port conflicts on the VPS.
- Add PM2 configuration (`ecosystem.config.js`) to manage, monitor, and daemonize the Node.js process on the server.

### 3.2 VPS Git-Based Deployment Pipeline
- Establish a deployment directory structure on the VPS (e.g., `/var/www/foldable`).
- Clone the repository on the VPS (or fetch/pull latest changes from `main`).
- Execute dependency installation (`pnpm install`) and production build (`pnpm build`) directly on the server.
- Restart/reload the PM2 daemonized server process gracefully.

### 3.3 Nginx Reverse Proxy Configuration
- Create a new virtual host configuration block for Nginx under `/etc/nginx/sites-available/foldable.onfc.xyz`.
- Set up a reverse proxy pointing `http://foldable.onfc.xyz` to the local Node.js/PM2 server port (e.g., `http://127.0.0.1:3040`).
- Ensure Nginx configuration handles SPA fallback routing (routing all clean URLs to `index.html`).
- Enable symlink to `/etc/nginx/sites-enabled/` and verify configuration integrity.

### 3.4 SSL/TLS Automation (Certbot)
- Execute Certbot Nginx plugin on the VPS to request and apply a Let's Encrypt SSL certificate for `foldable.onfc.xyz`.
- Automatically configure standard HTTP-to-HTTPS redirection (port 80 to 443).
- Verify Let's Encrypt cronjob for auto-renewal is operational.

---

## 4. Non-Functional Requirements
- **Coexistence Safety:** Isolation of configurations. Do not touch or modify other existing virtual host files under `/etc/nginx/sites-enabled/`.
- **Zero-Downtime Reloads:** Use PM2 reload commands and `nginx -s reload` to ensure other running sites experience zero interruption.
- **Caching & Performance:** Configure Nginx/Node.js headers to support service-worker lifecycle (e.g., `Cache-Control: no-cache` for `index.html` and service worker file, aggressive caching for versioned assets).

---

## 5. Acceptance Criteria
1. **Domain Resolution:** Accessing `https://foldable.onfc.xyz` loads the fully functional PWA securely.
2. **SSL Encryption:** Valid TLS certificate with perfect A-grade SSL termination.
3. **PWA & SPA Support:** Refreshing the page on any sub-route (e.g., `/history`, `/onboarding`) loads the correct view without Nginx throwing a 404.
4. **Independent Process Management:** The app process is managed by PM2 and automatically spins up if the VPS reboots.
5. **No Interference:** All other existing websites on the Hetzner VPS remain fully active and unaffected.

---

## 6. Out of Scope
- Migrating other services/databases.
- Complex multi-region CD pipeline setups (GitHub actions/runners are out of scope as per user request to pull and build directly on VPS).
