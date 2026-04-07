import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'HomePage' })
  return {
    title: 'Visit Vietnam',
    description: locale === 'en'
      ? 'Discover Vietnam Through Local Eyes'
      : 'Khám phá Việt Nam, dẫn lối bởi AI',
  }
}

export default function HomePage() {
  return <HomePageClient />
}
