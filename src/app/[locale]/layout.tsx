import type { Metadata } from 'next'
import { Geist_Mono, Google_Sans, Source_Serif_4 } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Body / UI font — clean geometric sans with Vietnamese support
const googleSans = Google_Sans({
  variable: '--font-google-sans',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// Editorial display serif — pairs with Google Sans for hero h1 and section titles
// Vietnamese subset ensures correct diacritics for vi locale
const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin', 'vietnamese'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Visit Vietnam',
    description:
      locale === 'en'
        ? 'Discover Vietnam, guided by AI'
        : 'Khám phá Việt Nam, dẫn lối bởi AI',
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${geistMono.variable} ${googleSans.variable} ${sourceSerif4.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
