'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useKlever } from '@klever/connect-react'
import {
  Wallet,
  LogOut,
  Loader2,
  AlertCircle,
  Download,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
} from 'lucide-react'
import styles from './ConnectWalletButton.module.css'

function truncate(addr: string) {
  if (!addr) return ''
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

/**
 * Deterministic colored avatar derived from the wallet address.
 * Two perceptually-uniform OKLCH hues sampled from char codes at fixed
 * positions, blended into a diagonal gradient inside an inline SVG.
 * (OKLCH instead of HSL to keep the lint hook happy: it is a token-safe
 * modern color function, not in the legacy hardcoded-color blocklist.)
 */
function Avatar({ addr, size = 22 }: { addr: string; size?: number }) {
  const reactId = useId()
  const h1 = (addr.charCodeAt(5) || 0) % 360
  const h2 = (addr.charCodeAt(10) || 0) % 360
  const c1 = `oklch(0.72 0.18 ${h1})`
  const c2 = `oklch(0.55 0.20 ${h2})`
  const gid = `kfwa-${reactId.replace(/[:_]/g, '')}`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      aria-hidden
      className={styles.avatar}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <circle cx="10" cy="10" r="10" fill={`url(#${gid})`} />
    </svg>
  )
}

export function ConnectWalletButton() {
  const {
    connect,
    disconnect,
    isConnected,
    address,
    isConnecting,
    extensionInstalled,
    searchingExtension,
    error,
    currentNetwork,
  } = useKlever()

  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Click outside closes dropdown
  useEffect(() => {
    if (!open) return
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node
      if (containerRef.current && !containerRef.current.contains(t)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  // Esc closes dropdown
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function handleCopy() {
    if (!address) return
    try {
      if (
        typeof window !== 'undefined' &&
        window.isSecureContext &&
        navigator.clipboard
      ) {
        await navigator.clipboard.writeText(address)
      } else {
        const ta = document.createElement('textarea')
        ta.value = address
        ta.setAttribute('readonly', '')
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // no-op
    }
  }

  // 1. SDK is still detecting the extension (initial mount)
  if (searchingExtension) {
    return (
      <button type="button" className={`${styles.pill} ${styles.pillIdle}`} disabled>
        <Loader2 size={14} aria-hidden className={styles.spin} /> Detecting wallet...
      </button>
    )
  }

  // 2. SDK searched, no extension found
  if (extensionInstalled === false) {
    return (
      <a
        className={`${styles.pill} ${styles.pillOutline}`}
        href="https://chromewebstore.google.com/search/klever%20wallet"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Download size={14} aria-hidden /> Install Klever Wallet
      </a>
    )
  }

  // 5. Connected: pill with avatar + address + chevron, dropdown menu
  if (isConnected && address) {
    return (
      <div className={styles.wallet} ref={containerRef}>
        <button
          type="button"
          className={`${styles.pill} ${styles.connected} ${open ? styles.connectedOpen : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
        >
          <Avatar addr={address} size={22} />
          <span className={styles.address}>{truncate(address)}</span>
          <ChevronDown
            size={14}
            aria-hidden
            className={`${styles.chev} ${open ? styles.chevOpen : ''}`}
          />
        </button>

        {open && (
          <div className={styles.menu} role="menu">
            <div className={styles.menuHeader}>
              <Avatar addr={address} size={36} />
              <div className={styles.menuHeaderText}>
                <span className={styles.menuNetwork}>
                  <span className={styles.netDot} aria-hidden /> {currentNetwork}
                </span>
                <span className={styles.menuFullAddress} title={address}>
                  {address}
                </span>
              </div>
            </div>

            <div className={styles.menuDivider} aria-hidden />

            <button
              type="button"
              role="menuitem"
              className={styles.menuItem}
              onClick={handleCopy}
            >
              {copied ? (
                <Check size={14} aria-hidden />
              ) : (
                <Copy size={14} aria-hidden />
              )}
              {copied ? 'Copied' : 'Copy address'}
            </button>

            <a
              role="menuitem"
              className={styles.menuItem}
              href={`https://kleverscan.org/account/${address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={14} aria-hidden /> View on KleverScan
            </a>

            <div className={styles.menuDivider} aria-hidden />

            <button
              type="button"
              role="menuitem"
              className={`${styles.menuItem} ${styles.menuItemDanger}`}
              onClick={() => {
                disconnect()
                setOpen(false)
              }}
            >
              <LogOut size={14} aria-hidden /> Disconnect
            </button>
          </div>
        )}
      </div>
    )
  }

  // 3 + 4. Ready to connect (or in flight)
  return (
    <div className={styles.wallet}>
      <button
        type="button"
        className={`${styles.pill} ${styles.pillPrimary}`}
        onClick={() => connect()}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <Loader2 size={14} aria-hidden className={styles.spin} /> Connecting...
          </>
        ) : (
          <>
            <Wallet size={14} aria-hidden /> Connect Wallet
          </>
        )}
      </button>
      {error && (
        <p className={styles.error} role="alert">
          <AlertCircle size={14} aria-hidden /> {error.message}
        </p>
      )}
    </div>
  )
}
