'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { QrCode } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'


export function AppHero() {
  const t = useTranslations('TaiAppPage.Hero')
  const locale = useLocale()
  return (
    <section className="relative pt-[90px] pb-0 lg:pt-[102px] overflow-hidden bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left column — text + CTA */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 pb-0 lg:pb-24">
            {/* Callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)] px-4 py-2 rounded-full border border-[var(--color-brand-primary)]/30">
                {t('callout')}
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[var(--color-brand-primary)] leading-[1.15]"
            >
              {t('titleHighlight')}
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[var(--color-text-dim)] max-w-lg mx-auto lg:mx-0"
            >
              {t('subtitle')}
            </motion.p>

            {/* Download buttons and QR hint — desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:flex flex-col sm:flex-row items-start gap-4 pt-2 flex-wrap"
            >
              <div className="flex flex-row items-center gap-3">
                <a href="#" className="h-12 sm:h-14 flex items-center">
                  <Image
                    src="/images/app-store-badge.png"
                    alt="Download on the App Store"
                    height={56}
                    width={180}
                    className="h-full w-auto"
                  />
                </a>
                <a href="#" className="h-12 sm:h-14 flex items-center">
                  <Image
                    src="/images/google-play-badge.png"
                    alt="Get it on Google Play"
                    height={56}
                    width={180}
                    className="h-full w-auto"
                  />
                </a>
              </div>

              <div className="flex h-12 sm:h-14 items-center gap-3 px-4 bg-[var(--color-bg-default)] rounded-[8px] shadow-sm border border-[var(--color-bg-dim)] text-sm text-[var(--color-text-dim)]">
                <QrCode className="w-5 h-5 text-[var(--color-text-default)] flex-shrink-0" />
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-[var(--color-text-default)] leading-tight">{t('scanToDownload')}</p>
                  <p className="text-xs leading-tight">iOS & Android</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column — mockup image + mobile CTAs below */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col items-center lg:items-end h-full gap-8"
          >
            <Image
              src={locale === 'en' ? '/images/hero-app-mockup-en.png' : '/images/hero-app-mockup.png'}
              alt="Visit Vietnam app — màn hình khám phá điểm đến"
              width={560}
              height={600}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="w-full max-w-md lg:max-w-none h-auto object-contain drop-shadow-2xl"
              priority
            />

            {/* Mobile-only CTAs — below image, stacked vertically */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex lg:hidden flex-col items-center gap-3 pb-16 w-full"
            >
              <a href="#" className="h-14 flex items-center">
                <Image
                  src="/images/app-store-badge.png"
                  alt="Download on the App Store"
                  height={56}
                  width={180}
                  className="h-full w-auto"
                />
              </a>
              <a href="#" className="h-14 flex items-center">
                <Image
                  src="/images/google-play-badge.png"
                  alt="Get it on Google Play"
                  height={56}
                  width={180}
                  className="h-full w-auto"
                />
              </a>
              <div className="flex h-14 items-center gap-3 px-4 bg-[var(--color-bg-default)] rounded-[8px] shadow-sm border border-[var(--color-bg-dim)] text-sm text-[var(--color-text-dim)]">
                <QrCode className="w-5 h-5 text-[var(--color-text-default)] flex-shrink-0" />
                <div className="flex flex-col justify-center">
                  <p className="font-medium text-[var(--color-text-default)] leading-tight">{t('scanToDownload')}</p>
                  <p className="text-xs leading-tight">iOS & Android</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
