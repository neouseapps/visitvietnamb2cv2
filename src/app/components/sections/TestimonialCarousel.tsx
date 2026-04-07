'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const GAP = 24 // px — matches gap-6

// ─── Star icon ────────────────────────────────────────────────────────────────

function StarIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
        fill="var(--color-bg-warning-default)"
        stroke="var(--color-bg-warning-default)"
        strokeWidth="0"
      />
    </svg>
  )
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

export function TestimonialCarousel() {
  const t = useTranslations('TaiAppPage.Testimonials')
  const TESTIMONIALS = (t.raw('items') as Array<{ content: string }>).map(
    (item, i) => ({ id: i + 1, rating: 5, content: item.content })
  )
  const EXTENDED = [...TESTIMONIALS, ...TESTIMONIALS]

  const containerRef = useRef<HTMLDivElement>(null)
  const [cardWidth, setCardWidth] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [paused, setPaused] = useState(false)

  // Measure container and compute card width
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      const count = w >= 768 ? 3 : 1
      setVisibleCount(count)
      setCardWidth((w - GAP * (count - 1)) / count)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const advance = useCallback(() => {
    if (isAnimating) return
    setCurrentIndex((prev) => prev + 1)
    setIsAnimating(true)
  }, [isAnimating])

  // Auto-advance every 5s
  useEffect(() => {
    if (paused || cardWidth === 0) return
    const t = setInterval(advance, 5000)
    return () => clearInterval(t)
  }, [advance, paused, cardWidth])

  // x position of the track
  const x = cardWidth > 0 ? -(currentIndex * (cardWidth + GAP)) : 0

  // After animation completes: if we've reached the cloned half, instantly jump back
  const handleAnimationComplete = () => {
    setIsAnimating(false)
    if (currentIndex >= TESTIMONIALS.length) {
      setCurrentIndex(0)
    }
  }

  return (
    <div className="overflow-hidden -mx-4">
    <div
      ref={containerRef}
      className="px-4 py-4 -my-4"
      aria-label="Đánh giá từ người dùng"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex"
        style={{ gap: GAP }}
        animate={{ x }}
        transition={
          currentIndex >= TESTIMONIALS.length
            ? { duration: 0 } // instant reset
            : { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
        }
        onAnimationComplete={handleAnimationComplete}
        aria-live="polite"
      >
        {EXTENDED.map((item, i) => (
          <article
            key={`${item.id}-${i}`}
            className="flex-shrink-0 bg-white rounded-2xl shadow-md p-8 flex flex-col gap-4"
            style={{ width: cardWidth > 0 ? cardWidth : undefined }}
            aria-label={`Đánh giá ${(i % TESTIMONIALS.length) + 1} trong ${TESTIMONIALS.length}`}
          >
            {/* Stars */}
            <div className="flex gap-1" aria-label={`${item.rating} sao`}>
              {Array.from({ length: item.rating }).map((_, si) => (
                <StarIcon key={si} />
              ))}
            </div>
            {/* Quote */}
            <p
              className="leading-relaxed"
              style={{ color: 'var(--color-text-default)', fontSize: 16, lineHeight: '26px' }}
            >
              &ldquo;{item.content}&rdquo;
            </p>
          </article>
        ))}
      </motion.div>
    </div>
    </div>
  )
}
