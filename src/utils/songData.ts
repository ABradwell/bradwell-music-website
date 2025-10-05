export interface Song {
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

// Personal music catalog - replace with your actual songs
export const personalSongs: Song[] = [
  {
    id: '1',
    title: 'Midnight Reflections',
    artist: 'Bradwell',
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
    artist: 'Bradwell',
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
    artist: 'Bradwell',
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
    artist: 'Bradwell',
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
    artist: '',
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
    artist: 'Bradwell',
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
    artist: 'Bradwell',
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
    artist: 'Bradwell',
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
    artist: 'Bradwell',
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
    artist: 'Bradwell',
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
    artist: 'Bradwell',
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
    artist: 'Bradwell',
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
    artist: 'Bradwell',
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
    artist: 'Bradwell',
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
