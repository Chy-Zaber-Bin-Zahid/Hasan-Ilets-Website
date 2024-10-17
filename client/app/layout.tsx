import ReactQueryProvider from '@/lib/ReactQueryProvider'
import { StoreProvider } from '@/redux/StoreProvider'
import { Metadata } from 'next'
import "./globals.css";

export const metadata: Metadata = {
  title: 'My App',
  description: 'Created with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  )
}