import type { Metadata } from 'next'
import { BalanceList } from './BalanceList'

export const metadata: Metadata = {
  title: 'Balance . klever-forge-template',
  description: 'View all assets in your connected Klever wallet.',
}

export default function BalancePage() {
  return (
    <main className="ds-container ds-py-16">
      <header className="ds-mb-8">
        <p className="ds-overline ds-mb-3">Wallet</p>
        <h1 className="ds-section-title ds-mb-3">Balance</h1>
        <p className="ds-text-lg ds-text-secondary ds-max-w-2xl">
          Every asset and amount currently held in your connected wallet. Connect a wallet to see
          balances. Click any row to copy the asset ID.
        </p>
      </header>

      <BalanceList />
    </main>
  )
}
