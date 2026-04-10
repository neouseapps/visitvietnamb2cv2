'use client'

import { useTranslations } from 'next-intl'
import { TestimonialCarousel } from '../sections/TestimonialCarousel'

export function AppTestimonials() {
  const t = useTranslations('TaiAppPage.Testimonials')
  return (
    <section className="py-16 bg-[var(--color-bg-dim)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[var(--color-text-dim-variant)] uppercase tracking-wider mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-default)] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[var(--color-text-dim)]">{t('subtitle')}</p>
        </div>

        <TestimonialCarousel />
      </div>
    </section>
  )
}
