import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  PlayIcon,
  PauseIcon,
  UserGroupIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  ShareIcon,
  PlusIcon,
  CurrencyDollarIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'
import { collaborationsAPI, nftsAPI } from '../services/api'

interface Collaborator {
  id: string
  user_id: string
  user_name: string
  user_email: string
  contribution_percentage: number
  role: string
  joined_at: string
}

interface ProjectNFT {
  id: string
  title: string
  description?: string
  price?: number
  royalty_percentage: number
  is_minted: boolean
  is_listed: boolean
  opensea_url?: string
  created_at: string
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams()
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [projectNFTs, setProjectNFTs] = useState<ProjectNFT[]>([])
  const [showAddCollaborator, setShowAddCollaborator] = useState(false)
  const [newCollaborator, setNewCollaborator] = useState({
    email: '',
    role: '',
    contribution: 0
  })

  // Mock data - replace with actual API call
  const project = {
    id: '1',
    name: 'Summer Vibes EP',
    description: 'Collaborative electronic music project with tropical house influences. This project explores the fusion of electronic beats with organic instruments to create a unique summer sound.',
    tracks: [
      { id: '1', name: 'Sunset Dreams', duration: '3:45', status: 'completed', waveform: true },
      { id: '2', name: 'Ocean Breeze', duration: '4:12', status: 'mixing', waveform: true },
      { id: '3', name: 'Island Nights', duration: '3:28', status: 'recording', waveform: false },
      { id: '4', name: 'Golden Hour', duration: '4:01', status: 'draft', waveform: false },
      { id: '5', name: 'Tropical Storm', duration: '3:55', status: 'completed', waveform: true },
    ],
    branches: [
      { id: '1', name: 'main', commits: 12, lastActivity: '2 hours ago' },
      { id: '2', name: 'experimental', commits: 5, lastActivity: '1 day ago' },
      { id: '3', name: 'vocals-only', commits: 3, lastActivity: '3 days ago' },
    ],
    recentActivity: [
      { id: '1', user: 'Sarah Chen', action: 'uploaded new vocal track', time: '2 hours ago' },
      { id: '2', user: 'You', action: 'mixed "Ocean Breeze"', time: '4 hours ago' },
      { id: '3', user: 'Mike Johnson', action: 'added guitar layers', time: '1 day ago' },
    ]
  }

  useEffect(() => {
    if (id) {
      fetchCollaborators()
      fetchProjectNFTs()
    }
  }, [id])

  const fetchCollaborators = async () => {
    try {
      const response = await collaborationsAPI.getByProject(id!)
      setCollaborators(response.data)
    } catch (error) {
      console.error('Error fetching collaborators:', error)
      // Mock data for demo
      setCollaborators([
        {
          id: '1',
          user_id: '1',
          user_name: 'Sarah Chen',
          user_email: 'sarah@example.com',
          contribution_percentage: 30,
          role: 'Vocalist',
          joined_at: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          user_id: '2',
          user_name: 'Mike Johnson',
          user_email: 'mike@example.com',
          contribution_percentage: 25,
          role: 'Guitarist',
          joined_at: '2024-01-02T00:00:00Z'
        }
      ])
    }
  }

