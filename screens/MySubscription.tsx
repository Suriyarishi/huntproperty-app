import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Crown, CheckCircle, Zap, Calendar, 
  AlertCircle, FileText, Layout, Bell, ShieldCheck, 
  History, Eye, Clock, CreditCard 
} from 'lucide-react';
import { Button, Badge } from '../components/UI';

const TABS = ['Subscribed Services', 'Order History', 'View Services', 'Alerts'];

const SERVICES = [
  { id: '307003737520', title: 'Agent-LEOPARD-2500-2500', status: 'Success', time: '23 Apr 2018', valid: '23 Apr 2018 ( Expired )', mode: 'Credit Card' },
  { id: '307003754474', title: 'Agent-Platinum-9500', status: 'Success', time: '02 May 2018', valid: '29 Sep 2018 ( Expired )', mode: 'Net Banking' },
  { id: '107422308340', title: 'Agent-Silver-10', status: 'Success', time: '23 Aug 2018', valid: '21 Nov 2018 ( Expired )', mode: 'Debit Card' },
];

export const MySubscriptionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Subscribed Services');

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-[#F8FAFC] relative flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-20 px-5 py-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95">
          <ArrowLeft size={22} className="text-gray-800" />
        </button>
        <h1 className="font-black text-xl text-gray-900 tracking-tight">Subscriptions</h1>
      </div>

      {/* Tab Navigation (Sidebar-style but mobile friendly horizontal) */}
      <div className="bg-white px-5 py-3 border-b border-gray-100 flex gap-3 overflow-x-auto no-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-2xl text-[11px] font-black whitespace-nowrap transition-all uppercase tracking-wider ${
              activeTab === tab
                ? 'bg-[#E11D48] text-white shadow-lg shadow-[#E11D48]/20'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 p-5 pb-24">
        {activeTab === 'Subscribed Services' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-1">
               <h2 className="font-black text-gray-900 text-sm border-b-2 border-[#E11D48] pb-1 uppercase tracking-tight">Subscribed Services (3)</h2>
               <button className="text-[10px] font-black text-[#E11D48] flex items-center gap-1">
                 MANAGE ALL <Layout size={12} />
               </button>
            </div>

            {/* Desktop-like Table for Mobile (Card stack) */}
            <div className="space-y-4">
              {SERVICES.map((s, idx) => (
                <motion.div 
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-green-50 px-3 py-1.5 rounded-xl border border-green-100">
                       <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{s.status}</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400">Order ID: {s.id}</p>
                  </div>

                  <h3 className="font-black text-gray-900 text-base mb-4 leading-tight uppercase tracking-tight group-hover:text-[#E11D48] transition-colors">{s.title}</h3>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                    <div className="space-y-1">
                       <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Purchase Date</p>
                       <div className="flex items-center gap-2">
                         <Clock size={14} className="text-gray-400" />
                         <p className="text-xs font-bold text-gray-700">{s.time}</p>
                       </div>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Valid Till</p>
                       <div className="flex items-center gap-2">
                         <Calendar size={14} className="text-[#E11D48]" />
                         <p className="text-xs font-black text-[#E11D48]">{s.valid}</p>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Buy New Section */}
            <div className="mt-8 bg-gradient-to-br from-[#E11D48] to-[#9F1239] rounded-3xl p-6 text-white shadow-xl shadow-[#E11D48]/20 relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
               <div className="relative z-10 flex flex-col gap-4">
                  <div>
                    <h4 className="font-black text-lg leading-tight mb-1">Upgrade Your Business</h4>
                    <p className="text-xs text-white/70 font-medium">Unlock premium features, faster leads, and top search ranking for your listings.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    fullWidth 
                    onClick={() => navigate('/subscription')}
                    className="bg-white text-[#E11D48] border-none font-black text-xs py-4 rounded-2xl shadow-xl active:scale-95 transition-all"
                  >
                    VIEW ALL PLANS
                  </Button>
               </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-20 text-center">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
               <History size={32} className="text-gray-300" />
             </div>
             <h4 className="font-black text-gray-900 text-base mb-1 tracking-tight">Coming Soon</h4>
             <p className="text-xs text-gray-500 max-w-[200px] mx-auto font-medium">{activeTab} section is currently under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};
