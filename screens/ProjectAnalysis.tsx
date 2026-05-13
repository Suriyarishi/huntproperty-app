
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Share2, Heart, MapPin, CheckCircle2, XCircle,
  ShieldCheck, Download, PhoneCall, Mail, Play, Image as ImageIcon,
  Map, CalendarClock, Building2, Trees, Dumbbell, Waves, Star,
  ChevronRight, TrendingUp, Car, Wifi, Coffee, Zap, Wind,
  Users, Award, Home, BarChart2, Ruler, Layers, FileText, Search, ChevronDown
} from 'lucide-react';

// ─── Amenities Data ───────────────────────────────────────────────────────────
const AMENITIES = {
  'Sports & Fitness': [
    { name: 'Swimming Pool', icon: Waves, available: true },
    { name: 'Gymnasium', icon: Dumbbell, available: true },
    { name: 'Badminton Court', icon: Users, available: true },
    { name: 'Cricket Net', icon: Users, available: true },
    { name: 'Jogging Track', icon: TrendingUp, available: true },
    { name: 'Yoga Deck', icon: Wind, available: true },
    { name: 'Indoor Games Room', icon: Users, available: true },
    { name: 'Tennis Court', icon: Users, available: false },
  ],
  'Lifestyle & Social': [
    { name: 'Clubhouse', icon: Building2, available: true },
    { name: 'Party Hall', icon: Coffee, available: true },
    { name: 'Reading Lounge', icon: Coffee, available: true },
    { name: 'Rooftop Deck', icon: Layers, available: true },
    { name: 'Mini Theatre', icon: Play, available: true },
    { name: 'Co-Working Space', icon: Wifi, available: true },
    { name: 'Amphitheatre', icon: Users, available: false },
    { name: 'Salon & Spa', icon: Star, available: true },
  ],
  'Safety & Convenience': [
    { name: '3-Tier Security', icon: ShieldCheck, available: true },
    { name: 'CCTV Surveillance', icon: ShieldCheck, available: true },
    { name: 'Video Door Phone', icon: Home, available: true },
    { name: 'EV Charging Points', icon: Zap, available: true },
    { name: 'Power Backup', icon: Zap, available: true },
    { name: 'Visitor Parking', icon: Car, available: true },
    { name: 'Concierge Services', icon: Users, available: true },
    { name: 'Panic Button', icon: ShieldCheck, available: true },
  ],
  'Green & Open Spaces': [
    { name: 'Landscaped Gardens', icon: Trees, available: true },
    { name: 'Children\'s Play Area', icon: Users, available: true },
    { name: 'Senior Citizen Zone', icon: Users, available: true },
    { name: 'Pet Zone', icon: Users, available: true },
    { name: 'Reflexology Path', icon: Trees, available: true },
    { name: 'Meditation Garden', icon: Wind, available: true },
    { name: 'Butterfly Garden', icon: Trees, available: false },
    { name: 'Water Feature', icon: Waves, available: true },
  ],
};

// ─── Location POIs ─────────────────────────────────────────────────────────────
const LOCATION_POIS = [
  { category: 'Transport', items: ['Kandivali Metro (400m)', 'Western Express Highway (200m)', 'Bus Stop (150m)'] },
  { category: 'Education', items: ['Ryan International School (1.2 km)', 'Thakur College (2 km)', 'IIT Bombay (14 km)'] },
  { category: 'Healthcare', items: ['Criticare Hospital (800m)', 'Northside Hospital (2.1 km)', 'Apollo Clinic (1.5 km)'] },
  { category: 'Shopping', items: ['Hypercity Mall (600m)', 'Infinity IT Park (3 km)', 'D-Mart (1.1 km)'] },
];


