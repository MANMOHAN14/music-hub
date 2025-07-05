import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  PlayIcon,
  PauseIcon,
  UserGroupIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  ShareIcon
} from '@heroicons/react/24/outline'

const ProjectDetail: React.FC = () => {
  const { id } = useParams()

  // Mock data - replace with actual API call
  const project = {
    id: '1',
    name: 'Summer Vibes EP',
    description: 'Collaborative electronic music project with tropical house influences. This project explores the fusion of electronic beats with organic instruments to create a unique summer sound.',
    collaborators: [
      { id: '1', name: 'You', role: 'Producer', avatar: null },
      { id: '2', name: 'Sarah Chen', role: 'Vocalist', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
      { id: '3', name: 'Mike Johnson', role: 'Guitarist', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' },
    ],
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

            {/* Branches */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Collaborators</h2>
              <div className="space-y-3">
                {project.collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center space-x-3">
                    {collaborator.avatar ? (
                      <img
                        src={collaborator.avatar}
                        alt={collaborator.name}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {collaborator.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{collaborator.name}</p>
                      <p className="text-sm text-gray-500">{collaborator.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 btn-secondary text-sm">
                Invite Collaborator
              </button>
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