'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { HeroCardStack } from '../components/HeroCardStack'
import { OffersSection } from '../components/OffersSection'
import { AppTestimonials } from '../components/tai-app/AppTestimonials'
import { AppDownloadCTA } from '../components/tai-app/AppDownloadCTA'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { AISection } from '../components/sections/FeatureWithMockup'
import { Button } from '@/app/components/ui/button'
import { NewsCard } from '@/app/components/shared'
import { Link } from '@/navigation'

const ArrowRight = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState('')
  const t = useTranslations('HomePage.Hero')

  const handleSearch = () => {
    if (searchValue.trim()) {
      alert(`Đang tìm kiếm: ${searchValue}`)
    }
  }

  return (
    <header className="relative h-[90vh] min-h-[700px] flex items-start md:items-center justify-center overflow-hidden bg-bg-inverse">
      <img
        src="/images/hero-home.png"
        alt="Visit Vietnam Award"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-navy/90"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 pt-[120px] md:pt-0">
        <div className="max-w-2xl text-center mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 relative overflow-hidden" style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', color: '#ffffff', background: 'rgba(255,255,255,0.2)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.1), 0 1px 8px rgba(0,0,0,0.12)' }}>
          {/* liquid iridescent shimmer layer */}
          <span aria-hidden className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.45) 0%, rgba(180,220,255,0.2) 30%, rgba(200,180,255,0.2) 60%, rgba(255,255,255,0.35) 100%)' }} />
          <span className="relative z-10">{t('badge')}</span>
        </div>
        <h1
          className="font-display font-medium italic text-white leading-[1.2] mb-6 text-[36px] md:text-[76px]"
          style={{ textShadow: '3.421px 17px 24px rgba(0, 0, 0, 0.30), 0 2px 8px rgba(0, 0, 0, 0.15)' }}
        >
          {t('title').split('\n').map((line, i) => (
            <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
          ))}
        </h1>
        {/* AI Trip Card Stack + subtitle */}
        <div className="mt-[168px] w-full flex flex-col items-center gap-4">
          <p
            className="font-medium max-w-[464px] mx-auto text-[16px] md:text-[24px]"
            style={{
              fontFamily: 'var(--typography-font-family-default, SVN-Selecta)',
              lineHeight: '32px',
              letterSpacing: '0',
              color: 'var(--color-text-neutral-inverse)',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.25), 0 1px 3px rgba(0, 0, 0, 0.15)',
            }}
          >
            {t('subtitle')}
          </p>
          <HeroCardStack />
        </div>

        </div>
      </div>
    </header>
  )
}

type Destination = {
  name: string
  desc: string
  rating: string
  trips: string
  img: string
}

const DestinationCard = ({ dest }: { dest: Destination }) => (
  <a
    href="#"
    className="group relative rounded-card overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 block aspect-[3/4]"
    onClick={(e) => e.preventDefault()}
  >
    <img
      src={dest.img}
      alt={dest.name}
      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
      <h3
        className="text-white mb-1 font-default"
        style={{ fontSize: 24, lineHeight: '28px', letterSpacing: '-0.24px', fontWeight: 500, margin: 0 }}
      >
        {dest.name}
      </h3>
      <div className="flex items-center gap-2 mt-1 mb-1">
        <span className="text-white text-xs font-medium tracking-wide">{dest.rating}</span>
        <span className="text-white text-xs font-medium tracking-wide">{dest.trips}</span>
      </div>
      <p className="text-white/80 text-sm font-medium">{dest.desc}</p>
    </div>
  </a>
)


const DestinationsSection = () => {
  const t = useTranslations('HomePage.Destinations')
  const STATIC = [
    { rating: '4.9 ★', trips: '12k+ AI Trips', img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000&auto=format&fit=crop' },
    { rating: '4.8 ★', trips: '8k+ AI Trips', img: 'https://images.unsplash.com/photo-1555921015-c28446bf08f8?q=80&w=1000&auto=format&fit=crop' },
    { rating: '4.7 ★', trips: '5k+ AI Trips', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1000&auto=format&fit=crop' },
    { rating: '4.8 ★', trips: '10k+ AI Trips', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop' },
  ]
  const destinations = [0, 1, 2, 3].map(i => ({
    name: t(`items.${i}.name`),
    desc: t(`items.${i}.desc`),
    ...STATIC[i],
  }))

  return (
    <section
      id="destinations"
      className="py-24 px-8 max-w-[1440px] mx-auto bg-bg-dim relative z-20"
    >
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-text-default)] mb-2 font-default">{t('title')}</h2>
        <p className="text-[var(--color-text-dim)]">
          {t('subtitle')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <DestinationCard key={dest.name} dest={dest} />
        ))}
      </div>
    </section>
  )
}

