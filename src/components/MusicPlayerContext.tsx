import React, { createContext, useContext, useState, useEffect } from 'react';
import { Song, personalSongs } from '../utils/songData';

interface MusicPlayerState {
  currentSong: Song | null;
  playlist: Song[];
  queue: Song[];
  isPlaying: boolean;
  isPreviewMode: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLooping: boolean;
  isShuffling: boolean;
  darkMode: boolean;
  dominantColor: string;
  accentColor: string;
}

interface MusicPlayerContextType extends MusicPlayerState {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
  selectSong: (song: Song) => void;
  playSnippet: (song: Song) => void;
  stopSnippet: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  clearQueue: () => void;
  playNext: (song: Song) => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  toggleDarkMode: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  extractColors: (imageUrl: string) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);


export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MusicPlayerState>({
    currentSong: personalSongs[0],
    playlist: personalSongs,
    queue: [],
    isPlaying: false,
    isPreviewMode: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isLooping: false,
    isShuffling: false,
    darkMode: true,
    dominantColor: personalSongs[0].primaryColor || '#6750A4',
    accentColor: personalSongs[0].secondaryColor || '#E8DEF8'
  });

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.isPlaying && state.currentSong) {
        setState(prev => ({
          ...prev,
          currentTime: Math.min(prev.currentTime + 1, state.currentSong?.duration || 0)
        }));
        
        if (state.currentTime >= (state.currentSong?.duration || 0)) {
          if (state.isLooping) {
            setState(prev => ({ ...prev, currentTime: 0 }));
          } else {
            nextSong();
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isPlaying, state.currentTime, state.currentSong?.duration, state.isLooping]);

  const extractColors = (_imageUrl: string) => {
    // In a real app, this would use a color extraction library
    // For now, we'll use the predefined colors from the song data
    const song = state.currentSong;
    if (song?.primaryColor && song?.secondaryColor) {
      setState(prev => ({
        ...prev,
        dominantColor: song.primaryColor!,
        accentColor: song.secondaryColor!
      }));
    }
  };

  const play = () => {
    setState(prev => ({ ...prev, isPlaying: true }));
  };

  const pause = () => {
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  const togglePlay = () => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const nextSong = () => {
    // First check if there's a queue
    if (state.queue.length > 0) {
      const nextSong = state.queue[0];
      setState(prev => ({
        ...prev,
        currentSong: nextSong,
        queue: prev.queue.slice(1),
        currentTime: 0,
        isPreviewMode: false,
        dominantColor: nextSong.primaryColor || '#6750A4',
        accentColor: nextSong.secondaryColor || '#E8DEF8'
      }));
      return;
    }

    // Otherwise continue with normal playlist logic
    let nextIndex;
    if (state.isShuffling) {
      nextIndex = Math.floor(Math.random() * state.playlist.length);
    } else {
      nextIndex = (currentSongIndex + 1) % state.playlist.length;
    }
    
    setCurrentSongIndex(nextIndex);
    const nextSong = state.playlist[nextIndex];
    setState(prev => ({
      ...prev,
      currentSong: nextSong,
      currentTime: 0,
      isPreviewMode: false,
      dominantColor: nextSong.primaryColor || '#6750A4',
      accentColor: nextSong.secondaryColor || '#E8DEF8'
    }));
  };

  const previousSong = () => {
    const prevIndex = currentSongIndex === 0 ? state.playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    const prevSong = state.playlist[prevIndex];
    setState(prev => ({
      ...prev,
      currentSong: prevSong,
      currentTime: 0,
      dominantColor: prevSong.primaryColor || '#6750A4',
      accentColor: prevSong.secondaryColor || '#E8DEF8'
    }));
  };

  const selectSong = (song: Song) => {
    const index = state.playlist.findIndex(s => s.id === song.id);
    setCurrentSongIndex(index);
    setState(prev => ({
      ...prev,
      currentSong: song,
      currentTime: 0,
      isPlaying: true,
      isPreviewMode: false,
      dominantColor: song.primaryColor || '#6750A4',
      accentColor: song.secondaryColor || '#E8DEF8'
    }));
  };

  const playSnippet = (song: Song) => {
    setState(prev => ({
      ...prev,
      currentSong: song,
      currentTime: 0,
      isPlaying: true,
      isPreviewMode: true,
      dominantColor: song.primaryColor || '#6750A4',
      accentColor: song.secondaryColor || '#E8DEF8'
    }));
  };

  const stopSnippet = () => {
    setState(prev => ({
      ...prev,
      isPlaying: false,
      isPreviewMode: false
    }));
  };

  const addToQueue = (song: Song) => {
    setState(prev => ({
      ...prev,
      queue: [...prev.queue, song]
    }));
  };

  const removeFromQueue = (songId: string) => {
    setState(prev => ({
      ...prev,
      queue: prev.queue.filter(song => song.id !== songId)
    }));
  };

  const clearQueue = () => {
    setState(prev => ({
      ...prev,
      queue: []
    }));
  };

  const playNext = (song: Song) => {
    setState(prev => ({
      ...prev,
      queue: [song, ...prev.queue]
    }));
  };

  const toggleLoop = () => {
    setState(prev => ({ ...prev, isLooping: !prev.isLooping }));
  };

  const toggleShuffle = () => {
    setState(prev => ({ ...prev, isShuffling: !prev.isShuffling }));
  };

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const setVolume = (volume: number) => {
    setState(prev => ({ ...prev, volume }));
  };

  const seekTo = (time: number) => {
    setState(prev => ({ ...prev, currentTime: time }));
  };

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const contextValue: MusicPlayerContextType = {
    ...state,
    play,
    pause,
    togglePlay,
    nextSong,
    previousSong,
    selectSong,
    playSnippet,
    stopSnippet,
    addToQueue,
    removeFromQueue,
    clearQueue,
    playNext,
    toggleLoop,
    toggleShuffle,
    toggleDarkMode,
    setVolume,
    seekTo,
    extractColors
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
}