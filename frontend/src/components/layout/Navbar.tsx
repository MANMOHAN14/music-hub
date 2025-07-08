import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Bars3Icon, 
  XMarkIcon, 
  MusicalNoteIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../../contexts/AuthContext'
import RegisterModal from '../auth/RegisterModal'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const { user, isAuthenticated, login, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Studio', href: '/studio' },
    { name: 'Projects', href: '/projects' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Collaborate', href: '/collaborate' },
  ]

  const handleAuthAction = async () => {
    if (isAuthenticated) {
      if (!user) {
        setShowRegisterModal(true)
      } else {
        await logout()
      }
    } else {
      await login()
    }
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-dark-900/95 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <MusicalNoteIcon className="h-8 w-8 text-primary-500" />
                <span className="text-xl font-bold gradient-text">NFTune</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user && (
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="text-sm">{user.name || 'Profile'}</span>
                </Link>
              )}
              
              <button
                onClick={handleAuthAction}
                className="flex items-center space-x-2 btn-primary"
              >
                {isAuthenticated ? (
                  <>
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <span>{user ? 'Logout' : 'Complete Setup'}</span>
                  </>
                ) : (
                  <span>Connect Wallet</span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white"
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-dark-800 border-t border-dark-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.href
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 pb-2 border-t border-dark-700">
                {isAuthenticated && user && (
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                    <span>{user.name || 'Profile'}</span>
                  </Link>
                )}
                
                <button
                  onClick={() => {
                    handleAuthAction()
                    setIsOpen(false)
                  }}
                  className="w-full mt-2 btn-primary"
                >
                  {isAuthenticated ? (user ? 'Logout' : 'Complete Setup') : 'Connect Wallet'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </>
  )
}

export default Navbar