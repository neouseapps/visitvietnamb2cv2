'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { ChevronRight, ChevronLeft, CalendarDays, BadgeCheck } from 'lucide-react'
import { Navbar } from '../../../components/Navbar'
import { Footer } from '../../../components/Footer'
import { AppDownloadCTA } from '../../../components/tai-app/AppDownloadCTA'

// ─── Types ────────────────────────────────────────────────────────────────────

type ContentSection = {
  id: string
  heading: string
  level: 2 | 3
  body: string
}

type POI = {
  id: number
  name: string
  address: string
  image: string
}

type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  imageCaption: string
  author: string
  authorRole: string
  authorAvatar: string
  content: ContentSection[]
  gallery: { src: string; alt: string }[]
  mapImage: string
  locations: POI[]
  relatedPosts: RelatedPost[]
}

type RelatedPost = {
  id: number
  slug: string
  title: string
  date: string
  image: string
  category: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_POSTS: Record<string, BlogPost> = {
  'demo': {
    id: 1,
    slug: 'demo',
    title: 'Khám phá thiên đường hải sản Phú Quốc: Từ bãi biển đến bàn ăn',
    excerpt:
      'Phú Quốc không chỉ nổi tiếng với những bãi cát trắng mịn và làn nước trong xanh, mà còn là thiên đường của những tín đồ ẩm thực biển. Hành trình khám phá ẩm thực Phú Quốc sẽ đưa bạn đến những khu chợ đêm tấp nập, những nhà hàng ven biển lãng mạn.',
    category: 'Ẩm thực',
    date: '12 tháng 3, 2025',
    readTime: '8 phút đọc',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    imageCaption: 'Cảnh hoàng hôn tuyệt đẹp tại Bãi Sao, Phú Quốc',
    author: 'Nguyễn Minh Châu',
    authorRole: 'Biên tập viên du lịch',
    authorAvatar: 'https://i.pravatar.cc/80?img=47',
    content: [
      {
        id: 'sec1',
        heading: 'Chợ đêm Phú Quốc — Nơi hội tụ hương vị biển',
        level: 2,
        body: 'Chợ đêm Phú Quốc là điểm đến không thể bỏ qua khi đặt chân đến hòn đảo ngọc này. Nằm ngay trung tâm thị trấn Dương Đông, chợ hoạt động từ 18h đến 22h mỗi ngày, thu hút hàng nghìn du khách và người dân địa phương. Không khí nhộn nhịp, tiếng cười nói rộn ràng, mùi thơm của hải sản nướng và các món ăn địa phương lan tỏa khắp nơi.',
      },
      {
        id: 'sec2',
        heading: 'Những món không thể bỏ qua',
        level: 2,
        body: 'Phú Quốc nổi tiếng với nhiều đặc sản biển độc đáo. Ghẹ Phú Quốc được xem là một trong những loại hải sản ngon nhất Việt Nam với thịt chắc, ngọt và đầy ắp gạch. Nhum biển — loài cầu gai với gai nhọn — bên trong chứa những túi trứng màu vàng cam béo ngậy, thường được ăn sống với chút chanh và muối tiêu. Ngoài ra, bạch tuộc nướng mọi, cua biển hấp gừng hành, và cá mú hấp Hồng Kông cũng là những món khiến du khách mê đắm.',
      },
      {
        id: 'sec3',
        heading: 'Kinh nghiệm ăn uống',
        level: 3,
        body: 'Để có trải nghiệm ẩm thực trọn vẹn nhất tại Phú Quốc, bạn nên đến chợ đêm vào khoảng 18h30 — 19h để tránh giờ cao điểm. Luôn hỏi giá trước khi đặt món và nên chọn những quán có nhiều thực khách địa phương. Một bữa hải sản đầy đặn cho hai người thường dao động từ 300,000 đến 600,000 VNĐ tùy loại hải sản bạn chọn.',
      },
      {
        id: 'sec4',
        heading: 'Các nhà hàng ven biển đáng thử',
        level: 2,
        body: 'Ngoài chợ đêm, Phú Quốc còn có nhiều nhà hàng hải sản nổi tiếng dọc theo bờ biển. Nhà hàng Ganesh ở Bãi Trường, Coco Beach Club với view biển tuyệt đẹp, hay các quán hải sản tươi sống tại Bãi Dài là những địa điểm được du khách yêu thích. Nhiều nơi cho phép bạn tự chọn hải sản tươi từ bể và yêu cầu chế biến theo cách mình thích.',
      },
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=800&q=80',
        alt: 'Hải sản tươi sống tại chợ đêm Phú Quốc',
      },
      {
        src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        alt: 'Món hải sản đặc sắc',
      },
      {
        src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
        alt: 'Bãi biển Phú Quốc lúc hoàng hôn',
      },
    ],
    mapImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    locations: [
      {
        id: 1,
        name: 'Chợ đêm Phú Quốc',
        address: 'Đường Bạch Đằng, Dương Đông, Phú Quốc, Kiên Giang',
        image: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=200&q=80',
      },
      {
        id: 2,
        name: 'Bãi Sao Phú Quốc',
        address: 'An Thới, Phú Quốc, Kiên Giang 920000',
        image: 'https://images.unsplash.com/photo-1559628233-100c798642d0?w=200&q=80',
      },
      {
        id: 3,
        name: 'Coco Beach Club',
        address: 'Bãi Trường, Dương Tơ, Phú Quốc, Kiên Giang',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80',
      },
    ],
    relatedPosts: [
      {
        id: 2,
        slug: 'top-10-bai-bien-phu-quoc',
        title: 'Top 10 bãi biển đẹp nhất Phú Quốc bạn không thể bỏ lỡ',
        date: '5 tháng 3, 2025',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
        category: 'Khám phá',
      },
      {
        id: 3,
        slug: 'nuoc-mam-phu-quoc',
        title: 'Nước mắm Phú Quốc: Hành trình từ cá cơm đến chai nước mắm thượng hạng',
        date: '28 tháng 2, 2025',
        image: 'https://images.unsplash.com/photo-1569298039760-d01f1b9f2a7c?w=400&q=80',
        category: 'Văn hóa',
      },
      {
        id: 4,
        slug: 'vinpearl-safari-phu-quoc',
        title: 'Vinpearl Safari Phú Quốc: Trải nghiệm đẳng cấp giữa thiên nhiên hoang dã',
        date: '20 tháng 2, 2025',
        image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&q=80',
        category: 'Giải trí',
      },
      {
        id: 5,
        slug: 'am-thuc-duong-pho-phu-quoc',
        title: 'Ẩm thực đường phố Phú Quốc: Bản nhạc của những hương vị nhiệt đới',
        date: '14 tháng 2, 2025',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
        category: 'Ẩm thực',
      },
    ],
  },

  'hanh-trinh-kham-pha-ha-long': {
    id: 2,
    slug: 'hanh-trinh-kham-pha-ha-long',
    title: 'Hành trình khám phá Vịnh Hạ Long: Kỳ quan thiên nhiên thế giới',
    excerpt:
      'Vịnh Hạ Long — nơi hàng nghìn đảo đá vôi sừng sững giữa mặt biển xanh ngọc — là một trong những điểm đến biểu tượng nhất Việt Nam. Chuyến hải trình qua vịnh sẽ đưa bạn đến những hang động kỳ ảo, làng chài nổi trên mặt nước và những bãi tắm hoang sơ.',
    category: 'Khám phá',
    date: '20 tháng 4, 2025',
    readTime: '10 phút đọc',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80',
    imageCaption: 'Vịnh Hạ Long lúc bình minh nhìn từ trên cao',
    author: 'Trần Hữu Đức',
    authorRole: 'Phóng viên du lịch',
    authorAvatar: 'https://i.pravatar.cc/80?img=12',
    content: [
      {
        id: 'sec1',
        heading: 'Vịnh Hạ Long — Di sản thiên nhiên thế giới',
        level: 2,
        body: 'Được UNESCO công nhận là Di sản Thiên nhiên Thế giới hai lần (1994 và 2000), Vịnh Hạ Long trải rộng trên diện tích khoảng 1,553 km² với hơn 1,960 hòn đảo lớn nhỏ. Phần lớn các đảo là đảo đá vôi được hình thành qua hàng triệu năm phong hóa và xói mòn, tạo nên những hình dáng kỳ thú mang tên gọi dân gian như Hòn Trống Mái, Hòn Đầu Người hay Hòn Gà Chọi.',
      },
      {
        id: 'sec2',
        heading: 'Những hang động huyền bí',
        level: 2,
        body: 'Động Thiên Cung và Hang Đầu Gỗ là hai trong số những hang động nổi tiếng nhất vịnh. Động Thiên Cung dài khoảng 130 mét với những khối thạch nhũ và măng đá được ánh đèn màu rực rỡ chiếu sáng, tạo nên khung cảnh như chốn thiên đường. Hang Sửng Sốt — hay còn gọi là "Amazing Cave" — chia thành hai buồng lớn với trần hang cao vút và vô số nhũ đá hình thù phong phú.',
      },
      {
        id: 'sec3',
        heading: 'Kinh nghiệm đặt tour du thuyền',
        level: 3,
        body: 'Cách tốt nhất để khám phá Hạ Long là đặt tour nghỉ đêm trên du thuyền từ 2–3 ngày. Các du thuyền hạng trung thường có giá từ 3–5 triệu đồng/người/đêm, đã bao gồm ăn uống và các hoạt động như chèo kayak, tham quan hang động. Nên đặt trước ít nhất 2 tuần vào mùa cao điểm (tháng 4 đến tháng 9).',
      },
      {
        id: 'sec4',
        heading: 'Ẩm thực trên vịnh',
        level: 2,
        body: 'Bữa ăn trên du thuyền thường là điểm nhấn đáng nhớ của chuyến đi. Hải sản tươi sống được đánh bắt trực tiếp từ vịnh và chế biến ngay trên tàu — từ tôm hùm hấp sả đến mực nướng muối ớt hay canh chua cá song. Buổi tối, nhiều du thuyền tổ chức tiệc nướng trên boong với âm nhạc và view vịnh về đêm lung linh dưới ánh trăng.',
      },
    ],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
        alt: 'Vịnh Hạ Long bình minh',
      },
      {
        src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
        alt: 'Chèo kayak khám phá hang động Hạ Long',
      },
      {
        src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
        alt: 'Du thuyền trên vịnh',
      },
    ],
    mapImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    locations: [
      {
        id: 1,
        name: 'Hang Sửng Sốt',
        address: 'Đảo Bo Hon, Vịnh Hạ Long, Quảng Ninh 200000',
        image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=200&q=80',
      },
      {
        id: 2,
        name: 'Đảo Ti Tốp',
        address: 'Vịnh Hạ Long, Hạ Long, Quảng Ninh 200000',
        image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=200&q=80',
      },
      {
        id: 3,
        name: 'Làng chài Cửa Vạn',
        address: 'Vịnh Hạ Long, Hạ Long, Quảng Ninh 200000',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&q=80',
      },
    ],
    relatedPosts: [
      {
        id: 5,
        slug: 'kham-pha-hai-san-phu-quoc',
        title: 'Khám phá thiên đường hải sản Phú Quốc: Từ bãi biển đến bàn ăn',
        date: '12 tháng 3, 2025',
        image: 'https://images.unsplash.com/photo-1559628233-100c798642d0?w=400&q=80',
        category: 'Ẩm thực',
      },
      {
        id: 6,
        slug: 'am-thuc-pho-co-ha-noi',
        title: 'Ẩm thực phố cổ Hà Nội: 36 phố phường và muôn vị tinh hoa',
        date: '8 tháng 4, 2025',
        image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80',
        category: 'Ẩm thực',
      },
      {
        id: 7,
        slug: 'lang-chai-co-ngu-dan-ha-long',
        title: 'Làng chài cổ ngư dân Hạ Long — Nếp sống trên mặt nước',
        date: '1 tháng 4, 2025',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80',
        category: 'Văn hóa',
      },
      {
        id: 8,
        slug: 'trekking-fansipan',
        title: 'Chinh phục Fansipan: Hành trình lên nóc nhà Đông Dương',
        date: '25 tháng 3, 2025',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
        category: 'Phiêu lưu',
      },
    ],
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Breadcrumb({ category, title }: { category: string; title: string }) {
  return (
    <nav
      aria-label="breadcrumb"
      className="flex items-center gap-1.5 text-xs mb-8 flex-wrap"
      style={{ color: 'var(--color-text-dim-variant)', fontFamily: 'var(--font-default)' }}
    >
      <Link href="/" className="hover:underline" style={{ color: 'var(--color-text-dim)' }}>
        Trang chủ
      </Link>
      <ChevronRight className="w-3 h-3 flex-shrink-0" />
      <span style={{ color: 'var(--color-text-dim)' }}>{category}</span>
      <ChevronRight className="w-3 h-3 flex-shrink-0" />
      <span className="line-clamp-1 max-w-[260px]">{title}</span>
    </nav>
  )
}

