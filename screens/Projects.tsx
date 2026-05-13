
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, SlidersHorizontal, MapPin, ArrowRight, Star, Heart, ChevronRight, Building2, Home, Landmark } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

import { ProjectCard, PROJECTS } from './CityProjects';

const FILTERS = ['All', 'New Launch', 'Under Construction', 'Ready to Move'];

const CATEGORY_FILTERS = [
  { label: 'Residential', icon: Home },
  { label: 'Commercial', icon: Building2 },
  { label: 'Luxury', icon: Landmark },
];


// ─── Sub-components ──────────────────────────────────────────────────────────

// ─── Sub-components ──────────────────────────────────────────────────────────



// ─── Main Screen ─────────────────────────────────────────────────────────────

export const ProjectsScreen = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(['f3']);

  const toggleSave = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredProjects = PROJECTS.filter(p => {
    const matchFilter = activeFilter === 'All' || p.status === activeFilter;
    const matchSearch = searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white relative">

      {/* ── Header ── */}
      <div className="bg-white px-5 pt-10 pb-3 sticky top-0 z-30 border-b border-gray-100/70 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-lg font-black text-gray-900 leading-none">Real Estate Projects</h1>
              <p className="text-[10px] text-gray-400 font-bold tracking-wide mt-0.5">
                {filteredProjects.length} projects found
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSearch(v => !v)}
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 active:scale-95 transition-transform"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Animated Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-3"
            >
              <div className="relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search project, developer, location..."
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 text-gray-800 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium outline-none border border-gray-100 focus:border-[#2FED9A] transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wide transition-all ${
                activeFilter === f
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-6 space-y-10">

        {/* ── Category Chips ── */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5">
          {CATEGORY_FILTERS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveCategory(activeCategory === label ? null : label)}
              className={`flex items-center shrink-0 gap-2 px-4 py-2 rounded-full border text-xs font-black transition-all ${
                activeCategory === label
                  ? 'bg-[#2FED9A] border-[#2FED9A] text-gray-900 shadow-md shadow-[#2FED9A]/20'
                  : 'bg-white border-gray-100 text-gray-500'
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>



        {/* ── Featured Projects List ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-lg text-gray-900">Featured Projects</h3>
            <button className="p-2 bg-gray-50 rounded-xl text-gray-600">
              <SlidersHorizontal size={16} />
            </button>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 text-gray-300">
              <Building2 size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-bold text-gray-400">No projects found</p>
              <p className="text-xs text-gray-300 mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Subscribe Banner ── */}
        <div className="bg-gradient-to-br from-[#00AEEF]/10 to-[#2FED9A]/10 rounded-[28px] p-6 border border-[#00AEEF]/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#00AEEF]/15 flex items-center justify-center shrink-0">
              <Building2 size={20} className="text-[#00AEEF]" />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-sm text-gray-900 mb-1">Project Launch Alerts</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                Get notified about new project launches and exclusive pre-launch offers in your preferred locations.
              </p>
              <button className="text-[#00AEEF] font-black text-[10px] uppercase tracking-widest">
                Subscribe for updates +
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
