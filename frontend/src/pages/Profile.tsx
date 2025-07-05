import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  UserCircleIcon,
  CameraIcon,
  PencilIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate music producer and collaborator. Love creating electronic music with organic elements.',
    location: 'Los Angeles, CA',
    website: 'https://mymusic.com',
    genres: ['Electronic', 'House', 'Ambient']
  })

  const stats = [
    { name: 'Projects', value: '12', icon: MusicalNoteIcon },
    { name: 'Collaborations', value: '28', icon: UserGroupIcon },
    { name: 'Tracks Released', value: '45', icon: TrophyIcon },
  ]

  const recentTracks = [
    { id: '1', name: 'Sunset Dreams', project: 'Summer Vibes EP', plays: 1234 },
    { id: '2', name: 'Ocean Breeze', project: 'Summer Vibes EP', plays: 892 },
    { id: '3', name: 'Midnight Jazz', project: 'Jazz Fusion Experiment', plays: 567 },
  ]

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex items-start space-x-6">
            <div className="relative">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt="Profile"
                  className="h-24 w-24 rounded-full"
                />
              ) : (
                <UserCircleIcon className="h-24 w-24 text-gray-400" />
              )}
              <button className="absolute bottom-0 right-0 p-1 bg-primary-600 text-white rounded-full hover:bg-primary-700">
                <CameraIcon className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field text-2xl font-bold"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900">{formData.name}</h1>
                  )}
                  <p className="text-gray-600">{formData.email}</p>
                </div>
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="btn-primary flex items-center"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  {isEditing ? 'Save' : 'Edit Profile'}
                </button>
              </div>
              
              <div className="mt-4">
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="input-field w-full"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700">{formData.bio}</p>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
              <div className="space-y-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <stat.icon className="h-5 w-5 text-primary-600" />
                      <span className="text-gray-700">{stat.name}</span>
                    </div>
                    <span className="text-xl font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tracks</h2>
              <div className="space-y-4">
                {recentTracks.map((track) => (
                  <div key={track.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{track.name}</h3>
                      <p className="text-sm text-gray-500">{track.project}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{track.plays.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">plays</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Settings */}
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card mt-8"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Profile