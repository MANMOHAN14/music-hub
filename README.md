# NFTune - ICP Music Collaboration Platform

NFTune is a decentralized music collaboration platform built on the Internet Computer Protocol (ICP). It allows musicians to collaborate on projects, store music on IPFS via Pinata, and create NFTs of their work.

## Features

- **Decentralized Authentication**: Uses Internet Identity for secure, passwordless authentication
- **Music Collaboration**: Real-time collaboration on music projects
- **IPFS Storage**: Store music files securely on IPFS using Pinata
- **NFT Creation**: Create and mint NFTs of your music projects
- **Revenue Sharing**: Automatic revenue distribution based on collaboration percentages
- **ICP Integration**: Fully integrated with Internet Computer canisters

## Architecture

- **Backend**: Rust canisters on ICP using stable memory for data persistence
- **Frontend**: React application deployed as an asset canister
- **Storage**: IPFS via Pinata for music and metadata storage
- **Authentication**: Internet Identity for secure user management

## Prerequisites

- [DFX](https://internetcomputer.org/docs/current/developer-docs/setup/install/) (Internet Computer SDK)
- [Node.js](https://nodejs.org/) (v16 or later)
- [Rust](https://rustup.rs/) (for canister development)

## Local Development

1. **Install dependencies**:
   ```bash
   # Install DFX
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

2. **Start local ICP network**:
   ```bash
   dfx start --background --clean
   ```

3. **Deploy canisters locally**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. **Access the application**:
   - The script will output the frontend URL
   - Use Internet Identity for authentication

## Mainnet Deployment

1. **Get cycles** (ICP's compute units):
   ```bash
   # You'll need ICP tokens to get cycles
   dfx ledger --network ic balance
   dfx ledger --network ic transfer --amount 1.0 --memo 0 <CYCLES_WALLET_CANISTER_ID>
   ```

2. **Deploy to mainnet**:
   ```bash
   chmod +x deploy-mainnet.sh
   ./deploy-mainnet.sh
   ```

## Configuration

### Environment Variables

Create `frontend/.env.local` for local development:
```
VITE_NFTUNE_BACKEND_CANISTER_ID=your_backend_canister_id
VITE_INTERNET_IDENTITY_URL=http://localhost:4943/?canister=rdmx6-jaaaa-aaaaa-aaadq-cai
```

For production, create `frontend/.env.production`:
```
VITE_NFTUNE_BACKEND_CANISTER_ID=your_mainnet_backend_canister_id
VITE_INTERNET_IDENTITY_URL=https://identity.ic0.app
```

### Pinata Configuration

To use Pinata for IPFS storage, you'll need to:
1. Create a [Pinata](https://pinata.cloud/) account
2. Get your API keys
3. Integrate them into your file upload functionality

## Project Structure

```
├── dfx.json                 # DFX configuration
├── Cargo.toml              # Rust workspace configuration
├── src/
│   └── nftune_backend/     # Backend canister
│       ├── src/
│       │   ├── lib.rs      # Main canister code
│       │   ├── types.rs    # Data types
│       │   ├── storage.rs  # Storage functions
│       │   ├── auth.rs     # Authentication
│       │   ├── projects.rs # Project management
│       │   ├── nfts.rs     # NFT functionality
│       │   └── collaborations.rs # Collaboration management
│       └── Cargo.toml      # Backend dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── services/
│   │   │   └── icp.ts      # ICP integration
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx # Authentication context
│   │   └── pages/          # React pages
│   └── package.json
├── deploy.sh              # Local deployment script
└── deploy-mainnet.sh      # Mainnet deployment script
```

## Key Changes from Original

1. **Removed PostgreSQL/Diesel**: Replaced with ICP stable memory
2. **Removed Express/Actix backend**: Replaced with ICP Rust canisters
3. **Added Internet Identity**: Secure, passwordless authentication
4. **ICP Integration**: Full integration with Internet Computer infrastructure
5. **Candid Interface**: Type-safe communication between frontend and backend
6. **Asset Canister**: Frontend deployed as ICP asset canister

## Development Commands

```bash
# Start local ICP network
dfx start --background

# Deploy locally
dfx deploy

# Check canister status
dfx canister status --all

# View canister logs
dfx canister logs nftune_backend

# Stop local network
dfx stop
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `dfx deploy`
5. Submit a pull request

## License

MIT License - see LICENSE file for details