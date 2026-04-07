import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import PhuQuocPageClient from './PhuQuocPageClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'PhuQuocPage.Meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function PhuQuocPage() {
  return <PhuQuocPageClient />
}
