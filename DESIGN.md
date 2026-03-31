# Design System Strategy: The Forensic Architect

## 1. Overview & Creative North Star
**Creative North Star: "The Terminal Sublime"**
This design system moves beyond the cliché "hacker" aesthetic of scrolling green code. Instead, it adopts the persona of a high-end, digital forensic architect: precise, cold, and authoritative. We are building a space that feels like a redacted government document viewed through a high-resolution tactical HUD.

To break the "template" look, we reject standard symmetrical grids. Layouts should utilize **intentional asymmetry**—heavy left-aligned typography contrasted against expansive "void" spaces on the right. Elements should overlap slightly (e.g., a monospace label bleeding over the edge of a container) to suggest a sophisticated, non-linear data environment. The use of a subtle film grain overlay and horizontal scanlines (at 3% opacity) is mandatory to provide a tactile, "analog-digital" depth that flat UI lacks.

---

## 2. Colors
Our palette is rooted in the "deep void," where legibility is maintained through high-contrast luminance rather than color variety.

*   **Primary (#a9ffdf) & Secondary (#4bfce0):** These are your "active data" signals. Use them sparingly. They represent the pulse of the system—CTAs, status indicators, and critical forensic findings.
*   **Surface Hierarchy & Nesting:** We avoid flat layouts by treating the UI as a series of recessed or elevated data "decks."
    *   **Background (#090f13):** The base level "The Void."
    *   **Surface-Container-Low (#0e1419):** For secondary utility sections.
    *   **Surface-Container-Highest (#1e272d):** For the most critical interactive panels.
*   **The "No-Line" Rule:** Standard 1px solid borders are strictly prohibited for sectioning. Define boundaries through background shifts or "Light-Leaks." A section transition should be felt via a shift from `surface` to `surface-container-low`, not a line.
*   **The "Glass & Gradient" Rule:** Main CTAs must use a linear gradient from `primary` to `primary-container`. For floating HUD elements, apply a `backdrop-blur` of 12px-20px with a `surface_variant` fill at 40% opacity to create a "frosted terminal" effect.

---

## 3. Typography
The typographic soul of this system lies in the tension between the brutalist weight of **Syne** and the analytical precision of **JetBrains Mono**.

*   **Display & Headline (Syne):** Use `display-lg` (3.5rem) with an 800 weight for hero sections. It should feel heavy, imposing, and undeniable. Letter spacing should be set to -0.02em to increase the "block" feel.
*   **Labels & Metadata (JetBrains Mono):** Use `label-md` for all technical data, tags, and timestamps. This font carries the "forensic" identity. Always set to uppercase with +0.05em tracking.
*   **Body (Inter):** The "Workhorse." Used for long-form case studies. Inter provides the modern, neutral balance needed to ensure the "cyber" aesthetic doesn't compromise readability.

---

## 4. Elevation & Depth
In a dark, futuristic system, shadows don't look like shadows; they look like **Tonal Glows**.

*   **The Layering Principle:** Achieve depth by stacking tiers. Place a `surface-container-lowest` (#000000) card inside a `surface-container-low` (#0e1419) section to create a "carved out" effect. 
*   **Ambient Glows:** When an element needs to "float" (like a modal or a floating action button), use an extra-diffused shadow (blur: 40px) using a 5% opacity version of the `primary` (#a9ffdf) token. This mimics the glow of a phosphor monitor.
*   **The "Ghost Border" Fallback:** If a container requires a perimeter for accessibility, use a "Ghost Border": `outline-variant` at 15% opacity. This should look like a faint reflection on the edge of a glass screen.
*   **Scanline Texture:** Apply a global SVG pattern overlay of horizontal lines (1px height, 4px gap) at 0.03 opacity. This binds the layers together into a single "screen" experience.

---

## 5. Components

### Buttons
*   **Primary:** High-contrast `primary` background. Sharp corners (0px radius). On hover, add a `primary_dim` outer glow.
*   **Secondary:** Ghost style. `outline` border (at 20% opacity) with `JetBrains Mono` text.
*   **Tertiary:** Text-only, uppercase, with a leading "underscore" character (e.g., _ VIEW REPORT).

### Cards & Data Panels
*   **Strictly prohibit divider lines.** Separate content using the Spacing Scale (e.g., a `20` (4.5rem) gap between sections). 
*   **Construction:** Use `surface-container` background. Top-left corner should feature a small `label-sm` tag in `JetBrains Mono` indicating the "Data ID" or "Object Type."

### Inputs & Terminal Fields
*   **State:** The "Active" state must trigger a subtle pulse animation on the cursor (a vertical block character).
*   **Error:** Use `error_dim` (#d7383b) for text and `error` for a subtle 2px bottom-bar glow. Avoid red boxes; use red accents.

### Forensic Progress Bars
*   A custom component for case studies. Use a segmented bar (10 blocks) rather than a solid fill. Use `primary` for filled blocks and `surface-variant` for empty ones.

---

## 6. Do’s and Don’ts

**Do:**
*   **Do** use extreme scale. Pair a `display-lg` headline with a tiny `label-sm` metadata tag right next to it.
*   **Do** embrace "The Void." Let 40% of the screen stay empty to emphasize the importance of the data present.
*   **Do** use "Data Bracketing." Wrap important numbers or labels in brackets: `[ 0xf421 ]`.

**Don’t:**
*   **Don't** use border-radius. In this system, "Rounded" equals "Consumer Grade." Sharp 0px corners equal "Professional/Tactical."
*   **Don't** use standard drop shadows. If it's not a glow, it shouldn't be there.
*   **Don't** use icons without labels. Every icon must be accompanied by a `JetBrains Mono` descriptor to maintain the "analytical" feel.
*   **Don't** use pure white (#ffffff). Use `on-background` (#e3e9ef) to prevent eye strain against the deep black background.