import type { ReactNode } from 'react'

// Root layout — minimal shell.
// The <html> and <body> tags are rendered by src/app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
