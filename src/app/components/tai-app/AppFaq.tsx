'use client'

import { useState, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function AppFaq() {
  const t = useTranslations('TaiAppPage.FAQ')
  const faqs = [0, 1, 2, 3, 4].map(i => ({
    q: t(`items.${i}.q`),
    a: t(`items.${i}.a`),
  }))
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const toggleFaq = useCallback(
    (idx: number) => setOpenFaq((prev) => (prev === idx ? null : idx)),
    [],
  )

  return (
    <section className="py-16 bg-[var(--color-bg-default)]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase text-center mb-2">
            {t('callout')}
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] text-center mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[var(--color-text-dim)] text-center mb-10">
            {t('subtitle')}
          </p>

          <div>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={idx < faqs.length - 1 ? 'border-b border-[var(--color-border-default)]' : ''}
              >
                <button
                  className="w-full py-4 flex justify-between items-center text-left gap-4"
                  onClick={() => toggleFaq(idx)}
                >
                  <span className="font-medium text-base text-[var(--color-text-default)]">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-text-dim-variant)] shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === idx ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[var(--color-text-dim)] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
