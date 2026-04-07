'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'

// ─── Props ────────────────────────────────────────────────────────────────────

export interface NewsCardProps {
  /** Tiêu đề bài viết — bắt buộc */
  title: string
  /** Slug ngắn → tạo href /newsroom/[slug] */
  slug?: string
  /** Override href hoàn chỉnh (ưu tiên hơn slug) */
  href?: string
  /** URL ảnh — nếu thiếu, hiển thị placeholder */
  image?: string
  /** Chuyên mục — hiển thị qua <Badge> */
  category?: string
  /** Ngày đăng — ẩn nếu không có */
  date?: string
  /** Mô tả / excerpt — ẩn nếu không có */
  description?: string
  /** Cấp heading cho tiêu đề (mặc định h3) */
  headingLevel?: 'h3' | 'h4'
  className?: string
}

// ─── Placeholder ──────────────────────────────────────────────────────────────

function PlaceholderImage() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--color-bg-dim)]">
      <svg
        className="w-10 h-10 text-[var(--color-text-dim-variant)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NewsCard({
  title,
  slug,
  href,
  image,
  category,
  date,
  description,
  headingLevel = 'h3',
  className,
}: NewsCardProps) {
  const [hovered, setHovered] = useState(false)
  const resolvedHref = href ?? (slug ? `/newsroom/${slug}` : '#')
  const Heading = headingLevel as keyof React.JSX.IntrinsicElements

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn('h-full', className)}
    >
      <Link
        href={resolvedHref}
        aria-label={`Đọc thêm về ${title}`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-default)] focus-visible:ring-offset-2 rounded-[16px]"
      >
        <div className="bg-white rounded-[16px] overflow-hidden border border-[var(--color-border-default)] shadow-sm h-full flex flex-col">

          {/* ── Image ─────────────────────────────────────────────────────── */}
          <div className="aspect-video overflow-hidden relative flex-shrink-0">
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700"
                style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
              />
            ) : (
              <PlaceholderImage />
            )}
          </div>

          {/* ── Body ──────────────────────────────────────────────────────── */}
          <div className="p-5 flex flex-col gap-2 flex-1">

            {/* Title */}
            <Heading
              className="font-default font-medium leading-snug line-clamp-2"
              style={{
                fontSize: 20,
                lineHeight: '28px',
                letterSpacing: '-0.2px',
                margin: 0,
                color: 'var(--color-text-default)',
              }}
            >
              {title}
            </Heading>

            {/* Category badge + date */}
            {(category || date) && (
              <div className="flex items-center gap-2 flex-wrap">
                {category && <Badge>{category}</Badge>}
                {date && (
                  <span className="text-xs text-[var(--color-text-dim-variant)]">{date}</span>
                )}
              </div>
            )}

            {/* Description — rendered only when present */}
            {description && (
              <p className="text-sm text-[var(--color-text-dim)] line-clamp-2">{description}</p>
            )}

            {/* CTA — decorative (card link handles navigation) */}
            <div className="pt-2 mt-auto">
              <span
                className="inline-flex items-center text-sm font-bold"
                style={{
                  color: 'var(--color-text-default)',
                  gap: hovered ? '10px' : '6px',
                  transition: 'gap 0.2s ease',
                }}
              >
                Đọc thêm
                <motion.span
                  animate={{ x: hovered ? 4 : 0 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  <ArrowRight size={14} />
                </motion.span>
              </span>
            </div>

          </div>
        </div>
      </Link>
    </article>
  )
}
