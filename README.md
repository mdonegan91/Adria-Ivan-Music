# Adria Ivan Music

Landing page for Adria Ivan's new album with a Bandcamp pre-order link.

- **Astro**: static site (`/`)
- **Sanity**: content (`/studio`), hosted separately at `adria-ivan.sanity.studio`
- **Netlify**: hosting, rebuilt automatically when content is published in Sanity

The site builds and runs **without Sanity configured**. It falls back to `src/lib/fallback.ts` and the cover image in `public/images/`.

## Local development

```bash
npm install
npm run dev            # http://localhost:4321
```

## Sanity setup (one time)

1. Create a project: `cd studio && npm install && npx sanity init --env` (or create one at sanity.io/manage). Use the `production` dataset.
2. Copy the project ID into:
   - `studio/.env` → `SANITY_STUDIO_PROJECT_ID=...`
   - `.env` (root) → `PUBLIC_SANITY_PROJECT_ID=...`
3. Run the Studio locally with `npm run studio` (http://localhost:3333), or deploy it with `cd studio && npm run deploy`.
4. In the Studio:
   - Create a **Release** with the title, date, cover art, Bandcamp URL and button label.
   - Open **Site settings** and choose that release as the **Featured release**.
5. At sanity.io/manage → API → CORS origins, add `http://localhost:3333` and your Studio URL. The site reads a public dataset, so it doesn't need a token.

## Netlify setup (one time)

1. Push this repo to GitHub and import it in Netlify. The build settings come from `netlify.toml`.
2. Under Site settings → Environment variables, add `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET=production`.
3. Under Build & deploy → Build hooks, create a hook called "Sanity publish" and copy its URL.
4. At sanity.io/manage → API → Webhooks, add a webhook that POSTs to that URL on create, update and delete, filtered to `_type in ["release", "siteSettings"]`.

After that, publishing in the Studio rebuilds the live site in about a minute.

## Design

The palette is sampled from the album art (an engraving of two knights struggling over a rose branch):

| Token           | Hex       | Use                          |
| --------------- | --------- | ---------------------------- |
| `--paper`       | `#ac9683` | page background (matches cover) |
| `--ink`         | `#452b13` | text, button, rules          |
| `--ink-soft`    | `#5e4128` | secondary text               |
| `--paper-light` | `#c2af9d` | button hover                 |

The fonts are self-hosted through Fontsource:
- **IM Fell English SC**: artist name, labels and button. It's a revival of 17th-century Fell types and fits the woodcut style.
- **IM Fell English Italic**: album title and tagline.
- **EB Garamond**: body text.

The double-rule border around the page echoes the frame around the engraving.

## Project structure

```
src/
  pages/index.astro     landing page
  layouts/Base.astro    <head>, meta and OG tags
  lib/sanity.ts         Sanity client and GROQ query (falls back gracefully)
  lib/fallback.ts       default content when Sanity isn't set up
  styles/global.css     design tokens and fonts
public/images/          album cover (jpg/webp) and og.jpg share image
studio/                 Sanity Studio (schemas: release, siteSettings)
```
