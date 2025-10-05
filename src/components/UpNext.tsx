// import React from 'react';
import { useMusicPlayer } from './MusicPlayerContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { 
  X, 
  GripVertical, 
  ListMusic, 
  Play,
  Trash2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function UpNext() {
  const { 
    queue,
    currentSong,
    dominantColor, 
    // accentColor,
    removeFromQueue,
    clearQueue,
    selectSong
  } = useMusicPlayer();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (queue.length === 0) {
    return (
      <Card className="w-72 bg-background/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-sm">
            <ListMusic className="w-4 h-4 mr-2" style={{ color: dominantColor }} />
            Up Next
            <Badge variant="secondary" className="ml-auto">0</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <ListMusic className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No songs in queue</p>
            <p className="text-xs mt-1">Add songs to play next</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalDuration = queue.reduce((acc, song) => acc + song.duration, 0);

  return (
    <Card className="w-72 bg-background/95 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm">
          <ListMusic className="w-4 h-4 mr-2" style={{ color: dominantColor }} />
          Up Next
          <Badge variant="secondary" className="ml-auto">
            {queue.length}
          </Badge>
        </CardTitle>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{Math.floor(totalDuration / 60)} min total</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={clearQueue}
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-64">
          <div className="px-4 space-y-2">
            {/* Currently Playing */}
            {currentSong && (
              <div className="pb-2 mb-2 border-b border-border">
                <p className="text-xs text-muted-foreground mb-2 flex items-center">
                  <Play className="w-3 h-3 mr-1" />
                  Now Playing
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded overflow-hidden bg-muted flex-shrink-0">
                    <ImageWithFallback
                      src={currentSong.coverUrl}
                      alt={`${currentSong.album} cover`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{currentSong.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{currentSong.artist}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDuration(currentSong.duration)}
                  </span>
                </div>
              </div>
            )}

            {/* Queue Items */}
            {queue.map((song, index) => (
              <div 
                key={`${song.id}-${index}`}
                className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => selectSong(song)}
              >
                {/* Drag Handle */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-3 h-3 text-muted-foreground" />
                </div>

                {/* Queue Position */}
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                  style={{ 
                    backgroundColor: `${dominantColor}20`,
                    color: dominantColor 
                  }}
                >
                  {index + 1}
                </div>

                {/* Album Art */}
                <div className="w-8 h-8 rounded overflow-hidden bg-muted flex-shrink-0">
                  <ImageWithFallback
                    src={song.coverUrl}
                    alt={`${song.album} cover`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{song.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                </div>
                
                {/* Duration */}
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatDuration(song.duration)}
                </span>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromQueue(song.id);
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}