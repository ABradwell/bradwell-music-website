import { useState } from 'react';
import { useSong } from '../../components/SongContext';
import { Gramophone } from '../../components/Gramophone';
import { PlayerControls } from '../../components/PlayerControls';
import { SettingsPanel } from '../../components/SettingsPanel';
import { SongCatalog } from '../../components/SongCatalog';
import { Spacer } from '../../components/spacer';
import { TypedSubtitle } from '../../components/TypedSubtitle';
import { QRCodeModal } from '../../components/QRCodeModal';

export function Homepage() {
  const { dominantColor, accentColor, currentSong } = useSong();
  const [showQRCode, setShowQRCode] = useState(false);

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
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20"
      style={{padding: '4rem'}}>
        {/* Top Navigation */}
        <div className="absolute top-4 right-4 z-20">
          <SettingsPanel />
        </div>

        {/* Hero Content */}
        <div className="text-left max-w-4xl mx-auto space-y-8">
          {/* Main Title */}
          <h1 className="font-black tracking-tight leading-none" style={{ fontSize: '5rem', fontWeight: 600 }}>
            <div className="text-foreground">Aiden</div>
            <div className="text-foreground">Stevenson</div>
            <div className="text-foreground">Bradwell</div>
          </h1>
          
          {/* Subtitle */}
          <div className="p-y-2">
            <TypedSubtitle />
          </div>
          {/* Description */}
          <p className="text-lg text-muted-foreground/80 max-w-3xl leading-relaxed"
          style={{paddingRight: '6rem'}}>
            Welcome! My name is Bradwell, a Canadian-sourced Manchester-based musician who mainly just makes sad songs. 
            Some of these bad boys are real bummers, just some real self-wallowing drivel. Have a listen!
          </p>

          {/* Social Links */}
          <div className="pt-6">
            <div className="flex gap-4 overflow-x-auto pb-2" style={{overflowX: 'scroll', scrollbarColor: 'white transparent',}}>

              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@BradwellMusicAccount" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 group flex-shrink-0"
              >
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-foreground font-medium" style={{ paddingLeft: 5 }}>YouTube</span>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/bradwellmusicaccount/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 group flex-shrink-0"
              >
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-foreground font-medium" style={{ paddingLeft: 5 }}>Instagram</span>
              </a>
              {/* QR Code / Linktree */}
              <button 
                onClick={() => setShowQRCode(true)}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 group flex-shrink-0"
              >
                <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <span className="text-foreground font-medium" style={{ paddingLeft: 5 }}>Scan Phone</span>
              </button>

            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 rounded-full border-muted-foreground/30 flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Music Player Section */}
      <section className="relative z-10 min-h-screen flex">
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

      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={showQRCode}
        onClose={() => setShowQRCode(false)}
      />
    </div>
  );
}
