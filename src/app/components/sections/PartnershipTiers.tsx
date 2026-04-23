'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { useTranslations } from 'next-intl'

// ─── Types ────────────────────────────────────────────────────────────────────

type CtaVariant = 'brand' | 'primary' | 'secondary' | 'tertiary' | 'ghost'

interface Tier {
  id: string
  name: string
  tagline: string
  price: string
  priceSub?: string
  badge?: string
  highlight?: boolean   // dark (--color-bg-inverse) card
  premium?: boolean     // taller, show-more for 10 benefits
  exclusive?: boolean   // strategic tier — no price, custom CTA
  benefits: string[]
  cta: string
  ctaVariant: CtaVariant
  ctaHref?: string
}

// ─── TierCardV2 ───────────────────────────────────────────────────────────────

function TierCardV2({ tier, onTierSelect }: { tier: Tier; onTierSelect?: (id: string, name: string) => void }) {
  const t = useTranslations('PartnershipTiers')
  const isFeature = !!tier.exclusive

  return (
    <div
      className={`group relative flex flex-col h-full p-6 sm:p-8 xl:p-10 transition-colors duration-200 overflow-hidden isolate ${
        isFeature
          ? 'border border-white/30'
          : 'bg-[var(--color-bg-dim)] border border-[var(--color-border-default)] lg:border-0 lg:bg-transparent lg:hover:bg-[var(--color-bg-dim)]'
      }`}
      style={isFeature ? { background: 'linear-gradient(180deg, var(--color-alpha-black-20) 0%, var(--color-alpha-black-80) 100%), var(--color-bg-brand-primary-dim)' } : undefined}
    >
      {/* Strategic tier background image */}
      {isFeature && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/plan-special-long.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-bottom opacity-30 pointer-events-none z-0"
        />
      )}

      {/* Content wrapper — z-[1] ensures it paints above the z-0 background image */}
      <div className="relative z-[1] flex-1 flex flex-col">
        {/* Badge */}
        {tier.badge && (
          <div className="mb-4">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
              tier.highlight
                ? 'bg-[var(--color-bg-inverse)] text-white border-0'
                : 'bg-white text-[var(--color-text-dim)] border border-[var(--color-border-default)]'
            }`}>
              {tier.badge}
            </span>
          </div>
        )}

        {/* Tier name */}
        <h3 className={`text-2xl font-display font-medium mb-2 ${isFeature ? 'text-white' : 'text-[var(--color-brand-primary)]'}`}>
          {tier.name}
        </h3>

        {/* Tagline */}
        <p className={`text-sm mb-6 leading-relaxed sm:h-[72px] ${isFeature ? 'text-white' : 'text-[var(--color-text-dim)]'}`}>
          {tier.tagline}
        </p>

        {/* Divider */}
        <div className={`h-px mb-6 ${isFeature ? 'bg-white/20' : 'bg-[var(--color-border-default)]'}`} />

        {/* Benefits */}
        <ul className="flex flex-col gap-3 flex-1 mb-8">
          {tier.benefits.map((b) => (
            <li key={b} className={`flex items-start gap-3 text-sm ${isFeature ? 'text-white/80' : 'text-[var(--color-text-dim)]'}`}>
              <Check
                className={`w-4 h-4 shrink-0 mt-0.5 ${isFeature ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-text-success-default)]'}`}
                aria-hidden="true"
              />
              {b}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={isFeature ? 'brand' : tier.ctaVariant}
          size="md"
          className="w-full mt-auto"
          onClick={() => onTierSelect?.(tier.id, tier.name)}
        >
          {tier.cta}
        </Button>
      </div>
    </div>
  )
}

// ─── PartnershipTiers ─────────────────────────────────────────────────────────

export function PartnershipTiers({ onTierSelect }: { onTierSelect?: (id: string, name: string) => void }) {
  const t = useTranslations('PartnershipTiers')
  const TIERS = t.raw('items') as Tier[]

  const [activeIndex, setActiveIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setSlideWidth(containerRef.current.offsetWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const regularTiers = TIERS.filter((t) => !t.exclusive)
  const strategicTier = TIERS.find((t) => t.exclusive)

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 60
    if (info.offset.x < -threshold && activeIndex < TIERS.length - 1) {
      setActiveIndex((i) => i + 1)
    } else if (info.offset.x > threshold && activeIndex > 0) {
      setActiveIndex((i) => i - 1)
    }
  }

  return (
    <section id="pricing" className="py-16 bg-bg-inverse relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-dot-brand" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-primary rounded-full blur-[100px] opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary rounded-full blur-[100px] opacity-20 pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-2">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl font-display font-medium text-white leading-[1.3] mb-4">
            {t('title')}
          </h2>
          <p className="text-[var(--color-alpha-white-70)] text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* ── Desktop V2: design mới ── */}
        <div className="hidden lg:block pt-12">
          <div className="rounded-3xl overflow-hidden bg-white shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-[var(--color-border-default)]/30">
            <div className="grid grid-cols-4 divide-x divide-[var(--color-border-default)]">
              {TIERS.map((tier) => (
                <TierCardV2 key={tier.id} tier={tier} onTierSelect={onTierSelect} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile: slide 4 cards ── */}
        <div className="lg:hidden pt-5">
          <div ref={containerRef} className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{
                left: -(TIERS.length - 1) * slideWidth,
                right: 0,
              }}
              dragElastic={0.1}
              animate={{ x: -activeIndex * slideWidth }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onDragEnd={handleDragEnd}
            >
              {TIERS.map((tier) => (
                <div key={tier.id} className="flex-shrink-0 w-full">
                  <TierCardV2 tier={tier} onTierSelect={onTierSelect} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TIERS.map((tier, i) => (
              <button
                key={tier.id}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? 'w-6 bg-[var(--color-brand-primary)]'
                    : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
