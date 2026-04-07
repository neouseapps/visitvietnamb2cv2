// ─── VSVN Brand Logo ─────────────────────────────────────────────────────────
//
// 4 variants (from Figma node 25:6906):
//   'all-dark'    — black icon + black text   → for light/white backgrounds
//   'color-light' — red icon + dark text      → for light/white backgrounds (preferred)
//   'color-dark'  — red icon + white text     → for dark backgrounds (preferred)
//   'all-white'   — white icon + white text   → for dark backgrounds (mono)
//
// Sizing: control width via `className` (e.g. "w-36").
// Height is derived automatically from the 718:253 aspect ratio.
//
// Assets: /public/images/logo/ (downloaded from Figma, permanent)
// ─────────────────────────────────────────────────────────────────────────────

export type LogoVariant = 'all-dark' | 'color-light' | 'color-dark' | 'all-white'

interface VsvnLogoProps {
  variant?: LogoVariant
  className?: string
}

// Each element: { inset: 'top right bottom left', src }
// Positions are percentage-based insets within the 718×253 canvas.
function LogoLayer({
  inset,
  src,
}: {
  inset: string
  src: string
}) {
  return (
    // Wrapper div positioned by percentage inset within parent
    <div className="absolute" style={{ inset }}>
      {/* Image fills wrapper 100% — exact Figma pattern */}
      <img
        src={src}
        alt=""
        aria-hidden={true}
        draggable={false}
        className="absolute inset-0 block max-w-none size-full object-cover pointer-events-none"
      />
    </div>
  )
}

export function VsvnLogo({ variant = 'color-light', className }: VsvnLogoProps) {
  const isAllWhite     = variant === 'all-white'
  const isColorDark    = variant === 'color-dark'
  const isColor        = variant === 'color-light' || isColorDark
  const isColorOrWhite = isColor || isAllWhite

  // ── Asset paths ──────────────────────────────────────────────────────────
  const iconSrc   = isAllWhite ? '/images/logo/icon-white.svg'
                  : isColor    ? '/images/logo/icon-color.svg'
                               : '/images/logo/icon-dark.svg'

  const textSrc   = (isColorDark || isAllWhite)
                  ? '/images/logo/text-white.svg'
                  : '/images/logo/text-dark.svg'

  const dot1Src   = isColorOrWhite ? '/images/logo/dot1-color.svg' : '/images/logo/dot1-dark.svg'
  const dot2Src   = isColorOrWhite ? '/images/logo/dot2-color.svg' : '/images/logo/dot2-dark.svg'
  const swooshSrc = isAllWhite ? '/images/logo/swoosh-white.svg'
                  : isColor    ? '/images/logo/swoosh-color.svg'
                               : '/images/logo/swoosh-dark.svg'
  const dot3Src   = isColorOrWhite ? '/images/logo/dot3-color.svg' : '/images/logo/dot3-dark.svg'

  return (
    // Original Figma canvas: 718 × 253.189 px → aspect-ratio ≈ 2.835
    // Children are absolutely positioned using the same % insets as Figma.
    <div
      role="img"
      aria-label="Visit Vietnam"
      className={`relative flex-shrink-0 ${className ?? 'w-36'}`}
      style={{ aspectRatio: '718 / 253.189' }}
    >
      {/* Icon mark (phoenix + compass) — inset-[0 56.95% 1.54% 14.6%] */}
      <LogoLayer inset="0 56.95% 1.54% 14.6%" src={iconSrc} />

      {/* Wordmark "Visit Vietnam" — inset-[24.01% 0 10.04% 46.11%] */}
      <LogoLayer inset="24.01% 0 10.04% 46.11%" src={textSrc} />

      {/* Decorative dot 1 — inset-[52.36% 57.93% 46.79% 41.92%] */}
      <LogoLayer inset="52.36% 57.93% 46.79% 41.92%" src={dot1Src} />

      {/* Decorative dot 2 — inset-[53.69% 57.68% 46.31% 42.32%] */}
      <LogoLayer inset="53.69% 57.68% 46.31% 42.32%" src={dot2Src} />

      {/* Decorative swoosh — inset-[22.12% 57.46% 0 0] */}
      <LogoLayer inset="22.12% 57.46% 0 0" src={swooshSrc} />

      {/* Decorative dot 3 — inset-[93.8% 89.37% 6.16% 10.59%] */}
      <LogoLayer inset="93.8% 89.37% 6.16% 10.59%" src={dot3Src} />
    </div>
  )
}
