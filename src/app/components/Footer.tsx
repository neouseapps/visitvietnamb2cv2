'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { VsvnLogo } from './VsvnLogo'

export const Footer = () => {
  const t = useTranslations('Footer')

  const columns = [
    {
      title: t('columns.about.title'),
      links: [
        { label: t('columns.about.business'), href: '/for-business' },
        { label: t('columns.about.government'), href: '/for-governance' },
        { label: t('columns.about.newsroom'), href: '/newsroom' },
        { label: t('columns.about.about'), href: '/about' },
      ],
    },
    {
      title: t('columns.support.title'),
      links: [
        { label: 'partner@visitvietnam.asia', href: 'mailto:partner@visitvietnam.asia' },
        { label: 'support01@visitvietnam.asia', href: 'mailto:support01@visitvietnam.asia' },
        { label: 'info@visitvietnam.asia', href: 'mailto:info@visitvietnam.asia' },
        { label: t('columns.support.hotline'), href: '#' },
      ],
    },
  ]

  return (
    <footer
      id="download"
      className="pt-12 pb-12 overflow-hidden relative"
      style={{ background: 'linear-gradient(180deg, var(--color-alpha-black-20) 0%, var(--color-alpha-black-80) 100%), var(--color-bg-brand-primary-dim)' }}
    >
      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 mb-12 border-b border-white/10 pb-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-6">
              <VsvnLogo variant="all-white" className="w-32" />
            </div>
            <p className="text-sm text-white leading-relaxed mb-6">
              {t('tagline')}
            </p>
          </div>

          {columns.map((col, colIdx) => (
            <div key={col.title} className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="H5 text-white mb-6">{col.title}</h4>
              <ul className="space-y-3 text-sm text-white">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="hover:text-[var(--color-brand-primary)] transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              {colIdx === columns.length - 1 && (
                <a
                  href="https://www.facebook.com/profile.php?id=61588553014595"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 text-white hover:text-[var(--color-brand-primary)] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white text-center md:text-left">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
