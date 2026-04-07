'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import {
  ArrowRight,
  Brain,
  Check,
  CheckCircle,
  CloudFog,
  Compass,
  Database,
  Eye,
  Handshake,
  MapPin,
  MessageCircle,
  Newspaper,
  Quote,
  Share2,
  ShieldCheck,
  Star,
  Target,
  X,
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
      className={`text-center p-6 border rounded-card backdrop-blur-sm relative overflow-hidden ${
        highlight ? 'border-[var(--color-alpha-white-20)] bg-bg-danger-hover/20' : 'border-[var(--color-alpha-white-20)] bg-[var(--color-alpha-black-20)]'
      }`}
    >
      <div
        className="text-4xl md:text-5xl font-bold text-white mb-2 flex justify-center items-baseline"
        style={{ fontFamily: 'var(--font-default)' }}
      >
        <span ref={ref}>{formatted}</span>
        {suffix && <span className={highlight ? 'text-white' : 'text-bg-danger-hover'}>{suffix}</span>}
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
  const tHero = useTranslations('AboutPage.Hero')
  const tPillars = useTranslations('AboutPage.Pillars')
  const tVision = useTranslations('AboutPage.Vision')
  const tMission = useTranslations('AboutPage.Mission')
  const tProblems = useTranslations('AboutPage.Problems')
  const tSolutions = useTranslations('AboutPage.Solutions')
  const tStats = useTranslations('AboutPage.Stats')
  const tContact = useTranslations('AboutPage.Contact')

  const PILLAR_ICONS = [<Brain key={0} className="w-8 h-8" />, <Database key={1} className="w-8 h-8" />, <Share2 key={2} className="w-8 h-8" />]
  const PILLAR_BG = ['bg-[var(--color-bg-danger-bright)]', 'bg-[var(--color-brand-secondary)]', 'bg-[var(--color-bg-warning-bright)]']
  const PILLAR_TEXT = ['text-bg-danger-hover', 'text-bg-inverse', 'text-bg-warning-default']
  const PILLAR_HOVER_BG = ['group-hover:bg-bg-danger-hover', 'group-hover:bg-bg-inverse', 'group-hover:bg-bg-warning-default']

  const CONTACT_STATIC = [
    { icon: MessageCircle, email: 'hello@visitvietnam.asia' },
    { icon: Newspaper, email: 'press@visitvietnam.asia' },
    { icon: Handshake, email: 'partner@visitvietnam.asia' },
  ]

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
            src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2940&auto=format&fit=crop"
            alt="Vietnam Landscape"
            className="w-full h-full object-cover object-center opacity-60"
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
            {tHero('badge')}
          </span>
          <h1
            className="italic font-medium text-white mb-6"
            style={{
              fontFamily: 'var(--typography-font-family-display, "SVN-Ryhmes Display")',
              fontSize: 'var(--web_typo-display-extralarge-font-size, 48px)',
              lineHeight: 'var(--web_typo-display-extralarge-line-height, 54px)',
              letterSpacing: 'var(--web_typo-display-extralarge-letter-spacing, -0.48px)',
            }}
          >
            {tHero('titleLine1')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary-bright-hover)] to-[var(--color-text-bright)]">
              {tHero('titleHighlight')}
            </span>{' '}
            {tHero('titleLine2')}
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

          {/* Partners */}
          <div className="pt-8 border-t border-[var(--color-alpha-white-20)] inline-block">
            <p className="text-xs text-[var(--color-alpha-white-50)] uppercase tracking-widest font-semibold mb-6">
              {tHero('partnersLabel')}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-bg-warning-default" />
                <div className="text-left text-white">
                  <p className="text-xs font-bold uppercase leading-tight">
                    {tHero('partner1').split('\n').map((line, i) => (
                      <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Compass className="w-8 h-8 text-[var(--color-brand-primary-bright)]" />
                <div className="text-left text-white">
                  <p className="text-xs font-bold uppercase leading-tight">
                    {tHero('partner2').split('\n').map((line, i) => (
                      <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. 3 PILLARS
      ================================================================ */}
      <section className="py-24 bg-bg-dim relative">
        <div className="absolute top-0 inset-x-0 h-40 opacity-5 bg-gradient-fade" />
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-bold text-bg-danger-hover tracking-widest uppercase mb-3">
              {tPillars('eyebrow')}
            </p>
            <h3 className="text-3xl md:text-4xl font-default font-bold text-bg-inverse mb-4">
              {tPillars('title')}
            </h3>
            <p className="text-[var(--color-text-dim)] text-lg">
              {tPillars('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map(i => (
              <div key={i} className="bg-white p-10 rounded-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-[var(--color-border-default)]">
                <div className={`w-16 h-16 ${PILLAR_BG[i]} rounded-[var(--radius-md)] flex items-center justify-center ${PILLAR_TEXT[i]} mb-8 group-hover:scale-110 ${PILLAR_HOVER_BG[i]} group-hover:text-white transition-all duration-300`}>
                  {PILLAR_ICONS[i]}
                </div>
                <h4 className="text-xl font-bold text-bg-inverse mb-4 font-default">{tPillars(`cards.${i}.title`)}</h4>
                <p className="text-[var(--color-text-dim)] leading-relaxed text-sm">
                  {tPillars(`cards.${i}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          3. VISION & MISSION
      ================================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image column */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-modal overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1555921015-c2620a56ac44?q=80&w=1200&auto=format&fit=crop"
                  alt="Vietnam Culture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-bg-inverse/20" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-bg-danger-hover rounded-card -z-10 rotate-6 opacity-10" />
              <div className="absolute top-1/2 -left-8 bg-white p-6 rounded-[var(--radius-md)] shadow-xl z-20 border border-[var(--color-border-default)] max-w-xs animate-bounce [animation-duration:3s]">
                <div className="flex items-center gap-3 text-bg-danger-hover mb-2">
                  <Quote className="w-6 h-6" />
                </div>
                <p className="font-default font-bold text-bg-inverse italic">
                  {tMission('quote')}
                </p>
              </div>
            </div>

            {/* Text column */}
            <div className="space-y-12">
              {/* Vision */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-secondary)] text-bg-inverse text-xs font-bold uppercase tracking-widest mb-4">
                  <Eye className="w-3.5 h-3.5" /> {tVision('label')}
                </div>
                <h3 className="text-3xl font-default font-bold text-bg-inverse mb-4 leading-tight">
                  {tVision('title')}
                </h3>
                <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
                  {tVision('desc')}
                </p>
              </div>

              <div className="h-px w-full bg-[var(--color-border-default)]" />

              {/* Mission */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-bg-danger-bright)] text-bg-danger-hover text-xs font-bold uppercase tracking-widest mb-4">
                  <Target className="w-3.5 h-3.5" /> {tMission('label')}
                </div>
                <h3 className="text-2xl font-default font-bold text-bg-inverse mb-4 leading-tight">
                  {tMission('title')}
                </h3>
                <ul className="space-y-4 text-[var(--color-text-dim)]">
                  {[0, 1, 2].map(i => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-bg-danger-hover mt-0.5 shrink-0" />
                      <span>
                        <strong>{tMission(`items.${i}.strong`)}</strong> {tMission(`items.${i}.text`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. PROBLEM vs SOLUTION
      ================================================================ */}
      <section className="py-24 bg-bg-dim border-y border-[var(--color-border-default)] relative bg-dot">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold text-bg-danger-hover tracking-widest uppercase mb-3 block">
              {tProblems('eyebrow')}
            </span>
            <h3 className="text-3xl md:text-4xl font-default font-bold text-bg-inverse mb-4">
              {tProblems('titleLine1')}
              <br />
              {tProblems('titleLine2')}
            </h3>
            <p className="text-[var(--color-text-dim)] text-lg">
              {tProblems('subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
            {/* VS badge */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center font-bold text-[var(--color-text-dim-variant)] z-10 border border-[var(--color-border-default)] text-sm">
              VS
            </div>

            {/* Traditional */}
            <div className="bg-white rounded-card p-8 md:p-10 border border-[var(--color-border-default)] shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <h4 className="text-xl font-bold text-[var(--color-text-default)] font-default">
                  {tProblems('traditionalTitle')}
                </h4>
              </div>
              <ul className="space-y-6">
                {[0, 1, 2, 3].map(i => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-[var(--color-bg-danger-bright)] flex items-center justify-center shrink-0">
                      <X className="w-3 h-3 text-bg-danger-hover" strokeWidth={3} />
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
            <div className="bg-bg-inverse rounded-card p-8 md:p-10 shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-bg-danger-hover/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <h4 className="text-xl font-bold font-default">{tSolutions('title')}</h4>
              </div>
              <ul className="space-y-6 relative z-10">
                {[0, 1, 2, 3].map(i => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-[var(--color-bg-success-bright)] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[var(--color-text-success-default)]" strokeWidth={3} />
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
      <section className="py-24 bg-bg-inverse relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-dot-white" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-bg-danger-hover rounded-full blur-[100px] opacity-30 pointer-events-none" />
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
            <StatCounter target={63} label={tStats('items.0.label')} sublabel={tStats('items.0.sublabel')} />
            <StatCounter
              target={12500}
              suffix="+"
              label={tStats('items.1.label')}
              sublabel={tStats('items.1.sublabel')}
            />
            <StatCounter
              target={8000}
              suffix="+"
              label={tStats('items.2.label')}
              sublabel={tStats('items.2.sublabel')}
            />
            <StatCounter
              target={5000}
              suffix="+"
              label={tStats('items.3.label')}
              sublabel={tStats('items.3.sublabel')}
            />
            <StatCounter target={45} label={tStats('items.4.label')} sublabel={tStats('items.4.sublabel')} />
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
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-default font-bold text-bg-inverse mb-4">
              {tContact('title')}
            </h2>
            <p className="text-[var(--color-text-dim)]">
              {tContact('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map(i => {
              const { icon: Icon, email } = CONTACT_STATIC[i]
              return (
                <div
                  key={i}
                  className="bg-bg-dim p-8 rounded-card border border-[var(--color-border-default)] hover:border-bg-danger-hover/30 transition-colors group"
                >
                  <div className="mb-6 text-bg-inverse group-hover:text-bg-danger-hover group-hover:scale-110 transition-all">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-bg-inverse mb-2">{tContact(`items.${i}.title`)}</h4>
                  <p className="text-sm text-[var(--color-text-dim-variant)] mb-4 h-10">{tContact(`items.${i}.desc`)}</p>
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-bg-danger-hover hover:underline flex items-center gap-1"
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
