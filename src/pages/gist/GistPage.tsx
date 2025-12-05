import { useSong } from '../../components/SongContext';
import { SnippetsView } from '../../components/SnippetsView';
import { HeroHeader } from '../../components/HeroHeader';

export function GistPage() {
  const { dominantColor, accentColor, currentSong } = useSong();

  return (
    <div className="min-h-screen bg-background transition-all duration-1000 relative overflow-hidden">
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

      {/* Hero Section */}
      <section className="relative z-20">
        <div style={{padding: '4rem'}}>
          <HeroHeader 
              description="Perfect for sharing with venues - quick snippets of my music"
              showSocialLinks={true}
            />
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-10 px-6">
        <SnippetsView />
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
    </div>
  );
}
