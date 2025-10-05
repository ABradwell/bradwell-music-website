import React, { createContext, useContext, useState } from 'react';
import { Song, personalSongs } from '../utils/songData';

interface SongContextType {
  currentSong: Song | null;
  playlist: Song[];
  queue: Song[];
  isPlaying: boolean;
  volume: number;
  isLooping: boolean;
  isShuffling: boolean;
  darkMode: boolean;
  dominantColor: string;
  accentColor: string;
  selectSong: (song: Song) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: string) => void;
  clearQueue: () => void;
  playNext: (song: Song) => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  toggleDarkMode: () => void;
  setVolume: (volume: number) => void;
  extractColors: (imageUrl: string) => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export function SongProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(personalSongs[0]);
  const [playlist] = useState<Song[]>(personalSongs);
  const [queue, setQueue] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [dominantColor, setDominantColor] = useState(personalSongs[0].primaryColor || '#6750A4');
  const [accentColor, setAccentColor] = useState(personalSongs[0].secondaryColor || '#E8DEF8');
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const nextSong = () => {
    // First check if there's a queue
    if (queue.length > 0) {
      const nextSong = queue[0];
      setCurrentSong(nextSong);
      setQueue(queue.slice(1));
      setDominantColor(nextSong.primaryColor || '#6750A4');
      setAccentColor(nextSong.secondaryColor || '#E8DEF8');
      // Ensure the song starts playing
      setIsPlaying(true);
      return;
    }

    // Otherwise continue with normal playlist logic
    let nextIndex;
    if (isShuffling) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentSongIndex + 1) % playlist.length;
    }
    
    setCurrentSongIndex(nextIndex);
    const nextSong = playlist[nextIndex];
    setCurrentSong(nextSong);
    setDominantColor(nextSong.primaryColor || '#6750A4');
    setAccentColor(nextSong.secondaryColor || '#E8DEF8');
    // Ensure the song starts playing
    setIsPlaying(true);
  };

  const previousSong = () => {
    const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    const prevSong = playlist[prevIndex];
    setCurrentSong(prevSong);
    setDominantColor(prevSong.primaryColor || '#6750A4');
    setAccentColor(prevSong.secondaryColor || '#E8DEF8');
    // Ensure the song starts playing
    setIsPlaying(true);
  };

  const selectSong = (song: Song) => {
    const index = playlist.findIndex(s => s.id === song.id);
    setCurrentSongIndex(index);
    setCurrentSong(song);
    setIsPlaying(true);
    setDominantColor(song.primaryColor || '#6750A4');
    setAccentColor(song.secondaryColor || '#E8DEF8');
  };

  const addToQueue = (song: Song) => {
    setQueue([...queue, song]);
  };

  const removeFromQueue = (songId: string) => {
    setQueue(queue.filter(song => song.id !== songId));
  };

  const clearQueue = () => {
    setQueue([]);
  };

  const playNext = (song: Song) => {
    setQueue([song, ...queue]);
  };

  const toggleLoop = () => {
    setIsLooping(prev => !prev);
  };

  const toggleShuffle = () => {
    setIsShuffling(prev => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const extractColors = (_imageUrl: string) => {
    const song = currentSong;
    if (song?.primaryColor && song?.secondaryColor) {
      setDominantColor(song.primaryColor!);
      setAccentColor(song.secondaryColor!);
    }
  };

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const contextValue: SongContextType = {
    currentSong,
    playlist,
    queue,
    isPlaying,
    volume,
    isLooping,
    isShuffling,
    darkMode,
    dominantColor,
    accentColor,
    selectSong,
    play,
    pause,
    togglePlay,
    nextSong,
    previousSong,
    addToQueue,
    removeFromQueue,
    clearQueue,
    playNext,
    toggleLoop,
    toggleShuffle,
    toggleDarkMode,
    setVolume,
    extractColors
  };

  return (
    <SongContext.Provider value={contextValue}>
      {children}
    </SongContext.Provider>
  );
}

export function useSong() {
  const context = useContext(SongContext);
  if (context === undefined) {
    throw new Error('useSong must be used within a SongProvider');
  }
  return context;
}
