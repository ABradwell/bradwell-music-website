import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSong } from './SongContext';

interface PlayerContextType {
  currentTime: number;
  duration: number;
  seekTo: (time: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const { currentSong, isPlaying, volume, isLooping, nextSong } = useSong();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Use refs to get current values in event handlers
  const isLoopingRef = useRef(isLooping);
  const nextSongRef = useRef(nextSong);
  
  // Update refs when values change
  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);
  
  useEffect(() => {
    nextSongRef.current = nextSong;
  }, [nextSong]);

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  // Initialize all event listeners once
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      if (isLoopingRef.current) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSongRef.current();
      }
    };

    const handleError = () => {
      console.error('Audio playback error');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []); // Empty dependency array - only run once

  // Set audio source only when song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    // Set source and handle playback
    if (audio.src !== currentSong.audioUrl) {
      audio.src = currentSong.audioUrl;
      
      // Wait for the audio to be ready before playing
      const handleCanPlay = () => {
        if (isPlaying) {
          audio.play().catch(console.error);
        }
        audio.removeEventListener('canplay', handleCanPlay);
      };
      
      const handleLoadedData = () => {
        if (isPlaying) {
          audio.play().catch(console.error);
        }
        audio.removeEventListener('loadeddata', handleLoadedData);
      };
      
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('loadeddata', handleLoadedData);
      
      // Fallback: try to play after a short delay
      setTimeout(() => {
        if (isPlaying && audio.readyState >= 2) {
          audio.play().catch(console.error);
        }
      }, 500);
    }
  }, [currentSong, isPlaying]);

  // Set audio properties (volume and loop)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = isLooping;
  }, [volume, isLooping]);

  // Control audio playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const contextValue: PlayerContextType = {
    currentTime,
    duration,
    seekTo
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        style={{ display: 'none' }}
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