  const fetchProjectNFTs = async () => {
    try {
      const response = await nftsAPI.getByProject(id!)
      setProjectNFTs(response.data)
    } catch (error) {
      console.error('Error fetching project NFTs:', error)
      // Mock data for demo
      setProjectNFTs([
        {
          id: '1',
          title: 'Summer Vibes Exclusive',
          description: 'Complete EP with bonus tracks',
          price: 0.5,
          royalty_percentage: 10,
          is_minted: true,
          is_listed: true,
          opensea_url: 'https://opensea.io/assets/...',
          created_at: '2024-01-15T00:00:00Z'
        }
      ])
    }
  }

  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await collaborationsAPI.add(id!, {
        user_email: newCollaborator.email,
        contribution_percentage: newCollaborator.contribution,
        role: newCollaborator.role
      })
      setShowAddCollaborator(false)
      setNewCollaborator({ email: '', role: '', contribution: 0 })
      fetchCollaborators()
    } catch (error) {
      console.error('Error adding collaborator:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'mixing': return 'bg-yellow-100 text-yellow-800'
      case 'recording': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <p className="mt-2 text-gray-600 max-w-3xl">{project.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn-secondary flex items-center">
                <ShareIcon className="h-5 w-5 mr-2" />
                Share
              </button>
              <button className="btn-secondary flex items-center">
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                Settings
              </button>
              <Link to={`/studio/${id}`} className="btn-primary flex items-center">
                Open Studio
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tracks */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Tracks</h2>
              <div className="space-y-4">
                {project.tracks.map((track, index) => (
                  <div key={track.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <button className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700">
                        <PlayIcon className="h-4 w-4" />
                      </button>
                      <div>
                        <h3 className="font-medium text-gray-900">{track.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{track.duration}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(track.status)}`}>
                            {track.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    {track.waveform && (
                      <div className="waveform">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="waveform-bar" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* NFTs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">NFTs</h2>
                <Link 
                  to={`/projects/${id}/nft/create`}
                  className="btn-primary flex items-center text-sm"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create NFT
                </Link>
              </div>
              
              {projectNFTs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectNFTs.map((nft) => (
                    <div key={nft.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{nft.title}</h3>
                          <p className="text-sm text-gray-500">{nft.description}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            nft.is_listed ? 'bg-green-100 text-green-800' : 
                            nft.is_minted ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {nft.is_listed ? 'Listed' : nft.is_minted ? 'Minted' : 'Draft'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {nft.price && (
                            <span className="flex items-center">
                              <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                              {nft.price} ETH
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {nft.royalty_percentage}% royalty
                        </div>
                      </div>
                      
                      {nft.opensea_url && (
                        <a
                          href={nft.opensea_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 block text-center btn-secondary text-sm"
                        >
                          View on OpenSea
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PhotoIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No NFTs yet</h3>
                  <p className="text-gray-500 mb-4">Create your first NFT to monetize this project</p>
                  <Link 
                    to={`/projects/${id}/nft/create`}
                    className="btn-primary"
                  >
                    Create NFT
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Branches */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Branches</h2>
              <div className="space-y-3">
                {project.branches.map((branch) => (
                  <div key={branch.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{branch.name}</h3>
                      <p className="text-sm text-gray-500">
                        {branch.commits} commits • Last activity {branch.lastActivity}
                      </p>
                    </div>
                    <button className="btn-secondary text-sm">
                      Switch
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Collaborators */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Collaborators</h2>
                <button
                  onClick={() => setShowAddCollaborator(true)}
                  className="btn-secondary text-sm flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add
                </button>
              </div>
              
              <div className="space-y-3">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {collaborator.user_name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{collaborator.user_name}</p>
                        <p className="text-sm text-gray-500">{collaborator.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {collaborator.contribution_percentage}%
                      </p>
                      <p className="text-xs text-gray-500">contribution</p>
                    </div>
                  </div>
                ))}
              </div>

              {showAddCollaborator && (
                <form onSubmit={handleAddCollaborator} className="mt-4 pt-4 border-t border-gray-200">
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="input-field text-sm"
                      value={newCollaborator.email}
                      onChange={(e) => setNewCollaborator(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g., Vocalist, Producer)"
                      className="input-field text-sm"
                      value={newCollaborator.role}
                      onChange={(e) => setNewCollaborator(prev => ({ ...prev, role: e.target.value }))}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Contribution %"
                      min="0"
                      max="100"
                      className="input-field text-sm"
                      value={newCollaborator.contribution}
                      onChange={(e) => setNewCollaborator(prev => ({ ...prev, contribution: parseInt(e.target.value) }))}
                      required
                    />
                    <div className="flex space-x-2">
                      <button type="submit" className="btn-primary text-sm flex-1">
                        Add
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowAddCollaborator(false)}
                        className="btn-secondary text-sm flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {project.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary-600 mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail