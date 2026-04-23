'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

// ─── Component ────────────────────────────────────────────────────────────────

export function PartnerProcess() {
  const t = useTranslations('PartnerProcess')

  const STEPS = [0, 1, 2, 3].map(i => ({
    id: i + 1,
    title: t(`steps.${i}.title`),
    desc: t(`steps.${i}.desc`),
  }))

  const [activeIndex, setActiveIndex] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setSlideWidth(containerRef.current.offsetWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 60
    if (info.offset.x < -threshold && activeIndex < STEPS.length - 1) {
      setActiveIndex((i) => i + 1)
    } else if (info.offset.x > threshold && activeIndex > 0) {
      setActiveIndex((i) => i - 1)
    }
  }

  return (
    <section id="how-it-works" className="py-16 bg-[var(--color-bg-dim)] scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — centered to match centered timeline */}
        <div className="mb-12 text-center">
          <p className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-3">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl font-display font-medium text-[var(--color-text-default)] leading-[1.3] mb-4">
            {t('title')}
          </h2>
          <p className="text-[var(--color-text-dim)] text-lg leading-relaxed max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* ── Desktop: 4-column grid ── */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Dotted connector line — sits behind the circles */}
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0 border-t-2 border-dashed border-[var(--color-border-default)] z-0" />

            <div className="grid grid-cols-4 gap-8 relative z-10">
              {STEPS.map((step) => (
                <div key={step.id} className="text-center">
                  {/* Number circle */}
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm" style={{}}>
                    <span className="text-2xl font-bold" style={{ color: 'var(--color-brand-primary)' }}>{step.id}</span>
                  </div>
                  <h4 className="font-default font-medium text-[var(--color-text-default)] mb-2 text-lg">
                    {step.title}
                  </h4>
                  <p className="text-sm text-[var(--color-text-dim)] px-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile: Framer Motion slider ── */}
        <div className="md:hidden">
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{
                left: -(STEPS.length - 1) * slideWidth,
                right: 0,
              }}
              dragElastic={0.1}
              animate={{ x: -activeIndex * slideWidth }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onDragEnd={handleDragEnd}
            >
              {STEPS.map((step) => (
                <div key={step.id} className="flex-shrink-0 w-full px-4">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6 shadow-sm" style={{}}>
                      <span className="text-2xl font-bold" style={{ color: 'var(--color-brand-primary)' }}>{step.id}</span>
                    </div>
                    <h4 className="font-default font-medium text-[var(--color-text-default)] mb-2 text-lg">
                      {step.title}
                    </h4>
                    <p className="text-sm text-[var(--color-text-dim)] max-w-xs mx-auto leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-2" role="tablist" aria-label="Process steps">
            {STEPS.map((step, i) => (
              <button
                key={step.id}
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={step.title}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? 'w-6 bg-[var(--color-brand-primary)]'
                    : 'w-2 bg-[var(--color-border-default)]'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
