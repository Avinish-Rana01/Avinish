import React from 'react';
import { ExternalLink } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import { CodeBracketDecor, ReactLogoDecor } from '../components/decorations/SectionGraphics';
import TechnologyMarquee from '../components/TechStack/TechnologyMarquee';
import { TECHNOLOGIES } from '../constants/technologies';

const ABOUT_TEXT =
  "As a Full Stack Developer, I specialize in building end-to-end, scalable web applications. My expertise spans from crafting dynamic, animated user interfaces with React, Next.js, and Framer Motion, to architecting robust backend systems using Node.js, Express, and MongoDB. I am passionate about modern DevOps practices, seamlessly deploying high-performance digital products across AWS and cloud infrastructures. Let's build something incredible together!";

/* ---- Certificates — add more entries here as needed ---- */
const CERTIFICATES = [
  {
    name: 'Certificate',
    url: 'https://namastedev.com/ranaavinish25/certificates/namaste-javascript',
  },
];



const AboutSection = () => {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
      id="about"
    >
      {/* Top-left: Code bracket */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none select-none"
      >
        <div className="w-[100px] sm:w-[130px] md:w-[170px]">
          <CodeBracketDecor />
        </div>
      </FadeIn>



      {/* Top-right: React logo */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none select-none"
      >
        <div className="w-[100px] sm:w-[130px] md:w-[170px]">
          <ReactLogoDecor />
        </div>
      </FadeIn>

      {/* Center content */}
      <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 z-10 w-full mb-32 sm:mb-40 md:mb-48">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-fluid-hero font-display">
            About me
          </h2>
        </FadeIn>

        {/* Animated paragraph + certificates + contact button */}
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium text-center leading-relaxed max-w-[560px] text-text-primary text-[clamp(1rem,2vw,1.35rem)]"
          />

          {/* Certificates */}
          <FadeIn delay={0.2} y={20}>
            <div className="flex flex-col items-center gap-4">
              <span className="font-light uppercase tracking-[0.25em] text-center text-text-primary/50 text-[clamp(0.7rem,1vw,0.85rem)]">
                Certificates
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                {CERTIFICATES.map((cert) => (
                  <a
                    key={cert.name}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`cert-${cert.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border-primary font-medium uppercase tracking-widest cursor-pointer px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm no-underline text-text-primary transition-colors duration-200 hover:bg-white/5"
                  >
                    {cert.name}
                    <ExternalLink size={14} strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Marquee Showcase injected at the bottom to replace SVGs */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 w-full z-10 pointer-events-auto">
        <FadeIn delay={0.3} y={20}>
          <TechnologyMarquee technologies={TECHNOLOGIES} />
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
