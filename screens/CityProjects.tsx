
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, SlidersHorizontal, MapPin, Heart, Share2, 
  CheckCircle2, Building2, Star, ChevronDown, ListFilter,
  ArrowUpDown, Phone, MessageCircle, Compass, Home as HomeIcon, Eye,
  Users
} from 'lucide-react';

export interface Unit {
  id: string;
  type: string;
  price: string;
  size: string;
}

export interface Project {
  id: string;
  name: string;
  builder: string;
  location: string;
  priceRange: string;
  configs: string[];
  image: string;
  images: string[];
  status: 'Ready to Move' | 'Under Construction' | 'New Launch';
  isVerified: boolean;
  rating: number;
  units: Unit[];
  highlights: {
    facing: string;
    furnishing: string;
    view: string;
  };
  recentContacts: number;
  type: 'Residential' | 'Commercial' | 'Plots' | 'Agricultural';
}

interface Builder {
  id: string;
  name: string;
  logo: string;
  totalProjects: number;
  cityProjects: number;
}

// --- Mock Data ---
const CITY_NAME = "Mumbai";

const POPULAR_BUILDERS: Builder[] = [
  {
    id: 'b1',
    name: 'Lodha Group',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100&auto=format&fit=crop',
    totalProjects: 188,
    cityProjects: 42
  },
  {
    id: 'b2',
    name: 'Oberoi Realty',
    logo: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=100&auto=format&fit=crop',
    totalProjects: 24,
    cityProjects: 19
  },
  {
    id: 'b3',
    name: 'Godrej Properties',
    logo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=100&auto=format&fit=crop',
    totalProjects: 193,
    cityProjects: 28
  },
  {
    id: 'b4',
    name: 'Prestige Group',
    logo: 'https://images.unsplash.com/photo-1628744276520-6733a73f160d?q=80&w=100&auto=format&fit=crop',
    totalProjects: 120,
    cityProjects: 15
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Lodha World Towers',
    builder: 'Lodha Group',
    location: 'Lower Parel, Mumbai',
    priceRange: '₹ 4.5 Cr onwards',
    configs: ['3 BHK', '4 BHK', '5 BHK'],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=300&auto=format&fit=crop'
    ],
    status: 'Ready to Move',
    isVerified: true,
    rating: 4.9,
    units: [
      { id: 'u1-1', type: '3 BHK Flat', price: '₹ 4.5 Cr', size: '1,800 sqft' },
      { id: 'u1-2', type: '4 BHK Flat', price: '₹ 5.5 Cr', size: '2,400 sqft' },
      { id: 'u1-3', type: '5 BHK Flat', price: '₹ 8.2 Cr', size: '3,200 sqft' }
    ],
    highlights: { facing: 'East Facing', furnishing: 'Fully Furnished', view: 'Sea View' },
    recentContacts: 14,
    type: 'Residential'
  },
  {
    id: 'p2',
    name: 'Oberoi Enigma',
    builder: 'Oberoi Realty',
    location: 'Mulund West, Mumbai',
    priceRange: '₹ 2.8 Cr - 5.5 Cr',
    configs: ['2 BHK', '3 BHK', '4 BHK'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=300&auto=format&fit=crop'
    ],
    status: 'Under Construction',
    isVerified: true,
    rating: 4.8,
    units: [
      { id: 'u2-1', type: '2 BHK Flat', price: '₹ 2.8 Cr', size: '1,200 sqft' },
      { id: 'u2-2', type: '3 BHK Flat', price: '₹ 3.9 Cr', size: '1,650 sqft' }
    ],
    highlights: { facing: 'North-East', furnishing: 'Semi Furnished', view: 'Park View' },
    recentContacts: 5,
    type: 'Residential'
  },
  {
    id: 'p3',
    name: 'Godrej Horizon',
    builder: 'Godrej Properties',
    location: 'Wadala, Mumbai',
    priceRange: '₹ 1.9 Cr onwards',
    configs: ['2 BHK', '3 BHK'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=300&auto=format&fit=crop'
    ],
    status: 'New Launch',
    isVerified: false,
    rating: 4.7,
    units: [
      { id: 'u3-1', type: '2 BHK Flat', price: '₹ 1.9 Cr', size: '950 sqft' },
      { id: 'u3-2', type: '3 BHK Flat', price: '₹ 2.6 Cr', size: '1,300 sqft' }
    ],
    highlights: { facing: 'West Facing', furnishing: 'Unfurnished', view: 'City View' },
    recentContacts: 22,
    type: 'Residential'
  },
  {
    id: 'p4',
    name: 'Piramal Aranya',
    builder: 'Piramal Realty',
    location: 'Byculla, Mumbai',
    priceRange: '₹ 3.5 Cr - 12.0 Cr',
    configs: ['2 BHK', '3 BHK', '4 BHK', '5 BHK'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=300&auto=format&fit=crop'
    ],
    status: 'Under Construction',
    isVerified: true,
    rating: 4.8,
    units: [
      { id: 'u4-1', type: '2 BHK Flat', price: '₹ 3.5 Cr', size: '1,400 sqft' },
      { id: 'u4-2', type: '3 BHK Flat', price: '₹ 5.2 Cr', size: '1,900 sqft' },
      { id: 'u4-3', type: '4 BHK Flat', price: '₹ 8.0 Cr', size: '2,800 sqft' }
    ],
    highlights: { facing: 'South-East', furnishing: 'Bare Shell', view: 'Harbour View' },
    recentContacts: 9,
    type: 'Residential'
  },
  {
    id: 'p5',
    name: 'Lodha iThink',
    builder: 'Lodha Group',
    location: 'Thane West, Mumbai',
    priceRange: '₹ 1.2 Cr - 3.5 Cr',
    configs: ['Office Space', 'Shop'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=300&auto=format&fit=crop'
    ],
    status: 'Ready to Move',
    isVerified: true,
    rating: 4.8,
    units: [
      { id: 'u5-1', type: 'Office Space', price: '₹ 1.2 Cr', size: '450 sqft' },
      { id: 'u5-2', type: 'Large Office', price: '₹ 3.2 Cr', size: '1,200 sqft' }
    ],
    highlights: { facing: 'North Facing', furnishing: 'Bare Shell', view: 'City View' },
    recentContacts: 28,
    type: 'Commercial'
  },
  {
    id: 'p6',
    name: 'Lodha NCP',
    builder: 'Lodha Group',
    location: 'Wadala, Mumbai',
    priceRange: '₹ 2.5 Cr onwards',
    configs: ['2 BHK', '3 BHK'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=300&auto=format&fit=crop'
    ],
    status: 'Under Construction',
    isVerified: true,
    rating: 4.7,
    units: [
      { id: 'u6-1', type: '2 BHK Flat', price: '₹ 2.5 Cr', size: '1,100 sqft' }
    ],
    highlights: { facing: 'East Facing', furnishing: 'Semi Furnished', view: 'Garden View' },
    recentContacts: 15,
    type: 'Residential'
  },
  {
    id: 'p7',
    name: 'Lodha Signet',
    builder: 'Lodha Group',
    location: 'Thane West, Mumbai',
    priceRange: '₹ 85 L - 2.2 Cr',
    configs: ['Boutique Office', 'Retail'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=300&auto=format&fit=crop'
    ],
    status: 'New Launch',
    isVerified: true,
    rating: 4.6,
    units: [
      { id: 'u7-1', type: 'Office Space', price: '₹ 85 L', size: '320 sqft' }
    ],
    highlights: { facing: 'West Facing', furnishing: 'Bare Shell', view: 'Main Road' },
    recentContacts: 19,
    type: 'Commercial'
  },
  {
    id: 'p8',
    name: 'Oberoi Commerz',
    builder: 'Oberoi Realty',
    location: 'Goregaon East, Mumbai',
    priceRange: '₹ 5.5 Cr onwards',
    configs: ['Grade-A Office'],
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=300&auto=format&fit=crop'
    ],
    status: 'Ready to Move',
    isVerified: true,
    rating: 4.9,
    units: [
      { id: 'u8-1', type: 'Full Floor Office', price: '₹ 15.0 Cr', size: '5,000 sqft' }
    ],
    highlights: { facing: 'East Facing', furnishing: 'Fully Furnished', view: 'Aarey View' },
    recentContacts: 12,
    type: 'Commercial'
  },
  {
    id: 'p9',
    name: 'Godrej Woodside',
    builder: 'Godrej Properties',
    location: 'Khalapur, Navi Mumbai',
    priceRange: '₹ 45 L - 1.2 Cr',
    configs: ['Residential Plots'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=300&auto=format&fit=crop'
    ],
    status: 'New Launch',
    isVerified: true,
    rating: 4.5,
    units: [
      { id: 'u9-1', type: 'Standard Plot', price: '₹ 45 L', size: '1,200 sqft' },
      { id: 'u9-2', type: 'Premium Plot', price: '₹ 85 L', size: '2,400 sqft' }
    ],
    highlights: { facing: 'North-East', furnishing: 'N/A', view: 'Nature View' },
    recentContacts: 34,
    type: 'Plots'
  },
  {
    id: 'p10',
    name: 'Lodha Bellezza Farms',
    builder: 'Lodha Group',
    location: 'Karjat, Maharashtra',
    priceRange: '₹ 2.5 Cr onwards',
    configs: ['Farm Land', 'Organic Grove'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=300&auto=format&fit=crop'
    ],
    status: 'Ready to Move',
    isVerified: true,
    rating: 4.8,
    units: [
      { id: 'u10-1', type: '1 Acre Plot', price: '₹ 2.5 Cr', size: '43,560 sqft' },
      { id: 'u10-2', type: '2 Acre Estate', price: '₹ 4.8 Cr', size: '87,120 sqft' }
    ],
    highlights: { facing: 'Mountain View', furnishing: 'N/A', view: 'Nature Grove' },
    recentContacts: 12,
    type: 'Agricultural'
  }
];

