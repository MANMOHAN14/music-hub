import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MusicalNoteIcon, 
  UserGroupIcon, 
  CloudArrowUpIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Collaborative Studio',
    description: 'Work together in real-time with musicians from around the world.',
    icon: UserGroupIcon,
  },
  {
    name: 'Blockchain Storage',
    description: 'Your music is stored securely on the ICP blockchain.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Rights Protection',
    description: 'Maintain full ownership and control of your creative work.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Direct Revenue',
    description: 'Keep 100% of your earnings without intermediaries.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Global Distribution',
    description: 'Reach audiences worldwide through decentralized networks.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Professional Tools',
    description: 'Access industry-standard music production capabilities.',
    icon: MusicalNoteIcon,
  },
]

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-400 to-accent-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Revolutionizing music collaboration on the blockchain.{' '}
              <Link to="/register" className="font-semibold text-primary-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Get started <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              Create Music Together on the{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Blockchain
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              NFTune is the first decentralized music collaboration platform built on ICP. 
              Collaborate with artists worldwide, maintain full ownership of your work, 
              and distribute directly to your audience.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link to="/register" className="btn-primary text-lg px-8 py-3">
                Start Creating
              </Link>
              <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Sign in <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-accent-400 to-primary-400 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      {/* Features section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Everything you need
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The future of music collaboration
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Built for musicians, by musicians. NFTune provides all the tools you need 
              to create, collaborate, and distribute your music in the decentralized world.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-16"
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to revolutionize your music?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
              Join thousands of artists already creating on NFTune. 
              Start your musical journey on the blockchain today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started for free
              </Link>
              <Link to="/login" className="text-sm font-semibold leading-6 text-white">
                Sign in <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home