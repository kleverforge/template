import { Sparkles, Zap, Wrench } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="ds-container ds-py-16">
      <header className="ds-mb-12">
        <p className="ds-overline ds-mb-3">v0.1 . Forge DS bundled</p>
        <h1 className="ds-hero-title ds-mb-3">klever-forge template</h1>
        <p className="ds-text-lg ds-text-secondary ds-max-w-2xl">
          Your starting point for any project on the Klever blockchain. Open this folder in Claude
          Code and ask it to build what you have in mind. Replace this page with whatever you want
          to ship.
        </p>
      </header>

      <section className="ds-grid ds-grid-cols-1 ds-gap-4 ds-md:grid-cols-3">
        <article className="ds-card ds-card__body">
          <div className="ds-flex ds-items-center ds-gap-2 ds-mb-2">
            <Sparkles size={16} aria-hidden />
            <h2 className="ds-text-base ds-font-semibold">Forge DS included</h2>
          </div>
          <p className="ds-text-sm ds-text-secondary">
            The CSS design system lives in <code>src/forge-ds/</code>. Use any{' '}
            <code>ds-*</code> class in your JSX. Customize tokens by overriding{' '}
            <code>--ds-*</code> variables in <code>app/globals.css</code>.
          </p>
        </article>

        <article className="ds-card ds-card__body">
          <div className="ds-flex ds-items-center ds-gap-2 ds-mb-2">
            <Zap size={16} aria-hidden />
            <h2 className="ds-text-base ds-font-semibold">Mono-light by default</h2>
          </div>
          <p className="ds-text-sm ds-text-secondary">
            Satoshi, Switzer and Geist Mono ship preloaded. Pick one, drop the others, or swap
            for a different family in <code>app/layout.tsx</code>.
          </p>
        </article>

        <article className="ds-card ds-card__body">
          <div className="ds-flex ds-items-center ds-gap-2 ds-mb-2">
            <Wrench size={16} aria-hidden />
            <h2 className="ds-text-base ds-font-semibold">Replace this page</h2>
          </div>
          <p className="ds-text-sm ds-text-secondary">
            Edit <code>src/app/page.tsx</code> with your idea. Add routes under <code>src/app/</code>.
            Ask Claude Code to wire up wallet connection, contract calls, or whatever your project
            needs.
          </p>
        </article>
      </section>

      <section className="ds-mt-12 ds-text-sm ds-text-tertiary">
        <p>
          Need a refresher on Klever-specific concepts, prompts, or pitfalls? See{' '}
          <a href="https://kleverforge.com" className="ds-text-primary">
            klever-forge
          </a>
          .
        </p>
      </section>
    </main>
  )
}
