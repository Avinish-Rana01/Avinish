import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlaygroundHero = ({ isWorkspaceActive, onStartCoding }) => {
  return (
    <AnimatePresence>
      {!isWorkspaceActive && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="min-h-screen w-full flex flex-col justify-between relative px-5 sm:px-8 md:px-10 py-12 select-none overflow-hidden"
        >
          {/* Grid graphic overlay backdrop */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(118, 33, 176, 0.08) 0%, transparent 70%),
                               radial-gradient(rgba(215, 226, 234, 0.03) 1px, transparent 0)`,
              backgroundSize: '100% 100%, 20px 20px',
            }}
          />

          {/* Header: Back navigation */}
          <header className="z-10 w-full flex justify-between items-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-75"
              style={{ color: '#D7E2EA' }}
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              Back to Portfolio
            </Link>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7621B0] animate-pulse" />
              <span className="text-xs uppercase tracking-widest opacity-60">WASM Workspace</span>
            </div>
          </header>

          {/* Core Hero Heading Grid */}
          <div className="flex-1 flex flex-col justify-center items-center gap-6 text-center z-10 max-w-4xl mx-auto py-12">
            <span
              className="font-light uppercase tracking-[0.3em] block mb-2"
              style={{ color: '#B600A8', fontSize: 'clamp(0.8rem, 1.2vw, 1.1rem)' }}
            >
              Avinish DevLab
            </span>
            <h1
              className="font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 11vw, 150px)', color: '#D7E2EA' }}
            >
              Developer
              <br />
              Playground
            </h1>
            <p
              className="font-medium leading-relaxed max-w-[620px] mb-8"
              style={{ color: '#D7E2EA', opacity: 0.75, fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)' }}
            >
              Write code directly inside my portfolio. Run frontend layouts, run Python calculations, execute SQL query tables, and compile scripts in client-side WebAssembly runtimes.
            </p>

            <button
              onClick={onStartCoding}
              id="start-coding-btn"
              className="inline-flex items-center gap-3 rounded-full font-semibold uppercase tracking-widest text-white cursor-pointer px-10 py-4 sm:px-12 sm:py-4.5 text-xs sm:text-sm transition-transform hover:scale-[1.03]"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 10px 30px rgba(182, 0, 168, 0.25), inset 4px 4px 12px #7721B1',
                outline: '2px solid rgba(255, 255, 255, 0.9)',
                outlineOffset: '-3px',
              }}
            >
              Start Coding
              <Play size={14} fill="currentColor" />
            </button>
          </div>

          {/* Footer label */}
          <footer className="z-10 w-full flex justify-center text-[#D7E2EA]/40 text-[10px] uppercase tracking-widest">
            A browser-powered coding experience built by Avinish Rana • © 2026
          </footer>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default PlaygroundHero;
