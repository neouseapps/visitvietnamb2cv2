'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Eye, Hotel, Utensils, Map, Ticket, ShoppingBag, Plane, Car, Bike, Sparkles, Calendar, MoreHorizontal } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { useTranslations } from 'next-intl'

// ─── Static assets ────────────────────────────────────────────────────────────

const ICONS = [Hotel, Utensils, Map, Ticket, ShoppingBag, Plane, Car, Bike, Sparkles, Calendar, MoreHorizontal]
const SECTOR_KEYS = ['accommodation', 'food', 'tours', 'attractions', 'shopping', 'scheduledTransport', 'onDemandTransport', 'vehicleRental', 'spa', 'events', 'other']

const CARD_COLORS = [
  { text: '#2563EB', bg: '#EFF6FF' },
  { text: '#16A34A', bg: '#F0FDF4' },
  { text: '#EA580C', bg: '#FFF7ED' },
  { text: '#7C3AED', bg: '#F5F3FF' },
  { text: '#DB2777', bg: '#FDF2F8' },
  { text: '#0D9488', bg: '#F0FDFA' },
  { text: '#EA580C', bg: '#FFF7ED' },
  { text: '#16A34A', bg: '#F0FDF4' },
  { text: '#7C3AED', bg: '#F5F3FF' },
  { text: '#DB2777', bg: '#FDF2F8' },
  { text: '#0D9488', bg: '#F0FDFA' },
]

// Slide 1: indices 0–5 (3/3), Slide 2: indices 6–10 (3/2)
const SLIDES = [
  [[0, 1, 2], [3, 4, 5]],
  [[6, 7, 8], [9, 10]],
]

