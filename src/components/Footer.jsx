import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0C0C0C] py-10 px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6 select-none relative z-10">
      <div className="flex flex-col items-center sm:items-start gap-1">
        <span className="text-sm font-black uppercase tracking-[0.25em] text-white">
          Avinish Rana
        </span>
        <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40">
          Creative Frontend Engineer • © {new Date().getFullYear()}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="text-[#D7E2EA]/60 hover:text-[#B600A8] transition-colors p-2 border border-white/5 rounded-full hover:bg-white/5 hover:border-white/10"
        >
          <Github size={16} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="text-[#D7E2EA]/60 hover:text-[#B600A8] transition-colors p-2 border border-white/5 rounded-full hover:bg-white/5 hover:border-white/10"
        >
          <Linkedin size={16} />
        </a>
        <a
          href="mailto:contact@avinish.dev"
          aria-label="Send Email"
          className="text-[#D7E2EA]/60 hover:text-[#B600A8] transition-colors p-2 border border-white/5 rounded-full hover:bg-white/5 hover:border-white/10"
        >
          <Mail size={16} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
