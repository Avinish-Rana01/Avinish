import React from 'react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import Magnet from '../components/Magnet';

const HeroSection = () => {
  return (
    <section
      className="h-screen flex flex-col relative"
      style={{ overflowX: 'clip' }}
      id="hero"
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav">
        <nav className="flex justify-between items-center px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-8">
          {['About', 'Skills', 'Projects', 'Resume', 'Contact'].map((link) => {
            const id = link.toLowerCase();
            return (
              <a
                key={link}
                href={`/${id}`}
                id={`nav-${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const targetElement = document.getElementById(id);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', `/${id}`);
                  }
                }}
                className="text-[0.65rem] sm:text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
                style={{ color: '#D7E2EA' }}
              >
                {link}
              </a>
            );
          })}
        </nav>
      </FadeIn>

      {/* Hero Heading */}
      <FadeIn delay={0.15} y={40} className="overflow-hidden">
        <h1
          className="hero-heading font-black uppercase tracking-tight leading-[0.85] w-full text-[18vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-4 sm:mt-4 md:-mt-5"
          style={{ paddingLeft: '0.01em' }}
        >
          Hi, i&apos;m
          <br />
          avinish
        </h1>
      </FadeIn>

      {/* Hero Portrait — absolutely centered */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-0 right-0 mx-auto z-10 top-[26%] sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src="https://res.cloudinary.com/dvxemrtys/image/upload/v1782889880/ggggggggg-removebg-preview_nauqds.png"
            alt="Avinish Rana"
            className="w-full h-auto object-contain"
            draggable={false}
            fetchPriority="high"
          />
        </Magnet>
      </FadeIn>

      {/* Bottom bar */}
      <div className="mt-auto flex flex-col sm:flex-row justify-start items-start sm:items-end gap-6 sm:gap-12 px-4 sm:px-6 md:px-10 pb-20 sm:pb-8 md:pb-10 relative z-20 pointer-events-auto">
        {/* Left: tagline */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug max-w-[180px] sm:max-w-[220px] md:max-w-[260px]"
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(0.85rem, 1.4vw, 1.5rem)',
            }}
          >
            a frontend developer driven by crafting responsive and high-performance web experiences
          </p>
        </FadeIn>

        {/* Contact Button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton id="hero-contact-btn" />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
