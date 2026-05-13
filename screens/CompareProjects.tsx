
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Share2, PhoneCall, CheckCircle2, 
  MapPin, AlertCircle, Building2, CalendarClock, ShieldCheck
} from 'lucide-react';

// Mock Data for Comparison
const COMPARE_DATA = [
  {
    id: 'p1',
    name: 'Godrej Reserve',
    builder: 'Godrej Properties',
    location: 'Kandivali East',
    price: '₹ 2.76 Cr - 7.62 Cr',
    config: '2, 3, 4 BHK',
    possession: 'Dec 2028',
    status: 'New Launch',
    rera: 'Registered',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop',
    usps: ['Resort-style living', 'Western Express Highway access', 'IGBC Gold Pre-certified'],
    amenities: 45
  },
  {
    id: 'p2',
    name: 'Godrej Urban Park',
    builder: 'Godrej Properties',
    location: 'Chandivali',
    price: '₹ 1.85 Cr - 3.25 Cr',
    config: '1, 2, 3 BHK',
    possession: 'Sep 2025',
    status: 'Under Construction',
    rera: 'Registered',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop',
    usps: ['PMAY Approved', 'Ready Sample Flat', 'Close to Metro'],
    amenities: 30
  }
];

export const CompareProjectsScreen = () => {
  const navigate = useNavigate();
  // Assume we pass 2-4 shortlisted project objects here, but we'll use mock data.
  const [projects, setProjects] = useState(COMPARE_DATA);

  return (
    <div className="h-full bg-[#F5F7F9] flex flex-col relative overflow-hidden">
      
      {/* ── Header ── */}
      <div className="bg-white px-4 pt-10 pb-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-gray-700 active:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <h1 className="text-lg font-black text-gray-900 leading-tight">Compare Projects</h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-wide mt-0.5">{projects.length} Projects Selected</p>
          </div>
        </div>
        <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-700">
          <Share2 size={16} />
        </button>
      </div>

      {/* ── Comparison Scrollable Area ── */}
      <div className="flex-1 overflow-x-auto overflow-y-auto w-full no-scrollbar pb-24 relative">
        <div className="min-w-max flex pl-[100px] border-b border-gray-100 bg-white">
          
          {/* Row Labels (Sticky Left Column) */}
          <div className="fixed left-0 w-[100px] bg-white border-r border-gray-100 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.02)] h-full">
            <div className="h-[200px] border-b border-gray-100 flex items-center justify-center bg-gray-50/50">
              {/* Spacer for Hero section */}
            </div>
            {/* Standard Row Heights */}
            <div className="h-16 flex items-center px-3 border-b border-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-50/30">Price</div>
            <div className="h-16 flex items-center px-3 border-b border-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-50/30">Config</div>
            <div className="h-16 flex items-center px-3 border-b border-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-50/30">Possession</div>
            <div className="h-16 flex items-center px-3 border-b border-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-50/30">RERA Status</div>
            <div className="h-16 flex items-center px-3 border-b border-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-50/30">Amenities</div>
            <div className="h-[140px] flex items-center px-3 border-b border-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-widest bg-gray-50/30">Top USPs</div>
          </div>

          {/* Project Columns */}
          <div className="flex divide-x divide-gray-100 z-10 w-full min-w-[300px]">
            {projects.map((project, idx) => (
              <div key={project.id} className="w-[180px] shrink-0 bg-white group">
                
                {/* Hero Box */}
                <div className="h-[200px] p-4 border-b border-gray-100 flex flex-col justify-between relative">
                  <div className="w-full h-24 rounded-xl overflow-hidden mb-3 relative">
                    <img src={project.image} className="w-full h-full object-cover" />
                    <button className="absolute top-1 right-1 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-gray-500">
                      <ArrowLeft size={10} className="rotate-45" /> {/* Use as X remove button for mockup */}
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-[13px] text-gray-900 leading-tight line-clamp-2">{project.name}</h3>
                    <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1 mt-1 truncate">
                      <MapPin size={10} className="shrink-0" /> {project.location}
                    </p>
                  </div>
                </div>

                {/* Price Row */}
                <div className="h-16 px-4 py-3 border-b border-gray-50 flex items-center">
                  <span className="font-black text-sm text-[#00AEEF] whitespace-nowrap">{project.price}</span>
                </div>

                {/* Config Row */}
                <div className="h-16 px-4 py-3 border-b border-gray-50 flex flex-col justify-center">
                  <span className="font-black text-xs text-gray-800">{project.config}</span>
                  <span className="text-[9px] text-gray-400 font-bold mt-0.5">Apartments</span>
                </div>

                {/* Possession Row */}
                <div className="h-16 px-4 py-3 border-b border-gray-50 flex items-center gap-2">
                  <CalendarClock size={14} className="text-amber-500" />
                  <span className="font-bold text-xs text-gray-800">{project.possession}</span>
                </div>

                {/* RERA */}
                <div className="h-16 px-4 py-3 border-b border-gray-50 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-indigo-500" />
                  <span className="font-bold text-xs text-indigo-700 bg-indigo-50 px-2 py-1 rounded">{project.rera}</span>
                </div>

                {/* Amenities */}
                <div className="h-16 px-4 py-3 border-b border-gray-50 flex flex-col justify-center">
                  <span className="font-black text-sm text-gray-800">{project.amenities}+</span>
                  <span className="text-[10px] text-gray-500 font-medium">Facilities provided</span>
                </div>

                {/* Highlights/USPs Row */}
                <div className="h-[140px] px-4 py-3 border-b border-gray-50">
                  <ul className="space-y-2">
                    {project.usps.map((usp, i) => (
                      <li key={i} className="flex items-start gap-1.5 line-clamp-2">
                        <CheckCircle2 size={12} className="text-[#2FED9A] shrink-0 mt-0.5" />
                        <span className="text-[10px] font-medium text-gray-600 leading-tight">{usp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
            
            {/* Add Project Slot */}
            {projects.length < 3 && (
              <div className="w-[180px] shrink-0 bg-gray-50 flex flex-col items-center justify-center border-b border-gray-100 border-dashed">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 mb-2 bg-white">
                  +
                </div>
                <p className="text-xs font-bold text-gray-500">Add Project</p>
                <p className="text-[9px] text-gray-400 mt-1">To Compare</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Fixed Footer CTAs ── */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe flex justify-between shadow-[0_-10px_20px_rgba(0,0,0,0.03)] z-40 max-w-[500px] mx-auto">
        <button className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-black text-xs active:bg-gray-50">
          <AlertCircle size={16} /> Disclaimer
        </button>
        <button className="flex-1 ml-4 h-12 bg-[#2FED9A] text-gray-900 font-black text-sm rounded-xl shadow-lg shadow-[#2FED9A]/20 flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <PhoneCall size={18} /> Contact Builders
        </button>
      </div>

    </div>
  );
};
