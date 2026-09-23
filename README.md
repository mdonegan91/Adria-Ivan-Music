# Adria Ivan Music

Website for Adria Ivan. The home page has the new album with a Bandcamp pre-order link and an About section. There are also Live and Contact pages.

- **Astro**: static site
- **Sanity**: content (`/studio`), hosted separately at `adria-ivan.sanity.studio`
- **Netlify**: hosting and the contact form, rebuilt automatically when content is published in Sanity

The site builds and runs **without Sanity configured**. It falls back to `src/lib/fallback.ts` and the cover image in `public/images/`.

## Pages

| Route              | What's on it                                                                 |
| ------------------ | ---------------------------------------------------------------------------- |
| `/`                | Featured release (cover, title, date, Bandcamp button) and the About section |
| `/live`            | Upcoming shows, or a "no shows yet" message with an Instagram link           |
| `/contact`         | Contact emails and a Netlify contact form                                    |
| `/contact/thanks`  | Page shown after the form is submitted                                       |

The header has About, Live, Contact and an Instagram icon. **Live only appears in the nav once at least one upcoming show exists.** The page still works at `/live`. The footer has Instagram, any other links and Contact.

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
   - **Releases**: add the album (title, date, cover, Bandcamp URL, button label).
   - **Site settings**: fill in these tabs:
     - General: pick the featured release, add the Instagram URL and any other links.
     - About: add the About text.
     - Contact: add the intro line and the booking and press emails.
   - **Shows**: add a show whenever dates are announced. Past dates are hidden automatically.
5. At sanity.io/manage → API → CORS origins, add `http://localhost:3333` and your Studio URL. The site reads a public dataset, so it doesn't need a token.

## Netlify setup (one time)

1. Push this repo to GitHub and import it in Netlify. The build settings come from `netlify.toml`.
2. Under Site settings → Environment variables, add `PUBLIC_SANITY_PROJECT_ID` and `PUBLIC_SANITY_DATASET=production`.
3. Under Build & deploy → Build hooks, create a hook called "Sanity publish" and copy its URL.
4. At sanity.io/manage → API → Webhooks, add a webhook that POSTs to that URL on create, update and delete, filtered to `_type in ["release", "siteSettings", "show"]`.
5. **Contact form**: Netlify detects the form automatically on the first deploy. Submissions appear under the **Forms** tab. To get them by email, go to Forms → Form notifications and add an email notification.

After that, publishing in the Studio rebuilds the live site in about a minute.

> **Past shows**: the site is static, so a show drops off `/live` at the next rebuild after its date. Publishing anything in Sanity triggers a rebuild. If you start touring regularly, add a daily rebuild, for example a scheduled GitHub Action or cron job that POSTs to the build hook.

## Design

The palette is sampled from the album art:

| Token           | Hex       | Use                             |
| --------------- | --------- | ------------------------------- |
| `--paper`       | `#ac9683` | page background (matches cover) |
| `--ink`         | `#452b13` | text, buttons, rules            |
| `--ink-soft`    | `#5e4128` | secondary text                  |
| `--paper-light` | `#c2af9d` | form field fills                |

The fonts are self-hosted through Fontsource:
- **Instrument Serif**: display type, including the name, titles and venues. It's a condensed, contemporary serif that nods to the engraving without being period costume.
- **Instrument Sans**: body text, nav and labels (uppercase with letter-spacing).

The cover's background has been flattened to exactly `--paper`, so the artwork sits seamlessly on the page.

## Project structure

```
src/
  pages/               index, live, contact/index, contact/thanks
  layouts/Base.astro   <head>, meta and OG tags, header and footer
  components/          Header, Footer, InstagramIcon
  lib/sanity.ts        Sanity client and GROQ queries (memoized, never throw)
  lib/fallback.ts      default content when Sanity isn't set up
  lib/types.ts         shared types
  styles/global.css    design tokens, fonts, shared classes (.wrap, .eyebrow, .page-title, .button, .prose)
public/images/         album cover (jpg/webp) and og.jpg share image
studio/                Sanity Studio (schemas: siteSettings, release, show)
```
