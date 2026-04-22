'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Hotel, Utensils, Map, Ticket, ShoppingBag, Plane, Car, Bike, Sparkles, Calendar, MoreHorizontal } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { useTranslations } from 'next-intl'

// ─── Static assets ────────────────────────────────────────────────────────────

const ICONS = [Hotel, Utensils, Map, Ticket, ShoppingBag, Plane, Car, Bike, Sparkles, Calendar, MoreHorizontal]
const SECTOR_KEYS = ['accommodation', 'food', 'tours', 'attractions', 'shopping', 'scheduledTransport', 'onDemandTransport', 'vehicleRental', 'spa', 'events', 'other']

const CARD_COLORS = [
  { text: 'var(--color-industry-accommodation)',         bg: 'var(--color-industry-accommodation-bg)' },
  { text: 'var(--color-industry-food)',                  bg: 'var(--color-industry-food-bg)' },
  { text: 'var(--color-industry-tours)',                 bg: 'var(--color-industry-tours-bg)' },
  { text: 'var(--color-industry-attractions)',           bg: 'var(--color-industry-attractions-bg)' },
  { text: 'var(--color-industry-shopping)',              bg: 'var(--color-industry-shopping-bg)' },
  { text: 'var(--color-industry-transport-scheduled)',   bg: 'var(--color-industry-transport-scheduled-bg)' },
  { text: 'var(--color-industry-transport-demand)',      bg: 'var(--color-industry-transport-demand-bg)' },
  { text: 'var(--color-industry-rental)',                bg: 'var(--color-industry-rental-bg)' },
  { text: 'var(--color-industry-spa)',                   bg: 'var(--color-industry-spa-bg)' },
  { text: 'var(--color-industry-events)',                bg: 'var(--color-industry-events-bg)' },
  { text: 'var(--color-industry-other)',                 bg: 'var(--color-industry-other-bg)' },
]

function scrollToRegister() {
  const el = document.getElementById('register')
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top: y, behavior: 'smooth' })
}

// ─── Desktop Card ─────────────────────────────────────────────────────────────

function FeatureCard({
  icon: Icon,
  label,
  desc,
  benefits,
  color,
  onSelect,
  imageSrc,
}: {
  icon: React.ElementType
  label: string
  desc: string
  benefits: string[]
  color: { text: string; bg: string }
  onSelect: () => void
  imageSrc?: string
}) {
  const [hovered, setHovered] = useState(false)
  const t = useTranslations('IndustryCarousel')

  return (
    <div
      className="w-full min-h-[240px] rounded-[1.5rem] p-6 flex flex-col cursor-pointer relative overflow-hidden"
      style={{
        backgroundColor: hovered ? '#ffffff' : color.bg,
        boxShadow: hovered
          ? '0 8px 24px -8px rgba(0,0,0,0.12)'
          : '0 1px 3px 0 rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.25s ease, background-color 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
    >
      {/* Background decoration — photo or icon */}
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute -bottom-16 -right-16 w-52 h-52 object-cover object-center pointer-events-none"
          style={{
            transform: hovered ? 'scale(1.18)' : 'scale(1)',
            transformOrigin: 'bottom right',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        />
      ) : (
        <Icon
          className="absolute -bottom-3 -right-3 w-28 h-28 pointer-events-none transition-opacity duration-300"
          style={{ color: color.text, opacity: hovered ? 0.1 : 0.06 }}
          aria-hidden="true"
        />
      )}

      {/* Label — full card width */}
      <p className="text-xl font-medium text-[var(--color-text-default)] mb-1.5">
        {label}
      </p>

      {/* Body content — capped at 2/3 so image has room */}
      <div className="w-2/3 flex-1 flex flex-col">

        {/* Fixed-height content area — crossfade desc ↔ benefits, zero layout shift */}
        <div className="relative flex-1" style={{ minHeight: '5rem' }}>

          {/* Description layer */}
          <div
            className="absolute inset-0 transition-opacity duration-200"
            style={{ opacity: hovered ? 0 : 1, pointerEvents: hovered ? 'none' : 'auto' }}
          >
            <p className="text-base text-[var(--color-text-dim)] leading-6 line-clamp-3">
              {desc}
            </p>
          </div>

          {/* Benefits layer */}
          <div
            className="absolute inset-0 transition-opacity duration-200 flex flex-col gap-2"
            style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? 'auto' : 'none' }}
          >
            {benefits.map((b, i) => (
              <p key={i} className="text-sm text-[var(--color-text-dim)] flex items-start gap-1.5">
                <span style={{ color: color.text }} className="mt-0.5 shrink-0">•</span>
                <span>{b}</span>
              </p>
            ))}
          </div>

        </div>

      </div>

      {/* CTA — luôn ở bottom left, chỉ hiện khi hover */}
      <div
        className="mt-auto pt-4 flex items-center gap-1 text-xs font-semibold transition-[opacity,color] duration-200"
        style={{
          color: 'var(--color-brand-primary)',
          opacity: hovered ? 1 : 0,
        }}
      >
        {t('contactCta')}
      </div>
    </div>
  )
}

