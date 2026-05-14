import React, { useState } from 'react';

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 max-w-md">
      {/* Input wrapper */}
      <div className="flex items-center flex-1 bg-[#1a2236] border border-white/[0.08] rounded-[10px] px-3 h-10 focus-within:border-orange-500/50 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.08)] transition-all">
        {/* Search icon */}
        <svg className="w-4 h-4 text-[#8892a4] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          placeholder="Search pincode or area…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoComplete="off"
          className="flex-1 bg-transparent border-none outline-none text-[#e8eaf0] font-sans text-sm px-2 placeholder:text-[#8892a4]"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear"
            className="text-[#8892a4] hover:text-[#e8eaf0] text-xs px-1 py-0.5 rounded bg-transparent border-none cursor-pointer transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="flex items-center justify-center w-10 h-10 bg-orange-500 border-none rounded-[10px] cursor-pointer text-white flex-shrink-0 transition-all hover:opacity-85 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
      >
        {loading ? (
          <span className="block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-tw-spin" />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </button>
    </form>
  );
}
