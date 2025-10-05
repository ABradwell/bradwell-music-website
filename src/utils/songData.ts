export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  snippetUrl?: string; // 30-second preview
  primaryColor?: string;
  secondaryColor?: string;
  year?: number;
}

// Personal music catalog - replace with your actual songs
export const personalSongs: Song[] = [
  {
    id: '1',
    title: 'Lenny',
    artist: 'Bradwell',
    album: "I've left my friends",
    duration: 245,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/Lenny.wav',
    snippetUrl: '/music/snippets/midnight-reflections-snippet.mp3',
    primaryColor: '#6750A4',
    secondaryColor: '#E8DEF8',
    year: 2025
  },
  {
    id: '2',
    title: 'Black Dog',
    artist: 'Bradwell',
    album: "I've left my friends",
    duration: 198,
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/urban-wanderer.mp3',
    snippetUrl: '/music/snippets/urban-wanderer-snippet.mp3',
    primaryColor: '#1976D2',
    secondaryColor: '#BBDEFB',
    year: 2025
  },
  {
    id: '3',
    title: 'Move Awayer',
    artist: 'Bradwell',
    album: "I've left my friends",
    duration: 267,
    coverUrl: 'https://images.unsplash.com/photo-1571974599782-87624638275d?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/golden-hour-dreams.mp3',
    snippetUrl: '/music/snippets/golden-hour-dreams-snippet.mp3',
    primaryColor: '#FF6B35',
    secondaryColor: '#FFE0D6',
    year: 2025
  },
  {
    id: '4',
    title: 'Things we Said and Why',
    artist: 'Bradwell',
    album: "I've left my friends",
    duration: 178,
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/acoustic-solitude.mp3',
    snippetUrl: '/music/snippets/acoustic-solitude-snippet.mp3',
    primaryColor: '#4CAF50',
    secondaryColor: '#E8F5E8',
    year: 2025
  },
  {
    id: '5',
    title: 'Seagulls',
    artist: 'Bradwell',
    album: "I've left my friends",
    duration: 223,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/neon-nights.mp3',
    snippetUrl: '/music/snippets/neon-nights-snippet.mp3',
    primaryColor: '#E91E63',
    secondaryColor: '#FCE4EC',
    year: 2025
  },
  {
    id: '6',
    title: 'Eye Contact (MECWASOTMT)',
    artist: 'Bradwell',
    album: "I've left my friends",
    duration: 156,
    coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/morning-coffee.mp3',
    snippetUrl: '/music/snippets/morning-coffee-snippet.mp3',
    primaryColor: '#8D6E63',
    secondaryColor: '#EFEBE9',
    year: 2025
  },
  {
    id: '7',
    title: 'Fishing Hooks',
    artist: 'Bradwell',
    album: "I've left my friends",
    duration: 289,
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/digital-horizon.mp3',
    snippetUrl: '/music/snippets/digital-horizon-snippet.mp3',
    primaryColor: '#00BCD4',
    secondaryColor: '#E0F2F1',
    year: 2025
  },
  {
    id: '8',
    title: 'This Guitar is Wood',
    artist: 'Bradwell',
    album: "I've left my friends",
    duration: 201,
    coverUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/rainy-day-thoughts.mp3',
    snippetUrl: '/music/snippets/rainy-day-thoughts-snippet.mp3',
    primaryColor: '#607D8B',
    secondaryColor: '#ECEFF1',
    year: 2025
  },
  {
    id: '9',
    title: 'Cyclical Nature of Childhood',
    artist: 'Bradwell',
    album: "I've left my friends",
    duration: 334,
    coverUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/stellar-journey.mp3',
    snippetUrl: '/music/snippets/stellar-journey-snippet.mp3',
    primaryColor: '#673AB7',
    secondaryColor: '#EDE7F6',
    year: 2025
  },
  {
    id: '10',
    title: 'Anonymous, Autonomous',
    artist: 'Bradwell',
    album: "I've left my friends",
    duration: 212,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    audioUrl: '/music/hometown-blues.mp3',
    snippetUrl: '/music/snippets/hometown-blues-snippet.mp3',
    primaryColor: '#795548',
    secondaryColor: '#EFEBE9',
    year: 2025
  },

];
