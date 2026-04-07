import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import ForGovernancePageClient from './ForGovernancePageClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ForGovernancePage.Meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function ForGovernancePage() {
  return <ForGovernancePageClient />
}
