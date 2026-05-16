import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, Trash2, UserPlus, FileText, Phone, Mail, Building2, Calendar, ShieldCheck, Upload, CreditCard, Users, Briefcase, Calculator } from 'lucide-react';
import { Button } from '../components/UI';

const TABS = ['Clients', 'Register', 'KYC', 'Add KYC'];

const MOCK_CLIENTS = [
  { id: 1, name: 'Tejasvi Kapoor', phone: '+91 9899095939', email: 'tejasvikapoor@gmail.com', type: 'Residential' },
  { id: 2, name: 'Vidit G Gupta', phone: '+91 9899007767', email: 'vidit.gupta@huntproperty.com', type: 'Residential' },
  { id: 3, name: 'SK', phone: '+91 9800776688', email: 'lookingproperty@gmail.com', type: 'Residential' },
  { id: 4, name: 'Rahul Verma', phone: '+91 9876543210', email: 'rahul@gmail.com', type: 'Residential' },
  { id: 5, name: 'Hello', phone: '+91 1234567890', email: 'he@gmail.com', type: 'Commercial' },
];

const MOCK_KYC = [
  { id: 1, builder: 'Ajnara', project: 'Sel Ajnara', client: 'Naveen Katiyar', month: 'April' }
];

const PROPERTY_SUB_TYPES = {
  'Residential': ['Studio Apartment', 'Flat', 'Penthouse', 'Duplex', 'Plot', 'Villa', 'Kothi'],
  'Commercial': ['Office Space', 'IT Space', 'Business Park Space', 'Commercial Shop', 'Showroom', 'Showroom in Mall', 'Banquet Hall', 'Movie Hall', 'Restaurants', 'Godown/ Storage', 'Food Court'],
  'Industrial': ['Industry - Ready to Move', 'Industrial Plot'],
  'Agriculture': ['Agricultural Land', 'Farm Land', 'Farm House'],
  'Institutional': ['Hotel -Ready To Move', 'Hotel Plot', 'School Plot', 'School - Ready to Move', 'College Plot', 'College - Ready to Move', 'Hospital Plot', 'Hospital Ready to move']
};

type ProjectTypeKey = keyof typeof PROPERTY_SUB_TYPES;

