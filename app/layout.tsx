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
        <link rel="icon" href="/test-react-alfa/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/test-react-alfa/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}