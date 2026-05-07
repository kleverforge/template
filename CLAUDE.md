# CLAUDE.md - klever-forge-template

A clean Next.js starter for projects on the Klever blockchain. Open in Claude Code, describe what you want to build, replace this template's pages with your own, ship.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Forge DS - vendored locally at `src/forge-ds/forge-ds.css` (single CSS file, no external dependency)
- `next-themes` for dark/light/system theme switching
- Lucide for icons (`lucide-react`)
- Geist (sans + mono) + Clash Display + Switzer typefaces preloaded via `next/font`

## Forge DS in 30 seconds

The design system is one self-contained CSS file at `src/forge-ds/forge-ds.css`. Use any `ds-*` class in your JSX:

```tsx
<button className="ds-btn ds-btn--primary">Click</button>
<div className="ds-card ds-card__body">...</div>
<h1 className="ds-hero-title">Hello</h1>
```

To customize, override `--ds-*` variables in `src/app/globals.css`:

```css
:root {
  --ds-color-bg: #0a0a0a;
  --ds-radius-md: 12px;
  --ds-font-display: "Inter", sans-serif;
}
```

To remove the DS entirely: delete `src/forge-ds/`, drop the import line in `src/app/globals.css`, bring your own CSS. Nothing else depends on it.

## Style guidelines

- Prefer canonical DS classes (`ds-hero-title`, `ds-section-title`, `ds-overline`, `ds-stat-number`) over stacked utility soup. If a heading has 3+ typography utilities (size + weight + color + tracking + transform), there is probably a single canonical class for it. Look in `src/forge-ds/forge-ds.css`.
- For project-local CSS not covered by the DS, use BEM (no `ds-` prefix) in `src/styles/components.css`. All values must come from `var(--ds-*)` tokens, not hardcoded colors or spacing.
- No inline styles. No `!important` without a documented reason.
- TypeScript: never `any`. Use `unknown` plus type narrowing.

## Project structure

```
src/
  app/
    layout.tsx          # Root layout (fonts + ThemeProvider)
    globals.css         # Forge DS import + base styles
    page.tsx            # Landing page (replace this)
  components/
    layout/
      ThemeProvider.tsx # next-themes wrapper
    ui/
      ThemeToggle.tsx   # light/dark/system toggle
  config/
    site.ts             # name, title, description
    routes.ts           # ROUTES const
  forge-ds/
    forge-ds.css        # The vendored CSS design system
  styles/
    components.css      # Project-specific BEM classes
  lib/
    utils.ts            # cn() helper (clsx)
  fonts/                # ClashDisplay + Switzer .woff2 files
```

## Commands

```
npm run dev         # start dev server (default port 3000)
npm run build       # production build
npm run start       # run the production build
npm run type-check  # TypeScript check
npm run lint        # ESLint
```

## Adding a new page

1. Create `src/app/your-page/page.tsx`
2. Add route to `src/config/routes.ts`
3. (Optional) add a nav entry to `src/config/site.ts`

## Working with Claude Code on this project

- Describe what you want in plain English. One change per prompt is easier to review than three bundled.
- Before approving a change, ask Claude what it changed and why. The answer should match your prompt.
- Anything touching wallet logic, signing, or addresses: read carefully before approving.
- Never paste your wallet seed phrase anywhere, including into Claude.
