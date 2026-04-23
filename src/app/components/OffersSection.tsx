'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

type OfferCardData = {
  id: string
  image: string
  imageAlt: string
  partnerName: string
  title: string
  description: string
}

const offerData = [
  {
    id: 'phu-quoc',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'Bãi biển Phú Quốc',
    partnerName: 'VISA',
  },
  {
    id: 'sapa',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'Ruộng bậc thang Sapa',
    partnerName: '–20%',
  },
  {
    id: 'halong',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'Du thuyền Hạ Long',
    partnerName: 'HOT DEAL',
  },
  {
    id: 'nha-trang',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    imageAlt: 'Biển Nha Trang',
    partnerName: 'VinGroup',
  },
]

function OfferCard({ offer }: { offer: OfferCardData }) {
  const t = useTranslations('OffersSection')

  return (
    <motion.article
      className="relative overflow-hidden cursor-pointer"
      style={{ borderRadius: 16, aspectRatio: '1 / 1' }}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* z-1 — Background image */}
      <motion.div
        className="absolute inset-0 z-[1]"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={offer.image}
          alt={offer.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </motion.div>

      {/* z-3 — Partner logo (top-left) */}
      <div
        className="absolute top-0 inset-x-0 z-[3] flex items-start"
        style={{
          padding: 'var(--spacing-md)',
          background:
            'linear-gradient(to bottom, var(--color-alpha-white-50), var(--color-alpha-white-0))',
        }}
      >
        <div
          className="bg-[var(--color-bg-default)] flex items-center justify-center"
          style={{
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--spacing-sm)',
            minWidth: 48,
          }}
        >
          <span
            className="font-bold text-xs tracking-widest text-[var(--color-text-default)]"
          >
            {offer.partnerName}
          </span>
        </div>
      </div>

      {/* z-2 — Content overlay (bottom) */}
      <div
        className="absolute inset-x-0 bottom-0 z-[2] backdrop-blur-[6px] flex flex-col justify-end"
        style={{
          padding: 'var(--spacing-lg)',
          background:
            'linear-gradient(to bottom, var(--color-alpha-black-0) 0%, var(--color-alpha-black-80) 60%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {/* Title + Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            <h3
              className="text-white line-clamp-2 overflow-hidden font-default"
              style={{
                fontSize: 24,
                lineHeight: '28px',
                letterSpacing: '-0.24px',
                fontWeight: 500,
                margin: 0,
              }}
            >
              {offer.title}
            </h3>
            <p
              className="line-clamp-2 overflow-hidden"
              style={{
                fontSize: 14,
                lineHeight: '20px',
                color: '#b7b6ae',
                margin: 0,
              }}
            >
              {offer.description}
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/"
            className="flex items-center text-white w-fit"
            style={{
              fontSize: 16,
              lineHeight: '24px',
              fontWeight: 400,
              gap: 8,
              textDecoration: 'none',
            }}
          >
            {t('exploreCta')}
            <motion.span
              variants={{ rest: { x: 0 }, hover: { x: 4 } }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export const OffersSection = () => {
  const t = useTranslations('OffersSection')

  const OFFERS: OfferCardData[] = offerData.map((item, i) => ({
    ...item,
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }))

  return (
    <section className="w-full bg-bg-dim relative">
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <div className="inline-block font-semibold text-sm tracking-wider uppercase mb-3" style={{color: 'var(--color-text-eyebrow)'}}>
            {t('eyebrow')}
          </div>
          <h2 className="text-4xl font-bold text-[var(--color-text-default)] mb-2 font-default leading-tight tracking-tight">
            {t('title')}
          </h2>
          <p className="text-[var(--color-text-dim)]">
            {t('subtitle')}
          </p>
        </div>
        <Link
          href="/"
          className="hidden md:flex items-center text-sm font-semibold text-bg-inverse hover:text-bg-warning-default transition-colors gap-1 border border-[var(--color-border-default)] bg-[var(--color-bg-default)] px-4 py-2 rounded-full shadow-sm hover:shadow-md"
        >
          {t('viewAll')}
        </Link>
      </div>

      {/* Cards grid */}
      {OFFERS.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-[var(--color-text-dim)]">
          {t('emptyState')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OFFERS.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
            />
          ))}
        </div>
      )}

      {/* Mobile-only: button below cards */}
      <div className="flex md:hidden justify-center mt-8">
        <Link
          href="/"
          className="flex items-center text-sm font-semibold text-bg-inverse hover:text-bg-warning-default transition-colors gap-1 border border-[var(--color-border-default)] bg-[var(--color-bg-default)] px-4 py-2 rounded-full shadow-sm hover:shadow-md"
        >
          {t('viewAll')}
        </Link>
      </div>
      </div>
    </section>
  )
}
