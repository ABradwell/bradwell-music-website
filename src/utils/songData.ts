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
    coverUrl: '/covers/musicHeadshot.jpg',
    audioUrl: '/music/Lenny.wav',
    snippetUrl: '/music/Lenny.wav',
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
    coverUrl: '/covers/musicHeadshot.jpg',
    audioUrl: '/music/BlackDog.wav',
    snippetUrl: '/music/BlackDog.wav',
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
    coverUrl: '/covers/musicHeadshot.jpg',
    audioUrl: '/music/MoveAwayer.wav',
    snippetUrl: '/music/MoveAwayer.wav',
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
    coverUrl: '/covers/musicHeadshot.jpg',
    audioUrl: '/music/ThingsWeSaid.wav',
    snippetUrl: '/music/ThingsWeSaid.wav',
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
    coverUrl: '/covers/musicHeadshot.jpg',
    audioUrl: '/music/Seagulls.wav',
    snippetUrl: '/music/Seagulls.wav',
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
    coverUrl: '/covers/musicHeadshot.jpg',
    audioUrl: '/music/MECWASOTMT.wav',
    snippetUrl: '/music/MECWASOTMT.wav',
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
    coverUrl: '/covers/musicHeadshot.jpg',
    audioUrl: '/music/FishingHooks.wav',
    snippetUrl: '/music/FishingHooks.wav',
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
    coverUrl: '/covers/musicHeadshot.jpg',
    audioUrl: '/music/ThisGuitarIsWood.wav',
    snippetUrl: '/music/ThisGuitarIsWood.wav',
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
    coverUrl: '/covers/musicHeadshot.jpg',
    audioUrl: '/music/CNC.wav',
    snippetUrl: '/music/CNC.wav',
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
    coverUrl: '/covers/musicHeadshot.jpg',
    audioUrl: '/music/AAA.wav',
    snippetUrl: '/music/AAA.wav',
    primaryColor: '#795548',
    secondaryColor: '#EFEBE9',
    year: 2025
  },

];
