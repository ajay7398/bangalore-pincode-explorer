import React from 'react';

const CORP_COLORS = {
  'Bengaluru Central': '#f97316',
  'Bengaluru East':    '#06b6d4',
  'Bengaluru West':    '#a855f7',
  'Bengaluru North':   '#22c55e',
  'Bengaluru South':   '#f43f5e',
};

const CORP_ICONS = {
  'Bengaluru Central': '🏛️',
  'Bengaluru East':    '💻',
  'Bengaluru West':    '🏘️',
  'Bengaluru North':   '✈️',
  'Bengaluru South':   '🌆',
};

export default function InfoPanel({ selected, error, multiMatches, onSelect, onClose }) {
  const color = selected ? (CORP_COLORS[selected.corporation] || '#888') : null;

  return (
    <div className="relative bg-[#111827]/95 border border-white/10 rounded-2xl overflow-hidden min-w-[240px] max-w-[300px] backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-2.5 right-2.5 z-10 bg-white/[0.06] hover:bg-white/[0.12] border-none text-[#8892a4] hover:text-[#e8eaf0] w-6 h-6 rounded-md flex items-center justify-center text-xs cursor-pointer transition-all"
      >
        ✕
      </button>

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-2.5 p-4 text-red-300 text-sm">
          <span className="text-lg flex-shrink-0">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Selected area card */}
      {selected && (
        <div className="flex items-start gap-3 p-4 relative">
          {/* Accent bar */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{ background: color }}
          />

          <div className="text-[26px] flex-shrink-0 leading-none mt-0.5">
            {CORP_ICONS[selected.corporation] || '📍'}
          </div>

          <div className="flex-1">
            <div className="font-syne font-extrabold text-lg text-[#e8eaf0] leading-tight mb-1 pr-6">
              {selected.area}
            </div>
            <div
              className="font-mono text-xl font-medium mb-1.5 tracking-wide"
              style={{ color }}
            >
              {selected.pincode}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium mb-1" style={{ color }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
              {selected.corporation}
            </div>
            <div className="font-mono text-[10px] text-[#8892a4]">
              {selected.lat.toFixed(4)}°N, {selected.lng.toFixed(4)}°E
            </div>
          </div>
        </div>
      )}

      {/* Multiple matches */}
      {multiMatches.length > 1 && (
        <div className="border-t border-white/[0.08] p-2.5">
          <div className="text-[10px] uppercase tracking-[0.1em] text-[#8892a4] mb-1.5 px-1">
            Multiple matches found:
          </div>
          {multiMatches.map(a => {
            const c = CORP_COLORS[a.corporation];
            return (
              <button
                key={a.pincode}
                onClick={() => onSelect(a)}
                className={`flex items-center gap-2 w-full bg-transparent border rounded-lg px-2 py-1.5 cursor-pointer text-left mb-0.5 transition-all
                  ${selected?.pincode === a.pincode
                    ? 'bg-white/[0.07] border-white/10'
                    : 'border-transparent hover:bg-white/[0.05]'}`}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c }} />
                <span className="flex-1 text-xs text-[#e8eaf0]">{a.area}</span>
                <span className="font-mono text-[11px] text-[#8892a4]">{a.pincode}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
