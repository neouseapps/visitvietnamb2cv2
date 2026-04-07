'use client'

import { motion } from 'framer-motion'
import { QrCode } from 'lucide-react'
import { useTranslations } from 'next-intl'

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 translate-y-[2px]" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.3.17.63.24.96.2l13.5-11.93-2.86-2.85L3.18 23.76zM.64 1.28C.24 1.71 0 2.35 0 3.18v17.64c0 .83.24 1.47.64 1.9l.1.1 9.88-9.88v-.23L.74 1.18l-.1.1zM20.77 10.56l-2.8-1.61-3.18 3.05 3.18 3.05 2.82-1.63c.8-.46.8-1.4-.02-1.86zM4.14.24l13.5 11.93-2.86 2.85L4.14.24z" />
    </svg>
  )
}

export function AppDownloadCTA() {
  const t = useTranslations('TaiAppPage.CTA')
  return (
    <section className="pb-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto bg-[var(--color-bg-inverse)] rounded-3xl overflow-hidden relative p-8">
        {/* Decorative blobs */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(156,5,18,0.25)' }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(156,5,18,0.15)' }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
            {/* Left column: text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="inline-block text-xs font-semibold uppercase tracking-widest text-white bg-white/20 px-3 py-2 rounded-lg mb-4">
                {t('callout')}
              </p>
              <h2 className="text-[36px] font-medium text-[var(--color-text-bright)] mb-2">
                {t('title')}
              </h2>
              <p className="text-xl text-white/60">
                {t('subtitle')}
              </p>
            </motion.div>

            {/* Right column: CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col gap-3 w-full"
            >
              {/* 2-col grid: row 1 = App Store + Google Play, row 2 = QR (spans 2). Equal row heights via gridAutoRows. */}
              <div className="grid grid-cols-2 gap-3 w-full" style={{ gridAutoRows: '1fr' }}>
                <button className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm text-white px-4 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <AppleIcon />
                  <div className="text-lg font-bold leading-none">App Store</div>
                </button>
                <button className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm text-white px-4 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <GooglePlayIcon />
                  <div className="text-lg font-bold leading-none">Google Play</div>
                </button>

                {/* TODO: replace QrCode placeholder with a real QR code image */}
                <div className="col-span-2 flex flex-row items-center justify-center gap-4 bg-white/5 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10">
                  <div className="shrink-0">
                    <QrCode className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-white/70 font-medium">{t('scanToDownload')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
