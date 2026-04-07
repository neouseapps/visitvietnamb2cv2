'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Smartphone, Compass, Share2, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

const FEATURE_STATIC = [
  { icon: Calendar, image: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?q=80&w=1000&auto=format&fit=crop' },
  { icon: Smartphone, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop' },
  { icon: Compass, image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1000&auto=format&fit=crop' },
  { icon: Share2, image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop' },
]

export function AppFeatures() {
  const t = useTranslations('TaiAppPage.Features')
  const features = [0,1,2,3].map(i => ({
    ...FEATURE_STATIC[i],
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    imageAlt: t(`items.${i}.imageAlt`),
    bullets: [0,1,2].map(j => t(`items.${i}.bullets.${j}`)),
  }))
  return (
    <section className="py-24 bg-[var(--color-bg-default)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-default)] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[var(--color-text-dim)] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isReversed = index % 2 === 1

            return (
              <div
                key={feature.title}
                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
              >
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex-1 w-full"
                >
                  <div className="relative rounded-card overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-square">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-inverse)]/40 to-transparent" />
                    {/* Feature badge overlay */}
                    <div className="absolute bottom-6 left-6 right-6 bg-[var(--color-bg-default)]/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--color-bg-success-subtle)] rounded-full flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[var(--color-text-success-default)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--color-text-default)]">{feature.title}</h4>
                        <div className="h-1.5 w-12 bg-[var(--color-bg-success-default)] rounded-full mt-2" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-bg-success-subtle)] text-[var(--color-text-success-default)] font-bold text-lg shrink-0">
                      {index + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-default)]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-lg text-[var(--color-text-dim)] leading-relaxed mb-8">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3 text-[var(--color-text-dim)]">
                        <Check className="w-4 h-4 text-[var(--color-text-success-default)] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
