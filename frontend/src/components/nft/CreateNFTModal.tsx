import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { useProject } from '../../contexts/ProjectContext'
import toast from 'react-hot-toast'

interface CreateNFTModalProps {
  isOpen: boolean
  onClose: () => void
  projectId?: string
}

const CreateNFTModal: React.FC<CreateNFTModalProps> = ({ isOpen, onClose, projectId }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [royaltyPercentage, setRoyaltyPercentage] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const { createNFT } = useProject()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !projectId) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setIsLoading(true)
      const priceValue = price ? parseFloat(price) * 1000000 : undefined // Convert to e8s
      await createNFT(
        projectId,
        title.trim(),
        description.trim() || undefined,
        priceValue,
        royaltyPercentage,
        '' // metadata URI will be generated
      )
      onClose()
      setTitle('')
      setDescription('')
      setPrice('')
      setRoyaltyPercentage(10)
    } catch (error) {
      console.error('Failed to create NFT:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-dark-800 rounded-xl p-6 w-full max-w-md border border-dark-700">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-xl font-semibold text-white flex items-center">
              <CurrencyDollarIcon className="h-6 w-6 mr-2 text-primary-500" />
              Create NFT
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                NFT Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full"
                placeholder="Enter NFT title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input w-full h-24 resize-none"
                placeholder="Describe your NFT (optional)"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                Price (ICP)
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input w-full"
                placeholder="0.0"
                step="0.01"
                min="0"
              />
            </div>

            <div>
              <label htmlFor="royalty" className="block text-sm font-medium text-gray-300 mb-2">
                Royalty Percentage: {royaltyPercentage}%
              </label>
              <input
                type="range"
                id="royalty"
                value={royaltyPercentage}
                onChange={(e) => setRoyaltyPercentage(parseInt(e.target.value))}
                className="w-full"
                min="0"
                max="50"
                step="1"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span>50%</span>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-4 border border-dark-600 text-gray-300 rounded-lg hover:bg-dark-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create NFT'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default CreateNFTModal