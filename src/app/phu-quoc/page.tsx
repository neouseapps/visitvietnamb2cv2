'use client'

import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

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

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg className="w-4 h-4" fill={filled ? '#ef4444' : 'currentColor'} viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
)

const ExperienceCard = ({ exp }: { exp: (typeof experiences)[0] }) => {
  const [fav, setFav] = useState(false)
  return (
    <div className="bg-white rounded-card overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
      <div className="h-48 overflow-hidden relative">
        <img
          src={exp.image}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          alt={exp.title}
        />
        {exp.badge && (
          <div
            className={`absolute top-4 left-4 ${exp.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}
          >
            {exp.badge}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setFav(!fav)
          }}
          className={`absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${fav ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
        >
          <HeartIcon filled={fav} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${exp.categoryColor}`}>
            {exp.category}
          </span>
          <span className="text-xs text-gray-500">{exp.duration}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors">
          {exp.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{exp.description}</p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-navy">{exp.price}</span>
            {exp.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">{exp.originalPrice}</span>
            )}
          </div>
          <button className="bg-navy text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-accent-orange transition-colors">
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PhuQuocPage() {
  const [aiQuery, setAiQuery] = useState('')

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
          src="https://images.unsplash.com/photo-1582227181165-d6ce59ec4764?q=80&w=2940&auto=format&fit=crop"
          alt="Phu Quoc Coast"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-transparent" />

        <Navbar />

        {/* Centred title */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 glass-dark rounded-full text-white text-xs font-bold tracking-widest uppercase">
              Biển đảo
            </span>
            <div className="flex items-center gap-1.5 text-yellow-400 glass-dark px-3 py-1.5 rounded-full text-sm font-bold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              4.9 <span className="text-white/80 font-normal ml-1">(15k+ đánh giá)</span>
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tighter text-glow">
            Phú Quốc
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-3xl leading-relaxed text-glow">
            Thiên đường đảo ngọc với những bãi biển cát trắng mịn màng, nước biển trong xanh và
            những khu nghỉ dưỡng đẳng cấp quốc tế.
          </p>
        </div>

        {/* Stat cards */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 pb-10 flex justify-end gap-4">
          <div className="glass-dark px-6 py-5 rounded-2xl flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="bg-yellow-400/20 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-white leading-none mb-1">28°C</p>
              <p className="text-sm text-white/70 font-medium">Nắng đẹp</p>
            </div>
          </div>
          <div className="glass-dark px-6 py-5 rounded-2xl flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className="bg-blue-400/20 p-3 rounded-full">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-white leading-none mb-1">T.11 - T.4</p>
              <p className="text-sm text-white/70 font-medium">Mùa đẹp nhất</p>
            </div>
          </div>
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
        {/* Photo grid */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Khám phá qua hình ảnh
            </h2>
            <button className="text-navy font-semibold text-sm hover:text-accent-orange flex items-center gap-1 transition-colors">
              Xem thư viện
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[500px]">
            {/* Large featured image */}
            <div className="lg:col-span-2 lg:row-span-2 rounded-card overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1596541530990-2780e0bf9dbe?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                alt="Bãi Sao"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/30 mb-2 inline-block">
                  Bãi biển
                </span>
                <h3 className="text-2xl font-bold text-white">Bãi Sao</h3>
              </div>
            </div>

            {/* Top right */}
            <div className="lg:col-span-2 rounded-card overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1621582236528-6627d3122c2a?q=80&w=800&auto=format&fit=crop"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                alt="Cáp treo Hòn Thơm"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-bold text-white">Cáp treo Hòn Thơm</h3>
              </div>
            </div>

            {/* Bottom middle */}
            <div className="rounded-card overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1544482688-29452b478dce?q=80&w=600&auto=format&fit=crop"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                alt="Grand World"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5">
                <h3 className="text-lg font-bold text-white">Grand World</h3>
              </div>
            </div>

            {/* +12 photos tile */}
            <div className="rounded-card overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-xl transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1625804533031-18e3d64c2443?q=80&w=600&auto=format&fit=crop"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                alt="Hải sản Phú Quốc"
              />
              <div className="absolute inset-0 bg-navy/70 flex flex-col items-center justify-center transition-colors group-hover:bg-navy/80">
                <svg
                  className="w-8 h-8 text-white mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-white font-bold text-lg">+12 ảnh</span>
              </div>
            </div>
          </div>
        </section>

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
