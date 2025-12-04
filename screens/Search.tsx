
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Clock, X, SlidersHorizontal, MapPin, TrendingUp, ArrowRight, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Property } from '../types';
import { Button } from '../components/UI';

interface Props {
  properties: Property[];
}

// Filter Option Types
interface FilterState {
  category: 'Buy' | 'Rent';
  budget: string | null;
  bhk: string[];
  availability: string[];
  possession: string[];
  age: string[];
  area: string | null;
}

const INITIAL_FILTERS: FilterState = {
  category: 'Buy',
  budget: null,
  bhk: [],
  availability: [],
  possession: [],
  age: [],
  area: null
};

export const SearchScreen = ({ properties }: Props) => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>(['Luxury Villa', 'Apartment in NY', '3 BHK Rental']);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  
  // Filter Modal State
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [tempFilters, setTempFilters] = useState<FilterState>(INITIAL_FILTERS);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredProperties([]);
    } else {
      const lowerQuery = query.toLowerCase();
      const results = properties.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) ||
        p.city.toLowerCase().includes(lowerQuery) ||
        p.address.toLowerCase().includes(lowerQuery) ||
        p.type.toLowerCase().includes(lowerQuery)
      );
      setFilteredProperties(results);
    }
  }, [query, properties]);

  const handleSearch = (term: string) => {
    setQuery(term);
    addToHistory(term);
  };

  const addToHistory = (term: string) => {
    if (!term.trim()) return;
    setHistory(prev => {
      const newHistory = [term, ...prev.filter(h => h !== term)];
      return newHistory.slice(0, 5);
    });
  };

  const removeFromHistory = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(h => h !== term));
  };

  const clearHistory = () => setHistory([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addToHistory(query);
      (e.target as HTMLInputElement).blur();
    }
  };

  // -- Filter Handlers --

  const openFilters = () => {
    setTempFilters(filters);
    setShowFilters(true);
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setShowFilters(false);
    // Here you would actually filter the `properties` list based on `tempFilters`
    // For now, we just close the modal to simulate the action.
    if (query === '') {
        // If no query, maybe show all properties that match filters?
        // For this demo, let's just log.
        console.log("Filters applied:", tempFilters);
    }
  };

  const toggleFilterArray = (key: keyof FilterState, value: string) => {
    setTempFilters(prev => {
      const arr = prev[key] as string[];
      const newArr = arr.includes(value) 
        ? arr.filter(item => item !== value)
        : [...arr, value];
      return { ...prev, [key]: newArr };
    });
  };

  const setFilterValue = (key: keyof FilterState, value: any) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  // -- UI Components for Filters --

  const FilterSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-gray-800 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );

  const FilterPill: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${
        active 
          ? 'bg-primary text-text border-primary shadow-sm' 
          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="h-full overflow-y-auto no-scrollbar pt-8 px-5 pb-24 bg-gray-50 relative">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>
      
      {/* Search Input */}
      <div className="relative mb-6 z-20">
         <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
         <input 
           type="text" 
           value={query}
           onChange={(e) => setQuery(e.target.value)}
           onKeyDown={handleKeyDown}
           placeholder="Search properties, area, city..." 
           className="w-full bg-white text-gray-800 pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
         />
         {query ? (
           <button 
             onClick={() => setQuery('')}
             className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200 transition-colors"
           >
             <X size={14} className="text-gray-600" />
           </button>
         ) : (
           <button 
             onClick={openFilters}
             className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-50 p-1.5 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
           >
             <SlidersHorizontal size={16} className="text-gray-600" />
           </button>
         )}
      </div>

      {/* Search History vs Results */}
      {query.trim() === '' ? (
        <div className="animate-fade-in">
          {/* Recent Searches */}
          {history.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Searches</h3>
                <button onClick={clearHistory} className="text-xs font-medium text-red-500 hover:text-red-600">Clear All</button>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <AnimatePresence>
                  {history.map((term) => (
                    <motion.div
                      key={term}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <div 
                        onClick={() => handleSearch(term)}
                        className="flex items-center justify-between p-3.5 hover:bg-gray-50 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3 text-gray-600 group-hover:text-primary transition-colors">
                          <Clock size={16} className="text-gray-300" />
                          <span className="text-sm font-medium">{term}</span>
                        </div>
                        <button 
                          onClick={(e) => removeFromHistory(e, term)}
                          className="p-1.5 rounded-full text-gray-300 hover:bg-gray-200 hover:text-gray-500 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Trending / Suggestions */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Trending Cities</h3>
            <div className="flex flex-wrap gap-2">
              {['Beverly Hills', 'San Francisco', 'Austin', 'New York', 'Miami'].map((city) => (
                <button 
                  key={city}
                  onClick={() => handleSearch(city)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm"
                >
                  <TrendingUp size={14} />
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Search Results */
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
             <p className="text-sm text-gray-500">Found {filteredProperties.length} results</p>
          </div>
          
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon size={24} className="text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-bold">No properties found</h3>
              <p className="text-gray-500 text-sm mt-1">Try adjusting your search terms</p>
            </div>
          ) : (
            filteredProperties.map((p, idx) => (
              <Link key={p.id} to={`/property/${p.id}`}>
                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.05 }}
                   className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex gap-3 p-3 hover:shadow-md transition-shadow"
                >
                   <img src={p.images[0]} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" alt={p.title} />
                   <div className="flex flex-col justify-between py-1 min-w-0 flex-1">
                     <div>
                       <h4 className="font-bold text-sm truncate text-gray-900">{p.title}</h4>
                       <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin size={12} className="mr-1" />
                          <span className="truncate">{p.city}</span>
                       </div>
                     </div>
                     <div className="flex items-end justify-between">
                       <p className="text-primary font-bold text-sm">${(p.price/1000).toFixed(0)}k <span className="text-gray-400 text-[10px] font-normal">/mo</span></p>
                       <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
                         <ArrowRight size={12} className="text-gray-400" />
                       </div>
                     </div>
                   </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>
      )}

      {/* FILTER MODAL */}
      <AnimatePresence>
        {showFilters && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowFilters(false)}
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full sm:max-w-md h-[85vh] sm:h-[800px] sm:rounded-3xl rounded-t-3xl relative z-10 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex-none flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="text-xl font-bold">Filters</h2>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setTempFilters(INITIAL_FILTERS)}
                    className="text-sm font-semibold text-red-500 hover:text-red-600"
                  >
                    Reset
                  </button>
                  <button onClick={() => setShowFilters(false)} className="p-1 rounded-full hover:bg-gray-100">
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-5 pb-24 space-y-6">
                
                {/* Category */}
                <div className="bg-gray-100 p-1 rounded-xl flex mb-6">
                  {['Buy', 'Rent'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilterValue('category', cat)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        tempFilters.category === cat 
                          ? 'bg-white text-gray-900 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Budget */}
                <FilterSection title="Budget">
                  {['5 Lacs', '10 Lacs', '20 Lacs', '50 Lacs', '1 Cr', '5 Cr+'].map(price => (
                    <FilterPill 
                      key={price} 
                      label={price} 
                      active={tempFilters.budget === price} 
                      onClick={() => setFilterValue('budget', price === tempFilters.budget ? null : price)} 
                    />
                  ))}
                </FilterSection>

                {/* Bedroom */}
                <FilterSection title="Bedroom">
                  {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6+ BHK'].map(bhk => (
                    <FilterPill 
                      key={bhk} 
                      label={bhk} 
                      active={tempFilters.bhk.includes(bhk)} 
                      onClick={() => toggleFilterArray('bhk', bhk)} 
                    />
                  ))}
                </FilterSection>

                {/* Availability */}
                <FilterSection title="Availability">
                  {['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'].map(year => (
                    <FilterPill 
                      key={year} 
                      label={year} 
                      active={tempFilters.availability.includes(year)} 
                      onClick={() => toggleFilterArray('availability', year)} 
                    />
                  ))}
                </FilterSection>

                {/* Possession Status */}
                <FilterSection title="Possession Status">
                  {['Under Construction', 'Ready to move'].map(status => (
                    <FilterPill 
                      key={status} 
                      label={status} 
                      active={tempFilters.possession.includes(status)} 
                      onClick={() => toggleFilterArray('possession', status)} 
                    />
                  ))}
                </FilterSection>

                {/* Age of Construction */}
                <FilterSection title="Age of construction">
                  {['New Construction', '< 5 Years', '5 - 10 Years', '10 - 15 Years', '15 - 20 Years', '20+ Years'].map(age => (
                    <FilterPill 
                      key={age} 
                      label={age} 
                      active={tempFilters.age.includes(age)} 
                      onClick={() => toggleFilterArray('age', age)} 
                    />
                  ))}
                </FilterSection>

                 {/* Area */}
                 <FilterSection title="Area (Sq.ft.)">
                  {['1500 Sq.ft', '2500 Sq.ft', '3500 Sq.ft', '5000+ Sq.ft'].map(area => (
                    <FilterPill 
                      key={area} 
                      label={area} 
                      active={tempFilters.area === area} 
                      onClick={() => setFilterValue('area', area === tempFilters.area ? null : area)} 
                    />
                  ))}
                </FilterSection>

              </div>

              {/* Footer */}
              <div className="flex-none p-5 border-t border-gray-100 safe-area-bottom bg-white">
                <Button fullWidth onClick={applyFilters}>
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
