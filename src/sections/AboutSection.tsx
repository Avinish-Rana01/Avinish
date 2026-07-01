import React from 'react';
import { ExternalLink } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const ABOUT_TEXT =
  "With 1+ year of experience in frontend development and UI/UX design, I focus on building responsive, component-based web applications using React.js, JavaScript, and modern CSS. I enjoy working with teams that aim to create clean, high-performance digital products. Let's build something incredible together!";

/* ---- Certificates — add more entries here as needed ---- */
const CERTIFICATES = [
  {
    name: 'Certificate',
    url: 'https://namastedev.com/ranaavinish25/certificates/namaste-javascript',
  },
];

/* ---- Inline SVG decorative elements (frontend/code themed) ---- */

const CodeBracketDecor: React.FC<{ flip?: boolean }> = ({ flip = false }) => (
  <svg
    width="140"
    height="140"
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
  >
    <circle cx="70" cy="70" r="70" fill="rgba(118,33,176,0.08)" />
    <circle cx="70" cy="70" r="55" stroke="rgba(118,33,176,0.15)" strokeWidth="1" />
    <path d="M55 50L35 70L55 90" stroke="#7621B0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M85 50L105 70L85 90" stroke="#B600A8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M75 44L65 96" stroke="#D7E2EA" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const ReactLogoDecor: React.FC = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="60" cy="60" r="60" fill="rgba(182,0,168,0.07)" />
    {/* React atom orbits */}
    <ellipse cx="60" cy="60" rx="45" ry="18" stroke="rgba(215,226,234,0.2)" strokeWidth="1.5" />
    <ellipse cx="60" cy="60" rx="45" ry="18" stroke="rgba(215,226,234,0.2)" strokeWidth="1.5" transform="rotate(60 60 60)" />
    <ellipse cx="60" cy="60" rx="45" ry="18" stroke="rgba(215,226,234,0.2)" strokeWidth="1.5" transform="rotate(120 60 60)" />
    <circle cx="60" cy="60" r="7" fill="#61DAFB" opacity="0.8" />
    {/* orbiting dots */}
    <circle cx="105" cy="60" r="4" fill="#B600A8" opacity="0.7" />
    <circle cx="37.5" cy="99" r="4" fill="#7621B0" opacity="0.7" />
    <circle cx="37.5" cy="21" r="4" fill="#BE4C00" opacity="0.7" />
  </svg>
);

const TerminalDecor: React.FC = () => (
  <svg
    width="160"
    height="100"
    viewBox="0 0 160 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="160" height="100" rx="14" fill="rgba(12,12,12,0.7)" stroke="rgba(215,226,234,0.12)" strokeWidth="1" />
    {/* Traffic lights */}
    <circle cx="20" cy="18" r="5" fill="#FF5F57" />
    <circle cx="34" cy="18" r="5" fill="#FFBD2E" />
    <circle cx="48" cy="18" r="5" fill="#28CA40" />
    {/* Code lines */}
    <path d="M14 38L28 52L14 66" stroke="#7621B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="36" y="49" width="60" height="6" rx="3" fill="rgba(215,226,234,0.15)" />
    <rect x="36" y="62" width="40" height="6" rx="3" fill="rgba(182,0,168,0.4)" />
    <rect x="36" y="75" width="75" height="6" rx="3" fill="rgba(215,226,234,0.08)" />
  </svg>
);

const ComponentDecor: React.FC = () => (
  <svg
    width="140"
    height="130"
    viewBox="0 0 140 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="10" y="10" width="120" height="50" rx="10" fill="rgba(118,33,176,0.1)" stroke="rgba(118,33,176,0.3)" strokeWidth="1.5" />
    <rect x="25" y="22" width="50" height="8" rx="4" fill="rgba(215,226,234,0.2)" />
    <rect x="25" y="36" width="90" height="6" rx="3" fill="rgba(215,226,234,0.1)" />
    <rect x="25" y="48" width="70" height="6" rx="3" fill="rgba(182,0,168,0.3)" />
    {/* Arrow down */}
    <path d="M70 65V80" stroke="rgba(215,226,234,0.3)" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M65 76L70 82L75 76" stroke="rgba(215,226,234,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="10" y="85" width="55" height="35" rx="8" fill="rgba(182,0,168,0.1)" stroke="rgba(182,0,168,0.25)" strokeWidth="1.5" />
    <rect x="75" y="85" width="55" height="35" rx="8" fill="rgba(190,76,0,0.1)" stroke="rgba(190,76,0,0.25)" strokeWidth="1.5" />
    <rect x="20" y="96" width="35" height="5" rx="2.5" fill="rgba(215,226,234,0.15)" />
    <rect x="85" y="96" width="35" height="5" rx="2.5" fill="rgba(215,226,234,0.15)" />
  </svg>
);

const AboutSection: React.FC = () => {
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

      {/* Bottom-left: Terminal */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none select-none"
      >
        <div className="w-[110px] sm:w-[140px] md:w-[180px]">
          <TerminalDecor />
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

      {/* Bottom-right: Component tree */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none select-none"
      >
        <div className="w-[110px] sm:w-[150px] md:w-[190px]">
          <ComponentDecor />
        </div>
      </FadeIn>

      {/* Center content */}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-10 w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Animated paragraph + certificates + contact button */}
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium text-center leading-relaxed max-w-[560px]"
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            } as React.CSSProperties}
          />

          {/* Certificates */}
          <FadeIn delay={0.2} y={20}>
            <div className="flex flex-col items-center gap-4">
              <span
                className="font-light uppercase tracking-[0.25em] text-center"
                style={{ color: '#D7E2EA', fontSize: 'clamp(0.7rem, 1vw, 0.85rem)', opacity: 0.5 }}
              >
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
                    className="inline-flex items-center gap-2 rounded-full border font-medium uppercase tracking-widest cursor-pointer px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm no-underline transition-colors duration-200 hover:bg-white/5"
                    style={{
                      color: '#D7E2EA',
                      borderColor: 'rgba(215, 226, 234, 0.25)',
                    }}
                  >
                    {cert.name}
                    <ExternalLink size={14} strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          <ContactButton id="contact" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
