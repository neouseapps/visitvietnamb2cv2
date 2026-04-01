'use client'

import React, { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { OffersSection } from './components/OffersSection'

const HeroSection = () => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = () => {
    if (searchValue.trim()) {
      alert(`Đang tìm kiếm: ${searchValue}`)
    }
  }

  return (
    <header className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-navy">
      <img
        src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2940&auto=format&fit=crop"
        alt="Ha Long Bay"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-navy/90"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white/90 text-sm font-medium mb-6 bg-white/10 backdrop-blur-md border border-white/20">
          <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></span>
          Trợ lý AI du lịch cá nhân của bạn
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Khám phá Việt Nam,
          <br />
          dẫn lối bởi AI
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
          Lên kế hoạch hoàn hảo trong vài giây. Chỉ cần nói cho chúng tôi biết bạn muốn đi đâu, AI
          của chúng tôi sẽ lo phần còn lại.
        </p>

        <div className="bg-white p-2 rounded-full max-w-3xl mx-auto flex items-center shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex-1 flex items-center pl-6 pr-2 py-3">
            <svg
              className="w-6 h-6 text-gray-400 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Bạn muốn đi đâu? Ví dụ: Lịch trình 3 ngày ở Đà Nẵng..."
              className="w-full text-lg text-[var(--color-text-default)] placeholder-gray-400 bg-transparent focus:outline-none focus:ring-0"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-accent-orange hover:bg-orange-600 text-white p-4 rounded-full transition-colors flex items-center justify-center flex-shrink-0 shadow-md group"
          >
            <svg
              className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/70">
          {['Cá nhân hóa 100%', 'Đặt chỗ tức thì', 'Hỗ trợ 24/7'].map((item) => (
            <span key={item} className="flex items-center gap-1">
              <svg className="w-4 h-4 text-accent-orange" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}

const destinations = [
  {
    name: 'Đà Nẵng',
    desc: 'Thành phố đáng sống nhất Việt Nam',
    rating: '4.9 ★',
    trips: '12k+ AI Trips',
    img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Hội An',
    desc: 'Nét đẹp hoài cổ vượt thời gian',
    rating: '4.8 ★',
    trips: '8k+ AI Trips',
    img: 'https://images.unsplash.com/photo-1555921015-c28446bf08f8?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Huế',
    desc: 'Di sản văn hóa cố đô mộng mơ',
    rating: '4.7 ★',
    trips: '5k+ AI Trips',
    img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Phú Quốc',
    desc: 'Thiên đường đảo ngọc nhiệt đới',
    rating: '4.9 ★',
    trips: '15k+ AI Trips',
    img: 'https://images.unsplash.com/photo-1582227181165-d6ce59ec4764?q=80&w=1000&auto=format&fit=crop',
  },
]

const DestinationCard = ({ dest }: { dest: (typeof destinations)[0] }) => (
  <a
    href="#"
    className="group relative rounded-card overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 block aspect-[3/4]"
    onClick={(e) => e.preventDefault()}
  >
    <img
      src={dest.img}
      alt={dest.name}
      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
      <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded font-medium tracking-wide">
          {dest.rating}
        </span>
        <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded font-medium tracking-wide">
          {dest.trips}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
      <p className="text-white/80 text-sm font-medium">{dest.desc}</p>
    </div>
  </a>
)

const DestinationsSection = () => (
  <section
    id="destinations"
    className="py-24 px-8 max-w-[1440px] mx-auto bg-section-bg relative z-20"
  >
    <div className="flex justify-between items-end mb-12">
      <div>
        <h2 className="text-3xl font-bold text-[var(--color-text-default)] mb-2">Điểm đến nổi bật</h2>
        <p className="text-[var(--color-text-dim)]">
          Khám phá những vùng đất tươi đẹp nhất Việt Nam qua lăng kính thông minh.
        </p>
      </div>
      <a
        href="#"
        className="hidden sm:flex items-center text-sm font-semibold text-navy hover:text-accent-orange transition-colors gap-1"
        onClick={(e) => e.preventDefault()}
      >
        Xem tất cả điểm đến
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {destinations.map((dest) => (
        <DestinationCard key={dest.name} dest={dest} />
      ))}
    </div>
  </section>
)

const PhoneMockup = () => {
  const [chatMessage, setChatMessage] = useState('')

  return (
    <div className="relative mx-auto lg:mx-0 lg:ml-auto w-[320px]">
      <div className="relative bg-gray-900 rounded-panel p-3 shadow-2xl border-gray-800 border-[6px]">
        <div className="relative bg-white h-[640px] rounded-modal overflow-hidden flex flex-col">
          <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
            <div className="w-32 h-6 bg-gray-900 rounded-b-xl"></div>
          </div>

          <div className="pt-10 pb-4 px-5 border-b border-gray-100 flex items-center shadow-sm z-10 bg-white">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mr-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">Visit Vietnam AI</h3>
              <p className="text-caption text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> Đang
                trực tuyến
              </p>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 relative"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' } as React.CSSProperties}
          >
            <div className="flex justify-end">
              <div className="bg-navy text-white text-sm p-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                Gợi ý cho mình lịch trình 3 ngày 2 đêm ở Đà Nẵng, mình đi cặp đôi, thích ăn hải sản
                và chill ở biển nhé.
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 text-gray-800 text-sm p-3 rounded-2xl rounded-tl-sm max-w-[90%] shadow-sm">
                <p className="mb-2">
                  Chào bạn, tuyệt vời! Đà Nẵng rất hợp cho cặp đôi. Đây là gợi ý sơ bộ:
                </p>
                <div className="bg-slate-50 p-2 rounded-lg border border-gray-100 mb-2">
                  <p className="font-bold text-xs text-navy">Ngày 1: Biển Mỹ Khê &amp; Hải sản</p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    • Chiều: Nhận phòng, tắm biển
                    <br />• Tối: Hải sản Năm Đảnh
                  </p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-gray-100">
                  <p className="font-bold text-xs text-navy">
                    Ngày 2: Bán đảo Sơn Trà &amp; Hội An
                  </p>
                </div>
                <button className="w-full mt-2 bg-orange-50 text-orange-500 font-semibold text-xs py-2 rounded-lg hover:bg-orange-100 transition-colors">
                  Xem chi tiết &amp; Đặt phòng
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="w-full bg-slate-100 text-sm rounded-full py-3 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-navy"
              />
              <button
                onClick={() => setChatMessage('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute -right-12 top-20 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-800">Đã đặt thành công</p>
          <p className="text-caption text-gray-500">InterContinental Resort</p>
        </div>
      </div>
    </div>
  )
}

const AISection = () => (
  <section id="ai-assistant" className="py-24 bg-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 rounded-l-[100px] -z-10"></div>
    <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="max-w-xl">
        <div className="inline-block text-orange-500 font-semibold text-sm tracking-wider uppercase mb-3">
          AI Intelligence
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          Trợ lý AI cá nhân <br />
          là trung tâm của trải nghiệm
        </h2>
        <p className="text-lg text-gray-500 mb-12">
          Không còn phải đau đầu tìm kiếm hàng giờ đồng hồ. Hệ thống AI của chúng tôi phân tích sở
          thích, ngân sách và thời gian để tạo ra một lịch trình hoàn hảo chỉ dành riêng cho bạn.
        </p>

        <div className="space-y-8 mb-10">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              ),
              title: '1. Hỏi AI',
              desc: 'Trò chuyện tự nhiên như với một người bạn bản địa. Cho AI biết bạn thích gì, đi cùng ai.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              ),
              title: '2. Nhận lịch trình chi tiết',
              desc: 'AI tối ưu hóa tuyến đường, đề xuất nhà hàng ẩn mình và trải nghiệm địa phương độc đáo.',
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ),
              title: '3. Đặt chỗ trong 1 chạm',
              desc: 'Đặt toàn bộ khách sạn, vé máy bay và tour trực tiếp từ ứng dụng một cách liền mạch.',
            },
          ].map((step) => (
            <div key={step.title} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center flex-shrink-0 text-navy">
                {step.icon}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="#download"
          className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3.5 rounded-full font-semibold hover:bg-slate-800 transition-colors shadow-lg"
        >
          Tải app trải nghiệm ngay
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      <PhoneMockup />
    </div>
  </section>
)

const FeaturesSection = () => (
  <section id="experiences" className="py-24 bg-white border-t border-slate-100">
    <div className="max-w-[1440px] mx-auto px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
          Tái định nghĩa cách bạn du lịch
        </h2>
        <p className="text-gray-500 text-lg">
          Ứng dụng duy nhất kết hợp trí tuệ nhân tạo và kinh nghiệm thực địa tại Việt Nam để tạo ra
          chuyến đi hoàn hảo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-24 max-w-5xl mx-auto">
        {[
          {
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            border: 'border-blue-100',
            icon: (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
            title: 'AI Cá nhân hóa',
            desc: 'Không có hai lịch trình nào giống nhau. Hệ thống học hỏi từ sở thích của bạn để thiết kế những trải nghiệm may đo, từ ẩm thực đường phố đến nghỉ dưỡng xa hoa.',
          },
          {
            bg: 'bg-orange-50',
            text: 'text-orange-500',
            border: 'border-orange-100',
            icon: (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
            title: 'Bookable Clarity (Minh bạch)',
            desc: 'Mọi đề xuất từ AI đều có thể đặt ngay lập tức. Giá cả minh bạch, không phí ẩn. Biết chính xác bạn sẽ chi trả cho những gì trước khi đi.',
          },
          {
            bg: 'bg-green-50',
            text: 'text-green-600',
            border: 'border-green-100',
            icon: (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
            title: 'Vietnam Intelligence',
            desc: 'Được đào tạo bởi dữ liệu khổng lồ từ các chuyên gia du lịch địa phương. Khám phá những "hidden gems" mà chỉ người bản địa mới biết.',
          },
          {
            bg: 'bg-purple-50',
            text: 'text-purple-600',
            border: 'border-purple-100',
            icon: (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            ),
            title: 'Trợ lý đồng hành 24/7',
            desc: 'App sẽ gửi nhắc nhở giờ bay, thời tiết, hỗ trợ dịch thuật tự động và xử lý các sự cố phát sinh ngay trong chuyến đi của bạn.',
          },
        ].map((feat) => (
          <div key={feat.title} className="flex gap-6">
            <div
              className={`w-14 h-14 rounded-2xl ${feat.bg} ${feat.text} flex items-center justify-center flex-shrink-0 shadow-sm border ${feat.border}`}
            >
              {feat.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feat.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col items-start hover:shadow-md transition-shadow">
          <div className="bg-white p-3 rounded-lg shadow-sm text-navy mb-5 border border-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Visit Vietnam cho Doanh nghiệp</h4>
          <p className="text-gray-500 text-sm mb-6 flex-1">
            Nâng tầm dịch vụ lữ hành của bạn. Tích hợp API AI của chúng tôi để tạo lịch trình tự
            động cho khách hàng, quản lý booking tập trung.
          </p>
          <a
            href="#"
            className="text-navy font-semibold text-sm hover:text-accent-orange flex items-center gap-1"
            onClick={(e) => e.preventDefault()}
          >
            Tìm hiểu giải pháp B2B
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col items-start hover:shadow-md transition-shadow">
          <div className="bg-white p-3 rounded-lg shadow-sm text-navy mb-5 border border-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Dữ liệu cho Cán bộ Quản lý</h4>
          <p className="text-gray-500 text-sm mb-6 flex-1">
            Cung cấp báo cáo phân tích xu hướng du lịch, heat-map điểm đến, hỗ trợ định hướng phát
            triển du lịch địa phương dựa trên dữ liệu thật.
          </p>
          <a
            href="#"
            className="text-navy font-semibold text-sm hover:text-accent-orange flex items-center gap-1"
            onClick={(e) => e.preventDefault()}
          >
            Cổng thông tin Gov
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
)

const articles = [
  {
    img: 'https://images.unsplash.com/photo-1542640244-7e672d6cb466?q=80&w=800&auto=format&fit=crop',
    alt: 'Cà phê',
    date: '24 Thg 10, 2023',
    category: 'Ẩm thực',
    title: 'Top 5 quán cà phê ngắm hoàng hôn đẹp nhất Hà Nội mùa thu',
    desc: 'Khám phá những góc nhỏ yên bình giữa lòng thủ đô, nơi bạn có thể thư giãn và ngắm nhìn ánh chiều tà tuyệt đẹp.',
  },
  {
    img: 'https://images.unsplash.com/photo-1583417646636-6967cdcd1b08?q=80&w=800&auto=format&fit=crop',
    alt: 'Lễ hội',
    date: '18 Thg 10, 2023',
    category: 'Văn hóa',
    title: 'Lịch trình chi tiết tham gia Festival Hoa Đà Lạt 2023',
    desc: 'Mọi thông tin bạn cần biết về thời gian, địa điểm và các hoạt động nổi bật tại lễ hội hoa lớn nhất năm.',
  },
  {
    img: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop',
    alt: 'Côn Đảo',
    date: '12 Thg 10, 2023',
    category: 'Mẹo vặt',
    title: 'Kinh nghiệm du lịch Côn Đảo tự túc tiết kiệm mà vẫn sang chảnh',
    desc: 'Từ việc săn vé máy bay giá rẻ đến cách thuê xe máy khám phá các bãi biển hoang sơ, tất cả đều có trong cẩm nang này.',
  },
]

const NewsSection = () => (
  <section id="news" className="py-24 bg-section-bg">
    <div className="max-w-[1440px] mx-auto px-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Cẩm nang &amp; Tin tức</h2>
          <p className="text-gray-500">Cập nhật xu hướng và bí kíp du lịch mới nhất.</p>
        </div>
        <a
          href="/newsroom"
          className="hidden sm:flex items-center text-sm font-semibold text-navy hover:text-accent-orange transition-colors gap-1"
        >
          Đọc thêm bài viết
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article.title}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={article.img}
                alt={article.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-xs text-gray-400 mb-3 gap-2">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-orange-500 font-medium">{article.category}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-navy transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{article.desc}</p>
              <a
                href="#"
                className="text-navy font-semibold text-sm hover:text-accent-orange transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                Đọc chi tiết
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default function HomePage() {
  return (
    <div className="bg-section-bg text-slate-800 font-sans">
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <AISection />
      <OffersSection />
      <FeaturesSection />
      <NewsSection />
      <Footer />
    </div>
  )
}
