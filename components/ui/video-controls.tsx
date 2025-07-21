"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Settings, Minimize } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoControlsProps {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isFullscreen: boolean
  onPlayPause: () => void
  onSeek: (time: number) => void
  onVolumeChange: (volume: number) => void
  onSkipBack: () => void
  onSkipForward: () => void
  onFullscreen: () => void
  className?: string
}

export function VideoControls({
  isPlaying,
  currentTime,
  duration,
  volume,
  isFullscreen,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onSkipBack,
  onSkipForward,
  onFullscreen,
  className,
}: VideoControlsProps) {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className={cn("absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4", className)}
    >
      {/* Progress Bar */}
      <div className="mb-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={([value]) => onSeek(value)}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-white/70 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onSkipBack} className="text-white hover:bg-white/20">
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={onPlayPause} className="text-white hover:bg-white/20">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={onSkipForward} className="text-white hover:bg-white/20">
            <SkipForward className="w-4 h-4" />
          </Button>

          {/* Volume Control */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onVolumeChange(volume > 0 ? 0 : 1)}
              className="text-white hover:bg-white/20"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>

            {showVolumeSlider && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/80 rounded p-2">
                <Slider
                  value={[volume * 100]}
                  max={100}
                  step={1}
                  orientation="vertical"
                  onValueChange={([value]) => onVolumeChange(value / 100)}
                  className="h-20"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Settings className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={onFullscreen} className="text-white hover:bg-white/20">
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
