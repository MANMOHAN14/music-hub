import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingBagIcon,
  CurrencyDollarIcon,
  EyeIcon,
  HeartIcon,
  FilterIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { useProject } from '../contexts/ProjectContext'

const Marketplace: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const { nfts, fetchNFTs } = useProject()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    fetchNFTs()
  }, [])

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'music', name: 'Music' },
    { id: 'beats', name: 'Beats' },
    { id: 'vocals', name: 'Vocals' },
    { id: 'instrumentals', name: 'Instrumentals' }
  ]

  const sortOptions = [
    { id: 'newest', name: 'Newest' },
    { id: 'oldest', name: 'Oldest' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' }
  ]

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (nft.description && nft.description.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch && nft.is_minted
  })

  const formatPrice = (price?: bigint) => {
    if (!price) return 'Not for sale'
    return `${Number(price) / 1000000} ICP`
  }

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleDateString()
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">NFT Marketplace</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover, collect, and trade unique music NFTs created by talented artists worldwide
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search NFTs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-full pl-10"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input w-full lg:w-48"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input w-full lg:w-48"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary-400 mb-1">
                {filteredNFTs.length}
              </div>
              <div className="text-sm text-gray-400">Total NFTs</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-secondary-400 mb-1">
                {filteredNFTs.filter(nft => nft.is_listed).length}
              </div>
              <div className="text-sm text-gray-400">For Sale</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {filteredNFTs.filter(nft => nft.price).length}
              </div>
              <div className="text-sm text-gray-400">With Price</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {new Set(filteredNFTs.map(nft => nft.creator.toString())).size}
              </div>
              <div className="text-sm text-gray-400">Artists</div>
            </div>
          </div>

          {/* NFT Grid */}
          {filteredNFTs.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBagIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No NFTs Found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'No NFTs available in the marketplace yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card hover:border-primary-500/50 transition-all duration-300 group cursor-pointer"
                >
                  {/* NFT Image Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl">🎵</div>
                  </div>

                  {/* NFT Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary-400 transition-colors line-clamp-1">
                        {nft.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {nft.description || 'No description available'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="font-semibold text-primary-400">
                          {formatPrice(nft.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Royalty</p>
                        <p className="font-semibold">{nft.royalty_percentage}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-dark-600">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-dark-600 rounded-lg transition-colors">
                          <HeartIcon className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-dark-600 rounded-lg transition-colors">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {nft.is_listed && nft.price ? (
                        <button className="btn-primary text-sm px-4 py-2">
                          <ShoppingBagIcon className="h-4 w-4 mr-1" />
                          Buy Now
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">Not for sale</span>
                      )}
                    </div>

                    {nft.opensea_url && (
                      <a
                        href={nft.opensea_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center text-sm text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        View on OpenSea →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          {isAuthenticated && (
            <div className="mt-16 text-center">
              <div className="card max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-4">Ready to Create Your Own NFT?</h3>
                <p className="text-gray-400 mb-6">
                  Turn your music into valuable NFTs and start earning from your creativity
                </p>
                <button className="btn-primary">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                  Create NFT
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Marketplace