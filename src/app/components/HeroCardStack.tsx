'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

// ─── Constants ────────────────────────────────────────────────────────────────

const ITEM_COUNT = 3
const TYPE_SPEED = 42      // ms per char — typing
const DELETE_SPEED = 30    // ms per char — deleting
const PAUSE_AFTER_TYPE = 3000  // ms — hold after fully typed
const PAUSE_AFTER_DELETE = 280 // ms — wait before next item
const CURSOR_BLINK = 530   // ms — cursor blink interval

type Phase = 'typing' | 'pausing' | 'deleting' | 'waiting'

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroCardStack() {
  const t = useTranslations('HeroCardStack')

  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [phase, setPhase] = useState<Phase>('typing')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const pausedRef = useRef(paused)
  useEffect(() => { pausedRef.current = paused }, [paused])

  // Cursor blink — independent of typewriter
  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), CURSOR_BLINK)
    return () => clearInterval(id)
  }, [])

  // Typewriter state machine
  useEffect(() => {
    if (paused) return

    const fullText = t(`items.${index}.title`)

    if (phase === 'typing') {
      if (displayText.length < fullText.length) {
        const id = setTimeout(
          () => setDisplayText(fullText.slice(0, displayText.length + 1)),
          TYPE_SPEED,
        )
        return () => clearTimeout(id)
      }
      setPhase('pausing')
      return
    }

    if (phase === 'pausing') {
      const id = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE)
      return () => clearTimeout(id)
    }

    if (phase === 'deleting') {
      if (displayText.length > 0) {
        const id = setTimeout(
          () => setDisplayText(prev => prev.slice(0, -1)),
          DELETE_SPEED,
        )
        return () => clearTimeout(id)
      }
      setPhase('waiting')
      return
    }

    if (phase === 'waiting') {
      const id = setTimeout(() => {
        setIndex(i => (i + 1) % ITEM_COUNT)
        setPhase('typing')
      }, PAUSE_AFTER_DELETE)
      return () => clearTimeout(id)
    }
  }, [phase, displayText, index, paused, t])

  return (
    <>
    <style>{`
      @property --btn-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }
      @keyframes btn-spin {
        to { --btn-angle: 360deg; }
      }
      .btn-gradient-spin {
        --btn-angle: 0deg;
        animation: btn-spin 3s linear infinite;
        background: conic-gradient(from var(--btn-angle), #c084fc, #818cf8, #60a5fa, #c084fc) !important;
      }
      @property --card-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }
      @keyframes card-spin {
        to { --card-angle: 360deg; }
      }
      @keyframes card-shadow-spin {
        0%   { box-shadow: 0 12px 36px rgba(192,132,252,0.55), 0 0 20px rgba(192,132,252,0.25); }
        33%  { box-shadow: 0 12px 36px rgba(129,140,248,0.55), 0 0 20px rgba(129,140,248,0.25); }
        66%  { box-shadow: 0 12px 36px rgba(96,165,250,0.55),  0 0 20px rgba(96,165,250,0.25); }
        100% { box-shadow: 0 12px 36px rgba(192,132,252,0.55), 0 0 20px rgba(192,132,252,0.25); }
      }
      .card-shadow-anim { animation: card-shadow-spin 3s linear infinite; }
      .card-gradient-layer {
        position: absolute; inset: 0; border-radius: 24px;
        animation: card-spin 3s linear infinite;
        background: conic-gradient(from var(--card-angle), #c084fc, #818cf8, #60a5fa, #c084fc);
        transition: opacity 0.35s ease;
      }
    `}</style>
    <Link
      href="/tai-app"
      className="block w-full max-w-[420px] rounded-[24px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2"
      aria-label={t('ariaLabel')}
      onMouseEnter={() => { setPaused(true); setHovered(true) }}
      onMouseLeave={() => { setPaused(false); setHovered(false) }}
    >
      {/* Card inner content — shared between mobile and desktop */}
      {(() => {
        const cardContent = (
          <div
            className="flex flex-col gap-3 px-4 py-4 rounded-[22px]"
            style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', position: 'relative' }}
          >
            {/* ── Row 1: GIF + text ── */}
            <div className="flex flex-row items-center gap-3">
              <div className="relative size-[56px] rounded-full overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/hero-cards/app-download.gif"
                  alt=""
                  aria-hidden
                  className="absolute object-cover w-full h-full"
                  style={{ mixBlendMode: 'multiply' }}
                  draggable={false}
                />
              </div>
              <p
                className="font-default text-left flex-1"
                style={{
                  color: 'var(--color-text-default)',
                  fontSize: 17,
                  fontWeight: 400,
                  lineHeight: '22px',
                  letterSpacing: '-0.3px',
                }}
              >
                {displayText}
                <span aria-hidden style={{ opacity: cursorVisible ? 1 : 0, marginLeft: 1 }}>|</span>
              </p>
            </div>

            {/* ── Row 2: full-width button ── */}
            <div
              className="flex items-center justify-center rounded-full w-full"
              style={{
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '10px 16px',
                boxShadow: hovered
                  ? 'inset 0 1px 0 rgba(255,255,255,0.8), 0px 6px 24px rgba(0,0,0,0.06)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.8), 0px 0px 0px rgba(0,0,0,0)',
                transition: 'box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <span
                className="font-default overflow-hidden text-ellipsis whitespace-nowrap"
                style={{
                  color: 'var(--color-text-default)',
                  fontSize: 13,
                  fontWeight: 500,
                  lineHeight: '20px',
                  letterSpacing: '-0.14px',
                }}
              >
                {t(`items.${index}.cta`)}
              </span>
            </div>
          </div>
        )
        return (
          <>
            {/* Mobile: no hover effects */}
            <div
              className="md:hidden"
              style={{
                borderRadius: 24,
                boxShadow: '0px 8px 16px rgba(0,0,0,0.1), 0px 0px 4px rgba(0,0,0,0.06)',
              }}
            >
              {cardContent}
            </div>
            {/* Desktop: hover effects */}
            <div
              className={`hidden md:block ${hovered ? 'card-shadow-anim' : ''}`}
              style={{
                position: 'relative',
                padding: 2,
                borderRadius: 24,
                transition: 'transform 0.4s ease-out, box-shadow 0.4s ease-out',
                transform: hovered ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
                boxShadow: hovered ? undefined : '0px 8px 16px rgba(0,0,0,0.1), 0px 0px 4px rgba(0,0,0,0.06)',
              }}
            >
              <div className="card-gradient-layer" style={{ opacity: hovered ? 1 : 0 }} />
              {cardContent}
            </div>
          </>
        )
      })()}
    </Link>
    </>
  )
}