function scrollToRegister() {
  const el = document.getElementById('register')
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top: y, behavior: 'smooth' })
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({
  icon: Icon,
  label,
  desc,
  benefits,
  color,
  sectorKey,
  onSectorSelect,
}: {
  icon: React.ElementType
  label: string
  desc: string
  benefits: string[]
  color: { text: string; bg: string }
  sectorKey: string
  onSectorSelect?: (key: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const t = useTranslations('IndustryCarousel')

  function handleCta() {
    onSectorSelect?.(sectorKey)
    scrollToRegister()
  }

  return (
    <div
      className="w-[280px] h-[280px] bg-white rounded-[2rem] p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden"
      style={{
        boxShadow: hovered
          ? '0 12px 40px -8px rgba(0,0,0,0.12)'
          : '0 1px 3px 0 rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Floating icon area */}
      <div className="flex justify-center items-center flex-1">
        <div className="relative flex flex-col items-center">
          {/* Floating icon */}
          <motion.div
            animate={{ y: hovered ? -14 : [0, -10, 0] }}
            transition={
              hovered
                ? { duration: 0.3, ease: 'easeOut' }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: color.bg }}
          >
            <Icon className="w-10 h-10" style={{ color: color.text }} aria-hidden="true" />
          </motion.div>

          {/* Detached shadow below icon */}
          <motion.div
            animate={{
              opacity: hovered ? 0.04 : 0.1,
              scaleX: hovered ? 0.6 : 1,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-12 h-3 rounded-full mt-3"
            style={{
              background: color.text,
              filter: 'blur(6px)',
            }}
          />
        </div>
      </div>

      {/* Bottom content */}
      <div className="flex items-end justify-between gap-3">
        <p className="text-lg font-medium text-slate-900 leading-6">{label}</p>
        <Button
          variant="ghost"
          size="sm"
          className="shrink-0 p-2"
          onClick={handleCta}
          aria-label={t('contactCta')}
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      {/* Hover overlay */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 16 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="absolute inset-0 rounded-[2rem] p-6 flex flex-col justify-between"
        style={{ backgroundColor: color.bg }}
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-slate-600 leading-5">{desc}</p>
          <ul className="flex flex-col gap-1.5">
            {benefits.map((b, i) => (
              <li key={i} className="text-sm font-medium text-slate-700 flex items-start gap-2">
                <span style={{ color: color.text }} className="mt-0.5">•</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <Button variant="ghost" size="sm" className="w-full" onClick={handleCta}>
          {t('contactCta')}
        </Button>
      </motion.div>
    </div>
  )
}

// ─── Mobile Card (always expanded) ───────────────────────────────────────────

function MobileCard({
  icon: Icon,
  label,
  desc,
  benefits,
  color,
  sectorKey,
  onSectorSelect,
}: {
  icon: React.ElementType
  label: string
  desc: string
  benefits: string[]
  color: { text: string; bg: string }
  sectorKey: string
  onSectorSelect?: (key: string) => void
}) {
  const t = useTranslations('IndustryCarousel')

  function handleCta() {
    onSectorSelect?.(sectorKey)
    scrollToRegister()
  }

  return (
    <div
      className="w-full h-[360px] rounded-[2rem] p-6 flex flex-col items-center gap-4 text-center"
      style={{
        backgroundColor: color.bg,
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.06)',
      }}
    >
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
        <Icon className="w-8 h-8" style={{ color: color.text }} aria-hidden="true" />
      </div>
      <p className="text-lg font-medium text-slate-900 leading-6">{label}</p>
      <p className="text-sm font-medium text-slate-600 leading-5 text-left w-full">{desc}</p>
      <ul className="flex flex-col gap-1.5 w-full text-left">
        {benefits.map((b, i) => (
          <li key={i} className="text-sm font-medium text-slate-700 flex items-start gap-2">
            <span style={{ color: color.text }} className="mt-0.5">•</span>
            {b}
          </li>
        ))}
      </ul>
      <Button variant="ghost" size="sm" className="w-full" onClick={handleCta}>
        {t('contactCta')}
      </Button>
    </div>
  )
}

// ─── Slideshow ────────────────────────────────────────────────────────────────

export function IndustryCarouselV2({ onSectorSelect }: { onSectorSelect?: (key: string) => void }) {
  const t = useTranslations('IndustryCarousel')
  const [slide, setSlide] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({
    icon: ICONS[i],
    label: t(`items.${i}.label`),
    desc: t(`items.${i}.desc`),
    benefits: [0, 1, 2].map(j => t(`items.${i}.benefits.${j}`)),
    sectorKey: SECTOR_KEYS[i],
    color: CARD_COLORS[i],
  }))

  const renderCard = (i: number) => (
    <FeatureCard
      key={i}
      icon={cards[i].icon}
      label={cards[i].label}
      desc={cards[i].desc}
      benefits={cards[i].benefits}
      color={cards[i].color}
      sectorKey={cards[i].sectorKey}
      onSectorSelect={onSectorSelect}
    />
  )

  const currentRows = SLIDES[slide]

  return (
    <section className="py-16 bg-white">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-8 mb-[60px] text-center">
<h2 className="text-3xl font-display font-medium text-[var(--color-text-default)] leading-[1.3] mb-4">
          {t('title')}
        </h2>
        <p className="text-[var(--color-text-dim)] text-lg leading-relaxed max-w-2xl mx-auto mb-6">
          {t('subtitle')}
        </p>
        <Button variant="secondary" size="md" onClick={scrollToRegister}>
          {t('contactCta')}
        </Button>
      </div>

      {/* Mobile: slide carousel */}
      <div className="md:hidden overflow-hidden">
        <motion.div
          className="flex gap-4 px-6"
          animate={{ x: `calc(${-activeIndex} * (100vw - 48px + 16px))` }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60 && activeIndex < cards.length - 1) setActiveIndex(prev => prev + 1)
            else if (info.offset.x > 60 && activeIndex > 0) setActiveIndex(prev => prev - 1)
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
                sectorKey={card.sectorKey}
                onSectorSelect={onSectorSelect}
              />
            </div>
          ))}
        </motion.div>
        <div className="flex justify-center gap-1.5 mt-10">
          {cards.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-4 bg-[var(--color-text-default)]' : 'w-1.5 bg-[var(--color-border-default)]'}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: slide system */}
      <div className="hidden md:block max-w-[1440px] mx-auto px-8">
        <div className="flex items-center gap-4">
          {/* Prev button */}
          <button
            onClick={() => setSlide(0)}
            disabled={slide === 0}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-[var(--color-border-default)] flex items-center justify-center transition-all hover:bg-[var(--color-bg-dim)] disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--color-text-default)]" />
          </button>

          {/* Cards grid */}
          <div className="flex-1 flex flex-col gap-6">
            {currentRows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex flex-wrap gap-6 justify-center">
                {row.map(renderCard)}
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={() => setSlide(1)}
            disabled={slide === 1}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-[var(--color-border-default)] flex items-center justify-center transition-all hover:bg-[var(--color-bg-dim)] disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-[var(--color-text-default)]" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-[60px]">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${i === slide ? 'bg-[var(--color-text-default)] w-4' : 'bg-[var(--color-border-default)] w-2'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
