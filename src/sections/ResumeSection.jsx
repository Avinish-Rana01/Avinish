import React from 'react';
import { Download } from 'lucide-react';
import FadeIn from '../components/FadeIn';

// Clean grid geometric background decoration to match premium portfolio aesthetics
const GridDecor = () => (
  <svg
    width="180"
    height="180"
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="90" cy="90" r="90" fill="rgba(118,33,176,0.03)" />
    <circle cx="90" cy="90" r="70" stroke="rgba(118,33,176,0.06)" strokeWidth="1" strokeDasharray="4 4" />
    <path d="M20 90H160" stroke="rgba(118,33,176,0.08)" strokeWidth="1" />
    <path d="M90 20V160" stroke="rgba(118,33,176,0.08)" strokeWidth="1" />
  </svg>
);

const ResumeSection = () => {
  // Official Cloudinary PDF link for the resume
  const resumeUrl = 'https://res.cloudinary.com/dvxemrtys/image/upload/v1782982971/Avinish_Rana_Frontend_Developer_mddc9j.pdf';

  const handleDownload = async () => {
    try {
      const response = await fetch(resumeUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch resume: ${response.statusText}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Avinish_Rana_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again later.');
    }
  };

  return (
    <section
      className="rounded-t-[30px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-4 sm:px-8 md:px-10 py-20 sm:py-28 md:py-36 overflow-hidden"
      style={{ background: '#FFFFFF' }}
      id="resume"
    >
      {/* Background SVG Decorations */}
      <FadeIn
        delay={0.1}
        x={-50}
        y={0}
        duration={0.9}
        className="absolute top-[10%] left-[2%] sm:left-[5%] pointer-events-none select-none opacity-40 sm:opacity-100"
      >
        <div className="w-[100px] sm:w-[150px]">
          <GridDecor />
        </div>
      </FadeIn>

      <FadeIn
        delay={0.2}
        x={50}
        y={0}
        duration={0.9}
        className="absolute bottom-[10%] right-[2%] sm:right-[5%] pointer-events-none select-none opacity-40 sm:opacity-100"
      >
        <div className="w-[100px] sm:w-[150px] rotate-45">
          <GridDecor />
        </div>
      </FadeIn>

      {/* Main Content */}
      <div className="flex flex-col items-center gap-8 sm:gap-10 max-w-3xl mx-auto z-10 relative text-center">
        {/* Header */}
        <FadeIn delay={0} y={30}>
          <span
            className="font-light uppercase tracking-[0.3em] block mb-2 sm:mb-3"
            style={{ color: '#7621B0', fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
          >
            My Background
          </span>
          <h2
            className="font-black uppercase leading-none tracking-tight animate-fade-in"
            style={{ fontSize: 'clamp(3rem, 10vw, 120px)', color: '#0C0C0C' }}
          >
            Resume
          </h2>
        </FadeIn>

        {/* Tagline */}
        <FadeIn delay={0.15} y={30}>
          <p
            className="font-medium leading-relaxed max-w-[580px]"
            style={{ color: '#3A3A3A', fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
          >
            Want to see my full professional history and technical skills? Click below to download a clean, print-friendly copy of my resume.
          </p>
        </FadeIn>

        {/* Download Button */}
        <FadeIn delay={0.3} y={30}>
          <button
            onClick={handleDownload}
            id="download-resume-btn"
            className="inline-flex items-center gap-3 rounded-full font-semibold uppercase tracking-widest text-white cursor-pointer px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-4.5 text-xs sm:text-sm no-underline transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: '#0C0C0C',
              boxShadow: '0px 10px 25px rgba(12, 12, 12, 0.15)',
              border: '2px solid #0C0C0C',
            }}
          >
            Download CV
            <Download size={16} strokeWidth={2.5} />
          </button>
        </FadeIn>
      </div>
    </section>
  );
};

export default ResumeSection;
