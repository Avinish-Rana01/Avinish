import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import PlaygroundSection from './sections/PlaygroundSection';
import ResumeSection from './sections/ResumeSection';
import AmbientPlayer from './components/AmbientPlayer';
import DigitalDust from './components/DigitalDust';
import CameraShutter from './components/CameraShutter';
import CustomCursor from './components/CustomCursor';
import ChatButton from './components/chat/ChatButton';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { useUI } from './context/UIContext';
import Loader from './components/Loader';

// Lazy-load sections and overlays for performance
const PlaygroundPage = React.lazy(() => import('./sections/PlaygroundPage'));
const ChatPanel = React.lazy(() => import('./components/chat/ChatPanel'));

function App() {
  const { isChatOpen, hasChatOpenedOnce, toggleChat, closeChat } = useUI();
  const [isLoading, setIsLoading] = useState(true);

  // App initialization loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // 1.8 seconds premium loading intro
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Handle URL hash fragments scrolling on page mount
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      className="w-full"
      style={{
        background: '#0C0C0C',
        fontFamily: "'Kanit', sans-serif",
        overflowX: 'clip',
      }}
    >
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <MarqueeSection />
                <AboutSection />
                <ServicesSection />
                <ProjectsSection />
                <PlaygroundSection />
                <ResumeSection />
                <Footer />
              </>
            }
          />
          <Route
            path="/playground"
            element={
              <Suspense fallback={<div className="h-screen w-screen bg-[#0C0C0C]" />}>
                <PlaygroundPage />
              </Suspense>
            }
          />
        </Routes>
      </ErrorBoundary>
      <CustomCursor />
      <AmbientPlayer isOpen={isChatOpen} />
      <DigitalDust />
      <CameraShutter />

      {/* Floating AI entry button */}
      <ChatButton onClick={toggleChat} isOpen={isChatOpen} />

      {/* Lazy-loaded chat panel drawer overlay */}
      {hasChatOpenedOnce && (
        <Suspense fallback={null}>
          <ChatPanel isOpen={isChatOpen} onClose={closeChat} />
        </Suspense>
      )}

      {/* Global Initial Page Loader */}
      {isLoading && <Loader fullScreen={true} />}
    </div>
  );
}

export default App;

