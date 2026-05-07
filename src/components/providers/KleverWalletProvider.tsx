'use client'

import { KleverProvider } from '@klever/connect-react'
import type { ReactNode } from 'react'

/**
 * Wraps the app with Klever wallet context.
 * Default network: testnet (safer for first runs - no real funds at risk).
 * Switch to mainnet by changing the config below.
 */
export function KleverWalletProvider({ children }: { children: ReactNode }) {
  return (
    <KleverProvider config={{ network: 'testnet' }}>
      {children}
    </KleverProvider>
  )
}
