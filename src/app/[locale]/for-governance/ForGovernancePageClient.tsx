'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/ui/button'
import {
  Database,
  Clock,
  EyeOff,
  BarChart3,
  Map,
  PieChart,
  BrainCircuit,
  FileCheck,
  Target,
  FileOutput,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Integer counter hook
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Smooth scroll helper (matches ForBusiness)
// ---------------------------------------------------------------------------
function smoothScrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top: y, behavior: 'smooth' })
}

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------
function HeroSection() {
  const t = useTranslations('ForGovernancePage.Hero')
  const tSponsor = useTranslations('ForGovernancePage.NationalSponsorship')
  const sponsorCards = [
    { src: '/images/governance/timeless-charm.png', label: tSponsor('cards.0.label') },
    { src: '/images/governance/hiep-hoi.png', label: tSponsor('cards.1.label') },
  ]
  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden bg-[var(--color-bg-inverse)]">
      {/* Background image */}
      <Image
        src="/images/hero-for-governance.png"
        alt="For Government"
        fill
        className="object-cover object-center"
        priority
        unoptimized
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 mt-16">
        <div className="max-w-[832px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6 bg-white/10 backdrop-blur-md">
            {t('badge')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-[1.2] mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Sponsorship block */}
          <div className="mb-8 backdrop-blur-md rounded-[32px] px-10 py-6 inline-block" style={{ backgroundColor: 'color-mix(in srgb, var(--color-brand-primary) 30%, rgba(255,255,255,0.08))', border: '1px solid rgba(255,255,255,0.18)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 8px rgba(0,0,0,0.04)' }}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 mb-8">
              <span className="text-xs font-bold tracking-widest uppercase text-white/70">{tSponsor('title')}</span>
            </div>
            <div className="flex items-center justify-center gap-6">
              {sponsorCards.map(({ src, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="relative w-16 h-16">
                    <Image src={src} alt={label} fill className="object-contain" unoptimized />
                  </div>
                  <span className="text-lg text-white/80 leading-relaxed text-center max-w-[140px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center w-64 mx-auto">
            <Button variant="ghost" size="lg" className="w-full text-white border-white/30 hover:bg-white/10" onClick={() => smoothScrollTo('features')}>
              {t('ctaSecondary')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Gradient Banner Section (below Hero)
// ---------------------------------------------------------------------------
function GradientBannerSection() {
  const t = useTranslations('ForGovernancePage.GradientBanner')
  return (
    <section
      className="h-[480px] relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 10%, rgba(180,20,35,0.85) 0%, rgba(100,5,15,0.95) 45%, #0d0005 100%)',
      }}
    >
      <h2
        className="absolute left-0 right-0 text-center text-white font-display font-medium text-3xl md:text-4xl px-8"
        style={{ top: '60px' }}
      >
        {t('title')}
      </h2>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Pain Points Section
// ---------------------------------------------------------------------------
function PainPointsSection() {
  const t = useTranslations('ForGovernancePage.PainPoints')
  const items = [
    { icon: Database },
    { icon: Clock },
    { icon: EyeOff },
  ].map((item, i) => ({
    ...item,
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
  }))

  return (
    <section className="py-16 bg-[var(--color-bg-dim)]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-2">
            {t('eyebrow')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] leading-[1.3] mb-4">
            {t('title')}
          </h3>
          <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-[48px] bg-white/80 backdrop-blur-sm rounded-[20px] p-8">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <div className="w-10 h-10 flex items-center justify-center text-[var(--color-text-dim)] mb-3">
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
// Dashboard Features Section
// ---------------------------------------------------------------------------
function DashboardFeaturesSection() {
  const t = useTranslations('ForGovernancePage.DashboardFeatures')
  const features = [
    { icon: BarChart3 },
    { icon: Map },
    { icon: PieChart },
    { icon: BrainCircuit },
  ].map((item, i) => ({
    ...item,
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
  }))

  return (
    <section id="features" className="py-16 bg-[var(--color-bg-default)]">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Row 1: headline left, subtitle + CTA right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">
          <div>
            <h2 className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-4">
              {t('eyebrow')}
            </h2>
            <h3 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] leading-[1.3]">
              {t('title')}
            </h3>
          </div>
          <div>
            <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Row 2: 4 cards horizontal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-[var(--color-bg-dim)] p-5 rounded-[16px]"
            >
              <div className="w-10 h-10 flex items-center justify-center text-[var(--color-brand-primary)] mb-4 bg-white rounded-full">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-default font-bold text-[var(--color-text-default)] mb-2">{title}</h4>
              <p className="text-[var(--color-text-dim)] leading-relaxed text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA centered below cards */}
        <div className="flex justify-center">
          <Button variant="ghost" size="lg" className="w-fit" onClick={() => smoothScrollTo('contact')}>
            {t('cta')}
          </Button>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// National Sponsorship Section
// ---------------------------------------------------------------------------
function NationalSponsorshipSection() {
  const t = useTranslations('ForGovernancePage.NationalSponsorship')
  const cards = [
    { src: '/images/governance/timeless-charm.png', label: t('cards.0.label') },
    { src: '/images/governance/hiep-hoi.png', label: t('cards.1.label') },
  ]
  return (
    <section
      className="py-16 relative"
      style={{ background: 'linear-gradient(180deg, var(--color-alpha-black-20) 0%, var(--color-alpha-black-80) 100%), var(--color-bg-brand-primary-dim)' }}
    >
      <div className="max-w-[1440px] mx-auto px-8 text-center">
        <h3
          className="text-3xl md:text-4xl font-display font-medium leading-[1.3] mb-12"
          style={{ background: 'linear-gradient(77deg, #FFDDB7 1%, #FFF7EE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          {t('title')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-2xl mx-auto">
          {cards.map(({ src, label }) => (
            <div key={label} className="flex flex-col items-center gap-4">
              <div className="rounded-[24px] p-8" style={{ backgroundColor: 'color-mix(in srgb, var(--color-brand-primary) 10%, transparent)' }}>
                <div className="relative w-24 h-24">
                  <Image src={src} alt={label} fill className="object-contain" unoptimized />
                </div>
              </div>
              <p className="text-white/90 text-[20px] font-medium text-center leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Value Props Section
// ---------------------------------------------------------------------------
function ValuePropsSection() {
  const t = useTranslations('ForGovernancePage.ValueProps')
  const items = [
    { icon: FileCheck },
    { icon: Target },
    { icon: FileOutput },
  ].map((item, i) => ({
    ...item,
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
  }))

  return (
    <section className="py-16 text-white" style={{ background: 'linear-gradient(180deg, var(--color-alpha-black-20) 0%, var(--color-alpha-black-80) 100%), var(--color-bg-brand-primary-dim)' }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center max-w-[520px] mx-auto mb-12">
          <h2 className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-2">
            {t('eyebrow')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-medium text-white leading-[1.3] mb-4">
            {t('title')}
          </h3>
          <p className="text-white/70 text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-0">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <Icon className="w-12 h-12 text-white/80" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
              <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Contact Form Section
// ---------------------------------------------------------------------------
function ContactFormSection() {
  const t = useTranslations('ForGovernancePage.Contact')

  return (
    <section id="contact" className="py-16 bg-[var(--color-bg-dim)]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-2">
            {t('eyebrow')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] leading-[1.3] mb-4">
            {t('title')}
          </h3>
          <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-[620px] mx-auto flex flex-col gap-12">
          {/* Contact info */}
          <div className="bg-white rounded-[24px] p-8">
            <div>
              <h4 className="text-xl font-bold mb-6 text-[var(--color-text-default)]">{t('infoTitle')}</h4>
              <div className="space-y-5 flex flex-col items-start">
                <a
                  href={`mailto:${t('email')}`}
                  className="flex items-center gap-3 text-[var(--color-text-dim)] hover:text-[var(--color-text-default)] transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-medium">{t('email')}</p>
                </a>
                <div className="flex items-center gap-3 text-[var(--color-text-dim)]">
                  <div className="w-9 h-9 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <p className="text-sm font-medium">{t('phone')}</p>
                </div>
                <div className="flex items-center gap-3 text-[var(--color-text-dim)]">
                  <div className="w-9 h-9 rounded-xl bg-black/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t('address')}</p>
                    <p className="text-xs text-[var(--color-text-dim-variant)] mt-1">{t('hours')}</p>
                  </div>
                </div>
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
export default function ForGovernancePageClient() {
  const tHero = useTranslations('ForGovernancePage.Hero')
  return (
    <div className="font-default text-[var(--color-text-default)] antialiased bg-white scroll-smooth">
      <Navbar variant="light" cta={{ label: tHero('navCta'), onClick: () => smoothScrollTo('contact') }} />
      <main>
        <HeroSection />
        <PainPointsSection />
        <DashboardFeaturesSection />
        <ValuePropsSection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  )
}
