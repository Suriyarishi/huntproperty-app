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

const METALLIC_STYLES: Record<string, string> = {
  bronze: 'linear-gradient(135deg, #A8704D 0%, #F5D5C0 30%, #D4A373 50%, #8D5B3A 100%)',
  silver: 'linear-gradient(135deg, #949BA0 0%, #F8F9FA 30%, #C0C4C8 50%, #70777B 100%)',
  gold: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 30%, #D4AF37 50%, #AA771C 100%)',
  platinum: 'linear-gradient(135deg, #1e3a8a 0%, #93c5fd 30%, #3b82f6 50%, #172554 100%)', // Deep Metallic Blue
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
            {/* Plan Comparison Matrix */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-black/5 border border-gray-100 relative overflow-hidden">
               {/* Background Texture Element */}
               <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none -mr-20 -mt-20">
                  <div className="w-full h-full rounded-full blur-[100px]" style={{ background: METALLIC_STYLES[comparePlan] }} />
               </div>

               <h2 className="font-black text-gray-900 text-sm mb-6 uppercase tracking-widest text-center relative z-10">Compare Subscription Tiers</h2>
               
               <div className="flex justify-between items-center gap-2 mb-8 bg-gray-50 p-2 rounded-2xl border border-gray-100 relative z-10">
                  {['bronze', 'silver', 'gold', 'platinum'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setComparePlan(p as any)}
                      style={{ 
                        background: comparePlan === p ? METALLIC_STYLES[p] : 'transparent',
                        boxShadow: comparePlan === p ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none'
                      }}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all relative overflow-hidden ${
                        comparePlan === p 
                          ? 'text-white border border-white/20' 
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {/* Glossy reflection effect */}
                      {comparePlan === p && (
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/30 to-white/0 -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                      )}
                      <span className="relative z-10">{p}</span>
                    </button>
                  ))}
               </div>

               <div className="space-y-8 relative z-10">
                  {PLAN_FEATURES.map((cat, i) => (
                    <div key={i} className="space-y-4">
                       <h3 className="text-[10px] font-black text-[#E11D48] uppercase tracking-[0.2em] px-2">{cat.category}</h3>
                       <div className="bg-gray-50/50 rounded-3xl overflow-hidden border border-gray-100 backdrop-blur-sm">
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

               <div className="mt-10 text-center relative z-10">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Total Price</p>
                  <div className="flex items-center justify-center gap-1 mb-6">
                    <span className="text-3xl font-black text-gray-900">{(PLAN_PRICES as any)[comparePlan]}</span>
                  </div>
                  
                  <Button 
                    fullWidth 
                    style={{ background: METALLIC_STYLES[comparePlan] }}
                    className="text-white py-5 rounded-[2rem] shadow-xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all border border-white/20 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-100%] animate-[shimmer_3s_infinite]" />
                    <span className="relative z-10">PROCEED TO UPGRADE</span>
                  </Button>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Alerts' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full flex flex-col items-center justify-center py-20 text-center px-10"
          >
             <div className="relative mb-8">
                <div className="w-24 h-24 bg-rose-50 rounded-[2rem] flex items-center justify-center relative z-10 border border-rose-100/50 shadow-inner">
                  <Bell size={40} className="text-[#E11D48]" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 z-20">
                   <span className="text-[10px] font-black text-gray-400">0</span>
                </div>
                {/* Decorative pulses */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-rose-500/5 rounded-full animate-ping pointer-events-none" />
             </div>

             <h2 className="font-black text-gray-900 text-xl mb-3 tracking-tight uppercase">Subscription Alerts</h2>
             
             <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm max-w-[280px]">
                <p className="text-xs text-gray-500 font-bold leading-relaxed tracking-wide uppercase">
                   Currently there are no alerts available for this user
                </p>
             </div>

             <p className="mt-8 text-[10px] text-gray-400 font-bold max-w-[200px] uppercase tracking-widest leading-loose">
               We'll notify you here about plan expirations, payment successes, and upcoming renewals.
             </p>

             <Button 
                variant="outline"
                onClick={() => setActiveTab('View Services')}
                className="mt-10 border-[#E11D48] text-[#E11D48] font-black text-[10px] px-8 py-3 rounded-2xl uppercase tracking-widest hover:bg-rose-50 transition-colors"
             >
                Explore Services
             </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
