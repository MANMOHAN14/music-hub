#!/bin/bash

# Check if user has cycles
echo "Checking cycles balance..."
dfx wallet --network ic balance

# Build frontend
echo "Building frontend for production..."
cd frontend
npm run build
cd ..

# Deploy to mainnet
echo "Deploying to IC mainnet..."
dfx deploy --network ic --with-cycles 1000000000000

# Get mainnet canister IDs
BACKEND_CANISTER_ID=$(dfx canister --network ic id nftune_backend)
FRONTEND_CANISTER_ID=$(dfx canister --network ic id nftune_frontend)

echo "Mainnet deployment complete!"
echo "Backend Canister ID: $BACKEND_CANISTER_ID"
echo "Frontend Canister ID: $FRONTEND_CANISTER_ID"
echo "Frontend URL: https://$FRONTEND_CANISTER_ID.ic0.app"

# Update production environment
echo "VITE_NFTUNE_BACKEND_CANISTER_ID=$BACKEND_CANISTER_ID" > frontend/.env.production
echo "VITE_INTERNET_IDENTITY_URL=https://identity.ic0.app" >> frontend/.env.production

echo "Update your frontend/.env.production file and redeploy frontend if needed"