'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { VsvnLogo } from './VsvnLogo'
import { Button } from '@/app/components/ui/button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ChevronDown } from 'lucide-react'

// ─── Platform dropdown items ──────────────────────────────────────────────────

function PlatformDropdown({
  t,
  variant,
  onNavigate,
}: {
  t: ReturnType<typeof useTranslations<'Nav'>>
  variant: 'light' | 'dark'
  onNavigate?: () => void
}) {
  const items = [
    { label: t('aboutPlatform'), href: '/about' },
    { label: t('forBusiness'), href: '/for-business' },
    { label: t('forGovernance'), href: '/for-governance' },
  ]

  return (
    <div className="flex flex-col py-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export const Navbar = ({ variant = 'dark', cta }: { variant?: 'dark' | 'light'; cta?: { label: string; onClick: () => void } }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [platformMobileOpen, setPlatformMobileOpen] = useState(false)
  const [platformDesktopOpen, setPlatformDesktopOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('Nav')
  const platformDesktopRef = useRef<HTMLDivElement>(null)

  const isLight = variant === 'light'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (platformDesktopRef.current && !platformDesktopRef.current.contains(e.target as Node)) {
        setPlatformDesktopOpen(false)
      }
    }
    if (platformDesktopOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [platformDesktopOpen])

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
          <div className="flex justify-between items-center h-[60px]">

            {/* Logo + tagline */}
            <Link href="/" className="flex flex-col items-start leading-none gap-0.5">
              <VsvnLogo variant="color-light" className="w-32" />
              <span className="text-[10px] font-medium tracking-wide text-[var(--color-text-dim)] opacity-70">
                {t('tagline')}
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8 font-medium text-sm">

              {/* Platform dropdown — click-based */}
              <div className="relative" ref={platformDesktopRef}>
                <button
                  onClick={() => setPlatformDesktopOpen(!platformDesktopOpen)}
                  className={`flex items-center gap-1 hover:text-[var(--color-brand-primary)] transition-colors ${inactiveColor}`}
                >
                  {t('platform')}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${platformDesktopOpen ? 'rotate-180' : ''}`} />
                </button>
                {platformDesktopOpen && (
                  <div className="absolute z-50" style={{ top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className="bg-white rounded-xl shadow-xl min-w-[220px] overflow-hidden">
                      <PlatformDropdown t={t} variant="light" onNavigate={() => setPlatformDesktopOpen(false)} />
                    </div>
                  </div>
                )}
              </div>

              <Link href="/newsroom" className={linkClass()}>{t('newsroom')}</Link>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher variant="light" />
              {cta && (
                <Button variant="primary" size="md" className="hidden lg:block" onClick={cta.onClick}>
                  {cta.label}
                </Button>
              )}
              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-[var(--color-bg-dim)] transition-colors gap-1.5"
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

      {/* Mobile menu — slide-down overlay */}
      <div className={`lg:hidden fixed top-[60px] inset-x-0 bottom-0 z-[60] bg-white flex flex-col overflow-y-auto transition-all duration-300 ease-out ${
        mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}>
        <div className="p-6 flex flex-col gap-1 flex-1">

          {/* Platform accordion */}
          <div>
            <button
              onClick={() => setPlatformMobileOpen(!platformMobileOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[var(--color-text-default)] hover:bg-[var(--color-bg-dim)] transition-colors font-medium"
            >
              {t('platform')}
              <ChevronDown size={16} className={`transition-transform duration-200 ${platformMobileOpen ? 'rotate-180' : ''}`} />
            </button>
            {platformMobileOpen && (
              <div className="ml-4 flex flex-col gap-0.5 mt-0.5">
                <Link href="/about" className="px-4 py-2.5 rounded-xl text-[var(--color-text-dim)] hover:bg-[var(--color-bg-dim)] transition-colors text-sm font-medium" onClick={() => setMobileOpen(false)}>{t('aboutPlatform')}</Link>
                <Link href="/for-business" className="px-4 py-2.5 rounded-xl text-[var(--color-text-dim)] hover:bg-[var(--color-bg-dim)] transition-colors text-sm font-medium" onClick={() => setMobileOpen(false)}>{t('forBusiness')}</Link>
                <Link href="/for-governance" className="px-4 py-2.5 rounded-xl text-[var(--color-text-dim)] hover:bg-[var(--color-bg-dim)] transition-colors text-sm font-medium" onClick={() => setMobileOpen(false)}>{t('forGovernance')}</Link>
              </div>
            )}
          </div>

          <Link href="/newsroom" className="px-4 py-3 rounded-xl text-[var(--color-text-default)] hover:bg-[var(--color-bg-dim)] transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('newsroom')}</Link>

          <div className="mt-auto pt-3 flex flex-col gap-3">
            <LanguageSwitcher variant="light" className="" fullWidth />
            {cta && (
              <Button variant="primary" size="md" className="w-full" onClick={() => { cta.onClick(); setMobileOpen(false) }}>
                {cta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
      </>
    )
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full h-[60px] transition-all duration-300 ${
      scrolled
        ? 'bg-[var(--color-bg-inverse)] shadow-md'
        : '[background:var(--Navigation-VSVN-Background)]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 text-white h-full">
        <div className="flex justify-between items-center h-full">

          {/* Logo + tagline */}
          <Link href="/" className="flex flex-col items-start leading-none gap-0.5">
            <VsvnLogo variant="color-dark" className="w-32" />
            <span className="text-[10px] font-medium tracking-wide text-white opacity-60">
              {t('tagline')}
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-8 font-medium text-sm">

            {/* Platform dropdown — click-based */}
            <div className="relative" ref={platformDesktopRef}>
              <button
                onClick={() => setPlatformDesktopOpen(!platformDesktopOpen)}
                className="flex items-center gap-1 hover:text-[var(--color-brand-primary)] transition-colors"
              >
                {t('platform')}
                <ChevronDown size={14} className={`transition-transform duration-200 ${platformDesktopOpen ? 'rotate-180' : ''}`} />
              </button>
              {platformDesktopOpen && (
                <div className="absolute z-50" style={{ top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }}>
                  <div className="bg-white rounded-xl shadow-xl min-w-[220px] overflow-hidden">
                    <PlatformDropdown t={t} variant="light" onNavigate={() => setPlatformDesktopOpen(false)} />
                  </div>
                </div>
              )}
            </div>

            <Link href="/newsroom" className={linkClass()}>{t('newsroom')}</Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="dark" />
            {/* Hamburger (mobile & tablet) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors gap-1.5"
              aria-label="Menu"
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile menu — slide-down overlay */}
        <div className={`lg:hidden fixed top-[60px] inset-x-0 bottom-0 z-[60] bg-[var(--color-bg-inverse)] flex flex-col overflow-y-auto transition-all duration-300 ease-out ${
          mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}>
          <div className="p-6 flex flex-col gap-1 flex-1">

            {/* Platform accordion */}
            <div>
              <button
                onClick={() => setPlatformMobileOpen(!platformMobileOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition-colors font-medium"
              >
                {t('platform')}
                <ChevronDown size={16} className={`transition-transform duration-200 ${platformMobileOpen ? 'rotate-180' : ''}`} />
              </button>
              {platformMobileOpen && (
                <div className="ml-4 flex flex-col gap-0.5 mt-0.5">
                  <Link href="/about" className="px-4 py-2.5 rounded-xl text-white/70 hover:bg-white/10 transition-colors text-sm font-medium" onClick={() => setMobileOpen(false)}>{t('aboutPlatform')}</Link>
                  <Link href="/for-business" className="px-4 py-2.5 rounded-xl text-white/70 hover:bg-white/10 transition-colors text-sm font-medium" onClick={() => setMobileOpen(false)}>{t('forBusiness')}</Link>
                  <Link href="/for-governance" className="px-4 py-2.5 rounded-xl text-white/70 hover:bg-white/10 transition-colors text-sm font-medium" onClick={() => setMobileOpen(false)}>{t('forGovernance')}</Link>
                </div>
              )}
            </div>

            <Link href="/newsroom" className="px-4 py-3 rounded-xl hover:bg-white/10 transition-colors font-medium" onClick={() => setMobileOpen(false)}>{t('newsroom')}</Link>

            <div className="mt-2 pt-3 flex flex-col gap-3">
              <LanguageSwitcher variant="dark" className="" fullWidth />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
