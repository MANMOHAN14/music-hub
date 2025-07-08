import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  FolderIcon,
  UserGroupIcon,
  MusicalNoteIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { useProject } from '../contexts/ProjectContext'
import CreateProjectModal from '../components/projects/CreateProjectModal'

const Projects: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const { projects, isLoading, fetchProjects, setCurrentProject } = useProject()
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects()
    }
  }, [isAuthenticated])

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleDateString()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FolderIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to view your projects</p>
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
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="gradient-text">My Projects</span>
              </h1>
              <p className="text-gray-400">
                Manage your music projects and collaborations
              </p>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Project
            </button>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-4 bg-dark-600 rounded mb-4"></div>
                  <div className="h-3 bg-dark-600 rounded mb-2"></div>
                  <div className="h-3 bg-dark-600 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16">
              <FolderIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
              <p className="text-gray-400 mb-6">
                Create your first project to start making music
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card hover:border-primary-500/50 transition-all duration-300 group cursor-pointer"
                  onClick={() => setCurrentProject(project)}
                >
                  <Link to={`/projects/${project.id}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-500/20 rounded-lg mr-3">
                          <MusicalNoteIcon className="h-6 w-6 text-primary-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary-400 transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {project.description || 'No description'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-400">
                        <UserGroupIcon className="h-4 w-4 mr-2" />
                        {project.collaborators.length + 1} collaborator{project.collaborators.length !== 0 ? 's' : ''}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-400">
                        <MusicalNoteIcon className="h-4 w-4 mr-2" />
                        {project.tracks.length} track{project.tracks.length !== 1 ? 's' : ''}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-400">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Created {formatDate(project.created_at)}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-dark-600">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">
                          {project.nfts.length} NFT{project.nfts.length !== 1 ? 's' : ''}
                        </span>
                        <span className="text-sm text-primary-400 group-hover:text-primary-300">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  )
}

export default Projects