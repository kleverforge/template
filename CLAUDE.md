## Design System -> [DS_HEALTH.md](/Projects/infra/DS_HEALTH.md)
For dev conventions (API shape, TanStack Query, Supabase, Redis, commit) -> [DEV_CONVENTIONS.md](/Projects/infra/DEV_CONVENTIONS.md)

CONTROLLED MODE attivo. Regole DS, azioni aperte, metriche: tutto centralizzato in [DS_HEALTH.md](/Projects/infra/DS_HEALTH.md).
Ops Triage: when the user describes a task, automatically call `ops_triage`. Details in DS_HEALTH.md section "Ops Triage".

---

# CLAUDE.md - klever-forge-template

## Project Overview

A clean Next.js starter for any project on the Klever blockchain. Designed to be cloned, opened in Claude Code, and customized into the user's actual project.

**Stack:** Next.js 16 (App Router), React 19, TypeScript
**Design system:** Forge DS, vendored locally in `src/forge-ds/`. No npm DS dependency.
**Typography:** Clash Display (display) + Switzer (body) + Geist Mono (code), preloaded via next/font/local
**Theme:** Dark default, light + system supported via `next-themes`
**Audience:** non-developers building their first Klever project with AI tools
**Language:** English only

## What is Forge DS

Forge DS is the CSS design system that ships with this starter. It is a fork of an internal design system, vendored as plain CSS inside this repo so the starter has zero external DS dependency.

The full source lives in `src/forge-ds/`:
- `tokens/` - colors, typography, spacing, shadows, radii (about 140 `--ds-*` variables)
- `base/` - reset, base typography
- `components/` - 60 component classes (buttons, cards, inputs, modal, etc.)
- `utilities/` - layout, spacing, text, sizing, states utilities
- `index.css` - the single entry point that imports all of the above

Use any `ds-*` class in your JSX. Override `--ds-*` tokens in `app/globals.css` to customize.

To remove the DS entirely: delete the `src/forge-ds/` folder, drop the `@import "../forge-ds/index.css"` in `app/globals.css`, and bring your own CSS.

## Critical Rules

### 1. No Hardcoding

Every literal value has a home in `src/config/`.

| File | What belongs here |
|------|-------------------|
| `site.ts` | App name, description, nav items |
| `routes.ts` | All route paths |

Add more config files as the project grows (copy.ts, auth.ts, env.ts, etc.).

### 2. Forge DS - Single Source of Truth

The design system is vendored locally. Read source before using any class.

| What you need | Where to look |
|---------------|---------------|
| Component classes (`ds-btn`, `ds-card`, etc.) | `src/forge-ds/components/` |
| Token values (colors, spacing, radius) | `src/forge-ds/tokens/` |
| Utility classes | `src/forge-ds/utilities/` |
| Entry point | `src/forge-ds/index.css` |

For DS styling rules, component-first approach, and usage patterns -> DS_HEALTH.md

### 3. CSS Architecture

```css
/* globals.css */
@import "../forge-ds/index.css" layer(ds);   /* All DS tokens, components, utilities */
@import "../styles/components.css";           /* Project-specific component classes */
```

Three layers:
1. **Forge DS** - vendored in `src/forge-ds/` (`ds-*` prefix)
2. **Project component classes** - in `src/styles/components.css` (BEM, no `ds-` prefix)
3. **Base styles** - in `globals.css` (body, selection, font fallbacks)

### 4. Adding a New Page

1. Create `src/app/your-page/page.tsx`
2. Add route to `src/config/routes.ts`
3. (Optional) add nav item to `src/config/site.ts`

### 5. Overriding Design Tokens

Add overrides in `globals.css`:

```css
:root {
  --ds-font-display: "Inter", sans-serif;
  --ds-radius-xl: 12px;
  --ds-color-bg: #0a0a0a;
}
```

## Project Architecture

```
src/
  app/
    layout.tsx          # Root layout (fonts, ThemeProvider)
    globals.css         # Forge DS import + base styles
    page.tsx            # Landing page (replace this with your project)
  components/
    layout/
      ThemeProvider.tsx # next-themes wrapper
    ui/
      ThemeToggle.tsx   # Light/dark/system toggle
  config/
    site.ts             # name, title, description
    routes.ts           # ROUTES const
  forge-ds/             # The vendored CSS design system
    tokens/             # colors, typography, spacing, shadows, radii
    base/               # reset, base typography
    components/         # 60 component CSS files
    utilities/          # layout, spacing, text, sizing, states
    index.css           # single import entry
    js/theme.js         # vanilla theme switcher (unused, kept for reference)
  styles/
    components.css      # project-specific BEM classes (currently empty)
  lib/
    utils.ts            # cn() helper (clsx)
  fonts/                # ClashDisplay + Switzer woff2 files
```

## Quick Reference

```
Local URL:      http://klever-forge-template.test (PM2 + Caddy, port 4019)
Type check:     npm run type-check
Build:          npm run build && pm2 restart klever-forge-template
Lint:           npm run lint
Forge DS source: src/forge-ds/
GitHub:         private during initial setup. Public-facing copy uses "coming soon".
```

## End-of-Session Checklist

For DS checklist (CONTROLLED MODE, compliance, build, git) -> [DS_HEALTH.md](/Projects/infra/DS_HEALTH.md)

Project-specific:
- [ ] No personal-identity tokens in any file (see local memory: `feedback_no_user_identity.md`)
- [ ] No upstream-fork identifiers in source (Forge DS is the local name)
- [ ] All copy is in English
