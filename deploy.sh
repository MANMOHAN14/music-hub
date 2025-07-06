#!/bin/bash

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Deploy to local network first
echo "Deploying to local network..."
dfx start --background --clean
dfx deploy

# Get canister IDs
BACKEND_CANISTER_ID=$(dfx canister id nftune_backend)
FRONTEND_CANISTER_ID=$(dfx canister id nftune_frontend)

echo "Backend Canister ID: $BACKEND_CANISTER_ID"
echo "Frontend Canister ID: $FRONTEND_CANISTER_ID"

# Update frontend environment
echo "VITE_NFTUNE_BACKEND_CANISTER_ID=$BACKEND_CANISTER_ID" > frontend/.env.local
echo "VITE_INTERNET_IDENTITY_URL=http://localhost:4943/?canister=rdmx6-jaaaa-aaaaa-aaadq-cai" >> frontend/.env.local

# Rebuild and redeploy frontend with correct canister ID
cd frontend
npm run build
cd ..
dfx deploy nftune_frontend

echo "Local deployment complete!"
echo "Frontend URL: http://localhost:4943/?canister=$FRONTEND_CANISTER_ID"