import React, { createContext, useContext, useState, useEffect } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  snippetUrl?: string; // 30-second preview
  source: 'internal' | 'sdcard';
  primaryColor?: string;
  secondaryColor?: string;
  genre?: string;
  year?: number;
}

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

// Personal music catalog - replace with your actual songs
const personalSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Reflections',
    artist: 'Your Artist Name',
    album: 'Solo Works Vol. 1',
    duration: 245,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/midnight-reflections.mp3',
    snippetUrl: '/music/snippets/midnight-reflections-snippet.mp3',
    source: 'internal',
    primaryColor: '#6750A4',
    secondaryColor: '#E8DEF8',
    genre: 'Ambient',
    year: 2024
  },
  {
    id: '2',
    title: 'Urban Wanderer',
    artist: 'Your Artist Name',
    album: 'City Stories',
    duration: 198,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/urban-wanderer.mp3',
    snippetUrl: '/music/snippets/urban-wanderer-snippet.mp3',
    source: 'internal',
    primaryColor: '#1976D2',
    secondaryColor: '#BBDEFB',
    genre: 'Electronic',
    year: 2024
  },
  {
    id: '3',
    title: 'Golden Hour Dreams',
    artist: 'Your Artist Name',
    album: 'Solo Works Vol. 1',
    duration: 267,
    coverUrl: 'https://images.unsplash.com/photo-1571974599782-87624638275d?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/golden-hour-dreams.mp3',
    snippetUrl: '/music/snippets/golden-hour-dreams-snippet.mp3',
    source: 'internal',
    primaryColor: '#FF6B35',
    secondaryColor: '#FFE0D6',
    genre: 'Indie',
    year: 2024
  },
  {
    id: '4',
    title: 'Acoustic Solitude',
    artist: 'Your Artist Name',
    album: 'Unplugged',
    duration: 178,
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/acoustic-solitude.mp3',
    snippetUrl: '/music/snippets/acoustic-solitude-snippet.mp3',
    source: 'internal',
    primaryColor: '#4CAF50',
    secondaryColor: '#E8F5E8',
    genre: 'Acoustic',
    year: 2023
  },
  {
    id: '5',
    title: 'Neon Nights',
    artist: 'Your Artist Name',
    album: 'City Stories',
    duration: 223,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/neon-nights.mp3',
    snippetUrl: '/music/snippets/neon-nights-snippet.mp3',
    source: 'internal',
    primaryColor: '#E91E63',
    secondaryColor: '#FCE4EC',
    genre: 'Synthwave',
    year: 2024
  },
  {
    id: '6',
    title: 'Morning Coffee',
    artist: 'Your Artist Name',
    album: 'Daily Rhythms',
    duration: 156,
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/morning-coffee.mp3',
    snippetUrl: '/music/snippets/morning-coffee-snippet.mp3',
    source: 'internal',
    primaryColor: '#8D6E63',
    secondaryColor: '#EFEBE9',
    genre: 'Lo-fi',
    year: 2024
  },
  {
    id: '7',
    title: 'Digital Horizon',
    artist: 'Your Artist Name',
    album: 'Future Sounds',
    duration: 289,
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/digital-horizon.mp3',
    snippetUrl: '/music/snippets/digital-horizon-snippet.mp3',
    source: 'internal',
    primaryColor: '#00BCD4',
    secondaryColor: '#E0F2F1',
    genre: 'Techno',
    year: 2024
  },
  {
    id: '8',
    title: 'Rainy Day Thoughts',
    artist: 'Your Artist Name',
    album: 'Weather Moods',
    duration: 201,
    coverUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/rainy-day-thoughts.mp3',
    snippetUrl: '/music/snippets/rainy-day-thoughts-snippet.mp3',
    source: 'internal',
    primaryColor: '#607D8B',
    secondaryColor: '#ECEFF1',
    genre: 'Ambient',
    year: 2023
  },
  {
    id: '9',
    title: 'Stellar Journey',
    artist: 'Your Artist Name',
    album: 'Cosmic Tales',
    duration: 334,
    coverUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/stellar-journey.mp3',
    snippetUrl: '/music/snippets/stellar-journey-snippet.mp3',
    source: 'internal',
    primaryColor: '#673AB7',
    secondaryColor: '#EDE7F6',
    genre: 'Space Ambient',
    year: 2024
  },
  {
    id: '10',
    title: 'Hometown Blues',
    artist: 'Your Artist Name',
    album: 'Roots',
    duration: 212,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/hometown-blues.mp3',
    snippetUrl: '/music/snippets/hometown-blues-snippet.mp3',
    source: 'internal',
    primaryColor: '#795548',
    secondaryColor: '#EFEBE9',
    genre: 'Blues',
    year: 2023
  },
  {
    id: '11',
    title: 'Electric Pulse',
    artist: 'Your Artist Name',
    album: 'Future Sounds',
    duration: 187,
    coverUrl: 'https://images.unsplash.com/photo-1571974599782-87624638275d?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/electric-pulse.mp3',
    snippetUrl: '/music/snippets/electric-pulse-snippet.mp3',
    source: 'internal',
    primaryColor: '#FF5722',
    secondaryColor: '#FBE9E7',
    genre: 'Electronic',
    year: 2024
  },
  {
    id: '12',
    title: 'Sunset Boulevard',
    artist: 'Your Artist Name',
    album: 'City Stories',
    duration: 256,
    coverUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/sunset-boulevard.mp3',
    snippetUrl: '/music/snippets/sunset-boulevard-snippet.mp3',
    source: 'internal',
    primaryColor: '#FF9800',
    secondaryColor: '#FFF3E0',
    genre: 'Indie Rock',
    year: 2024
  },
  {
    id: '13',
    title: 'Ocean Waves',
    artist: 'Your Artist Name',
    album: 'Nature Sounds',
    duration: 298,
    coverUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/ocean-waves.mp3',
    snippetUrl: '/music/snippets/ocean-waves-snippet.mp3',
    source: 'internal',
    primaryColor: '#009688',
    secondaryColor: '#E0F2F1',
    genre: 'Nature/Ambient',
    year: 2024
  },
  {
    id: '14',
    title: 'Midnight Drive',
    artist: 'Your Artist Name',
    album: 'Nocturnal',
    duration: 241,
    coverUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/midnight-drive.mp3',
    snippetUrl: '/music/snippets/midnight-drive-snippet.mp3',
    source: 'internal',
    primaryColor: '#3F51B5',
    secondaryColor: '#E8EAF6',
    genre: 'Synthwave',
    year: 2024
  }
];

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

  const extractColors = (imageUrl: string) => {
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