'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, BadgeCheck, CalendarDays } from 'lucide-react'
import { Navbar } from '../../../components/Navbar'
import { Footer } from '../../../components/Footer'
import { Badge } from '../../../components/ui/badge'

// ─── Types ────────────────────────────────────────────────────────────────────

type ContentSection = {
  id: string
  heading: string
  level: 2 | 3
  body: string
}

type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  image: string
  imageCaption: string
  readTime: string
  author: string
  authorRole: string
  authorAvatar: string
  content: ContentSection[]
  gallery: { src: string; alt: string }[]
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

const MOCK_POST: BlogPost = {
  id: 1,
  slug: 'kham-pha-hai-san-phu-quoc',
  title: 'Khám phá thiên đường hải sản Phú Quốc: Từ bãi biển đến bàn ăn',
  excerpt:
    'Phú Quốc không chỉ nổi tiếng với những bãi cát trắng mịn và làn nước trong xanh, mà còn là thiên đường của những tín đồ ẩm thực biển. Hành trình khám phá ẩm thực Phú Quốc sẽ đưa bạn đến những khu chợ đêm tấp nập, những nhà hàng ven biển lãng mạn.',
  category: 'Ẩm thực',
  date: '12 tháng 3, 2025',
  image: 'https://images.unsplash.com/photo-1559628233-100c798642d0?w=1200&q=80',
  imageCaption: 'Cảnh hoàng hôn tuyệt đẹp tại Bãi Sao, Phú Quốc',
  readTime: '8 phút đọc',
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
      src: 'https://images.unsplash.com/photo-1559628233-100c798642d0?w=400&q=80',
      alt: 'Bãi biển Phú Quốc lúc hoàng hôn',
    },
    {
      src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
      alt: 'Món hải sản đặc sắc',
    },
  ],
  relatedPosts: [
    {
      id: 2,
      slug: 'top-10-bai-bien-phu-quoc',
      title: 'Top 10 bãi biển đẹp nhất Phú Quốc bạn không thể bỏ lỡ',
      date: '5 tháng 3, 2025',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80',
      category: 'Khám phá',
    },
    {
      id: 3,
      slug: 'nuoc-mam-phu-quoc',
      title: 'Nước mắm Phú Quốc: Hành trình từ cá cơm đến chai nước mắm thượng hạng',
      date: '28 tháng 2, 2025',
      image: 'https://images.unsplash.com/photo-1569298039760-d01f1b9f2a7c?w=200&q=80',
      category: 'Văn hóa',
    },
    {
      id: 4,
      slug: 'vinpearl-safari-phu-quoc',
      title: 'Vinpearl Safari Phú Quốc: Trải nghiệm đẳng cấp giữa thiên nhiên hoang dã',
      date: '20 tháng 2, 2025',
      image: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=200&q=80',
      category: 'Giải trí',
    },
  ],
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Breadcrumb({ category, title }: { category: string; title: string }) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs mb-6 flex-wrap"
      style={{ color: 'var(--color-text-dim-variant)', fontFamily: 'var(--font-default)' }}>
      <Link href="/" className="hover:underline" style={{ color: 'var(--color-text-dim)' }}>Trang chủ</Link>
      <ChevronRight className="w-3 h-3 flex-shrink-0" />
      <Link href="/newsroom" className="hover:underline" style={{ color: 'var(--color-text-dim)' }}>Tin tức</Link>
      <ChevronRight className="w-3 h-3 flex-shrink-0" />
      <span className="hover:underline cursor-default" style={{ color: 'var(--color-text-dim)' }}>{category}</span>
      <ChevronRight className="w-3 h-3 flex-shrink-0" />
      <span className="line-clamp-1 max-w-[200px]">{title}</span>
    </nav>
  )
}

