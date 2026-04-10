'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { QrCode } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'


export function AppHero() {
  const t = useTranslations('TaiAppPage.Hero')
  const locale = useLocale()
  return (
    <section className="relative pt-[70px] pb-16 lg:pt-[102px] lg:pb-16 overflow-hidden bg-white">
      <div className={`${locale === 'en' ? 'max-w-[1100px]' : 'max-w-[960px]'} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex flex-col items-center text-center space-y-6">
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
            className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-[var(--color-brand-primary)] leading-[1.2] py-1"
          >
            {t('titleHighlight')}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[var(--color-text-dim)] max-w-2xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* Mockup image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-md flex justify-center"
          >
            <Image
              src={locale === 'en' ? '/images/hero-app-mockup-en.png' : '/images/hero-app-mockup.png'}
              alt="Visit Vietnam app — màn hình khám phá điểm đến"
              width={560}
              height={600}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Download buttons and QR hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full flex-wrap"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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

            <div className="hidden sm:flex h-12 sm:h-14 items-center justify-center gap-3 px-4 bg-[var(--color-bg-default)] rounded-[8px] shadow-sm border border-[var(--color-bg-dim)] text-sm text-[var(--color-text-dim)]">
              <QrCode className="w-5 h-5 text-[var(--color-text-default)] flex-shrink-0" />
              <div className="flex flex-col justify-center">
                <p className="font-medium text-[var(--color-text-default)] leading-tight">{t('scanToDownload')}</p>
                <p className="text-xs leading-tight">iOS & Android</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
