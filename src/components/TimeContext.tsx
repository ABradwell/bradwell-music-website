import React, { createContext, useContext, useState, useEffect } from 'react';

interface TimeState {
  currentTime: number;
  duration: number;
}

interface TimeContextType extends TimeState {
  seekTo: (time: number) => void;
  setAudioRef: (audio: HTMLAudioElement | null) => void;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export function TimeProvider({ children }: { children: React.ReactNode }) {
  const [timeState, setTimeState] = useState<TimeState>({
    currentTime: 0,
    duration: 0
  });

  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  const seekTo = (time: number) => {
    if (audioRef) {
      audioRef.currentTime = time;
    }
    setTimeState(prev => ({ ...prev, currentTime: time }));
  };

  // Handle audio time updates
  useEffect(() => {
    if (!audioRef) return;

    const handleTimeUpdate = () => {
      setTimeState(prev => ({ ...prev, currentTime: audioRef.currentTime }));
    };

    const handleLoadedMetadata = () => {
      setTimeState(prev => ({ ...prev, duration: audioRef.duration }));
    };

    audioRef.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audioRef.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioRef]);

  const contextValue: TimeContextType = {
    ...timeState,
    seekTo,
    setAudioRef
  };

  return (
    <TimeContext.Provider value={contextValue}>
      {children}
    </TimeContext.Provider>
  );
}

export function useTime() {
  const context = useContext(TimeContext);
  if (context === undefined) {
    throw new Error('useTime must be used within a TimeProvider');
  }
  return context;
}
