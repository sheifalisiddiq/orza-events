# Cinematic homepage — verification

Verified on 3 October 2026. This report covers the completed concept-media homepage experience.

## Build checks

- `npm run build`: passed; homepage prerendered as static content.
- `npm run lint`: passed without warnings.
- TypeScript: passed both standalone checking and production-build checking.
- `npm audit --omit=dev`: zero reported production dependency vulnerabilities.
- Full dependency audit: an upstream `braces` advisory propagates through the development-only Next.js ESLint dependency chain. npm reports no available fix. No force-upgrade or unverified override was applied. This does not appear in the production dependency audit.

## Browser checks (gstack)

- The three Why ORZA chapters load successfully as full-screen pinned scenes with matching copy and visual transitions.
- The eight-category experiences deck was checked at the first, third and fifth states. Incoming cards travel from bottom-right; outgoing cards travel toward top-left; category copy, counter and progress stay synchronized.
- The cloud scene, independent botanical framing and framed-to-full-screen image expansion were checked on desktop and mobile.
- Seven event-format scenes have distinct imagery and copy with masked transitions and environmental light, particle and reflection layers.
- The Selected Moments portfolio was checked on desktop and mobile. Its lightbox opens from a project, supports left/right keys, closes with Escape and exposes labelled controls.
- Live Music, Creative Experiences and Production & Hospitality resolve to the harp, calligraphy and production concept files respectively.
- The new journey was inspected at 1440 × 900 and 390 × 844. No document-level horizontal overflow was present on mobile and the mobile copy remained within the viewport.
- Desktop 1440 × 1000, tablet 768 × 1024, and mobile 390 × 844 inspected.
- No document-level horizontal overflow at desktop, tablet, mobile, or narrow 320px width.
- Supplied logo renders with its original geometry on both dark and ivory scenes.
- First-visit curtain screen and Skip intro checked. Skip completes the timeline and reveals the hero without storing a viewed flag.
- Updated curtain behaviour: every refresh while in the hero plays the opening, regardless of any old viewed flag. Deep-section links and refreshes farther down bypass it. Replay intro starts a fresh sequence without resetting the other scene animations.
- Regression check after the curtain fix: observed closed panels, intermediate opening position, completed hidden overlay, immediate Skip, menu accessible during playback, and motion-off disabling Replay. A simulated document visibility signal kept the curtain closed while hidden and resumed playback when visible. This lifecycle simulation is not a native background-tab test.
- The normal animation timeline is approximately 3.65 seconds; CSS includes a fail-safe hiding the overlay if client initialisation fails.
- Menu opens as a native modal. Forward/reverse Tab cycling remains within it; Escape closes it and returns focus to Menu.
- Programme expansion changes content; selected service carries into the enquiry.
- Event-brief test generates the correct WhatsApp recipient and encoded name, occasion, guest count, details and selected-service text. No external message was sent.
- Prepared-brief state places focus on Continue in WhatsApp. Escape restores focus to the original enquiry button.
- Motion-off control removes animation transforms and leaves all content visible.
- Device `prefers-reduced-motion` is implemented in CSS and JavaScript. Direct OS-media emulation was not available through the browser tool; the same static rendering branch was checked through the user motion control.
- Local fonts and Next Image media loaded successfully; no broken images or console errors in the final desktop/mobile checks.

## Remaining before publication

Replace or approve concept assets, add verified trust material, configure domain/sharing metadata and enable indexing. Run real-device Safari/iOS and Android checks, including a user-sent WhatsApp enquiry. No deployment is included in this checkpoint.
