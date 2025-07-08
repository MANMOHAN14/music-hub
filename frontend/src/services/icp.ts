import { Actor, HttpAgent, Identity } from '@dfinity/agent'
import { Principal } from '@dfinity/principal'
import { idlFactory } from './nftune_backend.did.js'

// Types from the backend
export interface User {
  principal: Principal
  name?: string
  email: string
  avatar_url?: string
  created_at: bigint
}

export interface Project {
  id: string
  owner: Principal
  name: string
  description?: string
  collaborators: string[]
  tracks: string[]
  nfts: string[]
  created_at: bigint
  updated_at: bigint
}

export interface Track {
  id: string
  project_id: string
  name: string
  ipfs_hash: string
  duration: bigint
  status: { Draft: null } | { Recording: null } | { Mixing: null } | { Completed: null }
  created_at: bigint
}

export interface NFT {
  id: string
  project_id: string
  creator: Principal
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

export interface Collaboration {
  id: string
  project_id: string
  user_principal: Principal
  contribution_percentage: number
  role: string
  joined_at: bigint
}

class ICPService {
  private actor: any = null
  private agent: HttpAgent | null = null
  private identity: Identity | null = null

  constructor() {
    this.initAgent()
  }

  private async initAgent() {
    const host = import.meta.env.VITE_DFX_NETWORK === 'local' 
      ? 'http://localhost:4943' 
      : 'https://ic0.app'

    this.agent = new HttpAgent({ host })

    // Fetch root key for local development
    if (import.meta.env.VITE_DFX_NETWORK === 'local') {
      await this.agent.fetchRootKey()
    }
  }

  setIdentity(identity: Identity | null) {
    this.identity = identity
    if (this.agent && identity) {
      this.agent.replaceIdentity(identity)
    }
    this.createActor()
  }

  private createActor() {
    if (!this.agent) return

    const canisterId = import.meta.env.VITE_NFTUNE_BACKEND_CANISTER_ID
    if (!canisterId) {
      console.error('Backend canister ID not found')
      return
    }

    this.actor = Actor.createActor(idlFactory, {
      agent: this.agent,
      canisterId,
    })
  }

  private async callMethod(method: string, ...args: any[]) {
    if (!this.actor) {
      throw new Error('Actor not initialized')
    }

    try {
      const result = await this.actor[method](...args)
      
      // Handle Result types from Rust
      if (result && typeof result === 'object' && 'Ok' in result) {
        return result.Ok
      } else if (result && typeof result === 'object' && 'Err' in result) {
        throw new Error(result.Err)
      }
      
      return result
    } catch (error) {
      console.error(`Error calling ${method}:`, error)
      throw error
    }
  }

  // Authentication methods
  async registerUser(name: string, email: string): Promise<User> {
    return this.callMethod('register_user', [name], email)
  }

  async getUser(): Promise<User> {
    return this.callMethod('get_user')
  }

  // Project methods
  async createProject(name: string, description?: string): Promise<Project> {
    return this.callMethod('create_project', name, description ? [description] : [])
  }

  async getProjects(): Promise<Project[]> {
    return this.callMethod('get_projects')
  }

  async getProject(id: string): Promise<Project> {
    return this.callMethod('get_project', id)
  }

  async updateProject(id: string, name?: string, description?: string): Promise<Project> {
    return this.callMethod('update_project', id, name ? [name] : [], description ? [description] : [])
  }

  // Track methods
  async addTrack(projectId: string, name: string, ipfsHash: string, duration: number): Promise<Track> {
    return this.callMethod('add_track', projectId, name, ipfsHash, BigInt(duration))
  }

  async getProjectTracks(projectId: string): Promise<Track[]> {
    return this.callMethod('get_project_tracks', projectId)
  }

  // NFT methods
  async createNFT(
    projectId: string,
    title: string,
    description?: string,
    price?: number,
    royaltyPercentage: number = 10,
    metadataUri: string = ''
  ): Promise<NFT> {
    return this.callMethod(
      'create_nft',
      projectId,
      title,
      description ? [description] : [],
      price ? [BigInt(price)] : [],
      royaltyPercentage,
      metadataUri
    )
  }

  async getNFTs(): Promise<NFT[]> {
    return this.callMethod('get_nfts')
  }

  async getNFT(id: string): Promise<NFT> {
    return this.callMethod('get_nft', id)
  }

  async getProjectNFTs(projectId: string): Promise<NFT[]> {
    return this.callMethod('get_project_nfts', projectId)
  }

  async mintNFT(id: string, tokenId: string, contractAddress: string): Promise<NFT> {
    return this.callMethod('mint_nft', id, tokenId, contractAddress)
  }

  // Collaboration methods
  async addCollaborator(
    projectId: string,
    userPrincipal: Principal,
    contributionPercentage: number,
    role: string
  ): Promise<Collaboration> {
    return this.callMethod('add_collaborator', projectId, userPrincipal, contributionPercentage, role)
  }

  async getProjectCollaborators(projectId: string): Promise<Collaboration[]> {
    return this.callMethod('get_project_collaborators', projectId)
  }

  async removeCollaborator(projectId: string, collaborationId: string): Promise<void> {
    return this.callMethod('remove_collaborator', projectId, collaborationId)
  }

  // System methods
  async getCanisterId(): Promise<Principal> {
    return this.callMethod('get_canister_id')
  }

  async getCaller(): Promise<Principal> {
    return this.callMethod('get_caller')
  }
}

export const icpService = new ICPService()