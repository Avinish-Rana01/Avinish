import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, filterMode, setFilterMode }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {/* Search Input */}
      <div className="relative group flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={16} className="text-white/30 group-focus-within:text-[#B600A8] transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search names, emails, or messages..."
          className="w-full bg-white/5 border border-white/5 focus:border-[#B600A8]/40 rounded-xl pl-11 pr-10 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/20 shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/80 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 w-fit">
        <button
          onClick={() => setFilterMode('all')}
          className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
            filterMode === 'all' 
              ? 'bg-[#B600A8]/20 text-[#B600A8] shadow-sm' 
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          All Messages
        </button>
        <button
          onClick={() => setFilterMode('anonymous')}
          className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
            filterMode === 'anonymous' 
              ? 'bg-[#B600A8]/20 text-[#B600A8] shadow-sm' 
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          Anonymous
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
