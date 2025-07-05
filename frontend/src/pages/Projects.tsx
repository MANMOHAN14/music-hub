import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  UserGroupIcon,
  ClockIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'

const projects = [
  {
    id: '1',
    name: 'Summer Vibes EP',
    description: 'Collaborative electronic music project with tropical house influences',
    collaborators: 3,
    tracks: 5,
    lastActivity: '2 hours ago',
    status: 'active',
    genre: 'Electronic',
    owner: 'You',
  },
  {
    id: '2',
    name: 'Acoustic Sessions',
    description: 'Intimate acoustic recordings featuring guitar and vocals',
    collaborators: 1,
    tracks: 8,
    lastActivity: '1 day ago',
    status: 'recording',
    genre: 'Acoustic',
    owner: 'Sarah Chen',
  },
  {
    id: '3',
    name: 'Hip-Hop Beats',
    description: 'Beat production collaboration with modern trap influences',
    collaborators: 5,
    tracks: 12,
    lastActivity: '3 days ago',
    status: 'mixing',
    genre: 'Hip-Hop',
    owner: 'Mike Johnson',
  },
  {
    id: '4',
    name: 'Jazz Fusion Experiment',
    description: 'Experimental jazz fusion with electronic elements',
    collaborators: 2,
    tracks: 3,
    lastActivity: '1 week ago',
    status: 'draft',
    genre: 'Jazz',
    owner: 'You',
  },
]

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const genres = ['all', 'Electronic', 'Acoustic', 'Hip-Hop', 'Jazz', 'Rock', 'Pop']
  const statuses = ['all', 'active', 'recording', 'mixing', 'draft']

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || project.genre === selectedGenre
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus
    
    return matchesSearch && matchesGenre && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'recording': return 'bg-blue-100 text-blue-800'
      case 'mixing': return 'bg-yellow-100 text-yellow-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-900"
            >
              Projects
            </motion.h1>
            <p className="mt-2 text-gray-600">
              Manage your music projects and collaborations
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/projects/new" className="btn-primary flex items-center">
              <PlusIcon className="h-5 w-5 mr-2" />
              New Project
            </Link>
          </motion.div>
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
                  placeholder="Search projects..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Genre Filter */}
            <div>
              <select
                className="input-field"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? 'All Genres' : genre}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Status Filter */}
            <div>
              <select
                className="input-field"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="card hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {project.name}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    {project.collaborators}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {project.tracks} tracks
                  </div>
                </div>
                <span className="text-xs">{project.genre}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">
                    by {project.owner} • {project.lastActivity}
                  </p>
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="btn-primary text-sm"
                >
                  Open
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <MusicalNoteIcon className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedGenre !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your filters to see more projects.'
                : 'Get started by creating your first music project.'}
            </p>
            <Link to="/projects/new" className="btn-primary">
              Create New Project
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Projects