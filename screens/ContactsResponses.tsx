import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Mail, Home, MapPin, MessageCircle, Search, Calendar, Download } from 'lucide-react';
import { Button } from '../components/UI';

const MOCK_LEADS = [
  { id: 1, name: 'Sonu Singh', mobile: '9771013204', email: 'sonukrsingh204@gmail.com', property: 'Villa in Noida', location: 'Greater Noida West', type: 'View Responses', date: 'Just now' },
  { id: 2, name: 'HuntTest', mobile: '9718039015', email: 'HuntTest@yopmail.com', property: 'Villa in Noida', location: 'Greater Noida West', type: 'View Responses', date: '2h ago' },
  { id: 3, name: 'Harvin', mobile: '7827079311', email: 'harvinkour.dutta@gmail.com', property: 'Villa in Noida', location: 'Greater Noida West', type: 'View Responses', date: 'Yesterday' },
  { id: 4, name: 'Shashi Boodha', mobile: '9899746044', email: 'shashi@codeflowtech.com', property: 'Villa in Noida', location: 'Greater Noida West', type: 'Leads Management', date: 'Yesterday' },
  { id: 5, name: 'Agent', mobile: '7415212847', email: 'agent@huntproperty.com', property: 'Villa in Noida', location: 'Greater Noida West', type: 'Viewed Leads', date: '3 days ago' },
  { id: 6, name: 'Naveen', mobile: '9910861434', email: 'naveenkatiyar@gmail.com', property: 'Villa in Noida', location: 'Greater Noida West', type: 'View Responses', date: '1 week ago' },
];

const TABS = ['View Responses', 'Conversation', 'Leads Management', 'Viewed Leads'];

