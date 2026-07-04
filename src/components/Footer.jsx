import React from 'react';
import { Mail } from 'lucide-react';

const Github = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LeetCode = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-1.042-1.503-1.1-2.428a3.109 3.109 0 0 1 .184-1.554 2.87 2.87 0 0 1 1.414-1.636c.214-.1.442-.169.678-.204.238-.035.48-.033.719.006a2.894 2.894 0 0 1 1.636 1.01l4.526 5.372 1.488-1.59-4.708-5.589c-.569-.675-.85-1.56-.787-2.463.063-.903.468-1.737 1.144-2.348l3.854-4.126L13.484 0zm3.896 14.887a1.381 1.381 0 0 0-.96.438 1.376 1.376 0 0 0 .003 1.955l2.429 2.424a2.915 2.915 0 0 1 0 4.12l-5.698 5.692a3.024 3.024 0 0 1-4.203 0l-5.699-5.692a1.376 1.376 0 0 0-1.955.003 1.374 1.374 0 0 0-.003 1.951l5.698 5.692a5.795 5.795 0 0 0 8.113 0l5.698-5.692a5.684 5.684 0 0 0 0-8.026l-2.429-2.424a1.38 1.38 0 0 0-.994-.44z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0C0C0C] py-10 px-5 pb-24 sm:pb-10 sm:px-10 sm:pr-32 flex flex-col sm:flex-row items-center justify-between gap-6 select-none relative z-10">
      <div className="flex flex-col items-center sm:items-start gap-1">
        <span className="text-sm font-black uppercase tracking-[0.25em] text-white">
          Avinish Rana
        </span>
        <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40">
          Creative Frontend Engineer • © {new Date().getFullYear()}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
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
          href="https://instagram.com/ig_avinish01"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Profile"
          className="text-[#D7E2EA]/60 hover:text-[#B600A8] transition-colors p-2 border border-white/5 rounded-full hover:bg-white/5 hover:border-white/10"
        >
          <Instagram size={16} />
        </a>
        <a
          href="https://leetcode.com/u/Avinish-Rana01/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LeetCode Profile"
          className="text-[#D7E2EA]/60 hover:text-[#B600A8] transition-colors p-2 border border-white/5 rounded-full hover:bg-white/5 hover:border-white/10"
        >
          <LeetCode size={16} />
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
