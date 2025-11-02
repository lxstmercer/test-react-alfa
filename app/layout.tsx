import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Product Manager',
  description: 'Manage your products with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Уберите /test-react-alfa из путей */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}