'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { ChevronDown, Upload } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { useTranslations } from 'next-intl'

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Figma: white bg, 1px solid #ebebeb border, 12px radius → --color-border-default (#DEDEDE) closest token
const inputClass =
  'w-full h-10 px-3 rounded-xl bg-[var(--color-bg-default)] border border-[var(--color-border-default)] ' +
  'text-[var(--color-text-default)] text-sm placeholder:text-[var(--color-text-dim-variant)] ' +
  'focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent ' +
  'transition-all'

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="shrink-0 sm:w-[180px] text-sm font-normal text-[var(--color-text-dim)] flex items-center gap-0.5">
      {children}
      {required && <span className="text-[var(--color-text-danger-default)]">*</span>}
    </span>
  )
}

function FormRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      {children}
    </div>
  )
}

function Divider() {
  return <div className="h-px bg-[var(--color-border-default)] w-full" />
}

// ─── RegistrationForm ─────────────────────────────────────────────────────────

export function RegistrationForm({ presetSector }: { presetSector?: string }) {
  const t = useTranslations('RegistrationForm')

  const LINH_VUC_OPTIONS = [
    t('sectors.accommodation'),
    t('sectors.food'),
    t('sectors.tours'),
    t('sectors.attractions'),
    t('sectors.shopping'),
    t('sectors.scheduledTransport'),
    t('sectors.onDemandTransport'),
    t('sectors.vehicleRental'),
    t('sectors.spa'),
    t('sectors.events'),
    t('sectors.other'),
  ]

  const otherOption = t('sectors.other')

  const [tenCongTy, setTenCongTy] = useState('')
  const [maSoDN, setMaSoDN] = useState('')
  const [linhVuc, setLinhVuc] = useState('')
  const [chiTietLinhVuc, setChiTietLinhVuc] = useState('')
  const [hoTen, setHoTen] = useState('')
  const [chucVu, setChucVu] = useState('')
  const [email, setEmail] = useState('')
  const [soDT, setSoDT] = useState('')
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const licenseRef = useRef<HTMLInputElement>(null)
  const showChiTiet = linhVuc === otherOption

  useEffect(() => {
    if (presetSector) {
      setLinhVuc(t(`sectors.${presetSector}`))
      setChiTietLinhVuc('')
    }
  }, [presetSector, t])

  const isValid =
    tenCongTy.trim() !== '' &&
    maSoDN.trim() !== '' &&
    linhVuc !== '' &&
    (!showChiTiet || chiTietLinhVuc.trim() !== '') &&
    hoTen.trim() !== '' &&
    email.trim() !== '' &&
    soDT.trim() !== '' &&
    licenseFile !== null

  const handleLicenseChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLicenseFile(e.target.files?.[0] ?? null)
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }, [])

  return (
    <section id="register" className="py-16 bg-[var(--color-bg-dim)] scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden bg-[var(--color-bg-default)] shadow-sm border border-[var(--color-border-default)]">
          <div className="relative">
            {/* Success overlay — absolutely positioned over the form so it matches the form's height exactly */}
            {submitted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-12 text-center overflow-hidden bg-[var(--color-bg-dim)] z-10">
                {/* Layer 1: sunburst rays (Figma asset) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/registration-success-bg.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-20"
                />
                {/* Layer 2: user-provided confirm image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/form-confirm-bg.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-100"
                />
                <p className="relative font-display italic text-[var(--color-text-default)] text-[28px] leading-[34px] max-w-sm">
                  {t('success.title')}
                </p>
                <p className="relative text-base text-[var(--color-text-dim)] leading-[20px] max-w-xs">
                  {t('success.body')}
                </p>
              </div>
            )}

          <div className="p-7 flex flex-col gap-4 lg:gap-8">

            {/* Title */}
            <div className="text-center">
              <h2
                className="font-display font-medium text-[var(--color-text-default)] mb-2 text-2xl md:text-[length:var(--text-display-medium-size)]"
                style={{
                  lineHeight: 'var(--text-display-medium-lh)',
                  letterSpacing: 'var(--text-display-medium-ls)',
                  fontWeight: 'var(--text-display-medium-weight-moderate)',
                }}
              >
                {t('title')}
              </h2>
              <p
                className="font-medium text-[var(--color-text-dim)]"
                style={{
                  fontSize: 'var(--text-body-default-size)',
                  lineHeight: 'var(--text-body-default-lh)',
                  letterSpacing: 'var(--text-body-default-ls)',
                }}
              >
                {t('subtitle')}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* Section 1 */}
              <div className="flex flex-col gap-4">
                <h3
                  className="font-default font-semibold text-[var(--color-text-default)]"
                  style={{ fontSize: 'var(--text-title-subsection-size)', lineHeight: 'var(--text-title-subsection-lh)', letterSpacing: 'var(--text-title-subsection-ls)' }}
                >
                  {t('sections.company')}
                </h3>
                <div className="flex flex-col gap-4">
                  <FormRow>
                    <FieldLabel required>{t('fields.companyName')}</FieldLabel>
                    <div className="flex-1">
                      <input type="text" className={inputClass} value={tenCongTy} onChange={(e) => setTenCongTy(e.target.value)} />
                    </div>
                  </FormRow>
                  <FormRow>
                    <FieldLabel required>{t('fields.businessCode')}</FieldLabel>
                    <div className="flex-1">
                      <input type="text" className={inputClass} value={maSoDN} onChange={(e) => setMaSoDN(e.target.value)} />
                    </div>
                  </FormRow>
                  <FormRow>
                    <FieldLabel required>{t('fields.sector')}</FieldLabel>
                    <div className="flex-1 relative">
                      <select
                        className={`${inputClass} appearance-none pr-10 ${linhVuc === '' ? 'text-[var(--color-text-dim-variant)]' : ''}`}
                        value={linhVuc}
                        onChange={(e) => { setLinhVuc(e.target.value); setChiTietLinhVuc('') }}
                      >
                        <option value="" disabled>{t('fields.sectorPlaceholder')}</option>
                        {LINH_VUC_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-dim-variant)] pointer-events-none" aria-hidden="true" />
                    </div>
                  </FormRow>
                  {showChiTiet && (
                    <FormRow>
                      <FieldLabel required>{t('fields.sectorDetail')}</FieldLabel>
                      <div className="flex-1">
                        <input type="text" className={inputClass} value={chiTietLinhVuc} onChange={(e) => setChiTietLinhVuc(e.target.value)} />
                      </div>
                    </FormRow>
                  )}
                </div>
              </div>

              <Divider />

              {/* Section 2 */}
              <div className="flex flex-col gap-4">
                <h3
                  className="font-default font-semibold text-[var(--color-text-default)]"
                  style={{ fontSize: 'var(--text-title-subsection-size)', lineHeight: 'var(--text-title-subsection-lh)', letterSpacing: 'var(--text-title-subsection-ls)' }}
                >
                  {t('sections.contact')}
                </h3>
                <div className="flex flex-col gap-4">
                  <FormRow>
                    <FieldLabel required>{t('fields.fullName')}</FieldLabel>
                    <div className="flex-1">
                      <input type="text" className={inputClass} value={hoTen} onChange={(e) => setHoTen(e.target.value)} />
                    </div>
                  </FormRow>
                  <FormRow>
                    <FieldLabel>{t('fields.position')}</FieldLabel>
                    <div className="flex-1">
                      <input type="text" className={inputClass} value={chucVu} onChange={(e) => setChucVu(e.target.value)} />
                    </div>
                  </FormRow>
                  <FormRow>
                    <FieldLabel required>Email</FieldLabel>
                    <div className="flex-1">
                      <input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </FormRow>
                  <FormRow>
                    <FieldLabel required>{t('fields.phone')}</FieldLabel>
                    <div className="flex-1">
                      <input type="tel" className={inputClass} value={soDT} onChange={(e) => setSoDT(e.target.value)} />
                    </div>
                  </FormRow>
                </div>
              </div>

              <Divider />

              {/* Section 3 */}
              <div className="flex flex-col gap-4">
                <h3
                  className="font-default font-semibold text-[var(--color-text-default)]"
                  style={{ fontSize: 'var(--text-title-subsection-size)', lineHeight: 'var(--text-title-subsection-lh)', letterSpacing: 'var(--text-title-subsection-ls)' }}
                >
                  {t('sections.license')}
                </h3>
                <div className="flex flex-row items-center gap-4">
                  <div className="shrink-0 sm:w-[180px]">
                    <p className="text-sm font-medium text-[var(--color-text-default)] flex items-center gap-0.5">
                      {t('fields.licenseFile')}<span className="text-[var(--color-text-danger-default)]">*</span>
                    </p>
                    <p className="text-xs text-[var(--color-text-dim-variant)] mt-0.5">{t('fields.licenseFormat')}</p>
                  </div>
                  <div className="flex-1">
                    <input ref={licenseRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={handleLicenseChange} />
                    <button
                      type="button"
                      onClick={() => licenseRef.current?.click()}
                      className="inline-flex items-center h-10 px-4 rounded-xl bg-[var(--color-bg-dim)] border border-[var(--color-border-default)] text-sm font-semibold text-[var(--color-text-default)] hover:bg-[var(--color-bg-dim-variant)] transition-colors"
                    >
                      {licenseFile ? licenseFile.name : t('fields.uploadFile')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!isValid}
                >
                  {t('submit')}
                </Button>
              </div>

            </form>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
