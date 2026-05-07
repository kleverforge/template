import type { SVGProps } from 'react'

/**
 * Klever Forge brand mark: hex (crypto) with an "F" (forge) cut out via
 * fill-rule:evenodd. Single path, currentColor, scales cleanly from 14px
 * inline to large display.
 */
export function BrandGlyph({
  size = 18,
  ...props
}: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="currentColor"
      fillRule="evenodd"
      aria-hidden
      {...props}
    >
      <path d="M16 4 L48 4 L60 32 L48 60 L16 60 L4 32 Z M24 18 L42 18 L42 22 L28 22 L28 30 L38 30 L38 34 L28 34 L28 46 L24 46 Z" />
    </svg>
  )
}