// ─── Mobile Card ──────────────────────────────────────────────────────────────

function MobileCard({
  icon: Icon,
  label,
  desc,
  benefits,
  color,
  onSelect,
}: {
  icon: React.ElementType
  label: string
  desc: string
  benefits: string[]
  color: { text: string; bg: string }
  onSelect: () => void
}) {
  const t = useTranslations('IndustryCarousel')

  return (
    <div
      className="w-full min-h-[340px] rounded-[2rem] p-6 flex flex-col items-center gap-4 text-center relative cursor-pointer"
      style={{
        backgroundColor: color.bg,
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.25s ease',
      }}
      onClick={onSelect}
    >

      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
        <Icon className="w-8 h-8" style={{ color: color.text }} aria-hidden="true" />
      </div>
      <p className="text-lg font-semibold text-[var(--color-text-default)] leading-6">{label}</p>
      <p className="text-sm text-[var(--color-text-dim)] leading-5 text-left w-full">{desc}</p>
      <ul className="flex flex-col gap-1.5 w-full text-left">
        {benefits.map((b, i) => (
          <li key={i} className="text-sm text-[var(--color-text-dim)] flex items-start gap-2">
            <span style={{ color: color.text }} className="mt-0.5 shrink-0">•</span>
            {b}
          </li>
        ))}
      </ul>
      <Button variant="ghost" size="sm" className="w-full mt-auto" onClick={onSelect}>
        {t('contactCta')}
      </Button>
    </div>
  )
}

// ─── IndustryCarouselV2 ───────────────────────────────────────────────────────

export function IndustryCarouselV2({ onSectorSelect }: { onSectorSelect?: (key: string) => void }) {
  const t = useTranslations('IndustryCarousel')
  const [activeIndex, setActiveIndex] = useState(0)

  const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({
    icon: ICONS[i],
    label: t(`items.${i}.label`),
    desc: t(`items.${i}.desc`),
    benefits: [0, 1, 2].map(j => t(`items.${i}.benefits.${j}`)),
    sectorKey: SECTOR_KEYS[i],
    color: CARD_COLORS[i],
    imageSrc: i === 0 ? '/images/industry/accommodation.png'
            : i === 1 ? '/images/industry/food-beverages.png'
            : i === 2 ? '/images/industry/tour.png'
            : undefined,
  }))

  function handleSelect(sectorKey: string) {
    onSectorSelect?.(sectorKey)
    scrollToRegister()
  }

  return (
    <section className="py-16 bg-white">
      {/* Header — left-aligned, CTA on right */}
      <div className="max-w-[1440px] mx-auto px-8 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-medium text-[var(--color-text-default)] leading-[1.3] mb-4">
            {t('title')}
          </h2>
          <p className="text-[var(--color-text-dim)] text-lg leading-relaxed max-w-xl">
            {t('subtitle')}
          </p>
        </div>
        <Button variant="secondary" size="md" className="shrink-0" onClick={scrollToRegister}>
          {t('contactCta')}
        </Button>
      </div>

      {/* Mobile: swipe carousel */}
      <div className="md:hidden overflow-hidden">
        <motion.div
          className="flex gap-4 px-6"
          animate={{ x: `calc(${-activeIndex} * (100vw - 48px + 16px))` }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60 && activeIndex < cards.length - 1) setActiveIndex(p => p + 1)
            else if (info.offset.x > 60 && activeIndex > 0) setActiveIndex(p => p - 1)
          }}
        >
          {cards.map((card, i) => (
            <div key={i} className="shrink-0 w-[calc(100vw-48px)]">
              <MobileCard
                icon={card.icon}
                label={card.label}
                desc={card.desc}
                benefits={card.benefits}
                color={card.color}
                onSelect={() => handleSelect(card.sectorKey)}
              />
            </div>
          ))}
        </motion.div>

        {/* Pagination — tappable dots, larger hit area */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Sectors">
          {cards.map((card, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={activeIndex === i}
              aria-label={card.label}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-5 bg-[var(--color-text-default)]'
                  : 'w-2 bg-[var(--color-border-default)]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: 4-column grid — all 11 sectors visible, no pagination */}
      <div className="hidden md:block max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <FeatureCard
              key={i}
              icon={card.icon}
              label={card.label}
              desc={card.desc}
              benefits={card.benefits}
              color={card.color}
              onSelect={() => handleSelect(card.sectorKey)}
              imageSrc={card.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
