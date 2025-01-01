'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

// Sample data
const SAMPLE_CONTENTS = [
  {
    id: 1,
    title: "Digital Art Masterpiece",
    creator: "0x1234...5678",
    price: ethers.parseEther("0.5"),
    isFractionalized: false,
    royaltyPercentage: 10,
  },
  {
    id: 2,
    title: "Exclusive Music Album",
    creator: "0x9876...5432",
    price: ethers.parseEther("0.1"),
    isFractionalized: true,
    fractionsAvailable: 100,
    royaltyPercentage: 15,
  },
  // Add more sample content items here
];

export default function MarketplacePage() {
  const [contents, setContents] = useState(SAMPLE_CONTENTS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async (contentId, price) => {
    try {
      // Simulate purchasing content
      alert(`Simulated purchase of content ${contentId} for ${ethers.formatEther(price)} ETH`)
      // Update the content's available fractions if it's fractionalized
      setContents(contents.map(content => 
        content.id === contentId && content.isFractionalized
          ? {...content, fractionsAvailable: content.fractionsAvailable - 1}
          : content
      ))
    } catch (error) {
      console.error('Error purchasing content:', error)
      setError(error.message || 'Error purchasing content. Please try again.')
    }
  }

  if (loading) {
    return <div className="text-center text-blue-200">Loading...</div>
  }

  return (
    <div className="bg-blue-900 text-white min-h-screen p-8">
      {error && (
        <div className="text-red-400 bg-red-900 bg-opacity-20 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      <h1 className="text-4xl font-bold mb-8 text-blue-200">NFT Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contents.map((content) => (
          <div key={content.id} className="bg-blue-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{content.title}</h2>
            <p className="text-blue-300 mb-4">Creator: {content.creator}</p>
            <p className="mb-4">Price: {ethers.formatEther(content.price)} ETH</p>
            {content.isFractionalized ? (
              <p className="mb-4">Fractions available: {content.fractionsAvailable}</p>
            ) : (
              <p className="mb-4">Full NFT</p>
            )}
            <p className="mb-6">Royalty: {content.royaltyPercentage}%</p>
            <button
              onClick={() => handlePurchase(content.id, content.price)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

