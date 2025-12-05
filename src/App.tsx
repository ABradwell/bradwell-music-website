import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SongProvider } from './components/SongContext';
import { PlayerProvider } from './components/PlayerContext';
import { Homepage } from './pages/homepage/Homepage';
import { GistPage } from './pages/gist/GistPage';

export default function App() {
  return (
    <SongProvider>
      <PlayerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/gist" element={<GistPage />} />
          </Routes>
        </BrowserRouter>
      </PlayerProvider>
    </SongProvider>
  );
}