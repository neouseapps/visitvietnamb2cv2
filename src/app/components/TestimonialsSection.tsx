'use client'


import Image from 'next/image'
import { useTranslations } from 'next-intl'

// ─── Logo data ────────────────────────────────────────────────────────────────
// To add a new logo, append an entry to this array.

interface PartnerLogo {
  src: string
  alt: string
  width: number
  height: number
}

const LOGOS: PartnerLogo[] = [
  { src: '/images/testimonials/intercontinental.png', alt: 'InterContinental Danang Sun Peninsula Resort', width: 160, height: 48 },
  { src: '/images/testimonials/jw-marriott.png',      alt: 'JW Marriott',                                  width: 120, height: 48 },
  { src: '/images/testimonials/new-world.png',        alt: 'New World Phu Quoc Resort',                    width: 140, height: 48 },
  { src: '/images/testimonials/novotel.png',          alt: 'Novotel Hotels & Resorts',                     width: 140, height: 48 },
  { src: '/images/testimonials/sun-group.png',        alt: 'Sun Group',                                    width: 160, height: 48 },
  { src: '/images/testimonials/sun-holidays.png',     alt: 'Sun Holidays',                                 width: 120, height: 48 },
  { src: '/images/testimonials/sun-world.png',        alt: 'Sun World',                                    width: 140, height: 48 },
  { src: '/images/testimonials/visa.png',             alt: 'Visa',                                         width: 80,  height: 48 },
]

// Duplicate if too few to fill the marquee seamlessly (need at least 2 full sets)
const MIN_FOR_SEAMLESS = 6
const track = LOGOS.length < MIN_FOR_SEAMLESS ? [...LOGOS, ...LOGOS] : LOGOS

// ─── Marquee track ────────────────────────────────────────────────────────────

function LogoMarquee() {
  const items = [...track, ...track] // duplicate for seamless loop

  return (
    <div
      className="relative overflow-hidden"
      style={{
        // Fade edges with mask
        maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex items-center gap-12 w-max"
        style={{
          animation: 'marquee 30s linear infinite',
          animationPlayState: 'running',
        }}
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.alt}-${i}`}
            className="flex-shrink-0"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-10 w-auto object-contain"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  const t = useTranslations('TestimonialsSection')
  return (
    <section
      id="testimonials"
      className="py-16 bg-white"
    >
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col items-center gap-10 lg:grid lg:gap-16 lg:items-center"
          style={{ gridTemplateColumns: 'minmax(0,3fr) minmax(0,7fr)' }}
        >

          {/* ── Col 1: Text ──────────────────────────────────────── */}
          <div className="text-center lg:text-left">
            <p className="text-xs font-semibold text-[var(--color-text-dim-variant)] uppercase tracking-wider mb-6">
              {t('eyebrow')}
            </p>
            <h2
              className="font-default text-[var(--color-text-default)] mb-4"
              style={{ fontSize: 24, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.24px' }}
            >
              {t('heading')}
            </h2>
          </div>

          {/* ── Col 2: Marquee ───────────────────────────────────── */}
          <div className="flex flex-col justify-center w-full">
            <LogoMarquee />
          </div>

        </div>
      </div>
    </section>
  )
}
