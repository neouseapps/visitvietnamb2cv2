'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
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
  Mail,
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
    <section className="relative h-[90vh] min-h-[580px] sm:min-h-[700px] flex flex-col overflow-hidden bg-[var(--color-bg-inverse)]">
      {/* Background image — mobile: dedicated portrait shot, desktop: landscape */}
      <Image
        src="/images/hero-for-business-mobile.jpg"
        alt="Visit Vietnam for Business"
        fill
        className="object-cover object-center md:hidden"
        priority
      />
      <Image
        src="/images/hero-for-business.png"
        alt="Visit Vietnam for Business"
        fill
        className="object-cover object-right hidden md:block"
        priority
      />

      {/* Directional gradient — dark left for text legibility, clear right for subject */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.10) 65%, rgba(0,0,0,0) 100%)' }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 mt-16 flex-1 flex items-center justify-center md:justify-start">
        <div className="max-w-[560px] text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6 bg-white/10 backdrop-blur-md">
            {t('badge')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-[1.2] mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl">
            {t('subtitle')}
          </p>
          {/* Primary CTA dominates; secondary is a lightweight text link */}
          <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
            <Button variant="brand" size="lg" onClick={() => smoothScrollTo('register')}>
              {t('ctaPrimary')}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats bar — 2-col top row + full-width bottom on mobile, 3-col on sm+ */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 grid grid-cols-2 sm:grid-cols-3">
          <HeroStatItem target={100} suffix="+" label={tPage('Stats.0.label')} className="border-r border-white/10 sm:border-b-0" />
          <HeroStatItem target={120} suffix="+" label={tPage('Stats.1.label')} className="sm:border-r sm:border-white/10" />
          <HeroStatItem target={50000} suffix="+" label={tPage('Stats.2.label')} className="col-span-2 sm:col-span-1 border-t border-white/10 sm:border-t-0" />
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Hero stat item
// ---------------------------------------------------------------------------
function HeroStatItem({ target, suffix, label, className }: { target: number; suffix: string; label: string; className?: string }) {
  const { count, ref } = useCounterOnVisible(target)
  const formatted = target >= 1000 ? count.toLocaleString('en-US') : count.toString()
  return (
    <div className={`py-4 px-6 text-center ${className ?? ''}`} aria-live="polite">
      <div className="text-2xl md:text-3xl font-bold flex items-baseline justify-center">
        <span ref={ref} className="text-[var(--color-brand-secondary)]">{formatted}</span>
        <span className="text-[var(--color-brand-secondary)]/70 text-lg ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs md:text-sm text-white/60 mt-1 font-medium leading-snug">{label}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Features Section — 4-column equal grid with scroll-entrance animations
// ---------------------------------------------------------------------------

// Variants defined outside component — static, no re-creation on render
const featureContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const featureItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}
const featureItemVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}

function FeatureItem({
  icon: Icon,
  title,
  desc,
  variants,
}: {
  icon: React.ElementType
  title: string
  desc: string
  variants: Variants
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      variants={variants}
      className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-7 px-5 py-5 sm:py-6 -mx-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon
        className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 sm:mt-0.5 transition-colors duration-200"
        style={{ color: hovered ? 'var(--color-text-warning-bright)' : 'var(--color-bg-brand-primary-dim)' }}
        aria-hidden="true"
      />
      <div>
        <h4 className="text-xl font-display font-medium text-[var(--color-text-default)] mb-2 leading-snug">
          {title}
        </h4>
        <p className="text-[var(--color-text-dim)] text-sm leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  )
}

function FeaturesSection() {
  const t = useTranslations('ForBusinessPage.Features')
  const prefersReduced = useReducedMotion()

  const features = [
    { icon: Globe },
    { icon: LayoutDashboard },
    { icon: TrendingUp },
    { icon: CreditCard },
  ].map((item, i) => ({
    ...item,
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
  }))

  const itemVariant = prefersReduced ? featureItemVariantsReduced : featureItemVariants

  return (
    <section id="features" className="py-20 md:py-28 bg-[var(--color-bg-dim)]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        {/* 2-column editorial layout: sticky header left, item list right */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">

          {/* Left — 1/2: eyebrow + title + subtitle, sticky on desktop */}
          <div className="md:sticky md:top-24 text-center md:text-left">
            <p className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-3">
              {t('eyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] leading-[1.25] mb-6">
              {t('title')}
            </h2>
            <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Right — 1/2: staggered item list */}
          <motion.div
            className="flex flex-col gap-2"
            variants={featureContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <FeatureItem key={title} icon={Icon} title={title} desc={desc} variants={itemVariant} />
            ))}
          </motion.div>

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
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
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
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-medium text-base text-[var(--color-text-default)]">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-text-dim-variant)] shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === idx ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[var(--color-text-dim)] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact block */}
          <div className="mt-12 rounded-2xl p-8 text-center bg-gradient-to-br from-[var(--color-brand-primary-bright)] to-white border border-[var(--color-brand-primary-bright)]">
            <div className="w-10 h-10 rounded-full bg-[var(--color-brand-primary)]/10 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-5 h-5 text-[var(--color-brand-primary)]" />
            </div>
            <p className="text-base font-semibold text-[var(--color-text-default)] mb-1">{t('contactLabel')}</p>
            <div className="flex flex-col gap-2 items-center mt-3">
              <a href="mailto:partner@visitvietnam.asia" className="text-sm font-medium text-[var(--color-brand-primary)] hover:underline transition-colors">
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
  const [presetTier, setPresetTier] = useState<{ id: string; name: string } | null>(null)
  const tHero = useTranslations('ForBusinessPage.Hero')

  const handleTierSelect = useCallback((id: string, name: string) => {
    setPresetTier({ id, name })
    smoothScrollTo('register')
  }, [])

  return (
    <div className="font-default text-[var(--color-text-default)] antialiased bg-white scroll-smooth">
      <Navbar variant="light" cta={{ label: tHero('navCta'), onClick: () => smoothScrollTo('register') }} />
      <main>
        <HeroSection />
        <PartnerLogosSection />
        <FeaturesSection />
        <IndustryCarouselV2 onSectorSelect={setPresetSector} />
        <PartnershipTiers onTierSelect={handleTierSelect} />
        <PartnerProcess />
        <RegistrationForm presetSector={presetSector} presetTier={presetTier} />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
