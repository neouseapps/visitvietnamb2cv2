import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import ForBusinessPageClient from './ForBusinessPageClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ForBusinessPage.Meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function ForBusinessPage() {
  return <ForBusinessPageClient />
}
