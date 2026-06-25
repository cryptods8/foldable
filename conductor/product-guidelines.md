# Product Guidelines: Morning Mobility (Foldable)

These guidelines establish the user experience, styling principles, tone of voice, and accessibility requirements for the Morning Mobility application, ensuring a premium, therapeutic, and highly reliable companion.

## 1. Visual Style & Aesthetics

### 1.1 Color Palette
To support relaxation, focus, and recovery, the application utilizes a calming, harmonious, and highly deliberate color system:
- **Primary Slates & Off-Whites (Canvas):** Calming, clean backgrounds (`bg-slate-50`, `bg-white`) combined with crisp borders (`border-slate-100`) to create depth and structure.
- **Therapeutic Accents (Themed steps):** Soft, distinctive colors map to each movement to aid physical and mental transitions:
  - *Piriformis (Glutes):* Restful, clean blue (`text-blue-500`, `bg-blue-50`).
  - *Nerve Floss (Neural):* Deep, mindful indigo (`text-indigo-500`, `bg-indigo-50`).
  - *Glute Bridges (Activation):* Powerful, restoring purple (`text-purple-500`, `bg-purple-50`).
  - *Elevated Fold (Target Stretch):* Deep, calming teal (`text-teal-500`, `bg-teal-50`).
- **Feedback Accents:** Vibrant, encouraging green (`text-green-500`) for accomplishments and completion states.

### 1.2 Typography & Spacing
- **System:** Clean sans-serif font family (Inter, Outfit, or standard modern system sans-serif) to ensure high readability during physical exercise.
- **Hierarchy:** Strong typographic contrast with generous tracking adjustments on headings and bold, tabular numbers for timers to prevent digit-shifting layout shifts.
- **Spacing:** High breathing room, utilizing ample padding (`p-6` to `p-8`) and whitespace to reduce cognitive clutter.

### 1.3 Micro-Animations & Motion
- All state changes (e.g., background color changes during step transitions, SVG animations, play/pause state shifts) must utilize smooth transitions (`transition-all duration-300` to `duration-500`) to maintain a sense of fluid organic motion.
- SVG visualizer illustrations must represent movements slowly and smoothly to emulate correct stretching and flossing tempos.

---

## 2. User Experience (UX) Principles

### 2.1 Action Primacy
- Keep the main screen hyper-focused. The primary interactive element is the oversized **Play/Pause** button located centrally at the bottom.
- Action targets (buttons, links, controls) must have generous hit targets (minimum 48x48px, ideally 80x80px for the core toggle) to accommodate tap gestures when a user is stretching or has their phone on the floor.

### 2.2 Routine State Awareness
- Provide explicit, instantaneous feedback for every routine state:
  - **Active State:** Pulse or linear-rate animated circular progress ring; moving visualizer; ticking timer.
  - **Paused State:** Static progress ring, static visualizer, clear pause symbol.
  - **Inter-step Transitions:** Soft audio synth tone to signal the exact moment of a posture or leg switch.
  - **Completion State:** Celebratory, uncluttered screen with clear restart actions.

---

## 3. Tone of Voice & Copywriting

### 3.1 Therapeutic & Encouraging
- The copy should feel supportive, safe, and professional, echoing the guidance of a physical therapist or mobility specialist.
- Avoid using intense or aggressive fitness jargon (e.g., "push past limits", "no pain no gain"). Use gentle, precise cueing (e.g., "hinge at hips", "smooth motions", "without losing belly contact").

### 3.2 Bite-Sized Instructions
- Keep instruction descriptions brief (maximum 3–4 sentences).
- Break down movements into discrete, sequential steps using active, command-style verbs (e.g., "Sit", "Place", "Cross", "Rest"). This ensures users can scan and understand instructions instantly in a split second while holding a pose.

---

## 4. Accessibility (a11y) & Offline-First

### 4.1 Non-Visual Feedback
- Audio cues (synth-synthesized tones via Web Audio API) are a core accessibility requirement. They ensure the user can execute the entire routine without needing to look at their device screen constantly.
- Tones must be distinctive: a double-tone for half-way switches, a singular soft tone for step transitions, and a pleasant tri-tone chord for routine completion.

### 4.2 Contrast & Readability
- Large timer numbers (minimum 3rem height) with high color contrast against their backgrounds.
- High contrast icons from Lucide React to ensure absolute clarity of state buttons.

### 4.3 PWA Capabilities
- Manifest, cache configuration, and service workers must allow the application to load instantly offline without a network connection.
- Cache all core SVG assets, styling modules, and script scripts locally.