// Gallery — 2×2 grid following Figma layout patterns
function BlogGallery({ images }: { images: { src: string; alt: string }[] }) {
  if (!images || images.length === 0) return null
  const extra = images.length - 4
  const cells = images.slice(0, 4)
  const count = images.length

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2" style={{ gap: 4 }}>
        {count >= 3 ? (
          <>
            {/* Row 1: wide landscape */}
            <div
              className="col-span-2 relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '3 / 2' }}
            >
              <Image src={cells[0].src} alt={cells[0].alt} fill className="object-cover" />
            </div>
            {/* Row 2: two squares */}
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '1 / 1' }}>
              <Image src={cells[1].src} alt={cells[1].alt} fill className="object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '1 / 1' }}>
              <Image src={cells[2].src} alt={cells[2].alt} fill className="object-cover" />
              {extra > 0 && (
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <span className="text-white font-medium text-2xl"
                    style={{ fontFamily: 'var(--font-default)' }}>
                    +{extra}
                  </span>
                </div>
              )}
            </div>
          </>
        ) : count === 2 ? (
          cells.map((img, i) => (
            <div key={i} className="col-span-2 relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '3 / 2' }}>
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))
        ) : (
          <div className="col-span-2 relative overflow-hidden rounded-2xl"
            style={{ aspectRatio: '16 / 9' }}>
            <Image src={cells[0].src} alt={cells[0].alt} fill className="object-cover" />
          </div>
        )}
      </div>
    </div>
  )
}

