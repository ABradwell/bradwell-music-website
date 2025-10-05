import React from 'react';
import { useMusicPlayer } from './MusicPlayerContext';
import { Button } from './ui/button';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle,
  Volume2
} from 'lucide-react';
import { Slider } from './ui/slider';

export function PlayerControls() {
  const { 
    isPlaying, 
    currentTime, 
    currentSong,
    isPreviewMode,
    isLooping,
    isShuffling,
    volume,
    queue,
    dominantColor,
    accentColor,
    togglePlay, 
    nextSong, 
    previousSong,
    toggleLoop,
    toggleShuffle,
    setVolume,
    seekTo,
    stopSnippet
  } = useMusicPlayer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const duration = currentSong?.duration || 0;
  const maxTime = isPreviewMode ? 30 : duration; // 30 seconds for preview
  const progress = maxTime > 0 ? (currentTime / maxTime) * 100 : 0;

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Song Info */}
      <div className="text-center space-y-1">
        <h2 className="text-xl font-medium text-foreground truncate">
          {currentSong?.title || 'No song selected'}
        </h2>
        <p className="text-base text-muted-foreground truncate">
          {currentSong?.artist || 'Unknown Artist'}
        </p>
        <p className="text-sm text-muted-foreground/80 truncate">
          {currentSong?.album || 'Unknown Album'}
          {isPreviewMode && ' • Preview'}
        </p>
        {isPreviewMode && (
          <p className="text-xs text-muted-foreground">
            🎵 30-second preview • Click to play full song
          </p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={(value: number[]) => {
              if (!isPreviewMode) {
                const newTime = Math.floor((value[0] / 100) * duration);
                seekTo(newTime);
              }
            }}
            disabled={isPreviewMode}
            className="w-full"
            style={{
              '--slider-track': accentColor,
              '--slider-range': dominantColor,
              '--slider-thumb': dominantColor
            } as React.CSSProperties}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{isPreviewMode ? '0:30' : formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-6">
        <Button
          variant={isShuffling ? "default" : "ghost"}
          size="sm"
          onClick={toggleShuffle}
          className="w-10 h-10 p-0 rounded-full transition-all duration-200"
          style={{
            backgroundColor: isShuffling ? dominantColor : 'transparent',
            color: isShuffling ? 'white' : 'currentColor'
          }}
        >
          <Shuffle className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={previousSong}
          className="w-12 h-12 p-0 rounded-full hover:bg-accent transition-all duration-200"
        >
          <SkipBack className="w-5 h-5" />
        </Button>

        <Button
          size="lg"
          onClick={togglePlay}
          className="w-16 h-16 p-0 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: dominantColor,
            color: 'white'
          }}
        >
          {isPlaying ? (
            <Pause className="w-7 h-7" />
          ) : (
            <Play className="w-7 h-7 ml-0.5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={nextSong}
          className="w-12 h-12 p-0 rounded-full hover:bg-accent transition-all duration-200"
        >
          <SkipForward className="w-5 h-5" />
        </Button>

        <Button
          variant={isLooping ? "default" : "ghost"}
          size="sm"
          onClick={toggleLoop}
          className="w-10 h-10 p-0 rounded-full transition-all duration-200"
          style={{
            backgroundColor: isLooping ? dominantColor : 'transparent',
            color: isLooping ? 'white' : 'currentColor'
          }}
        >
          <Repeat className="w-4 h-4" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3 px-4">
        <Volume2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <Slider
          value={[volume * 100]}
          max={100}
          step={1}
          onValueChange={(value: number[]) => setVolume(value[0] / 100)}
          className="flex-1"
          style={{
            '--slider-track': accentColor,
            '--slider-range': dominantColor,
            '--slider-thumb': dominantColor
          } as React.CSSProperties}
        />
        <span className="text-xs text-muted-foreground w-8 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>

      {/* Up Next Info */}
      {queue.length > 0 && (
        <div className="text-center px-4">
          <p className="text-xs text-muted-foreground">
            Up next: {queue[0].title} by {queue[0].artist}
            {queue.length > 1 && ` (+${queue.length - 1} more)`}
          </p>
        </div>
      )}
    </div>
  );
}