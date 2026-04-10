'use client'

import React from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { Star, Wind, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { OffersSection } from '../../components/OffersSection'
import { FeaturedAttractions } from '../../components/sections/FeaturedAttractions'

const EXPERIENCE_STATIC = [
  { id: 1, image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?q=80&w=600&auto=format&fit=crop', badgeColor: 'bg-bg-warning-default', categoryColor: 'text-[var(--color-bg-warning-default)] bg-[var(--color-bg-warning-bright)]' },
  { id: 2, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop', badgeColor: '', categoryColor: 'text-[var(--color-bg-warning-default)] bg-[var(--color-bg-warning-bright)]' },
  { id: 3, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop', badgeColor: '', categoryColor: 'text-[var(--color-bg-warning-default)] bg-[var(--color-bg-warning-bright)]' },
  { id: 4, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop', badgeColor: '', categoryColor: 'text-[var(--color-bg-warning-default)] bg-[var(--color-bg-warning-bright)]' },
  { id: 5, image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop', badgeColor: 'bg-[var(--color-brand-primary)]', categoryColor: 'text-[var(--color-bg-warning-default)] bg-[var(--color-bg-warning-bright)]' },
  { id: 6, image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600&auto=format&fit=crop', badgeColor: 'bg-[var(--color-brand-primary)]', categoryColor: 'text-[var(--color-bg-warning-default)] bg-[var(--color-bg-warning-bright)]' },
]
const HAS_BADGE = [true, false, false, false, true, true]

type ExperienceItem = (typeof EXPERIENCE_STATIC)[0] & { badge: string | null; category: string; title: string; description: string }

const ExperienceCard = ({ exp }: { exp: ExperienceItem }) => (
  <article
    className="relative overflow-hidden cursor-pointer"
    style={{ borderRadius: 16, aspectRatio: '1 / 1' }}
  >
    {/* z-1 — Background image */}
    <div className="absolute inset-0 z-[1]">
      <Image
        src={exp.image}
        alt={exp.title}
        fill
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
    </div>

    {/* z-3 — Badge top-left */}
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
          {exp.badge ?? exp.category}
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          <h3
            className="text-white line-clamp-2 overflow-hidden font-default"
            style={{ fontSize: 24, lineHeight: '28px', letterSpacing: '-0.24px', fontWeight: 500, margin: 0 }}
          >
            {exp.title}
          </h3>
          <p
            className="line-clamp-2 overflow-hidden"
            style={{ fontSize: 14, lineHeight: '20px', color: '#b7b6ae', margin: 0 }}
          >
            {exp.description}
          </p>
        </div>
      </div>
    </div>
  </article>
)

const BaNaAttractions = [
  {
    id: 1,
    name: 'Cầu Vàng Bà Nà',
    location: 'Núi Chúa, Đà Nẵng',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Fantasy Park',
    location: 'Sun World Bà Nà Hills',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Làng Pháp',
    location: 'Đỉnh Bà Nà, Đà Nẵng',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Hầm Rượu Debay',
    location: 'Núi Chúa, Đà Nẵng',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Linh Ứng Tự Bà Nà',
    location: 'Đỉnh Bà Nà, Đà Nẵng',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop',
  },
]

export default function BaNaPageClient() {
  const tHero = useTranslations('BaNaPage.Hero')
  const tExp = useTranslations('BaNaPage.Experiences')
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true })

  const experiences = [0, 1, 2, 3, 4, 5].map(i => ({
    ...EXPERIENCE_STATIC[i],
    badge: HAS_BADGE[i] ? tExp(`items.${i}.badge`) : null,
    category: tExp(`items.${i}.category`),
    title: tExp(`items.${i}.title`),
    description: tExp(`items.${i}.description`),
  }))

  return (
    <div className="bg-bg-dim text-[var(--color-text-default)] w-full min-h-screen flex flex-col font-default">
      {/* ── HERO ── */}
      <header className="relative h-[85vh] min-h-[600px] w-full flex flex-col justify-between overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920&auto=format&fit=crop"
          alt="Ba Na Hills Golden Bridge"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-alpha-black-20)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-transparent" />

        <Navbar variant="light" />

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="relative z-10 mt-20 px-8">
          <ol className="flex items-center gap-2 text-xs text-white/60 font-default">
            <li><a href="/" className="hover:text-white/90 transition-colors">{tHero('breadcrumbHome')}</a></li>
            <li className="text-white/30">/</li>
            <li><a href="/" className="hover:text-white/90 transition-colors">{tHero('breadcrumbDestinations')}</a></li>
            <li className="text-white/30">/</li>
            <li className="text-white/90 font-medium">Bà Nà Hills</li>
          </ol>
        </nav>

        {/* Centred title */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-6 text-glow"
          >
            Bà Nà Hills
          </h1>

          <p className="text-xl md:text-2xl text-[var(--color-alpha-white-70)] font-medium max-w-3xl leading-relaxed text-glow">
            {tHero('subtitle')}
          </p>

          {/* Info items — fade-in up */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
          >
            {/* Review */}
            <div className="glass-dark flex items-center gap-3 px-5 py-3 rounded-2xl">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
              <span className="text-sm font-semibold text-white">
                4.8{' '}
                <span className="text-white/70 font-normal">{tHero('reviews')}</span>
              </span>
            </div>

            {/* Weather */}
            <div className="glass-dark flex items-center gap-3 px-5 py-3 rounded-2xl">
              <Wind className="w-5 h-5 text-blue-200 flex-shrink-0" />
              <span className="text-sm font-semibold text-white">
                18°C{' '}
                <span className="text-white/70 font-normal">– {tHero('cool')}</span>
              </span>
            </div>

            {/* Best time */}
            <div className="glass-dark flex items-center gap-3 px-5 py-3 rounded-2xl">
              <Calendar className="w-5 h-5 text-blue-300 flex-shrink-0" />
              <span className="text-sm font-semibold text-white">
                {tHero('bestTime')}{' '}
                <span className="text-white/70 font-normal">{tHero('bestTimeSub')}</span>
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── EXPERIENCES ── */}
      <section className="w-full py-16 px-8 max-w-[1440px] mx-auto bg-bg-dim relative">
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-default text-[var(--color-text-default)] tracking-tight mb-2">
            {tExp('title')}
          </h2>
          <p className="text-[var(--color-text-dim)]">
            {tExp('subtitle')}
          </p>
        </div>

        {/* Mobile carousel */}
        <div className="sm:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="basis-[85%] flex-shrink-0">
                <ExperienceCard exp={exp} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </section>

      <OffersSection />
      <FeaturedAttractions attractions={BaNaAttractions} title="Điểm tham quan nổi bật tại Bà Nà Hills" />
      <Footer />
    </div>
  )
}
