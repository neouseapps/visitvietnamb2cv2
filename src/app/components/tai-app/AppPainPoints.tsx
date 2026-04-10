'use client'

import { SearchX, MessageSquareWarning, Copy, Layers } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function AppPainPoints() {
  const t = useTranslations('TaiAppPage.PainPoints')
  const items = [
    { icon: SearchX },
    { icon: MessageSquareWarning },
    { icon: Copy },
    { icon: Layers },
  ].map((item, i) => ({
    ...item,
    title: t(`items.${i}.title`),
    desc: t(`items.${i}.desc`),
  }))

  return (
    <section className="py-16 bg-[var(--color-bg-dim)]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[var(--color-brand-primary)] tracking-wider uppercase mb-2">
            {t('eyebrow')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-default)] leading-[1.3] mb-4">
            {t('title')}
          </h3>
          <p className="text-[var(--color-text-dim)] text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-4 rounded-[16px] shadow-md w-full text-center">
              <div className="w-10 h-10 flex items-center justify-center text-[var(--color-text-dim)] mb-3 mx-auto">
                <Icon className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-default font-bold text-[var(--color-text-default)] mb-3">{title}</h4>
              <p className="text-[var(--color-text-dim)] leading-relaxed text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
