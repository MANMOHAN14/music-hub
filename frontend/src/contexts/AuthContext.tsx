import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthClient } from '@dfinity/auth-client'
import { Identity } from '@dfinity/agent'
import { Principal } from '@dfinity/principal'
import toast from 'react-hot-toast'
import { icpService } from '../services/icp'

interface User {
  principal: Principal
  name?: string
  email: string
  avatar_url?: string
  created_at: bigint
}

interface AuthContextType {
  user: User | null
  identity: Identity | null
  isAuthenticated: boolean
  isLoading: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authClient, setAuthClient] = useState<AuthClient | null>(null)

  useEffect(() => {
    initAuth()
  }, [])

  const initAuth = async () => {
    try {
      const client = await AuthClient.create()
      setAuthClient(client)

      if (await client.isAuthenticated()) {
        const identity = client.getIdentity()
        setIdentity(identity)
        setIsAuthenticated(true)
        
        // Initialize ICP service with identity
        icpService.setIdentity(identity)
        
        // Fetch user data
        await fetchUser()
      }
    } catch (error) {
      console.error('Auth initialization failed:', error)
      toast.error('Authentication initialization failed')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUser = async () => {
    try {
      const userData = await icpService.getUser()
      if (userData) {
        setUser(userData)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  const login = async () => {
    if (!authClient) return

    try {
      setIsLoading(true)
      
      const internetIdentityUrl = import.meta.env.VITE_INTERNET_IDENTITY_URL || 
        'https://identity.ic0.app'

      await authClient.login({
        identityProvider: internetIdentityUrl,
        onSuccess: async () => {
          const identity = authClient.getIdentity()
          setIdentity(identity)
          setIsAuthenticated(true)
          
          // Initialize ICP service with identity
          icpService.setIdentity(identity)
          
          // Try to fetch existing user
          try {
            await fetchUser()
          } catch (error) {
            // User doesn't exist, they need to register
            console.log('User not found, needs to register')
          }
          
          toast.success('Successfully logged in!')
        },
        onError: (error) => {
          console.error('Login failed:', error)
          toast.error('Login failed')
        }
      })
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    if (!authClient) return

    try {
      await authClient.logout()
      setUser(null)
      setIdentity(null)
      setIsAuthenticated(false)
      icpService.setIdentity(null)
      toast.success('Successfully logged out!')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed')
    }
  }

  const register = async (name: string, email: string) => {
    if (!isAuthenticated) {
      toast.error('Please login first')
      return
    }

    try {
      setIsLoading(true)
      const userData = await icpService.registerUser(name, email)
      setUser(userData)
      toast.success('Registration successful!')
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Registration failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    identity,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}