import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Search, Building2, CheckCircle2 } from 'lucide-react';

interface FilterOverlayProps {
  onClose: () => void;
  pageSize?: string;
}

export const FilterOverlay: React.FC<FilterOverlayProps> = ({ onClose, pageSize = '30' }) => {
  const [transactionType, setTransactionType] = useState('Buy');
  const [usage, setUsage] = useState('Residential');
  const [propertyTypes, setPropertyTypes] = useState<string[]>(['Flat / Apartment']);
  const [selectedBuilder, setSelectedBuilder] = useState('Casagrand');
  const [groupListings, setGroupListings] = useState(true);

  const PROP_TYPES = ['Flat / Apartment', 'House / Villa', 'Plot / Land', 'Farm Land', 'Studio', 'Penthouse', 'Duplex'];
  const BUILDERS = ['Casagrand', 'Prestige Group', 'DLF Limited', 'Lodha', 'Tata Housing', 'Godrej Properties'];

  const togglePropertyType = (type: string) => {
    setPropertyTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-end"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="bg-white rounded-t-[40px] w-full h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle for dragging */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-4 shrink-0" />

        {/* ── Header ── */}
        <div className="px-6 pb-6 flex items-center justify-between border-b border-gray-50">
          <button onClick={onClose} className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors">
            <X size={24} />
          </button>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Filters</h2>
          <button className="text-[11px] font-black text-[#FF4E4E] uppercase tracking-widest px-2">
            Clear All
          </button>
        </div>

        {/* ── Scrollable Content ── */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-10 pb-32">
          
          {/* City - Non-editable */}
          <section>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">City</h3>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl">
              <span className="text-sm font-black text-gray-800">Coimbatore</span>
              <span className="text-[10px] text-gray-400 font-bold">(fixed from URL: city=218)</span>
            </div>
          </section>

          {/* Transaction Type - Radio */}
          <section>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Transaction Type</h3>
            <div className="flex gap-3">
              {['Buy', 'Rent', 'PG'].map(type => (
                <button
                  key={type}
                  onClick={() => setTransactionType(type)}
                  className={`flex-1 py-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${
                    transactionType === type ? 'bg-[#F0FBFF] border-[#00AEEF] text-[#00AEEF]' : 'bg-white border-gray-100 text-gray-400'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    transactionType === type ? 'border-[#00AEEF]' : 'border-gray-200'
                  }`}>
                    {transactionType === type && <div className="w-2.5 h-2.5 bg-[#00AEEF] rounded-full" />}
                  </div>
                  <span className="text-sm font-black">{type}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Usage - Toggle */}
          <section>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Usage</h3>
            <div className="bg-gray-50 p-1.5 rounded-2xl flex gap-1.5 border border-gray-100">
              {['Residential', 'Commercial', 'Agricultural'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setUsage(opt)}
                  className={`flex-1 py-3.5 rounded-xl text-xs font-black transition-all ${
                    usage === opt ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </section>

          {/* Property Type - Multi-select Chips */}
          <section>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Property Type</h3>
            <div className="flex flex-wrap gap-2.5">
              {PROP_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => togglePropertyType(type)}
                  className={`px-5 py-3 rounded-2xl border text-xs font-black transition-all flex items-center gap-2 ${
                    propertyTypes.includes(type) ? 'bg-[#2FED9A]/10 border-[#2FED9A] text-gray-900' : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                  }`}
                >
                  {propertyTypes.includes(type) && <Check size={14} className="text-[#2FED9A]" />}
                  {type}
                </button>
              ))}
            </div>
          </section>

          {/* Builder - Search + Single Select */}
          <section>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Builder</h3>
            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search builder name..."
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-gray-800 outline-none focus:border-[#00AEEF] transition-colors"
                defaultValue={selectedBuilder}
              />
            </div>
            <div className="space-y-3">
              {BUILDERS.map(builder => (
                <label key={builder} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl cursor-pointer active:scale-[0.98] transition-all">
                  <div className="flex items-center gap-3">
                    <Building2 size={18} className="text-gray-400" />
                    <span className="text-sm font-black text-gray-800">{builder}</span>
                  </div>
                  <input 
                    type="radio" 
                    name="builder" 
                    checked={selectedBuilder === builder}
                    onChange={() => setSelectedBuilder(builder)}
                    className="w-5 h-5 accent-[#00AEEF]"
                  />
                </label>
              ))}
            </div>
          </section>

          {/* Listing Type / Grouping - Switch */}
          <section className="flex items-center justify-between p-6 bg-blue-50/30 border border-blue-100/50 rounded-3xl">
            <div>
              <h3 className="text-[13px] font-black text-gray-900 mb-1">Group similar listings</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Show only unique properties</p>
            </div>
            <button 
              onClick={() => setGroupListings(!groupListings)}
              className={`w-14 h-8 rounded-full relative transition-colors ${groupListings ? 'bg-[#00AEEF]' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${groupListings ? 'left-7' : 'left-1'}`} />
            </button>
          </section>

          {/* Source / Tags - Static Info */}
          <section className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3">
            <CheckCircle2 size={16} className="text-[#2FED9A] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-1">Source Info</h4>
              <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                Source: Popular builder campaign (src=POPULAR_BUILDER). Applying specific quality filters for premium listings.
              </p>
            </div>
          </section>

        </div>

        {/* ── Sticky Footer ── */}
        <div className="bg-white border-t border-gray-100 p-6 pb-10 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.03)]">
          <div>
            <p className="text-xl font-black text-gray-900 leading-none">{pageSize} results</p>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Found matching properties</p>
          </div>
          <button 
            onClick={onClose}
            className="px-10 h-16 bg-[#2FED9A] text-gray-900 font-black text-sm rounded-2xl shadow-xl shadow-[#2FED9A]/20 active:scale-95 transition-transform uppercase tracking-[0.2em]"
          >
            Apply ({pageSize})
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
};
