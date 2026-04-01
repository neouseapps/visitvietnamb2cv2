'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { Star, Sun, Calendar } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { OffersSection } from '../components/OffersSection'
import { FeaturedAttractions } from '../components/sections/FeaturedAttractions'

const experiences = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1601246102607-e02ff37c569f?q=80&w=600&auto=format&fit=crop',
    badge: 'Bán chạy',
    badgeColor: 'bg-accent-orange',
    category: 'Vui chơi',
    categoryColor: 'text-accent-orange bg-orange-50',
    duration: '7-8 tiếng',
    title: 'Vé VinWonders Phú Quốc + Cáp treo',
    description:
      'Trải nghiệm công viên chủ đề lớn nhất VN và cáp treo vượt biển dài nhất thế giới.',
    price: '650.000đ',
    originalPrice: '850.000đ',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=600&auto=format&fit=crop',
    badge: 'Yêu thích',
    badgeColor: 'bg-green-500',
    category: 'Thể thao',
    categoryColor: 'text-blue-600 bg-blue-50',
    duration: '4 tiếng',
    title: 'Tour Lặn Ngắm San Hô Nam Đảo',
    description:
      'Khám phá thế giới đại dương kỳ thú với trang thiết bị hiện đại và HDV chuyên nghiệp.',
    price: '480.000đ',
    originalPrice: null,
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1625804533031-18e3d64c2443?q=80&w=600&auto=format&fit=crop',
    badge: null,
    badgeColor: '',
    category: 'Ẩm thực',
    categoryColor: 'text-orange-600 bg-orange-50',
    duration: '3 tiếng',
    title: 'Tour Câu Mực Đêm + BBQ Hải Sản',
    description:
      'Trải nghiệm câu mực trên biển về đêm và thưởng thức hải sản tươi sống ngay tại chỗ.',
    price: '350.000đ',
    originalPrice: null,
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=600&auto=format&fit=crop',
    badge: 'Premium',
    badgeColor: 'bg-purple-500',
    category: 'Spa & Wellness',
    categoryColor: 'text-purple-600 bg-purple-50',
    duration: '2-3 tiếng',
    title: 'Spa Thiền Định Chuẩn 5 Sao',
    description:
      'Thư giãn với liệu trình spa cao cấp kết hợp tinh dầu thiên nhiên và kỹ thuật massage chuyên sâu.',
    price: '1.200.000đ',
    originalPrice: null,
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1621582236528-6627d3122c2a?q=80&w=600&auto=format&fit=crop',
    badge: null,
    badgeColor: '',
    category: 'Tham quan',
    categoryColor: 'text-teal-600 bg-teal-50',
    duration: '5-6 tiếng',
    title: 'Tour Cáp Treo Hòn Thơm + Công viên nước',
    description:
      'Ngắm nhìn toàn cảnh đảo Phú Quốc từ cáp treo và vui chơi tại công viên nước hiện đại.',
    price: '520.000đ',
    originalPrice: null,
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1582227181165-d6ce59ec4764?q=80&w=600&auto=format&fit=crop',
    badge: 'Romantic',
    badgeColor: 'bg-pink-500',
    category: 'Romantic',
    categoryColor: 'text-pink-600 bg-pink-50',
    duration: '2 tiếng',
    title: 'Sunset Cruise + Đàn Guitar Trên Biển',
    description: 'Ngắm hoàng hôn trên du thuyền sang trọng với âm nhạc acoustic và champagne.',
    price: '890.000đ',
    originalPrice: null,
  },
]

