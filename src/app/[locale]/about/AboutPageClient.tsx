'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, useReducedMotion } from 'framer-motion'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/ui/button'
import {
  ArrowRight,
  Brain,
  Check,
  ChevronDown,
  Database,
  Handshake,
  MapPin,
  MessageCircle,
  Newspaper,
  Scale,
  Share2,
  ShieldCheck,
  X,
  Zap,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}
const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
}
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const staggerContainerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}
const slideLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}
const slideRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

// ---------------------------------------------------------------------------
// Counter hook — RAF + cubic ease-out
// ---------------------------------------------------------------------------
function useCounter(target: number, delay = 0) {
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
            observer.disconnect()
            setTimeout(() => {
              const duration = 1400
              const startTime = performance.now()
              const tick = (now: number) => {
                const progress = Math.min((now - startTime) / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                setCount(Math.round(eased * target))
                if (progress < 1) requestAnimationFrame(tick)
              }
              requestAnimationFrame(tick)
            }, delay)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, delay])

  return { count, ref }
}

function StatCounter({
  target,
  suffix = '',
  label,
  sublabel,
  highlight = false,
  delay = 0,
}: {
  target: number
  suffix?: string
  label: string
  sublabel: string
  highlight?: boolean
  delay?: number
}) {
  const { count, ref } = useCounter(target, delay)
  const formatted = target >= 1000 ? count.toLocaleString('en-US') : count

  return (
    <div
      className={`px-3 py-4 rounded-card flex items-start gap-3 ${
        highlight
          ? 'bg-[var(--color-brand-primary)] shadow-lg px-4'
          : ''
      }`}
    >
      <div
        className="text-4xl md:text-5xl font-bold text-white flex items-baseline shrink-0"
        style={{ fontFamily: 'var(--font-default)' }}
      >
        <span ref={ref}>{formatted}</span>
        {suffix && <span className="text-white">{suffix}</span>}
      </div>
      <div>
        <p className="font-bold uppercase tracking-wider text-sm mb-1 text-[var(--color-brand-primary)]">{label}</p>
        <p className="text-white/80 text-sm">{sublabel}</p>
      </div>
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

  const prefersReduced = useReducedMotion()
  const itemVariant = prefersReduced ? fadeUpReduced : fadeUp
  const slideLeftVariant = prefersReduced ? fadeUpReduced : slideLeft
  const slideRightVariant = prefersReduced ? fadeUpReduced : slideRight

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/hero-about.png"
            alt="Vietnam Landscape"
            className="w-full h-full object-cover object-center blur-[3px] scale-110"
          />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(58,31,8,0.85) 100%)' }} />
        </div>

        <motion.div
          className="max-w-[1440px] mx-auto px-8 relative z-10 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariant}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-6"
          >
            {tHero('badge')}
          </motion.span>
          <motion.h1
            variants={itemVariant}
            className="H1 text-white leading-[1.2] mb-6"
          >
            {tHero('title')}
          </motion.h1>
          <motion.p
            variants={itemVariant}
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
          </motion.p>
          <motion.div variants={itemVariant}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-bg-inverse font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              {tHero('cta')}
            </a>
          </motion.div>
        </motion.div>

      </section>

      {/* ================================================================
          1b. ECOSYSTEM DIAGRAM — nâu tối solid (no gradient)
      ================================================================ */}
      <section className="overflow-hidden relative bg-[var(--color-bg-brand-primary-dim)]">
        <div className="absolute inset-0 opacity-8 bg-dot-white pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-8 relative z-10 py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — headline */}
            <motion.div
              variants={itemVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <h2 className="font-display font-medium leading-[1.1] tracking-tight">
                <span className="block text-5xl md:text-6xl lg:text-7xl text-white">
                  {tEcosystem('titleLine1')}
                </span>
                <span className="block text-5xl md:text-6xl lg:text-7xl text-[var(--color-brand-primary)]">
                  {tEcosystem('titleLine2')}
                </span>
              </h2>
            </motion.div>

            {/* Right — diagram (desktop only) */}
            <motion.div
              variants={itemVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="hidden lg:block"
            >
              <img
                src={locale === 'en' ? '/images/about-section-en.png' : '/images/about-section.png'}
                alt="About Visit Vietnam"
                className="w-full object-contain"
              />
            </motion.div>
          </div>

          {/* Mobile — single image */}
          <img
            src={locale === 'en' ? '/images/about-section-en-mobile.png' : '/images/about-section-mobile.png'}
            alt="About Visit Vietnam"
            className="block lg:hidden w-full mt-8"
          />
        </div>
      </section>

      {/* ================================================================
          2. 3 PILLARS — bg-white
      ================================================================ */}
      <section className="py-16 bg-[var(--color-bg-brand-primary-dim)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-dot-white pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">

              {/* Left — headline */}
              <motion.div
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <p className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-2">
                  {tPillars('eyebrow')}
                </p>
                <h2 className="H2 text-white leading-[1.3] mb-4">
                  {tPillars('title')}
                </h2>
                <p className="text-[var(--color-alpha-white-70)] text-lg leading-relaxed">
                  {tPillars('subtitle')}
                </p>
              </motion.div>

              {/* Right — 3 cards */}
              <motion.div
                className="grid md:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {[0, 1, 2].map(i => {
                  const Icon = PILLAR_ICONS[i]
                  return (
                    <motion.div
                      key={i}
                      variants={itemVariant}
                      className="group bg-white/10 p-6 rounded-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full text-center"
                    >
                      <div className="flex items-center justify-center text-[var(--color-brand-primary)] mb-5 mx-auto">
                        <Icon className="w-12 h-12 group-hover:rotate-12 transition-transform duration-300" />
                      </div>
                      <h4 className="H4 text-white mb-3">{tPillars(`cards.${i}.title`)}</h4>
                      <p className="text-[var(--color-alpha-white-70)] leading-relaxed text-sm">
                        {tPillars(`cards.${i}.desc`)}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. VISION & MISSION — nâu sáng
      ================================================================ */}
      <section className="py-16 bg-[var(--color-bg-warm-light)]">
        <div className="max-w-2xl mx-auto px-8 text-center flex flex-col gap-16">
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-16"
          >
            {/* Vision */}
            <motion.div variants={itemVariant}>
              <div
                className="text-[120px] font-display font-medium leading-none select-none mb-[-32px] text-[var(--color-brand-primary)]/10"
                aria-hidden="true"
              >
                01
              </div>
              <span className="text-xs font-bold text-[var(--color-brand-primary)] tracking-widest uppercase mb-4 block">
                {tVision('label')}
              </span>
              <h2 className="H2 text-[var(--color-text-default)] leading-[1.3] mb-6">
                {tVision('title')}
              </h2>
              <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
                {tVision('desc')}
              </p>
            </motion.div>

            <div className="h-px bg-[var(--color-brand-primary)]/20" />

            {/* Mission */}
            <motion.div variants={itemVariant}>
              <div
                className="text-[120px] font-display font-medium leading-none select-none mb-[-32px] text-[var(--color-brand-primary)]/10"
                aria-hidden="true"
              >
                02
              </div>
              <span className="text-xs font-bold text-[var(--color-brand-primary)] tracking-widest uppercase mb-4 block">
                {tMission('label')}
              </span>
              <h2 className="H2 text-[var(--color-text-default)] leading-[1.3] mb-6">
                {tMission('title')}
              </h2>
              <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
                {tMission('desc')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          3b. COMMITMENTS — dark section (kiểu Business pricing)
      ================================================================ */}
      <section className="py-16 bg-bg-inverse relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-dot-brand pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-primary rounded-full blur-[100px] opacity-25 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary rounded-full blur-[100px] opacity-15 pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-8 relative z-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">

              {/* Left — headline */}
              <motion.div
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <h2 className="font-display font-medium leading-[1.1] tracking-tight">
                  <span className="block text-4xl md:text-5xl lg:text-6xl text-white">
                    {tCommitments('titleLine1')}
                  </span>
                  <span className="block text-4xl md:text-5xl lg:text-6xl text-[var(--color-brand-primary)]">
                    {tCommitments('titleLine2')}
                  </span>
                </h2>
              </motion.div>

              {/* Right — 2×2 feature grid */}
              <motion.div
                className="grid grid-cols-2 gap-8 lg:gap-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {[0, 1, 2, 3].map(i => {
                  const Icon = COMMITMENT_ICONS[i]
                  return (
                    <motion.div key={i} variants={itemVariant} className="flex flex-col gap-3">
                      <div className="text-[var(--color-brand-primary)]">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h4 className="H4 text-white">
                        {tCommitments(`items.${i}.title`)}
                      </h4>
                      <p className="text-sm text-[var(--color-alpha-white-70)] leading-relaxed">
                        {tCommitments(`items.${i}.desc`)}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. PROBLEM vs SOLUTION — nâu sáng
      ================================================================ */}
      <section className="py-16 bg-[var(--color-bg-warm-light)] relative bg-dot">
        <div className="max-w-[1440px] mx-auto px-8">
          <motion.div
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center max-w-[868px] mx-auto mb-16"
          >
            <span className="text-sm font-bold text-[var(--color-brand-primary)] tracking-widest uppercase mb-3 block">
              {tProblems('eyebrow')}
            </span>
            <h2 className="H2 text-bg-inverse mb-4">
              <span className="block">{tProblems('titleLine1')}</span>
              <span className="block">{tProblems('titleLine2')}</span>
            </h2>
            <p className="text-[var(--color-text-dim)] text-lg">
              {tProblems('subtitle')}
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-[var(--color-bg-warm-light)] rounded-card shadow-[0_8px_40px_rgba(0,0,0,0.10)] ring-1 ring-black/5 p-4">
              <div className="grid lg:grid-cols-2 overflow-hidden rounded-[calc(var(--radius-card)-4px)]">
              {/* Col 1 — no background */}
              <motion.div
                variants={slideLeftVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="p-8 md:p-10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="H3 text-[var(--color-text-default)]">
                    {tProblems('traditionalTitle')}
                  </h3>
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
              </motion.div>

              {/* Col 2 — white bg + shadow */}
              <motion.div
                variants={slideRightVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="bg-white rounded-card p-8 md:p-10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <h3 className="H3 text-[var(--color-text-default)]">{tSolutions('title')}</h3>
                </div>
                <ul className="space-y-6">
                  {[0, 1, 2, 3].map(i => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 w-6 h-6 rounded-full bg-[var(--color-brand-primary)]/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[var(--color-brand-primary)]" strokeWidth={3} />
                      </div>
                      <div>
                        <h5 className="font-bold text-[var(--color-text-default)] mb-1">{tSolutions(`items.${i}.title`)}</h5>
                        <p className="text-sm text-[var(--color-text-dim-variant)]">{tSolutions(`items.${i}.desc`)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          5. STATS — nâu tối
      ================================================================ */}
      <section className="py-20 lg:py-28 bg-[var(--color-bg-brand-primary-dim)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-dot-white pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-8 relative z-10">

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Text — spans 2 cols */}
            <motion.div variants={itemVariant} className="col-span-2 flex flex-col justify-center py-6 lg:py-0">
              <h2 className="H2 text-white leading-[1.1] mb-4">
                {tStats('title')}
              </h2>
              <p className="text-white/80 text-lg">
                {tStats('subtitle')}
              </p>
            </motion.div>

            {/* Row 1 cards */}
            <motion.div variants={itemVariant}>
              <StatCounter target={34} suffix="" label={tStats('items.0.label')} sublabel={tStats('items.0.sublabel')} delay={100} />
            </motion.div>
            <motion.div variants={itemVariant}>
              <StatCounter target={120} suffix="+" label={tStats('items.1.label')} sublabel={tStats('items.1.sublabel')} delay={200} />
            </motion.div>

            {/* Row 2 cards */}
            {[
              { target: 6000, suffix: '', label: tStats('items.2.label'), sublabel: tStats('items.2.sublabel') },
              { target: 100, suffix: '+', label: tStats('items.3.label'), sublabel: tStats('items.3.sublabel') },
              { target: 21, suffix: '', label: tStats('items.4.label'), sublabel: tStats('items.4.sublabel') },
              { target: 2, suffix: 'M+', label: tStats('items.5.label'), sublabel: tStats('items.5.sublabel') },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariant}>
                <StatCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  label={stat.label}
                  sublabel={stat.sublabel}
                  delay={300 + i * 100}
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ================================================================
          6. CONTACT — bg-white
      ================================================================ */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-8">
          <motion.div
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <h2 className="H2 text-bg-inverse mb-4">
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
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {[0, 1, 2].map(i => {
              const Icon = CONTACT_ICONS[i]
              const email = tContact(`items.${i}.email`)
              return (
                <motion.div
                  key={i}
                  variants={itemVariant}
                  className="bg-[var(--color-bg-warm-light)] p-8 rounded-card hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-brand-primary)]/10 flex items-center justify-center mb-6 text-[var(--color-brand-primary)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="H4 text-bg-inverse mb-2">{tContact(`items.${i}.title`)}</h4>
                  <p className="text-sm text-[var(--color-text-dim-variant)] mb-4">{tContact(`items.${i}.desc`)}</p>
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-[var(--color-brand-primary)] flex items-center gap-1 link-draw"
                  >
                    {email}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
