import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import ResumeSection from './sections/ResumeSection';
import AmbientPlayer from './components/AmbientPlayer';
import DigitalDust from './components/DigitalDust';
import CameraShutter from './components/CameraShutter';

function App() {
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
    </div>
  );
}

export default App;

