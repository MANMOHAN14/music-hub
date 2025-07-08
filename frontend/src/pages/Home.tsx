import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MusicalNoteIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  ShieldCheckIcon,
  PlayIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const Home: React.FC = () => {
  const features = [
    {
      icon: MusicalNoteIcon,
      title: 'Decentralized Studio',
      description: 'Create and produce music with professional-grade tools, all stored securely on the blockchain.'
    },
    {
      icon: UserGroupIcon,
      title: 'Real-time Collaboration',
      description: 'Work with musicians worldwide in real-time, with transparent contribution tracking.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Fair Revenue Sharing',
      description: 'Automatic revenue distribution based on contribution percentages, powered by smart contracts.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Full Ownership Rights',
      description: 'Retain complete control and ownership of your music with immutable blockchain records.'
    }
  ]

  const stats = [
    { label: 'Active Musicians', value: '10K+' },
    { label: 'Tracks Created', value: '50K+' },
    { label: 'NFTs Minted', value: '5K+' },
    { label: 'Revenue Shared', value: '$2M+' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900/20">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Decentralized</span>
              <br />
              Music Collaboration
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create, collaborate, and monetize your music on the blockchain. 
              Join the future of music production with full ownership and fair revenue sharing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/studio" className="btn-primary text-lg px-8 py-3">
                <PlayIcon className="h-5 w-5 mr-2" />
                Start Creating
              </Link>
              <Link to="/marketplace" className="btn-outline text-lg px-8 py-3">
                Explore Marketplace
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">NFTune</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the next generation of music creation with blockchain-powered tools 
              that put artists first.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:border-primary-500/50 transition-all duration-300 group"
              >
                <div className="text-primary-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600/20 to-secondary-600/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Music Career?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of musicians already creating and collaborating on NFTune. 
              Start your decentralized music journey today.
            </p>
            <Link to="/studio" className="btn-primary text-lg px-8 py-3 inline-flex items-center">
              Get Started Now
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home