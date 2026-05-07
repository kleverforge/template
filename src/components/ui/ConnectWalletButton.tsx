'use client'

import { useState } from 'react'
import { useKlever } from '@klever/connect-react'
import { Wallet, LogOut } from 'lucide-react'
import styles from './ConnectWalletButton.module.css'

function truncate(addr: string) {
  if (!addr) return ''
  return `${addr.slice(0, 8)}...${addr.slice(-4)}`
}

/**
 * Drop-in Connect Wallet button. Talks to the Klever Wallet browser
 * extension via @klever/connect-react. Shows the truncated address when
 * connected, with a Disconnect button. Surfaces a friendly error and an
 * Install link if the extension is not present.
 */
export function ConnectWalletButton() {
  const { connect, disconnect, isConnected, address } = useKlever()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleConnect() {
    setError(null)
    setBusy(true)
    try {
      await connect()
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : 'Could not connect. Is the Klever Wallet extension installed?'
      setError(message)
    } finally {
      setBusy(false)
    }
  }

  if (isConnected && address) {
    return (
      <div className={styles.wallet}>
        <span className={styles.address} title={address}>
          {truncate(address)}
        </span>
        <button
          type="button"
          className="ds-btn ds-btn--ghost"
          onClick={() => disconnect()}
          aria-label="Disconnect wallet"
        >
          <LogOut size={14} aria-hidden /> Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className={styles.wallet}>
      <button
        type="button"
        className="ds-btn"
        onClick={handleConnect}
        disabled={busy}
      >
        <Wallet size={16} aria-hidden />{' '}
        {busy ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {error && (
        <p className={styles.error} role="alert">
          {error}{' '}
          <a href="https://klever.org" target="_blank" rel="noopener noreferrer">
            Install Klever Wallet
          </a>
        </p>
      )}
    </div>
  )
}
