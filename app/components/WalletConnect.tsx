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
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.listAccounts()
        if (accounts.length > 0) {
          setAddress(accounts[0])
        }
      } else {
        setError('Ethereum object not found. Please install MetaMask.')
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error)
      setError('Failed to check wallet connection. Please try again.')
    }
  }

  const connectWallet = async () => {
    try {
      setLoading(true)
      setError(null)
      if (typeof window !== 'undefined' && window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
      } else {
        setError('Ethereum object not found. Please install MetaMask.')
        window.open('https://metamask.io/download/', '_blank')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      setError('Failed to connect wallet. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  return (
    <div>
      {error && (
        <div className="text-red-500 mb-2">
          {error}
        </div>
      )}
      <button
        onClick={connectWallet}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-800"
      >
        {loading ? (
          'Connecting...'
        ) : address ? (
          formatAddress(address)
        ) : (
          'Connect Wallet'
        )}
      </button>
    </div>
  )
}

