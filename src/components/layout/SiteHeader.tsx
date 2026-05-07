import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { ConnectWalletButton } from '@/components/ui/ConnectWalletButton'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { BrandGlyph } from '@/components/ui/BrandGlyph'
import styles from './SiteHeader.module.css'

const NAV = [
  { label: 'Balance', href: '/balance' },
]

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link href="/" className={styles.brand} aria-label={`${siteConfig.name} home`}>
            <BrandGlyph size={18} className={styles.brandGlyph} />
            <span className={styles.brandText}>{siteConfig.name}</span>
          </Link>
          <nav className={styles.nav} aria-label="Primary">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.actions}>
          <ConnectWalletButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
