import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  UserGroupIcon,
  MusicalNoteIcon,
  PlusIcon,
  ShareIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { useProject } from '../contexts/ProjectContext'
import { icpService } from '../services/icp'
import CreateNFTModal from '../components/nft/CreateNFTModal'
import AddCollaboratorModal from '../components/collaboration/AddCollaboratorModal'

interface ProjectDetailData {
  project: any
  tracks: any[]
  nfts: any[]
  collaborators: any[]
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { setCurrentProject } = useProject()
  const [data, setData] = useState<ProjectDetailData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateNFTModal, setShowCreateNFTModal] = useState(false)
  const [showAddCollaboratorModal, setShowAddCollaboratorModal] = useState(false)
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchProjectData(id)
    }
  }, [id])

  const fetchProjectData = async (projectId: string) => {
    try {
      setIsLoading(true)
      const [project, tracks, nfts, collaborators] = await Promise.all([
        icpService.getProject(projectId),
        icpService.getProjectTracks(projectId),
        icpService.getProjectNFTs(projectId),
        icpService.getProjectCollaborators(projectId)
      ])

      setData({ project, tracks, nfts, collaborators })
      setCurrentProject(project)
    } catch (error) {
      console.error('Failed to fetch project data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleDateString()
  }

  const formatDuration = (seconds: bigint) => {
    const mins = Math.floor(Number(seconds) / 60)
    const secs = Number(seconds) % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTrackStatus = (status: any) => {
    if (status.Draft !== undefined) return 'Draft'
    if (status.Recording !== undefined) return 'Recording'
    if (status.Mixing !== undefined) return 'Mixing'
    if (status.Completed !== undefined) return 'Completed'
    return 'Unknown'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'text-gray-400'
      case 'Recording': return 'text-red-400'
      case 'Mixing': return 'text-yellow-400'
      case 'Completed': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-dark-600 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="card">
                  <div className="h-6 bg-dark-600 rounded mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-4 bg-dark-600 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="card">
                  <div className="h-6 bg-dark-600 rounded mb-4"></div>
                  <div className="h-20 bg-dark-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-gray-400 mb-4">The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const { project, tracks, nfts, collaborators } = data

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link
              to="/projects"
              className="flex items-center text-gray-400 hover:text-white mr-4"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Back to Projects
            </Link>
          </div>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {project.name}
              </h1>
              <p className="text-gray-400 text-lg mb-4">
                {project.description || 'No description provided'}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>Created {formatDate(project.created_at)}</span>
                <span className="mx-2">•</span>
                <span>Updated {formatDate(project.updated_at)}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="btn-outline">
                <ShareIcon className="h-4 w-4 mr-2" />
                Share
              </button>
              <Link to="/studio" className="btn-primary">
                <MusicalNoteIcon className="h-4 w-4 mr-2" />
                Open in Studio
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tracks */}
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Tracks</h2>
                  <Link to="/studio" className="btn-primary text-sm">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Track
                  </Link>
                </div>

                {tracks.length === 0 ? (
                  <div className="text-center py-8">
                    <MusicalNoteIcon className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No tracks yet</p>
                    <Link to="/studio" className="btn-primary mt-4 text-sm">
                      Record First Track
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tracks.map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors"
                      >
                        <div className="flex items-center">
                          <button
                            onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
                            className="p-2 bg-primary-600 hover:bg-primary-700 rounded-full mr-4"
                          >
                            {playingTrack === track.id ? (
                              <PauseIcon className="h-4 w-4" />
                            ) : (
                              <PlayIcon className="h-4 w-4" />
                            )}
                          </button>
                          <div>
                            <h3 className="font-medium">{track.name}</h3>
                            <p className="text-sm text-gray-400">
                              {formatDuration(track.duration)} • {' '}
                              <span className={getStatusColor(getTrackStatus(track.status))}>
                                {getTrackStatus(track.status)}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          {formatDate(track.created_at)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* NFTs */}
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">NFTs</h2>
                  <button
                    onClick={() => setShowCreateNFTModal(true)}
                    className="btn-primary text-sm"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Create NFT
                  </button>
                </div>

                {nfts.length === 0 ? (
                  <div className="text-center py-8">
                    <CurrencyDollarIcon className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No NFTs created yet</p>
                    <button
                      onClick={() => setShowCreateNFTModal(true)}
                      className="btn-primary mt-4 text-sm"
                    >
                      Create First NFT
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {nfts.map((nft) => (
                      <div
                        key={nft.id}
                        className="p-4 bg-dark-700 rounded-lg border border-dark-600"
                      >
                        <h3 className="font-medium mb-2">{nft.title}</h3>
                        <p className="text-sm text-gray-400 mb-3">
                          {nft.description || 'No description'}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">
                            {nft.royalty_percentage}% royalty
                          </span>
                          <span className={`text-sm px-2 py-1 rounded ${
                            nft.is_minted ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {nft.is_minted ? 'Minted' : 'Draft'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Stats */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Project Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tracks</span>
                    <span className="font-medium">{tracks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">NFTs</span>
                    <span className="font-medium">{nfts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Collaborators</span>
                    <span className="font-medium">{collaborators.length + 1}</span>
                  </div>
                </div>
              </div>

              {/* Collaborators */}
              <div className="card">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Collaborators</h3>
                  <button
                    onClick={() => setShowAddCollaboratorModal(true)}
                    className="btn-primary text-sm"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Project Owner */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                        <UserGroupIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Owner</p>
                        <p className="text-xs text-gray-400">
                          {project.owner.toString().slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-primary-400">100%</span>
                  </div>

                  {/* Collaborators */}
                  {collaborators.map((collab) => (
                    <div key={collab.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center mr-3">
                          <UserGroupIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{collab.role}</p>
                          <p className="text-xs text-gray-400">
                            {collab.user_principal.toString().slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-secondary-400">
                        {collab.contribution_percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <CreateNFTModal
        isOpen={showCreateNFTModal}
        onClose={() => setShowCreateNFTModal(false)}
        projectId={project?.id}
      />

      <AddCollaboratorModal
        isOpen={showAddCollaboratorModal}
        onClose={() => setShowAddCollaboratorModal(false)}
        projectId={project?.id}
        onCollaboratorAdded={() => fetchProjectData(project.id)}
      />
    </div>
  )
}

export default ProjectDetail