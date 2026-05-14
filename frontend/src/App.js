import React, { useState, useEffect, useCallback } from 'react';
import MapView from './components/MapView';
import SearchBar from './components/SearchBar';
import InfoPanel from './components/InfoPanel';
import Sidebar from './components/Sidebar';

const API = 'http://localhost:8000';

export default function App() {
  const [areas, setAreas] = useState([]);
  const [selected, setSelected] = useState(null);
  const [flyTo, setFlyTo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [multiMatches, setMultiMatches] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/areas`)
      .then(r => r.json())
      .then(d => setAreas(d.areas))
      .catch(() => setError('Cannot connect to backend. Make sure the Python server is running on port 8000.'));
  }, []);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setMultiMatches([]);

    const isPincode = /^\d+$/.test(query.trim());
    const param = isPincode ? `pincode=${query.trim()}` : `area=${encodeURIComponent(query.trim())}`;

    try {
      const res = await fetch(`${API}/api/lookup?${param}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || 'Not found.');
        setSelected(null);
        return;
      }

      if (data.matches) {
        setMultiMatches(data.matches);
        setSelected(data.matches[0]);
        setFlyTo({ lat: data.matches[0].lat, lng: data.matches[0].lng });
      } else {
        setSelected(data);
        setFlyTo({ lat: data.lat, lng: data.lng });
      }
    } catch {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleMarkerClick = useCallback((area) => {
    setSelected(area);
    setError('');
    setMultiMatches([]);
  }, []);

  const handleSidebarSelect = useCallback((area) => {
    setSelected(area);
    setFlyTo({ lat: area.lat, lng: area.lng });
    setError('');
    setMultiMatches([]);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0a0e1a] text-[#e8eaf0] font-sans">
      {/* Header */}
      <header className="flex items-center gap-4 px-5 h-16 bg-[#111827] border-b border-white/[0.08] flex-shrink-0 z-[1000]">
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Toggle sidebar"
            className="flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer group"
          >
            <span className="block w-5 h-0.5 bg-[#8892a4] rounded group-hover:bg-[#e8eaf0] transition-colors" />
            <span className="block w-5 h-0.5 bg-[#8892a4] rounded group-hover:bg-[#e8eaf0] transition-colors" />
            <span className="block w-5 h-0.5 bg-[#8892a4] rounded group-hover:bg-[#e8eaf0] transition-colors" />
          </button>

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <span className="text-2xl text-orange-500 leading-none">⬡</span>
            <div>
              <div className="font-syne font-extrabold text-base text-[#e8eaf0] whitespace-nowrap">
                Bengaluru Explorer
              </div>
              <div className="font-mono text-[10px] text-[#8892a4] whitespace-nowrap">
                5-Corporation Map · 2026
              </div>
            </div>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} loading={loading} />
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          areas={areas}
          open={sidebarOpen}
          selected={selected}
          onSelect={handleSidebarSelect}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Map */}
        <main className="flex-1 relative">
          <MapView
            areas={areas}
            selected={selected}
            flyTo={flyTo}
            onMarkerClick={handleMarkerClick}
          />

          {/* Info Panel overlay */}
          {(selected || error || multiMatches.length > 0) && (
            <div className="absolute bottom-7 right-4 z-[800] animate-slide-up">
              <InfoPanel
                selected={selected}
                error={error}
                multiMatches={multiMatches}
                onSelect={handleSidebarSelect}
                onClose={() => { setSelected(null); setError(''); setMultiMatches([]); }}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
