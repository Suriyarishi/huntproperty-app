import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Eye, Image as ImageIcon, Heart, Search, CheckSquare, Square, Building2, SlidersHorizontal, MapPin, Edit2, Trash2, ChevronRight } from 'lucide-react';
import { Property } from '../types';
import { Button } from '../components/UI';

// Mock Data
const MY_PROPERTIES = [
  { id: '395', title: 'For Sell, Property Location, sada, dadas', address: 'Carnicobar, Andaman & Nicobar Islands', price: '₹ 20 Lacs', area: '1200 Sq-ft', posted: '03 May, 2021', edited: '03 Jun, 2021', views: 2, status: 'Deactivated', image: '' },
  { id: '394', title: 'For Sell, Property Location, delhi, dehi', address: 'Changlang, Arunachal Pradesh', price: '₹ false', area: 'null Sq-ft', posted: '03 May, 2021', edited: '03 Jun, 2021', views: 0, status: 'Deactivated', image: '' },
  { id: '393', title: 'For Sell, Property Location, Delhi, Delhi', address: 'Delhi, Delhi', price: '₹ false', area: 'null Sq-ft', posted: '03 May, 2021', edited: '03 Jun, 2021', views: 5, status: 'Deactivated', image: '' },
];

const MY_PROJECTS = [
  {
    id: 'PRJ-001',
    title: 'Skyline Residential Plots',
    address: 'Sector 150, Noida',
    type: 'RESIDENTIAL',
    price: '₹85 L - ₹2.5 Cr',
    listedOn: 'Mar 05, 2026',
    views: 124,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'PRJ-002',
    title: 'Nexus Business Tower',
    address: 'Cyber City, Gurugram',
    type: 'COMMERCIAL',
    price: '₹1.2 Cr - ₹5.0 Cr',
    listedOn: 'Mar 02, 2026',
    views: 124,
    status: 'UNDER REVIEW',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
  }
];

const TABS = ['Properties', 'Projects', 'Bulk Edit', 'Favorites'];

