import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  PlayIcon, 
  PauseIcon, 
  StopIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  AdjustmentsHorizontalIcon,
  CloudArrowUpIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { useProject } from '../contexts/ProjectContext'
import toast from 'react-hot-toast'

const Studio: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const { currentProject, addTrack } = useProject()
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [trackName, setTrackName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please connect your wallet to access the studio')
    }
  }, [isAuthenticated])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      const chunks: BlobPart[] = []
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setRecordedBlob(blob)
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      startVisualization(stream)
      toast.success('Recording started!')
    } catch (error) {
      console.error('Error starting recording:', error)
      toast.error('Failed to start recording. Please check microphone permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      stopVisualization()
      toast.success('Recording stopped!')
    }
  }

  const playRecording = () => {
    if (recordedBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(recordedBlob)
      audioRef.current = new Audio(audioUrl)
      audioRef.current.play()
      setIsPlaying(true)
      
      audioRef.current.onended = () => {
        setIsPlaying(false)
      }
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const startVisualization = (stream: MediaStream) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const audioContext = new AudioContext()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaStreamSource(stream)
    
    source.connect(analyser)
    analyser.fftSize = 256
    
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)
      
      analyser.getByteFrequencyData(dataArray)
      
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const barWidth = (canvas.width / bufferLength) * 2.5
      let barHeight
      let x = 0
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height
        
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
        gradient.addColorStop(0, '#0ea5e9')
        gradient.addColorStop(1, '#d946ef')
        
        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
        
        x += barWidth + 1
      }
    }
    
    draw()
  }

  const stopVisualization = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const uploadToIPFS = async (blob: Blob): Promise<string> => {
    // Simulate IPFS upload - in production, integrate with Pinata or similar
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`QmHash${Date.now()}`) // Mock IPFS hash
      }, 2000)
    })
  }

  const saveTrack = async () => {
    if (!recordedBlob || !trackName.trim() || !currentProject) {
      toast.error('Please record audio, enter a track name, and select a project')
      return
    }

    try {
      setIsUploading(true)
      
      // Upload to IPFS
      const ipfsHash = await uploadToIPFS(recordedBlob)
      
      // Calculate duration (mock for now)
      const duration = 120 // seconds
      
      // Save track to backend
      await addTrack(currentProject.id, trackName.trim(), ipfsHash, duration)
      
      // Reset form
      setRecordedBlob(null)
      setTrackName('')
      toast.success('Track saved successfully!')
    } catch (error) {
      console.error('Error saving track:', error)
      toast.error('Failed to save track')
    } finally {
      setIsUploading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MusicalNoteIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400">Please connect your wallet to access the studio</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Music Studio</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Create, record, and produce your music with professional tools
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recording Section */}
            <div className="lg:col-span-2">
              <div className="card">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <MicrophoneIcon className="h-6 w-6 mr-2 text-primary-500" />
                  Recording Studio
                </h2>

                {/* Visualizer */}
                <div className="mb-6">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={200}
                    className="w-full h-32 bg-dark-900 rounded-lg border border-dark-600"
                  />
                </div>

                {/* Controls */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      isRecording
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-primary-600 hover:bg-primary-700 text-white'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <StopIcon className="h-5 w-5 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <MicrophoneIcon className="h-5 w-5 mr-2" />
                        Start Recording
                      </>
                    )}
                  </button>

                  {recordedBlob && (
                    <button
                      onClick={playRecording}
                      className="flex items-center px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg font-medium transition-colors"
                    >
                      {isPlaying ? (
                        <>
                          <PauseIcon className="h-5 w-5 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <PlayIcon className="h-5 w-5 mr-2" />
                          Play
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Track Details */}
                {recordedBlob && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Track Name
                      </label>
                      <input
                        type="text"
                        value={trackName}
                        onChange={(e) => setTrackName(e.target.value)}
                        className="input w-full"
                        placeholder="Enter track name"
                      />
                    </div>

                    <button
                      onClick={saveTrack}
                      disabled={isUploading || !currentProject}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? (
                        <>
                          <div className="spinner mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                          Save Track
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tools & Effects */}
            <div className="space-y-6">
              {/* Project Info */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Current Project</h3>
                {currentProject ? (
                  <div>
                    <p className="font-medium">{currentProject.name}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {currentProject.description || 'No description'}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400">No project selected</p>
                )}
              </div>

              {/* Effects Panel */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                  Effects
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Reverb
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Echo
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Distortion
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full btn-outline text-left">
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Share Project
                  </button>
                  <button className="w-full btn-outline text-left">
                    <MusicalNoteIcon className="h-4 w-4 mr-2" />
                    Export Audio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Studio