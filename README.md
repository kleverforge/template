# klever-forge-template

A clean Next.js starter for any project on the Klever blockchain. Open it in Claude Code, describe what you want to build, and ship.

## What is included

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Forge DS** - a CSS design system, vendored locally in `src/forge-ds/`. No external dependency.
- **Theme switching** - dark default, light, system, via `next-themes`
- **Three preloaded typefaces**: Satoshi (display), Switzer (body), Geist Mono (code)
- **Lucide icons** for the icon set

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Where to look

- `src/app/page.tsx` - the landing page. Replace it with whatever you want to ship.
- `src/forge-ds/` - the CSS design system. Use any `ds-*` class in your JSX.
- `src/forge-ds/components/` - 60 component classes (buttons, cards, inputs, modal, etc.).
- `src/forge-ds/tokens/` - colors, typography, spacing, shadows, radii. Override any `--ds-*` variable in `app/globals.css`.

## Removing the DS

If you do not want the DS at all:

1. Delete the folder `src/forge-ds/`.
2. Remove the `@import "../forge-ds/index.css"` line in `src/app/globals.css`.
3. Bring your own CSS.

That is it. Nothing else depends on the DS.

## Companion site

For Klever-specific guides, glossary, and tips on building with AI tools, see klever-forge (the educational site).

## License

MIT.
