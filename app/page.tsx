import Link from 'next/link'
import Image from 'next/image'
import WalletConnect from '@/components/WalletConnect'

export default function Home() {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center justify-center mb-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mintmuse-cFkLnwMRT3v3BhpFWAErRyHJe6Z7OT.png"
          alt="MintMuse Logo"
          width={240}
          height={60}
          className="mb-8"
        />
        <h1 className="text-6xl font-bold mb-6">Welcome to MintMuse</h1>
        <p className="text-2xl mb-8 text-blue-100">Empower your creativity with decentralized tools for monetization, copyright management, and audience engagement</p>
        <div className="space-y-6">
          <WalletConnect />
          <div className="space-x-4">
            <Link href="/create" className="bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-blue-700 transition-colors inline-block">
              Start Creating
            </Link>
            <Link href="/explore" className="text-blue-300 text-xl hover:underline inline-block">
              Explore Content
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-blue-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">NFT-Based Ownership</h2>
          <p className="text-blue-100">Secure your content with blockchain-powered NFTs</p>
        </div>
        <div className="bg-blue-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Smart Licensing</h2>
          <p className="text-blue-100">Manage your intellectual property with smart contracts</p>
        </div>
        <div className="bg-blue-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Dynamic Royalties</h2>
          <p className="text-blue-100">Earn fair compensation through automated royalty distribution</p>
        </div>
      </div>
    </div>
  )
}