export const ContactsResponsesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('View Responses');

  const filteredLeads = MOCK_LEADS.filter(l => 
    activeTab === 'Conversation' ? l.type === 'View Responses' : l.type === activeTab || activeTab === 'View Responses'
  );

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-[#F8FAFC] relative pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-20 px-5 py-4 flex items-center justify-between shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95">
            <ArrowLeft size={22} className="text-gray-800" />
          </button>
          <h1 className="font-black text-xl text-gray-900 tracking-tight">Contact/Responses</h1>
        </div>
        <button className="p-2 hover:bg-gray-50 rounded-full active:scale-95 transition-colors">
           <Search size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Scrollable Tabs */}
      <div className="bg-white px-5 pb-3 pt-3 sticky top-[68px] z-10 overflow-x-auto no-scrollbar shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
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
         {activeTab === 'View Responses' && (
            <div className="p-5 space-y-4">
               {filteredLeads.map((lead, idx) => (
                  <motion.div 
                     key={lead.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.05, duration: 0.3 }}
                     className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                     <div className="flex justify-between items-start mb-5">
                        <div className="flex items-center gap-3.5">
                           <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-[#E11D48] font-black text-xl shadow-inner border border-rose-100/50">
                             {lead.name.charAt(0).toUpperCase()}
                           </div>
                           <div>
                             <h3 className="font-black text-gray-900 text-base capitalize leading-tight">{lead.name}</h3>
                             <p className="text-xs text-gray-500 mt-1 font-medium flex items-center gap-1">
                               <Calendar size={10} className="text-gray-400" /> {lead.date}
                             </p>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 active:scale-95 transition-all">
                              <Phone size={16} />
                           </button>
                           <button className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 active:scale-95 transition-all">
                              <Mail size={16} />
                           </button>
                        </div>
                     </div>

                     <div className="bg-gray-50 p-4 rounded-2xl mb-5 border border-gray-100/50">
                        <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-2">
                              <Home size={16} className="text-gray-400" />
                              <span className="text-sm font-bold text-gray-800">{lead.property}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-2 pl-6">
                           <MapPin size={14} className="text-gray-400" />
                           <span className="text-xs text-gray-500 font-medium">{lead.location}</span>
                        </div>
                     </div>

                     <Button 
                        fullWidth 
                        variant="outline" 
                        onClick={() => navigate('/chats')}
                        className="text-[#E11D48] border-[#E11D48]/20 hover:bg-rose-50 hover:border-[#E11D48] py-3.5 rounded-2xl transition-all shadow-sm"
                     >
                        <MessageCircle size={18} /> 
                        <span className="font-black">Reply</span>
                     </Button>
                  </motion.div>
               ))}
            </div>
         )}

         {activeTab === 'Conversation' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5 space-y-3">
              <div className="relative mb-5">
                <input type="text" placeholder="Search chats..." className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 pl-11 text-sm focus:outline-none focus:border-[#E11D48] shadow-sm" />
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {[
                 {name: 'Sai Kumar', msg: '?', time: '12:51 19 Nov 25'},
                 {name: 'Agent', msg: 'hi', time: '12:57 2 Sep 25'},
                 {name: 'Tejasvi Kapoor', msg: 'null', time: '12:10 1 Sep 25'},
                 {name: 'John Doe', msg: 'Is this available?', time: '09:30 1 Sep 25'},
              ].map((chat, i) => (
                <div key={i} onClick={() => navigate('/chats')} className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-gray-100 shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer">
                   <div className="relative">
                      <img src={`https://picsum.photos/100/100?random=${i + 20}`} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-center mb-1">
                       <h4 className="font-bold text-gray-900 text-sm">{chat.name}</h4>
                       <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
                     </div>
                     <p className="text-xs text-gray-500 truncate">{chat.msg}</p>
                   </div>
                </div>
              ))}
            </motion.div>
         )}

         {activeTab === 'Leads Management' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5">
               <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mb-6">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-black text-gray-900 text-sm border-b-2 border-[#E11D48] pb-1 inline-block">Manage Leads</h3>
                     <div className="bg-[#F8FAFC] px-3 py-1.5 rounded-lg border border-gray-200">
                        <span className="text-[10px] font-bold text-gray-600">Credit Points Left: <span className="text-[#E11D48]">997</span></span>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                     <select className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-3.5 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#E11D48]/20 focus:bg-white transition-all appearance-none">
                       <option>Property For</option>
                       <option>Buy</option>
                       <option>Rent</option>
                     </select>
                     <select className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-3.5 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#E11D48]/20 focus:bg-white transition-all appearance-none">
                       <option>Select City</option>
                       <option>Noida</option>
                       <option>Ghaziabad</option>
                     </select>
                     <input type="text" placeholder="Enter Locality or Project" className="col-span-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#E11D48]/20 focus:bg-white transition-all" />
                     <select className="col-span-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-3.5 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#E11D48]/20 focus:bg-white transition-all appearance-none">
                       <option>Property Type</option>
                       <option>Apartment</option>
                       <option>Villa</option>
                     </select>
                     <input type="text" placeholder="₹ Min" className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#E11D48]/20 focus:bg-white transition-all" />
                     <input type="text" placeholder="₹ Max" className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-xs text-gray-700 font-medium outline-none focus:ring-2 focus:ring-[#E11D48]/20 focus:bg-white transition-all" />
                  </div>
                  <div className="flex flex-col gap-3">
                     <button className="w-full bg-[#E11D48] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#E11D48]/30 active:scale-95 transition-all">
                       <Search size={18} strokeWidth={3} /> Search Leads
                     </button>
                     <button className="w-full bg-white text-gray-500 font-bold py-3.5 rounded-xl border-2 border-gray-100 flex items-center justify-center active:scale-95 transition-all hover:bg-gray-50">
                       Reset Search
                     </button>
                  </div>
               </div>

               {/* Results List */}
               <div className="space-y-4">
                 {[1, 2, 3].map((item) => (
                    <motion.div 
                       key={item}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: item * 0.1 }}
                       className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                         <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                            <span className="text-[10px] font-bold text-gray-700">Property For: <span className="text-[#E11D48]">Sell</span></span>
                         </div>
                         <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">Posted: May 12 '26</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-4 mb-5">
                         <div>
                           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Location</p>
                           <p className="text-xs font-bold text-gray-900">Noida</p>
                         </div>
                         <div>
                           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">City</p>
                           <p className="text-xs font-bold text-gray-900">Ghaziabad</p>
                         </div>
                         <div>
                           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">State</p>
                           <p className="text-xs font-bold text-gray-900">Uttar Pradesh</p>
                         </div>
                         <div>
                           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Contacted For</p>
                           <p className="text-xs font-bold text-gray-400">-</p>
                         </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                         <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100/50">
                             <Search size={14} className="text-[#E11D48]" /> 
                           </div>
                         </div>
                         <button className="bg-[#E11D48] text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md shadow-[#E11D48]/30 active:scale-95 transition-all">
                           View Contact
                         </button>
                      </div>
                    </motion.div>
                 ))}
               </div>
            </motion.div>
         )}

         {activeTab === 'Viewed Leads' && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5">
              <div className="flex justify-between items-center mb-5">
                 <h3 className="font-black text-gray-900 text-sm border-b-2 border-[#E11D48] pb-1 inline-block">Contact List</h3>
                 <button className="bg-[#E11D48] text-white px-3 py-2 rounded-xl text-[10px] font-black flex items-center gap-1.5 shadow-md shadow-[#E11D48]/20 active:scale-95 transition-all">
                   <Download size={14} strokeWidth={3} /> Download List
                 </button>
              </div>
              <div className="space-y-3 mb-8">
                 <div className="relative">
                   <input type="text" placeholder="Enter Email ID or Contact No." className="w-full bg-white border border-gray-200 rounded-2xl py-3.5 px-4 pr-10 text-xs font-medium focus:outline-none focus:border-[#E11D48] shadow-sm transition-all" />
                   <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E11D48]" />
                 </div>
                 <select className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-xs text-gray-700 font-medium outline-none focus:border-[#E11D48] shadow-sm appearance-none">
                   <option>Sort leads by</option>
                   <option>Date (Newest First)</option>
                   <option>Date (Oldest First)</option>
                 </select>
              </div>
              
              {/* Empty State */}
              <div className="bg-white p-10 rounded-3xl border border-gray-100 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                   <Search size={32} className="text-gray-300" />
                 </div>
                 <h4 className="font-black text-gray-900 text-base mb-1.5 tracking-tight">No Record Found</h4>
                 <p className="text-xs text-gray-500 max-w-[200px] mx-auto leading-relaxed font-medium">You haven't viewed any leads yet or they don't match your search criteria.</p>
              </div>
            </motion.div>
         )}
      </div>
    </div>
  );
};
