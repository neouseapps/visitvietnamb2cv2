import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

/**
 * next-intl plugin is installed and configured in src/i18n/.
 * Activate by wrapping nextConfig with createNextIntlPlugin once
 * pages are moved into the src/app/[locale]/ structure.
 *
 * import createNextIntlPlugin from 'next-intl/plugin'
 * const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
 * export default withNextIntl(nextConfig)
 */

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack(config: Configuration) {
    // SVGR: import .svg files as React components
    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

export default nextConfig
