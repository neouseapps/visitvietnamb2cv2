'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/app/components/ui/button'

// ─── Arrow icon ───────────────────────────────────────────────────────────────

const ArrowRight = () => (
  <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

// ─── Phone mockup ─────────────────────────────────────────────────────────────

function PhoneChatMockup() {
  return (
    <img
      src="/images/ai-section/phone-mockup-app.jpg"
      alt="Visit Vietnam app"
      className="w-[300px] h-auto rounded-[40px] shadow-2xl"
      draggable={false}
    />
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function AISection() {
  const t = useTranslations('FeatureWithMockup')
  const steps = [0, 1, 2].map(i => ({
    title: t(`steps.${i}.title`),
    desc: t(`steps.${i}.desc`),
  }))

  return (
    <section id="ai-assistant" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Col 1: Phone mockup — desktop only */}
        <div className="hidden lg:flex justify-center">
          <PhoneChatMockup />
        </div>

        {/* Col 2: Content */}
        <div className="flex flex-col max-w-xl">
          <div
            className="inline-block font-semibold text-sm tracking-wider uppercase mb-3"
            style={{ color: 'var(--color-bg-warning-default)' }}
          >
            {t('eyebrow')}
          </div>

          <h2
            className="font-bold text-[var(--color-text-default)] mb-2 font-default"
            style={{ fontSize: 32, lineHeight: '40px', letterSpacing: '-0.32px' }}
          >
            {t('title').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>

          <p className="text-lg text-gray-500 mb-10">
            {t('subtitle')}
          </p>

          {/* Phone mockup — mobile only, after subtitle */}
          <div className="flex justify-center mb-10 lg:hidden">
            <PhoneChatMockup />
          </div>

          <div className="space-y-7 mb-10">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                  style={{
                    background: 'var(--color-bg-dim)',
                    color: 'var(--color-text-default)',
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <h4
                    className="font-bold text-gray-900 mb-1 font-default"
                    style={{ fontSize: 18, lineHeight: '24px' }}
                  >
                    {step.title}
                  </h4>
                  <p className="text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Button asChild variant="primary" size="lg" rightIcon={<ArrowRight />}>
            <Link href="/tai-app">{t('cta')}</Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
