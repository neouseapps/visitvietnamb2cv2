'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { IndustryCarouselV2 } from '../../components/sections/IndustryCarouselV2'
import { PartnershipTiers } from '../../components/sections/PartnershipTiers'
import { RegistrationForm } from '../../components/sections/RegistrationForm'
import { PartnerProcess } from '../../components/sections/PartnerProcess'
import { TestimonialsSection as PartnerLogosSection } from '../../components/TestimonialsSection'
import { Button } from '../../components/ui/button'
import {
  Globe,
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  ChevronDown,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Counter hook
// ---------------------------------------------------------------------------
function useCounterOnVisible(target: number) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let frame: number
    const duration = 1200
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target])

  return { count, ref }
}

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------
function smoothScrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top: y, behavior: 'smooth' })
}

function HeroSection() {
  const t = useTranslations('ForBusinessPage.Hero')
  const tPage = useTranslations('ForBusinessPage')
  return (
    <section className="relative h-[90vh] min-h-[700px] flex flex-col overflow-hidden bg-[var(--color-bg-inverse)]">
      {/* Background image */}
      <Image
        src="/images/hero-for-business.png"
        alt="Visit Vietnam for Business"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 mt-16 flex-1 flex items-center">
        <div className="max-w-[832px] mx-auto text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6 bg-white/10 backdrop-blur-md">
            {t('badge')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-[1.2] mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Button variant="ghost" size="lg" className="w-64 sm:w-auto text-white border-white/30 hover:bg-white/10" onClick={() => smoothScrollTo('how-it-works')}>
              {t('ctaSecondary')}
            </Button>
            <Button variant="brand" size="lg" className="w-64 sm:w-auto" onClick={() => smoothScrollTo('register')}>
              {t('ctaPrimary')}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats bar — social proof anchored at the bottom of the hero */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-3 divide-x divide-white/10">
          <HeroStatItem target={100} suffix="+" label={tPage('Stats.0.label')} />
          <HeroStatItem target={120} suffix="+" label={tPage('Stats.1.label')} />
          <HeroStatItem target={50000} suffix="+" label={tPage('Stats.2.label')} />
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Hero stat item — rendered inside the hero's bottom stats bar
// ---------------------------------------------------------------------------
function HeroStatItem({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCounterOnVisible(target)
  const formatted = target >= 1000 ? count.toLocaleString('en-US') : count.toString()
  return (
    <div className="py-4 px-6 text-center">
      <div className="text-2xl md:text-3xl font-bold text-white flex items-baseline justify-center">
        <span ref={ref}>{formatted}</span>
        <span className="text-white/60 text-lg ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs md:text-sm text-white/60 mt-1 font-medium leading-snug">{label}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Features Section
// ---------------------------------------------------------------------------
function FeaturesSection() {
  const t = useTranslations('ForBusinessPage.Features')
  const features = [
    { icon: Globe, iconColor: 'text-[var(--color-text-dim)]' },
    { icon: LayoutDashboard, iconColor: 'text-[var(--color-text-dim)]' },
    { icon: TrendingUp, iconColor: 'text-[var(--color-text-dim)]' },
    { icon: CreditCard, iconColor: 'text-[var(--color-text-dim)]' },
  ].map((item, i) => ({
    ...item,
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
  }))
  return (
    <section id="features" className="py-16 bg-[var(--color-bg-dim)]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-display font-medium text-[var(--color-text-default)] leading-[1.3] mb-4">
            {t('title')}
          </h2>
          <p className="text-[var(--color-text-dim)] text-lg leading-relaxed max-w-2xl">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, iconColor, title, desc }) => (
            <div
              key={title}
              className="bg-white p-4 rounded-[16px] shadow-sm border border-[var(--color-border-default)]"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center ${iconColor} mb-3`}
              >
                <Icon className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-default font-bold text-[var(--color-text-default)] mb-3">{title}</h4>
              <p className="text-[var(--color-text-dim)] leading-relaxed text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


// ---------------------------------------------------------------------------
// FAQ Section
// ---------------------------------------------------------------------------
function FaqSection() {
  const t = useTranslations('ForBusinessPage.FAQ')
  const faqs = [0, 1, 2, 3, 4, 5].map(i => ({
    q: t(`items.${i}.q`),
    a: t(`items.${i}.a`),
  }))
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const toggleFaq = useCallback(
    (idx: number) => setOpenFaq((prev) => (prev === idx ? null : idx)),
    [],
  )
  return (
    <section className="py-16 bg-[var(--color-bg-default)]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] text-center mb-4">
            {t('title')}
          </h2>

          <p className="text-lg text-[var(--color-text-dim)] text-center mb-10">
            {t('subtitle')}
          </p>

          <div>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border-[var(--color-border-default)] ${idx < faqs.length - 1 ? 'border-b' : ''}`}
              >
                <button
                  className="w-full py-4 flex justify-between items-center text-left gap-4"
                  onClick={() => toggleFaq(idx)}
                >
                  <span className="font-medium text-base text-[var(--color-text-default)]">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-text-dim-variant)] shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === idx ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[var(--color-text-dim)] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact block — placed after FAQ items so reading order is logical */}
          <div className="mt-12 bg-[var(--color-bg-dim)] rounded-2xl p-6 text-center">
            <p className="text-base font-semibold text-[var(--color-text-default)] mb-3">{t('contactLabel')}</p>
            <div className="flex flex-col gap-2 items-center">
              <a href="mailto:partner@visitvietnam.asia" className="text-sm text-[var(--color-brand-primary)] hover:underline transition-colors">
                partner@visitvietnam.asia
              </a>
              <div className="text-sm text-[var(--color-text-dim)]">
                {t('hotline')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function ForBusinessPageClient() {
  const [presetSector, setPresetSector] = useState('')
  const tHero = useTranslations('ForBusinessPage.Hero')
  return (
    <div className="font-default text-[var(--color-text-default)] antialiased bg-white scroll-smooth">
      <Navbar variant="light" cta={{ label: tHero('navCta'), onClick: () => smoothScrollTo('register') }} />
      <main>
        <HeroSection />
        <PartnerLogosSection />
        <FeaturesSection />
        <IndustryCarouselV2 onSectorSelect={setPresetSector} />
        <PartnershipTiers />
        <PartnerProcess />
        <RegistrationForm presetSector={presetSector} />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
