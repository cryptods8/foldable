# Specification: Interactive Exercise Tutorial Explanations

## 1. Overview
To improve user onboarding and physical execution, Morning Mobility will introduce an interactive, sliding "How & Why" tutorial drawer for each of the 4 exercises in the routine.
- For first-time users, the tutorial mode is **enabled by default**.
- Before each exercise begins, a slide-up drawer displays a physical cue walkthrough ("How") and physiological benefit explanation ("Why").
- The timer remains paused, and the routine does not start until the user explicitly acknowledges the info by clicking **"Got it, let's go!"**.

## 2. Functional Requirements
### 2.1 Tutorial Mode State & Persistence
- **State Flag:** Store `tutorialMode` state as a boolean.
- **LocalStorage Persistence:**
  - Persist `tutorialMode` under the key `foldable_tutorial_mode`.
  - Default value is `true` if not found in LocalStorage (first-time user).
  - Automatically flip `tutorialMode` to `false` (and set `foldable_has_completed_once` to `true`) when the user finishes the routine (reaches the **Routine Complete** screen).
- **Header Toggle Control:**
  - Add an interactive button next to the sound mute button in the main card header using a Lucide icon (`HelpCircle`).
  - Toggling this button switches `tutorialMode` between `true` and `false` immediately and saves the state to LocalStorage.
  - Render an active/inactive visual state for the toggle button (e.g., colored when active, subtle outline when inactive) to show if explanations are enabled.

### 2.2 Pre-Exercise Onboarding Flow & Timer Logic
- When a step starts (either initially, on skip-forward, or on rewind):
  - If `tutorialMode` is `true` AND the current step hasn't been acknowledged yet:
    - Set the overlay drawer state to **Open**.
    - The exercise timer is **paused** (`isActive = false`).
    - The SVG visualizer **remains active/animating** in the background, allowing the user to watch the movement loop while reading the instructions.
  - When the user clicks the **"Got it, let's go!"** button:
    - Close the overlay drawer.
    - Set `isActive` to `true` (timer starts ticking, and synthesized audio triggers resume).
  - If `tutorialMode` is `false`, the step starts immediately with `isActive = true` (or remains paused if they manually paused, matching the baseline behavior).

### 2.3 Sliding Drawer Sheet UI/UX
- **Placement:** Positioned within the main card, sliding up from the bottom boundary.
- **Aesthetics:**
  - Glassmorphic or solid clean white panel with a subtle border and top-shadow.
  - Clear sections for **How to do it** (with postural cues) and **Why it works** (with physiological and neural insights).
  - Beautiful visual hierarchy using Tailwind classes: custom accent text colors (matching the exercise's specific theme color, e.g., blue for piriformis, indigo for nerve-floss).
- **Control CTA:** A prominent, full-width button at the bottom of the drawer styled in the active exercise's theme color to acknowledge and start the exercise.

## 3. Data Dictionary: How & Why Content
We will extend the `ROUTINE` configuration with detailed `how` and `why` data fields:

1. **Piriformis Release**
   - **How:** Sit on the floor. Place a massage ball under your right glute. Cross your right ankle over your left knee. Rest weight on a tender spot. Switch sides halfway (at 30s).
   - **Why:** Releasing the piriformis muscle reduces deep glute tightness, relieves pressure on the sciatic nerve (which runs directly underneath or through the muscle), and improves external hip rotation, preparing your hips for pelvic hinging.

2. **Seated Nerve Floss**
   - **How:** Sit on a chair, slump mid-back, tuck chin. Slowly straighten right leg while looking UP. Bend knee while tucking chin DOWN. Smooth motions. Switch legs at 30s.
   - **Why:** Nerve flossing (neural gliding) gently stretches and releases tension along the sciatic nerve pathway. Rather than stretching a muscle, it helps the nerve slide smoothly through its surrounding tissues, reducing neural tightness and lower back stiffness.

3. **Glute Bridges**
   - **How:** Lie on your back, knees bent. Drive through heels to lift hips. Squeeze glutes hard at the top for 1 second, then lower slowly. Repeat for 60 seconds.
   - **Why:** Strengthening the glutes provides reciprocal inhibition to the hip flexors and hamstrings, causing them to naturally relax and lengthen. It also stabilizes the pelvis and lower back, facilitating a safer, deeper hip hinge during forward folds.

4. **Elevated Belly-to-Thigh Fold**
   - **How:** Sit on a yoga block/book. Bend knees generously. Hinge at hips to glue your belly to your thighs. Slowly slide heels out until you feel a stretch, without losing belly contact.
   - **Why:** Elevating the pelvis tilts it forward, encouraging a true hip hinge rather than rounding the lower back. Keeping the belly in contact with the thighs ensures your lumbar spine remains protected and straight, shifting the entire stretch into the hamstrings and calves where it belongs.

## 4. Technical Constraints
- **React 18/TypeScript 5:** Pure functional component state hooks, no strict compiler warnings.
- **Tailwind CSS Utility Classes:** Leverage transitions and absolute positioning inside relative card container for smooth drawer action.
- **No `any` types:** Follow GTS TypeScript coding standard. Ensure all custom state has exact type declarations.
- **No breaking changes:** Audio cues, history logs, and skip/rewind controls must remain completely intact.
