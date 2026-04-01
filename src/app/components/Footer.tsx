export const Footer = () => {
  return (
    <footer id="download" className="bg-navy pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        <div className="bg-navy-deep border border-blue-900/50 rounded-panel p-10 lg:p-16 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center shadow-2xl">
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Sẵn sàng cho chuyến đi
              <br />
              tiếp theo?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              Trải nghiệm tương lai của ngành du lịch. Tải ứng dụng ngay hoặc để lại email để nhận
              quyền truy cập sớm vào tính năng AI Premium.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="bg-black hover:bg-gray-900 border border-gray-800 text-white rounded-xl px-4 py-2 flex items-center gap-3 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.25.68 2.74.68.42 0 1.64-.82 3.31-.69 1.7.07 2.91.56 3.65 1.54-3.41 1.94-2.8 6.55.72 7.74-.83 1.83-1.66 3.01-2.42 3.7zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <p className="text-caption uppercase font-semibold text-gray-300 leading-none mb-1">
                    Download on the
                  </p>
                  <p className="text-sm font-bold leading-none">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="bg-black hover:bg-gray-900 border border-gray-800 text-white rounded-xl px-4 py-2 flex items-center gap-3 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523 15.3414C17.523 15.3414 16.208 17.6534 14.155 17.6534C12.102 17.6534 11.517 16.2734 8.528 16.2734C5.539 16.2734 4.881 17.6534 2.828 17.6534C0.775 17.6534 -0.25 15.3414 0.043 14.5454C1.358 10.9854 4.433 3.99942 4.433 3.99942C5.018 2.61942 6.042 2.34342 6.992 2.34342C7.942 2.34342 8.746 3.03342 9.112 3.99942L11.524 10.4354L13.936 3.99942C14.302 3.03342 15.106 2.34342 16.056 2.34342C17.006 2.34342 18.03 2.61942 18.615 3.99942C18.615 3.99942 21.69 10.9854 23.005 14.5454C23.298 15.3414 22.273 17.6534 20.22 17.6534C18.167 17.6534 17.523 15.3414 17.523 15.3414Z" />
                  <path
                    d="M11.524 10.435L9.112 3.999C8.746 3.033 7.942 2.343 6.992 2.343C6.042 2.343 5.018 2.619 4.433 3.999C4.433 3.999 1.358 10.985 0.043 14.545C-0.25 15.341 0.775 17.653 2.828 17.653C4.881 17.653 5.539 16.273 8.528 16.273C11.517 16.273 12.102 17.653 14.155 17.653C16.208 17.653 17.523 15.341 17.523 15.341L11.524 10.435Z"
                    fill="#3DDC84"
                  />
                </svg>
                <div className="text-left">
                  <p className="text-caption uppercase font-semibold text-gray-300 leading-none mb-1">
                    Get it on
                  </p>
                  <p className="text-sm font-bold leading-none">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 border-b border-white/10 pb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 12l3 3v7h5v-5h4v5h5v-7l3-3L12 2zm0 2.8l7 7V20h-1v-5H6v5H5v-8.2l7-7z" />
              </svg>
              <span className="font-bold text-xl text-white tracking-tight">Visit Vietnam</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Khám phá vẻ đẹp Việt Nam qua lăng kính thông minh. Đơn giản hóa hành trình của bạn với
              sức mạnh của trí tuệ nhân tạo.
            </p>
          </div>

          {[
            {
              title: 'Về chúng tôi',
              links: ['Giới thiệu', 'Đội ngũ', 'Tuyển dụng', 'Tin tức & Báo chí'],
            },
            {
              title: 'Điểm đến',
              links: ['Đà Nẵng', 'Hội An', 'Phú Quốc', 'Sapa'],
            },
            {
              title: 'Hỗ trợ & Pháp lý',
              links: [
                'Trung tâm trợ giúp',
                'Câu hỏi thường gặp',
                'Điều khoản dịch vụ',
                'Chính sách bảo mật',
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold mb-6">{col.title}</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-orange-500 transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 Visit Vietnam. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              {[
                <svg key="twitter" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>,
                <svg key="facebook" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>,
                <svg key="instagram" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>,
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  {icon}
                </a>
              ))}
            </div>
            <button className="flex items-center gap-2 border border-white/20 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Tiếng Việt (VN)
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
