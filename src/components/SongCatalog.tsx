import { useState, useMemo, useCallback, memo } from 'react';
import { useSong } from './SongContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { 
  Play, 
  Pause, 
  Plus, 
  MoreHorizontal, 
  Music, 
  SkipForward,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function SongCatalog() {
  const { 
    playlist, 
    currentSong, 
    isPlaying,
    dominantColor, 
    accentColor,
    selectSong,
    addToQueue,
    playNext
  } = useSong();

  // const [hoveredSong, setHoveredSong] = useState<string | null>(null);
  // Start with first few albums expanded to show the hierarchy
  const [expandedAlbums, setExpandedAlbums] = useState<Set<string>>(
    new Set(Object.keys(playlist.reduce((groups, song) => {
      const album = song.album;
      if (!groups[album]) {
        groups[album] = [];
      }
      groups[album].push(song);
      return groups;
    }, {} as Record<string, typeof playlist>)).slice(0, 2))
  );

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Group songs by album
  const albumGroups = useMemo(() => {
    return playlist.reduce((groups, song) => {
      const album = song.album;
      if (!groups[album]) {
        groups[album] = [];
      }
      groups[album].push(song);
      return groups;
    }, {} as Record<string, typeof playlist>);
  }, [playlist]);

  const toggleAlbum = useCallback((album: string) => {
    setExpandedAlbums(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(album)) {
        newExpanded.delete(album);
      } else {
        newExpanded.add(album);
      }
      return newExpanded;
    });
  }, []);

  const isCurrentlyPlaying = useCallback((song: any) => {
    return currentSong?.id === song.id;
  }, [currentSong?.id]);

  // Memoized song item component to prevent unnecessary re-renders
  const SongItem = memo(({ song, isCurrent }: { 
    song: any, 
    isCurrent: boolean
  }) => (
    <div
      className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors group relative ${
        isCurrent ? 'bg-muted/50' : ''
      }`}
      style={{
        backgroundColor: isCurrent ? `${accentColor}10` : undefined,
        borderLeft: isCurrent ? `2px solid ${dominantColor}` : '2px solid transparent'
      }}
      onClick={() => selectSong(song)}
    >
      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm truncate">{song.title}</h4>
        <p className="text-xs text-muted-foreground">
          {formatDuration(song.duration)}
          {song.year && ` • ${song.year}`}
        </p>
      </div>
      
      {/* Action Buttons */}
      <div className="flex items-center space-x-1 flex-shrink-0">
        {/* More Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => playNext(song)}
              className="text-xs"
            >
              <SkipForward className="w-3 h-3 mr-2" />
              Play Next
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => addToQueue(song)}
              className="text-xs"
            >
              <Plus className="w-3 h-3 mr-2" />
              Add to Queue
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Current Song Indicator */}
        {isCurrent && (
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: dominantColor }}
          >
            {isPlaying ? (
              <Pause className="w-2.5 h-2.5 text-white" />
            ) : (
              <Play className="w-2.5 h-2.5 text-white" />
            )}
          </div>
        )}
      </div>
    </div>
  ));

  // Content component that can be reused in both sidebar and sheet
  const SongCatalogContent = memo(() => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Music className="w-5 h-5" style={{ color: dominantColor }} />
          <h2 className="font-medium">Songs</h2>
          {/* <Badge variant="secondary" className="ml-auto">
            {playlist.length}
          </Badge> */}
        </div>
      </div>

      {/* Album/Song List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {Object.entries(albumGroups).map(([album, songs]) => {
            const isExpanded = expandedAlbums.has(album);
            const albumCoverUrl = songs[0]?.coverUrl;
            
            return (
              <div key={album} className="space-y-1">
                {/* Album Header */}
                <div
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
                  onClick={() => toggleAlbum(album)}
                >
                  {/* Album Cover */}
                  <div className="w-8 h-8 rounded overflow-hidden bg-muted flex-shrink-0">
                    <ImageWithFallback
                      src={albumCoverUrl}
                      alt={`${album} cover`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Expand/Collapse Icon */}
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  
                  {/* Album Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{album}</h3>
                    <p className="text-xs text-muted-foreground">
                      {songs.length} song{songs.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  {/* Song Count Badge */}
                  <Badge variant="secondary" className="text-xs">
                    {songs.length}
                  </Badge>
                </div>

                {/* Songs in Album */}
                {isExpanded && (
                  <div className="ml-4 space-y-1">
                    {songs.map((song) => {
                      const isCurrent = isCurrentlyPlaying(song);
                      
                      return (
                        <SongItem
                          key={song.id}
                          song={song}
                          isCurrent={isCurrent}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer Info */}
      <div className="p-4 border-t border-border">
        <div className="text-center text-xs text-muted-foreground">
          <p className="mt-1">
            {playlist.length} songs • {Math.floor(playlist.reduce((acc, song) => acc + song.duration, 0) / 60)} min total
          </p>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block w-80 h-screen bg-background/95 backdrop-blur-sm border-r border-border">
        <SongCatalogContent />
      </div>

      {/* Mobile Sheet Overlay - Hidden on desktop */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="fixed top-4 left-4 z-50 w-10 h-10 p-0 rounded-full backdrop-blur-sm lg:hidden"
              style={{
                backgroundColor: `${accentColor}40`,
                color: dominantColor
              }}
            >
              <Music className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md p-0">
            <SongCatalogContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}