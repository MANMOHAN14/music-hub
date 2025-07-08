import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { icpService } from '../services/icp'
import toast from 'react-hot-toast'

interface Project {
  id: string
  owner: string
  name: string
  description?: string
  collaborators: string[]
  tracks: string[]
  nfts: string[]
  created_at: bigint
  updated_at: bigint
}

interface Track {
  id: string
  project_id: string
  name: string
  ipfs_hash: string
  duration: bigint
  status: 'Draft' | 'Recording' | 'Mixing' | 'Completed'
  created_at: bigint
}

interface NFT {
  id: string
  project_id: string
  creator: string
  title: string
  description?: string
  price?: bigint
  royalty_percentage: number
  metadata_uri: string
  token_id?: string
  contract_address?: string
  is_minted: boolean
  is_listed: boolean
  opensea_url?: string
  created_at: bigint
  updated_at: bigint
}

interface ProjectContextType {
  projects: Project[]
  currentProject: Project | null
  tracks: Track[]
  nfts: NFT[]
  isLoading: boolean
  fetchProjects: () => Promise<void>
  createProject: (name: string, description?: string) => Promise<Project>
  setCurrentProject: (project: Project | null) => void
  fetchProjectTracks: (projectId: string) => Promise<void>
  addTrack: (projectId: string, name: string, ipfsHash: string, duration: number) => Promise<Track>
  createNFT: (projectId: string, title: string, description?: string, price?: number, royaltyPercentage?: number, metadataUri?: string) => Promise<NFT>
  fetchNFTs: () => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}

interface ProjectProviderProps {
  children: ReactNode
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [nfts, setNFTs] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects()
      fetchNFTs()
    }
  }, [isAuthenticated])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const projectsData = await icpService.getProjects()
      setProjects(projectsData)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      toast.error('Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }

  const createProject = async (name: string, description?: string): Promise<Project> => {
    try {
      setIsLoading(true)
      const project = await icpService.createProject(name, description)
      setProjects(prev => [project, ...prev])
      toast.success('Project created successfully!')
      return project
    } catch (error) {
      console.error('Failed to create project:', error)
      toast.error('Failed to create project')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const fetchProjectTracks = async (projectId: string) => {
    try {
      const tracksData = await icpService.getProjectTracks(projectId)
      setTracks(tracksData)
    } catch (error) {
      console.error('Failed to fetch tracks:', error)
      toast.error('Failed to load tracks')
    }
  }

  const addTrack = async (projectId: string, name: string, ipfsHash: string, duration: number): Promise<Track> => {
    try {
      const track = await icpService.addTrack(projectId, name, ipfsHash, duration)
      setTracks(prev => [track, ...prev])
      toast.success('Track added successfully!')
      return track
    } catch (error) {
      console.error('Failed to add track:', error)
      toast.error('Failed to add track')
      throw error
    }
  }

  const createNFT = async (
    projectId: string,
    title: string,
    description?: string,
    price?: number,
    royaltyPercentage: number = 10,
    metadataUri: string = ''
  ): Promise<NFT> => {
    try {
      const nft = await icpService.createNFT(
        projectId,
        title,
        description,
        price,
        royaltyPercentage,
        metadataUri
      )
      setNFTs(prev => [nft, ...prev])
      toast.success('NFT created successfully!')
      return nft
    } catch (error) {
      console.error('Failed to create NFT:', error)
      toast.error('Failed to create NFT')
      throw error
    }
  }

  const fetchNFTs = async () => {
    try {
      const nftsData = await icpService.getNFTs()
      setNFTs(nftsData)
    } catch (error) {
      console.error('Failed to fetch NFTs:', error)
      toast.error('Failed to load NFTs')
    }
  }

  const value: ProjectContextType = {
    projects,
    currentProject,
    tracks,
    nfts,
    isLoading,
    fetchProjects,
    createProject,
    setCurrentProject,
    fetchProjectTracks,
    addTrack,
    createNFT,
    fetchNFTs,
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}