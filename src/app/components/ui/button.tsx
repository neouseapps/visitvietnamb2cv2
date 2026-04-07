'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const iconStyle = { width: 'var(--btn-icon-size, 16px)', height: 'var(--btn-icon-size, 16px)' }

/* ─────────────────────────────────────────────────────────────────────────────
   Token Mapping (Figma node 9021:65332 → vsvn-tokens.css)
   ─────────────────────────────────────────────────────────────────────────────
   Figma "Brand"     → bg: --color-brand-primary        text: --color-text-brand-primary
   Figma "Primary"   → bg: --color-bg-neutral-inverse   text: --color-bg-neutral-bright
   Figma "Secondary" → bg: --color-bg-neutral-bright    text: --color-text-default
   Figma "Tertiary"  → bg: --color-bg-default           text: --color-text-default
   Figma "Ghost"     → bg: transparent                  text: --color-text-default
   Figma "Link"      → bg: transparent                  text: --color-text-default (underline)
   ───────────────────────────────────────────────────────────────────────────── */

const buttonVariants = cva(
  // ── base ────────────────────────────────────────────────────────────────────
  [
    'inline-flex items-center justify-center',
    'font-[family-name:var(--font-default)] font-semibold leading-none',
    'transition-all duration-150 ease-in-out',
    'rounded-[var(--btn-radius,8px)]',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-[var(--color-focus-default)] focus-visible:ring-offset-2',
    'disabled:opacity-[var(--opacity-disabled-state,0.2)] disabled:pointer-events-none',
    'active:scale-[0.98]',
    'select-none whitespace-nowrap',
  ],
  {
    variants: {
      // ── variant ─────────────────────────────────────────────────────────────
      variant: {
        /** Figma: Brand — amber CTA */
        brand: [
          'bg-[var(--color-brand-primary)] text-[var(--color-text-brand-primary)]',
          'hover:bg-[var(--color-brand-primary-hover)]',
        ],
        /** Figma: Primary — dark charcoal */
        primary: [
          'bg-[var(--color-bg-neutral-inverse)] text-[var(--color-bg-neutral-bright)]',
          'hover:bg-[var(--color-bg-neutral-inverse-hover)]',
        ],
        /** Figma: Secondary — warm off-white */
        secondary: [
          'bg-[var(--color-bg-neutral-bright)] text-[var(--color-text-default)]',
          'hover:bg-[var(--color-bg-dim-hover)]',
        ],
        /** Figma: Tertiary — white surface */
        tertiary: [
          'bg-[var(--color-bg-default)] text-[var(--color-text-default)]',
          'hover:bg-[var(--color-bg-hover)]',
        ],
        /** Figma: Ghost — transparent, no border */
        ghost: [
          'bg-transparent text-[var(--color-text-default)]',
          'hover:bg-[var(--color-bg-hover)]',
        ],
        /** Light — white surface, for use on dark backgrounds */
        light: [
          'bg-white text-[var(--color-text-default)]',
          'hover:bg-white/90',
        ],
        /** Figma: Link — text link style */
        link: [
          'bg-transparent text-[var(--color-text-default)]',
          'underline-offset-2 hover:underline',
          '!p-0 !rounded-none h-auto',
        ],
      },
      // ── size ────────────────────────────────────────────────────────────────
      size: {
        /** Figma Small  — h: 28px, icon: 16px, font: 14px */
        sm: [
          'text-sm gap-1.5 py-1.5 px-2.5',
          '[--btn-radius:var(--radius-sm,8px)]',
          '[--btn-icon-size:16px]',
        ],
        /** Figma Medium — h: 36px, icon: 20px, font: 14px */
        md: [
          'text-sm gap-1.5 py-2 px-3.5',
          '[--btn-radius:var(--radius-sm,8px)]',
          '[--btn-icon-size:20px]',
        ],
        /** Figma Large  — h: 44px, icon: 24px, font: 16px */
        lg: [
          'text-base gap-2 py-2.5 px-[18px]',
          '[--btn-radius:var(--radius-md,12px)]',
          '[--btn-icon-size:24px]',
        ],
        /** Figma XLarge — h: 52px, icon: 28px, font: 18px */
        xl: [
          'text-[18px] gap-2.5 py-3 px-[22px]',
          '[--btn-radius:var(--radius-md,12px)]',
          '[--btn-icon-size:28px]',
        ],
      },
    },
    defaultVariants: {
      variant: 'brand',
      size: 'md',
    },
  }
)

// ── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin shrink-0"
      style={{ width: 'var(--btn-icon-size, 16px)', height: 'var(--btn-icon-size, 16px)' }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child element (e.g. Next.js <Link>) while preserving styles */
  asChild?: boolean
  /** Show loading spinner and disable interaction */
  isLoading?: boolean
  /** Icon rendered before the label */
  leftIcon?: React.ReactNode
  /** Icon rendered after the label */
  rightIcon?: React.ReactNode
}

// ── Component ─────────────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const cls = cn(buttonVariants({ variant, size }), className)

    // ── asChild: merge styles onto child element, inject icons inside it ──────
    if (asChild) {
      const child = React.Children.only(children as React.ReactElement<{ children?: React.ReactNode }>)
      return (
        <Slot
          ref={ref}
          className={cls}
          aria-busy={isLoading || undefined}
          {...props}
          {...((disabled || isLoading) ? { 'aria-disabled': true } : {})}
        >
          {React.cloneElement(child, {}, ...[
            leftIcon  && <span key="l" className="shrink-0" style={iconStyle} aria-hidden="true">{leftIcon}</span>,
            isLoading ? <Spinner key="s" /> : child.props.children,
            rightIcon && <span key="r" className="shrink-0" style={iconStyle} aria-hidden="true">{rightIcon}</span>,
          ].filter(Boolean))}
        </Slot>
      )
    }

    // ── default: render as <button> ───────────────────────────────────────────
    return (
      <button
        ref={ref}
        className={cls}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner />
            {children && <span className="opacity-70">{children}</span>}
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="shrink-0" style={iconStyle} aria-hidden="true">{leftIcon}</span>
            )}
            {children}
            {rightIcon && (
              <span className="shrink-0" style={iconStyle} aria-hidden="true">{rightIcon}</span>
            )}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
