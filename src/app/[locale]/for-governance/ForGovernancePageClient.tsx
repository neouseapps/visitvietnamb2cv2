'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { Button } from '../../components/ui/button'
import {
  ShieldCheck,
  TrendingUp,
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
  ChevronDown,
  CheckCircle2,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Integer counter hook
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
// Float counter hook (for decimals like 2.4, 4.2, 4.6)
// ---------------------------------------------------------------------------
function useFloatCounterOnVisible(target: number, decimals = 1) {
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
      setCount(parseFloat((eased * target).toFixed(decimals)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target, decimals])

  return { count, ref }
}

// ---------------------------------------------------------------------------
// Hero Section
// ---------------------------------------------------------------------------
function HeroSection() {
  const t = useTranslations('ForGovernancePage.Hero')
  return (
    <section
      className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--color-bg-inverse) 0%, #0d2b1e 50%, #1a3a2a 100%)',
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-8 mt-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6 bg-white/10 backdrop-blur-md border border-white/20">
            <ShieldCheck className="w-4 h-4 text-[var(--color-brand-primary)]" />
            {t('badge')}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-[1.2] mb-6">
            {t('title')}<br />{t('titleLine2')}
          </h1>
          <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="brand" size="lg">
              <a href="#contact">{t('ctaPrimary')}</a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
              <a href="#features">{t('ctaSecondary')}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Stats Dashboard Section
// ---------------------------------------------------------------------------
function StatsDashboardSection() {
  const t = useTranslations('ForGovernancePage.Stats')

  // 2.4M arrivals
  const arrivals = useFloatCounterOnVisible(2.4)
  // $847 spending (integer)
  const spending = useCounterOnVisible(847)
  // 4.2 days stay
  const stay = useFloatCounterOnVisible(4.2)
  // 4.6 satisfaction
  const satisfaction = useFloatCounterOnVisible(4.6)

  const stats = [
    {
      ref: arrivals.ref,
      value: arrivals.count.toFixed(1),
      prefix: '',
      suffix: 'M',
      label: t('0.label'),
      trend: t('0.trend'),
    },
    {
      ref: spending.ref,
      value: spending.count.toLocaleString('en-US'),
      prefix: '$',
      suffix: '',
      label: t('1.label'),
      trend: t('1.trend'),
    },
    {
      ref: stay.ref,
      value: stay.count.toFixed(1),
      prefix: '',
      suffix: ' days',
      label: t('2.label'),
      trend: null,
    },
    {
      ref: satisfaction.ref,
      value: satisfaction.count.toFixed(1),
      prefix: '',
      suffix: '★',
      label: t('3.label'),
      trend: null,
    },
  ]

  return (
    <section className="py-16 bg-[var(--color-bg-default)] border-y border-[var(--color-border-default)]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--color-border-default)]">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-text-default)] mb-1 flex justify-center items-baseline gap-0.5">
                <span className="text-2xl md:text-3xl font-medium text-[var(--color-text-dim)]">{stat.prefix}</span>
                <span ref={stat.ref}>{stat.value}</span>
                <span className="text-xl md:text-2xl font-medium text-[var(--color-text-dim)] ml-0.5">{stat.suffix}</span>
              </div>
              {stat.trend && (
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mb-2">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              )}
              <p className="text-[var(--color-text-dim)] font-medium text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
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
    <section className="py-24 bg-[var(--color-bg-dim)]">
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

        <div className="grid md:grid-cols-3 gap-8">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-4"
            >
              <div className="mb-4 text-[var(--color-brand-secondary)]">
                <Icon className="w-12 h-12" />
              </div>
              <h4 className="text-xl font-bold text-bg-inverse mb-2 font-default">{title}</h4>
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
    <section id="features" className="py-24 bg-[var(--color-bg-default)]">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-4 rounded-[16px] shadow-sm border border-[var(--color-border-default)]"
            >
              <div className="w-8 h-8 flex items-center justify-center text-[var(--color-brand-primary)] mb-3">
                <Icon className="w-8 h-8" />
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
    <section className="py-16 bg-[var(--color-bg-inverse)] text-white relative">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-2">
            {t('eyebrow')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-medium text-white leading-[1.3]">
            {t('title')}
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20">
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
const inputClass =
  'w-full rounded-xl border border-[var(--color-border-default)] bg-white px-4 py-3 text-sm text-[var(--color-text-default)] placeholder:text-[var(--color-text-dim-variant)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] transition'

function ContactFormSection() {
  const t = useTranslations('ForGovernancePage.Contact')
  const [form, setForm] = useState({ organization: '', position: '', name: '', email: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const isValid = Object.values(form).every((v) => v.trim() !== '')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!isValid) return
      setIsSubmitting(true)
      await new Promise((res) => setTimeout(res, 1200))
      setIsSubmitting(false)
      setIsSubmitted(true)
    },
    [isValid],
  )

  return (
    <section id="contact" className="py-24 bg-[var(--color-bg-dim)]">
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

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="bg-[var(--color-bg-inverse)] rounded-[24px] p-8 text-white flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold mb-6">{t('infoTitle')}</h4>
              <div className="space-y-5">
                <a
                  href={`mailto:${t('email')}`}
                  className="flex items-start gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Email</p>
                    <p className="text-sm font-medium">{t('email')}</p>
                  </div>
                </a>
                <div className="flex items-start gap-3 text-white/80">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Phone</p>
                    <p className="text-sm font-medium">{t('phone')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-white/80">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Office</p>
                    <p className="text-sm font-medium">{t('address')}</p>
                    <p className="text-xs text-white/50 mt-1">{t('hours')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-xs text-white/50 leading-relaxed">
                All data shared in this form is handled in accordance with Vietnam's personal data protection regulations (Decree 13/2023/ND-CP).
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[var(--color-border-default)]">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-[var(--color-text-default)] mb-2">{t('successTitle')}</h4>
                <p className="text-[var(--color-text-dim)] text-sm leading-relaxed max-w-xs">{t('successDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-default)] mb-1.5">
                    {t('fields.organization')}
                  </label>
                  <input
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    placeholder={t('placeholders.organization')}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-default)] mb-1.5">
                    {t('fields.position')}
                  </label>
                  <input
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    placeholder={t('placeholders.position')}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-default)] mb-1.5">
                    {t('fields.name')}
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('placeholders.name')}
                    className={inputClass}
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-default)] mb-1.5">
                      {t('fields.email')}
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('placeholders.email')}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-default)] mb-1.5">
                      {t('fields.phone')}
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t('placeholders.phone')}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="brand"
                    size="lg"
                    className="w-full"
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        {t('submit')}
                      </span>
                    ) : (
                      t('submit')
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// FAQ Section
// ---------------------------------------------------------------------------
function FaqSection() {
  const t = useTranslations('ForGovernancePage.FAQ')
  const faqs = [0, 1, 2, 3, 4].map((i) => ({
    q: t(`items.${i}.q`),
    a: t(`items.${i}.a`),
  }))
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const toggleFaq = useCallback(
    (idx: number) => setOpenFaq((prev) => (prev === idx ? null : idx)),
    [],
  )

  return (
    <section className="py-24 bg-[var(--color-bg-default)]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] text-center mb-2">
            {t('title')}
          </h2>
          <p className="text-[var(--color-text-dim)] text-center mb-10">
            {t('subtitle')}
          </p>

          <div className="bg-[var(--color-bg-dim)] rounded-2xl px-6 py-4 mb-10 flex items-center gap-3">
            <Mail className="w-4 h-4 text-[var(--color-brand-primary)] shrink-0" />
            <p className="text-sm text-[var(--color-text-dim)]">
              Still have questions?{' '}
              <a
                href={`mailto:${t('contactEmail')}`}
                className="font-medium text-[var(--color-text-default)] hover:text-[var(--color-brand-primary)] transition-colors"
              >
                {t('contactEmail')}
              </a>
            </p>
          </div>

          <div>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border-b border-[var(--color-border-default)] ${idx === 0 ? 'border-t' : ''}`}
              >
                <button
                  className="w-full py-4 flex justify-between items-center text-left gap-4"
                  onClick={() => toggleFaq(idx)}
                >
                  <span className="font-semibold text-[var(--color-text-default)]">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-text-dim-variant)] shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === idx ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[var(--color-text-dim)] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
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
  return (
    <div className="font-default text-[var(--color-text-default)] antialiased bg-white scroll-smooth">
      <Navbar variant="light" />
      <main>
        <HeroSection />
        <StatsDashboardSection />
        <PainPointsSection />
        <DashboardFeaturesSection />
        <ValuePropsSection />
        <ContactFormSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