export const BookingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Clients');
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectTypeKey>('Residential');

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-[#F8FAFC] relative pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-30 px-5 py-4 flex items-center justify-between shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95">
            <ArrowLeft size={22} className="text-gray-800" />
          </button>
          <h1 className="font-black text-xl text-gray-900 tracking-tight">Bookings</h1>
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

      <div className="p-5">
        {activeTab === 'Clients' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-black text-gray-900 text-sm">View Clients</h3>
              <span className="text-[10px] font-bold text-gray-400">Total: {MOCK_CLIENTS.length}</span>
            </div>

            {MOCK_CLIENTS.map((client, idx) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 pr-2">
                    <h4 className="font-bold text-gray-900 text-base mb-1">{client.name}</h4>
                    <div className={`inline-block px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${client.type === 'Residential' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-[#00AEEF]'}`}>
                      {client.type}
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                     <button className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600 active:scale-95 transition-transform">
                       <Eye size={14} />
                     </button>
                     <button className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-[#E11D48] active:scale-95 transition-transform">
                       <Trash2 size={14} />
                     </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-3 space-y-2 border border-gray-100/50">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-700">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-700 truncate">{client.email}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'Register' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-6 pb-24">
             {/* Basic Details */}
             <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
                  <UserPlus size={18} className="text-[#E11D48]" />
                  <h3 className="font-black text-gray-900 text-sm">Basic Details</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-1 block">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Client Name..." className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-900 font-medium outline-none focus:border-[#E11D48] transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-1 block">Contact No. <span className="text-red-500">*</span></label>
                      <input type="tel" placeholder="Mobile..." className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-900 font-medium outline-none focus:border-[#E11D48] transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-1 block">Email <span className="text-red-500">*</span></label>
                      <input type="email" placeholder="Email..." className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-900 font-medium outline-none focus:border-[#E11D48] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-1 block">Address <span className="text-red-500">*</span></label>
                    <textarea placeholder="Client Address..." rows={2} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-900 font-medium outline-none focus:border-[#E11D48] transition-colors resize-none"></textarea>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-1 block">How you got to know about us? <span className="text-red-500">*</span></label>
                    <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-900 font-medium outline-none focus:border-[#E11D48] transition-colors appearance-none">
                       <option value="">Select Source</option>
                       <option value="sms">SMS</option>
                       <option value="newspaper">Newspaper</option>
                       <option value="friend">Friend</option>
                       <option value="facebook">Facebook</option>
                       <option value="instagram">Instagram</option>
                       <option value="google">Google</option>
                       <option value="walkin">Walk In</option>
                    </select>
                  </div>
                </div>
             </div>

             {/* Property Preferences */}
             <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
                  <Building2 size={18} className="text-[#00AEEF]" />
                  <h3 className="font-black text-gray-900 text-sm">Project Looking For</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Project Type <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                       {Object.keys(PROPERTY_SUB_TYPES).map(type => (
                         <button 
                           key={type} 
                           onClick={() => setSelectedProjectType(type as ProjectTypeKey)}
                           className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${selectedProjectType === type ? 'bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/20' : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'}`}
                         >
                           {type}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Property Sub-type</label>
                    <div className="flex flex-wrap gap-2">
                       {PROPERTY_SUB_TYPES[selectedProjectType].map(type => (
                         <button key={type} className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 transition-all">
                           {type}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Purpose <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                       {['Investment', 'Self Use', 'Both'].map(purpose => (
                         <button key={purpose} className="flex-1 py-2 rounded-lg text-[10px] font-bold bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 transition-all">
                           {purpose}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-1 block">Size <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <select className="w-1/3 bg-gray-50 border border-gray-100 rounded-xl px-3 py-3 text-xs text-gray-900 font-medium outline-none appearance-none">
                         <option>Sq-ft</option>
                         <option>Sq-m</option>
                         <option>Sq-yd</option>
                      </select>
                      <input type="text" placeholder="Property size..." className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-900 font-medium outline-none focus:border-[#00AEEF] transition-colors" />
                    </div>
                  </div>
                </div>
             </div>

             {/* Investment & Timeline */}
             <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3">
                  <Calendar size={18} className="text-[#2FED9A]" />
                  <h3 className="font-black text-gray-900 text-sm">Investment & Timeline</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Possession Expectation <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                       {['Ready to move', 'In 3 months', 'In 6 months', 'In 9 Months', '12-15 months'].map(time => (
                         <button key={time} className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 transition-all">
                           {time}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Investment Budget <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                       {['< 30 Lacs', '31 - 40 Lacs', '41 - 50 Lacs', '50 - 75 Lacs', '75L - 1 Cr', '> 1 Cr'].map(budget => (
                         <button key={budget} className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 transition-all">
                           {budget}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Looking For Bank Loan? <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                       <button className="flex-1 py-2 rounded-lg text-[10px] font-bold bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 transition-all">Yes</button>
                       <button className="flex-1 py-2 rounded-lg text-[10px] font-bold bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/20 transition-all">No</button>
                    </div>
                  </div>
                </div>
             </div>

             {/* Final Details */}
             <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Location <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                       {['Noida', 'Gurugram', 'Greater Noida West', 'Faridabad', 'Ghaziabad', 'YEW', 'Manesar'].map(loc => (
                         <button key={loc} className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 transition-all flex items-center gap-1.5">
                           <div className="w-2.5 h-2.5 rounded-sm border border-gray-300"></div> {loc}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Deal Closing Timeline <span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                       {['2 to 3 Days', '1 Week', '2 Weeks', '1 Month'].map(time => (
                         <button key={time} className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100 transition-all">
                           {time}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1 mb-1 block">Remark <span className="text-red-500">*</span></label>
                    <textarea placeholder="Add your remarks here..." rows={3} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs text-gray-900 font-medium outline-none focus:border-[#E11D48] transition-colors resize-none"></textarea>
                  </div>
                </div>
             </div>

             {/* Sticky Submit Bar */}
             <div className="fixed bottom-[70px] left-0 right-0 p-5 bg-white/80 backdrop-blur-md border-t border-gray-100 z-30 max-w-[500px] mx-auto">
               <button className="w-full bg-[#E11D48] text-white font-black py-4 rounded-xl shadow-xl shadow-[#E11D48]/30 active:scale-95 transition-all text-sm">
                 Submit & OTP Verification
               </button>
             </div>
          </motion.div>
        )}

        {activeTab === 'KYC' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-black text-gray-900 text-sm">View KYC Records</h3>
              <span className="text-[10px] font-bold text-gray-400">Total: {MOCK_KYC.length}</span>
            </div>

            {MOCK_KYC.map((kyc, idx) => (
              <motion.div
                key={kyc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#00AEEF]">
                      <ShieldCheck size={14} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm leading-tight">{kyc.client}</h4>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider">Client Name</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                     <button className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600 active:scale-95 transition-transform">
                       <Eye size={14} />
                     </button>
                     <button className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-[#E11D48] active:scale-95 transition-transform">
                       <Trash2 size={14} />
                     </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100/50">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Building2 size={10} className="text-gray-400" />
                      <span className="text-[8px] font-black text-gray-500 uppercase tracking-wider">Builder</span>
                    </div>
                    <p className="text-xs font-bold text-gray-900 truncate">{kyc.builder}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100/50">
                    <div className="flex items-center gap-1.5 mb-1">
                      <FileText size={10} className="text-gray-400" />
                      <span className="text-[8px] font-black text-gray-500 uppercase tracking-wider">Project</span>
                    </div>
                    <p className="text-xs font-bold text-gray-900 truncate">{kyc.project}</p>
                  </div>
                  <div className="col-span-2 bg-blue-50/50 rounded-xl p-3 border border-blue-100/50 flex justify-between items-center">
                     <div className="flex items-center gap-1.5">
                       <Calendar size={12} className="text-[#00AEEF]" />
                       <span className="text-[10px] font-black text-gray-600 uppercase tracking-wider">Booking Month</span>
                     </div>
                     <span className="text-xs font-black text-[#00AEEF]">{kyc.month}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'Add KYC' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-6 pb-24 px-1 mt-2">
             
             {/* 1. Booking Details */}
             <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
                  <Calendar size={18} className="text-[#2FED9A]" />
                  <h3 className="font-black text-gray-900 text-sm">Booking Details</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Month of Booking <span className="text-red-500">*</span></label>
                      <input type="month" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium outline-none focus:border-[#2FED9A] transition-colors" />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Date of Booking <span className="text-red-500">*</span></label>
                      <input type="date" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium outline-none focus:border-[#2FED9A] transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">HP Branch Location <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Branch location..." className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium outline-none focus:border-[#2FED9A] transition-colors" />
                  </div>
                  
                  <div className="pt-2 border-t border-gray-50">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-2 block">Applicant Info</label>
                    <div className="space-y-3">
                      <input type="text" placeholder="First Applicant Name *" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium outline-none focus:border-[#2FED9A]" />
                      <textarea placeholder="Address *" rows={2} className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium outline-none focus:border-[#2FED9A] resize-none"></textarea>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="tel" placeholder="Mobile No. *" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium outline-none focus:border-[#2FED9A]" />
                        <input type="email" placeholder="Email ID *" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium outline-none focus:border-[#2FED9A]" />
                      </div>
                      <input type="text" placeholder="PAN *" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium outline-none focus:border-[#2FED9A] uppercase" />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-50 grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Team Name</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium" />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Team Leader</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-[10px] font-bold text-gray-600">Add Second Applicant?</span>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="second_app" className="accent-[#2FED9A]" />
                        <span className="text-[10px] font-bold text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="radio" name="second_app" defaultChecked className="accent-[#2FED9A]" />
                        <span className="text-[10px] font-bold text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>
             </div>

             {/* 2. Unit Selection */}
             <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
                  <Building2 size={18} className="text-[#2FED9A]" />
                  <h3 className="font-black text-gray-900 text-sm">Unit Specification</h3>
                </div>
                
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Plan (Flexi/CLP/DP) <span className="text-red-500">*</span></label>
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium">
                        <option>Flexi</option>
                        <option>CLP</option>
                        <option>DP</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Tower</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium" />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Floor No.</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium" />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Unit No.</label>
                      <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Area <span className="text-red-500">*</span></label>
                      <div className="flex gap-1">
                        <input type="text" className="flex-1 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium" />
                        <select className="w-16 bg-gray-50 border border-gray-100 rounded-lg text-[9px] font-bold">
                          <option>SQFT</option>
                          <option>SQMT</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Loan / Self Funding <span className="text-red-500">*</span></label>
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium">
                        <option>Loan</option>
                        <option>Self Funding</option>
                      </select>
                    </div>
                  </div>
                </div>
             </div>

             {/* 3. Costing Details - BSP */}
             <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
                  <Calculator size={18} className="text-[#2FED9A]" />
                  <h3 className="font-black text-gray-900 text-sm">Costing Details (BSP)</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                    {[
                      { label: '1. BSP (as per Rate List)', id: 'bsp_rate' },
                      { label: '2. Less: Inaugural discount', id: 'disc_inaugural' },
                      { label: '3. Less: On Form Discount', id: 'disc_form' },
                    ].map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                        <span className="col-span-7 text-[10px] font-bold text-gray-600">{item.label}</span>
                        <input type="text" placeholder="Per SQFT" className="col-span-2 bg-white border border-gray-200 rounded-lg px-1.5 py-1 text-[8px] font-bold text-right" />
                        <input type="text" placeholder="Total" className="col-span-3 bg-white border border-gray-200 rounded-lg px-1.5 py-1 text-[8px] font-bold text-right" />
                      </div>
                    ))}
                    
                    <div className="pt-2 border-t border-gray-200 grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-9 text-[10px] font-black text-gray-900">4. BSP on Form (1-2-3)</span>
                      <span className="col-span-3 text-[10px] font-black text-[#2FED9A] text-right">₹ 0.00</span>
                    </div>

                    <div className="grid grid-cols-12 gap-2 items-center">
                      <span className="col-span-9 text-[10px] font-bold text-gray-600">5. Less: GST REBATE / C.NOTE</span>
                      <input type="text" placeholder="Total" className="col-span-3 bg-white border border-gray-200 rounded-lg px-1.5 py-1 text-[8px] font-bold text-right" />
                    </div>

                    <div className="pt-2 border-t border-gray-200 bg-[#2FED9A]/10 -mx-4 -mb-4 p-4 rounded-b-2xl flex justify-between items-center">
                      <span className="text-[11px] font-black text-gray-900">6. Effective BSP to Customer</span>
                      <span className="text-[11px] font-black text-gray-900">₹ 0.00</span>
                    </div>
                  </div>
                </div>
             </div>

             {/* 4. PLC Details */}
             <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
                  <Building2 size={18} className="text-[#2FED9A]" />
                  <h3 className="font-black text-gray-900 text-sm">PLC Details</h3>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                   {[
                     { label: '7. Floor PLC', id: 'plc_floor' },
                     { label: '8. Facing PLC (Park/Corner)', id: 'plc_facing' },
                     { label: '9. Other PLC', id: 'plc_other' },
                   ].map((item) => (
                     <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                        <span className="col-span-6 text-[10px] font-bold text-gray-600">{item.label}</span>
                        <input type="text" placeholder="Amt" className="col-span-2 bg-white border border-gray-200 rounded-lg px-1 py-1 text-[8px] font-bold text-right" />
                        <input type="text" placeholder="Disc" className="col-span-2 bg-white border border-gray-200 rounded-lg px-1 py-1 text-[8px] font-bold text-right" />
                        <input type="text" placeholder="Net" className="col-span-2 bg-white border border-gray-200 rounded-lg px-1 py-1 text-[8px] font-bold text-right" />
                     </div>
                   ))}
                   <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-900">10. Total PLC</span>
                      <span className="text-[10px] font-black text-gray-900">₹ 0.00</span>
                   </div>
                </div>
             </div>

             {/* 5. Other Charges */}
             <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
                  <CreditCard size={18} className="text-[#2FED9A]" />
                  <h3 className="font-black text-gray-900 text-sm">Other Charges</h3>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                   {[
                     'OPEN CAR PARKING', 'STILT CAR PARKING', 'COVERED CAR PARKING', 
                     'CLUB MEMBERSHIP', 'POWER BACKUP', 'IFMS', 'LEASE RENT', 
                     'FFC', 'EEC', 'IDC', 'OTHER', 'TERRACE / GARDEN', 'METER'
                   ].map((charge, idx) => (
                     <div key={charge} className="grid grid-cols-12 gap-2 items-center pb-2 border-b border-gray-100 last:border-0">
                        <span className="col-span-6 text-[9px] font-bold text-gray-500">{11 + idx}. {charge}</span>
                        <input type="text" placeholder="Amt" className="col-span-3 bg-white border border-gray-200 rounded-lg px-1 py-1 text-[8px] font-bold text-right" />
                        <input type="text" placeholder="Net" className="col-span-3 bg-white border border-gray-200 rounded-lg px-1 py-1 text-[8px] font-bold text-right" />
                     </div>
                   ))}
                </div>
                <div className="mt-4 p-4 bg-gray-900 rounded-2xl space-y-2">
                   <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400">25. Net Cost on Form (4+10+24)</span>
                      <span className="text-[10px] font-black text-white">₹ 0.00</span>
                   </div>
                   <div className="flex justify-between items-center pt-2 border-t border-white/10">
                      <span className="text-[11px] font-black text-[#2FED9A]">26. Net Cost to Customer (6+10+24)</span>
                      <span className="text-[11px] font-black text-[#2FED9A]">₹ 0.00</span>
                   </div>
                </div>
             </div>

             {/* 6. Payment Details */}
             <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
                  <Calculator size={18} className="text-[#2FED9A]" />
                  <h3 className="font-black text-gray-900 text-sm">Payment Details</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">19(a). Payment Type <span className="text-red-500">*</span></label>
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium">
                        <option>Cheque</option>
                        <option>Online/RTGS</option>
                        <option>Cash</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">19(b). Payment Amount <span className="text-red-500">*</span></label>
                      <input type="number" placeholder="₹" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">19(c). Payment No. <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Cheque/Ref ID" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium" />
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">19(d). Payment Date <span className="text-red-500">*</span></label>
                      <input type="date" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">19(e). Bank Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Drawn on bank..." className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium" />
                  </div>
                </div>
             </div>

             {/* 7. Revenue */}
             <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-4">
                  <Users size={18} className="text-[#2FED9A]" />
                  <h3 className="font-black text-gray-900 text-sm">Revenue Breakdown</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">Revenue Type *</label>
                    <select className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium">
                      <option>Select</option>
                      <option>Direct</option>
                      <option>Channel Partner</option>
                    </select>
                  </div>
                  {[
                    { label: 'Total Revenue (₹)', id: 'rev_total' },
                    { label: 'Broker Revenue (₹)', id: 'rev_broker' },
                    { label: 'Client Discount (₹)', id: 'rev_disc' },
                    { label: 'Team Revenue (₹)', id: 'rev_team' },
                  ].map(field => (
                    <div key={field.id}>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider ml-1 mb-1 block">{field.label}</label>
                      <input type="number" placeholder="0" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5 text-xs text-gray-900 font-medium" />
                    </div>
                  ))}
                </div>
             </div>

             {/* 8. Declaration */}
             <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                   <ShieldCheck size={18} className="text-[#2FED9A]" />
                   <h3 className="font-black text-gray-900 text-sm">Declaration</h3>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed font-medium mb-4 italic">
                  I, <input type="text" placeholder="Agent Name" className="inline-block border-b border-gray-300 outline-none text-gray-900 font-black px-1 w-20" />, confirm that all the details mentioned in this document are TRUE and Correct to the best of my knowledge. In case of any discrepancy/Error, I hold myself responsible and accountable and accept all action taken by the management.
                </p>
                <div className="grid grid-cols-2 gap-4">
                   <div className="border-b border-gray-200 pb-1">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Employee Signature</p>
                   </div>
                   <div className="border-b border-gray-200 pb-1">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                   </div>
                </div>
             </div>

             {/* 9. For Official Use Only */}
             <div className="bg-gray-50 p-4 rounded-3xl border border-dashed border-gray-200">
                <div className="flex items-center gap-2 border-b border-gray-200/50 pb-3 mb-4">
                  <ShieldCheck size={18} className="text-gray-400" />
                  <h3 className="font-black text-gray-900 text-sm">For Official Use Only</h3>
                </div>
                
                <div className="space-y-4">
                   <div className="bg-white p-3 rounded-2xl border border-gray-100">
                      <h4 className="text-[10px] font-black text-gray-900 mb-2 border-b border-gray-50 pb-1">KYC TEAM</h4>
                      <div className="space-y-2">
                         {['Date of Receiving', 'Date & Time of Checking', 'Date of Handover', 'Name'].map(label => (
                           <div key={label} className="flex justify-between items-center text-[9px]">
                              <span className="font-bold text-gray-500">{label}</span>
                              <span className="font-black text-gray-400">---</span>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="flex-1 py-2 rounded-xl border border-green-200 bg-green-50 text-green-600 font-black text-[9px] uppercase tracking-widest">KYC OK</button>
                      <button className="flex-1 py-2 rounded-xl border border-red-200 bg-red-50 text-red-600 font-black text-[9px] uppercase tracking-widest">KYC NOT OK</button>
                   </div>
                </div>
             </div>

             {/* Sticky Submit Bar */}
             <div className="fixed bottom-[70px] left-0 right-0 p-5 bg-white/80 backdrop-blur-md z-30 max-w-[500px] mx-auto">
               <button className="w-full bg-[#2FED9A] text-gray-900 font-black py-4 rounded-full shadow-[0_8px_20px_-6px_rgba(47,237,154,0.6)] active:scale-95 transition-all text-sm tracking-widest flex items-center justify-center gap-2">
                 SUBMIT KYC APPLICATION
               </button>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
