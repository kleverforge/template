# DS_CUSTOM - klever-forge-template

Inventario delle customizzazioni CSS project-specific rispetto al design system.

**Ultimo aggiornamento:** 7 May 2026 (initial scaffold)
**DS:** Forge DS, vendored locally in `src/forge-ds/` (forked from the internal design system at version 0.10.12)
**File CSS custom:** `src/app/globals.css` (body + selection only), `src/styles/components.css` (empty header)

---

## Riepilogo

| Metrica | Valore |
|---------|--------|
| Classi custom definite | 0 |
| Override DS | 0 |
| Inline styles | 0 |
| Classi non definite | 0 |
| Compliance | **100% - Template baseline** |

---

## Note

- Zero CSS custom oltre al setup base (body background/color/font-family, selection colors).
- Forge DS vendored at `src/forge-ds/` - 60 components, ~140 `--ds-*` tokens, 4 utility groups.
- Heading semantici (`h1`/`h2`) usano le classi canoniche del DS (`ds-hero-title`, `ds-section-title`, `ds-heading-ui`, `ds-overline`, `ds-stat-number`).
- Eyebrow usa `ds-overline` (1 classe), non utility soup.
- Theme switching via `next-themes` (data-theme attribute).
- Fonts caricati con `next/font/local`: Clash Display + Switzer in `src/fonts/`. Geist Mono dal pacchetto `geist`.

---

## Azioni Future

- [ ] Quando un consumer del template fa cose ricorrenti, valutare se promuovere il pattern come variante del DS.
- [ ] Se la sezione Resources di klever-forge serve gli ZIP, lo ZIP viene da questo template (build pulito) - mantenere quindi questo come baseline pulito.
