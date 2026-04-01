'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import {
  ArrowRight,
  Brain,
  Check,
  CheckCircle,
  CloudFog,
  Compass,
  Database,
  Eye,
  Handshake,
  MapPin,
  MessageCircle,
  Newspaper,
  Quote,
  Share2,
  ShieldCheck,
  Star,
  Target,
  X,
} from 'lucide-react'

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

// ---------------------------------------------------------------------------
// Counter hook
// ---------------------------------------------------------------------------
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const steps = 60
            const increment = target / steps
            let current = 0
            const interval = setInterval(() => {
              current += increment
              if (current >= target) {
                setCount(target)
                clearInterval(interval)
              } else {
                setCount(Math.ceil(current))
              }
            }, duration / steps)
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

function StatCounter({
  target,
  suffix = '',
  label,
  sublabel,
  highlight = false,
}: {
  target: number
  suffix?: string
  label: string
  sublabel: string
  highlight?: boolean
}) {
  const { count, ref } = useCounter(target)
  const formatted = target >= 1000 ? count.toLocaleString('en-US') : count

  return (
    <div
      className={`text-center p-6 border rounded-3xl backdrop-blur-sm relative overflow-hidden ${
        highlight ? 'border-white/10 bg-accent-red/20' : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="text-4xl md:text-5xl font-bold font-serif text-white mb-2 flex justify-center items-baseline">
        <span ref={ref}>{formatted}</span>
        {suffix && <span className={highlight ? 'text-white' : 'text-accent-red'}>{suffix}</span>}
      </div>
      <p className="font-bold uppercase tracking-wider text-sm mb-1 text-white/80">{label}</p>
      <p className="text-slate-400 text-xs">{sublabel}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AboutPage() {
  return (
    <div className="bg-section-bg text-slate-800 flex flex-col min-h-screen font-sans">
      {/* ── Navbar ── */}
      <Navbar variant="light" />

      {/* ================================================================
          1. HERO
      ================================================================ */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-navy min-h-[80vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2940&auto=format&fit=crop"
            alt="Vietnam Landscape"
            className="w-full h-full object-cover object-center opacity-60"
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-hero-overlay" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-8">
            Câu chuyện Visit Vietnam
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-[1.15] drop-shadow-lg">
            Kết nối thế giới với
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-white">
              vẻ đẹp đích thực
            </span>{' '}
            của Việt Nam
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
            Nền tảng công nghệ du lịch thông minh, nơi mọi hành trình được cá nhân hóa, văn hóa địa
            phương được tôn vinh, và các đối tác cùng nhau kiến tạo hệ sinh thái bền vững.
          </p>

          {/* Partners */}
          <div className="pt-8 border-t border-white/20 inline-block">
            <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mb-6">
              Đơn vị bảo trợ &amp; Đối tác chiến lược
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-yellow-400" />
                <div className="text-left text-white">
                  <p className="text-xs font-bold uppercase leading-tight">
                    Bộ Văn hóa, Thể thao
                    <br />
                    &amp; Du lịch
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Compass className="w-8 h-8 text-blue-400" />
                <div className="text-left text-white">
                  <p className="text-xs font-bold uppercase leading-tight">
                    Tổng cục Du lịch
                    <br />
                    Việt Nam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. 3 PILLARS
      ================================================================ */}
      <section className="py-24 bg-section-bg relative">
        <div className="absolute top-0 inset-x-0 h-40 opacity-5 bg-gradient-navy-fade" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-accent-red tracking-widest uppercase mb-3">
              Công nghệ cốt lõi
            </h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
              3 Trụ cột định hình tương lai
            </h3>
            <p className="text-slate-600 text-lg">
              Chúng tôi ứng dụng công nghệ tiên tiến nhất để giải quyết các bài toán phức tạp của
              ngành du lịch, mang lại giá trị thực cho cả du khách và doanh nghiệp.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(155,28,28,0.15)] transition-all duration-300 hover:-translate-y-2 group border border-slate-100">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-accent-red mb-8 group-hover:scale-110 group-hover:bg-accent-red group-hover:text-white transition-all duration-300">
                <Brain className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-navy mb-4 font-serif">AI Cá nhân hóa</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Trí tuệ nhân tạo phân tích hàng triệu điểm dữ liệu để tạo ra lịch trình độc bản, gợi
                ý điểm đến và trải nghiệm hoàn toàn phù hợp với sở thích, ngân sách và phong cách
                của từng cá nhân.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(11,27,61,0.2)] transition-all duration-300 hover:-translate-y-2 group border border-slate-100">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-navy mb-8 group-hover:scale-110 group-hover:bg-navy group-hover:text-white transition-all duration-300">
                <Database className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-navy mb-4 font-serif">Dữ liệu địa phương</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Sở hữu kho dữ liệu khổng lồ và được xác thực liên tục về 63 tỉnh thành: từ văn hóa,
                ẩm thực bản địa đến các điểm đến ẩn giấu (hidden gems) chưa xuất hiện trên các nền
                tảng đại trà.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(155,28,28,0.15)] transition-all duration-300 hover:-translate-y-2 group border border-slate-100">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-8 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <Share2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-navy mb-4 font-serif">Hệ sinh thái kết nối</h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                Mạng lưới tích hợp liền mạch hơn 5,000 đối tác lưu trú, lữ hành, OTA nội địa và quốc
                tế, tạo ra luồng giao dịch xuyên suốt và quản lý booking tập trung cho toàn ngành.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. VISION & MISSION
      ================================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image column */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-modal overflow-hidden shadow-2xl relative z-10 border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1555921015-c2620a56ac44?q=80&w=1200&auto=format&fit=crop"
                  alt="Vietnam Culture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy/20" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent-red rounded-card -z-10 rotate-6 opacity-10" />
              <div className="absolute top-1/2 -left-8 bg-white p-6 rounded-2xl shadow-xl z-20 border border-slate-100 max-w-xs animate-bounce [animation-duration:3s]">
                <div className="flex items-center gap-3 text-accent-red mb-2">
                  <Quote className="w-6 h-6" />
                </div>
                <p className="font-serif font-bold text-navy italic">
                  "Đưa Việt Nam ra thế giới, mang thế giới đến Việt Nam."
                </p>
              </div>
            </div>

            {/* Text column */}
            <div className="space-y-12">
              {/* Vision */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-navy text-xs font-bold uppercase tracking-widest mb-4">
                  <Eye className="w-3.5 h-3.5" /> Tầm nhìn
                </div>
                <h3 className="text-3xl font-serif font-bold text-navy mb-4 leading-tight">
                  Trở thành nền tảng du lịch thông minh hàng đầu Đông Nam Á
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Chúng tôi khát vọng định hình lại cách thế giới khám phá Việt Nam, thiết lập tiêu
                  chuẩn mới về công nghệ du lịch, và vững bước đưa du lịch Việt Nam lên vị thế dẫn
                  đầu trên bản đồ toàn cầu.
                </p>
              </div>

              <div className="h-px w-full bg-slate-100" />

              {/* Mission */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-accent-red text-xs font-bold uppercase tracking-widest mb-4">
                  <Target className="w-3.5 h-3.5" /> Sứ mệnh
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy mb-4 leading-tight">
                  Kiến tạo giá trị bền vững cho hệ sinh thái
                </h3>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-red mt-0.5 shrink-0" />
                    <span>
                      <strong>Kết nối du khách:</strong> Mang đến những trải nghiệm địa phương xác
                      thực, độc đáo và liền mạch.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-red mt-0.5 shrink-0" />
                    <span>
                      <strong>Hỗ trợ doanh nghiệp:</strong> Cung cấp công cụ số hóa mạnh mẽ giúp đối
                      tác tối ưu vận hành và tăng trưởng doanh thu.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent-red mt-0.5 shrink-0" />
                    <span>
                      <strong>Tôn vinh văn hóa:</strong> Đóng góp vào việc bảo tồn di sản, bảo vệ
                      môi trường và phát triển cộng đồng bản địa.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. PROBLEM vs SOLUTION
      ================================================================ */}
      <section className="py-24 bg-section-bg border-y border-slate-100 relative bg-dot-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold text-accent-red tracking-widest uppercase mb-3 block">
              Câu chuyện thay đổi
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
              Từ những chuyến đi mù mờ...
              <br />
              Đến hành trình hoàn hảo
            </h3>
            <p className="text-slate-600 text-lg">
              Chúng tôi nhận ra những khó khăn cố hữu của du lịch truyền thống và quyết tâm tạo ra
              một giải pháp toàn diện để thay đổi hoàn toàn cách bạn lên kế hoạch.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto relative">
            {/* VS badge */}
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center font-bold text-slate-400 z-10 border border-slate-100 text-sm">
              VS
            </div>

            {/* Traditional */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <CloudFog className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-700 font-serif">
                  Du lịch truyền thống
                </h4>
              </div>
              <ul className="space-y-6">
                {[
                  {
                    title: 'Thiếu thông tin tin cậy',
                    desc: 'Thông tin phân mảnh, lỗi thời, review ảo khiến du khách hoang mang, dễ gặp rủi ro.',
                  },
                  {
                    title: 'Lập kế hoạch rời rạc',
                    desc: 'Mất hàng chục giờ lướt nhiều website để tìm chuyến bay, khách sạn, tour không đồng bộ.',
                  },
                  {
                    title: 'Khó tiếp cận địa phương',
                    desc: 'Chỉ đi được các điểm đại trà, khó tìm kiếm và trải nghiệm văn hóa bản địa thực sự.',
                  },
                  {
                    title: 'Rào cản ngôn ngữ & hỗ trợ',
                    desc: 'Khó khăn trong giao tiếp, hỗ trợ khách hàng chậm trễ khi xảy ra sự cố trong chuyến đi.',
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <X className="w-3 h-3 text-red-500" strokeWidth={3} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-700 mb-1">{item.title}</h5>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visit Vietnam */}
            <div className="bg-navy rounded-3xl p-8 md:p-10 shadow-[0_20px_40px_-10px_rgba(11,27,61,0.2)] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-red/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-full bg-accent-red flex items-center justify-center text-white shadow-lg">
                  <Star className="w-6 h-6 fill-white" />
                </div>
                <h4 className="text-xl font-bold font-serif">Giải pháp Visit Vietnam</h4>
              </div>
              <ul className="space-y-6 relative z-10">
                {[
                  {
                    title: 'Dữ liệu được xác thực 100%',
                    desc: 'Thông tin được kiểm chứng bởi chuyên gia địa phương, hình ảnh thực tế, đánh giá minh bạch.',
                  },
                  {
                    title: 'AI tối ưu hóa lịch trình',
                    desc: 'Tạo plan chi tiết trong 3 giây, tự động sắp xếp quãng đường, thời gian mở cửa hợp lý nhất.',
                  },
                  {
                    title: 'Booking "All-in-one"',
                    desc: 'Đặt phòng, vé máy bay, vé tham quan và quản lý toàn bộ chuyến đi trên một ứng dụng duy nhất.',
                  },
                  {
                    title: 'Trợ lý ảo đa ngôn ngữ 24/7',
                    desc: 'Hỗ trợ tức thời 6 ngôn ngữ, đồng hành giải quyết mọi vấn đề trên từng kilomet hành trình.',
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-400" strokeWidth={3} />
                    </div>
                    <div>
                      <h5 className="font-bold text-white mb-1">{item.title}</h5>
                      <p className="text-sm text-slate-300">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          5. STATS
      ================================================================ */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-dot-white" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-red rounded-full blur-[100px] opacity-30 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
              Quy mô hệ sinh thái
            </h2>
            <p className="text-slate-300 text-lg">
              Những con số biết nói minh chứng cho sự tin tưởng của cộng đồng.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <StatCounter target={63} label="Tỉnh thành" sublabel="Phủ sóng toàn quốc" />
            <StatCounter
              target={12500}
              suffix="+"
              label="Điểm đến & POI"
              sublabel="Được xác thực chi tiết"
            />
            <StatCounter
              target={8000}
              suffix="+"
              label="Trải nghiệm"
              sublabel="Tour & Hoạt động địa phương"
            />
            <StatCounter
              target={5000}
              suffix="+"
              label="Đối tác B2B"
              sublabel="Khách sạn, Lữ hành, Vận tải"
            />
            <StatCounter target={45} label="Quốc gia" sublabel="Có khách hàng sử dụng" />
            <StatCounter
              target={2}
              suffix="M+"
              label="Người dùng"
              sublabel="Hoạt động hàng năm"
              highlight
            />
          </div>
        </div>
      </section>

      {/* ================================================================
          6. CONTACT
      ================================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4">
              Kết nối với Visit Vietnam
            </h2>
            <p className="text-slate-600">
              Chúng tôi luôn sẵn sàng lắng nghe và hợp tác để cùng phát triển.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: MessageCircle,
                title: 'Hỗ trợ chung',
                desc: 'Giải đáp thắc mắc về nền tảng và dịch vụ cho người dùng.',
                email: 'hello@visitvietnam.asia',
              },
              {
                icon: Newspaper,
                title: 'Truyền thông & Báo chí',
                desc: 'Liên hệ phỏng vấn, cung cấp tài liệu truyền thông thương hiệu.',
                email: 'press@visitvietnam.asia',
              },
              {
                icon: Handshake,
                title: 'Hợp tác kinh doanh',
                desc: 'Dành cho đối tác B2B, đại lý du lịch, khách sạn và nhà cung cấp.',
                email: 'partner@visitvietnam.asia',
              },
            ].map(({ icon: Icon, title, desc, email }) => (
              <div
                key={title}
                className="bg-section-bg p-8 rounded-3xl border border-slate-100 hover:border-accent-red/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-navy shadow-sm mb-6 group-hover:text-accent-red group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-navy mb-2">{title}</h4>
                <p className="text-sm text-slate-500 mb-4 h-10">{desc}</p>
                <a
                  href={`mailto:${email}`}
                  className="font-semibold text-accent-red hover:underline flex items-center gap-1"
                >
                  {email}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* Office address */}
          <div className="bg-navy rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1596422846543-74c6e27a6d89?q=80&w=1200&auto=format&fit=crop)',
              }}
            />
            <div className="relative z-10 flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold font-serif mb-1">Trụ sở chính</h4>
                <p className="text-slate-300 text-sm max-w-sm">
                  Tầng 12, Tòa nhà Techcombank,
                  <br />
                  191 Bà Triệu, Quận Hai Bà Trưng, Hà Nội
                </p>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-auto flex shrink-0">
              <a
                href="#"
                className="w-full text-center md:w-auto px-8 py-4 bg-accent-red hover:bg-accent-red-dark font-bold rounded-xl transition-colors shadow-lg"
              >
                Xem bản đồ
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
