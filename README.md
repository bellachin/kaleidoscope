# Kaleidoscope

A website built with **TypeScript**, **React**, **CSS**, and **Vite**, with **Sanity CMS** planned for content.

## Setup

Requires Node 20+ (see `.nvmrc`).

```bash
git clone <repo-url>
cd kaleidoscope
npm install
cp .env.example .env
npm run dev
```

## Running Vite

Vite is the dev server and build tool. Run these from the project root:

| Command             | What it does                                                               |
| ------------------- | -------------------------------------------------------------------------- |
| `npm install`       | Install dependencies (first time, and after pulling new ones)              |
| `npm run dev`       | Start the Vite dev server with hot reload (default: http://localhost:5173) |
| `npm run build`     | Typecheck and create a production build in `dist/`                         |
| `npm run preview`   | Serve the production build locally to test it                              |
| `npm run typecheck` | Run TypeScript checks                                                      |
| `npm run lint`      | Run ESLint                                                                 |
| `npm run format`    | Format with Prettier                                                       |

Stop the dev server with `Ctrl + C`. To use a different port: `npm run dev -- --port 3000`. To expose it on your network: `npm run dev -- --host`.

To test your work: edit files, save, and check the browser. Vite reloads automatically. Remove any temporary test code before pushing.

## Git Workflow

Branch off `dev`, never `main`.

```bash
git checkout dev
git pull origin dev
git checkout -b feature/header-nav
# ...work...
git add .
git commit -m "feat: build header component"
git push -u origin feature/header-nav
```

Then open a Pull Request on GitHub with base branch `dev`. Before opening it, make sure `npm run dev` works, there is no leftover test code, and there are no merge conflicts.

## Project Structure

```
src/
  components/
    layout/     Layout, Header, Footer
    ui/         Cards and other UI pieces
    buttons/    Button components
  pages/        Page-level components (Homepage, ...)
  hooks/        Custom React hooks
  lib/          Utilities and clients (e.g. Sanity)
  assets/       Images and static assets
  styles/       tokens.css (design tokens), global.css
sanity/         Sanity Studio and schemas (see sanity/README.md)
docs/           BRAND_BOOK.md
```

Import from `src` with the `@/` alias, e.g. `import Foo from '@/components/Foo'`.

## Brand Colors

Full guidance in [docs/BRAND_BOOK.md](docs/BRAND_BOOK.md).

| Role            | Name            | Hex       |
| --------------- | --------------- | --------- |
| Base            | Pure White      | `#FFFFFF` |
| Outer gear      | Navy-Teal       | `#0F4F7A` |
| Second layer    | Deep Teal-Blue  | `#2F7FA3` |
| Middle hex      | Teal            | `#4FA3B8` |
| Inner hex       | Light Teal      | `#79C2CF` |
| Center aperture | Very Light Cyan | `#A9D6DE` |

Tokens are defined in `src/styles/tokens.css` as CSS variables.

## Sanity CMS

See [sanity/README.md](sanity/README.md) for setup steps. Environment variables: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`.

## Conventions

- TypeScript strict mode; ESLint + Prettier (config in repo, `.editorconfig` included).
- One component per file, PascalCase names, co-located CSS.
- Use CSS variables from `tokens.css`, never raw hex values in components.
