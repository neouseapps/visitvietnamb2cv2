'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/navigation'
import { VsvnLogo } from './VsvnLogo'
import { Button } from '@/app/components/ui/button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ChevronDown } from 'lucide-react'

const NAV_HEIGHT = 72

export const Navbar = ({
  variant = 'dark',
  cta,
}: {
  variant?: 'dark' | 'light'
  cta?: { label: string; onClick: () => void }
}) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sectionOpen, setSectionOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations('Nav')
  const pathname = usePathname()
  const sectionRef = useRef<HTMLDivElement>(null)

  const isLight = variant === 'light'
  const isHome = pathname === '/'

  const navItems = [
    { shortLabel: t('about'), label: t('aboutPlatform'), href: '/about' },
    { shortLabel: t('business'), label: t('forBusiness'), href: '/for-business' },
    { shortLabel: t('governance'), label: t('forGovernance'), href: '/for-governance' },
    { shortLabel: t('newsroom'), label: t('newsroom'), href: '/newsroom' },
  ]

  const activeItem = navItems.find(item => pathname.startsWith(item.href)) ?? null

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!sectionOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
        setSectionOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [sectionOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (isLight) {
    return (
      <>
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--color-border-default)]'
              : 'bg-white/90 backdrop-blur-md'
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center" style={{ height: NAV_HEIGHT }}>

              {/* Logo + tagline */}
              <Link href="/" className="flex flex-col items-start leading-none gap-0.5">
                <VsvnLogo variant="color-light" className="w-24 md:w-32" />
                <span className="text-[10px] font-medium tracking-wide text-[var(--color-text-dim)] opacity-70">
                  {t('tagline')}
                </span>
              </Link>

              {/* Right controls */}
              <div className="flex items-center gap-3">

                {/* Section dropdown — desktop, non-home only */}
                {!isHome && (
                  <div className="relative hidden lg:block" ref={sectionRef}>
                    <button
                      onClick={() => setSectionOpen(!sectionOpen)}
                      aria-expanded={sectionOpen}
                      aria-haspopup="listbox"
                      className="flex items-center gap-1.5 font-medium text-sm text-[var(--color-text-dim)] hover:text-[var(--color-brand-primary)] transition-colors"
                    >
                      {activeItem?.shortLabel ?? t('platform')}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${sectionOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {sectionOpen && (
                      <div
                        role="listbox"
                        aria-label={t('platform')}
                        className="absolute right-0 z-50 py-1 bg-white rounded-xl shadow-xl min-w-[240px] overflow-hidden"
                        style={{ top: 'calc(100% + 8px)' }}
                      >
                        {navItems.map(item => {
                          const isActive = pathname.startsWith(item.href)
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              role="option"
                              aria-selected={isActive}
                              aria-current={isActive ? 'page' : undefined}
                              onClick={() => setSectionOpen(false)}
                              className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--color-bg-dim)] ${
                                isActive
                                  ? 'text-[var(--color-brand-primary)]'
                                  : 'text-[var(--color-text-default)]'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                                  isActive ? 'bg-[var(--color-brand-primary)]' : 'bg-transparent'
                                }`}
                              />
                              {item.label}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}

                <LanguageSwitcher variant="light" />
                {cta && (
                  <Button
                    variant="primary"
                    size="md"
                    className="hidden lg:block"
                    onClick={cta.onClick}
                  >
                    {cta.label}
                  </Button>
                )}
                {/* Hamburger + dropdown — right-anchored together */}
                <div className={`${isHome ? '' : 'lg:hidden'} relative`}>
                  <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Menu"
                    aria-expanded={mobileOpen}
                    className="flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-[var(--color-bg-dim)] transition-colors gap-1.5"
                  >
                    <span className={`block w-5 h-0.5 bg-[var(--color-text-default)] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-[var(--color-text-default)] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-[var(--color-text-default)] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                  </button>

                  {/* Desktop dropdown (lg+) */}
                  <div
                    className={`hidden lg:block absolute right-0 z-[60] w-72 bg-white rounded-2xl shadow-2xl transition-all duration-200 ease-out ${
                      mobileOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                    style={{ top: `calc(100% + ${(NAV_HEIGHT - 40) / 2 + 8}px)` }}
                  >
                    <div className="py-2">
                      {navItems.map(item => {
                        const isActive = pathname.startsWith(item.href)
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive ? 'page' : undefined}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 transition-colors font-medium hover:bg-[var(--color-bg-dim)] ${
                              isActive ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-text-default)]'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-[var(--color-brand-primary)]' : 'bg-transparent'}`} />
                            {item.label}
                          </Link>
                        )
                      })}
                      {cta && (
                        <>
                          <div className="mx-4 my-2 border-t border-[var(--color-border-default)]" />
                          <div className="px-3 pb-2">
                            <Button variant="primary" size="md" className="w-full" onClick={() => { cta.onClick(); setMobileOpen(false) }}>
                              {cta.label}
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile full-screen overlay (< lg) */}
        <div
          className={`lg:hidden fixed inset-x-0 bottom-0 z-[60] bg-white flex flex-col overflow-y-auto transition-all duration-300 ease-out ${
            mobileOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-3 pointer-events-none'
          }`}
          style={{ top: NAV_HEIGHT }}
        >
          <div className="p-6 flex flex-col gap-1 flex-1">
            {navItems.map(item => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl transition-colors font-medium hover:bg-[var(--color-bg-dim)] ${
                    isActive ? 'text-[var(--color-brand-primary)]' : 'text-[var(--color-text-default)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
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

  // ─── Dark variant ────────────────────────────────────────────────────────────

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-bg-inverse)] shadow-md'
            : '[background:var(--Navigation-VSVN-Background)]'
        }`}
        style={{ height: NAV_HEIGHT }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 text-white h-full">
          <div className="flex justify-between items-center h-full">

            {/* Logo + tagline */}
            <Link href="/" className="flex flex-col items-start leading-none gap-0.5">
              <VsvnLogo variant="color-dark" className="w-24 md:w-32" />
              <span className="text-[10px] font-medium tracking-wide text-white opacity-60">
                {t('tagline')}
              </span>
            </Link>

            {/* Right controls */}
            <div className="flex items-center gap-3">

              {/* Section dropdown — desktop, non-home only */}
              {!isHome && (
                <div className="relative hidden lg:block" ref={sectionRef}>
                  <button
                    onClick={() => setSectionOpen(!sectionOpen)}
                    aria-expanded={sectionOpen}
                    aria-haspopup="listbox"
                    className="flex items-center gap-1.5 font-medium text-sm text-white/80 hover:text-[var(--color-brand-primary)] transition-colors"
                  >
                    {activeItem?.shortLabel ?? t('platform')}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${sectionOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {sectionOpen && (
                    <div
                      role="listbox"
                      aria-label={t('platform')}
                      className="absolute right-0 z-50 py-1 bg-white rounded-xl shadow-xl min-w-[240px] overflow-hidden"
                      style={{ top: 'calc(100% + 8px)' }}
                    >
                      {navItems.map(item => {
                        const isActive = pathname.startsWith(item.href)
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="option"
                            aria-selected={isActive}
                            aria-current={isActive ? 'page' : undefined}
                            onClick={() => setSectionOpen(false)}
                            className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--color-bg-dim)] ${
                              isActive
                                ? 'text-[var(--color-brand-primary)]'
                                : 'text-[var(--color-text-default)]'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                                isActive ? 'bg-[var(--color-brand-primary)]' : 'bg-transparent'
                              }`}
                            />
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              <LanguageSwitcher variant="dark" />
              {cta && (
                <Button
                  variant="primary"
                  size="md"
                  className="hidden lg:block"
                  onClick={cta.onClick}
                >
                  {cta.label}
                </Button>
              )}
              {/* Hamburger + dropdown — right-anchored together */}
              <div className={`${isHome ? '' : 'lg:hidden'} relative`}>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Menu"
                  aria-expanded={mobileOpen}
                  className="flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors gap-1.5"
                >
                  <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>

                {/* Desktop dropdown (lg+) */}
                <div
                  className={`hidden lg:block absolute right-0 z-[60] w-72 bg-[var(--color-bg-inverse)] rounded-2xl shadow-2xl transition-all duration-200 ease-out ${
                    mobileOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                  style={{ top: `calc(100% + ${(NAV_HEIGHT - 40) / 2 + 8}px)` }}
                >
                  <div className="py-2">
                    {navItems.map(item => {
                      const isActive = pathname.startsWith(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 transition-colors font-medium hover:bg-white/10 ${
                            isActive ? 'text-[var(--color-brand-primary)]' : 'text-white'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-[var(--color-brand-primary)]' : 'bg-white/30'}`} />
                          {item.label}
                        </Link>
                      )
                    })}
                    {cta && (
                      <>
                        <div className="mx-4 my-2 border-t border-white/10" />
                        <div className="px-3 pb-2">
                          <Button variant="primary" size="md" className="w-full" onClick={() => { cta.onClick(); setMobileOpen(false) }}>
                            {cta.label}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay (< lg) */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-[60] bg-[var(--color-bg-inverse)] flex flex-col overflow-y-auto transition-all duration-300 ease-out ${
          mobileOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
        style={{ top: NAV_HEIGHT }}
      >
        <div className="p-6 flex flex-col gap-1 flex-1">
          {navItems.map(item => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl transition-colors font-medium hover:bg-white/10 ${
                  isActive ? 'text-[var(--color-brand-primary)]' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="mt-auto pt-3 flex flex-col gap-3">
            <LanguageSwitcher variant="dark" className="" fullWidth />
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
