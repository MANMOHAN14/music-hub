import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  UserCircleIcon,
  PencilIcon,
  MusicalNoteIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CalendarIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { useProject } from '../contexts/ProjectContext'
import toast from 'react-hot-toast'

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const { projects, nfts } = useProject()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedEmail, setEditedEmail] = useState('')

  useEffect(() => {
    if (user) {
      setEditedName(user.name || '')
      setEditedEmail(user.email || '')
    }
  }, [user])

  const handleSaveProfile = () => {
    // In a real implementation, this would call an update user function
    toast.success('Profile updated successfully!')
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    if (user) {
      setEditedName(user.name || '')
      setEditedEmail(user.email || '')
    }
    setIsEditing(false)
  }

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleDateString()
  }

  const userProjects = projects.filter(project => 
    project.owner.toString() === user?.principal.toString()
  )

  const userNFTs = nfts.filter(nft => 
    nft.creator.toString() === user?.principal.toString()
  )

  const collaboratedProjects = projects.filter(project => 
    project.collaborators.includes(user?.principal.toString() || '')
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <UserCircleIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to view your profile</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <UserCircleIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
          <p className="text-gray-400">Please complete your registration to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Header */}
          <div className="card mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-6">
                  <UserCircleIcon className="h-12 w-12 text-white" />
                </div>
                <div>
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="input text-xl font-bold"
                        placeholder="Display Name"
                      />
                      <input
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="input"
                        placeholder="Email Address"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        {user.name || 'Anonymous User'}
                      </h1>
                      <p className="text-gray-400 mb-2">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        Principal: {user.principal.toString().slice(0, 20)}...
                      </p>
                      <p className="text-sm text-gray-500">
                        Member since {formatDate(user.created_at)}
                      </p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="btn-primary text-sm"
                    >
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="btn-outline text-sm"
                    >
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-outline text-sm"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-primary-500 mb-2">
                <MusicalNoteIcon className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold mb-1">{userProjects.length}</div>
              <div className="text-gray-400 text-sm">Projects Created</div>
            </div>
            
            <div className="card text-center">
              <div className="text-secondary-500 mb-2">
                <UserGroupIcon className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold mb-1">{collaboratedProjects.length}</div>
              <div className="text-gray-400 text-sm">Collaborations</div>
            </div>
            
            <div className="card text-center">
              <div className="text-green-500 mb-2">
                <CurrencyDollarIcon className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold mb-1">{userNFTs.length}</div>
              <div className="text-gray-400 text-sm">NFTs Created</div>
            </div>
            
            <div className="card text-center">
              <div className="text-yellow-500 mb-2">
                <CalendarIcon className="h-8 w-8 mx-auto" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {Math.floor((Date.now() - Number(user.created_at) / 1000000) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-gray-400 text-sm">Days Active</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Projects */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Recent Projects</h2>
              {userProjects.length === 0 ? (
                <div className="text-center py-8">
                  <MusicalNoteIcon className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">No projects created yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userProjects.slice(0, 3).map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 bg-dark-700 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-gray-400">
                          {project.tracks.length} tracks • {project.collaborators.length} collaborators
                        </p>
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatDate(project.created_at)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent NFTs */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Recent NFTs</h2>
              {userNFTs.length === 0 ? (
                <div className="text-center py-8">
                  <CurrencyDollarIcon className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">No NFTs created yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userNFTs.slice(0, 3).map((nft) => (
                    <div
                      key={nft.id}
                      className="flex items-center justify-between p-4 bg-dark-700 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{nft.title}</h3>
                        <p className="text-sm text-gray-400">
                          {nft.royalty_percentage}% royalty
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm px-2 py-1 rounded ${
                          nft.is_minted ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {nft.is_minted ? 'Minted' : 'Draft'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Collaborations */}
          {collaboratedProjects.length > 0 && (
            <div className="card mt-8">
              <h2 className="text-xl font-semibold mb-6">Collaborations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collaboratedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 bg-dark-700 rounded-lg"
                  >
                    <h3 className="font-medium mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Owner: {project.owner.toString().slice(0, 8)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        {project.tracks.length} tracks
                      </span>
                      <span className="text-sm text-secondary-400">
                        Collaborator
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Profile