import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { AppHero } from '../components/tai-app/AppHero'
import { AppPainPoints } from '../components/tai-app/AppPainPoints'
import { AppFeatures } from '../components/tai-app/AppFeatures'
import { AppTestimonials } from '../components/tai-app/AppTestimonials'
import { AppFaq } from '../components/tai-app/AppFaq'
import { AppDownloadCTA } from '../components/tai-app/AppDownloadCTA'
import { OffersSection } from '../components/OffersSection'
import { TestimonialsSection } from '../components/TestimonialsSection'

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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg-default)]">
      <Navbar variant="light" />
      <main>
        <AppHero />
        <OffersSection />
        <AppPainPoints />
        <AppFeatures />
        <AppTestimonials />
        <TestimonialsSection />
        <AppFaq />
        <AppDownloadCTA />
      </main>
      <Footer />
    </div>
  )
}
