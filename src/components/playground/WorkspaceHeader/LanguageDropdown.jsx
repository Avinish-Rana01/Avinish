import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { LANGUAGES } from '../constants';

const LanguageDropdown = ({ selectedLang, isLangOpen, setIsLangOpen, onLangChange }) => {
  return (
    <div className="relative">
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        id="lang-select-dropdown"
        className="flex items-center gap-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 bg-opacity-70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#D7E2EA] transition-colors cursor-pointer"
      >
        {LANGUAGES.find(l => l.id === selectedLang)?.name || 'Language'}
        <ChevronDown size={12} className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isLangOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsLangOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute left-0 mt-2 w-64 max-h-[360px] overflow-y-auto rounded-2xl border border-white/10 bg-[#121212]/95 backdrop-blur-xl p-2.5 z-40 shadow-2xl scrollbar-thin"
            >
              {['frontend', 'runtime', 'wasm', 'preview'].map(category => (
                <div key={category} className="mb-3 last:mb-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D7E2EA]/40 px-2 block mb-1">
                    {category === 'frontend' ? 'Frontend Dev' : category === 'runtime' ? 'Browser Runtimes' : category === 'wasm' ? 'WebAssembly Runtimes' : 'Utility & Markup'}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {LANGUAGES.filter(l => l.category === category).map(lang => (
                      <button
                        key={lang.id}
                        onClick={() => {
                          onLangChange(lang.id);
                          setIsLangOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-left text-xs font-medium transition-colors cursor-pointer ${
                          selectedLang === lang.id
                            ? 'bg-[#B600A8]/20 text-white'
                            : 'hover:bg-white/5 text-[#D7E2EA]/70'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span>{lang.name}</span>
                          <span className="text-[9px] opacity-40 font-mono">{lang.runtime}</span>
                        </div>
                        {selectedLang === lang.id && <Check size={12} className="text-white" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(LanguageDropdown);
