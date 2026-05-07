import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { ConnectWalletButton } from '@/components/ui/ConnectWalletButton'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          {siteConfig.name}
        </Link>
        <div className={styles.actions}>
          <ConnectWalletButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
