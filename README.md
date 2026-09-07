# Portfolio Site

A clean, minimal developer portfolio built with React + Vite.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Personalizing your content

All of the content lives in `src/data/` — edit these files, no need to touch the components:

- `src/data/profile.js` — your name, role, tagline, bio, email, social links, resume URL
- `src/data/skills.js` — skill categories and tags
- `src/data/projects.js` — your projects (title, description, tech, links). Set `highlight: true` on your best project to make its card stand out.
- `src/data/experience.js` — work history and education

To add a downloadable resume, drop a PDF at `public/resume.pdf` (matches the default `resumeUrl` in `profile.js`).

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Deploy that folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.).
