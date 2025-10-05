import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Song, personalSongs } from '../utils/songData';
import { TimeProvider, useTime } from './TimeContext';

interface MusicPlayerState {
  currentSong: Song | null;
  playlist: Song[];
  queue: Song[];
  isPlaying: boolean;
  isPreviewMode: boolean;
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
  extractColors: (imageUrl: string) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);


function MusicPlayerProviderInner({ children }: { children: React.ReactNode }) {


  const [currentSong, setCurrentSong] = useState<Song>(personalSongs[0]);
  const [playlist, setPlaylist] = useState<Song[]>(personalSongs);
  const [queue, setQueue] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [volume, setVol] = useState(0.7);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [dominantColor, setDominantColor] = useState(personalSongs[0].primaryColor || '#6750A4');
  const [accentColor, setAccentColor] = useState(personalSongs[0].secondaryColor || '#E8DEF8');
  const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { setAudioRef } = useTime();

  // Register audio element with TimeProvider
  useEffect(() => {
    if (audioRef.current) {
      setAudioRef(audioRef.current);
    }
  }, [setAudioRef]);

  // Define functions first
  const nextSong = () => {
    // First check if there's a queue
    if (queue.length > 0) {
      const nextSong = queue[0];


      setCurrentSong(nextSong);
      setQueue(queue.slice(1));
      setCurrentTime(0);
      setIsPreviewMode(false);
      setDominantColor(nextSong.primaryColor || '#6750A4');
      setAccentColor(nextSong.secondaryColor || '#E8DEF8');
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
    setCurrentTime(0);
    setIsPreviewMode(false);
    setDominantColor(nextSong.primaryColor || '#6750A4');
    setAccentColor(nextSong.secondaryColor || '#E8DEF8');
  };

  // Handle audio element events - only non-time related events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    };

    const handleError = () => {
      console.error('Audio playback error');
      // setState(prev => ({ ...prev, isPlaying: false }));
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [isLooping]);

  // Control audio playback based on state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong.audioUrl;
    audio.volume = volume;
    audio.loop = isLooping;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong, volume, isLooping]);

  const extractColors = (_imageUrl: string) => {
    // In a real app, this would use a color extraction library
    // For now, we'll use the predefined colors from the song data
    const song = currentSong;
    if (song?.primaryColor && song?.secondaryColor) {

      setDominantColor(song.primaryColor!);
      setAccentColor(song.secondaryColor!);

    }
  };

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const previousSong = () => {
    const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    const prevSong = playlist[prevIndex];
  
    setCurrentSong(prevSong);
    setCurrentTime(0);
    setDominantColor(prevSong.primaryColor || '#6750A4');
    setAccentColor(prevSong.secondaryColor || '#E8DEF8');
  };

  const selectSong = (song: Song) => {
    const index = playlist.findIndex(s => s.id === song.id);
    setCurrentSongIndex(index);

    setCurrentSong(song);
    setCurrentTime(0);
    setIsPlaying(true);
    setIsPreviewMode(false);
    setDominantColor(song.primaryColor || '#6750A4');
    setAccentColor(song.secondaryColor || '#E8DEF8');
  };

  const playSnippet = (song: Song) => {

    setCurrentSong(song);
    setCurrentTime(0);
    setIsPlaying(true);
    setIsPreviewMode(true);
    setDominantColor(song.primaryColor || '#6750A4');
    setAccentColor(song.secondaryColor || '#E8DEF8');
  };

  const stopSnippet = () => {
    setIsPlaying(false);
    setIsPreviewMode(false);
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

  const setVolume = (volume: number) => {
    setVolume(volume);
  };


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const contextValue: MusicPlayerContextType = {
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
    extractColors,
    currentSong,
    playlist,
    queue,
    isPlaying,
    isPreviewMode,
    volume,
    isLooping,
    isShuffling,
    darkMode,
    dominantColor,
    accentColor
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
      <audio
        ref={audioRef}
        preload="metadata"
        style={{ display: 'none' }}
      />
    </MusicPlayerContext.Provider>
  );
}

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  return (
    <TimeProvider>
      <MusicPlayerProviderInner>
        {children}
      </MusicPlayerProviderInner>
    </TimeProvider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
}