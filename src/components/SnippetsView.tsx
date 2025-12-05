import { useState, useEffect } from 'react';
import { useSong } from './SongContext';
import { Song } from '../utils/songData';
import { Play, Pause } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SnippetPlayerState {
  songId: string;
  isPlaying: boolean;
  audio: HTMLAudioElement | null;
  handlers: {
    timeupdate: () => void;
    ended: () => void;
  };
}

export function SnippetsView() {
  const { playlist, dominantColor, accentColor } = useSong();
  const [playingSnippet, setPlayingSnippet] = useState<SnippetPlayerState | null>(null);

  // Get snippet configs from song data
  const getSnippetConfig = (song: Song) => {
    return {
      start: song.snippetStart ?? 0,
      end: song.snippetEnd ?? Math.min(30, song.duration)
    };
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playingSnippet?.audio && playingSnippet.handlers) {
        playingSnippet.audio.pause();
        playingSnippet.audio.currentTime = 0;
        playingSnippet.audio.removeEventListener('timeupdate', playingSnippet.handlers.timeupdate);
        playingSnippet.audio.removeEventListener('ended', playingSnippet.handlers.ended);
      }
    };
  }, [playingSnippet]);

  const toggleSnippet = async (song: Song) => {
    const config = getSnippetConfig(song);
    
    if (playingSnippet?.songId === song.id && playingSnippet.isPlaying) {
      // Stop current snippet
      if (playingSnippet.audio && playingSnippet.handlers) {
        playingSnippet.audio.pause();
        playingSnippet.audio.currentTime = 0;
        playingSnippet.audio.removeEventListener('timeupdate', playingSnippet.handlers.timeupdate);
        playingSnippet.audio.removeEventListener('ended', playingSnippet.handlers.ended);
      }
      setPlayingSnippet(null);
    } else {
      // Stop any currently playing snippet
      if (playingSnippet?.audio && playingSnippet.handlers) {
        playingSnippet.audio.pause();
        playingSnippet.audio.currentTime = 0;
        playingSnippet.audio.removeEventListener('timeupdate', playingSnippet.handlers.timeupdate);
        playingSnippet.audio.removeEventListener('ended', playingSnippet.handlers.ended);
      }

      // Start new snippet
      const audio = new Audio(song.audioUrl);
      audio.currentTime = config.start;
      
      const handleTimeUpdate = () => {
        if (audio.currentTime >= config.end) {
          audio.pause();
          audio.currentTime = config.start;
          audio.removeEventListener('timeupdate', handleTimeUpdate);
          audio.removeEventListener('ended', handleEnded);
          setPlayingSnippet(null);
        }
      };

      const handleEnded = () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        setPlayingSnippet(null);
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      try {
        await audio.play();
        setPlayingSnippet({ 
          songId: song.id, 
          isPlaying: true, 
          audio,
          handlers: {
            timeupdate: handleTimeUpdate,
            ended: handleEnded
          }
        });
      } catch (error) {
        console.error('Error playing snippet:', error);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        setPlayingSnippet(null);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {playlist.map((song) => {
          const isPlaying = playingSnippet?.songId === song.id && playingSnippet.isPlaying;
          const songDominantColor = song.primaryColor || dominantColor;
          const songAccentColor = song.secondaryColor || accentColor;

          return (
            <div
              key={song.id}
              onClick={() => toggleSnippet(song)}
              className="bg-background/50 backdrop-blur-sm rounded-lg border transition-all duration-300 hover:shadow-lg p-4 cursor-pointer relative"
              style={{
                borderColor: isPlaying ? songDominantColor : 'rgba(255, 255, 255, 0.1)',
                borderWidth: isPlaying ? '2px' : '1px',
                maxWidth: '800px',
                width: '100%',
                position: 'relative',
                zIndex: 1
              }}
            >
              <div className="flex items-center gap-4">
                {/* Album Art - Fixed height, rounded, on left */}
                <div className="flex-shrink-0 w-[150px] h-[150px] rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={song.coverUrl}
                    alt={`${song.album} cover`}
                    className="w-full h-full object-cover"
                    style={{height: '100px', width: '150px'}}
                  />
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-foreground truncate mb-1">{song.title}</h3>
                  <p className="text-base text-muted-foreground truncate">{song.artist}</p>
                  <p className="text-sm text-muted-foreground/80 truncate">{song.album}</p>
                </div>

                {/* Controls */}
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="flex-shrink-0 relative z-20"
                  style={{ pointerEvents: 'auto' }}
                >
                  <Button
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSnippet(song);
                    }}
                    className="w-16 h-16 p-0 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: isPlaying ? songDominantColor : songAccentColor,
                      color: isPlaying ? 'white' : songDominantColor,
                      pointerEvents: 'auto',
                      position: 'relative',
                      zIndex: 30
                    }}
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7" />
                    ) : (
                      <Play className="w-7 h-7 ml-0.5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
