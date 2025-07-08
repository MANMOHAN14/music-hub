import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Studio from './pages/Studio'
import Profile from './pages/Profile'
import NFTMarketplace from './pages/NFTMarketplace'
import CreateNFT from './pages/CreateNFT'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marketplace" element={<NFTMarketplace />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/projects" element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        } />
        <Route path="/projects/:id" element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        } />
        <Route path="/projects/:projectId/nft/create" element={
          <ProtectedRoute>
            <CreateNFT />
          </ProtectedRoute>
        } />
        <Route path="/studio" element={
          <ProtectedRoute>
            <Studio />
          </ProtectedRoute>
        } />
        <Route path="/studio/:id" element={
          <ProtectedRoute>
            <Studio />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App