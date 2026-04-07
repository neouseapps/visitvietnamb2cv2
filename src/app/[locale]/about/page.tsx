import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'AboutPage.Meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function AboutPage() {
  return <AboutPageClient />
}
