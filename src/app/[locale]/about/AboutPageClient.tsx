'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/ui/button'
import {
  ArrowRight,
  Brain,
  Check,
  CloudFog,
  Database,
  Handshake,
  MapPin,
  MessageCircle,
  Newspaper,
  Scale,
  Share2,
  ShieldCheck,
  Star,
  X,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Counter hook
// ---------------------------------------------------------------------------
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const steps = 60
            const increment = target / steps
            let current = 0
            const interval = setInterval(() => {
              current += increment
              if (current >= target) {
                setCount(target)
                clearInterval(interval)
              } else {
                setCount(Math.ceil(current))
              }
            }, duration / steps)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

function StatCounter({
  target,
  suffix = '',
  label,
  sublabel,
  highlight = false,
}: {
  target: number
  suffix?: string
  label: string
  sublabel: string
  highlight?: boolean
}) {
  const { count, ref } = useCounter(target)
  const formatted = target >= 1000 ? count.toLocaleString('en-US') : count

  return (
    <div
      className="text-center p-6 rounded-card backdrop-blur-sm relative overflow-hidden bg-white/10"
    >
      <div
        className="text-4xl md:text-5xl font-bold text-white mb-2 flex justify-center items-baseline"
        style={{ fontFamily: 'var(--font-default)' }}
      >
        <span ref={ref}>{formatted}</span>
        {suffix && <span className="text-white">{suffix}</span>}
      </div>
      <p className="font-bold uppercase tracking-wider text-sm mb-1 text-[var(--color-alpha-white-70)]">{label}</p>
      <p className="text-[var(--color-alpha-white-50)] text-xs">{sublabel}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AboutPageClient() {
  const locale = useLocale()
  const tHero = useTranslations('AboutPage.Hero')
  const tEcosystem = useTranslations('AboutPage.Ecosystem')
  const tPillars = useTranslations('AboutPage.Pillars')
  const tVision = useTranslations('AboutPage.Vision')
  const tMission = useTranslations('AboutPage.Mission')
  const tCommitments = useTranslations('AboutPage.Commitments')
  const tProblems = useTranslations('AboutPage.Problems')
  const tSolutions = useTranslations('AboutPage.Solutions')
  const tStats = useTranslations('AboutPage.Stats')
  const tContact = useTranslations('AboutPage.Contact')

  const PILLAR_ICONS = [Brain, Database, Share2]

  const CONTACT_ICONS = [MessageCircle, Handshake, Newspaper]
  const COMMITMENT_ICONS = [ShieldCheck, MapPin, Scale, Zap]

  return (
    <div className="bg-bg-dim text-[var(--color-text-default)] flex flex-col min-h-screen font-default">
      {/* ── Navbar ── */}
      <Navbar variant="light" />

      {/* ================================================================
          1. HERO
      ================================================================ */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-bg-inverse min-h-[80vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/hero-about.png"
            alt="Vietnam Landscape"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-6">
            {tHero('badge')}
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-[1.2] mb-6"
          >
            {tHero('title')}
          </h1>
          <p
            className="font-normal mb-10 max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--typography-font-family-default, SVN-Selecta)',
              fontSize: 'var(--web_typo-body-extralarge-font-size, 18px)',
              lineHeight: 'var(--web_typo-body-extralarge-line-height, 28px)',
              letterSpacing: '0',
              color: 'var(--color-text-neutral-inverse)',
            }}
          >
            {tHero('subtitle')}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-bg-inverse font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            {tHero('cta')}
          </a>
        </div>
      </section>

      {/* ================================================================
          1b. ECOSYSTEM DIAGRAM
      ================================================================ */}
      <section
        className="overflow-hidden relative flex flex-col items-center justify-center"
        style={{
          background: 'radial-gradient(ellipse at 15% 55%, rgba(160,55,10,0.55) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(90,25,5,0.35) 0%, transparent 50%), var(--color-bg-inverse)'
        }}
      >
        <h2 className="text-white font-display font-medium text-3xl md:text-4xl text-center pt-16 pb-8 px-8 relative z-10">
          {tEcosystem('title')}
        </h2>
        <img
          src={locale === 'en' ? '/images/about-section-en.png' : '/images/about-section.png'}
          alt="About Visit Vietnam"
          className="hidden md:block w-full max-h-[480px] object-contain mb-12"
        />
        <img
          src={locale === 'en' ? '/images/about-section-en-mobile.png' : '/images/about-section-mobile.png'}
          alt="About Visit Vietnam"
          className="block md:hidden w-full mb-12"
        />
      </section>

      {/* ================================================================
          2. 3 PILLARS
      ================================================================ */}
      <section className="py-16 bg-bg-dim relative">
        <div className="absolute top-0 inset-x-0 h-40 opacity-5 bg-gradient-fade" />
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-2">
              {tPillars('eyebrow')}
            </h2>
            <h3 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] leading-[1.3] mb-4">
              {tPillars('title')}
            </h3>
            <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
              {tPillars('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[0, 1, 2].map(i => {
              const Icon = PILLAR_ICONS[i]
              return (
                <div key={i} className="bg-white p-4 rounded-[16px] shadow-md max-w-[320px] mx-auto w-full text-center">
                  <div className="w-10 h-10 flex items-center justify-center text-[var(--color-text-dim)] mb-3 mx-auto">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-default font-bold text-[var(--color-text-default)] mb-3">{tPillars(`cards.${i}.title`)}</h4>
                  <p className="text-[var(--color-text-dim)] leading-relaxed text-sm">
                    {tPillars(`cards.${i}.desc`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          3. VISION & MISSION
      ================================================================ */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-8 text-center flex flex-col gap-16">
            {/* Vision */}
            <div>
              <span className="text-xs font-bold text-[var(--color-brand-primary)] tracking-widest uppercase mb-4 block">
                {tVision('label')}
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] leading-[1.3] mb-6">
                {tVision('title')}
              </h3>
              <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
                {tVision('desc')}
              </p>
            </div>

            <div className="h-px bg-[var(--color-border-default)]" />

            {/* Mission */}
            <div>
              <span className="text-xs font-bold text-[var(--color-brand-primary)] tracking-widest uppercase mb-4 block">
                {tMission('label')}
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] leading-[1.3] mb-6">
                {tMission('title')}
              </h3>
              <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
                {tMission('desc')}
              </p>
            </div>
        </div>
      </section>

      {/* ================================================================
          3b. COMMITMENTS
      ================================================================ */}
      <section className="py-16 bg-bg-dim">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] leading-[1.3]">
              {tCommitments('title')}
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[0, 1, 2, 3].map(i => {
              const Icon = COMMITMENT_ICONS[i]
              return (
                <div key={i} className="text-center">
                  <div className="p-3 inline-flex items-center justify-center text-[var(--color-brand-primary)] mb-4 mx-auto rounded-full bg-white/40">
                    <Icon className="w-12 h-12" />
                  </div>
                  <h4 className="font-display font-medium text-[var(--color-text-default)] text-xl mb-3">
                    {tCommitments(`items.${i}.title`)}
                  </h4>
                  <p className="text-sm text-[var(--color-text-dim-variant)] leading-relaxed">
                    {tCommitments(`items.${i}.desc`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          4. PROBLEM vs SOLUTION
      ================================================================ */}
      <section className="py-16 bg-bg-dim relative bg-dot">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center max-w-[868px] mx-auto mb-16">
            <span className="text-sm font-bold text-bg-danger-hover tracking-widest uppercase mb-3 block">
              {tProblems('eyebrow')}
            </span>
            <h3 className="text-3xl md:text-4xl font-default font-bold text-bg-inverse mb-4">
              {tProblems('title')}
            </h3>
            <p className="text-[var(--color-text-dim)] text-lg">
              {tProblems('subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto relative">

            {/* Traditional */}
            <div className="bg-white rounded-card p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <h4 className="text-xl font-bold text-[var(--color-text-default)] font-default">
                  {tProblems('traditionalTitle')}
                </h4>
              </div>
              <ul className="space-y-6">
                {[0, 1, 2, 3].map(i => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-[var(--color-bg-dim-hover)] flex items-center justify-center shrink-0">
                      <X className="w-3 h-3 text-[var(--color-text-dim)]" strokeWidth={3} />
                    </div>
                    <div>
                      <h5 className="font-bold text-[var(--color-text-default)] mb-1">{tProblems(`items.${i}.title`)}</h5>
                      <p className="text-sm text-[var(--color-text-dim-variant)]">{tProblems(`items.${i}.desc`)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visit Vietnam */}
            <div className="rounded-card p-8 md:p-10 shadow-xl text-white relative overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--color-alpha-black-20) 0%, var(--color-alpha-black-80) 100%), var(--color-bg-brand-primary-dim)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-bg-danger-hover/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <h4 className="text-xl font-bold font-default">{tSolutions('title')}</h4>
              </div>
              <ul className="space-y-6 relative z-10">
                {[0, 1, 2, 3].map(i => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <div>
                      <h5 className="font-bold text-white mb-1">{tSolutions(`items.${i}.title`)}</h5>
                      <p className="text-sm text-[var(--color-alpha-white-70)]">{tSolutions(`items.${i}.desc`)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          5. STATS
      ================================================================ */}
      <section className="py-16 bg-bg-inverse relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-dot-white" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-primary rounded-full blur-[100px] opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary rounded-full blur-[100px] opacity-20 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-default font-bold text-white mb-4">
              {tStats('title')}
            </h2>
            <p className="text-[var(--color-alpha-white-70)] text-lg">
              {tStats('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <StatCounter target={34} label={tStats('items.0.label')} sublabel={tStats('items.0.sublabel')} />
            <StatCounter
              target={120}
              suffix="+"
              label={tStats('items.1.label')}
              sublabel={tStats('items.1.sublabel')}
            />
            <StatCounter
              target={6000}
              label={tStats('items.2.label')}
              sublabel={tStats('items.2.sublabel')}
            />
            <StatCounter
              target={100}
              suffix="+"
              label={tStats('items.3.label')}
              sublabel={tStats('items.3.sublabel')}
            />
            <StatCounter target={21} label={tStats('items.4.label')} sublabel={tStats('items.4.sublabel')} />
            <StatCounter
              target={2}
              suffix="M+"
              label={tStats('items.5.label')}
              sublabel={tStats('items.5.sublabel')}
              highlight
            />
          </div>
        </div>
      </section>

      {/* ================================================================
          6. CONTACT
      ================================================================ */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-default font-bold text-bg-inverse mb-4">
              {tContact('title')}
            </h2>
            <p className="text-[var(--color-text-dim)] mb-8">
              {tContact('subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="primary" size="lg">
                <a href="/">{tContact('ctaPrimary')}</a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="/for-business">{tContact('ctaSecondary')}</a>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[0, 1, 2].map(i => {
              const Icon = CONTACT_ICONS[i]
              const email = tContact(`items.${i}.email`)
              return (
                <div
                  key={i}
                  className="bg-bg-dim p-8 rounded-card"
                >
                  <div className="mb-6 text-bg-inverse">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-bg-inverse mb-2">{tContact(`items.${i}.title`)}</h4>
                  <p className="text-sm text-[var(--color-text-dim-variant)] mb-4">{tContact(`items.${i}.desc`)}</p>
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-[var(--color-brand-primary)] hover:underline flex items-center gap-1"
                  >
                    {email}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
