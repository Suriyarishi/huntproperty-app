
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, Eye, MessageCircle, ChevronRight, Zap, ShieldCheck, Star, 
  BarChart, Settings, Bell, Crown, ArrowUpRight, FileText, Camera, CheckCircle,
  Building2, Layers, UserCheck, CalendarCheck, Users
} from 'lucide-react';
import { Button, Badge } from '../components/UI';

export const DashboardScreen = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Listings', value: '12', sub: '4 Active', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Views (Month)', value: '2.4k', sub: '+12% vs last', icon: Eye, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Leads', value: '84', sub: '15 New', icon: MessageCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const dashboardModules = [
    { id: 1, title: 'Contacts/Response', desc: 'Viewed Leads', icon: UserCheck, color: 'bg-red-50 text-red-500', path: '/contacts' },
    { id: 2, title: 'Properties', desc: 'Manage Properties', icon: Building2, color: 'bg-green-50 text-green-500', path: '/my-listings' },
    { id: 3, title: 'Bookings', desc: 'View Clients', icon: CalendarCheck, color: 'bg-purple-50 text-purple-500', path: '/bookings' },
    { id: 4, title: 'Subscriptions', desc: 'Manage Plans', icon: Crown, color: 'bg-yellow-50 text-yellow-600', path: '/my-subscription' },
  ];

  const responses = [
    { id: 1, name: 'Sarah Connor', prop: 'Modern Villa', time: '2m ago', msg: 'Is this still available?', avatar: 'https://picsum.photos/100/100?random=10', new: true },
    { id: 2, name: 'John Wick', prop: 'Downtown Penthouse', time: '1h ago', msg: 'I want to schedule a visit.', avatar: 'https://picsum.photos/100/100?random=11', new: false },
  ];

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-gray-50 pb-24 relative">
      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-6 rounded-b-3xl shadow-sm sticky top-0 z-20">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
             <div className="relative">
               <img src="https://picsum.photos/200/200" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
               <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
             </div>
             <div>
               <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Welcome back</p>
               <h1 className="text-xl font-bold text-gray-900">Alex Johnson</h1>
             </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/settings')} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
           {stats.map((stat, i) => (
             <div key={i} className="bg-gray-50 rounded-2xl p-3 border border-gray-100 flex flex-col items-center text-center">
                <div className={`p-2 rounded-full ${stat.bg} ${stat.color} mb-2`}>
                  <stat.icon size={18} />
                </div>
                <p className="text-lg font-bold text-gray-900 leading-none">{stat.value}</p>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">{stat.label}</p>
             </div>
           ))}
        </div>

        <div className="space-y-4">
           {/* Primary Action Cards */}
           <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/add')}
                className="relative overflow-hidden bg-[#2FED9A] p-5 rounded-3xl flex flex-col items-start gap-4 shadow-xl shadow-[#2FED9A]/20 border border-white/20 group"
              >
                <div className="bg-white/30 p-2.5 rounded-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
                  <Plus size={24} className="text-gray-900" />
                </div>
                <div>
                   <p className="font-black text-gray-900 text-sm">Post Property</p>
                   <p className="text-[9px] text-gray-800/60 font-bold uppercase tracking-wider mt-0.5">Individual Units</p>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                   <FileText size={80} />
                </div>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/add-project')}
                className="relative overflow-hidden bg-[#00AEEF] p-5 rounded-3xl flex flex-col items-start gap-4 shadow-xl shadow-[#00AEEF]/20 border border-white/20 group text-white"
              >
                <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md group-hover:scale-110 transition-transform">
                  <Building2 size={24} className="text-white" />
                </div>
                <div className="text-left">
                   <p className="font-black text-sm leading-tight">Post Project</p>
                   <p className="text-[9px] text-white/60 font-bold uppercase tracking-wider mt-0.5">Society & Comm.</p>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                   <Building2 size={80} />
                </div>
              </motion.button>
           </div>

           <Button variant="outline" onClick={() => navigate('/my-listings')} className="w-full border-gray-200 bg-white py-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
             <Layers size={18} className="mr-2 text-primary" /> 
             <span className="font-bold text-gray-700">Manage Listings & Projects</span>
           </Button>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-8">
        
        {/* Dashboard Modules Section */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="font-bold text-lg text-gray-900">Dashboard</h2>
            <button className="text-xs font-bold text-primary">View All</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
             {dashboardModules.map(m => (
               <div 
                 key={m.id} 
                 onClick={() => navigate(m.path)}
                 className="min-w-[150px] bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start hover:shadow-md transition-all cursor-pointer group"
               >
                  <div className={`p-3 rounded-2xl ${m.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <m.icon size={22} />
                  </div>
                  <h3 className="font-black text-sm text-gray-900 leading-tight">{m.title}</h3>
                  <p className="text-[10px] text-gray-500 mt-1 font-medium">{m.desc}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Responses Section */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
             <h2 className="font-bold text-lg text-gray-900">Recent Responses</h2>
             <button onClick={() => navigate('/chats')} className="text-xs font-bold text-primary">View All</button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
             {responses.map(r => (
               <div key={r.id} className="p-4 flex gap-3 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => navigate('/chats')}>
                  <div className="relative">
                    <img src={r.avatar} className="w-10 h-10 rounded-full object-cover" />
                    {r.new && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-center mb-0.5">
                        <p className="font-bold text-sm text-gray-900">{r.name}</p>
                        <span className="text-[10px] text-gray-400">{r.time}</span>
                     </div>
                     <p className="text-xs text-gray-500 truncate mb-0.5">{r.prop}</p>
                     <p className="text-xs text-gray-800 font-medium truncate">"{r.msg}"</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Subscription Section */}
        <div>
          <h2 className="font-bold text-lg text-gray-900 mb-3 px-1">Your Subscription</h2>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg">
             {/* Pattern */}
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Crown size={120} />
             </div>
             
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                        <Crown size={20} className="text-yellow-400" />
                        <span className="font-bold text-lg tracking-wide">GOLD PLAN</span>
                     </div>
                     <Badge color="bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">Active</Badge>
                   </div>
                   <div className="text-right">
                      <p className="text-xs text-gray-400">Renew by</p>
                      <p className="font-bold text-sm">Oct 24, 2025</p>
                   </div>
                </div>
                
                <div className="space-y-2 mb-5">
                   <div className="flex items-center gap-2 text-xs text-gray-300">
                     <CheckCircle size={14} className="text-primary" /> 50 Featured Listings
                   </div>
                   <div className="flex items-center gap-2 text-xs text-gray-300">
                     <CheckCircle size={14} className="text-primary" /> Priority Support
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Advice Section */}
        <div className="pb-6">
           <h2 className="font-bold text-lg text-gray-900 mb-3 px-1">Tips & Advice</h2>
           <div className="space-y-3">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
                 <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 text-blue-500">
                    <ArrowUpRight size={24} />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-900 mb-1">5 Ways to Price Right</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-2">Learn how to value your property competitively in today's market.</p>
                    <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1">Read Article <ChevronRight size={10} /></span>
                 </div>
              </div>
              
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
                 <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0 text-purple-500">
                    <Camera size={24} />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-sm text-gray-900 mb-1">Listing Photo Tips</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-2">Lighting and angles that make buyers fall in love instantly.</p>
                    <span className="text-[10px] font-bold text-purple-600 flex items-center gap-1">Read Article <ChevronRight size={10} /></span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
