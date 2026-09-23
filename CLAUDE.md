# CLAUDE.md

Landing page for the musician Adria Ivan. It's a static Astro site with Sanity for content, deployed on Netlify. See README.md for setup.

## Commands
- `npm run dev`: Astro dev server (port 4321)
- `npm run build`: static build to `dist/`
- `npm run studio`: Sanity Studio (port 3333). Run `npm install` inside `studio/` first.

## Architecture
- Everything is static (`output: "static"`). Content is fetched from Sanity **at build time** in `src/lib/sanity.ts`. Don't add client-side fetching unless it's needed.
- `getSiteContent()` must never throw. If Sanity is missing or errors, it returns `src/lib/fallback.ts` so builds always succeed.
- The Studio in `studio/` is a separate npm package with its own `node_modules`. It is not part of the Astro build.
- If you add a Sanity field, update the schema in `studio/schemaTypes/`, the GROQ query and mapping in `src/lib/sanity.ts`, the types in `src/lib/types.ts`, and the defaults in `src/lib/fallback.ts`.

## Design rules
- Use the CSS tokens in `src/styles/global.css` (`--paper`, `--ink`, `--ink-soft`, `--paper-light`, `--rule`). Don't hard-code colors.
- Fonts: IM Fell English SC (display/labels), IM Fell English italic (titles), EB Garamond (body).
- The cover's background is exactly `--paper`, so the artwork blends into the page. Don't add borders or shadows to it.
- The look is restrained and letterpress-like: double rules, the ❦ fleuron, small caps with letter-spacing. Avoid gradients, rounded corners and bright accents.
- The pre-order button is the main action on the page. Keep it above the fold on mobile if possible.

## Open TODOs
- Real album title, release date and Bandcamp pre-order URL (in Sanity, or `fallback.ts` until then)
- Domain: update `site` in `astro.config.mjs`
- Social links (Instagram, etc.) in Site settings
