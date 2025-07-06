import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  PhotoIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const CreateNFT: React.FC = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    royaltyPercentage: '10',
    image: null as File | null
  })
  
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Create, 2: Mint, 3: List
  const [nftData, setNftData] = useState<any>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleCreateNFT = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock API call - replace with actual implementation
      const response = await fetch('/api/v1/nfts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          project_id: projectId,
          title: formData.title,
          description: formData.description,
          price: formData.price ? parseFloat(formData.price) : null,
          royalty_percentage: parseFloat(formData.royaltyPercentage)
        })
      })

      if (response.ok) {
        const nft = await response.json()
        setNftData(nft)
        setStep(2)
      }
    } catch (error) {
      console.error('Error creating NFT:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMintNFT = async () => {
    setLoading(true)

    try {
      // Mock minting process - in real app, this would interact with blockchain
      const response = await fetch(`/api/v1/nfts/${nftData.id}/mint`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          contract_address: '0x123456789abcdef',
          token_id: Math.floor(Math.random() * 10000).toString()
        })
      })

      if (response.ok) {
        const result = await response.json()
        setNftData(prev => ({ ...prev, ...result }))
        setStep(3)
      }
    } catch (error) {
      console.error('Error minting NFT:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleListNFT = async () => {
    setLoading(true)

    try {
      // Mock listing process - in real app, this would list on OpenSea
      setTimeout(() => {
        setLoading(false)
        navigate('/marketplace')
      }, 2000)
    } catch (error) {
      console.error('Error listing NFT:', error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > stepNumber ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepNumber ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {stepNumber === 1 ? 'Create' : stepNumber === 2 ? 'Mint' : 'List'}
                </span>
                {stepNumber < 3 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Create NFT */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create NFT</h2>
            
            <form onSubmit={handleCreateNFT} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NFT Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                  {formData.image ? (
                    <div className="space-y-2">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="NFT Preview"
                        className="mx-auto h-32 w-32 object-cover rounded-lg"
                      />
                      <p className="text-sm text-gray-600">{formData.image.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="text-sm text-gray-600">
                        <label htmlFor="image-upload" className="cursor-pointer text-primary-600 hover:text-primary-500">
                          Upload an image
                        </label>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="input-field"
                  placeholder="Enter NFT title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="input-field"
                  placeholder="Describe your NFT..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (ETH)
                </label>
                <div className="relative">
                  <CurrencyDollarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.001"
                    min="0"
                    className="input-field pl-10"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Leave empty for non-sale NFT</p>
              </div>

              {/* Royalty Percentage */}
              <div>
                <label htmlFor="royaltyPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                  Royalty Percentage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="royaltyPercentage"
                    name="royaltyPercentage"
                    min="0"
                    max="50"
                    className="input-field"
                    value={formData.royaltyPercentage}
                    onChange={handleInputChange}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
                <div className="flex items-start mt-2">
                  <InformationCircleIcon className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-xs text-gray-600">
                    Royalties will be automatically distributed to collaborators based on their contribution percentage.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.title}
                className="w-full btn-primary"
              >
                {loading ? 'Creating NFT...' : 'Create NFT'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Step 2: Mint NFT */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mint NFT</h2>
            
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">NFT</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{formData.title}</h3>
              <p className="text-gray-600">{formData.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Minting Details</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Network: Ethereum Mainnet</p>
                <p>Standard: ERC-721</p>
                <p>Gas Fee: ~$15-30 (estimated)</p>
              </div>
            </div>

            <button
              onClick={handleMintNFT}
              disabled={loading}
              className="w-full btn-primary mb-4"
            >
              {loading ? 'Minting...' : 'Mint NFT'}
            </button>
            
            <p className="text-xs text-gray-500">
              This will create your NFT on the blockchain. Make sure you have enough ETH for gas fees.
            </p>
          </motion.div>
        )}

        {/* Step 3: List NFT */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">List on OpenSea</h2>
            
            <div className="mb-6">
              <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">NFT Minted Successfully!</h3>
              <p className="text-gray-600">Token ID: {nftData?.token_id}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Listing Details</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Marketplace: OpenSea</p>
                <p>Price: {formData.price ? `${formData.price} ETH` : 'Not for sale'}</p>
                <p>Royalty: {formData.royaltyPercentage}%</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleListNFT}
                disabled={loading}
                className="w-full btn-primary"
              >
                {loading ? 'Listing on OpenSea...' : 'List on OpenSea'}
              </button>
              
              <button
                onClick={() => navigate('/marketplace')}
                className="w-full btn-secondary"
              >
                View in Marketplace
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CreateNFT