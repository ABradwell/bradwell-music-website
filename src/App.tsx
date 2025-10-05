import { SongProvider } from './components/SongContext';
import { PlayerProvider } from './components/PlayerContext';
import { Homepage } from './pages/homepage/Homepage';

export default function App() {
  return (
    <SongProvider>
      <PlayerProvider>
        <Homepage />
      </PlayerProvider>
    </SongProvider>
  );
}