// Author block — avatar + verified name + role
function AuthorBlock({
  author,
  authorRole,
  authorAvatar,
}: {
  author: string
  authorRole: string
  authorAvatar: string
}) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-2xl"
      style={{
        background: 'var(--color-bg-dim)',
      }}
    >
      {/* Avatar */}
      <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 relative">
        <Image src={authorAvatar} alt={author} fill className="object-cover" />
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span
            className="font-medium text-base whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-default)',
              color: 'var(--color-text-default)',
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: '-0.16px',
            }}
          >
            {author}
          </span>
          <BadgeCheck
            className="w-4 h-4 flex-shrink-0"
            style={{ color: 'var(--color-brand-primary)' }}
          />
        </div>
        <p
          className="text-sm"
          style={{
            fontFamily: 'var(--font-default)',
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: '-0.14px',
            color: 'var(--color-text-dim)',
          }}
        >
          {authorRole}
        </p>
      </div>
    </div>
  )
}

// POI card for map slider
function POICard({ poi }: { poi: POI }) {
  return (
    <div
      className="flex gap-3 p-3 rounded-[20px] flex-shrink-0 w-[300px]"
      style={{ background: 'var(--color-bg-dim)' }}
    >
      {/* Thumbnail */}
      <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0">
        <Image src={poi.image} alt={poi.name} fill className="object-cover" />
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1 py-0.5">
        <p
          className="font-medium leading-6 line-clamp-2"
          style={{
            fontFamily: 'var(--font-default)',
            fontSize: 18,
            color: 'var(--color-text-default)',
            letterSpacing: '-0.36px',
          }}
        >
          {poi.name}
        </p>
        <p
          className="text-sm leading-5 overflow-hidden"
          style={{
            fontFamily: 'var(--font-default)',
            color: 'var(--color-text-dim)',
            letterSpacing: '-0.14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {poi.address}
        </p>
      </div>
    </div>
  )
}

// Map slider — static map + scrollable POI cards + navigation
function MapSlider({ locations, mapImage }: { locations: POI[]; mapImage: string }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToIdx = (idx: number) => {
    if (!scrollRef.current) return
    const child = scrollRef.current.children[idx] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  const goNext = () => {
    const next = Math.min(activeIdx + 1, locations.length - 1)
    setActiveIdx(next)
    scrollToIdx(next)
  }

  const goPrev = () => {
    const prev = Math.max(activeIdx - 1, 0)
    setActiveIdx(prev)
    scrollToIdx(prev)
  }

  const current = locations[activeIdx]

  return (
    <div className="flex flex-col gap-4">
      {/* Map snapshot */}
      <div
        className="relative overflow-hidden rounded-[20px] w-full"
        style={{ aspectRatio: '1 / 1' }}
      >
        <Image src={mapImage} alt="Bản đồ" fill className="object-cover" />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 100%)' }}
        />
        {/* Pin */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'var(--color-brand-primary)' }}
            >
              <span className="text-white text-lg leading-none">📍</span>
            </div>
            <div
              className="mt-1 px-3 py-2 rounded-xl backdrop-blur-sm"
              style={{ background: 'rgba(0,0,0,0.5)' }}
            >
              <p
                className="text-white text-center font-medium"
                style={{
                  fontFamily: 'var(--font-default)',
                  fontSize: 12,
                  lineHeight: '16px',
                  maxWidth: 128,
                }}
              >
                {current?.name}
              </p>
            </div>
          </div>
        </div>
        {/* Google Maps watermark */}
        <div
          className="absolute bottom-2.5 left-3 font-medium"
          style={{ color: 'rgba(0,0,0,0.6)', fontSize: 11, fontFamily: 'var(--font-default)' }}
        >
          Google
        </div>
      </div>

      {/* POI card list — horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
      >
        {locations.map((poi) => (
          <div key={poi.id} style={{ scrollSnapAlign: 'start' }}>
            <POICard poi={poi} />
          </div>
        ))}
      </div>

      {/* Navigation row */}
      <div className="flex items-center gap-3 px-1">
        <p
          className="flex-1 text-base"
          style={{
            fontFamily: 'var(--font-default)',
            fontSize: 16,
            lineHeight: '24px',
            color: 'var(--color-text-dim)',
            letterSpacing: '-0.16px',
          }}
        >
          {activeIdx + 1}/{locations.length}
        </p>
        <div className="flex gap-1">
          <button
            onClick={goPrev}
            disabled={activeIdx === 0}
            className="w-9 h-9 rounded-full flex items-center justify-center border disabled:opacity-20 transition-opacity"
            style={{
              background: 'var(--color-bg-dim)',
              borderColor: 'var(--color-border-default)',
            }}
            aria-label="Địa điểm trước"
          >
            <ChevronLeft className="w-5 h-5" style={{ color: 'var(--color-text-default)' }} />
          </button>
          <button
            onClick={goNext}
            disabled={activeIdx === locations.length - 1}
            className="w-9 h-9 rounded-full flex items-center justify-center border disabled:opacity-20 transition-opacity"
            style={{
              background: 'var(--color-bg-dim)',
              borderColor: 'var(--color-border-default)',
            }}
            aria-label="Địa điểm tiếp theo"
          >
            <ChevronRight className="w-5 h-5" style={{ color: 'var(--color-text-default)' }} />
          </button>
        </div>
      </div>
    </div>
  )
}

// Inline Item Feed — horizontally scrollable POI cards inside the article body
function InlineItemFeed({ locations }: { locations: POI[] }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= locations.length) return
    setActiveIdx(idx)
    const card = scrollRef.current?.children[idx] as HTMLElement
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <div className="my-8 rounded-2xl overflow-hidden" style={{ background: 'var(--color-bg-dim)' }}>
      <p
        className="px-4 pt-4 font-medium"
        style={{
          fontFamily: 'var(--font-default)',
          fontSize: 13,
          lineHeight: '18px',
          letterSpacing: '0.4px',
          color: 'var(--color-text-dim)',
          textTransform: 'uppercase',
        }}
      >
        Địa điểm nổi bật
      </p>
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {locations.map((poi) => (
          <div
            key={poi.id}
            className="flex-shrink-0 w-full p-4 flex flex-col gap-3"
          >
            {/* Thumbnail row */}
            <div className="flex gap-1 overflow-hidden">
              {[poi.image, poi.image, poi.image].map((img, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl"
                  style={{ width: 104, height: 96, flexShrink: 0 }}
                >
                  <Image src={img} alt={poi.name} fill className="object-cover" />
                </div>
              ))}
            </div>
            {/* Info */}
            <div className="flex flex-col gap-0.5">
              <p
                className="font-medium"
                style={{
                  fontFamily: 'var(--font-default)',
                  fontSize: 16,
                  lineHeight: '24px',
                  color: 'var(--color-text-default)',
                  letterSpacing: '-0.32px',
                }}
              >
                {poi.name}
              </p>
              <p
                className="line-clamp-1"
                style={{
                  fontFamily: 'var(--font-default)',
                  fontSize: 12,
                  lineHeight: '16px',
                  color: 'var(--color-text-dim)',
                  letterSpacing: '-0.12px',
                }}
              >
                {poi.address}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div
        className="flex items-center justify-between px-4 pb-4"
      >
        <div className="flex items-center gap-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locations[activeIdx].name + ' ' + locations[activeIdx].address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ background: 'transparent', border: '1px solid var(--color-border-default)', color: 'var(--color-text-dim)' }}
            aria-label="Xem trên Google Maps"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
              <path d="M12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white"/>
            </svg>
          </a>
          <span
            style={{
              fontFamily: 'var(--font-default)',
              fontSize: 14,
              color: 'var(--color-text-dim)',
            }}
          >
            {activeIdx + 1}/{locations.length}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => goTo(activeIdx - 1)}
            disabled={activeIdx === 0}
            className="w-9 h-9 rounded-full flex items-center justify-center border disabled:opacity-20 transition-opacity"
            style={{ background: 'var(--color-bg-default)', borderColor: 'var(--color-border-default)' }}
            aria-label="Trước"
          >
            <ChevronLeft className="w-5 h-5" style={{ color: 'var(--color-text-default)' }} />
          </button>
          <button
            onClick={() => goTo(activeIdx + 1)}
            disabled={activeIdx === locations.length - 1}
            className="w-9 h-9 rounded-full flex items-center justify-center border disabled:opacity-20 transition-opacity"
            style={{ background: 'var(--color-bg-dim)', borderColor: 'var(--color-border-default)' }}
            aria-label="Tiếp theo"
          >
            <ChevronRight className="w-5 h-5" style={{ color: 'var(--color-text-default)' }} />
          </button>
        </div>
      </div>
    </div>
  )
}

// Suggestion blog card
function SuggestionCard({ post }: { post: RelatedPost }) {
  const [hovered, setHovered] = useState(false)
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-default)] focus-visible:ring-offset-2 rounded-[16px]"
      >
        <div className="rounded-[16px] overflow-hidden flex flex-col" style={{ background: 'var(--color-bg-dim)' }}>
          {/* Image */}
          <div className="aspect-video overflow-hidden relative flex-shrink-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="360px"
              className="object-cover transition-transform duration-700"
              style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
            />
          </div>
          {/* Body */}
          <div className="p-4 flex flex-col gap-1">
            <p
              className="font-medium leading-snug line-clamp-2"
              style={{
                fontFamily: 'var(--font-default)',
                fontSize: 16,
                lineHeight: '22px',
                letterSpacing: '-0.2px',
                color: 'var(--color-text-default)',
              }}
            >
              {post.title}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-default)',
                fontSize: 12,
                lineHeight: '16px',
                color: 'var(--color-text-dim)',
              }}
            >
              Bởi Visit Vietnam
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}

