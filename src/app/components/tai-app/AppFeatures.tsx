'use client'

import Image from 'next/image'
import { Calendar, Smartphone, Compass, Share2, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

const FEATURE_STATIC_VI = [
  { icon: Calendar, image: '/images/app-feature-01.png' },
  { icon: Smartphone, image: '/images/app-feature-02.png' },
  { icon: Compass, image: '/images/app-feature-03.png' },
  { icon: Share2, image: '/images/app-feature-04.png' },
]

const FEATURE_STATIC_EN = [
  { icon: Calendar, image: '/images/app-feature-01-en.png' },
  { icon: Smartphone, image: '/images/app-feature-02-en.png' },
  { icon: Compass, image: '/images/app-feature-03-en.png' },
  { icon: Share2, image: '/images/app-feature-04-en.png' },
]

export function AppFeatures() {
  const t = useTranslations('TaiAppPage.Features')
  const locale = useLocale()
  const FEATURE_STATIC = locale === 'en' ? FEATURE_STATIC_EN : FEATURE_STATIC_VI
  const features = [0,1,2,3].map(i => ({
    ...FEATURE_STATIC[i],
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    imageAlt: t(`items.${i}.imageAlt`),
    bullets: [0,1,2].map(j => t(`items.${i}.bullets.${j}`)).filter(Boolean),
  }))
  return (
    <section className="py-16 bg-[var(--color-bg-default)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-2">
            {t('callout')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-default)] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[var(--color-text-dim)] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isReversed = index % 2 === 1

            return (
              <div
                key={feature.title}
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-12`}
              >
                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-card overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      width={800}
                      height={800}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="w-full h-auto lg:aspect-square lg:object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-3">
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-default)]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-lg text-[var(--color-text-dim)] leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center justify-center lg:justify-start gap-3 text-[var(--color-text-dim)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-default)] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="inline-flex items-center gap-1 text-[var(--color-brand-primary)] font-semibold text-sm hover:gap-2 transition-all">
                    {t('cta')}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
