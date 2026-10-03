# ORZA Entertainment — cinematic homepage

Next.js App Router, TypeScript, Tailwind CSS, GSAP/ScrollTrigger and Lenis.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Production checks: `npm run lint`, `npm run typecheck`, `npm run build`.

## Implemented experience

- A 3.6-second curtain and camera opening on each homepage entry and refresh within the hero, original-logo transition, Skip intro and Replay intro. Playback waits while the tab is hidden; deep links, refreshes farther down the page, and reduced-motion preferences bypass it.
- Responsive image-led hero and editorial story.
- Three full-screen Why ORZA chapters: Curated Talent, Immersive Ambience and Effortless Execution.
- Eight-category diagonal scroll gallery with clear service copy, progress and an editorial pointer treatment.
- Interactive service programme, layered cloudscape, moving botanical framing and a framed image that grows into a full-screen environment.
- Seven full-screen event-format chapters for weddings, corporate events, concerts, festivals, cultural events, exhibitions and private parties.
- Selected Moments editorial portfolio with image masks, captions and an accessible keyboard lightbox.
- Environmental details include particles, shifting light, reflections and independent floral motion.
- Native accessible menu and event-brief dialogs, Escape/keyboard support, motion toggle and device reduced-motion preference.
- A short event brief creates a WhatsApp deep link. Nothing is transmitted until the visitor opens WhatsApp and sends it.
- Local fonts and responsive Next Image optimisation. Static content remains readable without JavaScript.

All campaign imagery is visibly treated as concept material. The portfolio structure is complete and ready for approved ORZA event exports.

## Brand and media

The original logo is stored intact at `public/media/orza-logo-original.png`. Its blue backdrop is removed at render time with an SVG alpha filter; no redraw or generated replacement is used.

`hero-concept.png` and `artist-concept.png` are AI-generated campaign concepts, not photographs of real ORZA events or artists. They are labelled visibly in the UI. Replace with approved original photography before treating any image as portfolio evidence. Image-generation prompts and provenance are recorded in `MEDIA.md`.

Social links and contact information are in `src/lib/content.ts`. The supplied Instagram and LinkedIn profiles are used directly. No styling was taken from the old ORZA website.

## Before publication

- Supply approved original event media for the portfolio and final mobile crops.
- Configure production domain, metadata and sharing image; remove the intentional preview `noindex` in `src/app/layout.tsx`.
- Supply verified client logos, testimonials, venue partners and project results if ORZA wants those trust modules.
- Add Arabic localization after the English art direction and copy are approved.
- Verify contact links and the WhatsApp flow on real iOS/Android devices.
- Deploy to a Next.js-compatible host. No service has been deployed by this prototype.
