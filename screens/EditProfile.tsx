import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Save, SlidersHorizontal, Lock, ChevronRight, Home, Building2, Tag, 
  Plus, Check, MapPin, Monitor, Store, FileText, Rocket, MoreVertical, Layout, Building, ChevronDown, Square, CheckSquare 
} from 'lucide-react';

const TABS = ['Profile Details', 'Company Details', 'Office Details', 'Login Details', 'Security'];

export const EditProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Company Details');
  
  // Real data aligned with the user's profile screenshots
  const [profileData, setProfileData] = useState({
    name: 'rishi1',
    registeredAs: 'Builder',
    city: 'Noida',
    email: 'rishi1@gmail.com',
    alternateEmail: '',
    countryCode: 'IND +91',
    mobile: '0987654321',
    aadharNumber: 'N/A',
    officeAddress: 'Sector 62, Noida, UP',
    landline: 'N/A',
  });
  
  const [tempData, setTempData] = useState({ ...profileData });
  const [loading, setLoading] = useState(false);

  // New Company Details state based on screenshots
  const [companyDetails, setCompanyDetails] = useState({
    dealingIn: ['SALE'],
    propertyType: 'Residential',
    transactionTypes: [] as string[],
    residentialType: 'Multi-storey Apartments',
    commercialType: 'Commercial Office Space',
    operatingSince: '',
    expertiseIn: '',
    businessDescription: '',
    authorizedAgents: '',
    authorizedDealers: '',
    services: {
      propertyRegistry: 'No',
      loanFacility: 'No',
      nar: 'No',
      rera: 'No',
      credai: 'No'
    },
    clients: [{ name: '', dealValue: '' }]
  });

  const [showResidentialOthers, setShowResidentialOthers] = useState(false);
  const [residentialOthers, setResidentialOthers] = useState<string[]>([]);
  const residentialOthersOptions = ['Villa', 'Penthouse', 'Studio Apartment'];

  const [showCommercialOthers, setShowCommercialOthers] = useState(false);
  const [commercialOthers, setCommercialOthers] = useState<string[]>([]);
  const commercialOthersOptions = ['Paying Guest', 'Hostel', 'Warehouse/Godown', 'Industrial Land', 'Industrial Building', 'Industrial Shed', 'Office in IT Park/SEZ'];

  const [officeDetails, setOfficeDetails] = useState({
    state: '',
    city: '',
    locality: '',
    address: '',
    name: '',
    agencyName: '',
    website: ''
  });

  const handleOfficeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setOfficeDetails({ ...officeDetails, [e.target.name]: e.target.value });
  };

  const handleTempChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setCompanyDetails({ ...companyDetails, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (service: string, value: string) => {
    setCompanyDetails(prev => ({
      ...prev,
      services: { ...prev.services, [service]: value }
    }));
  };

  const toggleDealingIn = (type: string) => {
    setCompanyDetails(prev => {
      const current = prev.dealingIn;
      if (current.includes(type)) return { ...prev, dealingIn: current.filter(t => t !== type) };
      return { ...prev, dealingIn: [...current, type] };
    });
  };

  const toggleTransactionType = (type: string) => {
    setCompanyDetails(prev => {
      const current = prev.transactionTypes;
      if (current.includes(type)) return { ...prev, transactionTypes: current.filter(t => t !== type) };
      return { ...prev, transactionTypes: [...current, type] };
    });
  };

  const toggleResidentialOther = (option: string) => {
    setResidentialOthers(prev => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]);
  };

  const toggleCommercialOther = (option: string) => {
    setCommercialOthers(prev => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]);
  };

  const handleClientChange = (index: number, field: 'name' | 'dealValue', value: string) => {
    const newClients = [...companyDetails.clients];
    newClients[index][field] = value;
    setCompanyDetails({ ...companyDetails, clients: newClients });
  };

  const addClient = () => {
    setCompanyDetails(prev => ({
      ...prev,
      clients: [...prev.clients, { name: '', dealValue: '' }]
    }));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setProfileData(prev => ({ ...prev, ...tempData }));
      setLoading(false);
    }, 850);
  };

  const handleReset = () => {
    setTempData({ ...profileData });
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-[#F8FAFC] relative pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-30 px-5 py-4 flex items-center justify-between shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95">
            <ArrowLeft size={22} className="text-gray-800" />
          </button>
          <h1 className="font-black text-xl text-gray-900 tracking-tight">My Profile</h1>
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
                  ? 'bg-[#2FED9A] text-black shadow-lg shadow-[#2FED9A]/30'
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
        {activeTab === 'Profile Details' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5">
            <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-black text-gray-900 text-sm border-b-2 border-[#2FED9A] pb-1 inline-block">Personal Details</h3>
                <div className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-gray-200">
                  <span className="text-[10px] font-bold text-gray-600">Status: <span className="text-[#2FED9A]">Verified</span></span>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Full Name</label>
                    <input type="text" name="name" value={tempData.name} onChange={handleTempChange} placeholder="Name" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Registered As</label>
                    <select name="registeredAs" value={tempData.registeredAs} onChange={handleTempChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-3 text-xs text-gray-700 font-medium outline-none appearance-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all">
                      <option value="Builder">Builder</option>
                      <option value="Agent">Agent</option>
                      <option value="Individual Owner">Individual Owner</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">City</label>
                    <input type="text" name="city" value={tempData.city} onChange={handleTempChange} placeholder="City" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Email Address</label>
                    <input type="email" name="email" value={tempData.email} onChange={handleTempChange} placeholder="Email Address" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Mobile Number</label>
                    <input type="text" name="mobile" value={tempData.mobile} onChange={handleTempChange} placeholder="Mobile Number" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Aadhar Number</label>
                    <input type="text" name="aadharNumber" value={tempData.aadharNumber} onChange={handleTempChange} placeholder="Aadhar Number" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <button onClick={handleReset} className="text-[10px] font-bold text-gray-400 flex items-center gap-1 hover:text-gray-600 transition-colors"><SlidersHorizontal size={12} /> Reset Changes</button>
                <button onClick={handleSave} disabled={loading} className="bg-[#2FED9A] text-black font-black py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-[#2FED9A]/30 active:scale-95 transition-all disabled:opacity-50">
                  <Save size={14} strokeWidth={3} /> {loading ? 'Saving...' : 'Update Details'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Company Details' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5">
            <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
              
              <p className="text-[10px] text-gray-500 font-medium mb-6 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                Edit your Company Details here. This will also update your details in our database. This updation increases your chances to appear in the search results for Brokers/Agents.
              </p>

              {/* I am dealing in */}
              <div className="mb-6">
                <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">I am dealing in</label>
                <div className="flex gap-3">
                  <button onClick={() => toggleDealingIn('SALE')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${companyDetails.dealingIn.includes('SALE') ? 'bg-gray-100 border-2 border-gray-800 text-gray-900' : 'bg-gray-50 border-2 border-transparent text-gray-500 hover:bg-gray-100'}`}>
                    <Tag size={14} /> SALE {companyDetails.dealingIn.includes('SALE') && <Check size={12} />}
                  </button>
                  <button onClick={() => toggleDealingIn('RENT')} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${companyDetails.dealingIn.includes('RENT') ? 'bg-gray-100 border-2 border-gray-800 text-gray-900' : 'bg-gray-50 border-2 border-transparent text-gray-500 hover:bg-gray-100'}`}>
                    <Tag size={14} /> RENT {companyDetails.dealingIn.includes('RENT') && <Check size={12} />}
                  </button>
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">Property Type</label>
                <div className="flex gap-2 bg-gray-50 p-1 rounded-xl">
                  <button onClick={() => setCompanyDetails({...companyDetails, propertyType: 'Residential'})} className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg text-xs font-black transition-all ${companyDetails.propertyType === 'Residential' ? 'bg-[#2FED9A] text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Home size={14} /> Residential
                  </button>
                  <button onClick={() => setCompanyDetails({...companyDetails, propertyType: 'Commercial'})} className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg text-xs font-black transition-all ${companyDetails.propertyType === 'Commercial' ? 'bg-[#2FED9A] text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Building2 size={14} /> Commercial
                  </button>
                </div>
              </div>

              {/* Transaction Type */}
              <div className="mb-6">
                <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">Transaction Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button onClick={() => toggleTransactionType('Rent/Lease')} className={`py-3 px-3 rounded-xl text-[10px] font-black transition-all text-center border-2 flex items-center justify-center gap-1.5 ${companyDetails.transactionTypes.includes('Rent/Lease') ? 'bg-gray-50 border-gray-800 text-gray-900' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'}`}>
                    <FileText size={14} /> Rent/Lease
                  </button>
                  <button onClick={() => toggleTransactionType('New Launch')} className={`py-3 px-3 rounded-xl text-[10px] font-black transition-all text-center border-2 flex items-center justify-center gap-1.5 ${companyDetails.transactionTypes.includes('New Launch') ? 'bg-gray-50 border-gray-800 text-gray-900' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'}`}>
                    <Rocket size={14} /> New Launch
                  </button>
                  <div className="relative">
                    <button className="w-full py-3 px-3 rounded-xl text-[10px] font-black transition-all border-2 bg-gray-50 border-transparent text-gray-500 flex items-center justify-between">
                      <div className="flex items-center gap-1.5"><MoreVertical size={14} /> Others</div>
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>
                {companyDetails.transactionTypes.length === 0 && (
                  <p className="text-[9px] text-[#2FED9A] font-bold mt-1.5 ml-1">Please choose at least 1 item(s)</p>
                )}
              </div>

              {/* Type of Properties (Conditional) */}
              {companyDetails.propertyType === 'Residential' ? (
                <div className="mb-6">
                  <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">Type of Residential Properties</label>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setCompanyDetails({...companyDetails, residentialType: 'Residential Plot'})} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${companyDetails.residentialType === 'Residential Plot' ? 'bg-[#2FED9A] text-black shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      Residential Plot
                    </button>
                    <button onClick={() => setCompanyDetails({...companyDetails, residentialType: 'Residential House'})} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${companyDetails.residentialType === 'Residential House' ? 'bg-[#2FED9A] text-black shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      Residential House
                    </button>
                    <button onClick={() => setCompanyDetails({...companyDetails, residentialType: 'Multi-storey Apartments'})} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${companyDetails.residentialType === 'Multi-storey Apartments' ? 'bg-[#2FED9A] text-black shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      Multi-storey Apartments
                    </button>
                    <button onClick={() => setCompanyDetails({...companyDetails, residentialType: 'Builder Floor Apartment'})} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${companyDetails.residentialType === 'Builder Floor Apartment' ? 'bg-[#2FED9A] text-black shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      Builder Floor Apartment
                    </button>
                    <button onClick={() => setShowResidentialOthers(!showResidentialOthers)} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${showResidentialOthers ? 'bg-gray-100 text-gray-800' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      Others {showResidentialOthers ? <ChevronDown size={14} className="rotate-180 transition-transform" /> : <ChevronDown size={14} className="transition-transform" />}
                    </button>
                  </div>
                  
                  {/* Inline Expanded Others for Residential */}
                  <AnimatePresence>
                    {showResidentialOthers && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden col-span-full"
                      >
                        <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-wider">Additional Residential Types</p>
                          <div className="flex flex-wrap gap-2">
                            {residentialOthersOptions.map(opt => (
                              <button 
                                key={opt} 
                                onClick={() => toggleResidentialOther(opt)} 
                                className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all border-2 flex items-center gap-1.5 ${residentialOthers.includes(opt) ? 'bg-[#2FED9A]/10 border-[#2FED9A] text-[#2FED9A]' : 'bg-white border-transparent text-gray-500 hover:border-gray-200 shadow-sm'}`}
                              >
                                {residentialOthers.includes(opt) && <Check size={12} />} {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="mb-6">
                  <label className="text-[10px] font-bold text-gray-400 mb-2 block uppercase tracking-wider">Type of Commercial Properties</label>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setCompanyDetails({...companyDetails, commercialType: 'Commercial Land'})} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${companyDetails.commercialType === 'Commercial Land' ? 'bg-[#2FED9A] text-black shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      Commercial Land
                    </button>
                    <button onClick={() => setCompanyDetails({...companyDetails, commercialType: 'Commercial Office Space'})} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${companyDetails.commercialType === 'Commercial Office Space' ? 'bg-[#2FED9A] text-black shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      Commercial Office Space
                    </button>
                    <button onClick={() => setCompanyDetails({...companyDetails, commercialType: 'Commercial Shop'})} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${companyDetails.commercialType === 'Commercial Shop' ? 'bg-[#2FED9A] text-black shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      Commercial Shop
                    </button>
                    <button onClick={() => setCompanyDetails({...companyDetails, commercialType: 'Commercial Showroom'})} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${companyDetails.commercialType === 'Commercial Showroom' ? 'bg-[#2FED9A] text-black shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      Commercial Showroom
                    </button>
                    
                    <button onClick={() => setShowCommercialOthers(!showCommercialOthers)} className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${showCommercialOthers ? 'bg-gray-100 text-gray-800' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                      Others {showCommercialOthers ? <ChevronDown size={14} className="rotate-180 transition-transform" /> : <ChevronDown size={14} className="transition-transform" />}
                    </button>
                  </div>
                  
                  {/* Inline Expanded Others for Commercial */}
                  <AnimatePresence>
                    {showCommercialOthers && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden col-span-full"
                      >
                        <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-wider">Additional Commercial Types</p>
                          <div className="flex flex-wrap gap-2">
                            {commercialOthersOptions.map(opt => (
                              <button 
                                key={opt} 
                                onClick={() => toggleCommercialOther(opt)} 
                                className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all border-2 flex items-center gap-1.5 ${commercialOthers.includes(opt) ? 'bg-[#2FED9A]/10 border-[#2FED9A] text-[#2FED9A]' : 'bg-white border-transparent text-gray-500 hover:border-gray-200 shadow-sm'}`}
                              >
                                {commercialOthers.includes(opt) && <Check size={12} />} {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Operating Since & Expertise */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Operating Since</label>
                  <select name="operatingSince" value={companyDetails.operatingSince} onChange={handleCompanyChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none appearance-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all">
                    <option value="">Select Year</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Expertise In</label>
                  <select name="expertiseIn" value={companyDetails.expertiseIn} onChange={handleCompanyChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none appearance-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all">
                    <option value="">Select one</option>
                    <option value="Sales">Sales</option>
                    <option value="Rentals">Rentals</option>
                  </select>
                </div>
              </div>

              {/* Text Areas */}
              <div className="space-y-5 mb-8">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Brief Description of Your Business <span className="text-[#2FED9A] lowercase">(Max 3000 Chr.)</span></label>
                  <textarea name="businessDescription" value={companyDetails.businessDescription} onChange={handleCompanyChange} rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all resize-none"></textarea>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Authorized Agents / Dealers of <span className="text-[#2FED9A] lowercase">(Max 3000 Chr.)</span></label>
                  <textarea name="authorizedAgents" value={companyDetails.authorizedAgents} onChange={handleCompanyChange} rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all resize-none"></textarea>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Authorized Dealers For Projects.</label>
                  <textarea name="authorizedDealers" value={companyDetails.authorizedDealers} onChange={handleCompanyChange} rows={3} className={`w-full bg-gray-50 border ${!companyDetails.authorizedDealers ? 'border-red-300 focus:ring-red-200' : 'border-gray-100 focus:ring-[#2FED9A]/20'} rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:bg-white transition-all resize-none`}></textarea>
                  {!companyDetails.authorizedDealers && (
                    <p className="text-[9px] text-[#2FED9A] font-bold mt-1.5 ml-1">This is a required field</p>
                  )}
                </div>
              </div>

              {/* Value Added Services */}
              <div className="mb-8 pt-6 border-t border-gray-100">
                <h4 className="font-black text-gray-900 text-sm mb-5">Value Added Services</h4>
                <div className="space-y-3">
                  {Object.entries({
                    propertyRegistry: 'Property Registery',
                    loanFacility: 'Can Provide Loan Facility',
                    nar: 'Registered With NAR',
                    rera: 'Registered With RERA',
                    credai: 'Registered With CREDAI'
                  }).map(([key, label]) => (
                    <div key={key} className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                      <span className="text-xs font-bold text-gray-700">{label}</span>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name={key} checked={companyDetails.services[key as keyof typeof companyDetails.services] === 'No'} onChange={() => handleServiceChange(key, 'No')} className="accent-[#2FED9A] w-3.5 h-3.5" />
                          <span className="text-xs font-bold text-gray-500">No</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input type="radio" name={key} checked={companyDetails.services[key as keyof typeof companyDetails.services] === 'Yes'} onChange={() => handleServiceChange(key, 'Yes')} className="accent-[#2FED9A] w-3.5 h-3.5" />
                          <span className="text-xs font-bold text-gray-500">Yes</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Valuable Clients */}
              <div className="mb-8 pt-6 border-t border-gray-100">
                <h4 className="font-black text-gray-900 text-sm mb-5">Valuable Clients</h4>
                <div className="space-y-3 mb-3">
                  {companyDetails.clients.map((client, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-3 items-center">
                      <div>
                        {idx === 0 && <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Name</label>}
                        <input type="text" value={client.name} onChange={(e) => handleClientChange(idx, 'name', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                      </div>
                      <div>
                        {idx === 0 && <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Deal Values</label>}
                        <input type="text" value={client.dealValue} onChange={(e) => handleClientChange(idx, 'dealValue', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button onClick={addClient} className="text-xs font-black text-[#2FED9A] hover:underline flex items-center gap-1">
                    <Plus size={12} strokeWidth={3} /> Add More
                  </button>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button onClick={handleSave} disabled={loading} className="bg-[#2FED9A] text-black font-black py-3 px-8 rounded-xl shadow-lg shadow-[#2FED9A]/30 active:scale-95 transition-all disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save and Exit'}
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {activeTab === 'Office Details' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5">
            <div className="bg-[#FFF4F2]/50 border border-[#2FED9A]/10 p-4 rounded-2xl mb-6 shadow-sm">
              <p className="text-[10px] md:text-xs font-semibold text-gray-600 leading-relaxed">
                Edit your Office Details here. This will also update your details in our database. This updation increases your chances to appear in the search results for Brokers/Agents.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-black text-gray-900 text-sm border-b-2 border-[#2FED9A] pb-1 inline-block">Office Address</h3>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">State</label>
                    <div className="relative">
                      <select name="state" value={officeDetails.state} onChange={handleOfficeChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all appearance-none cursor-pointer">
                        <option value="">Select State</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="DL">Delhi</option>
                        <option value="HR">Haryana</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">City</label>
                    <div className="relative">
                      <select name="city" value={officeDetails.city} onChange={handleOfficeChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all appearance-none cursor-pointer">
                        <option value="">Select City</option>
                        <option value="Noida">Noida</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Delhi">Delhi</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Locality</label>
                  <input type="text" name="locality" value={officeDetails.locality} onChange={handleOfficeChange} placeholder="Enter Locality" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Address</label>
                  <textarea name="address" value={officeDetails.address} onChange={handleOfficeChange} placeholder="Office Address" rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all resize-none" />
                </div>

                <div className="pt-4">
                  <label className="text-[10px] font-bold text-gray-400 mb-2 ml-1 block uppercase tracking-wider">Map Location</label>
                  <div className="w-full h-[250px] bg-gray-100 rounded-xl border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#2FED9A]/5 bg-cover bg-center group-hover:bg-[#2FED9A]/10 transition-all duration-500">
                    </div>
                    <div className="relative z-10 flex flex-col items-center justify-center bg-white/90 p-4 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] backdrop-blur-sm border border-white/50">
                      <MapPin size={24} className="text-[#2FED9A] mb-2" />
                      <p className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Map Preview</p>
                      <p className="text-[9px] font-medium text-gray-400 mt-1">Ready for Integration</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Name</label>
                  <input type="text" name="name" value={officeDetails.name} onChange={handleOfficeChange} placeholder="Enter Contact Person Name" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Agency/Company Name</label>
                  <input type="text" name="agencyName" value={officeDetails.agencyName} onChange={handleOfficeChange} placeholder="Enter Agency/Company Name" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Company Website</label>
                  <input type="text" name="website" value={officeDetails.website} onChange={handleOfficeChange} placeholder="Enter Agency/Company Website" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button onClick={handleSave} disabled={loading} className="bg-[#2FED9A] text-black font-black py-3 px-12 rounded-xl shadow-lg shadow-[#2FED9A]/30 active:scale-95 transition-all disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <label className="text-[10px] font-bold text-gray-400 mb-4 ml-1 block uppercase tracking-wider">Office Photos (Upload upto 10)</label>
                
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center gap-4 overflow-x-auto relative min-h-[160px]">
                  <button className="flex-shrink-0 w-36 h-28 bg-white border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center hover:border-[#2FED9A] hover:bg-[#2FED9A]/5 transition-all group">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#2FED9A]/10 transition-colors">
                      <Plus size={16} className="text-gray-400 group-hover:text-[#2FED9A] transition-colors" />
                    </div>
                  </button>
                  
                  {/* Gallery Controls (Simulated arrows) */}
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-gray-600 border border-gray-100 transition-colors hidden sm:block">
                    <ChevronDown size={14} className="rotate-90" />
                  </button>
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-gray-600 border border-gray-100 transition-colors hidden sm:block">
                    <ChevronDown size={14} className="-rotate-90" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {activeTab === 'Login Details' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5">
            <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-black text-gray-900 text-sm border-b-2 border-[#2FED9A] pb-1 inline-block">Login Details</h3>
              </div>
              
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Email ID</label>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-500 font-medium">
                    {tempData.email}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Name <span className="text-[#2FED9A]">*</span></label>
                  <input type="text" name="name" value={tempData.name} onChange={handleTempChange} placeholder="Name" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Alternate Email ID</label>
                  <input type="text" name="alternateEmail" value={tempData.alternateEmail} onChange={handleTempChange} placeholder="Alternate Email Id" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Aadhar Number <span className="text-[#2FED9A]">*</span></label>
                  <input type="text" name="aadharNumber" value={tempData.aadharNumber} onChange={handleTempChange} placeholder="N/A" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-gray-400 mb-1 ml-1 block uppercase tracking-wider">Mobile <span className="text-[#2FED9A]">*</span></label>
                  <div className="flex gap-2">
                    <div className="relative w-32">
                      <select name="countryCode" value={tempData.countryCode} onChange={handleTempChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all appearance-none cursor-pointer">
                        <option value="IND +91">IND +91</option>
                        <option value="US +1">US +1</option>
                        <option value="UK +44">UK +44</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <input type="text" name="mobile" value={tempData.mobile} onChange={handleTempChange} placeholder="0987654321" className="flex-1 w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#2FED9A]/20 focus:bg-white transition-all" />
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-8 pt-4">
                  <button onClick={handleSave} disabled={loading} className="bg-[#2FED9A] text-black font-black py-3 px-6 rounded-xl shadow-lg shadow-[#2FED9A]/30 active:scale-95 transition-all disabled:opacity-50">
                    {loading ? 'Saving...' : 'Save and Exit'}
                  </button>
                  <button onClick={handleSave} disabled={loading} className="bg-[#2FED9A] text-black font-black py-3 px-6 rounded-xl shadow-lg shadow-[#2FED9A]/30 active:scale-95 transition-all disabled:opacity-50">
                    {loading ? 'Saving...' : 'Save and Continue'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Security' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5">
            <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-black text-gray-900 text-sm border-b-2 border-[#2FED9A] pb-1 inline-block">Security Settings</h3>
                <div className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-gray-200">
                  <span className="text-[10px] font-bold text-gray-600">Session: <span className="text-[#00AEEF]">Active</span></span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Login Username</p>
                    <p className="text-xs font-bold text-gray-900">{profileData.email}</p>
                  </div>
                  <Lock size={16} className="text-gray-400" />
                </div>
                
                <button 
                  onClick={() => navigate('/change-password')}
                  className="w-full bg-[#2FED9A]/5 hover:bg-[#2FED9A]/10 border border-[#2FED9A]/20 rounded-xl p-4 flex justify-between items-center transition-all group active:scale-95"
                >
                  <span className="text-xs font-black text-[#2FED9A]">Change Account Password</span>
                  <ChevronRight size={16} className="text-[#2FED9A] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
