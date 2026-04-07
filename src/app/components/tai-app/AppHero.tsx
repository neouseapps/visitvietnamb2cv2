'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { QrCode, MessageSquare, MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.3.17.63.24.96.2l13.5-11.93-2.86-2.85L3.18 23.76zM.64 1.28C.24 1.71 0 2.35 0 3.18v17.64c0 .83.24 1.47.64 1.9l.1.1 9.88-9.88v-.23L.74 1.18l-.1.1zM20.77 10.56l-2.8-1.61-3.18 3.05 3.18 3.05 2.82-1.63c.8-.46.8-1.4-.02-1.86zM4.14.24l13.5 11.93-2.86 2.85L4.14.24z" />
    </svg>
  )
}

export function AppHero() {
  const t = useTranslations('TaiAppPage.Hero')
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[var(--color-bg-dim)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-default)] mb-6 leading-tight">
              {t('titleMain')}{' '}
              <br className="hidden lg:block" />
              <span className="text-[var(--color-text-success-default)]">{t('titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-dim)] mb-10 max-w-2xl mx-auto lg:mx-0">
              {t('subtitle')}
            </p>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <button className="flex items-center justify-center gap-3 bg-[var(--color-bg-inverse)] text-[var(--color-text-bright)] px-6 py-3.5 rounded-xl hover:bg-[var(--color-bg-inverse-hover)] transition-colors w-full sm:w-auto">
                <AppleIcon />
                <div className="text-left">
                  <div className="text-[10px] leading-none mb-1 opacity-70">{t('downloadOnAppStore')}</div>
                  <div className="text-sm font-semibold leading-none">App Store</div>
                </div>
              </button>
              <button className="flex items-center justify-center gap-3 bg-[var(--color-bg-success-default)] text-[var(--color-text-bright)] px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto">
                <GooglePlayIcon />
                <div className="text-left">
                  <div className="text-[10px] leading-none mb-1 opacity-70">{t('downloadOnGooglePlay')}</div>
                  <div className="text-sm font-semibold leading-none">Google Play</div>
                </div>
              </button>
            </div>

            {/* QR hint */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-[var(--color-text-dim)]">
              <div className="p-2 bg-[var(--color-bg-default)] rounded-lg shadow-sm border border-[var(--color-bg-dim)]">
                <QrCode className="w-12 h-12 text-[var(--color-text-default)]" />
              </div>
              <div>
                <p className="font-medium text-[var(--color-text-default)]">{t('scanToDownload')}</p>
                <p>iOS & Android</p>
              </div>
            </div>
          </motion.div>

          {/* Right — phone mockups */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[var(--color-bg-success-subtle)] rounded-full blur-3xl -z-10" />

            <div className="relative flex justify-center items-center">
              {/* Main phone mockup */}
              {/* TODO: replace with production app screenshots */}
              <div className="relative z-20 w-64 h-[520px] bg-[var(--color-bg-inverse)] rounded-[2.5rem] border-[8px] border-[var(--color-bg-inverse)] shadow-2xl overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 flex justify-center z-30">
                  <div className="w-32 h-6 bg-[var(--color-bg-inverse)] rounded-b-3xl" />
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=800&auto=format&fit=crop"
                  alt="Vịnh Hạ Long — màn hình khám phá điểm đến"
                  width={256}
                  height={192}
                  sizes="256px"
                  className="w-full h-48 object-cover"
                  priority
                />
                <div className="flex-1 bg-[var(--color-bg-default)] p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[var(--color-bg-success-subtle)] flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-[var(--color-text-success-default)]" />
                    </div>
                    <div className="bg-[var(--color-bg-dim)] rounded-2xl rounded-tl-none p-3 text-sm text-[var(--color-text-default)]">
                      {t('aiMessage')}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-[var(--color-bg-default)] border border-[var(--color-bg-dim)] shadow-sm rounded-xl p-3 flex gap-3 items-center">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=200&auto=format&fit=crop"
                          alt="Phố cổ Hội An"
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[var(--color-text-default)]">Phố cổ Hội An</h4>
                        <p className="text-xs text-[var(--color-text-dim)]">Ngày 1 • 14:00</p>
                      </div>
                    </div>
                    <div className="bg-[var(--color-bg-default)] border border-[var(--color-bg-dim)] shadow-sm rounded-xl p-3 flex gap-3 items-center">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1531737212413-667205e1cda7?q=80&w=200&auto=format&fit=crop"
                          alt="Bà Nà Hills"
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-[var(--color-text-default)]">Bà Nà Hills</h4>
                        <p className="text-xs text-[var(--color-text-dim)]">Ngày 2 • 09:00</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-[var(--color-bg-success-default)] text-[var(--color-text-bright)] rounded-lg py-2 text-sm font-medium">
                    {t('viewItinerary')}
                  </button>
                </div>
              </div>

              {/* Secondary phone (background depth) */}
              {/* TODO: replace with production app screenshots */}
              <div className="absolute z-10 w-56 h-[460px] bg-[var(--color-bg-inverse-hover)] rounded-[2rem] border-[6px] border-[var(--color-bg-inverse-hover)] shadow-xl overflow-hidden -right-4 lg:-right-12 top-10 rotate-6 opacity-80 hidden sm:block">
                <Image
                  src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600&auto=format&fit=crop"
                  alt="Bản đồ Việt Nam — màn hình điều hướng"
                  fill
                  sizes="224px"
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-inverse)]/80 to-transparent flex flex-col justify-end p-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                    <div className="flex items-center gap-2 text-[var(--color-text-bright)] mb-1">
                      <MapPin className="w-4 h-4 text-[var(--color-text-success-default)]" />
                      <span className="font-medium text-sm">{t('navigatingTo')}</span>
                    </div>
                    <div className="text-[var(--color-text-bright)] font-semibold">Chợ Bến Thành</div>
                    <div className="text-[var(--color-text-success-default)] text-xs mt-1">{t('walkingDistance')}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
