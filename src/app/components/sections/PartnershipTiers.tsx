'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
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

const SHOW_COUNT = 5

// ─── TierCard ─────────────────────────────────────────────────────────────────

function TierCard({ tier }: { tier: Tier }) {
  const t = useTranslations('PartnershipTiers')
  const [expanded, setExpanded] = useState(false)
  const hasShowMore = !!tier.premium && tier.benefits.length > SHOW_COUNT
  const displayedBenefits = hasShowMore && !expanded
    ? tier.benefits.slice(0, SHOW_COUNT)
    : tier.benefits

  const textMuted = tier.highlight ? 'text-white/60' : 'text-[var(--color-text-dim-variant)]'
  const textBody  = tier.highlight ? 'text-white/80' : 'text-[var(--color-text-dim)]'
  const checkColor = tier.highlight ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-text-success-default)]'

  return (
    <div
      className={`group relative flex flex-col h-full rounded-card p-8 ${
        tier.highlight
          ? 'bg-[var(--color-bg-inverse)] text-white shadow-2xl'
          : tier.exclusive
            ? 'bg-[var(--color-bg-dim)] border border-[var(--color-border-default)]'
            : 'bg-white border border-[var(--color-border-default)] shadow-sm'
      }`}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3.5 inset-x-0 flex justify-center z-10">
          <Badge className="bg-[var(--color-brand-primary)] text-white border-0 shadow-sm">
            {tier.badge}
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className={`text-3xl font-default font-medium mb-1 ${tier.highlight ? 'text-white' : 'text-[var(--color-text-default)]'}`}>
          {tier.name}
        </h3>
        <p className={`text-sm h-[60px] ${textMuted}`}>{tier.tagline}</p>
      </div>

      {/* Benefits label — strategic tier only */}
      {tier.exclusive && (
        <div className="mb-6 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-dim-variant)]">
            {t('benefitsLabel')}
          </span>
        </div>
      )}

      {/* Benefits */}
      <div className="relative flex-1 mb-6">
        <ul className="space-y-3">
          <AnimatePresence initial={false}>
            {displayedBenefits.map((benefit) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-start gap-3 text-sm ${textBody}`}
              >
                <Check className={`w-4 h-4 shrink-0 mt-0.5 ${checkColor}`} aria-hidden="true" />
                {benefit}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {/* Gradient fade when collapsed */}
        {hasShowMore && !expanded && (
          <div
            className={`absolute bottom-0 inset-x-0 h-12 pointer-events-none ${
              tier.highlight
                ? 'bg-gradient-to-t from-[var(--color-bg-inverse)] to-transparent'
                : 'bg-gradient-to-t from-white to-transparent'
            }`}
          />
        )}
      </div>

      {/* Show more toggle */}
      {hasShowMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-1 text-sm font-medium mb-6 self-center ${
            tier.highlight
              ? 'text-white/70 hover:text-white'
              : 'text-[var(--color-brand-primary)] hover:opacity-80'
          } transition-colors`}
        >
          {expanded ? t('showLess') : t('showMore')}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      )}

      {/* CTA */}
      <Button
        asChild
        variant={tier.ctaVariant}
        size="md"
        className="w-full mt-auto lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200"
      >
        <a href={tier.ctaHref ?? '#register'}>{tier.cta}</a>
      </Button>
    </div>
  )
}

// ─── StrategicBanner ──────────────────────────────────────────────────────────

function StrategicBanner({ tier, mobile }: { tier: Tier; mobile?: boolean }) {
  return (
    <div
      className={`group relative w-full rounded-card overflow-hidden flex items-center ${mobile ? 'justify-center' : 'justify-end'}`}
      style={{ height: mobile ? 240 : 320, background: '#150900' }}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/strategic-partner-banner.png"
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover ${mobile ? 'object-[20%_center]' : 'object-left'}`}
      />
      {/* Dark overlay on mobile so text stays readable */}
      {mobile && <div className="absolute inset-0 bg-black/50" />}

      {/* Right-side content */}
      <div className={`relative z-10 flex flex-col gap-3 ${mobile ? 'items-center text-center px-6 w-full' : 'items-end text-right pr-16 max-w-[560px]'}`}>
        <h3
          className="text-white font-display font-normal"
          style={{ fontSize: mobile ? 24 : 36, lineHeight: mobile ? '30px' : '42px', letterSpacing: '-0.36px' }}
        >
          {tier.name}
        </h3>
        <p className={`text-white/80 leading-relaxed ${mobile ? 'text-sm' : 'text-lg'}`}>{tier.tagline}</p>
        <Button asChild variant={tier.ctaVariant} size={mobile ? 'sm' : 'md'} className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
          <a href={tier.ctaHref ?? '#register'}>{tier.cta}</a>
        </Button>
      </div>
    </div>
  )
}

// ─── TierCardV2 ───────────────────────────────────────────────────────────────

function TierCardV2({ tier }: { tier: Tier }) {
  const t = useTranslations('PartnershipTiers')
  const isFeature = !!tier.exclusive

  return (
    <div
      className={`group relative flex flex-col h-full p-8 xl:p-10 transition-colors duration-200 overflow-hidden isolate ${
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
        <p className={`text-sm mb-6 leading-relaxed h-[72px] ${isFeature ? 'text-white' : 'text-[var(--color-text-dim)]'}`}>
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
          asChild
          variant={isFeature ? 'brand' : tier.ctaVariant}
          size="md"
          className="w-full mt-auto"
        >
          <a href={tier.ctaHref ?? '#register'}>{tier.cta}</a>
        </Button>
      </div>
    </div>
  )
}

// ─── PartnershipTiers ─────────────────────────────────────────────────────────

export function PartnershipTiers() {
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
      <div className="max-w-[1440px] mx-auto px-8 relative z-10">

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
                <TierCardV2 key={tier.id} tier={tier} />
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
                  <TierCardV2 tier={tier} />
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