const FeaturesSection = () => {
  const t = useTranslations('HomePage.Features')
  const FEATURE_STATIC = [
    {
      href: '/tai-app',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      href: '/for-governance',
      bg: 'bg-[var(--color-bg-dim)]',
      text: 'text-[var(--color-text-default)]',
      border: 'border-[var(--color-bg-dim)]',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      href: '/tai-app',
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-100',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      href: '/tai-app',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: '/tai-app',
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-100',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ]
  const features = [0, 1, 2, 3, 4].map(i => ({
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
    cta: t(`items.${i}.cta`),
    ...FEATURE_STATIC[i],
  }))

  return (
    <section id="experiences" className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block font-semibold text-sm tracking-wider uppercase mb-3" style={{color: 'var(--color-bg-warning-default)'}}>
            {t('eyebrow')}
          </div>
          <h2 className="text-3xl font-bold text-[var(--color-text-default)] mb-2 font-default">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Row 1: 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            {features.slice(0, 3).map((feat) => (
              <div key={feat.title} className="flex flex-col gap-4 items-center text-center md:items-start md:text-left">
                <div className={`w-14 h-14 rounded-2xl ${feat.bg} ${feat.text} flex items-center justify-center flex-shrink-0 shadow-sm border ${feat.border}`}>
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-[var(--color-text-default)] mb-2 font-default" style={{ fontSize: 24, lineHeight: '28px', letterSpacing: '-0.24px', fontWeight: 500, margin: 0 }}>
                    {feat.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-2">{feat.desc}</p>
                  <Button variant="ghost" size="sm" className="font-medium -ml-2" asChild>
                    <Link href={feat.href}>{feat.cta} →</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {/* Row 2: 2 items, centered on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:w-2/3 md:mx-auto">
            {features.slice(3).map((feat) => (
              <div key={feat.title} className="flex flex-col gap-4 items-center text-center md:items-start md:text-left">
                <div className={`w-14 h-14 rounded-2xl ${feat.bg} ${feat.text} flex items-center justify-center flex-shrink-0 shadow-sm border ${feat.border}`}>
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-[var(--color-text-default)] mb-2 font-default" style={{ fontSize: 24, lineHeight: '28px', letterSpacing: '-0.24px', fontWeight: 500, margin: 0 }}>
                    {feat.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed mb-2">{feat.desc}</p>
                  <Button variant="ghost" size="sm" className="font-medium -ml-2" asChild>
                    <Link href={feat.href}>{feat.cta} →</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const ForBusinessSection = () => {
  const t = useTranslations('HomePage.ForBusiness')
  return (
    <section id="for-business" className="py-16 bg-bg-dim">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold text-[var(--color-text-dim-variant)] uppercase tracking-wider mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl font-bold text-[var(--color-text-default)] mb-4 font-default">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-5 flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="bg-slate-50 p-3 rounded-md shadow-sm text-bg-inverse mb-5 border border-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-default">{t('cardBusiness.title')}</h4>
            <p className="text-gray-500 text-sm mb-6 flex-1">
              {t('cardBusiness.desc')}
            </p>
            <Button asChild variant="link" size="sm" rightIcon={<ArrowRight />}>
              <Link href="/for-business">{t('cardBusiness.cta')}</Link>
            </Button>
          </div>

          <div className="bg-white rounded-3xl p-5 flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="bg-slate-50 p-3 rounded-md shadow-sm text-bg-inverse mb-5 border border-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-default">{t('cardGov.title')}</h4>
            <p className="text-gray-500 text-sm mb-6 flex-1">
              {t('cardGov.desc')}
            </p>
            <Button asChild variant="link" size="sm" rightIcon={<ArrowRight />}>
              <Link href="/for-governance">{t('cardGov.cta')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const NewsSection = () => {
  const t = useTranslations('HomePage.News')
  const STATIC_IMGS = [
    { img: 'https://images.unsplash.com/photo-1542640244-7e672d6cb466?q=80&w=800&auto=format&fit=crop', alt: t('items.0.category') },
    { img: 'https://images.unsplash.com/photo-1583417646636-6967cdcd1b08?q=80&w=800&auto=format&fit=crop', alt: t('items.1.category') },
    { img: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop', alt: t('items.2.category') },
  ]
  const articles = [0, 1, 2].map(i => ({
    img: STATIC_IMGS[i].img,
    alt: STATIC_IMGS[i].alt,
    date: t(`items.${i}.date`),
    category: t(`items.${i}.category`),
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
  }))

  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-xs font-semibold text-[var(--color-text-dim-variant)] uppercase tracking-wider mb-4">{t('eyebrow')}</p>
            <h2 className="text-3xl font-bold text-[var(--color-text-default)] mb-2 font-default">{t('title')}</h2>
            <p className="text-gray-500">{t('subtitle')}</p>
          </div>
          <Button asChild variant="link" size="sm" rightIcon={<ArrowRight />} className="hidden sm:inline-flex">
            <Link href="/newsroom">{t('readMore')}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <NewsCard
              key={article.title}
              title={article.title}
              image={article.img}
              category={article.category}
              date={article.date}
              description={article.desc}
              href="#"
            />
          ))}
        </div>
      </div>
    </section>
  )
}



export default function HomePageClient() {
  return (
    <div className="bg-bg-dim text-slate-800 font-default">
      <Navbar variant="light" />
      <HeroSection />
      <TestimonialsSection />
      {/* <DestinationsSection /> */}
      <AISection />
      <FeaturesSection />
      <OffersSection />
      <AppTestimonials />
      <ForBusinessSection />
      <NewsSection />
      <AppDownloadCTA />
      <Footer />
    </div>
  )
}
