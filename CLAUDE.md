# CLAUDE.md

Website for the musician Adria Ivan. It's a static Astro site with Sanity for content, deployed on Netlify. See README.md for setup.

## Commands
- `npm run dev`: Astro dev server (port 4321)
- `npm run build`: static build to `dist/`
- `npm run studio`: Sanity Studio (port 3333). Run `npm install` inside `studio/` first.

## Architecture
- Everything is static (`output: "static"`). Content is fetched from Sanity **at build time** in `src/lib/sanity.ts`. Don't add client-side fetching unless it's needed.
- The data functions are `getSiteSettings()`, `getFeaturedRelease()` and `getUpcomingShows()`. They are memoized per build and **never throw**. If Sanity is missing or errors, they return data from `src/lib/fallback.ts`, so builds always succeed.
- About text is Portable Text, rendered to HTML with `@portabletext/to-html` in `getSiteSettings()` (`aboutHtml`).
- The Live nav link is conditional. The header only shows it when `getUpcomingShows()` is non-empty.
- The Studio in `studio/` is a separate npm package with its own `node_modules`. It is not part of the Astro build.
- If you add a Sanity field, update the schema in `studio/schemaTypes/`, the GROQ query and mapping in `src/lib/sanity.ts`, the types in `src/lib/types.ts`, and the defaults in `src/lib/fallback.ts`. If you add a document type, also add it to the Sanity webhook filter (see README).

## Design rules
- Use the CSS tokens in `src/styles/global.css` (`--paper`, `--ink`, `--ink-soft`, `--paper-light`, `--rule`). Don't hard-code colors.
- Fonts: Instrument Serif (`--font-serif`) for display, meaning names, titles and venues. Instrument Sans (`--font-sans`) for body text. Labels and nav are sans, 500 weight, uppercase, letter-spacing about 0.14em.
- Reuse the shared classes: `.wrap`, `.eyebrow`, `.page-title`, `.button`, `.prose`.
- The cover's background is flattened to exactly `--paper`, so the artwork blends into the page. Don't add borders or shadows to it. If you replace the cover, flatten its background the same way. `public/images/about-frame.jpg` is a crop of the cover's engraved frame (used on the About page), so re-crop it too.
- The look is quiet and editorial: hairline rules, generous space, no rounded corners, no gradients, no extra accent colors.
- On the home page, the pre-order button is the main action. Keep it above the fold on mobile if possible.

## Open TODOs
- Real release date and Bandcamp pre-order URL (in Sanity, or `fallback.ts` until then)
- A real MP3 for the home-page player (`song` on the release; `songUrl`/`songTitle` in `fallback.ts` until then). `public/audio/placeholder.mp3` is generated chords.
- About text
- Domain: update `site` in `astro.config.mjs`
