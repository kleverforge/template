# klever-forge-template

A clean Next.js starter for any project on the Klever blockchain. Open it in Claude Code, describe what you want to build, and ship.

## What is included

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Forge DS** - a CSS design system, vendored locally as a single file at `src/forge-ds/forge-ds.css`. No external dependency.
- **Klever wallet** - drop-in `<ConnectWalletButton />` powered by `@klever/connect-react`. Defaults to testnet. Detects the Klever Wallet browser extension and falls back to an Install link if missing.
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
- `src/components/layout/SiteHeader.tsx` - the sticky header (brand + Connect Wallet + theme toggle).
- `src/components/ui/ConnectWalletButton.tsx` - the wallet connect button. Drop it anywhere.
- `src/components/providers/KleverWalletProvider.tsx` - wallet provider config. Network is `testnet` by default. Change to `mainnet` when shipping.
- `src/forge-ds/forge-ds.css` - the CSS design system. Use any `ds-*` class in your JSX. Override `--ds-*` variables in `src/app/globals.css`.

## Klever wallet quick start

The provider and header are already wired in `src/app/layout.tsx`. The button is in the top-right of every page.

To use the wallet from your own components, the hooks from `@klever/connect-react` are available everywhere:

```tsx
'use client'
import { useKlever } from '@klever/connect-react'

export function MyComponent() {
  const { isConnected, address } = useKlever()
  if (!isConnected) return <p>Connect your wallet to continue.</p>
  return <p>Connected: {address}</p>
}
```

For transactions, balance polling, staking, see the [package docs on npm](https://www.npmjs.com/package/@klever/connect-react).

## Removing the DS

If you do not want the DS at all:

1. Delete `src/forge-ds/`.
2. Remove the `@import "../forge-ds/forge-ds.css"` line in `src/app/globals.css`.
3. Bring your own CSS.

Nothing else depends on the DS.

## Removing the wallet

If your project does not need wallet integration:

1. `npm uninstall @klever/connect-react`
2. Remove the `KleverWalletProvider` import and wrapper from `src/app/layout.tsx`
3. Remove `<ConnectWalletButton />` from `src/components/layout/SiteHeader.tsx` (or delete the header)
4. Delete `src/components/providers/`, `src/components/ui/ConnectWalletButton.tsx`, `src/components/ui/ConnectWalletButton.module.css`

## Companion site

For Klever-specific guides, glossary, and tips on building with AI tools, see [kleverforge.com](https://kleverforge.com).

## License

MIT.
