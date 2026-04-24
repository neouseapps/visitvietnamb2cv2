'use client'

import React from 'react'
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
  const t = useTranslations('HomePage.Hero')

  return (
    <header className="relative h-[90vh] min-h-[700px] flex items-start md:items-center justify-center overflow-hidden bg-bg-inverse">
      <img
        src="/images/hero-home.png"
        alt="Visit Vietnam Award"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-navy/90"></div>
      <div className="absolute inset-0" style={{ background: 'rgba(10,6,2,0.08)' }}></div>
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


const FeaturesSection = () => {
  const t = useTranslations('HomePage.Features')
  const FEATURE_STATIC = [
    {
      href: '/',
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
      href: '/',
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
      href: '/',
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
      href: '/',
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
        {/* Left-aligned header — distinct from centered sections above/below */}
        <div className="mb-12">
          <div className="inline-block font-semibold text-sm tracking-wider uppercase mb-3" style={{color: 'var(--color-text-eyebrow)'}}>
            {t('eyebrow')}
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="H2 text-[var(--color-text-default)] leading-tight tracking-tight max-w-lg">
              {t('title')}
            </h2>
            <p className="text-gray-500 text-base max-w-sm md:text-right md:pb-1">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Editorial numbered list — replaces icon-box grid */}
        <div className="divide-y divide-gray-100">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className="grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_200px] gap-x-6 md:gap-x-10 items-start py-8 group"
            >
              {/* Step number */}
              <span
                className="font-default text-3xl font-bold leading-none pt-0.5 select-none"
                style={{ color: 'var(--color-text-eyebrow)', opacity: 0.45 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {/* Content */}
              <div>
                <h3 className="H4 text-[var(--color-text-default)] mb-1.5 leading-snug tracking-tight">
                  {feat.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">{feat.desc}</p>
                {/* Mobile CTA */}
                <Button variant="ghost" size="sm" className="font-medium -ml-2 mt-1 md:hidden" asChild>
                  <Link href={feat.href}>{feat.cta} →</Link>
                </Button>
              </div>
              {/* Desktop CTA — right-aligned */}
              <div className="hidden md:flex justify-end items-center self-center">
                <Button variant="ghost" size="sm" className="font-medium" asChild>
                  <Link href={feat.href}>{feat.cta} →</Link>
                </Button>
              </div>
            </div>
          ))}
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
        {/* Asymmetric split: header left, cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">

          {/* Left column: section header — sticky feel */}
          <div className="lg:pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{color: 'var(--color-text-eyebrow)'}}>
              {t('eyebrow')}
            </p>
            <h2 className="H2 text-[var(--color-text-default)] mb-4 leading-tight tracking-tight">
              {t('title')}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
              {t('subtitle')}
            </p>
          </div>

          {/* Right column: 2 stacked cards */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-3xl p-6 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="bg-slate-50 p-3 rounded-md shadow-sm text-bg-inverse mb-5 border border-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="H4 text-gray-900 mb-2">{t('cardBusiness.title')}</h4>
              <p className="text-gray-500 text-sm mb-6 flex-1">
                {t('cardBusiness.desc')}
              </p>
              <Button asChild variant="link" size="sm" rightIcon={<ArrowRight />}>
                <Link href="/for-business">{t('cardBusiness.cta')}</Link>
              </Button>
            </div>

            <div className="bg-white rounded-3xl p-6 flex flex-col items-start hover:shadow-md transition-shadow">
              <div className="bg-slate-50 p-3 rounded-md shadow-sm text-bg-inverse mb-5 border border-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="H4 text-gray-900 mb-2">{t('cardGov.title')}</h4>
              <p className="text-gray-500 text-sm mb-6 flex-1">
                {t('cardGov.desc')}
              </p>
              <Button asChild variant="link" size="sm" rightIcon={<ArrowRight />}>
                <Link href="/for-governance">{t('cardGov.cta')}</Link>
              </Button>
            </div>
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
            <h2 className="H2 text-[var(--color-text-default)] mb-2 leading-tight tracking-tight">{t('title')}</h2>
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
      <OffersSection />
      <TestimonialsSection />
      <AISection />
      <FeaturesSection />
      <AppTestimonials />
      <ForBusinessSection />
      <NewsSection />
      <AppDownloadCTA />
      <Footer />
    </div>
  )
}