function ArticleGallery({ images }: { images: { src: string; alt: string }[] }) {
  if (!images.length) return null
  const [main, ...rest] = images

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-8 mb-8"
    >
      <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden" style={{ height: 280 }}>
        <div className="col-span-2 relative">
          <Image src={main.src} alt={main.alt} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          {rest.slice(0, 2).map((img, i) => (
            <div key={i} className="relative flex-1">
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <p className="text-center mt-2 text-xs" style={{ color: 'var(--color-text-dim-variant)', fontFamily: 'var(--font-default)' }}>
        {main.alt}
      </p>
    </motion.div>
  )
}

function RelatedPostCard({ post }: { post: RelatedPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="flex gap-3 group py-3 border-b last:border-0"
      style={{ borderColor: 'var(--color-border-default)' }}>
      <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0">
        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-brand-primary)', fontFamily: 'var(--font-default)' }}>
          {post.category}
        </p>
        <p className="text-sm font-medium leading-snug line-clamp-2 group-hover:underline"
          style={{ color: 'var(--color-text-default)', fontFamily: 'var(--font-default)' }}>
          {post.title}
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-dim-variant)', fontFamily: 'var(--font-default)' }}>
          {post.date}
        </p>
      </div>
    </Link>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const post = MOCK_POST

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg-default)' }}>
      <Navbar variant="light" />

      <main className="flex-1 pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumb category={post.category} title={post.title} />
        </div>

        {/* Hero Banner */}
        <div className="relative w-full" style={{ height: 440 }}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.55) 100%)',
            }}
          />
          {/* Category badge overlaid on hero */}
          <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge className="mb-3"
              style={{ background: 'var(--color-brand-primary)', color: '#fff', borderColor: 'transparent' }}>
              {post.category}
            </Badge>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-default)' }}>
              {post.imageCaption}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* 2-col grid */}
          <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-12">

            {/* ── Left column: Article ── */}
            <article>
              {/* Article header */}
              <header className="mb-8">
                <h1
                  className="font-medium mb-5 leading-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-default)',
                  }}
                >
                  {post.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-dim)', fontFamily: 'var(--font-default)' }}>
                    <CalendarDays className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </header>

              {/* Sapo / Excerpt */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-8 pl-4 py-1"
                style={{
                  borderLeft: '3px solid var(--color-brand-primary)',
                  fontFamily: 'var(--font-default)',
                  fontSize: 16,
                  lineHeight: '28px',
                  color: 'var(--color-text-dim)',
                  fontStyle: 'italic',
                }}
              >
                {post.excerpt}
              </motion.div>

              {/* Gallery */}
              <ArticleGallery images={post.gallery} />

              {/* Rich text content */}
              <div className="space-y-8">
                {post.content.map((section, i) => (
                  <motion.section
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    {section.level === 2 ? (
                      <h2
                        className="font-bold mb-3"
                        style={{
                          fontFamily: 'var(--font-default)',
                          fontSize: 24,
                          lineHeight: '32px',
                          color: 'var(--color-text-default)',
                        }}
                      >
                        {section.heading}
                      </h2>
                    ) : (
                      <h3
                        className="font-bold mb-3"
                        style={{
                          fontFamily: 'var(--font-default)',
                          fontSize: 18,
                          lineHeight: '26px',
                          color: 'var(--color-text-default)',
                        }}
                      >
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
                ))}
              </div>

              {/* Mobile-only related posts (below article) */}
              <aside className="lg:hidden mt-12 pt-8 border-t" style={{ borderColor: 'var(--color-border-default)' }}>
                <h2
                  className="font-bold mb-6"
                  style={{
                    fontFamily: 'var(--font-default)',
                    fontSize: 18,
                    color: 'var(--color-text-default)',
                  }}
                >
                  Bài viết liên quan
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {post.relatedPosts.map((rp) => (
                    <RelatedPostCard key={rp.id} post={rp} />
                  ))}
                </div>
              </aside>
            </article>

            {/* ── Right column: Sidebar ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-[96px] space-y-6">

                {/* Related posts widget */}
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'var(--color-bg-default)',
                    border: '1px solid var(--color-border-default)',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h2
                      className="font-bold text-base pb-2"
                      style={{
                        fontFamily: 'var(--font-default)',
                        color: 'var(--color-text-default)',
                        borderBottom: '2px solid var(--color-brand-primary)',
                        display: 'inline-block',
                      }}
                    >
                      Bài viết liên quan
                    </h2>
                  </div>
                  <div className="mt-4">
                    {post.relatedPosts.map((rp) => (
                      <RelatedPostCard key={rp.id} post={rp} />
                    ))}
                  </div>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