export const MyListings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Properties');
  const [selectedProps, setSelectedProps] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedProps(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const selectAll = () => {
    if (selectedProps.length === MY_PROPERTIES.length) {
      setSelectedProps([]);
    } else {
      setSelectedProps(MY_PROPERTIES.map(p => p.id));
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Deactivated' ? 'bg-red-50 text-[#E11D48]' : 'bg-green-50 text-green-600';
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-[#F8FAFC] relative pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-30 px-5 py-4 flex items-center justify-between shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95">
            <ArrowLeft size={22} className="text-gray-800" />
          </button>
          <h1 className="font-black text-xl text-gray-900 tracking-tight">Properties</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/add-project')}
            className="bg-[#00AEEF] text-white px-3 py-2 rounded-xl text-[10px] font-black flex items-center gap-1.5 active:scale-95 transition-transform shadow-lg shadow-[#00AEEF]/20"
          >
            <Building2 size={14} strokeWidth={3} /> PROJECT
          </button>
          <button
            onClick={() => navigate('/add')}
            className="bg-[#2FED9A] text-gray-900 px-3 py-2 rounded-xl text-[10px] font-black flex items-center gap-1.5 active:scale-95 transition-transform shadow-lg shadow-[#2FED9A]/20"
          >
            <Plus size={14} strokeWidth={3} /> PROPERTY
          </button>
        </div>
      </div>

      {/* Scrollable Tabs */}
      <div className="bg-white px-5 pb-3 pt-3 sticky top-[68px] z-20 overflow-x-auto no-scrollbar shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all whitespace-nowrap active:scale-95 ${
                activeTab === tab
                  ? 'bg-[#E11D48] text-white shadow-lg shadow-[#E11D48]/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="pb-6">
         {activeTab === 'Properties' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5">
               {/* Filters */}
               <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
                  <div className="flex justify-between items-center mb-5">
                     <h3 className="font-black text-gray-900 text-sm border-b-2 border-[#E11D48] pb-1 inline-block">Search Properties</h3>
                     <div className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-gray-200">
                        <span className="text-[10px] font-bold text-gray-600">Listings Left: <span className="text-[#E11D48]">0</span></span>
                     </div>
                  </div>
                  <div className="space-y-3 mb-4">
                     <div className="flex gap-2">
                       <input type="text" placeholder="Search by ID" className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#E11D48]/20 focus:bg-white transition-all" />
                       <button className="bg-[#E11D48] text-white font-black px-6 rounded-xl shadow-md shadow-[#E11D48]/20 active:scale-95 transition-all">GO</button>
                     </div>
                     <div className="grid grid-cols-2 gap-2">
                       <select className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-3 text-xs text-gray-700 font-medium outline-none appearance-none">
                         <option>Property For</option>
                       </select>
                       <select className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-3 text-xs text-gray-700 font-medium outline-none appearance-none">
                         <option>Property Type</option>
                       </select>
                       <input type="text" placeholder="Locality" className="col-span-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#E11D48]/20 focus:bg-white transition-all" />
                     </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                     <button className="text-[10px] font-bold text-gray-400 flex items-center gap-1 hover:text-gray-600 transition-colors"><SlidersHorizontal size={12} /> Reset Search</button>
                     <button className="bg-[#E11D48] text-white font-black py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-[#E11D48]/30 active:scale-95 transition-all">
                       <Search size={14} strokeWidth={3} /> Search
                     </button>
                  </div>
               </div>

               {/* Property List */}
               <div className="space-y-4">
                 {MY_PROPERTIES.map((prop, idx) => (
                    <motion.div 
                       key={prop.id}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: idx * 0.1 }}
                       className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden"
                    >
                      {/* Status & Views Banner */}
                      <div className="flex justify-between items-center bg-gray-50 -mx-4 -mt-4 px-4 py-2.5 mb-4 border-b border-gray-100/50">
                         <div className="flex items-center gap-1.5">
                           <Eye size={12} className="text-gray-400" />
                           <span className="text-[10px] font-extrabold text-gray-600 tracking-wider">VIEWS: {prop.views}</span>
                         </div>
                         <div className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${getStatusColor(prop.status)}`}>
                           {prop.status}
                         </div>
                      </div>

                      <div className="flex gap-4 mb-4">
                         {/* Image Box */}
                         <div className="w-24 h-24 bg-gray-100 rounded-2xl flex flex-col items-center justify-center border border-gray-200 border-dashed relative overflow-hidden flex-shrink-0">
                           <Building2 size={24} className="text-gray-300 mb-1" />
                           <span className="text-[8px] font-bold text-gray-400">No Image</span>
                         </div>
                         {/* Info */}
                         <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                           <div>
                             <span className="text-[9px] font-black text-gray-400 tracking-wider">ID: {prop.id}</span>
                             <h3 className="font-bold text-gray-900 text-xs leading-tight mt-0.5 line-clamp-2">{prop.title}</h3>
                             <p className="text-[10px] text-gray-500 mt-1 truncate">{prop.address}</p>
                           </div>
                           <div className="flex items-center gap-2 mt-2">
                             <span className="text-xs font-black text-[#E11D48]">{prop.price}</span>
                             <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                             <span className="text-[10px] font-bold text-gray-500">{prop.area}</span>
                           </div>
                         </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                         <div className="flex flex-col">
                           <span className="text-[9px] text-gray-400 font-medium">Posted: {prop.posted}</span>
                           <span className="text-[9px] text-gray-400 font-medium">Edited: {prop.edited}</span>
                         </div>
                         <div className="flex gap-2">
                           <button className="text-[10px] font-black text-[#00AEEF] px-3 py-2 rounded-xl bg-blue-50 active:scale-95 transition-transform">
                             View
                           </button>
                           <button className="bg-[#E11D48] text-white font-black text-[10px] px-3 py-2 rounded-xl shadow-md shadow-[#E11D48]/20 flex items-center gap-1 active:scale-95 transition-transform">
                             <ImageIcon size={12} /> Add Image
                           </button>
                         </div>
                      </div>
                    </motion.div>
                 ))}
               </div>
             </motion.div>
         )}

         {activeTab === 'Projects' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5">
               {/* Filters */}
               <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
                  <div className="flex justify-between items-center mb-5">
                     <h3 className="font-black text-gray-900 text-sm border-b-2 border-[#00AEEF] pb-1 inline-block">Search Projects</h3>
                     <div className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-gray-200">
                        <span className="text-[10px] font-bold text-gray-600">Listings Left: <span className="text-[#00AEEF]">0</span></span>
                     </div>
                  </div>
                  <div className="space-y-3 mb-4">
                     <div className="grid grid-cols-2 gap-2">
                       <select className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-3 text-xs text-gray-700 font-medium outline-none appearance-none focus:ring-2 focus:ring-[#00AEEF]/20 focus:bg-white transition-all">
                         <option>Property For</option>
                       </select>
                       <select className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-3 text-xs text-gray-700 font-medium outline-none appearance-none focus:ring-2 focus:ring-[#00AEEF]/20 focus:bg-white transition-all">
                         <option>Property Type</option>
                       </select>
                     </div>
                     <input type="text" placeholder="Enter a Locality or Project" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#00AEEF]/20 focus:bg-white transition-all" />
                     <div className="grid grid-cols-2 gap-2">
                       <input type="text" placeholder="₹ Min" className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#00AEEF]/20 focus:bg-white transition-all" />
                       <input type="text" placeholder="₹ Max" className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#00AEEF]/20 focus:bg-white transition-all" />
                     </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                     <button className="text-[10px] font-bold text-gray-400 flex items-center gap-1 hover:text-gray-600 transition-colors"><SlidersHorizontal size={12} /> Reset Search</button>
                     <button className="bg-[#00AEEF] text-white font-black py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-[#00AEEF]/30 active:scale-95 transition-all">
                       <Search size={14} strokeWidth={3} /> Search
                     </button>
                  </div>
               </div>

               {/* Project List */}
               <div className="space-y-4">
                 {MY_PROJECTS.map((proj, idx) => (
                    <motion.div 
                       key={proj.id}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: idx * 0.1 }}
                       className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden"
                    >
                      {/* Header: Title, Type Badge, Location */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 pr-2">
                          <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1.5">{proj.title}</h3>
                          <p className="text-[10px] font-medium text-gray-500 flex items-center gap-1">
                            <MapPin size={12} className="text-gray-400" /> {proj.address}
                          </p>
                        </div>
                        <div className={`px-2.5 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest flex-shrink-0 ${proj.type === 'RESIDENTIAL' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-[#00AEEF]'}`}>
                          {proj.type}
                        </div>
                      </div>

                      {/* Image & Key Stats Block */}
                      <div className="flex gap-4 mb-4">
                         {/* Image with status badge inside */}
                         <div className="w-28 h-28 bg-gray-100 rounded-2xl relative overflow-hidden flex-shrink-0 shadow-inner">
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className={`absolute top-2 left-2 px-2 py-1 rounded text-[8px] font-black uppercase shadow-sm ${proj.status === 'ACTIVE' ? 'bg-white text-green-600' : 'bg-white text-orange-500'}`}>
                              {proj.status}
                            </div>
                         </div>
                         
                         {/* Stats grid */}
                         <div className="flex-1 min-w-0 grid grid-cols-2 gap-y-3 gap-x-2 py-1">
                            <div>
                              <p className="text-[8px] font-black text-gray-400 tracking-wider mb-0.5 uppercase">Project ID</p>
                              <p className="text-[10px] font-bold text-gray-900 truncate">{proj.id}</p>
                            </div>
                            <div>
                              <p className="text-[8px] font-black text-gray-400 tracking-wider mb-0.5 uppercase">Listed On</p>
                              <p className="text-[10px] font-bold text-gray-900 truncate">{proj.listedOn}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-[8px] font-black text-gray-400 tracking-wider mb-0.5 uppercase">Price Range</p>
                              <p className="text-xs font-black text-green-600 truncate">{proj.price}</p>
                            </div>
                            <div className="col-span-2 border-t border-gray-50 pt-2">
                              <p className="text-[8px] font-black text-gray-400 tracking-wider mb-0.5 uppercase">Analytics</p>
                              <p className="text-[10px] font-bold text-gray-900 flex items-center gap-1.5">
                                <Eye size={12} className="text-[#00AEEF]"/> 
                                <span className="text-green-600 font-black">+{proj.views}</span> Views
                              </p>
                            </div>
                         </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                         <div className="flex gap-2">
                           <button className="flex items-center gap-1.5 text-[10px] font-black text-gray-700 px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all">
                             <Edit2 size={12} /> Edit Project
                           </button>
                           <button className="flex items-center justify-center w-8 h-8 rounded-xl bg-red-50 text-[#E11D48] hover:bg-red-100 active:scale-95 transition-all">
                             <Trash2 size={14} />
                           </button>
                         </div>
                         <button className="text-[10px] font-black text-gray-900 flex items-center gap-1 hover:text-[#00AEEF] transition-colors pr-1">
                           View Full Details <ChevronRight size={14} className="text-gray-400" />
                         </button>
                      </div>
                    </motion.div>
                 ))}
               </div>
            </motion.div>
         )}

         {activeTab === 'Bulk Edit' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col min-h-[calc(100vh-140px)]">
               <div className="p-5 flex-1">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-black text-gray-900 text-sm">Bulk Edit Pricing</h3>
                     <button onClick={selectAll} className="text-xs font-bold text-[#E11D48] hover:underline">
                       {selectedProps.length === MY_PROPERTIES.length ? 'Deselect All' : 'Select All'}
                     </button>
                  </div>
                  
                  <div className="space-y-3">
                    {MY_PROPERTIES.map((prop, idx) => {
                      const isSelected = selectedProps.includes(prop.id);
                      return (
                        <div key={prop.id} onClick={() => toggleSelect(prop.id)} className={`bg-white p-4 rounded-3xl border-2 transition-all cursor-pointer ${isSelected ? 'border-[#E11D48] shadow-md shadow-[#E11D48]/10' : 'border-gray-100 shadow-sm'}`}>
                          <div className="flex items-start gap-3">
                             <button className="mt-1 flex-shrink-0">
                               {isSelected ? <CheckSquare size={20} className="text-[#E11D48]" /> : <Square size={20} className="text-gray-300" />}
                             </button>
                             <div className="flex-1 min-w-0">
                               <div className="flex justify-between items-center mb-1">
                                 <span className="text-[10px] font-black text-gray-400 tracking-wider">ID: {prop.id}</span>
                                 <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${getStatusColor(prop.status)}`}>{prop.status}</div>
                               </div>
                               <h4 className="font-bold text-gray-900 text-xs line-clamp-1 mb-2">{prop.title}</h4>
                               
                               <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                  <div className="flex-1">
                                    <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">Current Price</p>
                                    <p className="text-xs font-black text-gray-700">{prop.price}</p>
                                  </div>
                                  <div className="w-px h-6 bg-gray-200"></div>
                                  <div className="flex-2 relative" onClick={(e) => e.stopPropagation()}>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">Set New Price</p>
                                    <div className="relative">
                                       <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">₹</span>
                                       <input type="text" placeholder="Amount" className="w-24 bg-white border border-gray-200 rounded-lg py-1.5 pl-6 pr-2 text-xs font-bold text-gray-900 outline-none focus:border-[#E11D48] shadow-sm" />
                                    </div>
                                  </div>
                               </div>
                             </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
               </div>

               {/* Sticky Action Bar inside the flex column */}
               <div className="sticky bottom-0 w-full p-5 bg-white border-t border-gray-100 shadow-[0_-15px_30px_rgba(0,0,0,0.08)] z-30 mt-auto">
                  <div className="flex gap-2 max-w-full">
                     <button className="flex-1 bg-green-500 text-white font-black text-[10px] py-3.5 rounded-xl shadow-lg shadow-green-500/30 active:scale-95 transition-all">
                       ACTIVATE
                     </button>
                     <button className="flex-1 bg-gray-800 text-white font-black text-[10px] py-3.5 rounded-xl shadow-lg shadow-gray-800/30 active:scale-95 transition-all">
                       DEACTIVATE
                     </button>
                     <button className="flex-1 bg-[#E11D48] text-white font-black text-[10px] py-3.5 rounded-xl shadow-lg shadow-[#E11D48]/30 active:scale-95 transition-all">
                       SUBMIT
                     </button>
                  </div>
               </div>
            </motion.div>
         )}

         {activeTab === 'Favorites' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5">
              <div className="bg-white p-10 rounded-3xl border border-gray-100 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-4">
                 <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
                   <Heart size={32} className="text-[#E11D48]" />
                 </div>
                 <h4 className="font-black text-gray-900 text-base mb-1.5 tracking-tight">No Record Found</h4>
                 <p className="text-xs text-gray-500 max-w-[200px] mx-auto leading-relaxed font-medium">You haven't added any properties to your favorites list yet.</p>
              </div>
            </motion.div>
         )}
      </div>
    </div>
  );
};
