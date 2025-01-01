'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export default function WalletConnect() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.listAccounts()
        if (accounts.length > 0) {
          setAddress(accounts[0].address)
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error)
    }
  }

  const connectWallet = async () => {
    try {
      setLoading(true)
      setError(null)
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const signer = await provider.getSigner()
          const address = await signer.getAddress()
          setAddress(address)
        } catch (ethereumError) {
          console.error('Ethereum error:', ethereumError)
          throw new Error(ethereumError.message || 'Failed to connect to Ethereum')
        }
      } else {
        throw new Error('Please install MetaMask to connect your wallet')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      setError(error.message || 'Failed to connect wallet. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const disconnectWallet = () => {
    setAddress('')
  }

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  if (error) {
    return (
      <div className="text-red-500 mb-2">
        <p>Error: {error}</p>
        <button
          onClick={() => {
            setError(null)
            connectWallet()
          }}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (address) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-green-500">Connected: {formatAddress(address)}</span>
        <button
          onClick={disconnectWallet}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={connectWallet}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-800"
    >
      {loading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}

