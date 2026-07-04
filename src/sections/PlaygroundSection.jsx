import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

// Abstract, floating developer-inspired workspace visual
const PlaygroundVisual = () => {
  return (
    <div className="w-full max-w-[340px] sm:max-w-[420px] aspect-[4/3] flex items-center justify-center relative my-4 sm:my-8 pointer-events-none select-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80 sm:opacity-100"
      >
        <defs>
          <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7621B0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#B600A8" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="neonLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7621B0" />
            <stop offset="50%" stopColor="#B600A8" />
            <stop offset="100%" stopColor="#BE4C00" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer concentric tracking circle */}
        <motion.circle
          cx="200"
          cy="150"
          r="120"
          stroke="rgba(215, 226, 234, 0.04)"
          strokeWidth="1"
          strokeDasharray="4 8"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />

        {/* Mid-ground grid backdrop */}
        <path
          d="M 120 150 L 280 150 M 200 70 L 200 230"
          stroke="rgba(215, 226, 234, 0.05)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Orbiting coordinate tracks */}
        <motion.circle
          cx="200"
          cy="150"
          r="85"
          stroke="url(#glowGrad)"
          strokeWidth="1.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* Stylized code brackets */}
        <motion.g
          initial={{ opacity: 0.8 }}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Left bracket */}
          <path
            d="M 160 120 L 140 150 L 160 180"
            stroke="#7621B0"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right bracket */}
          <path
            d="M 240 120 L 260 150 L 240 180"
            stroke="#B600A8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Diagonal slash */}
          <line
            x1="210"
            y1="115"
            x2="190"
            y2="185"
            stroke="rgba(215, 226, 234, 0.3)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Pulse generator rings */}
        <motion.circle
          cx="200"
          cy="150"
          r="30"
          stroke="#7621B0"
          strokeWidth="1"
          opacity="0.1"
          animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Orbiting particles */}
        {/* Particle 1: Purple on orbit */}
        <motion.circle
          cx="200"
          cy="65"
          r="4.5"
          fill="#7621B0"
          filter="url(#softGlow)"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '200px 150px' }}
          // Custom SVG orbital rotation using inline transform style
          transform="rotate(45 200 150)"
        />
        {/* Particle 2: Neon Pink on outer tracking circle */}
        <motion.circle
          cx="200"
          cy="30"
          r="3"
          fill="#B600A8"
          style={{ transformOrigin: '200px 150px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        {/* Particle 3: White spark on diagonal line */}
        <motion.circle
          cx="198"
          cy="155"
          r="2.5"
          fill="#FFFFFF"
          filter="url(#softGlow)"
          animate={{
            cy: [120, 180, 120],
            cx: [208, 192, 208],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Glowing connector lines representing code branches */}
        <motion.path
          d="M 285 150 L 320 150 L 330 140"
          stroke="url(#neonLine)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 115 150 L 80 150 L 70 160"
          stroke="url(#neonLine)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        />
      </svg>
    </div>
  );
};

const PlaygroundSection = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40 overflow-hidden"
      style={{ background: '#0C0C0C' }}
      id="playground"
    >
      {/* Abstract Background SVG Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(118, 33, 176, 0.05) 0%, transparent 80%)`,
        }}
      />

      <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 z-10 max-w-4xl mx-auto w-full text-center">
        {/* Label */}
        <FadeIn delay={0} y={30}>
          <span
            className="font-light uppercase tracking-[0.25em] block mb-1 sm:mb-2"
            style={{ color: '#D7E2EA', opacity: 0.5, fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
          >
            Interactive Space
          </span>
        </FadeIn>

        {/* Heading */}
        <FadeIn delay={0.1} y={30}>
          <h2
            className="font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)', color: '#D7E2EA' }}
          >
            Playground
          </h2>
        </FadeIn>

        {/* Supporting description */}
        <FadeIn delay={0.2} y={30}>
          <p
            className="font-medium leading-relaxed max-w-[560px]"
            style={{
              color: '#D7E2EA',
              opacity: 0.75,
              fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)',
            }}
          >
            You&apos;ve seen what I&apos;ve built. Now step inside an interactive browser sandbox to experiment, compile snippets, and see live UI rendering in real time.
          </p>
        </FadeIn>

        {/* Vector Developer Visual */}
        <FadeIn delay={0.3} y={30}>
          <PlaygroundVisual />
        </FadeIn>

        {/* CTA Button */}
        <FadeIn delay={0.4} y={30}>
          <Link
            id="launch-playground-btn"
            to="/playground"
            className="inline-flex items-center gap-3 rounded-full font-semibold uppercase tracking-widest text-white cursor-pointer px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-4.5 text-xs sm:text-sm no-underline transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow: '0px 10px 30px rgba(182, 0, 168, 0.15), inset 4px 4px 12px #7721B1',
              outline: '2px solid rgba(255, 255, 255, 0.9)',
              outlineOffset: '-3px',
            }}
          >
            Launch DevLab
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};

export default PlaygroundSection;
