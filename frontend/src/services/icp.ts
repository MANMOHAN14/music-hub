import { Actor, HttpAgent } from '@dfinity/agent'
import { AuthClient } from '@dfinity/auth-client'
import { Principal } from '@dfinity/principal'
import { idlFactory } from './nftune_backend.did.js'

// Canister IDs - these will be set after deployment
const NFTUNE_BACKEND_CANISTER_ID = process.env.VITE_NFTUNE_BACKEND_CANISTER_ID || 'rrkah-fqaaa-aaaaa-aaaaq-cai'
const INTERNET_IDENTITY_URL = process.env.VITE_INTERNET_IDENTITY_URL || 'https://identity.ic0.app'

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

export interface Track {
  id: string
  project_id: string
  name: string
  ipfs_hash: string
  duration: bigint
  status: { Draft: null } | { Recording: null } | { Mixing: null } | { Completed: null }
  created_at: bigint
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
  private authClient: AuthClient | null = null
  private actor: any = null
  private agent: HttpAgent | null = null

  async init() {
    this.authClient = await AuthClient.create()
    
    // Create agent
    this.agent = new HttpAgent({
      host: process.env.NODE_ENV === 'production' ? 'https://ic0.app' : 'http://localhost:4943'
    })

    // Fetch root key for local development
    if (process.env.NODE_ENV !== 'production') {
      await this.agent.fetchRootKey()
    }

    // Create actor
    this.actor = Actor.createActor(idlFactory, {
      agent: this.agent,
      canisterId: NFTUNE_BACKEND_CANISTER_ID,
    })

    // Check if user is already authenticated
    if (await this.authClient.isAuthenticated()) {
      const identity = this.authClient.getIdentity()
      this.agent.replaceIdentity(identity)
      this.actor = Actor.createActor(idlFactory, {
        agent: this.agent,
        canisterId: NFTUNE_BACKEND_CANISTER_ID,
      })
    }
  }

  async login(): Promise<boolean> {
    if (!this.authClient) throw new Error('Auth client not initialized')

    return new Promise((resolve) => {
      this.authClient!.login({
        identityProvider: INTERNET_IDENTITY_URL,
        onSuccess: async () => {
          const identity = this.authClient!.getIdentity()
          this.agent!.replaceIdentity(identity)
          this.actor = Actor.createActor(idlFactory, {
            agent: this.agent!,
            canisterId: NFTUNE_BACKEND_CANISTER_ID,
          })
          resolve(true)
        },
        onError: () => resolve(false),
      })
    })
  }

  async logout() {
    if (!this.authClient) throw new Error('Auth client not initialized')
    await this.authClient.logout()
    
    // Reset to anonymous identity
    this.agent = new HttpAgent({
      host: process.env.NODE_ENV === 'production' ? 'https://ic0.app' : 'http://localhost:4943'
    })
    
    if (process.env.NODE_ENV !== 'production') {
      await this.agent.fetchRootKey()
    }

    this.actor = Actor.createActor(idlFactory, {
      agent: this.agent,
      canisterId: NFTUNE_BACKEND_CANISTER_ID,
    })
  }

  async isAuthenticated(): Promise<boolean> {
    if (!this.authClient) return false
    return await this.authClient.isAuthenticated()
  }

  getPrincipal(): Principal | null {
    if (!this.authClient) return null
    return this.authClient.getIdentity().getPrincipal()
  }

  // User methods
  async registerUser(name: string | null, email: string): Promise<User> {
    const result = await this.actor.register_user(name ? [name] : [], email)
    if ('Err' in result) throw new Error(result.Err)
    return result.Ok
  }

  async getUser(): Promise<User> {
    const result = await this.actor.get_user()
    if ('Err' in result) throw new Error(result.Err)
    return result.Ok
  }

  // Project methods
  async createProject(name: string, description?: string): Promise<Project> {
    const result = await this.actor.create_project(name, description ? [description] : [])
    if ('Err' in result) throw new Error(result.Err)
    return result.Ok
  }

  async getProjects(): Promise<Project[]> {
    return await this.actor.get_projects()
  }

  async getProject(id: string): Promise<Project> {
    const result = await this.actor.get_project(id)
    if ('Err' in result) throw new Error(result.Err)
    return result.Ok
  }

  async updateProject(id: string, name?: string, description?: string): Promise<Project> {
    const result = await this.actor.update_project(
      id,
      name ? [name] : [],
      description ? [description] : []
    )
    if ('Err' in result) throw new Error(result.Err)
    return result.Ok
  }

  // Track methods
  async addTrack(projectId: string, name: string, ipfsHash: string, duration: number): Promise<Track> {
    const result = await this.actor.add_track(projectId, name, ipfsHash, BigInt(duration))
    if ('Err' in result) throw new Error(result.Err)
    return result.Ok
  }

  async getProjectTracks(projectId: string): Promise<Track[]> {
    return await this.actor.get_project_tracks(projectId)
  }

  // NFT methods
  async createNFT(
    projectId: string,
    title: string,
    description: string | null,
    price: number | null,
    royaltyPercentage: number,
    metadataUri: string
  ): Promise<NFT> {
    const result = await this.actor.create_nft(
      projectId,
      title,
      description ? [description] : [],
      price ? [BigInt(price)] : [],
      royaltyPercentage,
      metadataUri
    )
    if ('Err' in result) throw new Error(result.Err)
    return result.Ok
  }

  async getNFTs(): Promise<NFT[]> {
    return await this.actor.get_nfts()
  }

  async getNFT(id: string): Promise<NFT> {
    const result = await this.actor.get_nft(id)
    if ('Err' in result) throw new Error(result.Err)
    return result.Ok
  }

  async getProjectNFTs(projectId: string): Promise<NFT[]> {
    return await this.actor.get_project_nfts(projectId)
  }

  async mintNFT(id: string, tokenId: string, contractAddress: string): Promise<NFT> {
    const result = await this.actor.mint_nft(id, tokenId, contractAddress)
    if ('Err' in result) throw new Error(result.Err)
    return result.Ok
  }

  // Collaboration methods
  async addCollaborator(
    projectId: string,
    userPrincipal: Principal,
    contributionPercentage: number,
    role: string
  ): Promise<Collaboration> {
    const result = await this.actor.add_collaborator(
      projectId,
      userPrincipal,
      contributionPercentage,
      role
    )
    if ('Err' in result) throw new Error(result.Err)
    return result.Ok
  }

  async getProjectCollaborators(projectId: string): Promise<Collaboration[]> {
    return await this.actor.get_project_collaborators(projectId)
  }

  async removeCollaborator(projectId: string, collaborationId: string): Promise<void> {
    const result = await this.actor.remove_collaborator(projectId, collaborationId)
    if ('Err' in result) throw new Error(result.Err)
  }
}

export const icpService = new ICPService()