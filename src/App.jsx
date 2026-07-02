import React, { useState, Suspense } from 'react';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import ResumeSection from './sections/ResumeSection';
import AmbientPlayer from './components/AmbientPlayer';
import DigitalDust from './components/DigitalDust';
import CameraShutter from './components/CameraShutter';
import ChatButton from './components/chat/ChatButton';

// Lazy-load ChatPanel component for performance
const ChatPanel = React.lazy(() => import('./components/chat/ChatPanel'));

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasChatOpenedOnce, setHasChatOpenedOnce] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen((prev) => !prev);
    setHasChatOpenedOnce(true);
  };

  return (
    <div
      className="w-full"
      style={{
        background: '#0C0C0C',
        fontFamily: "'Kanit', sans-serif",
        overflowX: 'clip',
      }}
    >
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ResumeSection />
      <AmbientPlayer />
      <DigitalDust />
      <CameraShutter />

      {/* Floating AI entry button */}
      <ChatButton onClick={handleChatToggle} isOpen={isChatOpen} />

      {/* Lazy-loaded chat panel drawer overlay */}
      {hasChatOpenedOnce && (
        <Suspense fallback={null}>
          <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}

export default App;

