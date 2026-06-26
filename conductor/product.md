# Initial Concept
Extracted from code analysis of `forward_fold_routine_app.tsx` (Brownfield codebase): A React/TypeScript interactive mobility routine app for achieving a seated forward fold.

---

# Product Guide: Morning Mobility (Foldable)

## Vision & Concept
Morning Mobility is an interactive, guided stretching and physical therapy companion designed to help people achieve a deep, pain-free seated forward fold. By combining precise timing, step-by-step visual SVG animations, and soothing synthesized sound cues, the application guides users through a highly focused routine that targets the primary physiological limiters of forward fold mobility.

## Target Audience
- **Desk-Bound Professionals & Office Workers:** Individuals who spend long hours sitting and experience chronic hamstring stiffness, lower back tightness, and reduced pelvic mobility. The routine is optimized to fit seamlessly into their morning or workday-break routines.

## Core Goals
1. **Improve Forward Fold Flexibility:** Systematically target and stretch the calves, hamstrings, and glutes to increase range of motion and allow a deeper, safer hinge.
2. **Sciatic Nerve & Lower Back Relief:** Incorporate active nerve-flossing techniques to release neural tension, alleviate lower back tightness, and reduce sciatica-like symptoms caused by prolonged sitting.
3. **Immersive Audio-Visual Guidance:** Provide an engaging, sensory-guided experience using real-time SVG visualizers and synthesized sound triggers that signal key routine transitions.

## Key Features
- **Dynamic SVG Visualizer & Posture Tips:**
  - Interactive visual representations of each exercise, illustrating correct alignment and posture.
  - Smooth animation representing transitions or side-switching.
  - Integrated, real-time posture tips displayed alongside the active step (e.g., "Keep spine straight", "Glue belly to thighs").
- **Habit & History Tracking (Local-Storage):**
  - Offline-first calendar tracker to monitor daily mobility sessions.
  - Streak tracking (current and longest streaks) to encourage habit-building.
  - Session completion statistics and historical logs stored locally.
- **Customizable Session Controls:**
  - Start, pause, skip, and rewind routine steps.
  - Mute/unmute sound settings with clean, synthesized sound cues to signal halfway points and final step completion.
- **Interactive Onboarding & Tutorial Guide:**
  - Automatically enabled for first-time users to display a sliding overlay drawer before each exercise starts.
  - Shows clear, actionable postural walkthrough cues ("How") and physiological/neural benefits ("Why") to build user confidence.
  - Keeps the timer and routine paused until the user explicitly acknowledges and activates the exercise.
  - Easily toggled on or off directly from the header via an interactive Help icon, persisting preferences locally.

## Application Format
- **Progressive Web Application (PWA) & Farcaster Mini App:**
  - Fully responsive, mobile-first design optimized for touch screens, desktop viewports, and inline webviews inside Farcaster client feeds, with dynamic height-based scaling to guarantee a flawless, scroll-free portrait experience on compact screens like the iPhone SE.
  - Offline-first support utilizing local storage and a service worker to cache essential assets, animations, and sound routines.
  - Installable directly to mobile home screens, desktops, or bookmarks within Farcaster client interfaces for instant, app-like access.
- **Farcaster Mini App Integration (Frame v2):**
  - Fully integrated with the Farcaster ecosystem via `@farcaster/miniapp-sdk`.
  - Native initialization and splash screen handling, plus social completion sharing (`composeCast`) and client bookmarking (`addMiniApp`).
  - Secure fallback that keeps the app fully standalone and functional for regular browser visitors.
