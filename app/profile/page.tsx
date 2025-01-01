'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

// Sample data
const SAMPLE_CONTENTS = [
  {
    id: 1,
    title: "Digital Art Masterpiece",
    price: ethers.parseEther("0.5"),
    likes: 150,
    comments: 23,
    earnings: ethers.parseEther("2.5"),
    copyright: "All Rights Reserved",
    isSubscriptionContent: false,
    isFractionalized: false,
  },
  {
    id: 2,
    title: "Exclusive Music Album",
    price: ethers.parseEther("0.1"),
    likes: 300,
    comments: 45,
    earnings: ethers.parseEther("1.2"),
    copyright: "Creative Commons",
    isSubscriptionContent: true,
    subscriptionPrice: ethers.parseEther("0.05"),
    isFractionalized: false,
  },
  {
    id: 3,
    title: "Virtual Reality Experience",
    price: ethers.parseEther("0.8"),
    likes: 200,
    comments: 30,
    earnings: ethers.parseEther("3.7"),
    copyright: "All Rights Reserved",
    isSubscriptionContent: false,
    isFractionalized: true,
    fractionsAvailable: 100,
  },
  // Add more sample content items here
];

export default function ProfilePage() {
  const [address, setAddress] = useState('')
  const [contents, setContents] = useState(SAMPLE_CONTENTS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    connectWallet()
  }, [])

  const connectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
      } else {
        throw new Error('Please install MetaMask to connect your wallet')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  if (loading) {
    return <div className="text-center text-blue-200">Loading...</div>
  }

  return (
    <div className="bg-blue-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-200">Creator Profile</h1>
      <p className="mb-8 text-xl text-blue-300">Address: {address}</p>
      <h2 className="text-3xl font-semibold mb-6 text-blue-200">Your Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contents.map((content) => (
          <div key={content.id} className="bg-blue-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">{content.title}</h3>
            <p className="mb-2 text-blue-300">Price: {ethers.formatEther(content.price)} ETH</p>
            <p className="mb-2 text-blue-300">Likes: {content.likes}</p>
            <p className="mb-2 text-blue-300">Comments: {content.comments}</p>
            <p className="mb-2 text-blue-300">Earnings: {ethers.formatEther(content.earnings)} ETH</p>
            <p className="mb-2 text-blue-300">Copyright: {content.copyright}</p>
            {content.isSubscriptionContent && (
              <p className="mb-2 text-blue-300">Subscription Price: {ethers.formatEther(content.subscriptionPrice)} ETH/month</p>
            )}
            {content.isFractionalized && (
              <p className="mb-2 text-blue-300">Fractions Available: {content.fractionsAvailable}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

