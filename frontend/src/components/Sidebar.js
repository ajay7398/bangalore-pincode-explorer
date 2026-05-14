import React, { useState, useMemo } from 'react';

const CORP_COLORS = {
  'Bengaluru Central': '#f97316',
  'Bengaluru East':    '#06b6d4',
  'Bengaluru West':    '#a855f7',
  'Bengaluru North':   '#22c55e',
  'Bengaluru South':   '#f43f5e',
};

const CORPS = [
  'Bengaluru Central',
  'Bengaluru East',
  'Bengaluru West',
  'Bengaluru North',
  'Bengaluru South',
];

export default function Sidebar({ areas, open, selected, onSelect, onClose }) {
  const [filter, setFilter] = useState('');
  const [activeCorp, setActiveCorp] = useState('All');

  const filtered = useMemo(() => {
    return areas.filter(a => {
      const matchesCorp = activeCorp === 'All' || a.corporation === activeCorp;
      const matchesText =
        !filter ||
        a.area.toLowerCase().includes(filter.toLowerCase()) ||
        a.pincode.includes(filter);
      return matchesCorp && matchesText;
    });
  }, [areas, filter, activeCorp]);

  return (
    <>
      {/* Backdrop (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[900] md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`absolute left-0 top-0 bottom-0 w-[280px] bg-[#111827] border-r border-white/[0.08] z-[900] flex flex-col overflow-hidden transition-transform duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.08] flex-shrink-0">
          <span className="font-syne font-bold text-[15px] text-[#e8eaf0]">All Areas</span>
          <button
            onClick={onClose}
            className="bg-transparent border-none text-[#8892a4] hover:text-[#e8eaf0] hover:bg-white/[0.06] cursor-pointer text-sm px-1.5 py-1 rounded-md transition-all"
          >
            ✕
          </button>
        </div>

        {/* Filter input */}
        <div className="px-3 pt-3 pb-2 flex-shrink-0">
          <input
            type="text"
            placeholder="Filter areas…"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full bg-[#1a2236] border border-white/[0.08] focus:border-orange-500/40 rounded-lg px-3 py-2 text-[#e8eaf0] font-sans text-sm outline-none placeholder:text-[#8892a4] transition-colors"
          />
        </div>

        {/* Corp tabs */}
        <div className="flex flex-wrap gap-1 px-3 pb-2 flex-shrink-0">
          {/* All tab */}
          <button
            onClick={() => setActiveCorp('All')}
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border cursor-pointer transition-all
              ${activeCorp === 'All'
                ? 'bg-white/[0.08] border-white/20 text-[#e8eaf0]'
                : 'border-white/[0.08] text-[#8892a4] hover:text-[#e8eaf0] hover:border-white/20 bg-transparent'}`}
          >
            All
          </button>

          {CORPS.map(c => {
            const color = CORP_COLORS[c];
            const isActive = activeCorp === c;
            return (
              <button
                key={c}
                onClick={() => setActiveCorp(c)}
                style={isActive ? {
                  background: `${color}26`,
                  borderColor: `${color}66`,
                  color,
                } : {}}
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border cursor-pointer transition-all whitespace-nowrap
                  ${!isActive ? 'border-white/[0.08] text-[#8892a4] hover:text-[#e8eaf0] hover:border-white/20 bg-transparent' : ''}`}
              >
                {c.replace('Bengaluru ', '')}
              </button>
            );
          })}
        </div>

        {/* Count */}
        <div className="px-4 pb-2 text-[10px] font-mono text-[#8892a4] flex-shrink-0">
          {filtered.length} area{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Area list */}
        <ul className="list-none overflow-y-auto flex-1 px-2 pb-4">
          {filtered.map(area => {
            const color = CORP_COLORS[area.corporation] || '#888';
            const isSelected = selected && selected.pincode === area.pincode;
            return (
              <li key={area.pincode}>
                <button
                  onClick={() => onSelect(area)}
                  style={isSelected ? { borderColor: `${color}4d` } : {}}
                  className={`flex items-center gap-2.5 w-full bg-transparent rounded-lg px-2.5 py-2 cursor-pointer text-left transition-all mb-0.5 border
                    ${isSelected
                      ? 'bg-white/[0.06] border-current'
                      : 'border-transparent hover:bg-white/[0.04]'}`}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: color }}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="block text-[13px] text-[#e8eaf0] font-medium truncate">
                      {area.area}
                    </span>
                    <span className="block text-[10px] text-[#8892a4] mt-px">
                      {area.corporation.replace('Bengaluru ', '')}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#8892a4] flex-shrink-0">
                    {area.pincode}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
