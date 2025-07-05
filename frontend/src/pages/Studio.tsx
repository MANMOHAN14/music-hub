import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PlayIcon,
  PauseIcon,
  StopIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  AdjustmentsHorizontalIcon,
  DocumentArrowUpIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline'

const Studio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentTime, setCurrentTime] = useState('00:00')
  const [totalTime] = useState('04:32')

  const tracks = [
    { id: '1', name: 'Drums', volume: 75, muted: false, solo: false, color: 'bg-red-500' },
    { id: '2', name: 'Bass', volume: 60, muted: false, solo: false, color: 'bg-blue-500' },
    { id: '3', name: 'Guitar', volume: 80, muted: false, solo: false, color: 'bg-green-500' },
    { id: '4', name: 'Vocals', volume: 90, muted: false, solo: false, color: 'bg-purple-500' },
    { id: '5', name: 'Synth', volume: 65, muted: true, solo: false, color: 'bg-yellow-500' },
  ]

  const effects = [
    { name: 'Reverb', active: true },
    { name: 'Delay', active: false },
    { name: 'Chorus', active: true },
    { name: 'Distortion', active: false },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MusicalNoteIcon className="h-6 w-6 text-primary-400" />
              <h1 className="text-xl font-semibold">NFTune Studio</h1>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">Summer Vibes EP</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
              Save
            </button>
            <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm">
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Track Panel */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Tracks</h2>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm">
              <DocumentArrowUpIcon className="h-4 w-4 mr-2" />
              Add Track
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {tracks.map((track) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${track.color}`}></div>
                    <span className="font-medium">{track.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className={`px-2 py-1 text-xs rounded ${track.muted ? 'bg-red-600' : 'bg-gray-600'}`}>
                      M
                    </button>
                    <button className={`px-2 py-1 text-xs rounded ${track.solo ? 'bg-yellow-600' : 'bg-gray-600'}`}>
                      S
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <SpeakerWaveIcon className="h-4 w-4 text-gray-400" />
                  <div className="flex-1 bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${track.volume}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 w-8">{track.volume}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Studio Area */}
        <div className="flex-1 flex flex-col">
          {/* Timeline */}
          <div className="h-32 bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-400">Timeline</div>
              <div className="text-sm text-gray-300">{currentTime} / {totalTime}</div>
            </div>
            <div className="relative bg-gray-700 rounded-lg h-16 overflow-hidden">
              {/* Waveform visualization */}
              <div className="absolute inset-0 flex items-center justify-center space-x-1 px-4">
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-primary-400 rounded-full"
                    style={{
                      width: '2px',
                      height: `${Math.random() * 40 + 10}px`,
                      opacity: 0.7
                    }}
                  />
                ))}
              </div>
              {/* Playhead */}
              <div className="absolute top-0 left-1/4 w-0.5 h-full bg-white"></div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center justify-center space-x-4">
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={`p-3 rounded-full ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                <MicrophoneIcon className="h-6 w-6" />
              </button>
              
              <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600">
                <StopIcon className="h-6 w-6" />
              </button>
              
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-4 rounded-full bg-primary-600 hover:bg-primary-700"
              >
                {isPlaying ? (
                  <PauseIcon className="h-8 w-8" />
                ) : (
                  <PlayIcon className="h-8 w-8" />
                )}
              </button>
            </div>
          </div>

          {/* Effects Panel */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Effects */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                  Effects
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {effects.map((effect) => (
                    <div
                      key={effect.name}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        effect.active 
                          ? 'border-primary-500 bg-primary-500/10' 
                          : 'border-gray-600 bg-gray-700'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-medium">{effect.name}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {effect.active ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mixer */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Master Mix</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Master Volume</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-600 rounded-full h-3">
                        <div className="bg-primary-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-sm text-gray-300 w-8">75</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Tempo</label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        value="120" 
                        className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm w-20"
                      />
                      <span className="text-sm text-gray-400">BPM</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Key</label>
                    <select className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm w-full">
                      <option>C Major</option>
                      <option>G Major</option>
                      <option>D Major</option>
                      <option>A Major</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Studio