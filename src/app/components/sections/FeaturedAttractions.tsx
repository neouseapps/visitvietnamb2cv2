'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'

// ─── Data interface ──────────────────────────────────────────────────────────
// CMS-ready: swap mock data with a real API call when available
export interface AttractionData {
  id: number
  name: string
  location: string
  rating: number
  image: string
}

// ─── Mock data ───────────────────────────────────────────────────────────────
const BaNaAttractions: AttractionData[] = [
  {
    id: 1,
    name: 'Cầu Vàng Bà Nà',
    location: 'Núi Chúa, Đà Nẵng',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Fantasy Park',
    location: 'Sun World Bà Nà Hills',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Làng Pháp',
    location: 'Đỉnh Bà Nà, Đà Nẵng',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Hầm Rượu Debay',
    location: 'Núi Chúa, Đà Nẵng',
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Linh Ứng Tự Bà Nà',
    location: 'Đỉnh Bà Nà, Đà Nẵng',
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop',
  },
]

// ─── DestinationCard ─────────────────────────────────────────────────────────
function DestinationCard({ attraction }: { attraction: AttractionData }) {
  return (
    <motion.div className="cursor-pointer flex-shrink-0 w-full">
      <article
        className="relative overflow-hidden"
        style={{ borderRadius: 16, aspectRatio: '1 / 1.8' }}
      >
        {/* z-1 — Background image */}
        <div className="absolute inset-0 z-[1]">
          <img
            src={attraction.image}
            alt={attraction.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* z-3 — Rating badge top-left */}
        <div
          className="absolute top-0 inset-x-0 z-[3] flex items-start"
          style={{
            padding: 'var(--spacing-md)',
            background: 'linear-gradient(to bottom, var(--color-alpha-white-50), var(--color-alpha-white-0))',
          }}
        >
          <div
            className="bg-[var(--color-bg-default)] flex items-center justify-center"
            style={{ borderRadius: 'var(--radius-sm)', padding: 'var(--spacing-sm)', minWidth: 48 }}
          >
            <span className="font-bold text-xs tracking-widest text-[var(--color-text-default)]">
              {attraction.rating.toFixed(1)}★
            </span>
          </div>
        </div>

        {/* z-2 — Content overlay bottom */}
        <div
          className="absolute inset-x-0 bottom-0 z-[2] backdrop-blur-[6px] flex flex-col justify-end"
          style={{
            padding: 'var(--spacing-lg)',
            background: 'linear-gradient(to bottom, var(--color-alpha-black-0) 0%, var(--color-alpha-black-80) 60%)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            <h3
              className="text-white line-clamp-2 overflow-hidden font-default"
              style={{ fontSize: 24, lineHeight: '28px', letterSpacing: '-0.24px', fontWeight: 500, margin: 0 }}
            >
              {attraction.name}
            </h3>
            <p
              className="line-clamp-1 overflow-hidden"
              style={{ fontSize: 14, lineHeight: '20px', color: '#b7b6ae', margin: 0 }}
            >
              {attraction.location}
            </p>
          </div>
        </div>
      </article>
    </motion.div>
  )
}

// ─── FeaturedAttractions section ──────────────────────────────────────────────
interface FeaturedAttractionsProps {
  attractions?: AttractionData[]
  title?: string
}

export function FeaturedAttractions({
  attractions = BaNaAttractions,
  title = 'Điểm tham quan nổi bật',
}: FeaturedAttractionsProps) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [Autoplay({ delay: 3500, stopOnInteraction: true })],
  )

  return (
    <section className="py-16 bg-bg-dim">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-bg-inverse tracking-tight">{title}</h2>
          <p className="text-[var(--color-text-dim)] mt-2">
            Những địa điểm không thể bỏ qua trong hành trình của bạn
          </p>
        </div>

        {/* Embla carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-5">
            {attractions.map((attraction) => (
              <div
                key={attraction.id}
                className="basis-[85%] sm:basis-[48%] md:basis-[32%] lg:basis-[24%] xl:basis-[20%] flex-shrink-0"
              >
                <DestinationCard attraction={attraction} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
