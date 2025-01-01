'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

// Sample data
const SAMPLE_CONTENTS = [
  {
    id: 1,
    title: "Digital Art Masterpiece",
    creator: "0x1234...5678",
    metadataHash: "QmXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
    likes: 150,
    comments: 23,
    price: ethers.parseEther("0.5"),
    isSubscriptionContent: false,
    copyright: "All Rights Reserved",
    royaltyPercentage: 10,
    isFractionalized: false,
  },
  {
    id: 2,
    title: "Exclusive Music Album",
    creator: "0x9876...5432",
    metadataHash: "QmYyYyYyYyYyYyYyYyYyYyYyYyYyYyYyYy",
    likes: 300,
    comments: 45,
    price: ethers.parseEther("0.1"),
    isSubscriptionContent: true,
    subscriptionPrice: ethers.parseEther("0.05"),
    copyright: "Creative Commons",
    royaltyPercentage: 15,
    isFractionalized: false,
  },
  // Add more sample content items here
];

export default function ExplorePage() {
  const [contents, setContents] = useState(SAMPLE_CONTENTS)
  const [loading, setLoading] = useState(false)

  const handleLike = async (contentId) => {
    // Simulate liking content
    setContents(contents.map(content => 
      content.id === contentId ? {...content, likes: content.likes + 1} : content
    ))
  }

  const handleComment = async (contentId, comment) => {
    // Simulate adding a comment
    setContents(contents.map(content => 
      content.id === contentId ? {...content, comments: content.comments + 1} : content
    ))
  }

  const handlePurchase = async (contentId, price) => {
    // Simulate purchasing content
    alert(`Simulated purchase of content ${contentId} for ${ethers.formatEther(price)} ETH`)
  }

  const handleSubscribe = async (contentId, subscriptionPrice) => {
    // Simulate subscribing to content
    alert(`Simulated subscription to content ${contentId} for ${ethers.formatEther(subscriptionPrice)} ETH/month`)
  }

  if (loading) {
    return <div className="text-center text-blue-200">Loading...</div>
  }

  return (
    <div className="bg-blue-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-200">Explore Content</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contents.map((content) => (
          <div key={content.id} className="bg-blue-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{content.title}</h2>
            <p className="text-blue-300 mb-4">Creator: {content.creator}</p>
            <a
              href={`https://ipfs.io/ipfs/${content.metadataHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline block mb-4"
            >
              View Content
            </a>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => handleLike(content.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Like
              </button>
              <span>{content.likes} Likes</span>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border rounded bg-blue-700 text-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(content.id, e.target.value)
                    e.target.value = ''
                  }
                }}
              />
            </div>
            <p className="mb-4">{content.comments} Comments</p>
            {content.isSubscriptionContent ? (
              <button
                onClick={() => handleSubscribe(content.id, content.subscriptionPrice)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full mb-2"
              >
                Subscribe for {ethers.formatEther(content.subscriptionPrice)} ETH/month
              </button>
            ) : (
              <button
                onClick={() => handlePurchase(content.id, content.price)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full mb-2"
              >
                Purchase for {ethers.formatEther(content.price)} ETH
              </button>
            )}
            {content.isFractionalized && (
              <p className="text-sm text-blue-300">Fractions available: {content.fractionsAvailable}</p>
            )}
            <p className="text-sm text-blue-300">Copyright: {content.copyright}</p>
            <p className="text-sm text-blue-300">Royalty: {content.royaltyPercentage}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

