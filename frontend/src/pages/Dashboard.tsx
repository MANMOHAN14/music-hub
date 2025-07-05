import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  MusicalNoteIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

const stats = [
  { name: 'Active Projects', value: '3', icon: MusicalNoteIcon, color: 'text-blue-600' },
  { name: 'Collaborators', value: '12', icon: UserGroupIcon, color: 'text-green-600' },
  { name: 'Total Tracks', value: '28', icon: ChartBarIcon, color: 'text-purple-600' },
  { name: 'Hours Recorded', value: '156', icon: ClockIcon, color: 'text-orange-600' },
]

const recentProjects = [
  {
    id: '1',
    name: 'Summer Vibes EP',
    description: 'Collaborative electronic music project',
    collaborators: 3,
    lastActivity: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Acoustic Sessions',
    description: 'Intimate acoustic recordings',
    collaborators: 1,
    lastActivity: '1 day ago',
    status: 'recording',
  },
  {
    id: '3',
    name: 'Hip-Hop Beats',
    description: 'Beat production collaboration',
    collaborators: 5,
    lastActivity: '3 days ago',
    status: 'mixing',
  },
]

const Dashboard: React.FC = () => {
  const { user } = useAuth()

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
            Welcome back, {user?.name || user?.email}!
          </motion.h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your music projects.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/projects?action=new"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200"
            >
              <PlusIcon className="h-6 w-6 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-700">New Project</span>
            </Link>
            <Link
              to="/studio"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200"
            >
              <MusicalNoteIcon className="h-6 w-6 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-700">Open Studio</span>
            </Link>
            <Link
              to="/projects"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200"
            >
              <UserGroupIcon className="h-6 w-6 text-gray-400 mr-3" />
              <span className="text-sm font-medium text-gray-700">Browse Projects</span>
            </Link>
          </div>
        </motion.div>

        {/* Recent Projects */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
            <Link
              to="/projects"
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      {project.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      project.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'recording'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                    <span>{project.collaborators} collaborators</span>
                    <span>•</span>
                    <span>Last activity {project.lastActivity}</span>
                  </div>
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="ml-4 btn-primary text-sm"
                >
                  Open
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard