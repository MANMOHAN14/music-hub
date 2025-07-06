import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  CurrencyDollarIcon,
  HeartIcon,
  ShareIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface NFT {
  id: string
  project_id: string
  project_name: string
  creator_id: string
  creator_name: string
  token_id?: string
  contract_address?: string
  title: string
  description?: string
  price?: number
  royalty_percentage: number
  is_minted: boolean
  is_listed: boolean
  opensea_url?: string
  image_url: string
  created_at: string
}

const NFTMarketplace: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchNFTs()
  }, [])

  const fetchNFTs = async () => {
    try {
      // Mock data - replace with actual API call
      const mockNFTs: NFT[] = [
        {
          id: '1',
          project_id: '1',
          project_name: 'Summer Vibes EP',
          creator_id: '1',
          creator_name: 'Sarah Chen',
          token_id: '1',
          contract_address: '0x123...',
          title: 'Summer Vibes Exclusive',
          description: 'Exclusive NFT featuring the complete Summer Vibes EP with bonus tracks',
          price: 0.5,
          royalty_percentage: 10,
          is_minted: true,
          is_listed: true,
          opensea_url: 'https://opensea.io/assets/...',
          image_url: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400',
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: '2',
          project_id: '2',
          project_name: 'Acoustic Sessions',
          creator_id: '2',
          creator_name: 'Mike Johnson',
          token_id: '2',
          contract_address: '0x456...',
          title: 'Intimate Acoustic Collection',
          description: 'Raw acoustic recordings with exclusive behind-the-scenes content',
          price: 0.3,
          royalty_percentage: 15,
          is_minted: true,
          is_listed: true,
          opensea_url: 'https://opensea.io/assets/...',
          image_url: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400',
          created_at: '2024-01-10T15:30:00Z'
        },
        {
          id: '3',
          project_id: '3',
          project_name: 'Hip-Hop Beats',
          creator_id: '3',
          creator_name: 'DJ Alex',
          title: 'Beat Pack Genesis',
          description: 'First edition beat pack with commercial licensing rights',
          price: 1.2,
          royalty_percentage: 12,
          is_minted: false,
          is_listed: false,
          image_url: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400',
          created_at: '2024-01-05T09:15:00Z'
        }
      ]
      setNfts(mockNFTs)
    } catch (error) {
      console.error('Error fetching NFTs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.creator_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'low' && (nft.price || 0) < 0.5) ||
                        (priceFilter === 'medium' && (nft.price || 0) >= 0.5 && (nft.price || 0) < 1) ||
                        (priceFilter === 'high' && (nft.price || 0) >= 1)
    
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'minted' && nft.is_minted) ||
                         (statusFilter === 'listed' && nft.is_listed) ||
                         (statusFilter === 'draft' && !nft.is_minted)
    
    return matchesSearch && matchesPrice && matchesStatus
  })

  const toggleFavorite = (nftId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(nftId)) {
      newFavorites.delete(nftId)
    } else {
      newFavorites.add(nftId)
    }
    setFavorites(newFavorites)
  }

  const getStatusBadge = (nft: NFT) => {
    if (!nft.is_minted) {
      return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Draft</span>
    }
    if (nft.is_listed) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Listed</span>
    }
    return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Minted</span>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            NFT Marketplace
          </motion.h1>
          <p className="mt-2 text-gray-600">
            Discover and collect exclusive music NFTs from talented artists
          </p>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search NFTs..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Price Filter */}
            <div>
              <select
                className="input-field"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="low">Under 0.5 ETH</option>
                <option value="medium">0.5 - 1 ETH</option>
                <option value="high">Above 1 ETH</option>
              </select>
            </div>
            
            {/* Status Filter */}
            <div>
              <select
                className="input-field"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="listed">Listed</option>
                <option value="minted">Minted</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* NFT Image */}
              <div className="relative aspect-square">
                <img
                  src={nft.image_url}
                  alt={nft.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  {getStatusBadge(nft)}
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button
                    onClick={() => toggleFavorite(nft.id)}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    {favorites.has(nft.id) ? (
                      <HeartSolidIcon className="h-4 w-4 text-red-500" />
                    ) : (
                      <HeartIcon className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <ShareIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* NFT Details */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{nft.title}</h3>
                  <p className="text-sm text-gray-500">by {nft.creator_name}</p>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {nft.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-500">
                    Royalty: {nft.royalty_percentage}%
                  </div>
                  {nft.price && (
                    <div className="flex items-center text-lg font-semibold text-gray-900">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                      {nft.price} ETH
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  {nft.is_listed && nft.price ? (
                    <button className="flex-1 btn-primary text-sm">
                      Buy Now
                    </button>
                  ) : nft.is_minted ? (
                    <button className="flex-1 btn-secondary text-sm">
                      Make Offer
                    </button>
                  ) : (
                    <button className="flex-1 btn-secondary text-sm">
                      Coming Soon
                    </button>
                  )}
                  
                  {nft.opensea_url && (
                    <a
                      href={nft.opensea_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <GlobeAltIcon className="h-4 w-4 text-gray-600" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNFTs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <CurrencyDollarIcon className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No NFTs found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters to see more NFTs.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default NFTMarketplace