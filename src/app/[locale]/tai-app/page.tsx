import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { AppHero } from '../../components/tai-app/AppHero'
import { AppFeatures } from '../../components/tai-app/AppFeatures'
import { AppTestimonials } from '../../components/tai-app/AppTestimonials'
import { AppDownloadCTA } from '../../components/tai-app/AppDownloadCTA'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'TaiAppPage.Meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function TaiAppPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg-default)]">
      <Navbar />
      <main>
        <AppHero />
        <AppFeatures />
        <AppTestimonials />
        <AppDownloadCTA />
      </main>
      <Footer />
    </div>
  )
}
