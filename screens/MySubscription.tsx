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

const ORDERS = [
  { id: '307003737520', product: 'Agent-LEOPARD-2500-2500', date: '23 Apr 2018, 07:05 AM', status: 'Success' },
  { id: '307003754474', product: 'Agent-Platinum-9500', date: '02 May 2018, 06:16 AM', status: 'Success' },
  { id: '307004107156', product: 'Agent-Bronze-730', date: '20 Aug 2018, 06:48 AM', status: 'Invalid' },
  { id: 'Silver-basic-12000', product: 'Silver-basic-12000', date: '23 Oct 2017, 01:36 PM', status: 'Pending' },
  { id: 'FOX-FREE-0', product: 'Owner-FOX-FREE-0', date: '25 Oct 2017, 04:45 PM', status: 'Pending' },
  { id: 'WOLFS-500-500', product: 'Agent-WOLFS-500-500', date: '25 Oct 2017, 04:46 PM', status: 'Pending' },
];

const PLAN_FEATURES = [
  { 
    category: 'Core Features',
    items: [
      { name: 'Free Posting', metal: false, bronze: true, silver: true, gold: true, platinum: true },
      { name: 'Duration (Days)', metal: 0, bronze: 60, silver: 90, gold: 120, platinum: 150 },
      { name: 'Number of Listings', metal: 0, bronze: 2, silver: 3, gold: 4, platinum: 4 },
    ]
  },
  {
    category: 'Media & Content',
    items: [
      { name: 'Photos (Upto 5MB)', metal: false, bronze: true, silver: true, gold: true, platinum: true },
      { name: 'Video Posting', metal: false, bronze: false, silver: false, gold: true, platinum: true },
      { name: 'Expert Description', metal: false, bronze: false, silver: false, gold: false, platinum: true },
    ]
  },
  {
    category: 'Alerts & Support',
    items: [
      { name: 'SMS Alerts', metal: false, bronze: false, silver: false, gold: true, platinum: true },
      { name: 'Email Alerts', metal: false, bronze: false, silver: true, gold: true, platinum: true },
      { name: 'Chat Option', metal: false, bronze: true, silver: true, gold: true, platinum: true },
    ]
  },
  {
    category: 'Premium Perks',
    items: [
      { name: 'Verified Tag', metal: false, bronze: false, silver: false, gold: false, platinum: true },
      { name: 'Search Visibility', metal: false, bronze: false, silver: false, gold: false, platinum: true },
      { name: 'Buyer Contacts', metal: 0, bronze: 0, silver: 0, gold: 1000, platinum: 1000 },
    ]
  }
];

const PLAN_PRICES = {
  bronze: '₹ 730',
  silver: '₹ 2000',
  gold: '₹ 6500',
  platinum: '₹ 9500'
};

export const MySubscriptionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Subscribed Services');
  const [comparePlan, setComparePlan] = useState<'bronze' | 'silver' | 'gold' | 'platinum'>('platinum');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success': return 'bg-green-50 text-green-600 border-green-100';
      case 'pending': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'invalid': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const renderFeatureValue = (val: any) => {
    if (typeof val === 'boolean') {
      return val ? <CheckCircle size={16} className="text-green-500" /> : <AlertCircle size={16} className="text-gray-300" />;
    }
    if (val === 0) return <span className="text-gray-300 font-bold">-</span>;
    return <span className="text-gray-900 font-black">{val}</span>;
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-[#F8FAFC] relative flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-30 px-5 py-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95">
          <ArrowLeft size={22} className="text-gray-800" />
        </button>
        <h1 className="font-black text-xl text-gray-900 tracking-tight">Subscriptions</h1>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white px-5 py-3 border-b border-gray-100 flex gap-3 overflow-x-auto no-scrollbar sticky top-[65px] z-20">
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
        {activeTab === 'Subscribed Services' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-1">
               <h2 className="font-black text-gray-900 text-sm border-b-2 border-[#E11D48] pb-1 uppercase tracking-tight">Subscribed Services (3)</h2>
            </div>

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
        )}

        {activeTab === 'Order History' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-1">
               <h2 className="font-black text-gray-900 text-sm border-b-2 border-[#E11D48] pb-1 uppercase tracking-tight">Order History (30)</h2>
            </div>

            <div className="space-y-3">
              {ORDERS.map((order, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Product / Order ID</p>
                      <p className="text-xs font-black text-gray-900 leading-tight">{order.product}</p>
                      <p className="text-[10px] text-gray-500 font-medium mt-0.5">{order.id}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-lg border ${getStatusColor(order.status)}`}>
                       <span className="text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                       <Clock size={12} className="text-gray-400" />
                       <span className="text-[10px] font-bold text-gray-500">{order.date}</span>
                    </div>
                    <button className="text-[10px] font-black text-[#E11D48] uppercase tracking-widest">Receipt</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'View Services' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* UX Law: Hick's Law - Simplified choice through plan selection */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-black/5 border border-gray-100">
               <h2 className="font-black text-gray-900 text-sm mb-6 uppercase tracking-widest text-center">Compare Subscription Tiers</h2>
               
               <div className="flex justify-between items-center gap-2 mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                  {['bronze', 'silver', 'gold', 'platinum'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setComparePlan(p as any)}
                      className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                        comparePlan === p 
                          ? 'bg-gray-900 text-white shadow-lg' 
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
               </div>

               {/* UX Law: Aesthetic-Usability Effect - Premium Comparison Matrix */}
               <div className="space-y-8">
                  {PLAN_FEATURES.map((cat, i) => (
                    <div key={i} className="space-y-4">
                       <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] px-2">{cat.category}</h3>
                       <div className="bg-gray-50/50 rounded-3xl overflow-hidden border border-gray-100">
                          {cat.items.map((item, j) => (
                            <div key={j} className={`flex justify-between items-center p-4 ${j !== cat.items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                               <span className="text-xs font-bold text-gray-600">{item.name}</span>
                               <div className="flex items-center gap-3">
                                  <div className="flex flex-col items-end">
                                     {renderFeatureValue((item as any)[comparePlan])}
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>

               <div className="mt-10 text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Total Price</p>
                  <p className="text-3xl font-black text-gray-900 mb-6">{(PLAN_PRICES as any)[comparePlan]}</p>
                  <Button 
                    fullWidth 
                    className="bg-[#E11D48] text-white py-5 rounded-[2rem] shadow-xl shadow-rose-500/30 font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
                  >
                    PROCEED TO UPGRADE
                  </Button>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Alerts' && (
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