// --- Components ---

const BuilderCard: React.FC<{ builder: Builder }> = ({ builder }) => (
  <motion.div 
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center gap-2 min-w-[120px] shrink-0"
  >
    <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-3 relative overflow-hidden group">
      <img src={builder.logo} alt={builder.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
    </div>
    <div className="text-center">
      <p className="text-[11px] font-black text-gray-900 leading-tight line-clamp-1">{builder.name}</p>
      <p className="text-[9px] text-gray-400 font-bold mt-0.5">{builder.cityProjects} in {CITY_NAME}</p>
    </div>
  </motion.div>
);

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(project.units[0] || null);
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm group cursor-pointer mb-6"
    >
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-[.expanded]:scale-105 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${
            project.status === 'Ready to Move' ? 'bg-[#2FED9A] text-gray-900' : 
            project.status === 'Under Construction' ? 'bg-[#FFB800] text-gray-900' : 
            'bg-[#00AEEF] text-white'
          }`}>
            {project.status}
          </div>
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <span className={`text-[9px] font-black uppercase tracking-widest ${project.type === 'Agricultural' ? 'text-emerald-600' : 'text-[#00AEEF]'}`}>{project.type}</span>
          </div>
          {project.isVerified && (
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <CheckCircle2 size={10} className="text-[#2FED9A]" fill="currentColor" fillOpacity={0.2} />
              <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Verified</span>
            </div>
          )}
        </div>

        {/* Favorite Icon */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transition-all hover:bg-white/40 active:scale-90"
        >
          <Heart size={18} className={isSaved ? "text-rose-500 fill-rose-500" : "text-white"} />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
          <div>
            <h3 className="text-xl font-black leading-tight drop-shadow-md">{project.name}</h3>
            <p className="text-xs font-bold opacity-90 flex items-center gap-1 drop-shadow-md">
              <MapPin size={10} /> {project.location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-black drop-shadow-md">{project.priceRange.split(' ')[0]} {project.priceRange.split(' ')[1]}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest opacity-80 drop-shadow-md">Starting Price</p>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
              <Building2 size={14} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Developer</p>
              <p className="text-xs font-black text-gray-900">{project.builder}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
            <Star size={12} className="text-[#FFB800]" fill="currentColor" />
            <span className="text-xs font-black text-gray-900">{project.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {project.configs.map((config) => (
            <span 
              key={config} 
              className="px-3 py-1.5 rounded-xl bg-blue-50/50 border border-blue-100 text-[#00AEEF] text-[10px] font-black"
            >
              {config}
            </span>
          ))}
          <motion.span 
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="ml-auto px-3 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 text-gray-400 text-[10px] w-8 h-8 font-black"
          >
             <ChevronDown size={14} />
          </motion.span>
        </div>
      </div>

      {/* Expandable Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="px-5 pb-5 overflow-hidden"
          >
            <div className="pt-4 border-t border-gray-50">
              {/* Unit Selector */}
              <div className="mb-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Available Units</p>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {project.units.map(u => (
                    <button 
                      key={u.id}
                      onClick={(e) => { e.stopPropagation(); setSelectedUnit(u); }}
                      className={`px-4 py-2 rounded-xl border text-[10px] font-black transition-colors shrink-0 ${selectedUnit?.id === u.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}`}
                    >
                      {u.type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Unit Details */}
              {selectedUnit && (
                <div className="bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400">Exact Price</p>
                      <p className="text-lg font-black text-gray-900">{selectedUnit.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400">Size</p>
                      <p className="text-sm font-black text-gray-900">{selectedUnit.size}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-gray-200/60 pt-3">
                    <div className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl shadow-sm border border-gray-50">
                      <Compass size={14} className="text-gray-400 mb-1.5" />
                      <span className="text-[9px] text-center font-bold text-gray-900 leading-tight">{project.highlights.facing}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl shadow-sm border border-gray-50">
                      <HomeIcon size={14} className="text-gray-400 mb-1.5" />
                      <span className="text-[9px] text-center font-bold text-gray-900 leading-tight">{project.highlights.furnishing}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl shadow-sm border border-gray-50">
                      <Eye size={14} className="text-gray-400 mb-1.5" />
                      <span className="text-[9px] text-center font-bold text-gray-900 leading-tight">{project.highlights.view}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Small image carousel */}
              <div className="mb-5">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Gallery</p>
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                  {project.images.map((img, i) => (
                    <div key={i} className="w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm relative group/img cursor-pointer">
                      <img src={img} className="w-full h-full object-cover transition-transform group-hover/img:scale-110 duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-2.5 mb-5 bg-[#00AEEF]/5 px-3 py-2.5 rounded-xl border border-[#00AEEF]/10">
                <Users size={14} className="text-[#00AEEF]" />
                <p className="text-[10px] font-black text-gray-700">{project.recentContacts} people contacted recently</p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate(`/unit/${selectedUnit.id}`); }}
                  className="flex-1 h-12 bg-white border-2 border-gray-100 text-gray-900 hover:bg-gray-50 font-black text-[11px] rounded-2xl flex items-center justify-center transition-colors"
                >
                  View Details
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="w-12 h-12 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#25D366]/20 transition-transform active:scale-95 hover:bg-[#20BE5C]"
                  >
                    <MessageCircle size={20} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-gray-900/20 transition-transform active:scale-95 hover:bg-gray-800"
                  >
                    <Phone size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const CityProjectsScreen = () => {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);
  const [filterType, setFilterType] = useState<'Owner' | 'Builder'>('Builder');

  return (
    <div className="h-full bg-white flex flex-col">
      {/* --- Sticky Header --- */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-5 pt-12 pb-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900 active:scale-90 transition-transform"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className={`flex-1 flex items-center bg-gray-100 rounded-2xl px-4 py-2.5 transition-all duration-300 border ${searchFocused ? 'border-[#2FED9A] shadow-lg shadow-[#2FED9A]/10 bg-white' : 'border-transparent'}`}>
            <Search size={18} className={searchFocused ? "text-[#2FED9A]" : "text-gray-400"} />
            <input 
              type="text" 
              placeholder={`Search in ${CITY_NAME}...`} 
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium ml-2 text-gray-900 placeholder:text-gray-400"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900 active:scale-95 transition-transform">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* --- Header Title with Result Count --- */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 leading-tight">Featured Projects</h1>
            <p className="text-sm font-bold text-gray-400">in {CITY_NAME}</p>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-1">
            {PROJECTS.length} Results
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* --- Popular Builders Section --- */}
        <div className="mt-8">
          <div className="px-5 flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Popular Builders</h2>
            <button className="text-[10px] font-black text-[#2FED9A] uppercase tracking-widest">See All</button>
          </div>
          <div className="flex gap-6 overflow-x-auto no-scrollbar px-5 pb-4">
            {POPULAR_BUILDERS.map((builder) => (
              <BuilderCard key={builder.id} builder={builder} />
            ))}
          </div>
        </div>

        {/* --- Filter & Sort Row --- */}
        <div className="mt-4 px-5 flex items-center justify-between sticky top-[138px] z-40 py-4 bg-white/80 backdrop-blur-lg -mx-5 px-5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button className="h-9 px-4 rounded-xl bg-gray-900 text-white flex items-center gap-2 text-xs font-black shadow-lg shadow-black/10">
              <SlidersHorizontal size={14} /> Filters
            </button>
            <button className="h-9 px-4 rounded-xl bg-white border border-gray-200 text-gray-900 flex items-center gap-2 text-xs font-black">
              <ArrowUpDown size={14} /> Sort
            </button>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button 
              onClick={() => setFilterType('Builder')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${filterType === 'Builder' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
            >
              Builder
            </button>
            <button 
              onClick={() => setFilterType('Owner')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${filterType === 'Owner' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'}`}
            >
              Owner
            </button>
          </div>
        </div>

        {/* --- Projects List --- */}
        <div className="mt-4 px-5">
          <div className="mb-4">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Listing Handpicked For You</h2>
          </div>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* --- Footer Empty State or Pagination --- */}
        <div className="px-5 py-10 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
            <Building2 size={12} /> No More Projects in this area
          </div>
        </div>
      </div>
    </div>
  );
};
