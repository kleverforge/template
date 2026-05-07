'use client'

import { useEffect, useId, useState } from 'react'
import { useKlever } from '@klever/connect-react'
import { Wallet, Loader2, AlertCircle } from 'lucide-react'
import styles from './BalanceList.module.css'

type AssetRow = {
  assetId: string
  ticker: string
  name: string
  balance: bigint
  precision: number
  logoUrl?: string
}

/** Format a bigint amount into a localised decimal string. */
function formatAmount(balance: bigint, precision: number): string {
  if (precision === 0) return Number(balance).toLocaleString('en-US')
  const divisor = 10n ** BigInt(precision)
  const intPart = balance / divisor
  const fracPart = balance % divisor
  const intStr = Number(intPart).toLocaleString('en-US')
  if (fracPart === 0n) return intStr
  const fracStr = fracPart.toString().padStart(precision, '0').replace(/0+$/, '')
  return `${intStr}.${fracStr}`
}

/** "USDT-XYZ" -> "USDT", "KLV" -> "KLV". */
function tickerFromAssetId(id: string): string {
  return id.split('-')[0] || id
}

export function BalanceList() {
  const { address, isConnected, provider, currentNetwork } = useKlever()
  const [rows, setRows] = useState<AssetRow[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isConnected || !address || !provider) return

    let cancelled = false
    setLoading(true)
    setError(null)

    async function load() {
      try {
        if (!provider) return
        // KleverAddress is a branded type not exported from the SDK package.
        // Cast through unknown into the provider method's parameter type.
        type AddrParam = Parameters<typeof provider.getAccount>[0]
        const account = await provider.getAccount(address as unknown as AddrParam)
        if (cancelled) return

        const klvRow: AssetRow = {
          assetId: 'KLV',
          ticker: 'KLV',
          name: 'Klever',
          balance: account.balance,
          precision: 6,
        }

        const kdaRows: AssetRow[] = (account.assets ?? []).map((a) => ({
          assetId: a.assetId,
          ticker: tickerFromAssetId(a.assetId),
          name: a.assetName,
          balance: a.balance,
          precision: a.precision,
        }))

        const allRows: AssetRow[] = [klvRow, ...kdaRows]
        setRows(allRows)

        const apiBase =
          currentNetwork === 'mainnet'
            ? 'https://api.mainnet.klever.org'
            : currentNetwork === 'testnet'
              ? 'https://api.testnet.klever.org'
              : 'https://api.devnet.klever.org'

        for (const r of allRows) {
          fetch(`${apiBase}/v1.0/assets/${r.assetId}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
              if (cancelled || !data) return
              const logo = data?.data?.asset?.logo as string | undefined
              if (logo && logo.length > 0) {
                setRows((prev) =>
                  prev
                    ? prev.map((x) =>
                        x.assetId === r.assetId ? { ...x, logoUrl: logo } : x,
                      )
                    : prev,
                )
              }
            })
            .catch(() => {})
        }
      } catch (e) {
        if (cancelled) return
        setError(e instanceof Error ? e.message : 'Could not load balance')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [address, isConnected, provider, currentNetwork])

  if (!isConnected) {
    return (
      <div className={styles.empty} role="status">
        <Wallet size={28} aria-hidden />
        <p>Connect your wallet from the top right to see your balance.</p>
      </div>
    )
  }

  if (loading && !rows) {
    return (
      <div className={styles.empty} role="status">
        <Loader2 size={20} aria-hidden className={styles.spin} />
        <p>Loading balances...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${styles.empty} ${styles.emptyError}`} role="alert">
        <AlertCircle size={20} aria-hidden />
        <p>{error}</p>
      </div>
    )
  }

  if (!rows || rows.length === 0) {
    return (
      <div className={styles.empty} role="status">
        <p>No assets in this wallet yet.</p>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {rows.map((row) => (
        <li key={row.assetId} className={styles.row}>
          <AssetIcon row={row} />
          <div className={styles.meta}>
            <span className={styles.name}>{row.name}</span>
            <span className={styles.ticker}>{row.ticker}</span>
          </div>
          <span className={styles.amount}>
            {formatAmount(row.balance, row.precision)}
          </span>
        </li>
      ))}
    </ul>
  )
}

/** Tries the kleverscan-served logo if known. Falls back to a deterministic
 *  OKLCH gradient circle with the asset ticker centered. */
function AssetIcon({ row }: { row: AssetRow }) {
  const reactId = useId()
  const [imgFailed, setImgFailed] = useState(false)
  const showImage = row.logoUrl && !imgFailed

  if (showImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={row.logoUrl}
        alt=""
        width={40}
        height={40}
        className={styles.icon}
        loading="lazy"
        onError={() => setImgFailed(true)}
      />
    )
  }

  const h1 = (row.assetId.charCodeAt(0) || 0) % 360
  const h2 = (row.assetId.charCodeAt(2) || 0) % 360
  const c1 = `oklch(0.72 0.18 ${h1})`
  const c2 = `oklch(0.55 0.20 ${h2})`
  const gid = `kfb-${reactId.replace(/[:_]/g, '')}`
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden className={styles.icon}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill={`url(#${gid})`} />
      <text
        x="20"
        y="20"
        fill="currentColor"
        textAnchor="middle"
        dominantBaseline="central"
        className={styles.iconText}
      >
        {row.ticker.slice(0, 3)}
      </text>
    </svg>
  )
}
