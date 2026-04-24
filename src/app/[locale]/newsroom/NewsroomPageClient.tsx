'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '../../components/Navbar'
import { Button } from '../../components/ui/button'
import { Footer } from '../../components/Footer'
import { NewsCard } from '../../components/shared'

const ARTICLE_IMAGES = [
  'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559592413-7cea83781cb4?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544482688-29452b478dce?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621582236528-6627d3122c2a?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559628233-100c798642d0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512850183-6d7990f42385?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop',
]

const ARTICLE_SLUGS = [
  'kham-pha-hai-san-phu-quoc',
  'lich-trinh-phu-quoc-4-ngay-3-dem',
  'le-hoi-am-nhac-bien-mua-he',
  've-dep-hoi-an-dia-trung-hai',
  'chien-dich-dao-ngoc-xanh',
  'cap-treo-hon-thom-ky-luc',
  'hoi-an-van-hoa-chau-a',
  'mua-hoa-da-quy-da-lat',
  'am-thuc-duong-pho-ha-noi',
  'ra-mat-ung-dung-ai-du-lich',
  'sapa-mua-nuoc-do',
  'festival-hue-2024',
]

const PAGE_SIZE = 6

const FILTER_KEYS = ['all', 'pressRelease', 'guide', 'event', 'culture', 'food'] as const
type FilterKey = typeof FILTER_KEYS[number]


export default function NewsroomPageClient() {
  const tHero = useTranslations('NewsroomPage.Hero')
  const tFeatured = useTranslations('NewsroomPage.Featured')
  const tLatest = useTranslations('NewsroomPage.Latest')
  const tFilters = useTranslations('NewsroomPage.Filters')
  const tArticles = useTranslations('NewsroomPage.Articles')

  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const articles = ARTICLE_SLUGS.map((slug, i) => ({
    id: i + 1,
    slug,
    title: tArticles(`${i}.title`),
    excerpt: tArticles(`${i}.excerpt`),
    category: tArticles(`${i}.category`),
    date: tArticles(`${i}.date`),
    image: ARTICLE_IMAGES[i],
  }))

  const filtered = activeFilter === 'all' ? articles : articles.filter(a => a.category === tFilters(activeFilter))
  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <div className="bg-bg-dim text-slate-800 min-h-screen flex flex-col font-default">
      {/* Header */}
      <div className="bg-bg-dim relative">
        <Navbar variant="light" />

        <header className="pt-36 pb-24 px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1
              className="H1 text-bg-inverse leading-[1.2] mb-6"
            >
              {tHero('title')}
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">
              {tHero('subtitle')}
            </p>
          </div>
        </header>
      </div>

      <main className="max-w-[1600px] mx-auto w-full px-8 -mt-16 pb-24 space-y-16">
        {/* Featured article */}
        <section className="relative group cursor-pointer max-w-[1440px] mx-auto w-full">
          <div className="bg-white rounded-[16px] overflow-hidden shadow-sm flex flex-col lg:flex-row min-h-[500px] border border-gray-100">
            <div className="lg:w-3/5 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop"
                alt="Featured"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="lg:w-2/5 p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-6 font-semibold uppercase tracking-wider">
                <span>{tFeatured('category')}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{tFeatured('date')}</span>
              </div>
              <h2 className="H2 text-bg-inverse mb-6 leading-tight group-hover:text-[var(--color-brand-primary)] transition-colors">
                {tFeatured('title')}
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed line-clamp-3">
                {tFeatured('desc')}
              </p>
            </div>
          </div>
        </section>

        {/* Latest articles */}
        <section className="max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <h3 className="H3 text-[var(--color-text-default)] tracking-tight mb-2">{tLatest('title')}</h3>
            <select
              value={activeFilter}
              onChange={(e) => { setActiveFilter(e.target.value as FilterKey); setVisibleCount(PAGE_SIZE) }}
              className="pl-5 pr-10 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-bold text-bg-inverse hover:bg-[var(--color-bg-dim)] transition-colors focus:outline-none focus:border-[var(--color-brand-primary)]"
            >
              {FILTER_KEYS.map((key) => (
                <option key={key} value={key}>
                  {tFilters(key)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((article) => (
              <NewsCard
                key={article.id}
                slug={article.slug}
                title={article.title}
                description={article.excerpt}
                category={article.category}
                date={article.date}
                image={article.image}
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-20 flex justify-center">
              <Button
                variant="tertiary"
                size="lg"
                onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
              >
                {tLatest('loadMore')}
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
