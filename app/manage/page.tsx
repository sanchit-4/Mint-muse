'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

// Sample data
const SAMPLE_CONTENTS = [
  {
    id: 1,
    title: "Digital Art Masterpiece",
    price: ethers.parseEther("0.5"),
    copyright: "All Rights Reserved",
    earnings: ethers.parseEther("2.5"),
    likes: 150,
    comments: 23,
  },
  {
    id: 2,
    title: "Exclusive Music Album",
    price: ethers.parseEther("0.1"),
    copyright: "Creative Commons",
    earnings: ethers.parseEther("1.2"),
    likes: 300,
    comments: 45,
  },
  // Add more sample content items here
];

export default function ManagePage() {
  const [contents, setContents] = useState(SAMPLE_CONTENTS)
  const [loading, setLoading] = useState(false)

  const handleUpdateCopyright = async (contentId, newCopyright) => {
    // Simulate updating copyright
    setContents(contents.map(content => 
      content.id === contentId ? {...content, copyright: newCopyright} : content
    ))
    alert('Copyright updated successfully!')
  }

  const handleUpdatePrice = async (contentId, newPrice) => {
    // Simulate updating price
    setContents(contents.map(content => 
      content.id === contentId ? {...content, price: ethers.parseEther(newPrice)} : content
    ))
    alert('Price updated successfully!')
  }

  if (loading) {
    return <div className="text-center text-blue-200">Loading...</div>
  }

  return (
    <div className="bg-blue-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-200">Manage Your Content</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contents.map((content) => (
          <div key={content.id} className="bg-blue-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">{content.title}</h2>
            <p className="text-blue-300 mb-4">Current Copyright: {content.copyright}</p>
            <div className="mb-4">
              <label htmlFor={`copyright-${content.id}`} className="block mb-2 text-blue-200">Update Copyright</label>
              <select
                id={`copyright-${content.id}`}
                className="w-full px-3 py-2 border rounded bg-blue-700 text-white"
                onChange={(e) => handleUpdateCopyright(content.id, e.target.value)}
              >
                <option value="all-rights-reserved">All Rights Reserved</option>
                <option value="cc-by">Creative Commons Attribution</option>
                <option value="cc-by-sa">Creative Commons Attribution-ShareAlike</option>
                <option value="cc-by-nc">Creative Commons Attribution-NonCommercial</option>
              </select>
            </div>
            <p className="text-blue-300 mb-4">Current Price: {ethers.formatEther(content.price)} ETH</p>
            <div className="mb-4">
              <label htmlFor={`price-${content.id}`} className="block mb-2 text-blue-200">Update Price (ETH)</label>
              <input
                type="number"
                id={`price-${content.id}`}
                className="w-full px-3 py-2 border rounded bg-blue-700 text-white"
                step="0.001"
                min="0"
                onBlur={(e) => handleUpdatePrice(content.id, e.target.value)}
              />
            </div>
            <div className="mt-6">
              <p className="text-blue-200">Total Earnings: {ethers.formatEther(content.earnings)} ETH</p>
              <p className="text-blue-200">Total Likes: {content.likes}</p>
              <p className="text-blue-200">Total Comments: {content.comments}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

