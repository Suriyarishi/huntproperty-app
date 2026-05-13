
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Building2, MapPin, 
  ChevronRight, Plus, Image as ImageIcon, FileText,
  DollarSign, Check, Upload, Trash2, 
  Info, ShieldCheck, Zap, Lock, Unlock,
  Search, Layout, Activity, Star, 
  TowerControl as Tower, Layers, LayoutGrid,
  Percent, Briefcase, Car, Shield, 
  Wind, Flame, Phone, Mail
} from 'lucide-react';

interface CommercialProjectFlowProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const steps = [
  "Basic Info",
  "Configuration",
  "Pricing & ROI",
  "Amenities",
  "Media",
  "Review"
];

export const CommercialProjectFlow: React.FC<CommercialProjectFlowProps> = ({ onCancel, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    projectName: '',
    subtype: 'Office Space',
    address: '',
    city: '',
    state: '',
    possessionStatus: 'Under Construction',
    
    // Step 2
    towers: '',
    floors: '',
    totalUnits: '',
    floorSize: '',
    unitTypes: ['Small Office (250 sqft)'],
    isLockable: true,
    
    // Step 3
    pricePerSqft: '',
    startingPrice: '',
    priceRange: '',
    paymentPlans: ['CLP'],
    roi: '12%',
    assuredRental: {
      office: '',
      shop: '',
      foodCourt: ''
    },
    
    // Step 4
    amenities: ['Security', 'Power Backup'],
    
    // Step 5
    media: [] as File[],
    sitePlan: null as File | null,
    brochure: null as File | null,
  });

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(prev => prev + 1);
    else setIsSubmitted(true);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
    else onCancel();
  };

  const handleToggleUnitType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      unitTypes: prev.unitTypes.includes(type) 
        ? prev.unitTypes.filter(t => t !== type)
        : [...prev.unitTypes, type]
    }));
  };

  const handleTogglePaymentPlan = (plan: string) => {
    setFormData(prev => ({
      ...prev,
      paymentPlans: prev.paymentPlans.includes(plan) 
        ? prev.paymentPlans.filter(p => p !== plan)
        : [...prev.paymentPlans, plan]
    }));
  };

  const handleToggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity) 
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const renderProgress = () => (
    <div className="flex items-center justify-between mb-8 px-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden mr-4">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / 6) * 100}%` }}
          className="h-full bg-[#2FED9A]"
        />
      </div>
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
        Step {currentStep} / 6
      </span>
    </div>
  );

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center"
      >
        <div className="w-24 h-24 bg-[#2FED9A] rounded-[32px] flex items-center justify-center mb-8 shadow-2xl shadow-[#2FED9A]/40 animate-bounce">
          <Check size={48} strokeWidth={3} className="text-gray-900" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4">Project Added Successfully</h2>
        <p className="text-gray-500 font-bold text-sm max-w-xs mx-auto mb-12 uppercase tracking-wide">Your commercial venture is now live on Hunt Property.</p>
        <button 
          onClick={onSuccess}
          className="w-full max-w-sm h-16 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-800 transition-all shadow-xl"
        >
          View Project
        </button>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between">
        <button onClick={prevStep} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{steps[currentStep-1]}</h3>
          <p className="text-[10px] font-bold text-[#2FED9A] uppercase tracking-[0.2em]">Commercial Listing</p>
        </div>
        <div className="w-11" /> {/* Spacer */}
      </div>

      <div className="flex-1 px-6 pb-32">
        {renderProgress()}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* STEP 1: BASIC INFO */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Project Name</label>
                  <input 
                    type="text"
                    value={formData.projectName}
                    onChange={e => setFormData({...formData, projectName: e.target.value})}
                    placeholder="e.g. Phoenix Business Hub"
                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-bold text-sm outline-none focus:border-[#2FED9A] transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sub-type</label>
                  <div className="flex flex-wrap gap-2">
                    {['Office Space', 'Retail Shop', 'Food Court', 'Showroom'].map(sub => (
                      <button
                        key={sub}
                        onClick={() => setFormData({...formData, subtype: sub})}
                        className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                          formData.subtype === sub 
                            ? 'bg-[#2FED9A] border-[#2FED9A] text-gray-900' 
                            : 'bg-white border-gray-100 text-gray-400'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address</label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      placeholder="Street Address, Area"
                      className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-6 pr-12 font-bold text-sm outline-none focus:border-[#2FED9A] transition-all"
                    />
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2FED9A]" size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                    <input 
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      placeholder="e.g. Noida"
                      className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-bold text-sm outline-none focus:border-[#2FED9A] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">State</label>
                    <input 
                      type="text"
                      value={formData.state}
                      onChange={e => setFormData({...formData, state: e.target.value})}
                      placeholder="e.g. UP"
                      className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-bold text-sm outline-none focus:border-[#2FED9A] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Possession Status</label>
                  <select 
                    value={formData.possessionStatus}
                    onChange={e => setFormData({...formData, possessionStatus: e.target.value})}
                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-bold text-sm outline-none focus:border-[#2FED9A] transition-all appearance-none"
                  >
                    <option>Ready to Move</option>
                    <option>Under Construction</option>
                    <option>New Launch</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 2: CONFIGURATION */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Tower size={12} /> Towers
                    </label>
                    <input 
                      type="number"
                      value={formData.towers}
                      onChange={e => setFormData({...formData, towers: e.target.value})}
                      placeholder="0"
                      className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-bold text-sm outline-none focus:border-[#2FED9A]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Layers size={12} /> Floors
                    </label>
                    <input 
                      type="number"
                      value={formData.floors}
                      onChange={e => setFormData({...formData, floors: e.target.value})}
                      placeholder="0"
                      className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-bold text-sm outline-none focus:border-[#2FED9A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <LayoutGrid size={12} /> Total Units
                    </label>
                    <input 
                      type="number"
                      value={formData.totalUnits}
                      onChange={e => setFormData({...formData, totalUnits: e.target.value})}
                      placeholder="0"
                      className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-bold text-sm outline-none focus:border-[#2FED9A]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Floor Size (sqft)</label>
                    <input 
                      type="number"
                      value={formData.floorSize}
                      onChange={e => setFormData({...formData, floorSize: e.target.value})}
                      placeholder="0"
                      className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-bold text-sm outline-none focus:border-[#2FED9A]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Unit Types</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { label: 'Small Office (250 sqft)', desc: 'Perfect for startups' },
                      { label: 'Medium Office (750 sqft)', desc: 'Standard business floor' },
                      { label: 'Large Office (1250 sqft)', desc: 'Corporate headquarters' }
                    ].map(unit => (
                      <button
                        key={unit.label}
                        onClick={() => handleToggleUnitType(unit.label)}
                        className={`p-5 rounded-2xl border flex items-center justify-between transition-all ${
                          formData.unitTypes.includes(unit.label)
                            ? 'bg-[#1A1A1A] border-[#2FED9A] text-white'
                            : 'bg-white border-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="text-left">
                          <p className="text-xs font-black uppercase tracking-widest">{unit.label}</p>
                          <p className={`text-[10px] font-bold mt-1 ${formData.unitTypes.includes(unit.label) ? 'text-gray-400' : 'text-gray-400'}`}>{unit.desc}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${formData.unitTypes.includes(unit.label) ? 'bg-[#2FED9A] text-gray-900' : 'bg-gray-50 text-gray-200'}`}>
                          <Check size={14} strokeWidth={3} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-gray-50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#2FED9A] shadow-sm">
                      {formData.isLockable ? <Lock size={20} /> : <Unlock size={20} />}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest">Lockable Space</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ownership type</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setFormData({...formData, isLockable: !formData.isLockable})}
                    className={`w-14 h-8 rounded-full relative transition-colors ${formData.isLockable ? 'bg-[#2FED9A]' : 'bg-gray-200'}`}
                  >
                    <motion.div 
                      animate={{ x: formData.isLockable ? 26 : 4 }}
                      className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                    />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PRICING & ROI */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price per sqft</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-gray-400">₹</span>
                      <input 
                        type="number"
                        value={formData.pricePerSqft}
                        onChange={e => setFormData({...formData, pricePerSqft: e.target.value})}
                        placeholder="0.00"
                        className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl pl-10 pr-6 font-bold text-sm outline-none focus:border-[#2FED9A]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Starting Price</label>
                      <input 
                        type="text"
                        value={formData.startingPrice}
                        onChange={e => setFormData({...formData, startingPrice: e.target.value})}
                        placeholder="e.g. 45 Lac"
                        className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-bold text-sm outline-none focus:border-[#2FED9A]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price Range</label>
                      <input 
                        type="text"
                        value={formData.priceRange}
                        onChange={e => setFormData({...formData, priceRange: e.target.value})}
                        placeholder="e.g. 45 - 80 Lac"
                        className="w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-6 font-bold text-sm outline-none focus:border-[#2FED9A]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Payment Plans</label>
                  <div className="flex gap-2">
                    {['CLP', 'Flexi', 'Down Payment'].map(plan => (
                      <button
                        key={plan}
                        onClick={() => handleTogglePaymentPlan(plan)}
                        className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                          formData.paymentPlans.includes(plan) 
                            ? 'bg-[#1A1A1A] border-[#2FED9A] text-white' 
                            : 'bg-white border-gray-100 text-gray-400'
                        }`}
                      >
                        {plan}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900 rounded-[32px] p-8 space-y-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Percent size={80} className="text-[#2FED9A]" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#2FED9A] text-gray-900 rounded-xl flex items-center justify-center">
                        <Activity size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-white uppercase tracking-tight">Assured ROI</h4>
                        <p className="text-[8px] font-bold text-[#2FED9A] uppercase tracking-[0.3em]">Investment Yield</p>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      {['9%', '10%', '12%'].map(val => (
                        <button
                          key={val}
                          onClick={() => setFormData({...formData, roi: val})}
                          className={`flex-1 h-14 rounded-2xl font-black text-xs transition-all border-2 ${
                            formData.roi === val 
                              ? 'bg-[#2FED9A] border-[#2FED9A] text-gray-900' 
                              : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assured Rental (₹/sqft)</label>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-[9px] font-black text-gray-500 uppercase tracking-widest">Office</span>
                        <input 
                          type="number" 
                          placeholder="e.g. 65"
                          value={formData.assuredRental.office}
                          onChange={e => setFormData({...formData, assuredRental: {...formData.assuredRental, office: e.target.value}})}
                          className="flex-1 h-12 bg-white/5 border border-white/10 rounded-xl px-4 font-bold text-white text-xs outline-none focus:border-[#2FED9A]"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-[9px] font-black text-gray-500 uppercase tracking-widest">Shop</span>
                        <input 
                          type="number" 
                          placeholder="e.g. 120"
                          value={formData.assuredRental.shop}
                          onChange={e => setFormData({...formData, assuredRental: {...formData.assuredRental, shop: e.target.value}})}
                          className="flex-1 h-12 bg-white/5 border border-white/10 rounded-xl px-4 font-bold text-white text-xs outline-none focus:border-[#2FED9A]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: AMENITIES */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Premium Amenities</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select business features included</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'Power Backup', icon: Zap },
                    { id: 'Security', icon: Shield },
                    { id: 'Business Center', icon: Briefcase },
                    { id: 'Parking', icon: Car },
                    { id: 'High-speed Elevators', icon: Tower },
                    { id: 'Fire Safety', icon: Flame }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleToggleAmenity(item.id)}
                      className={`p-6 rounded-[28px] border transition-all flex flex-col items-center gap-4 text-center group ${
                        formData.amenities.includes(item.id)
                          ? 'bg-[#1A1A1A] border-[#2FED9A] text-white shadow-xl shadow-[#2FED9A]/10'
                          : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        formData.amenities.includes(item.id) ? 'bg-[#2FED9A] text-gray-900' : 'bg-gray-50 text-gray-300 group-hover:bg-gray-100'
                      }`}>
                        <item.icon size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest leading-tight">{item.id}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: MEDIA UPLOAD */}
            {currentStep === 5 && (
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Project Gallery</label>
                    <span className="text-[8px] font-black text-[#2FED9A] uppercase tracking-widest">{formData.media.length} Images</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative aspect-square">
                      <input 
                        type="file" 
                        multiple 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        onChange={e => {
                          const files = Array.from(e.target.files || []);
                          setFormData({...formData, media: [...formData.media, ...files]});
                        }}
                      />
                      <div className="w-full h-full border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-300 bg-gray-50/50 hover:border-[#2FED9A] hover:text-[#2FED9A] transition-all">
                        <Plus size={20} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Add</span>
                      </div>
                    </div>
                    {formData.media.map((file, i) => (
                      <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm bg-gray-100 flex items-center justify-center">
                        <ImageIcon size={24} className="text-gray-300" />
                        <button 
                          onClick={() => setFormData({...formData, media: formData.media.filter((_, idx) => idx !== i)})}
                          className="absolute top-1 right-1 w-6 h-6 bg-white/90 text-red-500 rounded-lg flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[6px] text-white truncate font-black uppercase tracking-widest">{file.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Site Plan (PDF/Image)</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        onChange={e => setFormData({...formData, sitePlan: e.target.files?.[0] || null})}
                      />
                      <div className={`w-full h-20 rounded-2xl border-2 border-dashed flex items-center justify-center gap-3 transition-all ${
                        formData.sitePlan ? 'border-[#2FED9A] bg-emerald-50 text-emerald-600' : 'border-gray-100 bg-gray-50/50 text-gray-400 group-hover:border-gray-200'
                      }`}>
                        <Upload size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {formData.sitePlan ? formData.sitePlan.name : 'Upload Site Plan'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Project Brochure (PDF)</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        onChange={e => setFormData({...formData, brochure: e.target.files?.[0] || null})}
                      />
                      <div className={`w-full h-20 rounded-2xl border-2 border-dashed flex items-center justify-center gap-3 transition-all ${
                        formData.brochure ? 'border-[#2FED9A] bg-emerald-50 text-emerald-600' : 'border-gray-100 bg-gray-50/50 text-gray-400 group-hover:border-gray-200'
                      }`}>
                        <FileText size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {formData.brochure ? formData.brochure.name : 'Upload Brochure'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW */}
            {currentStep === 6 && (
              <div className="space-y-10">
                <div className="bg-gray-50 rounded-[40px] p-8 space-y-8 border border-gray-100">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[#2FED9A] shadow-md shrink-0">
                      <Building2 size={32} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-2">
                        {formData.projectName || 'Unnamed Project'}
                      </h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={10} className="text-[#2FED9A]" /> {formData.city}, {formData.state}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Pricing</p>
                      <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Starting ₹{formData.startingPrice}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Configuration</p>
                      <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{formData.floors} Floors • {formData.towers} Towers</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">ROI Yield</p>
                      <p className="text-sm font-black text-[#2FED9A] uppercase tracking-tight">{formData.roi} Assured</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Sub-type</p>
                      <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{formData.subtype}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 space-y-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selected Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map(a => (
                        <span key={a} className="px-4 py-2 bg-white rounded-full text-[9px] font-bold text-gray-600 border border-gray-100 uppercase tracking-widest">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 text-white p-8 rounded-[40px] space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <ShieldCheck size={60} />
                  </div>
                  <div className="relative z-10 space-y-2">
                    <h4 className="text-xl font-black uppercase tracking-tight">Legal Compliance</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">By submitting, you agree to our project listing terms.</p>
                  </div>
                  <div className="relative z-10 flex items-center gap-4 py-4 border-t border-white/5">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#2FED9A]">
                      <Info size={18} />
                    </div>
                    <p className="text-[9px] font-medium text-gray-400 leading-relaxed uppercase tracking-wider">
                      Your project will be verified by our team and will be visible within 24 hours of successful validation.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50">
        <div className="max-w-screen-xl mx-auto flex gap-4">
          {currentStep > 1 && (
            <button 
              onClick={prevStep}
              className="w-20 h-16 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-all"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <button 
            onClick={nextStep}
            className="flex-1 h-16 bg-[#2FED9A] text-gray-900 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-[#2FED9A]/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            {currentStep === 6 ? 'Submit Project' : 'Next Step'}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
