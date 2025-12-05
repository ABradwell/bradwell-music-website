import { useState, useRef } from 'react';
import { useSong } from '../../components/SongContext';
import { Gramophone } from '../../components/Gramophone';
import { PlayerControls } from '../../components/PlayerControls';
import { SettingsPanel } from '../../components/SettingsPanel';
import { SongCatalog } from '../../components/SongCatalog';
import { SnippetsView } from '../../components/SnippetsView';
import { Spacer } from '../../components/spacer';
import { HeroHeader } from '../../components/HeroHeader';
import { ChevronDown } from 'lucide-react';

export function Homepage() {
  const { dominantColor, accentColor, currentSong, viewMode } = useSong();
  const [showScrollIndicator] = useState(true);
  const recordPlayerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);

  const scrollToRecordPlayer = () => {
    recordPlayerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background transition-all duration-1000 relative overflow-hidden" >
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


      {/* Portfolio Splash Section */}
      <section ref={heroSectionRef} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{padding: '4rem'}}>
        {/* Top Navigation */}
        <div className="absolute top-4 right-4 z-20">
          <SettingsPanel />
        </div>

        {/* Hero Content */}
        <HeroHeader />
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 rounded-full border-muted-foreground/30 flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
        
      {/* Scroll to Listen Indicator */}
      {showScrollIndicator && (
        <div className="relative z-10 flex flex-col items-center justify-center py-8 px-6" style={{marginTop: 150}}>
          <button
            onClick={scrollToRecordPlayer}
            className="flex flex-col items-center gap-3 px-6 py-4  transition-all duration-300 group cursor-pointer"
          >
            <span className="text-foreground font-medium text-sm text-muted-foreground/80 ">Scroll to Listen</span>
            <ChevronDown className="w-5 h-5 text-foreground animate-bounce" />
          </button>
        </div>
      )}
      </section>

      {/* Music Player Section */}
      <section ref={recordPlayerRef} className="relative z-10 min-h-screen flex">
        {viewMode === 'record' ? (
          <>
            {/* Song Catalog - Desktop sidebar, Mobile overlay */}
            <SongCatalog />
            
            {/* Main Music Player Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
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
              
              <Spacer height={'3rem'} />
              
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
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <SnippetsView />
          </div>
        )}
      </section>

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

    </div>
  );
}
