'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { VsvnLogo } from './VsvnLogo'
import { Button } from '@/app/components/ui/button'
import { LanguageSwitcher } from './LanguageSwitcher'

export const Navbar = ({ variant = 'dark', cta }: { variant?: 'dark' | 'light'; cta?: { label: string; onClick: () => void } }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('Nav')

  const isLight = variant === 'light'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const inactiveColor = isLight ? 'text-[var(--color-text-dim)]' : ''
  const linkClass = () => `hover:text-[var(--color-brand-primary)] transition-colors ${inactiveColor}`

  if (isLight) {
    return (
      <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-[var(--color-border-default)]'
            : 'bg-white/90 backdrop-blur-md border-[var(--color-border-default)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <VsvnLogo variant="color-light" className="w-32" />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
              <Link href="/" className={linkClass()}>{t('home')}</Link>
              <Link href="/for-business" className={linkClass()}>{t('business')}</Link>
              <Link href="/for-governance" className={linkClass()}>{t('governance')}</Link>
              <Link href="/newsroom" className={linkClass()}>{t('newsroom')}</Link>
              <Link href="/about" className={linkClass()}>{t('about')}</Link>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher variant="light" />
              {cta ? (
                <Button variant="primary" size="md" className="hidden lg:block" onClick={cta.onClick}>
                  {cta.label}
                </Button>
              ) : (
                <Button asChild variant="primary" size="md" className="hidden lg:block">
                  <Link href="/tai-app">{t('downloadApp')}</Link>
                </Button>
              )}
              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-[var(--color-bg-dim)] hover:bg-[var(--color-border-default)] transition-colors gap-1.5"
                aria-label="Menu"
              >
                <span className={`block w-5 h-0.5 bg-[var(--color-text-default)] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-5 h-0.5 bg-[var(--color-text-default)] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-0.5 bg-[var(--color-text-default)] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile menu — full-screen overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-white flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border-default)]">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <VsvnLogo variant="color-light" className="w-32" />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-bg-dim)] hover:bg-[var(--color-border-default)] transition-colors"
              aria-label={t('closeMenu')}
            >
              <svg className="w-5 h-5 text-[var(--color-text-default)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 flex flex-col gap-1 flex-1">
            <Link href="/" className="px-4 py-3 rounded-xl text-[var(--color-text-default)] hover:bg-[var(--color-bg-dim)] transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('home')}</Link>
            <Link href="/for-business" className="px-4 py-3 rounded-xl text-[var(--color-text-default)] hover:bg-[var(--color-bg-dim)] transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('business')}</Link>
            <Link href="/for-governance" className="px-4 py-3 rounded-xl text-[var(--color-text-default)] hover:bg-[var(--color-bg-dim)] transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('governance')}</Link>
            <Link href="/newsroom" className="px-4 py-3 rounded-xl text-[var(--color-text-default)] hover:bg-[var(--color-bg-dim)] transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('newsroom')}</Link>
            <Link href="/about" className="px-4 py-3 rounded-xl text-[var(--color-text-default)] hover:bg-[var(--color-bg-dim)] transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('about')}</Link>
            <div className="mt-2 pt-3 border-t border-[var(--color-border-default)] flex flex-col gap-3">
              <LanguageSwitcher variant="light" className="" fullWidth />
              {cta ? (
                <Button variant="primary" size="md" className="w-full" onClick={() => { cta.onClick(); setMobileOpen(false) }}>
                  {cta.label}
                </Button>
              ) : (
                <Button asChild variant="primary" size="md" className="w-full" onClick={() => setMobileOpen(false)}>
                  <Link href="/tai-app">{t('downloadApp')}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      </>
    )
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full h-[72px] transition-all duration-300 ${
      scrolled
        ? 'bg-[var(--color-bg-inverse)] shadow-md'
        : '[background:var(--Navigation-VSVN-Background)]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 text-white h-full">
        <div className="flex justify-between items-center h-full">
          <Link href="/">
            <VsvnLogo variant="color-dark" className="w-32" />
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
            <Link href="/" className={linkClass()}>{t('home')}</Link>
            <Link href="/for-business" className={linkClass()}>{t('business')}</Link>
            <Link href="/for-governance" className={linkClass()}>{t('governance')}</Link>
            <Link href="/newsroom" className={linkClass()}>{t('newsroom')}</Link>
            <Link href="/about" className={linkClass()}>{t('about')}</Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="dark" />
            <Button asChild variant="tertiary" size="md" className="hidden lg:block">
              <Link href="/tai-app">{t('downloadAppDark')}</Link>
            </Button>
            {/* Hamburger (mobile & tablet) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors gap-1.5"
              aria-label="Menu"
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] bg-[var(--color-bg-inverse)] flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <VsvnLogo variant="color-dark" className="w-32" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={t('closeMenu')}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-1 flex-1">
              <Link href="/" className="px-4 py-3 rounded-xl hover:bg-white/10 transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('home')}</Link>
              <Link href="/for-business" className="px-4 py-3 rounded-xl hover:bg-white/10 transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('business')}</Link>
              <Link href="/for-governance" className="px-4 py-3 rounded-xl hover:bg-white/10 transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('governance')}</Link>
              <Link href="/newsroom" className="px-4 py-3 rounded-xl hover:bg-white/10 transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('newsroom')}</Link>
              <Link href="/about" className="px-4 py-3 rounded-xl hover:bg-white/10 transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('about')}</Link>
              <div className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-3">
                <LanguageSwitcher variant="dark" className="" fullWidth />
                <Button asChild variant="tertiary" size="md" className="w-full" onClick={() => setMobileOpen(false)}>
                  <Link href="/tai-app">{t('downloadAppDark')}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
