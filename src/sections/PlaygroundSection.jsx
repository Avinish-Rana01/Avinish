import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import PlaygroundBackground from '../components/PlaygroundBackground';


const PlaygroundSection = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-16 sm:py-32 md:py-40 overflow-hidden bg-bg-primary min-h-[70vh] md:min-h-[80vh]"
      id="playground"
    >
      {/* Layer 0: Sci-Fi Animation Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <PlaygroundBackground />
      </div>

      {/* Layer 1: Blur Overlay */}
      <div className="absolute inset-0 z-[1] backdrop-blur-[2px] bg-bg-primary/50 pointer-events-none" />

      {/* Layer 2: Interactive Content */}
      <div className="relative z-[2] flex flex-col items-center gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto w-full text-center">
        {/* Label */}
        <FadeIn delay={0} y={30}>
          <span className="font-light uppercase tracking-[0.25em] block mb-1 sm:mb-2 text-text-primary/50 text-[clamp(0.7rem,1vw,0.85rem)]">
            Interactive Space
          </span>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1} y={30}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-fluid-h2">
            Playground
          </h2>
        </FadeIn>

        {/* Supporting description */}
        <FadeIn delay={0.2} y={30}>
          <p className="font-medium leading-relaxed max-w-[560px] text-text-primary/75 text-fluid-body">
            You&apos;ve seen what I&apos;ve built. Now step inside an interactive browser sandbox to experiment, compile snippets, and see live UI rendering in real time.
          </p>
        </FadeIn>



        {/* CTA Button */}
        <FadeIn delay={0.4} y={30}>
          <Link
            id="launch-playground-btn"
            to="/playground"
            className="launch-devlab-btn inline-flex items-center justify-center rounded-full font-semibold uppercase tracking-widest text-white cursor-pointer px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-4.5 text-xs sm:text-sm no-underline transition-shadow duration-300 hover:shadow-lg"
          >
            <svg height={20} width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor" />
            </svg>
            <span>Launch DevLab</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};

export default PlaygroundSection;
