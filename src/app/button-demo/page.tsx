'use client'

import { Button } from '@/app/components/ui/button'
import { ArrowRight, Download, Star } from 'lucide-react'

const variants = ['brand', 'primary', 'secondary', 'tertiary', 'ghost', 'link'] as const
const sizes = ['sm', 'md', 'lg', 'xl'] as const

export default function ButtonDemo() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-default)] p-12 font-[family-name:var(--font-default)]">
      <h1 className="text-2xl font-bold mb-10 text-[var(--color-text-default)]">
        Button Component — VSVN Design System
      </h1>

      {/* All variants × sizes */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-dim)] mb-6">
          Variants × Sizes
        </h2>
        <div className="overflow-x-auto">
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="text-left text-xs text-[var(--color-text-dim)] py-2 pr-6 font-normal">Variant</th>
                {sizes.map((s) => (
                  <th key={s} className="text-left text-xs text-[var(--color-text-dim)] py-2 pr-8 font-normal">
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((v) => (
                <tr key={v} className="border-t border-[var(--color-border-default)]">
                  <td className="text-xs text-[var(--color-text-dim)] pr-6 py-4 font-mono">{v}</td>
                  {sizes.map((s) => (
                    <td key={s} className="pr-8 py-4">
                      <Button variant={v} size={s}>Label</Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-dim)] mb-6">
          States
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="brand">Default</Button>
          <Button variant="brand" disabled>Disabled</Button>
          <Button variant="brand" isLoading>Loading</Button>
          <Button variant="brand" isLoading>Đang lưu</Button>
          <Button variant="primary" disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
        </div>
      </section>

      {/* Icons */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-dim)] mb-6">
          With Icons
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="brand" rightIcon={<ArrowRight />}>Khám phá ngay</Button>
          <Button variant="primary" leftIcon={<Download />}>Tải xuống</Button>
          <Button variant="secondary" leftIcon={<Star />} rightIcon={<ArrowRight />}>Đánh giá</Button>
          <Button variant="ghost" leftIcon={<Star />}>Ghost with icon</Button>
          <Button variant="link" rightIcon={<ArrowRight />}>Xem thêm</Button>
        </div>
      </section>

      {/* All sizes with icons */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-dim)] mb-6">
          Sizes with Icons
        </h2>
        <div className="flex flex-wrap gap-4 items-end">
          {sizes.map((s) => (
            <Button key={s} variant="brand" size={s} rightIcon={<ArrowRight />}>
              {s.toUpperCase()}
            </Button>
          ))}
        </div>
      </section>
    </div>
  )
}
