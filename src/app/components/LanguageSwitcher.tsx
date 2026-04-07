'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/navigation'
import { useState } from 'react'

export function LanguageSwitcher({ variant = 'dark', className, fullWidth }: { variant?: 'dark' | 'light', className?: string, fullWidth?: boolean }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('Nav')
  const [open, setOpen] = useState(false)

  const switchTo = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
    setOpen(false)
  }

  const isLight = variant === 'light'

  return (
    <div className={`relative ${className ?? 'hidden lg:block'}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors text-sm font-medium ${fullWidth ? 'w-full justify-between' : ''} ${
          isLight
            ? 'border border-[var(--color-border-default)] hover:bg-[var(--color-bg-dim)] text-[var(--color-text-default)]'
            : 'border border-white/20 hover:bg-white/10 text-white'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {locale === 'vi' ? t('langVN') : t('langEN')}
        <svg className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl py-1 min-w-[160px] z-10">
          <button
            onClick={() => switchTo('vi')}
            className={`w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium ${locale === 'vi' ? 'text-[var(--color-brand-primary)]' : ''}`}
          >
            {t('langVN')}
          </button>
          <button
            onClick={() => switchTo('en')}
            className={`w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium ${locale === 'en' ? 'text-[var(--color-brand-primary)]' : ''}`}
          >
            {t('langEN')}
          </button>
        </div>
      )}
    </div>
  )
}
