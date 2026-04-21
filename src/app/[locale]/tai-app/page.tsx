import { redirect } from 'next/navigation'
import { routing } from '../../../i18n/routing'

export default async function TaiAppPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const target = locale === routing.defaultLocale ? '/' : `/${locale}`
  redirect(target)
}
