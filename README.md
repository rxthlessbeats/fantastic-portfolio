# Magnus Leu

An original dark portfolio built with Next.js, React, CSS, and a pointer-responsive canvas artwork.

```bash
npm install
npm run dev
npm run check
npm run build
npm run start
```

About, Projects, Publications, Open sources, and Products each have their own page. Experience, education, and skills live on About. The Open sources page features Agent Cowork Memory; the seven research projects remain in Projects.

Profile content lives in `src/content/profile.ts`. All nine original case studies live in `src/content/posts`; their writing, figures, tables, and links are preserved. Legacy project and publication detail URLs redirect to their case studies.

Redesigned covers live in `public/images/covers`: editable SVGs, PNGs for case studies and social previews, and compact SVG graphics for the project lists. Original research diagrams stay in the study bodies.

Motion uses native CSS and canvas, including project tilt, hover lighting, scroll entrances, and a faint background drift. Artwork and background motion can be paused. Reduced motion is respected throughout.

Page navigation uses the [React ViewTransition integration](https://react.dev/reference/react/ViewTransition) included with Next.js 16.1.6, enabled by `experimental.viewTransition`. Each route fades independently while navigation stays in place. Page changes and browser history restore scroll instantly; in-page links scroll smoothly. Browsers without ViewTransition support navigate normally.

The browser regression check is `node scripts/check-navigation.cjs` against the local server on port 3001 (or set `PORTFOLIO_URL`). It requires Playwright and Chromium in your review environment, and covers featured links, navigation from deep scroll, Back/Forward restoration, anchors, and reduced motion.
