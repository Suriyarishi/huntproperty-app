
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Share2, Heart, MapPin, CheckCircle2, ChevronDown,
  Building2, Compass, Home as HomeIcon, Eye, Image as ImageIcon,
  Ruler, Layers, Map, FileText, Phone, MessageCircle, Play
} from 'lucide-react';

type PropertyCategory = 'Residential' | 'Commercial' | 'Plot' | 'Agricultural';

const AccordionItem = ({ title, icon: Icon, children, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden mb-4 shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-white transition-colors active:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#00AEEF]">
            <Icon size={20} />
          </div>
          <h3 className="font-extrabold text-blue-900">{title}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-gray-400">
          <ChevronDown size={20} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-gray-50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export const UnitDetailsScreen = () => {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  
  // For demonstration, we'll allow switching between category types to see the dynamic UI.
  const [category, setCategory] = useState<PropertyCategory>('Residential');

  // Dynamic Content Generator based on category
  const generateData = (cat: PropertyCategory) => {
    const base = {
      id: 'u1',
      title: cat === 'Commercial' ? 'Premium Office Space' : cat === 'Plot' ? 'Residential Plot' : cat === 'Agricultural' ? 'Fertile Farm Land' : '4 BHK Luxury Apartment',
      projectName: 'Lodha World Towers',
      builder: 'Lodha Group',
      type: cat,
      location: 'Lower Parel, Mumbai',
      price: cat === 'Agricultural' ? '₹ 2.50 Cr' : '₹ 5.50 Cr',
      status: 'Ready to Move',
      isVerified: true,
      images: [
        cat === 'Commercial' ? 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' :
        cat === 'Agricultural' ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop' :
        cat === 'Plot' ? 'https://images.unsplash.com/photo-1598464332822-26f5927ad0e2?q=80&w=800&auto=format&fit=crop' :
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'
      ],
      highlightsData: {
        facing: 'East Facing',
        furnishing: cat === 'Commercial' ? 'Bare Shell' : cat === 'Agricultural' ? 'N/A' : 'Fully Furnished',
        view: cat === 'Plot' ? 'Park View' : 'Sea View',
        amenities: ['24/7 Security', 'Water Supply', 'Electricity']
      },
      projectInfo: {
        sector: 'Sector 42',
        landmarks: 'Near High Street Phoenix'
      },
      pricing: {
        basePrice: '₹ 5,30,00,000',
        stampDuty: '₹ 33,00,000',
        paymentPlan: 'Construction-Linked Plan (20:80)',
        totalEstimated: '₹ 5,73,00,000'
      },
      nearbyInfo: [
        { place: 'Western Express Highway', distance: '5 mins' },
        { place: 'High Street Phoenix Mall', distance: '10 mins' },
        { place: 'Hinduja Hospital', distance: '15 mins' }
      ]
    };

    if (cat === 'Residential') {
      return { ...base, configs: [
        { type: '3 BHK Flat', details: 'Spacious flat', size: '1,800 sqft', price: '₹ 4.50 Cr', tower: 'Tower A', floorPlan: true },
        { type: '4 BHK Flat', details: 'Luxury flat', size: '2,400 sqft', price: '₹ 5.50 Cr', tower: 'Tower B', floorPlan: true }
      ]};
    } else if (cat === 'Commercial') {
      return { ...base, configs: [
        { type: 'Office Space', details: 'IT Park', size: '5,000 sqft', price: '₹ 15.00 Cr', roi: '8.5% PA', rental: '₹ 10L/mo', tower: 'Tower C', floorPlan: true },
        { type: 'Retail Shop', details: 'Ground Floor', size: '1,200 sqft', price: '₹ 8.50 Cr', roi: '7.2% PA', rental: '₹ 4L/mo', tower: 'Tower A', floorPlan: true }
      ]};
    } else if (cat === 'Plot') {
      return { ...base, configs: [
        { type: 'Corner Plot', details: 'Park Facing', size: '10,000 sqft', price: '₹ 8.00 Cr', dimensions: '100x100 ft', block: 'Block B', floorPlan: false }
      ]};
    } else {
      return { ...base, configs: [
        { type: 'Farm Land', details: 'Clear Title', size: '5 Acres', price: '₹ 2.50 Cr', ownership: 'Freehold', conditions: 'Near highway, high yield soil', floorPlan: false }
      ]};
    }
  };

  const DATA = generateData(category);

  return (
    <div className="h-full bg-[#f8fafc] overflow-y-auto no-scrollbar pb-32">
      
      {/* Dynamic Type Switcher (Just for Testing/Demonstration) */}
      <div className="fixed top-SafeArea left-0 right-0 z-50 flex justify-center mt-2 pointer-events-none">
         <div className="bg-black/40 backdrop-blur-md rounded-full p-1 flex gap-1 shadow-xl pointer-events-auto border border-white/20 scale-90 origin-top">
            {['Residential', 'Commercial', 'Plot', 'Agricultural'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat as PropertyCategory)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-colors ${category === cat ? 'bg-white text-gray-900' : 'text-white'}`}
              >
                {cat}
              </button>
            ))}
         </div>
      </div>

      {/* ── Image Carousel Header ── */}
      <div className="relative h-[40vh] w-full bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.img 
            key={DATA.images[activeImage]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={DATA.images[activeImage]} 
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Top Navbar */}
        <div className="absolute top-0 left-0 right-0 p-5 pt-14 flex items-center justify-between z-10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform">
              <Share2 size={20} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col gap-2 z-10">
          {DATA.images.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${activeImage === idx ? 'bg-[#00AEEF] h-6' : 'bg-white/50'}`}
            />
          ))}
        </div>

        {/* Price & Title Overlay */}
        <div className="absolute bottom-5 left-5 right-5 z-10">
          <div className="flex items-end justify-between mb-2">
            <div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex flex-col bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 mb-3"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-[#2FED9A] mb-1">Asking Price</p>
                <h2 className="text-3xl font-black text-white leading-none">{DATA.price}</h2>
              </motion.div>
              <h1 className="text-2xl font-black text-white leading-tight drop-shadow-md">{DATA.title}</h1>
              <p className="text-xs font-bold text-gray-300 flex items-center gap-1 mt-1 drop-shadow-md">
                <MapPin size={12} /> {DATA.location}
              </p>
            </div>
            
            {DATA.isVerified && (
              <div className="flex flex-col items-center gap-1 mb-1">
                <div className="w-10 h-10 rounded-full bg-[#2FED9A]/20 backdrop-blur-md flex items-center justify-center border border-[#2FED9A]/50 shadow-[0_0_20px_rgba(47,237,154,0.3)]">
                  <CheckCircle2 size={20} className="text-[#2FED9A]" fill="currentColor" fillOpacity={0.2} />
                </div>
                <span className="text-[8px] font-black text-[#2FED9A] uppercase tracking-widest drop-shadow-sm">Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-6">
        
        {/* ── Info Grid ── */}
        <div className="bg-white rounded-3xl p-5 mb-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Property Type</p>
            <p className="text-sm font-black text-blue-900">{DATA.type}</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
            <p className="text-sm font-black text-[#00AEEF]">{DATA.status}</p>
          </div>
          <div className="w-px h-8 bg-gray-100" />
          <div className="text-center flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Builder</p>
            <p className="text-sm font-black text-blue-900 line-clamp-1 px-1">{DATA.builder}</p>
          </div>
        </div>

        {/* ── Project Info Card ── */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-5 mb-8 text-white relative overflow-hidden shadow-lg shadow-blue-900/20">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl flex-shrink-0" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-sky-400/20 rounded-full blur-2xl flex-shrink-0" />
          
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex-1">
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-1">Part of Project</p>
              <h3 className="text-xl font-black mb-1">{DATA.projectName}</h3>
              <div className="flex items-center gap-1.5 opacity-90 mb-3">
                <MapPin size={12} className="text-sky-300" />
                <span className="text-xs font-bold text-blue-100">{DATA.projectInfo.sector} • {DATA.projectInfo.landmarks}</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
              <Building2 size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* ── Expandable Sections ── */}

        {/* 1. Configurations (Tower + Floor Plan logic included based on property type) */}
        <AccordionItem title="Configurations" icon={Layers} defaultOpen={true}>
          <div className="space-y-4 pt-3">
            {DATA.configs.map((conf: any, idx: number) => (
              <div key={idx} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50 hover:bg-white transition-colors hover:shadow-sm">
                <div className="flex justify-between items-start mb-3 border-b border-gray-200 pb-3">
                  <div>
                    <p className="font-extrabold text-blue-900 text-lg">{conf.type}</p>
                    <p className="text-xs text-gray-500 font-bold mt-0.5">{conf.details}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#00AEEF] text-lg">{conf.price}</p>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Price</p>
                  </div>
                </div>

                {/* Dynamic Configuration Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex items-center gap-2">
                    <Ruler size={14} className="text-gray-400" />
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase">Size/Area</p>
                      <p className="text-xs font-black text-gray-900 leading-tight">{conf.size}</p>
                    </div>
                  </div>

                  {category === 'Residential' && conf.tower && (
                    <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex items-center gap-2">
                      <Building2 size={14} className="text-gray-400" />
                      <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Tower/Block</p>
                        <p className="text-xs font-black text-gray-900 leading-tight">{conf.tower}</p>
                      </div>
                    </div>
                  )}

                  {category === 'Commercial' && (
                    <>
                      <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col justify-center">
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Est. ROI</p>
                        <p className="text-xs font-black text-emerald-600 leading-tight">{conf.roi}</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col justify-center">
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Est. Rental</p>
                        <p className="text-xs font-black text-blue-600 leading-tight">{conf.rental}</p>
                      </div>
                    </>
                  )}

                  {category === 'Plot' && (
                    <>
                      <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col justify-center">
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Dimensions</p>
                        <p className="text-xs font-black text-blue-900 leading-tight">{conf.dimensions}</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col justify-center">
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Block</p>
                        <p className="text-xs font-black text-gray-900 leading-tight">{conf.block}</p>
                      </div>
                    </>
                  )}

                  {category === 'Agricultural' && (
                    <>
                      <div className="bg-white p-2.5 rounded-xl border border-gray-100 flex flex-col justify-center">
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Ownership</p>
                        <p className="text-xs font-black text-blue-900 leading-tight">{conf.ownership}</p>
                      </div>
                    </>
                  )}
                </div>

                {category === 'Agricultural' && (
                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl mb-3 flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] font-bold text-emerald-900 leading-relaxed">{conf.conditions}</p>
                  </div>
                )}

                {conf.floorPlan && (
                  <button className="w-full mt-1 bg-white border border-[#00AEEF]/30 text-[#00AEEF] hover:bg-[#00AEEF]/5 text-xs font-black py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                    <Layers size={16} /> View Floor Plan
                  </button>
                )}
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* 2. Pricing & Payment Plans */}
        <AccordionItem title="Pricing Section" icon={FileText}>
          <div className="pt-3">
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3 mb-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 border-dashed">
                <span className="text-xs text-gray-500 font-bold">Base Price</span>
                <span className="text-sm font-black text-blue-900">{DATA.pricing.basePrice}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 border-dashed">
                <span className="text-xs text-gray-500 font-bold">Estimated Stamp Duty</span>
                <span className="text-sm font-black text-blue-900">{DATA.pricing.stampDuty}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-blue-900 font-black">Total Estimated Cost</span>
                <span className="text-xl font-black text-[#00AEEF]">{DATA.pricing.totalEstimated}</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
               <FileText size={20} className="text-[#00AEEF] shrink-0" />
               <div>
                  <h4 className="text-[11px] font-black text-blue-900 uppercase tracking-widest mb-1">Payment Plan</h4>
                  <p className="text-xs font-bold text-blue-800">{DATA.pricing.paymentPlan}</p>
               </div>
            </div>
          </div>
        </AccordionItem>

        {/* 3. Highlights (Combined Amenities & Features) */}
        <AccordionItem title="Highlights" icon={Heart}>
          <div className="pt-3">
             <div className="grid grid-cols-2 gap-3 mb-5 border-b border-gray-100 pb-5">
              <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-gray-100 shadow-sm">
                <Compass size={20} className="text-blue-400" />
                <p className="text-[11px] font-black text-blue-900 text-center leading-tight">{DATA.highlightsData.facing}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-gray-100 shadow-sm">
                <HomeIcon size={20} className="text-emerald-400" />
                <p className="text-[11px] font-black text-blue-900 text-center leading-tight">{DATA.highlightsData.furnishing}</p>
              </div>
             </div>

             <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Amenities & Features</h4>
             <div className="grid grid-cols-2 gap-y-4 gap-x-2">
               {DATA.highlightsData.amenities.map((amenity, idx) => (
                 <div key={idx} className="flex items-center gap-2">
                   <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                     <CheckCircle2 size={10} className="text-emerald-500" />
                   </div>
                   <span className="text-[11px] font-bold text-gray-700 leading-tight">{amenity}</span>
                 </div>
               ))}
             </div>
          </div>
        </AccordionItem>

        {/* 4. Nearby Info (formerly Location Advantage) */}
        <AccordionItem title="Nearby Info" icon={Map}>
          <div className="pt-3">
             <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-blue-100">
                {DATA.nearbyInfo.map((loc, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[30px] w-6 h-6 bg-white border-[3px] border-[#00AEEF] rounded-full z-10" />
                    <div>
                      <h4 className="text-sm font-black text-blue-900 leading-none mb-1">{loc.place}</h4>
                      <p className="text-xs font-bold text-gray-400">{loc.distance} Drive</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </AccordionItem>

        {/* 5. Gallery (formerly Media) */}
        <AccordionItem title="Gallery" icon={ImageIcon}>
          <div className="pt-3 space-y-4">
             <div>
               <h4 className="text-xs font-black text-gray-400 uppercase mb-3">Site Video</h4>
               <div className="h-40 rounded-2xl bg-gray-900 relative overflow-hidden flex items-center justify-center group cursor-pointer shadow-sm">
                  <img src={DATA.images[0]} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white group-hover:bg-[#00AEEF] group-hover:border-[#00AEEF] transition-colors z-10">
                     <Play size={24} fill="currentColor" className="ml-1" />
                  </div>
               </div>
             </div>
             
             <div>
               <h4 className="text-xs font-black text-gray-400 uppercase mb-3">Images ({DATA.images.length})</h4>
               <div className="grid grid-cols-2 gap-2">
                 {DATA.images.map((img, i) => (
                   <div key={i} className="h-24 rounded-xl overflow-hidden border border-gray-100 relative group cursor-pointer">
                     <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </AccordionItem>

      </div>

      {/* ── Sticky Bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 p-5 pt-0 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent z-40 max-w-[500px] mx-auto pointer-events-none">
        <div className="bg-white p-2 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 flex gap-2 w-full backdrop-blur-xl pointer-events-auto">
           <button className="flex items-center justify-center w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-[18px] active:scale-95 transition-transform">
             <MessageCircle size={24} fill="currentColor" />
           </button>
           <button className="flex-1 h-14 bg-blue-50 text-blue-600 font-black text-sm rounded-[18px] border border-blue-100 active:scale-95 transition-transform">
             View Number
           </button>
           <button className="flex-1 h-14 bg-gray-900 text-white font-black text-sm rounded-[18px] shadow-lg shadow-gray-900/20 active:scale-95 transition-transform flex items-center justify-center gap-2">
             <Phone size={18} fill="currentColor" /> Call
           </button>
        </div>
      </div>

    </div>
  );
};
