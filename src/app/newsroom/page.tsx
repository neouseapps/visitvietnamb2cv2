'use client'

import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'

const articles = [
  {
    id: 1,
    title: 'Khám phá thiên đường hải sản tại chợ đêm Phú Quốc',
    excerpt:
      'Từ gỏi cá trích đến nhum biển nướng, hãy cùng chúng tôi điểm qua những món ăn không thể bỏ lỡ khi ghé thăm đảo ngọc.',
    category: 'Ẩm thực',
    date: '12 Th05, 2024',
    image:
      'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Lịch trình 4 ngày 3 đêm hoàn hảo cho lần đầu đến Phú Quốc',
    excerpt:
      'Lên kế hoạch chi tiết từ phương tiện di chuyển, nơi ở đến các hoạt động vui chơi tại Nam đảo và Bắc đảo.',
    category: 'Cẩm nang',
    date: '10 Th05, 2024',
    image:
      'https://images.unsplash.com/photo-1559592413-7cea83781cb4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Lễ hội âm nhạc biển lớn nhất mùa hè chuẩn bị đổ bộ',
    excerpt:
      'Hàng ngàn du khách dự kiến sẽ hội tụ tại Bãi Trường để tham gia chuỗi sự kiện âm nhạc và thể thao dưới nước sôi động.',
    category: 'Sự kiện',
    date: '08 Th05, 2024',
    image:
      'https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Vẻ đẹp mang đậm hơi thở Địa Trung Hải tại "Thị trấn Hoàng Hôn"',
    excerpt:
      'Chiêm ngưỡng những dãy phố rực rỡ sắc màu và cây cầu Hôn biểu tượng mới của du lịch Việt Nam.',
    category: 'Cẩm nang',
    date: '05 Th05, 2024',
    image:
      'https://images.unsplash.com/photo-1544482688-29452b478dce?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Chiến dịch "Đảo Ngọc Xanh": Chung tay bảo vệ rạn san hô',
    excerpt:
      'Sáng kiến bền vững nhằm bảo tồn đa dạng sinh học biển Phú Quốc và nâng cao nhận thức cộng đồng.',
    category: 'Sự kiện',
    date: '02 Th05, 2024',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Cáp treo Hòn Thơm đạt kỷ lục mới về lượng khách tham quan',
    excerpt:
      'Hệ thống cáp treo vượt biển dài nhất thế giới tiếp tục khẳng định vị thế là trải nghiệm buộc phải thử khi đến Việt Nam.',
    category: 'Cẩm nang',
    date: '28 Th04, 2024',
    image:
      'https://images.unsplash.com/photo-1621582236528-6627d3122c2a?q=80&w=800&auto=format&fit=crop',
  },
]

const FILTERS = ['Tất cả', 'Cẩm nang', 'Sự kiện'] as const
type Filter = (typeof FILTERS)[number]

function NewsCard({ article }: { article: (typeof articles)[number] }) {
  return (
    <div className="bg-white rounded-card overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
      <div className="h-64 overflow-hidden relative">
        <img
          src={article.image}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          alt={article.title}
        />
      </div>
      <div className="p-8">
        <div className="flex items-center gap-3 text-xs text-orange-500 font-bold uppercase tracking-widest mb-4">
          <span>{article.category}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span className="text-gray-400">{article.date}</span>
        </div>
        <h4 className="text-xl font-extrabold text-navy mb-4 group-hover:text-orange-500 transition-colors leading-tight">
          {article.title}
        </h4>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2">{article.excerpt}</p>
        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
          <span className="text-sm font-bold text-navy hover:underline">Đọc tiếp →</span>
        </div>
      </div>
    </div>
  )
}

export default function NewsroomPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Tất cả')

  const filtered =
    activeFilter === 'Tất cả' ? articles : articles.filter((a) => a.category === activeFilter)

  return (
    <div className="bg-section-bg text-slate-800 min-h-screen flex flex-col font-sans">
      {/* Dark header with embedded navbar */}
      <div className="bg-navy relative">
        <Navbar />

        <header className="pt-36 pb-24 px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="px-4 py-1.5 glass-dark rounded-full text-white text-xs font-bold tracking-widest uppercase mb-6 inline-block">
              NEWSROOM
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              Tin tức &amp; Sự kiện
            </h1>
            <p className="text-xl text-gray-300 font-medium leading-relaxed">
              Cập nhật những thông tin mới nhất về du lịch Việt Nam, các điểm đến xu hướng và lời
              khuyên từ chuyên gia cho hành trình của bạn.
            </p>
          </div>
        </header>
      </div>

      <main className="max-w-[1600px] mx-auto w-full px-8 -mt-16 pb-24 space-y-16">
        {/* Featured article */}
        <section className="relative group cursor-pointer">
          <div className="bg-white rounded-modal overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[500px] border border-gray-100">
            <div className="lg:w-3/5 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop"
                alt="Featured"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute top-8 left-8">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Nổi bật
                </span>
              </div>
            </div>
            <div className="lg:w-2/5 p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-6 font-semibold uppercase tracking-wider">
                <span>Xu hướng</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>15 Th05, 2024</span>
              </div>
              <h2 className="text-4xl font-extrabold text-navy mb-6 leading-tight group-hover:text-orange-500 transition-colors">
                Phú Quốc lọt top 10 hòn đảo tuyệt vời nhất thế giới năm 2024
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed line-clamp-3">
                Tạp chí du lịch danh tiếng Condé Nast Traveler vừa công bố danh sách những hòn đảo
                đẹp nhất thế giới, trong đó Phú Quốc vinh dự góp mặt với vẻ đẹp thiên nhiên hoang sơ
                và dịch vụ nghỉ dưỡng đẳng cấp.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
                    alt="Author"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-navy">Minh Anh</p>
                  <p className="text-xs text-gray-400 font-medium">Biên tập viên cao cấp</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest articles */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <h3 className="text-3xl font-extrabold text-navy tracking-tight">Bài viết mới nhất</h3>
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-5 py-2.5 rounded-full border text-sm font-bold transition-all ${
                    activeFilter === f
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button className="bg-navy hover:bg-orange-500 text-white px-10 py-4 rounded-full font-bold transition-all flex items-center gap-3 shadow-xl">
              Tải thêm bài viết
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
        <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-navy p-1.5 rounded-lg">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 12l3 3v7h5v-5h4v5h5v-7l3-3L12 2zm0 2.8l7 7V20h-1v-5H6v5H5v-8.2l7-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-navy">Visit Vietnam</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 Visit Vietnam. All rights reserved. Developed for excellence.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-navy transition-colors">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-navy transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-navy transition-colors">
              TikTok
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