export const ProjectAnalysisScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [saved, setSaved] = useState(false);
  const [expandedAmenityCategory, setExpandedAmenityCategory] = useState<string | null>('Sports & Fitness');

  const project = {
    name: 'Godrej Skyshore',
    developer: 'Godrej Properties',
    location: 'Versova, Andheri West',
    completion: 'Completion in Dec, 2031',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    ],
    thumbnails: [
      { label: 'Highlights', icon: ImageIcon },
      { label: 'Outdoors', icon: Building2 },
      { label: 'Brochure', icon: FileText },
      { label: 'Videos', icon: Play },
      { label: 'Demos', icon: Layers },
    ],
    stats: [
      { label: '₹55,000 /sqft', sub: 'Carpet Area' },
      { label: 'Top Build Quality', sub: 'Builder Highlight' },
      { label: 'Map View', sub: 'Nearby POIs', icon: MapPin },
    ],
    units: [
      { 
        type: 'New Bookings', 
        badge: 'Zero Brokerage', 
        size: '1,500 sqft', 
        price: '₹8.25 Cr', 
        rate: '₹55,000 /sqft' 
      },
      { 
        type: 'Resale', 
        badge: 'Direct Owner', 
        size: '1,200 sqft', 
        price: '₹6.50 Cr', 
        rate: '₹54,166 /sqft' 
      }
    ]
  };

  const TABS = ['Overview', 'Properties'];

  const statusColors: Record<string, string> = {
    Available: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    Limited: 'text-amber-700 bg-amber-50 border-amber-100',
    'Few Left': 'text-rose-700 bg-rose-50 border-rose-100',
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-[#F5F7F9] pb-32 relative">

      {/* ── Header ── */}
      <div className="bg-white px-4 pt-10 pb-3 flex items-center justify-between border-b border-gray-100/50">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
            <ArrowLeft size={20} />
          </button>
          <div className="w-48 relative">
            <input 
              type="text" 
              placeholder="Search City/Locality/Project" 
              className="w-full h-10 pl-4 pr-10 bg-white border border-gray-200 rounded-full text-xs focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setSaved(!saved)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
            <Heart size={20} fill={saved ? 'currentColor' : 'none'} className={saved ? 'text-rose-500' : ''} />
          </button>
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* ── Hero Gallery ── */}
      <div className="relative bg-white">
        <div className="h-[300px] relative">
          <img src={project.images[0]} className="w-full h-full object-cover" alt="Project" />
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] font-bold px-3 py-1 rounded-full">
            2/10
          </div>
          <div className="absolute top-4 left-4 flex gap-2">
             <div className="w-4 h-4 rounded-full bg-white/20 border border-white/40" />
             <div className="w-4 h-4 rounded-full bg-white border border-white" />
             <div className="w-4 h-4 rounded-full bg-white/20 border border-white/40" />
          </div>
        </div>
        
        {/* Thumbnails */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 py-4 bg-white">
          {project.thumbnails.map((thumb, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0">
               <div className="w-16 h-12 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden relative">
                  <img src={project.images[0]} className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    {thumb.label === 'Videos' ? <Play size={16} fill="currentColor" /> : <thumb.icon size={16} />}
                  </div>
               </div>
               <span className="text-[10px] font-bold text-gray-500">{thumb.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Project Title & Status ── */}
      <div className="bg-white px-4 pb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-16 h-16 rounded-full border border-gray-100 p-2 bg-white flex items-center justify-center overflow-hidden shrink-0">
             <img src="https://via.placeholder.com/60?text=GODREJ" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-blue-900 leading-tight">{project.name}</h1>
            <p className="text-xs text-gray-500 font-bold">{project.location}</p>
            <div className="flex items-center gap-1 mt-1">
               <CheckCircle2 size={12} className="text-blue-500" />
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">RERA</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-gray-100">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <CalendarClock size={16} />
              </div>
              <span className="text-sm font-black text-blue-900">{project.completion}</span>
           </div>
           <button className="flex items-center gap-1 text-[11px] font-black text-rose-500">
              Updates <ChevronDown size={14} />
           </button>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="grid grid-cols-3 bg-white border-y border-gray-100 divide-x divide-gray-100">
        {project.stats.map((stat, i) => (
           <div key={i} className="py-4 px-2 text-center">
              <p className="text-sm font-black text-blue-900">{stat.label}</p>
              <p className="text-[10px] text-gray-400 font-bold mt-0.5">{stat.sub}</p>
              {stat.icon && <stat.icon size={16} className="mx-auto mt-2 text-blue-500" />}
           </div>
        ))}
      </div>

      {/* ── Spacer ── */}
      <div className="h-14" />

      {/* ── Sticky Tabs ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 flex gap-0 overflow-x-auto no-scrollbar shadow-sm">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-fit px-4 py-3.5 text-[11px] font-black whitespace-nowrap relative transition-colors ${
              activeTab === tab ? 'text-[#00AEEF]' : 'text-gray-400'
            }`}
          >
            {tab}
            {activeTab === tab && <motion.div layoutId="activeTabProject" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#00AEEF] rounded-t-full" />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-4 space-y-6"
        >
          {activeTab === 'Overview' && (
             <div className="space-y-6">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                   <h3 className="font-black text-base text-blue-900 mb-4">Project Highlights</h3>
                   <div className="grid grid-cols-2 gap-3">
                      {['18.6 Acre Township', '6 Iconic Towers', '80% Open Spaces', 'Gold Certified'].map(h => (
                         <div key={h} className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-blue-500" />
                            <span className="text-[11px] font-bold text-blue-900">{h}</span>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                   <h3 className="font-black text-base text-blue-900 mb-4">Why Choose {project.name}?</h3>
                   <div className="space-y-3">
                      {['Premium location with sea views', 'Sustainable design & IGBC Gold', 'State-of-the-art multi-level security'].map(usp => (
                         <div key={usp} className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5" />
                            <p className="text-xs text-blue-900 font-bold leading-relaxed">{usp}</p>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                   <h3 className="font-black text-base text-blue-900 mb-4 flex items-center gap-2">
                      <MapPin size={18} className="text-blue-500" /> Location Advantages
                   </h3>
                   <div className="space-y-4">
                      {LOCATION_POIS.slice(0, 2).map((poi, i) => (
                         <div key={i}>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{poi.category}</p>
                            <div className="space-y-1.5 text-xs text-blue-900 font-bold">
                               {poi.items.map((item, j) => (
                                  <div key={j} className="flex items-center gap-2">
                                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                     {item}
                                  </div>
                               ))}
                            </div>
                         </div>
                      ))}
                   </div>
                   <button className="w-full mt-4 py-3 bg-blue-50 text-blue-500 font-black text-xs rounded-xl flex items-center justify-center gap-2 border border-blue-100">
                      <Map size={16} /> View on Map
                   </button>
                </div>
             </div>
          )}

          {activeTab === 'Properties' && (
             <div className="space-y-8">
                {/* BHK Selection */}
                <div className="flex gap-2">
                   {['3 BHK Apartment', '4 BHK Apartment'].map(chip => (
                      <button key={chip} className="px-5 py-2.5 rounded-full border border-gray-200 bg-white text-xs font-black text-blue-900 shadow-sm">
                         {chip}
                      </button>
                   ))}
                </div>

                {/* Available Units */}
                <div>
                  <h3 className="font-black text-xl text-blue-900 mb-5">Available Units</h3>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-4">
                    {project.units.map((unit, i) => (
                      <div key={i} className="shrink-0 w-[280px] bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 relative overflow-hidden flex flex-col">
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-4">
                             <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-white">
                                <Star size={20} fill="currentColor" />
                             </div>
                             <div>
                                <h4 className="font-extrabold text-lg text-blue-900 leading-none">{unit.type}</h4>
                                <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                                   {unit.badge}
                                </span>
                             </div>
                          </div>

                          <div className="space-y-4">
                             <div>
                                <p className="text-sm font-black text-blue-900">{unit.size}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Carpet Area</p>
                             </div>
                             <div>
                                <h2 className="text-xl font-black text-blue-900">{unit.price} <span className="text-[10px] text-gray-400 font-bold">+ charges</span></h2>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-tight">{unit.rate} (Carpet Area)</p>
                             </div>
                          </div>

                          <button className="w-full mt-6 py-4 bg-sky-100/50 text-blue-600 font-black text-sm rounded-2xl border border-sky-100 active:scale-95 transition-transform">
                             View 1 property option
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Plan Accordion */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                   <div className="p-4 flex items-center justify-between border-b border-gray-50">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                           <FileText size={20} />
                         </div>
                         <div>
                            <p className="font-black text-sm text-blue-900">Construction-linked Plan</p>
                            <p className="text-[10px] text-gray-400 font-bold">Payment Plans & banks</p>
                         </div>
                      </div>
                      <ChevronRight size={20} className="text-gray-300" />
                   </div>
                </div>
             </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Footer ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-40 max-w-[500px] mx-auto">
        <div className="flex gap-3">
          <button className="flex-1 h-14 bg-sky-100/50 text-blue-600 font-black text-sm rounded-2xl border border-sky-100 flex items-center justify-center gap-2">
            <Download size={20} /> Brochure
          </button>
          <button className="flex-[2] h-14 bg-blue-600 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all">
            <PhoneCall size={20} /> View Number
          </button>
        </div>
      </div>

    </div>
  );
};
