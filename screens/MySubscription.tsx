
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Crown, CheckCircle, Zap, Calendar, 
  AlertCircle, Receipt, History, Layout, Bell, 
  ChevronRight, ExternalLink, ShieldCheck, Clock
} from 'lucide-react';
import { Button, Badge } from '../components/UI';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'subscribed' | 'history' | 'services' | 'alerts';

export const MySubscriptionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('subscribed');

  const tabs = [
    { id: 'subscribed', label: 'Subscribed Services', icon: ShieldCheck },
    { id: 'history', label: 'Order History', icon: History },
    { id: 'services', label: 'View Services', icon: Layout },
    { id: 'alerts', label: 'Alerts', icon: Bell },
  ];

  const subscriptions = [
    {
      orderId: '307003737520',
      paymentMode: 'Online',
      title: 'Agent-LEOPARD-2500-2500',
      status: 'Success',
      time: '23 Apr 2018',
      validTill: '23 Apr 2018',
      isExpired: true
    },
    {
      orderId: '307003754474',
      paymentMode: 'Online',
      title: 'Agent-Platinum-9500',
      status: 'Success',
      time: '02 May 2018',
      validTill: '29 Sep 2018',
      isExpired: true
    },
    {
      orderId: '107422308340',
      paymentMode: 'Online',
      title: 'Agent-Silver-10',
      status: 'Success',
      time: '23 Aug 2018',
      validTill: '21 Nov 2018',
      isExpired: true
    }
  ];

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-gray-50 relative flex flex-col">
      {/* Premium Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-30 px-5 pt-8 pb-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all active:scale-90">
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <div>
            <h1 className="font-black text-xl text-gray-900 tracking-tight leading-none">Subscriptions</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">Manage your plans</p>
          </div>
        </div>
        <div className="bg-yellow-50 p-2 rounded-xl">
           <Crown size={20} className="text-yellow-600" />
        </div>
      </div>

      <div className="flex-1 pb-24">
        {/* Horizontal Navigation Tabs */}
        <div className="px-5 py-4 overflow-x-auto no-scrollbar flex gap-2">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as TabType)}
               className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl whitespace-nowrap text-xs font-black transition-all ${
                 activeTab === tab.id 
                 ? 'bg-gray-900 text-white shadow-lg shadow-black/10' 
                 : 'bg-white text-gray-400 border border-gray-100'
               }`}
             >
               <tab.icon size={14} />
               {tab.label}
             </button>
           ))}
        </div>

        <div className="px-5">
           <AnimatePresence mode="wait">
             {activeTab === 'subscribed' && (
               <motion.div
                 key="subscribed"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-4"
               >
                 <div className="flex items-center justify-between px-1 mb-2">
                    <h2 className="font-black text-sm text-gray-900 uppercase tracking-widest">
                       Subscribed Services <span className="text-gray-400 ml-1">({subscriptions.length})</span>
                    </h2>
                    <button className="text-[10px] font-black text-primary uppercase tracking-widest">Refresh</button>
                 </div>

                 {subscriptions.map((sub, idx) => (
                   <div 
                     key={sub.orderId}
                     className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all"
                   >
                     <div className="flex justify-between items-start mb-5 relative z-10">
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Order ID</p>
                              <p className="text-[10px] font-black text-gray-900">#{sub.orderId}</p>
                           </div>
                           <h3 className="text-base font-black text-gray-900 leading-tight">{sub.title}</h3>
                        </div>
                        <Badge color={sub.isExpired ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-green-50 text-green-500 border border-green-100'}>
                           {sub.isExpired ? 'Expired' : 'Active'}
                        </Badge>
                     </div>

                     <div className="grid grid-cols-2 gap-6 mb-5 relative z-10">
                        <div>
                           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Status</p>
                           <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                              <p className="text-xs font-black text-gray-700">{sub.status}</p>
                           </div>
                        </div>
                        <div>
                           <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-1">Subscribed On</p>
                           <div className="flex items-center gap-1.5 text-gray-700">
                              <Clock size={12} className="text-gray-400" />
                              <p className="text-xs font-black">{sub.time}</p>
                           </div>
                        </div>
                     </div>

                     <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center relative z-10">
                        <div>
                           <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Valid Till</p>
                           <p className={`text-xs font-black ${sub.isExpired ? 'text-red-400' : 'text-gray-900'}`}>
                              {sub.validTill} {sub.isExpired && '( Expired )'}
                           </p>
                        </div>
                        <button className="p-2 bg-white rounded-xl shadow-sm hover:scale-110 transition-transform active:scale-95">
                           <ChevronRight size={18} className="text-gray-400" />
                        </button>
                     </div>
                   </div>
                 ))}

                 {/* No more services CTA */}
                 <div className="pt-4 text-center">
                    <p className="text-xs text-gray-400 font-medium mb-4">Looking for more features?</p>
                    <Button fullWidth onClick={() => navigate('/subscription')} className="bg-[#2FED9A] text-gray-900 py-4 shadow-xl shadow-[#2FED9A]/20">
                       Browse Premium Plans
                    </Button>
                 </div>
               </motion.div>
             )}

             {activeTab !== 'subscribed' && (
               <motion.div
                 key="coming-soon"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="py-20 text-center"
               >
                 <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                    <Layout size={32} className="text-gray-200" />
                 </div>
                 <h3 className="font-black text-gray-900">Module Coming Soon</h3>
                 <p className="text-xs text-gray-400 mt-1">We are working on bringing this feature to mobile.</p>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

