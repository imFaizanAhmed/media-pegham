import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ModeToggle } from '@/components/ui/mode-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MediaPegham',
  description: 'Created with love by Faizan Ahmed',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex items-center justify-center'>
          <div className='flex items-end justify-between mb-8 border-b border-gray-600 w-full max-w-std-width'>
            <div className='p-8 text-3xl'> MediaPegham</div>
            <div className='flex items-center'>
            <div className='p-8 text-base'> Login</div>
            <ModeToggle />
            </div>
          </div>
        </div>
        {children}
        </body>
    </html>
  )
}
