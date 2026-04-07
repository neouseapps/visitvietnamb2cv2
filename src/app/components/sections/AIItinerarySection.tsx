'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Bell, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'

// ─── SubmitButton ─────────────────────────────────────────────────────────────

function SubmitButton({ label }: { label: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      type="submit"
      aria-label={label}
      className="bg-bg-warning-default hover:bg-orange-600 text-white rounded-full h-11 flex items-center justify-center gap-2 px-3 flex-shrink-0 overflow-hidden transition-colors"
      animate={{ width: isHovered ? 'auto' : '2.75rem' }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <ArrowRight className="w-5 h-5 flex-shrink-0" />
      <AnimatePresence>
        {isHovered && (
          <motion.span
            key="label"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap text-sm font-semibold pr-2"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// ─── ChipCarousel ─────────────────────────────────────────────────────────────

interface ChipCarouselProps {
  chips: string[]
  selectedOption: string
  onSelect: (chip: string) => void
}

function ChipCarousel({ chips, selectedOption, onSelect }: ChipCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true })

  return (
    <div ref={emblaRef} className="overflow-hidden w-full">
      <div className="flex gap-2">
        {chips.map((chip) => {
          const isSelected = chip === selectedOption
          return (
            <button
              key={chip}
              type="button"
              onClick={() => onSelect(chip)}
              className={[
                'whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors flex-shrink-0',
                isSelected
                  ? 'bg-bg-warning-default text-white border border-bg-warning-default'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white',
              ].join(' ')}
            >
              {chip}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── AIInputPill ──────────────────────────────────────────────────────────────

interface AIInputPillProps {
  selectedOption: string
  onChipSelect: (chip: string) => void
  submitLabel: string
  chips: string[]
}

function AIInputPill({ selectedOption, onChipSelect, submitLabel, chips }: AIInputPillProps) {
  return (
    <div className="rounded-card bg-bg-inverse-hover border border-white/10 w-full">
      {/* Selected option display row */}
      <div className="flex items-center gap-3 px-6 py-4">
        <p className="flex-1 text-white text-base min-w-0 truncate">{selectedOption}</p>
        <SubmitButton label={submitLabel} />
      </div>

      {/* Thin separator */}
      <div className="border-t border-white/10 mx-6" />

      {/* Chip carousel */}
      <div className="px-4 py-3">
        <ChipCarousel chips={chips} selectedOption={selectedOption} onSelect={onChipSelect} />
      </div>
    </div>
  )
}

// ─── AIItinerarySection (main export) ────────────────────────────────────────

export function AIItinerarySection() {
  const t = useTranslations('AIItinerarySection')
  const quickPrompts = [0, 1, 2].map(i => t(`quickPrompts.${i}`))
  const [selectedOption, setSelectedOption] = useState(quickPrompts[0])

  return (
    <section className="bg-bg-inverse border-b border-white/10 w-full relative z-20">
      <div className="max-w-[1600px] mx-auto px-8 py-10 flex flex-col lg:flex-row items-center gap-10">
        <div className="lg:w-1/3 flex items-start gap-4">
          <div
            className="w-14 h-14 bg-bg-warning-default flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-orange-500/30"
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            <Bell className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{t('title')}</h2>
            <p className="text-sm text-[var(--color-text-dim)]">{t('subtitle')}</p>
          </div>
        </div>
        <div className="lg:w-2/3 w-full">
          <AIInputPill
            selectedOption={selectedOption}
            onChipSelect={setSelectedOption}
            submitLabel={t('submitLabel')}
            chips={quickPrompts}
          />
        </div>
      </div>
    </section>
  )
}