const ExperienceCard = ({ exp }: { exp: (typeof experiences)[0] }) => {
  return (
    <div className="bg-white rounded-card overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer flex flex-col h-96">
      {/* Image — 2/3 of card height */}
      <div className="[flex:2] relative overflow-hidden min-h-0">
        <Image
          src={exp.image}
          alt={exp.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content — 1/3 of card height */}
      <div className="[flex:1] min-h-0 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-[var(--color-text-default)] mb-2 group-hover:text-accent-orange transition-colors line-clamp-2">
            {exp.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${exp.categoryColor}`}>
              {exp.category}
            </span>
          </div>
        </div>
        <p className="text-xs text-[var(--color-text-dim)] line-clamp-2">{exp.description}</p>
      </div>
    </div>
  )
}

export default function PhuQuocPage() {
  const [aiQuery, setAiQuery] = useState('')
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true })

  const quickPrompts = [
    '🌴 Lịch trình 3N2Đ cho gia đình',
    '❤️ Kỳ nghỉ trăng mật lãng mạn',
    '🎒 Phượt tự túc 4 ngày',
  ]

  return (
    <div className="bg-section-bg text-slate-800 w-full min-h-screen flex flex-col font-sans">
      {/* ── HERO ── */}
      <header className="relative h-[85vh] min-h-[600px] w-full flex flex-col justify-between overflow-hidden">
        <img
          src="/images/phu-quoc-hero.jpg"
          alt="Phu Quoc Sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-transparent" />

        <Navbar />

        {/* Centred title */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tighter text-glow">
            Phú Quốc
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-3xl leading-relaxed text-glow">
            Thiên đường đảo ngọc với những bãi biển cát trắng mịn màng, nước biển trong xanh và
            những khu nghỉ dưỡng đẳng cấp quốc tế.
          </p>

          {/* Info items — fade-in up */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
          >
            {/* Review */}
            <div className="glass-dark flex items-center gap-3 px-5 py-3 rounded-2xl">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
              <span className="text-sm font-semibold text-white">
                4.9{' '}
                <span className="text-white/70 font-normal">(15k+ đánh giá)</span>
              </span>
            </div>

            {/* Weather */}
            <div className="glass-dark flex items-center gap-3 px-5 py-3 rounded-2xl">
              <Sun className="w-5 h-5 text-yellow-300 flex-shrink-0" />
              <span className="text-sm font-semibold text-white">
                28°C{' '}
                <span className="text-white/70 font-normal">– Nắng đẹp</span>
              </span>
            </div>

            {/* Best time */}
            <div className="glass-dark flex items-center gap-3 px-5 py-3 rounded-2xl">
              <Calendar className="w-5 h-5 text-blue-300 flex-shrink-0" />
              <span className="text-sm font-semibold text-white">
                T.11 – T.4{' '}
                <span className="text-white/70 font-normal">(Mùa đẹp nhất)</span>
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── AI PROMPT BAR ── */}
      <section className="bg-navy border-b border-white/10 w-full relative z-20">
        <div className="max-w-[1600px] mx-auto px-8 py-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/3 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent-orange flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-orange-500/30">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Hỏi AI để lên lịch trình</h2>
              <p className="text-sm text-gray-400">
                Thiết kế chuyến đi cá nhân hóa trong vài giây.
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 w-full space-y-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-orange to-orange-400 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ví dụ: Gợi ý lịch trình 3 ngày 2 đêm cho gia đình có trẻ nhỏ..."
                className="relative w-full bg-navy-mid text-white placeholder-gray-400 border border-white/10 rounded-full py-4 pl-6 pr-16 focus:outline-none focus:border-accent-orange focus:ring-1 focus:ring-accent-orange text-base transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-accent-orange hover:bg-orange-600 rounded-full flex items-center justify-center text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => setAiQuery(p.replace(/^[^\s]+ /, ''))}
                  className="whitespace-nowrap bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-5 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="w-full flex-1 py-16 px-8 max-w-[1600px] mx-auto space-y-24">
        {/* Experience cards */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                Trải nghiệm đặc sắc tại Phú Quốc
              </h2>
              <p className="text-gray-500">
                Những hoạt động và dịch vụ được yêu thích nhất bởi du khách
              </p>
            </div>
          </div>

          {/* Mobile carousel (< 640px) */}
          <div className="sm:hidden overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="basis-[85%] flex-shrink-0">
                  <ExperienceCard exp={exp} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop grid (≥ 640px) */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </section>
      </main>
      <FeaturedAttractions />
      <OffersSection />
      <Footer />
    </div>
  )
}
