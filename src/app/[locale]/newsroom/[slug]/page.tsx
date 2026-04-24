'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronRight, CalendarDays } from 'lucide-react'
import { Navbar } from '../../../components/Navbar'
import { Footer } from '../../../components/Footer'
import { Badge } from '../../../components/ui/badge'
import { NewsCard } from '../../../components/shared'
import { AppDownloadCTA } from '../../../components/tai-app/AppDownloadCTA'

// ─── Types ────────────────────────────────────────────────────────────────────

type ContentSection = {
  id: string
  heading: string
  level: 2 | 3
  body: string
}

type NewsPost = {
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
  content: ContentSection[]
  gallery: { src: string; alt: string }[]
  relatedPosts: RelatedPost[]
}

type RelatedPost = {
  slug: string
  title: string
  date: string
  image: string
  category: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_POSTS: Record<string, NewsPost> = {
  'kham-pha-hai-san-phu-quoc': {
    slug: 'kham-pha-hai-san-phu-quoc',
    title: 'Khám phá thiên đường hải sản tại chợ đêm Phú Quốc',
    excerpt:
      'Từ gỏi cá trích đến nhum biển nướng, hãy cùng chúng tôi điểm qua những món ăn không thể bỏ lỡ khi ghé thăm đảo ngọc.',
    category: 'Ẩm thực',
    date: '12 Th05, 2024',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Chợ đêm Phú Quốc — thiên đường ẩm thực biển đảo',
    readTime: '6 phút đọc',
    author: 'Nguyễn Minh Châu',
    authorRole: 'Biên tập viên ẩm thực',
    content: [
      {
        id: 's1',
        heading: 'Chợ đêm Phú Quốc — Nơi hội tụ hương vị biển',
        level: 2,
        body: 'Nằm ngay trung tâm thị trấn Dương Đông, chợ đêm Phú Quốc hoạt động từ 18h đến 22h mỗi ngày. Không khí nhộn nhịp, mùi thơm hải sản nướng quyện với muối biển tạo nên bầu không khí đặc trưng không thể nhầm lẫn. Du khách từ khắp nơi đổ về đây để thưởng thức những món đặc sản tươi sống được đánh bắt ngay trong ngày.',
      },
      {
        id: 's2',
        heading: 'Những món không thể bỏ qua',
        level: 2,
        body: 'Gỏi cá trích Phú Quốc là món khai vị không thể thiếu — cá tươi thái lát mỏng, trộn cùng xoài bào, rau thơm và nước mắm pha đậm đà. Nhum biển nướng mỡ hành là đặc sản hiếm có, béo ngậy và mang vị mặn tự nhiên của biển. Ghẹ rang muối ớt, ốc hương xào dừa và bạch tuộc nướng mọi hoàn thiện bữa tiệc hải sản khó quên.',
      },
      {
        id: 's3',
        heading: 'Kinh nghiệm ăn uống tại chợ đêm',
        level: 3,
        body: 'Đến chợ trước 19h để tránh giờ cao điểm và có chỗ ngồi tốt. Luôn hỏi giá trước khi đặt và chọn những quán có nhiều khách địa phương. Một bữa hải sản đầy đặn cho hai người dao động từ 300,000 đến 600,000 VNĐ — giá rất hợp lý so với chất lượng.',
      },
      {
        id: 's4',
        heading: 'Các nhà hàng ven biển đáng ghé',
        level: 2,
        body: 'Ngoài chợ đêm, các nhà hàng dọc bờ biển Bãi Trường và Bãi Dài cũng là lựa chọn tuyệt vời. Nhiều nơi cho phép tự chọn hải sản từ bể và yêu cầu chế biến theo ý thích. Coco Beach Club và Ganesh nổi tiếng với view biển lãng mạn và menu đa dạng.',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=800&q=80', alt: 'Hải sản tươi sống tại chợ đêm Phú Quốc' },
      { src: 'https://images.unsplash.com/photo-1559628233-100c798642d0?w=400&q=80', alt: 'Bãi biển Phú Quốc lúc hoàng hôn' },
      { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', alt: 'Món hải sản đặc sắc' },
    ],
    relatedPosts: [
      { slug: 'lich-trinh-phu-quoc-4-ngay-3-dem', title: 'Lịch trình 4 ngày 3 đêm hoàn hảo cho lần đầu đến Phú Quốc', date: '10 Th05, 2024', image: 'https://images.unsplash.com/photo-1559592413-7cea83781cb4?w=200&q=80', category: 'Cẩm nang' },
      { slug: 'cap-treo-hon-thom-ky-luc', title: 'Cáp treo Hòn Thơm đạt kỷ lục mới về lượng khách tham quan', date: '28 Th04, 2024', image: 'https://images.unsplash.com/photo-1621582236528-6627d3122c2a?w=200&q=80', category: 'Cẩm nang' },
      { slug: 'chien-dich-dao-ngoc-xanh', title: 'Chiến dịch "Đảo Ngọc Xanh": Chung tay bảo vệ rạn san hô', date: '02 Th05, 2024', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&q=80', category: 'Sự kiện' },
    ],
  },

  'lich-trinh-phu-quoc-4-ngay-3-dem': {
    slug: 'lich-trinh-phu-quoc-4-ngay-3-dem',
    title: 'Lịch trình 4 ngày 3 đêm hoàn hảo cho lần đầu đến Phú Quốc',
    excerpt:
      'Lên kế hoạch chi tiết từ phương tiện di chuyển, nơi ở đến các hoạt động vui chơi tại Nam đảo và Bắc đảo.',
    category: 'Cẩm nang',
    date: '10 Th05, 2024',
    image: 'https://images.unsplash.com/photo-1559592413-7cea83781cb4?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Bãi biển hoang sơ tại Phú Quốc — điểm đến lý tưởng cho kỳ nghỉ đầu tiên',
    readTime: '10 phút đọc',
    author: 'Trần Hương Giang',
    authorRole: 'Chuyên gia du lịch',
    content: [
      {
        id: 's1',
        heading: 'Ngày 1: Đến nơi và khám phá trung tâm',
        level: 2,
        body: 'Đáp máy bay sáng sớm để có cả ngày khám phá. Nhận phòng khách sạn, nghỉ ngơi rồi dạo phố Dương Đông — trung tâm hành chính và ẩm thực của đảo. Buổi tối nhớ ghé chợ đêm thưởng thức hải sản tươi và mua sắm đặc sản địa phương.',
      },
      {
        id: 's2',
        heading: 'Ngày 2: Bắc đảo — Bãi Dài và rừng nguyên sinh',
        level: 2,
        body: 'Thuê xe máy hoặc xe ô tô để khám phá Bắc đảo. Bãi Dài được mệnh danh là bãi biển đẹp nhất Phú Quốc với cát trắng mịn và nước trong xanh. Ghé Vườn quốc gia Phú Quốc để trekking nhẹ, sau đó thăm làng chài Cửa Cạn yên bình.',
      },
      {
        id: 's3',
        heading: 'Ngày 3: Nam đảo — Cáp treo và Hòn Thơm',
        level: 2,
        body: 'Ngày thứ ba dành cho cáp treo Hòn Thơm — cáp treo vượt biển dài nhất thế giới. Trải nghiệm tắm biển, chơi các trò thể thao nước tại Hòn Thơm rồi ngắm hoàng hôn tuyệt đẹp trên đường về.',
      },
      {
        id: 's4',
        heading: 'Ngày 4: Snorkeling và về nhà',
        level: 3,
        body: 'Buổi sáng cuối cùng nên đặt tour lặn ngắm san hô tại Hòn Gầm Ghì hoặc Hòn Móng Tay. Rạn san hô còn nguyên vẹn, cá nhiều màu sắc — trải nghiệm khó quên. Chiều ra sân bay làm thủ tục về, mang theo thùng nước mắm Phú Quốc và tiêu hạt làm quà.',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', alt: 'Bãi Dài Phú Quốc' },
      { src: 'https://images.unsplash.com/photo-1559592413-7cea83781cb4?w=400&q=80', alt: 'Cảnh biển trong xanh' },
      { src: 'https://images.unsplash.com/photo-1621582236528-6627d3122c2a?w=400&q=80', alt: 'Cáp treo Hòn Thơm' },
    ],
    relatedPosts: [
      { slug: 'kham-pha-hai-san-phu-quoc', title: 'Khám phá thiên đường hải sản tại chợ đêm Phú Quốc', date: '12 Th05, 2024', image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&q=80', category: 'Ẩm thực' },
      { slug: 'cap-treo-hon-thom-ky-luc', title: 'Cáp treo Hòn Thơm đạt kỷ lục mới về lượng khách tham quan', date: '28 Th04, 2024', image: 'https://images.unsplash.com/photo-1621582236528-6627d3122c2a?w=200&q=80', category: 'Cẩm nang' },
      { slug: 've-dep-hoi-an-dia-trung-hai', title: 'Vẻ đẹp mang đậm hơi thở Địa Trung Hải tại "Thị trấn Hoàng Hôn"', date: '05 Th05, 2024', image: 'https://images.unsplash.com/photo-1544482688-29452b478dce?w=200&q=80', category: 'Cẩm nang' },
    ],
  },

  'le-hoi-am-nhac-bien-mua-he': {
    slug: 'le-hoi-am-nhac-bien-mua-he',
    title: 'Lễ hội âm nhạc biển lớn nhất mùa hè chuẩn bị đổ bộ',
    excerpt:
      'Hàng ngàn du khách dự kiến sẽ hội tụ tại Bãi Trường để tham gia chuỗi sự kiện âm nhạc và thể thao dưới nước sôi động.',
    category: 'Sự kiện',
    date: '08 Th05, 2024',
    image: 'https://images.unsplash.com/photo-1596402184320-417d717867cd?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Sân khấu ngoài trời tại Bãi Trường — nơi diễn ra lễ hội âm nhạc biển',
    readTime: '5 phút đọc',
    author: 'Lê Quốc Bảo',
    authorRole: 'Phóng viên sự kiện',
    content: [
      {
        id: 's1',
        heading: 'Quy mô chưa từng có tại Phú Quốc',
        level: 2,
        body: 'Lễ hội âm nhạc biển mùa hè 2024 dự kiến thu hút hơn 20,000 lượt khách trong 3 ngày diễn ra tại khu vực Bãi Trường. Ban tổ chức đã dựng 3 sân khấu chính với hệ thống âm thanh ánh sáng hiện đại, cùng khu vực trưng bày thương hiệu và ẩm thực địa phương.',
      },
      {
        id: 's2',
        heading: 'Lineup nghệ sĩ nổi bật',
        level: 2,
        body: 'Chương trình quy tụ nhiều nghệ sĩ và DJ hàng đầu Việt Nam và khu vực Đông Nam Á. Bên cạnh âm nhạc, festival còn tổ chức các hoạt động thể thao dưới nước như lướt sóng, kayak và lặn ngắm san hô cho du khách muốn trải nghiệm thiên nhiên.',
      },
      {
        id: 's3',
        heading: 'Thông tin vé và lịch trình',
        level: 3,
        body: 'Vé ngày dao động từ 350,000 đến 800,000 VNĐ tùy khu vực. Vé combo 3 ngày có giá ưu đãi hơn và bao gồm quyền truy cập tất cả sân khấu. Lịch trình chi tiết và đặt vé trực tuyến có tại trang web chính thức của sự kiện.',
      },
      {
        id: 's4',
        heading: 'Dịch vụ đi kèm và lưu trú',
        level: 2,
        body: 'Ban tổ chức đã hợp tác với nhiều khách sạn và resort tại Phú Quốc để cung cấp gói lưu trú kèm vé festival với giá hấp dẫn. Shuttle bus miễn phí sẽ đưa đón khách từ các khu vực khách sạn lớn đến địa điểm tổ chức.',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80', alt: 'Sân khấu lễ hội âm nhạc ngoài trời' },
      { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80', alt: 'Khán giả tham gia festival' },
      { src: 'https://images.unsplash.com/photo-1559602220-ce14f786b0d9?w=400&q=80', alt: 'Biển đêm rực rỡ ánh đèn' },
    ],
    relatedPosts: [
      { slug: 'chien-dich-dao-ngoc-xanh', title: 'Chiến dịch "Đảo Ngọc Xanh": Chung tay bảo vệ rạn san hô', date: '02 Th05, 2024', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&q=80', category: 'Sự kiện' },
      { slug: 'kham-pha-hai-san-phu-quoc', title: 'Khám phá thiên đường hải sản tại chợ đêm Phú Quốc', date: '12 Th05, 2024', image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&q=80', category: 'Ẩm thực' },
      { slug: 'lich-trinh-phu-quoc-4-ngay-3-dem', title: 'Lịch trình 4 ngày 3 đêm hoàn hảo cho lần đầu đến Phú Quốc', date: '10 Th05, 2024', image: 'https://images.unsplash.com/photo-1559592413-7cea83781cb4?w=200&q=80', category: 'Cẩm nang' },
    ],
  },

  've-dep-hoi-an-dia-trung-hai': {
    slug: 've-dep-hoi-an-dia-trung-hai',
    title: 'Vẻ đẹp mang đậm hơi thở Địa Trung Hải tại "Thị trấn Hoàng Hôn"',
    excerpt:
      'Chiêm ngưỡng những dãy phố rực rỡ sắc màu và cây cầu Hôn biểu tượng mới của du lịch Việt Nam.',
    category: 'Cẩm nang',
    date: '05 Th05, 2024',
    image: 'https://images.unsplash.com/photo-1544482688-29452b478dce?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Phố đi bộ rực rỡ tại "Thị trấn Hoàng Hôn" — điểm check-in hot nhất 2024',
    readTime: '7 phút đọc',
    author: 'Phạm Thị Mai',
    authorRole: 'Blogger du lịch',
    content: [
      {
        id: 's1',
        heading: 'Thị trấn Hoàng Hôn — Thiên đường sống ảo',
        level: 2,
        body: '"Thị trấn Hoàng Hôn" tại Phú Quốc với kiến trúc Địa Trung Hải đặc trưng — tường vôi trắng, cửa sổ xanh dương, hoa giấy rực rỡ — đã trở thành điểm check-in không thể bỏ qua. Khu phố được thiết kế theo mô hình làng chài Hy Lạp, mang đến cảm giác như đang lạc bước tại châu Âu.',
      },
      {
        id: 's2',
        heading: 'Cầu Hôn — Biểu tượng lãng mạn mới',
        level: 2,
        body: 'Cây cầu kính uốn lượn vắt qua mặt biển xanh là điểm nhấn kiến trúc ấn tượng nhất. Cầu Hôn dài 320m với mặt cầu bằng kính trong suốt cho phép ngắm biển từ phía dưới — cảm giác vừa hồi hộp vừa kỳ diệu. Giờ hoàng hôn, ánh nắng phản chiếu qua kính tạo nên cảnh sắc không thể nào quên.',
      },
      {
        id: 's3',
        heading: 'Lịch trình tham quan lý tưởng',
        level: 3,
        body: 'Nên đến vào buổi chiều muộn (khoảng 15h-16h) để vừa khám phá phố đi bộ vừa kịp ngắm hoàng hôn. Giá vé tham quan khu "Thị trấn Hoàng Hôn" dao động 200,000 - 350,000 VNĐ/người tùy gói, bao gồm quyền vào cầu Hôn.',
      },
      {
        id: 's4',
        heading: 'Ẩm thực và mua sắm',
        level: 2,
        body: 'Khu phố có nhiều nhà hàng phong cách châu Âu, quán cà phê view biển và cửa hàng đặc sản. Thử gelato Ý, bánh crepe kiểu Pháp hay cocktail nhiệt đới để hoàn thiện trải nghiệm. Đừng quên mua vài món lưu niệm thủ công mỹ nghệ mang hơi hướm Địa Trung Hải về làm quà.',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80', alt: 'Kiến trúc Địa Trung Hải rực rỡ sắc màu' },
      { src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80', alt: 'Cầu kính nhìn ra biển' },
      { src: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=400&q=80', alt: 'Hoàng hôn tuyệt đẹp tại Phú Quốc' },
    ],
    relatedPosts: [
      { slug: 'lich-trinh-phu-quoc-4-ngay-3-dem', title: 'Lịch trình 4 ngày 3 đêm hoàn hảo cho lần đầu đến Phú Quốc', date: '10 Th05, 2024', image: 'https://images.unsplash.com/photo-1559592413-7cea83781cb4?w=200&q=80', category: 'Cẩm nang' },
      { slug: 'cap-treo-hon-thom-ky-luc', title: 'Cáp treo Hòn Thơm đạt kỷ lục mới về lượng khách tham quan', date: '28 Th04, 2024', image: 'https://images.unsplash.com/photo-1621582236528-6627d3122c2a?w=200&q=80', category: 'Cẩm nang' },
      { slug: 'kham-pha-hai-san-phu-quoc', title: 'Khám phá thiên đường hải sản tại chợ đêm Phú Quốc', date: '12 Th05, 2024', image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&q=80', category: 'Ẩm thực' },
    ],
  },

  'chien-dich-dao-ngoc-xanh': {
    slug: 'chien-dich-dao-ngoc-xanh',
    title: 'Chiến dịch "Đảo Ngọc Xanh": Chung tay bảo vệ rạn san hô',
    excerpt:
      'Sáng kiến bền vững nhằm bảo tồn đa dạng sinh học biển Phú Quốc và nâng cao nhận thức cộng đồng.',
    category: 'Sự kiện',
    date: '02 Th05, 2024',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Rạn san hô đa dạng sinh học tại vùng biển Phú Quốc cần được bảo vệ',
    readTime: '6 phút đọc',
    author: 'Vũ Thanh Hà',
    authorRole: 'Phóng viên môi trường',
    content: [
      {
        id: 's1',
        heading: 'Khởi động chiến dịch bảo tồn san hô',
        level: 2,
        body: 'Chiến dịch "Đảo Ngọc Xanh" được phát động bởi liên minh gồm các tổ chức bảo tồn biển, doanh nghiệp du lịch địa phương và chính quyền tỉnh Kiên Giang. Mục tiêu là phục hồi 30% diện tích rạn san hô bị suy thoái trong 5 năm tới và nâng cao ý thức du khách về bảo vệ môi trường biển.',
      },
      {
        id: 's2',
        heading: 'Hoạt động nổi bật của chiến dịch',
        level: 2,
        body: 'Hàng tuần, các đội tình nguyện viên tổ chức dọn rác dưới đáy biển tại các điểm lặn phổ biến. Chương trình "Nhận nuôi san hô" cho phép du khách đóng góp tài chính để hỗ trợ phục hồi rạn san hô và nhận chứng nhận bảo tồn. Đã có hơn 500 tình nguyện viên đăng ký tham gia trong tháng đầu tiên.',
      },
      {
        id: 's3',
        heading: 'Cách du khách có thể tham gia',
        level: 3,
        body: 'Du khách đến Phú Quốc có thể đăng ký các tour lặn có trách nhiệm do chiến dịch chứng nhận, tham gia buổi dọn rác biển cuối tuần hoặc đơn giản là cam kết không sử dụng đồ nhựa một lần trong suốt chuyến đi. Mọi hành động nhỏ đều có ý nghĩa lớn.',
      },
      {
        id: 's4',
        heading: 'Kết quả ban đầu đáng khích lệ',
        level: 2,
        body: 'Sau 3 tháng triển khai, chiến dịch đã thu gom hơn 2 tấn rác từ đáy biển và phục hồi thành công 1,200 m² san hô. Số lượng loài cá tại các khu vực bảo tồn tăng 15% so với cùng kỳ năm ngoái — tín hiệu tích cực cho hệ sinh thái biển Phú Quốc.',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', alt: 'Lặn ngắm san hô tại Phú Quốc' },
      { src: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&q=80', alt: 'Tình nguyện viên dọn rác biển' },
      { src: 'https://images.unsplash.com/photo-1559628233-100c798642d0?w=400&q=80', alt: 'Rạn san hô đầy màu sắc' },
    ],
    relatedPosts: [
      { slug: 'le-hoi-am-nhac-bien-mua-he', title: 'Lễ hội âm nhạc biển lớn nhất mùa hè chuẩn bị đổ bộ', date: '08 Th05, 2024', image: 'https://images.unsplash.com/photo-1596402184320-417d717867cd?w=200&q=80', category: 'Sự kiện' },
      { slug: 'cap-treo-hon-thom-ky-luc', title: 'Cáp treo Hòn Thơm đạt kỷ lục mới về lượng khách tham quan', date: '28 Th04, 2024', image: 'https://images.unsplash.com/photo-1621582236528-6627d3122c2a?w=200&q=80', category: 'Cẩm nang' },
      { slug: 'lich-trinh-phu-quoc-4-ngay-3-dem', title: 'Lịch trình 4 ngày 3 đêm hoàn hảo cho lần đầu đến Phú Quốc', date: '10 Th05, 2024', image: 'https://images.unsplash.com/photo-1559592413-7cea83781cb4?w=200&q=80', category: 'Cẩm nang' },
    ],
  },

  'cap-treo-hon-thom-ky-luc': {
    slug: 'cap-treo-hon-thom-ky-luc',
    title: 'Cáp treo Hòn Thơm đạt kỷ lục mới về lượng khách tham quan',
    excerpt:
      'Hệ thống cáp treo vượt biển dài nhất thế giới tiếp tục khẳng định vị thế là trải nghiệm buộc phải thử khi đến Việt Nam.',
    category: 'Cẩm nang',
    date: '28 Th04, 2024',
    image: 'https://images.unsplash.com/photo-1621582236528-6627d3122c2a?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Cáp treo Hòn Thơm — kỷ lục thế giới giữa lòng biển Phú Quốc',
    readTime: '5 phút đọc',
    author: 'Ngô Văn Tuấn',
    authorRole: 'Biên tập viên du lịch',
    content: [
      {
        id: 's1',
        heading: 'Kỷ lục thế giới được xác nhận',
        level: 2,
        body: 'Cáp treo Hòn Thơm với chiều dài 7,899.9m vượt biển từ An Thới đến đảo Hòn Thơm đã được Tổ chức Kỷ lục Thế giới Guinness chứng nhận là tuyến cáp treo 3 dây dài nhất thế giới. Năm 2024, lượng khách tham quan đạt con số kỷ lục mới với hơn 2 triệu lượt trong 12 tháng.',
      },
      {
        id: 's2',
        heading: 'Trải nghiệm vượt biển độc đáo',
        level: 2,
        body: 'Cabin cáp treo có sức chứa 10 người, hành trình kéo dài khoảng 15 phút một chiều. Từ trên cao, du khách có thể nhìn bao quát toàn bộ vùng biển xanh ngọc với những hòn đảo nhỏ rải rác — khung cảnh tuyệt đẹp vào bất kỳ thời điểm nào trong ngày. Buổi sáng sớm và hoàng hôn là thời điểm ưa thích nhất.',
      },
      {
        id: 's3',
        heading: 'Hoạt động tại Hòn Thơm',
        level: 2,
        body: 'Sau khi đến Hòn Thơm, du khách có thể tắm biển tại bãi cát trắng mịn, tham gia các trò chơi thể thao nước như jetski, banana boat, lặn snorkeling ngắm san hô. Khu nghỉ dưỡng Sun World Hòn Thơm còn có công viên nước với nhiều trò chơi hấp dẫn cho cả gia đình.',
      },
      {
        id: 's4',
        heading: 'Thông tin đặt vé và lưu ý',
        level: 3,
        body: 'Vé cáp treo khứ hồi có giá khoảng 800,000 VNĐ/người lớn và 500,000 VNĐ/trẻ em. Nên đặt vé trực tuyến trước để tránh chờ đợi vào mùa cao điểm. Mang theo kem chống nắng và nước uống vì thời tiết tại đây thường nắng gắt. Giờ hoạt động từ 8h đến 17h30 hàng ngày.',
      },
    ],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1621582236528-6627d3122c2a?w=800&q=80', alt: 'Cáp treo vượt biển Hòn Thơm' },
      { src: 'https://images.unsplash.com/photo-1559592413-7cea83781cb4?w=400&q=80', alt: 'Bãi biển Hòn Thơm' },
      { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80', alt: 'Cảnh biển từ trên cao' },
    ],
    relatedPosts: [
      { slug: 'lich-trinh-phu-quoc-4-ngay-3-dem', title: 'Lịch trình 4 ngày 3 đêm hoàn hảo cho lần đầu đến Phú Quốc', date: '10 Th05, 2024', image: 'https://images.unsplash.com/photo-1559592413-7cea83781cb4?w=200&q=80', category: 'Cẩm nang' },
      { slug: 've-dep-hoi-an-dia-trung-hai', title: 'Vẻ đẹp mang đậm hơi thở Địa Trung Hải tại "Thị trấn Hoàng Hôn"', date: '05 Th05, 2024', image: 'https://images.unsplash.com/photo-1544482688-29452b478dce?w=200&q=80', category: 'Cẩm nang' },
      { slug: 'kham-pha-hai-san-phu-quoc', title: 'Khám phá thiên đường hải sản tại chợ đêm Phú Quốc', date: '12 Th05, 2024', image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=200&q=80', category: 'Ẩm thực' },
    ],
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs mb-6 flex-wrap"
      style={{ color: 'var(--color-text-dim-variant)', fontFamily: 'var(--font-default)' }}>
      <Link href="/" className="hover:underline" style={{ color: 'var(--color-text-dim)' }}>Trang chủ</Link>
      <ChevronRight className="w-3 h-3 flex-shrink-0" />
      <Link href="/newsroom" className="hover:underline" style={{ color: 'var(--color-text-dim)' }}>Tin tức</Link>
      <ChevronRight className="w-3 h-3 flex-shrink-0" />
      <span className="line-clamp-1 max-w-[200px]">{title}</span>
    </nav>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NewsArticlePage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : ''
  const post = MOCK_POSTS[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg-default)' }}>
      <Navbar variant="light" />

      <main className="flex-1 pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
          {/* Breadcrumb + header */}
          <Breadcrumb title={post.title} />

          <h1
            className="H1 mb-5 leading-tight text-[var(--color-text-default)]"
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Badge>{post.category}</Badge>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-dim)', fontFamily: 'var(--font-default)' }}>
              <CalendarDays className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
          </div>

          {/* Sapo */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="pl-4 py-1 mb-8"
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
          </motion.p>

          {/* Article body */}
          <article>
            {/* Body sections — gallery images interleaved after sections */}
            <div className="space-y-8">
              {post.content.map((section, i) => (
                <React.Fragment key={section.id}>
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
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
                    <p style={{ fontFamily: 'var(--font-default)', fontSize: 16, lineHeight: '28px', color: 'var(--color-text-default)' }}>
                      {section.body}
                    </p>
                  </motion.section>

                  {/* Insert gallery image after the section at index matching the gallery slot */}
                  {post.gallery[i] && (
                    <motion.figure
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="m-0"
                    >
                      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                        <Image
                          src={post.gallery[i].src}
                          alt={post.gallery[i].alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 768px"
                        />
                      </div>
                      <figcaption className="text-center mt-2 text-xs" style={{ color: 'var(--color-text-dim-variant)', fontFamily: 'var(--font-default)' }}>
                        {post.gallery[i].alt}
                      </figcaption>
                    </motion.figure>
                  )}
                </React.Fragment>
              ))}
            </div>
          </article>
        </div>

        {/* Related posts — full-width 3-col section */}
        <section className="border-t" style={{ borderColor: 'var(--color-border-default)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2
              className="H3 pb-2 mb-8 inline-block text-[var(--color-text-default)]"
              style={{ borderBottom: '2px solid var(--color-brand-primary)' }}
            >
              Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {post.relatedPosts.map((rp) => (
                <NewsCard
                  key={rp.slug}
                  slug={rp.slug}
                  image={rp.image}
                  title={rp.title}
                  category={rp.category}
                  date={rp.date}
                  headingLevel="h3"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <AppDownloadCTA />
      <Footer />
    </div>
  )
}
