import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MintMuse - Web3 Creator Platform',
  description: 'Empower content creators with decentralized tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white`}>
        <nav className="bg-blue-900 bg-opacity-50 backdrop-blur-lg p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mintmuse-cFkLnwMRT3v3BhpFWAErRyHJe6Z7OT.png"
                alt="MintMuse Logo"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </div>
            <div className="space-x-4">
              <Link href="/" className="hover:text-blue-300">Home</Link>
              <Link href="/create" className="hover:text-blue-300">Create</Link>
              <Link href="/explore" className="hover:text-blue-300">Explore</Link>
              <Link href="/manage" className="hover:text-blue-300">Manage</Link>
              <Link href="/marketplace" className="hover:text-blue-300">Marketplace</Link>
              <Link href="/profile" className="hover:text-blue-300">Profile</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto mt-8 px-4 pb-16 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

