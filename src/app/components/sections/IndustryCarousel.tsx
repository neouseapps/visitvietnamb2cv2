'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect } from 'react'
import {
  Hotel,
  Utensils,
  Map,
  Ticket,
  ShoppingBag,
  Plane,
  Car,
  Bike,
  Sparkles,
  Calendar,
  MoreHorizontal,
} from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { useTranslations } from 'next-intl'

// ─── Static assets ────────────────────────────────────────────────────────────

const ICONS = [Hotel, Utensils, Map, Ticket, ShoppingBag, Plane, Car, Bike, Sparkles, Calendar, MoreHorizontal]
const SECTOR_KEYS = ['accommodation', 'food', 'tours', 'attractions', 'shopping', 'scheduledTransport', 'onDemandTransport', 'vehicleRental', 'spa', 'events', 'other']

// Each card gets a unique accent color; no two adjacent cards share a color
const CARD_COLORS = [
  { text: '#2563EB', bg: '#EFF6FF' }, // blue      — Lưu trú
  { text: '#16A34A', bg: '#F0FDF4' }, // green     — Ẩm thực
  { text: '#EA580C', bg: '#FFF7ED' }, // orange    — Tour
  { text: '#7C3AED', bg: '#F5F3FF' }, // purple    — Điểm tham quan
  { text: '#DB2777', bg: '#FDF2F8' }, // pink      — Mua sắm
  { text: '#0D9488', bg: '#F0FDFA' }, // teal      — Vận tải
  { text: '#EA580C', bg: '#FFF7ED' }, // orange    — Đưa đón
  { text: '#16A34A', bg: '#F0FDF4' }, // green     — Thuê phương tiện
  { text: '#7C3AED', bg: '#F5F3FF' }, // purple    — Spa
  { text: '#DB2777', bg: '#FDF2F8' }, // pink      — Sự kiện
  { text: '#0D9488', bg: '#F0FDFA' }, // teal      — Khác
]

// ─── Smooth scroll helper ─────────────────────────────────────────────────────

function scrollToRegister() {
  const el = document.getElementById('register')
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top: y, behavior: 'smooth' })
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function IndustryCard({
  icon: Icon,
  label,
  desc,
  color,
  onCta,
}: {
  icon: React.ElementType
  label: string
  desc: string
  color: { text: string; bg: string }
  onCta: () => void
}) {
  const t = useTranslations('IndustryCarousel')

  return (
    <div className="group cursor-pointer w-full h-full">
      <div className="h-full bg-white shadow-sm rounded-[14px] p-4 flex flex-col gap-2">
        {/* Icon top-left */}
        <div className="w-14 h-14 shrink-0 rounded-[10px] flex items-center justify-center mb-1" style={{ backgroundColor: color.bg }}>
          <Icon className="w-6 h-6" style={{ color: color.text }} aria-hidden="true" />
        </div>
        {/* Text */}
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-xl font-medium leading-6 text-[var(--color-text-default)]">
            {label}
          </p>
          <p className="text-sm text-[var(--color-text-dim)] leading-5 line-clamp-3">
            {desc}
          </p>
        </div>

        {/* CTA */}
        <Button variant="ghost" size="sm" className="w-full mt-auto" onClick={onCta}>
          {t('contactCta')}
        </Button>
      </div>
    </div>
  )
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

export function IndustryCarousel({ onSectorSelect }: { onSectorSelect?: (key: string) => void }) {
  const t = useTranslations('IndustryCarousel')

  const base = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({
    icon: ICONS[i],
    label: t(`items.${i}.label`),
    desc: t(`items.${i}.desc`),
    sectorKey: SECTOR_KEYS[i],
    color: CARD_COLORS[i],
  }))
  // Triple to ensure Embla loop has enough buffer for seamless wrap-around
  const industries = [...base, ...base, ...base]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3000, stopOnInteraction: false })],
  )

  useEffect(() => {
    if (!emblaApi) return
    const applyScale = () => {
      const root = emblaApi.rootNode()
      const centerX = root.getBoundingClientRect().left + root.offsetWidth / 2
      emblaApi.slideNodes().forEach((slide) => {
        const rect = slide.getBoundingClientRect()
        const dist = Math.abs(centerX - (rect.left + rect.width / 2))
        const scale = 1 + Math.max(0, 1 - dist / (root.offsetWidth * 0.5)) * 0.06
        slide.style.transform = `scale(${scale})`
        slide.style.zIndex = String(Math.round(scale * 10))
        slide.style.transition = 'transform 0.3s ease'
      })
    }
    emblaApi.on('scroll', applyScale)
    emblaApi.on('reInit', applyScale)
    applyScale()
    return () => { emblaApi.off('scroll', applyScale); emblaApi.off('reInit', applyScale) }
  }, [emblaApi])

  return (
    <section id="solutions" className="py-24 bg-white">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-8 mb-12 text-center">
        <h3 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] leading-[1.3] mb-4">
          {t('title')}
        </h3>
        <p className="text-[var(--color-text-dim)] text-lg leading-relaxed max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Embla carousel */}
      <div ref={emblaRef} className="overflow-hidden py-4 -my-4">
        <div className="flex gap-12 px-8 items-stretch">
          {industries.map((industry, idx) => (
            <div
              key={idx}
              className="w-[320px] flex-shrink-0 self-stretch"
            >
              <IndustryCard
                icon={industry.icon}
                label={industry.label}
                desc={industry.desc}
                color={industry.color}
                onCta={() => {
                  onSectorSelect?.(industry.sectorKey)
                  scrollToRegister()
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