// Suggestion section
function SuggestionSection({ posts }: { posts: RelatedPost[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="H3 text-[var(--color-text-default)]">
        Bài viết đến từ chuyên gia
      </h2>
      <div className="flex flex-col gap-3">
        {posts.slice(0, 3).map((post) => (
          <SuggestionCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = MOCK_POSTS[slug]
  if (!post) notFound()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg-default)' }}>
      <Navbar variant="light" />

      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-14">

            {/* ── Left column: Article ── */}
            <article>

              {/* Post Title */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-medium mb-5 leading-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-default)',
                }}
              >
                {post.title}
              </motion.h1>

              {/* Date */}
              <div
                className="flex items-center gap-1.5 mb-3"
                style={{
                  fontFamily: 'var(--font-default)',
                  fontSize: 14,
                  color: 'var(--color-text-dim)',
                }}
              >
                <CalendarDays className="w-4 h-4 flex-shrink-0" />
                <span>{post.date}</span>
              </div>

              {/* Author */}
              <div className="mb-6">
                <AuthorBlock
                  author={post.author}
                  authorRole={post.authorRole}
                  authorAvatar={post.authorAvatar}
                />
              </div>

              {/* Post Sapo */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="mb-7 py-1"
                style={{
                  fontFamily: 'var(--font-default)',
                  fontSize: 16,
                  lineHeight: '28px',
                  color: 'var(--color-text-dim)',
                  fontStyle: 'italic',
                }}
              >
                {post.excerpt}
              </motion.div>

              {/* Post Thumbnail */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="relative w-full overflow-hidden rounded-2xl mb-3"
                style={{ aspectRatio: '16 / 9' }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              {post.imageCaption && (
                <p
                  className="text-xs text-center -mt-7 mb-10"
                  style={{ color: 'var(--color-text-dim)', fontFamily: 'var(--font-default)' }}
                >
                  {post.imageCaption}
                </p>
              )}

              {/* Rich text content */}
              <div className="space-y-8 mb-10">
                {post.content.map((section, i) => (
                  <React.Fragment key={section.id}>
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                  >
                    {section.level === 2 ? (
                      <h2 className="H3 mb-3 text-[var(--color-text-default)]">
                        {section.heading}
                      </h2>
                    ) : (
                      <h3 className="H4 mb-3 text-[var(--color-text-default)]">
                        {section.heading}
                      </h3>
                    )}
                    <p
                      style={{
                        fontFamily: 'var(--font-default)',
                        fontSize: 16,
                        lineHeight: '28px',
                        color: 'var(--color-text-default)',
                      }}
                    >
                      {section.body}
                    </p>
                  </motion.section>
                  </React.Fragment>
                ))}
              </div>

              {/* Gallery */}
              <BlogGallery images={post.gallery} />

              {/* Mobile: InlineItemFeed + suggestions below article */}
              <div className="lg:hidden mt-12 pt-8 border-t flex flex-col gap-8"
                style={{ borderColor: 'var(--color-border-default)' }}>
                {post.locations.length > 0 && <InlineItemFeed locations={post.locations} />}
                <SuggestionSection posts={post.relatedPosts} />
              </div>
            </article>

            {/* ── Right column: Sidebar ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 flex flex-col gap-8">
                {post.locations.length > 0 && <InlineItemFeed locations={post.locations} />}
                <SuggestionSection posts={post.relatedPosts} />
              </div>
            </aside>

          </div>
        </div>
      </main>

      <AppDownloadCTA />

      <Footer />
    </div>
  )
}
