'use client'

import { useState } from 'react'
import { ethers } from 'ethers'

// Add your contract ABI and address here
const CONTRACT_ABI = [/* Your contract ABI */];
const CONTRACT_ADDRESS = '0x...'; // Your contract address

export default function CreateContent() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [price, setPrice] = useState('')
  const [copyright, setCopyright] = useState('all-rights-reserved')
  const [isSubscriptionContent, setIsSubscriptionContent] = useState(false)
  const [subscriptionPrice, setSubscriptionPrice] = useState('')
  const [collaborators, setCollaborators] = useState([''])
  const [collaboratorShares, setCollaboratorShares] = useState([''])
  const [royaltyPercentage, setRoyaltyPercentage] = useState('10')
  const [isFractionalized, setIsFractionalized] = useState(false)
  const [fractionsAvailable, setFractionsAvailable] = useState('100')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // For this example, we'll use a placeholder for content and file hashes
      const contentHash = 'QmPlaceholderContentHash'
      const fileHash = file ? 'QmPlaceholderFileHash' : ''

      const metadata = {
        title,
        contentHash,
        fileHash,
        copyright,
        price: ethers.parseEther(price),
        isSubscriptionContent,
        subscriptionPrice: isSubscriptionContent ? ethers.parseEther(subscriptionPrice) : '0',
        collaborators,
        collaboratorShares: collaboratorShares.map(share => parseInt(share)),
        royaltyPercentage: parseInt(royaltyPercentage),
        isFractionalized,
        fractionsAvailable: isFractionalized ? parseInt(fractionsAvailable) : 0,
        timestamp: Date.now()
      }

      // For this example, we'll use a placeholder for metadata hash
      const metadataHash = 'QmPlaceholderMetadataHash'

      // Connect to Ethereum and create content
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

        const tx = await contract.createContent(
          title,
          metadataHash,
          ethers.parseEther(price),
          copyright,
          isSubscriptionContent,
          ethers.parseEther(subscriptionPrice),
          collaborators,
          collaboratorShares.map(share => parseInt(share)),
          parseInt(royaltyPercentage),
          isFractionalized,
          isFractionalized ? parseInt(fractionsAvailable) : 0
        )

        await tx.wait()

        alert(`Content created successfully!`)
      } else {
        throw new Error('Ethereum object not found, do you have MetaMask installed?')
      }
    } catch (error) {
      console.error('Error creating content:', error)
      alert('Error creating content. Please try again.')
    }

    setLoading(false)
  }

  const addCollaborator = () => {
    setCollaborators([...collaborators, ''])
    setCollaboratorShares([...collaboratorShares, ''])
  }

  const removeCollaborator = (index: number) => {
    const newCollaborators = collaborators.filter((_, i) => i !== index)
    const newShares = collaboratorShares.filter((_, i) => i !== index)
    setCollaborators(newCollaborators)
    setCollaboratorShares(newShares)
  }

  return (
    <div className="max-w-2xl mx-auto bg-blue-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Content</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded bg-blue-700 bg-opacity-50 text-white"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded h-32 bg-blue-700 bg-opacity-50 text-white"
          ></textarea>
        </div>
        <div>
          <label htmlFor="file" className="block mb-1">Attach File (optional)</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-white"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1">Price (ETH)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.001"
            min="0"
            className="w-full px-3 py-2 border rounded bg-blue-700 bg-opacity-50 text-white"
          />
        </div>
        <div>
          <label htmlFor="copyright" className="block mb-1">Copyright</label>
          <select
            id="copyright"
            value={copyright}
            onChange={(e) => setCopyright(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-blue-700 bg-opacity-50 text-white"
          >
            <option value="all-rights-reserved">All Rights Reserved</option>
            <option value="cc-by">Creative Commons Attribution</option>
            <option value="cc-by-sa">Creative Commons Attribution-ShareAlike</option>
            <option value="cc-by-nc">Creative Commons Attribution-NonCommercial</option>
          </select>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isSubscriptionContent}
              onChange={(e) => setIsSubscriptionContent(e.target.checked)}
              className="mr-2"
            />
            Offer as subscription content
          </label>
        </div>
        {isSubscriptionContent && (
          <div>
            <label htmlFor="subscriptionPrice" className="block mb-1">Subscription Price (ETH/month)</label>
            <input
              type="number"
              id="subscriptionPrice"
              value={subscriptionPrice}
              onChange={(e) => setSubscriptionPrice(e.target.value)}
              required
              step="0.001"
              min="0"
              className="w-full px-3 py-2 border rounded bg-blue-700 bg-opacity-50 text-white"
            />
          </div>
        )}
        <div>
          <label htmlFor="royaltyPercentage" className="block mb-1">Royalty Percentage</label>
          <input
            type="number"
            id="royaltyPercentage"
            value={royaltyPercentage}
            onChange={(e) => setRoyaltyPercentage(e.target.value)}
            required
            min="0"
            max="100"
            className="w-full px-3 py-2 border rounded bg-blue-700 bg-opacity-50 text-white"
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isFractionalized}
              onChange={(e) => setIsFractionalized(e.target.checked)}
              className="mr-2"
            />
            Offer as fractionalized NFT
          </label>
        </div>
        {isFractionalized && (
          <div>
            <label htmlFor="fractionsAvailable" className="block mb-1">Number of Fractions</label>
            <input
              type="number"
              id="fractionsAvailable"
              value={fractionsAvailable}
              onChange={(e) => setFractionsAvailable(e.target.value)}
              required
              min="2"
              className="w-full px-3 py-2 border rounded bg-blue-700 bg-opacity-50 text-white"
            />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold mb-2">Collaborators</h3>
          {collaborators.map((collaborator, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={collaborator}
                onChange={(e) => {
                  const newCollaborators = [...collaborators]
                  newCollaborators[index] = e.target.value
                  setCollaborators(newCollaborators)
                }}
                placeholder="Collaborator address"
                className="flex-grow px-3 py-2 border rounded bg-blue-700 bg-opacity-50 text-white"
              />
              <input
                type="number"
                value={collaboratorShares[index]}
                onChange={(e) => {
                  const newShares = [...collaboratorShares]
                  newShares[index] = e.target.value
                  setCollaboratorShares(newShares)
                }}
                placeholder="Share %"
                className="w-24 px-3 py-2 border rounded bg-blue-700 bg-opacity-50 text-white"
              />
              <button
                type="button"
                onClick={() => removeCollaborator(index)}
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCollaborator}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add Collaborator
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Creating...' : 'Create Content'}
        </button>
      </form>
    </div>
  )
}

