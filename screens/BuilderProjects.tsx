import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, Heart, ChevronDown, SlidersHorizontal
} from 'lucide-react';
import { FilterOverlay } from '../components/FilterOverlay';
import { PROJECTS, ProjectCard, Project } from './CityProjects';

export const BuilderProjectsScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const cityParam = searchParams.get('city'); 
  const buildersParam = searchParams.get('builders'); 
  const pageSizeParam = searchParams.get('page_size') || '30';
  const pageParam = searchParams.get('page') || '1';
  
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Relevance (Default)');
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
  const [activePropertyType, setActivePropertyType] = useState('All');
  const [isMapActive, setIsMapActive] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Helper to parse string prices into absolute numerical values for sorting (Returns Lakhs)
  const parsePrice = (priceStr: string) => {
    const norm = priceStr.toLowerCase().replace(/₹|,/g, '');
    const match = norm.match(/([\d.]+)\s*(cr|l)/);
    if (!match) return 0;
    let val = parseFloat(match[1]);
    if (match[2] === 'cr') val *= 100; // normalize to L
    return val;
  };

  useEffect(() => {
    let filtered = [...PROJECTS];
    
    // Builders Parameter Filter
    if (buildersParam === 'lodha') {
       filtered = filtered.filter(p => p.builder === 'Lodha Group');
    } else if (buildersParam === 'oberoi') {
       filtered = filtered.filter(p => p.builder === 'Oberoi Realty');
    }

    // Search Query Filter
    if (searchQuery.trim() !== '') {
      const lowerQ = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(lowerQ) || 
        p.builder.toLowerCase().includes(lowerQ) || 
        p.location.toLowerCase().includes(lowerQ)
      );
    }

    // Property Type Filter
    if (activePropertyType !== 'All') {
      if (activePropertyType === 'Residential') {
         filtered = filtered.filter(p => p.configs.some(c => c.toLowerCase().includes('bhk')));
      } else if (activePropertyType === 'Commercial') {
         filtered = filtered.filter(p => p.configs.some(c => c.toLowerCase().includes('office') || c.toLowerCase().includes('shop')));
      } else if (activePropertyType === 'Plots') {
         filtered = filtered.filter(p => p.configs.some(c => c.toLowerCase().includes('plot') || c.toLowerCase().includes('yard')));
      } else if (activePropertyType === 'Agricultural') {
         filtered = filtered.filter(p => p.configs.some(c => c.toLowerCase().includes('farm') || c.toLowerCase().includes('grove') || c.toLowerCase().includes('land')));
      }
    }

    // Sorting 
    if (sortOption === 'Price – Low to High') {
      filtered.sort((a, b) => parsePrice(a.priceRange) - parsePrice(b.priceRange));
    } else if (sortOption === 'Price – High to Low') {
      filtered.sort((a, b) => parsePrice(b.priceRange) - parsePrice(a.priceRange));
    } else if (sortOption === 'Newest First') {
      // Example implementation: prioritize 'New Launch' over 'Ready to Move'
      const statusWeight = (s: string) => s === 'New Launch' ? 2 : s === 'Under Construction' ? 1 : 0;
      filtered.sort((a, b) => statusWeight(b.status) - statusWeight(a.status));
    } else if (sortOption === 'Possession – Earliest') {
      // Prioritize Ready to move over under construction
      const possWeight = (s: string) => s === 'Ready to Move' ? 2 : s === 'Under Construction' ? 1 : 0;
      filtered.sort((a, b) => possWeight(b.status) - possWeight(a.status));
    }
    
    setProjects(filtered);
  }, [cityParam, buildersParam, searchQuery, sortOption, activePropertyType]);

  const builderName = projects.length > 0 ? projects[0].builder : 'Top Builder';

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-[#f8fafc] pb-24 relative">
      
      {/* ── Header ── */}
      <div className="bg-white sticky top-0 z-30 flex flex-col pt-10 px-4 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-600">
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${builderName}`} 
              className="w-full h-10 pl-4 pr-10 bg-white border border-gray-200 rounded-full text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/20 shadow-inner"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-600">
            <Heart size={20} />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
          <button onClick={() => setIsFilterOpen(true)} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full text-xs font-bold text-gray-700 whitespace-nowrap bg-white hover:bg-gray-50">
            <SlidersHorizontal size={14} className="text-gray-500" />
            <span>Filters</span>
          </button>
          
          <button onClick={() => setIsSortOpen(true)} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-full text-xs font-bold text-gray-700 whitespace-nowrap bg-white">
            <span>Sort: {sortOption.split(' ')[0]}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          
          <button onClick={() => setIsPropertyTypeOpen(true)} className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 border rounded-full text-xs font-bold whitespace-nowrap ${activePropertyType !== 'All' ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
            <span>{activePropertyType === 'All' ? 'Property Type' : activePropertyType}</span>
            <ChevronDown size={14} className={activePropertyType !== 'All' ? 'text-white/70' : 'text-gray-400'} />
          </button>
          
          <button onClick={() => setIsMapActive(!isMapActive)} className={`shrink-0 px-4 py-1.5 border rounded-full text-xs font-bold whitespace-nowrap ${isMapActive ? 'bg-[#2FED9A] text-gray-900 border-[#2FED9A]' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
            BHK Map
          </button>
        </div>
      </div>

      <div className="px-5 py-4 flex items-center justify-between">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
          {projects.length} PROJECTS FOUND
        </p>
      </div>

      {/* ── Project Listing ── */}
      <div className="px-4 py-2 flex flex-col">
        {projects.slice(0, visibleCount).map((project, idx) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {/* Pagination Label & Button */}
        {visibleCount < projects.length && (
          <div className="py-10 text-center">
            <p className="text-xs text-gray-400 font-bold mb-4">Showing {Math.min(visibleCount, projects.length)} of {projects.length} properties</p>
            <button 
              onClick={() => {
                setIsLoadingMore(true);
                setTimeout(() => {
                  setVisibleCount(prev => prev + 3);
                  setIsLoadingMore(false);
                }, 800);
              }}
              disabled={isLoadingMore}
              className="w-full h-14 border-2 border-dashed border-[#00AEEF]/30 text-[#00AEEF] font-black text-sm rounded-2xl active:bg-[#00AEEF]/5 transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              {isLoadingMore ? (
                <>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-[#00AEEF] border-t-transparent rounded-full"
                  />
                  <span>Loading...</span>
                </>
              ) : (
                "Show more properties"
              )}
            </button>
          </div>
        )}

        {visibleCount >= projects.length && projects.length > 0 && (
          <div className="py-10 text-center">
             <p className="text-xs text-gray-300 font-black uppercase tracking-[0.2em]">No more properties available</p>
          </div>
        )}
      </div>

      {/* Screen 2: Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <FilterOverlay onClose={() => setIsFilterOpen(false)} pageSize={pageSizeParam} />
        )}
      </AnimatePresence>

      {/* Screen 3: Sort Bottom Sheet */}
      <AnimatePresence>
        {isSortOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col justify-end"
            onClick={() => setIsSortOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-[32px] p-6 pb-10"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              <h2 className="text-xl font-black text-gray-900 mb-6">Sort by</h2>
              <div className="space-y-4">
                {['Relevance (Default)', 'Price – Low to High', 'Price – High to Low', 'Newest First', 'Possession – Earliest'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSortOption(opt);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left py-4 px-5 rounded-2xl text-sm font-black transition-all ${
                      sortOption === opt ? 'bg-[#F0FBFF] text-[#00AEEF] border border-[#00AEEF]/20' : 'bg-gray-50 text-gray-600 border border-transparent'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen 4: Property Type Bottom Sheet */}
      <AnimatePresence>
        {isPropertyTypeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col justify-end"
            onClick={() => setIsPropertyTypeOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-[32px] p-6 pb-10"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-gray-900">Property Type</h2>
                {activePropertyType !== 'All' && (
                  <button onClick={() => { setActivePropertyType('All'); setIsPropertyTypeOpen(false); }} className="text-xs font-bold text-[#00AEEF]">Clear</button>
                )}
              </div>
              <div className="space-y-4">
                {['All', 'Residential', 'Commercial', 'Plots', 'Agricultural'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setActivePropertyType(opt);
                      setIsPropertyTypeOpen(false);
                    }}
                    className={`w-full text-left py-4 px-5 rounded-2xl text-sm font-black transition-all ${
                      activePropertyType === opt ? 'bg-[#F0FBFF] text-[#00AEEF] border border-[#00AEEF]/20' : 'bg-gray-50 text-gray-600 border border-transparent'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
