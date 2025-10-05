import React from 'react';
import { MusicPlayerProvider, useMusicPlayer } from './components/MusicPlayerContext';
import { Gramophone } from './components/Gramophone';
import { PlayerControls } from './components/PlayerControls';
import { SettingsPanel } from './components/SettingsPanel';
import { SongCatalog } from './components/SongCatalog';

function AppContent() {
  const { dominantColor, accentColor, currentSong, isPreviewMode } = useMusicPlayer();

  return (
    <div className="min-h-screen bg-background transition-all duration-1000 relative overflow-hidden flex">
      {/* Dynamic background based on album art - Material U style */}
      <div 
        className="fixed inset-0 opacity-5 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${dominantColor}20 0%, ${accentColor}10 50%, transparent 100%)`
        }}
      />
      
      {/* Blurred album art background for transparency effect */}
      {currentSong?.coverUrl && (
        <div 
          className="fixed inset-0 opacity-8 blur-3xl scale-150 transition-all duration-1000"
          style={{
            backgroundImage: `url(${currentSong.coverUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {/* Material U gradient overlay for depth */}
      <div 
        className="fixed inset-0 transition-all duration-1000"
        style={{
          background: `linear-gradient(135deg, ${dominantColor}05 0%, ${accentColor}03 100%)`
        }}
      />

      {/* Song Catalog Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <SongCatalog />
      </div>

      {/* Main Content Container */}
      <div className="flex-1 relative z-5 flex flex-col items-center justify-center p-6 space-y-8">
        {/* Top Navigation */}
        <div className="absolute top-4 right-4 z-10">
          <SettingsPanel />
        </div>

        {/* Preview Mode Indicator */}
        {isPreviewMode && (
          <div 
            className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs backdrop-blur-sm"
            style={{
              backgroundColor: `${dominantColor}20`,
              color: dominantColor,
              border: `1px solid ${dominantColor}30`
            }}
          >
            🎵 Playing Preview
          </div>
        )}

        {/* Gramophone Section with enhanced ambient lighting */}
        <div className="relative flex-shrink-0">
          {/* Enhanced ambient glow effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-15 blur-2xl transition-all duration-1000 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${dominantColor}40 0%, ${accentColor}20 70%, transparent 100%)`,
              width: '400px',
              height: '400px',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%'
            }}
          />
          <Gramophone />
        </div>

        {/* Player Controls Section with glass morphism effect */}
        <div className="w-full max-w-md relative">
          {/* Glass morphism background */}
          <div 
            className="absolute inset-0 rounded-3xl backdrop-blur-sm transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${accentColor}10 0%, ${dominantColor}05 100%)`,
              border: `1px solid ${accentColor}20`
            }}
          />
          <div className="relative z-10 p-6">
            <PlayerControls />
          </div>
        </div>
      </div>

      {/* Floating color accent elements for Material U feel */}
      <div 
        className="fixed top-20 left-20 lg:left-80 w-32 h-32 rounded-full opacity-5 blur-2xl pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${dominantColor} 0%, transparent 70%)`
        }}
      />
      <div 
        className="fixed bottom-20 right-20 w-24 h-24 rounded-full opacity-5 blur-2xl pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`
        }}
      />

      {/* Responsive design adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .space-y-8 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 1.5rem;
          }
        }

        /* Enhanced Material U animations */
        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }

        .floating-element {
          animation: floating 6s ease-in-out infinite;
        }

        /* Custom scrollbar for Material U consistency */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: ${dominantColor}30;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${dominantColor}50;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <MusicPlayerProvider>
      <AppContent />
    </MusicPlayerProvider>
  );
}