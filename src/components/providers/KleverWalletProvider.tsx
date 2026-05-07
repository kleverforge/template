'use client'

import { KleverProvider } from '@klever/connect-react'
import type { ReactNode } from 'react'

/**
 * Wraps the app with Klever wallet context.
 *
 * Default network: testnet (safer for first runs - no real funds at risk).
 * Switch to mainnet by changing the `network` value below.
 *
 * `debug: true` enables SDK console logs (extension detection attempts,
 * connect lifecycle). Set to false in production.
 */
export function KleverWalletProvider({ children }: { children: ReactNode }) {
  return (
    <KleverProvider config={{ network: 'mainnet', debug: true }}>
      {children}
    </KleverProvider>
  )
}
