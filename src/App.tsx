import { MusicPlayerProvider } from './components/MusicPlayerContext';
import { Homepage } from './pages/homepage/Homepage';

export default function App() {
  return (
    <MusicPlayerProvider>
      <Homepage />
    </MusicPlayerProvider>
  );
}