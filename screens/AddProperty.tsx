
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Upload, Home, Check, AlertCircle, X, MapPin, DollarSign, Layers, Calendar, Ruler, Image as ImageIcon, Camera, Plus } from 'lucide-react';
import { Button, Input, Badge } from '../components/UI';
import { generatePropertyDescription } from '../services/gemini';
import { useNavigate } from 'react-router-dom';
import { Property } from '../types';

interface Props {
  properties?: Property[];
}

const AMENITIES_LIST = [
  "Car Parking", "Kid’s Playground", "Club House", "Restaurants", 
  "Fitness Gym", "School", "Hospital", "Swimming Pool", 
  "24 Hour Water Supply", "Firefighting", "Power backup", "Yoga", "Library"
];

export const AddProperty: React.FC<Props> = ({ properties = [] }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  
  const { hash } = window.location;
  const isEditMode = hash.includes('/edit/');
  const editId = isEditMode ? hash.split('/edit/')[1]?.split('?')[0] : null;

  const [step, setStep] = useState(1);
  const [loadingGen, setLoadingGen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customAmenity, setCustomAmenity] = useState('');
  
  // Expanded Form State
  const [formData, setFormData] = useState({
    // Step 1: Basic
    propertyName: '',
    propertyFor: 'Sell', // Sell | Rent
    propertyType: 'Apartment',
    description: '',
    
    // Step 2: Location
    state: '',
    city: '',
    locality: '',
    address: '',
    landmark: '',
    
    // Step 2: Features
    buildingName: '',
    finishingStatus: 'Unfurnished',
    personalWashroom: 'no',
    pantry: 'no',
    floorNo: '',
    totalFloors: '',
    facing: 'East',
    storeRoom: 'no',
    
    // Step 2: Area
    superArea: '',
    builtUpArea: '',
    carpetArea: '',
    
    // Step 2: Transaction
    transactionType: 'New Property', // New Property | Resale
    possessionStatus: 'Ready to move', // Under Construction | Ready to move
    availableFrom: '',
    ageOfConstruction: 'New Construction',
    carParking: 'no',
    lift: 'no',
    ownershipType: 'Freehold',
    unitNumber: '',
    
    // Step 2: Price
    expectedPrice: '',
    bookingAmount: '',
    maintenanceCharges: '',
    brokerage: '',

    // Step 3: Amenities
    amenities: [] as string[],

    // Step 4: Photos
    coverImage: '',
    images: [] as string[]
  });

  // Load existing data if editing
  React.useEffect(() => {
    if (editId && properties.length > 0) {
      const existing = properties.find(p => p.id === editId);
      if (existing) {
        // Check for custom amenities (not in the standard list)
        const standardAmenities = new Set(AMENITIES_LIST);
        const currentAmenities = existing.features || [];
        const custom = currentAmenities.find(a => !standardAmenities.has(a));
        
        let formattedAmenities = currentAmenities;
        if (custom) {
          // If there's a custom amenity, we represent it as 'Other' selected + text value
          setCustomAmenity(custom);
          formattedAmenities = [...currentAmenities.filter(a => standardAmenities.has(a)), 'Other'];
        }

        setFormData(prev => ({
          ...prev,
          propertyName: existing.title,
          propertyType: existing.type,
          expectedPrice: existing.price.toString(),
          superArea: existing.area.toString(),
          address: existing.address,
          city: existing.city,
          description: existing.description,
          amenities: formattedAmenities,
          images: existing.images || [],
          coverImage: existing.images[0] || ''
        }));
      }
    }
  }, [editId, properties]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean = false) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file: any) => URL.createObjectURL(file));
      if (isCover) {
        setFormData(prev => ({ ...prev, coverImage: newImages[0] }));
      } else {
        setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.propertyName.trim()) newErrors.propertyName = "Property name is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
    }

    if (currentStep === 2) {
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.superArea) newErrors.superArea = "Super Area is required";
      if (!formData.expectedPrice) newErrors.expectedPrice = "Price is required";
    }
    
    if (currentStep === 3) {
      if (formData.amenities.includes('Other') && !customAmenity.trim()) {
        // Optionally require text if 'Other' is checked
        // newErrors.amenities = "Please specify the other amenity";
      }
    }

    if (currentStep === 4) {
      if (!formData.coverImage && formData.images.length === 0) {
         // Optional: enforce at least one image
         // newErrors.images = "Please upload at least one image";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      // Scroll to top on step change
      const container = document.querySelector('.scrollable-content');
      if(container) container.scrollTop = 0;
    }
  };

  const handleSubmit = () => {
    if (validateStep(4)) {
      // Prepare final amenities list: replace 'Other' with custom text
      const finalAmenities = formData.amenities
        .filter(a => a !== 'Other')
        .concat(formData.amenities.includes('Other') && customAmenity ? [customAmenity] : []);
        
      // In a real app, we would send this data
      console.log("Submitting:", { ...formData, amenities: finalAmenities });

      alert(isEditMode ? "Property Updated Successfully!" : "Property Listed Successfully!");
      navigate('/my-listings');
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.propertyName || !formData.propertyType) {
      setErrors(prev => ({ ...prev, description: "Please complete name and type first." }));
      return;
    }
    setLoadingGen(true);
    const desc = await generatePropertyDescription(
      formData.propertyName,
      formData.propertyType,
      parseInt(formData.unitNumber) || 2, // approximate bhk
      formData.amenities.slice(0, 3),
      parseInt(formData.superArea) || 1000
    );
    setFormData(prev => ({ ...prev, description: desc }));
    setLoadingGen(false);
  };

  // Helper for Radio Yes/No
  const YesNoToggle = ({ label, name, value }: { label: string, name: string, value: string }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-500 ml-1">{label}</label>
      <div className="flex gap-3">
        {['yes', 'no'].map(opt => (
          <button
            key={opt}
            onClick={() => handleChange({ target: { name, value: opt } })}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
              value === opt 
                ? 'bg-primary text-text border-primary' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );

  // Helper for Select
  const SelectInput = ({ label, name, value, options }: { label: string, name: string, value: string, options: string[] }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-500 ml-1">{label}</label>
      <div className="relative">
        <select 
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/20 appearance-none text-gray-700"
        >
          <option value="">---Select---</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
      {errors[name] && <p className="text-xs text-red-500 ml-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex-none bg-white z-10 px-4 py-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-lg">{isEditMode ? 'Edit Property' : 'Add New Property'}</h1>
          <div className="flex gap-1 mt-2">
             {[1, 2, 3, 4].map(i => (
               <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-primary' : 'bg-gray-100'}`} />
             ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-1 text-right">Step {step} of 4</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollable-content no-scrollbar p-5 bg-gray-50/50">
        
        {/* --- STEP 1: BASIC INFO --- */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 pb-20">
            
            {/* Property For */}
            <div className="bg-white p-1 rounded-2xl border border-gray-200 flex">
              {['Sell', 'Rent', 'PG'].map(type => (
                <button
                  key={type}
                  onClick={() => handleChange({ target: { name: 'propertyFor', value: type } })}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                    formData.propertyFor === type 
                      ? 'bg-primary text-text shadow-sm' 
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <Input 
              label="Property Name" 
              name="propertyName" 
              placeholder="Enter Your Property Name" 
              value={formData.propertyName} 
              onChange={handleChange} 
              error={errors.propertyName}
            />

            <SelectInput 
              label="Property Type" 
              name="propertyType" 
              value={formData.propertyType} 
              options={['Apartment', 'Villa', 'Plot', 'Commercial Office', 'Shop', 'Warehouse']}
            />

            <div className="space-y-2">
               <div className="flex justify-between items-end">
                 <label className="text-xs font-medium text-gray-500 ml-1">DESCRIPTION</label>
                 <button 
                  onClick={handleGenerateDescription}
                  disabled={loadingGen}
                  className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                 >
                   <Sparkles size={12} /> {loadingGen ? 'Generating...' : 'AI Write'}
                 </button>
               </div>
               <div className="relative">
                 <textarea 
                    name="description"
                    className={`w-full bg-white border ${errors.description ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/20 min-h-[150px] text-sm leading-relaxed resize-none`}
                    placeholder="Describe your property..."
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={500}
                 />
                 <div className="absolute bottom-3 right-3 text-[10px] text-gray-400 bg-white px-1">
                   {500 - formData.description.length} characters left
                 </div>
               </div>
               {errors.description && <p className="text-xs text-red-500 ml-1">{errors.description}</p>}
            </div>
          </motion.div>
        )}

        {/* --- STEP 2: DETAILED INFO --- */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 pb-20">
            
            {/* Section: Location */}
            <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><MapPin size={18}/></div>
                <h3 className="font-bold text-gray-900">Location</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <SelectInput label="State" name="state" value={formData.state} options={['California', 'Texas', 'New York', 'Florida']} />
                <SelectInput label="City" name="city" value={formData.city} options={['Los Angeles', 'Austin', 'NYC', 'Miami']} />
              </div>
              <Input label="Locality" name="locality" placeholder="e.g. Downtown" value={formData.locality} onChange={handleChange} />
              <Input label="Address" name="address" placeholder="House No, Street" value={formData.address} onChange={handleChange} error={errors.address} />
              <Input label="Landmark" name="landmark" placeholder="Near City Park" value={formData.landmark} onChange={handleChange} />
            </section>

            {/* Section: Features */}
            <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Layers size={18}/></div>
                <h3 className="font-bold text-gray-900">Property Features</h3>
              </div>

              <Input label="Building Name" name="buildingName" placeholder="e.g. Sunshine Heights" value={formData.buildingName} onChange={handleChange} />
              <SelectInput label="Finishing Status" name="finishingStatus" value={formData.finishingStatus} options={['Furnished', 'Semi-Furnished', 'Unfurnished']} />
              
              <div className="grid grid-cols-2 gap-4">
                <YesNoToggle label="Personal Washroom" name="personalWashroom" value={formData.personalWashroom} />
                <YesNoToggle label="Pantry" name="pantry" value={formData.pantry} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <Input label="Floor Number" name="floorNo" type="number" placeholder="e.g. 4" value={formData.floorNo} onChange={handleChange} />
                 <Input label="Total Floors" name="totalFloors" type="number" placeholder="e.g. 12" value={formData.totalFloors} onChange={handleChange} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <SelectInput label="Facing" name="facing" value={formData.facing} options={['North', 'East', 'West', 'South', 'North-East']} />
                 <YesNoToggle label="Store Room" name="storeRoom" value={formData.storeRoom} />
              </div>
            </section>

            {/* Section: Area */}
            <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Ruler size={18}/></div>
                <h3 className="font-bold text-gray-900">Area Details</h3>
              </div>
              <Input label="Super Area (Sq. ft)" name="superArea" type="number" placeholder="Enter area" value={formData.superArea} onChange={handleChange} error={errors.superArea} />
              <Input label="Built Up Area (Sq. ft)" name="builtUpArea" type="number" placeholder="Enter area" value={formData.builtUpArea} onChange={handleChange} />
              <Input label="Carpet Area (Sq. ft)" name="carpetArea" type="number" placeholder="Enter area" value={formData.carpetArea} onChange={handleChange} />
            </section>

            {/* Section: Transaction */}
            <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Check size={18}/></div>
                <h3 className="font-bold text-gray-900">Transaction Type</h3>
              </div>
              
              <div className="space-y-1.5">
                 <label className="text-xs font-medium text-gray-500 ml-1">PROPERTY STATUS</label>
                 <div className="flex gap-3">
                    {['New Property', 'Resale'].map(t => (
                       <button key={t} onClick={() => handleChange({ target: { name: 'transactionType', value: t } })} 
                         className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${formData.transactionType === t ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}>
                         {t}
                       </button>
                    ))}
                 </div>
              </div>

              <SelectInput label="Possession Status" name="possessionStatus" value={formData.possessionStatus} options={['Under Construction', 'Ready to move']} />
              <Input label="Available From" name="availableFrom" type="date" value={formData.availableFrom} onChange={handleChange} />
              <SelectInput label="Age Of Construction" name="ageOfConstruction" value={formData.ageOfConstruction} options={['New Construction', '< 5 Years', '5-10 Years', '10+ Years']} />
              
              <div className="grid grid-cols-2 gap-4">
                <YesNoToggle label="Car Parking" name="carParking" value={formData.carParking} />
                <YesNoToggle label="Lift" name="lift" value={formData.lift} />
              </div>

              <SelectInput label="Ownership Type" name="ownershipType" value={formData.ownershipType} options={['Freehold', 'Leasehold', 'Power of Attorney']} />
              <Input label="Unit Number" name="unitNumber" placeholder="e.g. 401" value={formData.unitNumber} onChange={handleChange} />
            </section>

            {/* Section: Price */}
            <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
               <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><DollarSign size={18}/></div>
                <h3 className="font-bold text-gray-900">Price Details</h3>
              </div>
              <Input label="Expected Price (INR)" name="expectedPrice" type="number" placeholder="Enter Amount" value={formData.expectedPrice} onChange={handleChange} error={errors.expectedPrice} />
              <Input label="Booking Amount (INR)" name="bookingAmount" type="number" placeholder="Enter Amount" value={formData.bookingAmount} onChange={handleChange} />
              <Input label="Maintenance (per sqft/mo)" name="maintenanceCharges" type="number" placeholder="Amount" value={formData.maintenanceCharges} onChange={handleChange} />
              <Input label="Brokerage" name="brokerage" placeholder="If applicable" value={formData.brokerage} onChange={handleChange} />
            </section>

          </motion.div>
        )}

        {/* --- STEP 3: AMENITIES --- */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 pb-20">
             <h2 className="text-xl font-bold text-gray-900 mb-4">Select Amenities</h2>
             <div className="grid grid-cols-2 gap-3">
               {AMENITIES_LIST.map(amenity => {
                 const isSelected = formData.amenities.includes(amenity);
                 return (
                   <div 
                     key={amenity}
                     onClick={() => toggleAmenity(amenity)}
                     className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                       isSelected 
                         ? 'bg-primary/10 border-primary text-gray-900' 
                         : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
                     }`}
                   >
                     <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSelected ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                       {isSelected && <Check size={14} className="text-text" />}
                     </div>
                     <span className="text-sm font-medium">{amenity}</span>
                   </div>
                 );
               })}

               {/* Other Option */}
               <div 
                 onClick={() => toggleAmenity('Other')}
                 className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                   formData.amenities.includes('Other')
                     ? 'bg-primary/10 border-primary text-gray-900' 
                     : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
                 }`}
               >
                 <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${formData.amenities.includes('Other') ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                   {formData.amenities.includes('Other') && <Plus size={14} className="text-text" />}
                 </div>
                 <span className="text-sm font-medium">Other</span>
               </div>
             </div>
             
             {/* Conditional Input for Other */}
             {formData.amenities.includes('Other') && (
               <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                 <Input 
                   label="Specify Other Amenity" 
                   value={customAmenity} 
                   onChange={(e) => setCustomAmenity(e.target.value)} 
                   placeholder="e.g. Concierge, Solar Panels, etc."
                   className="bg-white"
                 />
               </motion.div>
             )}
          </motion.div>
        )}

        {/* --- STEP 4: PHOTOS --- */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 pb-20">
             
             {/* Banner */}
             <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-4 text-white shadow-lg shadow-blue-200">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg"><Sparkles size={20} /></div>
                  <div>
                    <h3 className="font-bold text-sm">Upload High Quality Photos</h3>
                    <p className="text-xs opacity-90">Get upto <span className="font-bold text-yellow-300">5X RESPONSE</span> on your listing.</p>
                  </div>
                </div>
             </div>

             {/* Cover Picture */}
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Camera size={16} className="text-primary" /> Cover Picture
                </label>
                <div 
                   onClick={() => coverInputRef.current?.click()}
                   className={`h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden relative ${
                     formData.coverImage ? 'border-primary bg-gray-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                   }`}
                >
                   {formData.coverImage ? (
                     <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                   ) : (
                     <div className="text-center text-gray-400">
                       <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                         <ImageIcon size={24} />
                       </div>
                       <span className="text-xs font-medium">Choose Cover Picture</span>
                     </div>
                   )}
                   <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, true)} />
                   
                   {formData.coverImage && (
                     <button onClick={(e) => { e.stopPropagation(); setFormData(p => ({...p, coverImage: ''}))}} className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full">
                       <X size={14} />
                     </button>
                   )}
                </div>
             </div>

             {/* Gallery */}
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <ImageIcon size={16} className="text-primary" /> Gallery & Others
                </label>
                <p className="text-xs text-gray-500 mb-2">Exterior, Living Room, Bedroom, Bathroom, Kitchen, Floor Plan, Location Map</p>
                
                <div className="grid grid-cols-3 gap-2">
                   <div 
                     onClick={() => fileInputRef.current?.click()}
                     className="aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-white hover:bg-gray-50 flex flex-col items-center justify-center cursor-pointer text-gray-400"
                   >
                      <Upload size={20} className="mb-1" />
                      <span className="text-[10px] font-bold">Add More</span>
                   </div>
                   {formData.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                         <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                         <button 
                           onClick={() => removeImage(idx)}
                           className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full"
                         >
                           <X size={12} />
                         </button>
                      </div>
                   ))}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImageUpload(e, false)} />
             </div>

          </motion.div>
        )}

      </div>

      {/* Footer */}
      <div className="flex-none bg-white border-t border-gray-100 p-4 flex gap-3 safe-area-bottom shadow-[0_-5px_10px_rgba(0,0,0,0.03)] z-20">
        {step > 1 && (
           <Button variant="outline" className="flex-1 border-gray-200" onClick={() => {
             setStep(prev => prev - 1);
             const container = document.querySelector('.scrollable-content');
             if(container) container.scrollTop = 0;
           }}>
             Back
           </Button>
        )}
        {step < 4 ? (
           <Button className="flex-1" fullWidth onClick={handleNext}>
             Next Step
           </Button>
        ) : (
           <Button className="flex-1 bg-black text-white hover:bg-gray-800 shadow-lg shadow-black/20" fullWidth onClick={handleSubmit}>
             {isEditMode ? 'Update Listing' : 'Submit Property'}
           </Button>
        )}
      </div>
    </div>
  );
};
