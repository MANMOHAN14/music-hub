import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Principal } from '@dfinity/principal'
import { icpService, User } from '../services/icp'

interface AuthContextType {
  user: User | null
  principal: Principal | null
  login: () => Promise<boolean>
  register: (name: string, email: string) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  isAuthenticated: boolean
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
  const [principal, setPrincipal] = useState<Principal | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    initAuth()
  }, [])

  const initAuth = async () => {
    try {
      await icpService.init()
      const authenticated = await icpService.isAuthenticated()
      
      if (authenticated) {
        const userPrincipal = icpService.getPrincipal()
        if (userPrincipal) {
          setPrincipal(userPrincipal)
          setIsAuthenticated(true)
          
          try {
            const userData = await icpService.getUser()
            setUser(userData)
          } catch (error) {
            console.log('User not registered yet')
          }
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (): Promise<boolean> => {
    try {
      setLoading(true)
      const success = await icpService.login()
      
      if (success) {
        const userPrincipal = icpService.getPrincipal()
        if (userPrincipal) {
          setPrincipal(userPrincipal)
          setIsAuthenticated(true)
          
          try {
            const userData = await icpService.getUser()
            setUser(userData)
          } catch (error) {
            console.log('User not registered yet')
          }
        }
      }
      
      return success
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string) => {
    try {
      setLoading(true)
      const userData = await icpService.registerUser(name || null, email)
      setUser(userData)
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await icpService.logout()
      setUser(null)
      setPrincipal(null)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    principal,
    login,
    register,
    logout,
    loading,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}