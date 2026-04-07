'use client'

import React from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { Star, Sun, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { OffersSection } from '../../components/OffersSection'
import { FeaturedAttractions } from '../../components/sections/FeaturedAttractions'
import { AIItinerarySection } from '../../components/sections/AIItinerarySection'

const EXPERIENCE_STATIC = [
  { id: 1, image: 'https://images.unsplash.com/photo-1601246102607-e02ff37c569f?q=80&w=600&auto=format&fit=crop', badgeColor: 'bg-bg-warning-default', categoryColor: 'text-[var(--color-bg-warning-default)] bg-[var(--color-bg-warning-bright)]' },
  { id: 2, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop', badgeColor: '', categoryColor: 'text-[var(--color-bg-info-default)] bg-[var(--color-bg-info-bright)]' },
  { id: 3, image: 'https://images.unsplash.com/photo-1625804533031-18e3d64c2443?q=80&w=600&auto=format&fit=crop', badgeColor: '', categoryColor: 'text-[var(--color-bg-warning-default)] bg-[var(--color-bg-warning-bright)]' },
  { id: 4, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=600&auto=format&fit=crop', badgeColor: 'bg-[var(--color-brand-primary)]', categoryColor: 'text-[var(--color-brand-primary)] bg-[var(--color-brand-primary-hover)]' },
  { id: 5, image: 'https://images.unsplash.com/photo-1621582236528-6627d3122c2a?q=80&w=600&auto=format&fit=crop', badgeColor: '', categoryColor: 'text-[var(--color-bg-success-default)] bg-[var(--color-bg-success-bright)]' },
  { id: 6, image: 'https://images.unsplash.com/photo-1582227181165-d6ce59ec4764?q=80&w=600&auto=format&fit=crop', badgeColor: 'bg-[var(--color-brand-primary)]', categoryColor: 'text-[var(--color-brand-primary)] bg-[var(--color-brand-primary-hover)]' },
]
const HAS_BADGE = [true, false, false, true, false, true]

type ExperienceItem = (typeof EXPERIENCE_STATIC)[0] & { badge: string | null; category: string; title: string; description: string }

const ExperienceCard = ({ exp }: { exp: ExperienceItem }) => (
  <div className="bg-white rounded-card overflow-hidden border border-[var(--color-border-default)] shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col h-96">
    <div className="[flex:2] relative overflow-hidden min-h-0">
      <Image
        src={exp.image}
        alt={exp.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
    <div className="[flex:1] min-h-0 p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-[var(--color-text-default)] mb-2 group-hover:text-bg-warning-default transition-colors line-clamp-2">
          {exp.title}
        </h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${exp.categoryColor}`}>
          {exp.category}
        </span>
      </div>
      <p className="text-xs text-[var(--color-text-dim)] line-clamp-2">{exp.description}</p>
    </div>
  </div>
)

export default function PhuQuocPageClient() {
  const tHero = useTranslations('PhuQuocPage.Hero')
  const tExp = useTranslations('PhuQuocPage.Experiences')
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
          src="/images/phu-quoc-hero.jpg"
          alt="Phu Quoc Sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-alpha-black-20)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-transparent" />

        <Navbar />

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="relative z-10 mt-20 px-8">
          <ol className="flex items-center gap-2 text-xs text-white/60 font-default">
            <li><a href="/" className="hover:text-white/90 transition-colors">{tHero('breadcrumbHome')}</a></li>
            <li className="text-white/30">/</li>
            <li><a href="/" className="hover:text-white/90 transition-colors">{tHero('breadcrumbDestinations')}</a></li>
            <li className="text-white/30">/</li>
            <li className="text-white/90 font-medium">Phú Quốc</li>
          </ol>
        </nav>

        {/* Centred title */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-7xl md:text-9xl text-white mb-6 tracking-tighter text-glow"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          >
            Phú Quốc
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
                4.9{' '}
                <span className="text-white/70 font-normal">{tHero('reviews')}</span>
              </span>
            </div>

            {/* Weather */}
            <div className="glass-dark flex items-center gap-3 px-5 py-3 rounded-2xl">
              <Sun className="w-5 h-5 text-yellow-300 flex-shrink-0" />
              <span className="text-sm font-semibold text-white">
                28°C{' '}
                <span className="text-white/70 font-normal">– {tHero('sunny')}</span>
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

      <AIItinerarySection />

      {/* ── EXPERIENCES ── */}
      <section className="w-full py-16 px-8 max-w-[1600px] mx-auto">
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
      <FeaturedAttractions />
      <Footer />
    </div>
  )
}
