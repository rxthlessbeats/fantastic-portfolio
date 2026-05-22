# Magnus Leu — Portfolio

Built with [Next.js](https://nextjs.org) and deployed on [Vercel](https://vercel.com) for CI/CD.

![Portfolio preview](public/images/og/thumbnail.png)

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Once UI** components and theming
- **MDX** for project posts, publications, and work entries

## Getting started

**1. Install dependencies**

```bash
npm install
```

**2. Run the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**3. Site config**

Edit `src/resources/once-ui.config.ts` (routes, theme, `baseURL`, fonts).

**4. Content & profile**

Edit `src/resources/content.tsx` (name, social links, about, work experience, skills).

**5. Add MDX content**

| Section | Path |
| --- | --- |
| Projects | `src/app/projects/posts/*.mdx` |
| Publications | `src/app/publications/posts/*.mdx` |
| Websites | `src/app/work/projects/*.mdx` |

Images go under `public/images/`.

Requires **Node.js 18.17+**.

## Site structure

- **/** — Home
- **/about** — About & CV
- **/projects** — ML / engineering project write-ups
- **/publications** — Papers and research posts
- **/work** — Website showcases (screenshots + external links)

## Documentation

Once UI & Magic Portfolio docs: [docs.once-ui.com](https://docs.once-ui.com/docs/magic-portfolio/quick-start)

## License

Based on Magic Portfolio (CC BY-NC 4.0). See `LICENSE.txt`.

Original template by [Lorant One](https://www.linkedin.com/in/lorant-one/).
