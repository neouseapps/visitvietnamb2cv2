'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

type FloatingAppBubbleProps = {
  callout: string
  title: string
  date: string
  dismiss: string
}

const STORAGE_KEY = 'app-bubble-dismissed'

export function FloatingAppBubble({ callout, title, date, dismiss }: FloatingAppBubbleProps) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="fixed bottom-6 right-6 z-40 w-[240px] bg-[var(--color-bg-inverse)] rounded-3xl shadow-2xl overflow-hidden cursor-default relative"
        >
          {/* Decorative blobs — mirrors AppDownloadCTA */}
          <div
            className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(156, 5, 18, 0.35)' }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(156, 5, 18, 0.2)' }}
            aria-hidden="true"
          />

          {/* Content sits above blobs */}
          <div className="relative z-10">
            {/* TOP ROW — always visible */}
            <div className="flex items-center gap-2 px-4 py-3">
              {/* Callout */}
              <span className="flex-1 text-[var(--color-brand-secondary)] text-[10px] font-semibold uppercase tracking-widest leading-none">
                {callout}
              </span>

              {/* Date badge */}
              <span className="flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-brand-primary)] text-white leading-none">
                {date}
              </span>
            </div>

            {/* EXPANDED CONTENT — hover only */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="relative px-4 pb-4 flex flex-col gap-3">
                    {/* Close button */}
                    <button
                      onClick={handleDismiss}
                      aria-label={dismiss}
                      className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-white/30 hover:text-white/80 transition-colors"
                    >
                      <X size={12} />
                    </button>

                    {/* Title */}
                    <p className="text-white font-semibold text-sm leading-snug pr-6">{title}</p>

                    {/* Download badges */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                      <a href="#" className="flex justify-center hover:opacity-75 transition-opacity">
                        <Image
                          src="/images/app-store-badge.png"
                          alt="Download on the App Store"
                          width={160}
                          height={48}
                          className="h-10 w-auto"
                        />
                      </a>
                      <a href="#" className="flex justify-center hover:opacity-75 transition-opacity">
                        <Image
                          src="/images/google-play-badge.png"
                          alt="Get it on Google Play"
                          width={160}
                          height={48}
                          className="h-10 w-auto"
                        />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
