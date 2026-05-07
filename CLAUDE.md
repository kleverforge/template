# CLAUDE.md - klever-forge-template

A clean Next.js starter for projects on the Klever blockchain. Open in Claude Code, describe what you want to build, replace this template's pages with your own, ship.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Forge DS - vendored locally at `src/forge-ds/forge-ds.css` (single CSS file, no external dependency)
- `@klever/connect-react` for wallet connection and Klever blockchain hooks
- `next-themes` for dark/light/system theme switching
- Lucide for icons (`lucide-react`)
- Satoshi + Switzer + Geist Mono typefaces preloaded via `next/font`

## Forge DS in 30 seconds

The design system is one self-contained CSS file at `src/forge-ds/forge-ds.css`. Use any `ds-*` class in your JSX:

```tsx
<button className="ds-btn">Click</button>
<button className="ds-btn ds-btn--ghost">Cancel</button>
<div className="ds-card ds-card__body">...</div>
<h1 className="ds-hero-title">Hello</h1>
```

The default `ds-btn` is the primary variant. Other variants: `ds-btn--ghost`, `ds-btn--outline`, `ds-btn--danger`, `ds-btn--icon`, `ds-btn--lg`, `ds-btn--full`, `ds-btn--pill`.

To customize, override `--ds-*` variables in `src/app/globals.css`:

```css
:root {
  --ds-color-bg: #0a0a0a;
  --ds-radius-md: 12px;
  --ds-font-display: "Inter", sans-serif;
}
```

To remove the DS entirely: delete `src/forge-ds/`, drop the import line in `src/app/globals.css`, bring your own CSS. Nothing else depends on it.

## Klever wallet

Wallet integration ships out of the box via [`@klever/connect-react`](https://www.npmjs.com/package/@klever/connect-react).

The app is wrapped in `KleverWalletProvider` (configured for **testnet** by default in `src/components/providers/KleverWalletProvider.tsx`). Switch to mainnet by changing the `network` prop in that file when you are ready to ship.

The header (`src/components/layout/SiteHeader.tsx`) renders a drop-in `<ConnectWalletButton />` (`src/components/ui/ConnectWalletButton.tsx`) that:

- Detects the Klever Wallet browser extension
- Lets the user connect (extension popup)
- Shows the truncated wallet address when connected
- Provides a Disconnect button
- Falls back to a friendly error and an Install link if the extension is missing

Use it anywhere in your app:

```tsx
import { ConnectWalletButton } from '@/components/ui/ConnectWalletButton'

<ConnectWalletButton />
```

For other Klever interactions (transactions, balance, staking, etc.) use the hooks from `@klever/connect-react` directly: `useKlever`, `useTransaction`, `useTransfer`, `useBalance`, `useStaking`. See the package README on npm.

To remove wallet support: drop the `@klever/connect-react` dependency and unwire `KleverWalletProvider` and `SiteHeader` from `layout.tsx`.

## Style guidelines

- Prefer canonical DS classes (`ds-hero-title`, `ds-section-title`, `ds-overline`, `ds-stat-number`) over stacked utility soup. If a heading has 3+ typography utilities (size + weight + color + tracking + transform), there is probably a single canonical class for it. Look in `src/forge-ds/forge-ds.css`.
- For project-local CSS not covered by the DS, use BEM (no `ds-` prefix) in `src/styles/components.css`, or use CSS Modules (`*.module.css`) co-located with your component for scoped styles. All values must come from `var(--ds-*)` tokens, not hardcoded colors or spacing.
- No inline styles. No `!important` without a documented reason.
- TypeScript: never `any`. Use `unknown` plus type narrowing.

## Project structure

```
src/
  app/
    layout.tsx                      # Root layout (fonts + providers + SiteHeader)
    globals.css                     # Forge DS import + base styles
    page.tsx                        # Landing page (replace this)
  components/
    layout/
      SiteHeader.tsx                # Sticky header (brand + ConnectWalletButton + ThemeToggle)
      SiteHeader.module.css         # Scoped header styles
      ThemeProvider.tsx             # next-themes wrapper
    providers/
      KleverWalletProvider.tsx      # Wraps app with @klever/connect-react KleverProvider
    ui/
      ConnectWalletButton.tsx       # Drop-in wallet connect (address + disconnect + install fallback)
      ConnectWalletButton.module.css
      ThemeToggle.tsx               # light/dark/system toggle
  config/
    site.ts                         # name, title, description
    routes.ts                       # ROUTES const
  forge-ds/
    forge-ds.css                    # The vendored CSS design system (single file)
  styles/
    components.css                  # Project-specific BEM classes
  lib/
    utils.ts                        # cn() helper (clsx)
  fonts/                            # Satoshi + Switzer .woff2 files
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
