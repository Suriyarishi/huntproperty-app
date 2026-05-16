
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, Eye, MessageCircle, ChevronRight, Zap, ShieldCheck, Star, 
  BarChart, Settings, Bell, Crown, ArrowUpRight, FileText, Camera, CheckCircle,
  Building2, Layers, UserCheck, CalendarCheck, Users, Briefcase, TrendingUp, PieChart
} from 'lucide-react';
import { Button, Badge } from '../components/UI';

export const DeveloperDashboardScreen = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Projects', value: '8', sub: '3 Active', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Project Visits', value: '12.8k', sub: '+18% vs last', icon: TrendingUp, color: 'text-[#2FED9A]', bg: 'bg-[#2FED9A]/10' },
    { label: 'Direct Leads', value: '142', sub: '24 New', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const dashboardModules = [
    { id: 1, title: 'Project Leads', desc: 'Buyer Responses', icon: UserCheck, color: 'bg-red-50 text-red-500', path: '/contacts' },
    { id: 2, title: 'Portfolio', desc: 'Manage Projects', icon: Layers, color: 'bg-blue-50 text-blue-500', path: '/my-listings' },
    { id: 3, title: 'Analytics', desc: 'Project Insights', icon: PieChart, color: 'bg-green-50 text-green-500', path: '/insights' },
    { id: 4, title: 'Bookings', desc: 'Unit Status', icon: CalendarCheck, color: 'bg-purple-50 text-purple-500', path: '/bookings' },
  ];

  const recentActivities = [
    { id: 1, title: 'Price Updated', prop: 'Crystal Tower A', time: '10m ago', type: 'Update', icon: TrendingUp, color: 'text-blue-500' },
    { id: 2, title: 'New Unit Sold', prop: 'Emerald Greens', time: '2h ago', type: 'Sale', icon: CheckCircle, color: 'text-[#2FED9A]' },
    { id: 3, title: 'Construction Update', prop: 'Sapphire Heights', time: '5h ago', type: 'Progress', icon: Building2, color: 'text-orange-500' },
  ];

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-gray-50 pb-24 relative">
      {/* Header */}
      <div className="bg-white px-5 pt-6 pb-6 rounded-b-[40px] shadow-sm sticky top-0 z-20">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
             <div className="relative">
               <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format&fit=crop" className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md" />
               <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#2FED9A] border-4 border-white rounded-full flex items-center justify-center">
                  <Briefcase size={8} className="text-white" />
               </div>
             </div>
             <div>
               <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Developer Panel</p>
               <h1 className="text-xl font-black text-gray-900 tracking-tight">Skyline Developers</h1>
             </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/settings')} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all active:scale-90">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
           {stats.map((stat, i) => (
             <div key={i} className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex flex-col items-start relative overflow-hidden group">
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={18} />
                </div>
                <p className="text-xl font-black text-gray-900 leading-none">{stat.value}</p>
                <p className="text-[10px] text-gray-400 mt-1.5 font-bold uppercase tracking-wider">{stat.label}</p>
                <div className="absolute top-0 right-0 p-1 opacity-20">
                   <TrendingUp size={32} className={stat.color} />
                </div>
             </div>
           ))}
        </div>

        <div className="space-y-4">
           {/* Primary Action Card for Developer */}
           <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/add-project')}
            className="w-full relative overflow-hidden bg-gray-900 p-6 rounded-[32px] flex items-center justify-between shadow-2xl shadow-black/10 group"
           >
             <div className="flex items-center gap-4 z-10">
                <div className="bg-[#2FED9A] p-3 rounded-2xl group-hover:rotate-12 transition-transform">
                  <Plus size={24} className="text-gray-900" strokeWidth={3} />
                </div>
                <div className="text-left">
                   <p className="font-black text-white text-base">Launch New Project</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Start your next venture</p>
                </div>
             </div>
             <div className="z-10 bg-white/10 p-2 rounded-full">
                <ChevronRight size={20} className="text-white" />
             </div>
             {/* Decorative Background Icon */}
             <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Building2 size={120} className="text-white" />
             </div>
           </motion.button>

           <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={() => navigate('/my-listings')} className="border-gray-100 bg-white py-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 h-auto">
                <Layers size={18} className="text-[#00AEEF]" /> 
                <span className="font-black text-[11px] text-gray-700 uppercase tracking-widest">Active Portfolio</span>
              </Button>
              <Button variant="outline" onClick={() => navigate('/insights')} className="border-gray-100 bg-white py-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col items-center gap-2 h-auto">
                <BarChart size={18} className="text-purple-500" /> 
                <span className="font-black text-[11px] text-gray-700 uppercase tracking-widest">Market Analysis</span>
              </Button>
           </div>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-8">
        
        {/* Dashboard Modules Grid */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="font-black text-sm text-gray-400 uppercase tracking-[0.2em]">Management Hub</h2>
            <div className="h-px flex-1 bg-gray-100 ml-4"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
             {dashboardModules.map(m => (
               <div 
                 key={m.id} 
                 onClick={() => navigate(m.path)}
                 className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start hover:shadow-md transition-all cursor-pointer group"
               >
                  <div className={`p-3 rounded-2xl ${m.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <m.icon size={22} />
                  </div>
                  <h3 className="font-black text-sm text-gray-900 leading-tight">{m.title}</h3>
                  <p className="text-[10px] text-gray-500 mt-1 font-bold">{m.desc}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Recent Project Activity */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
             <h2 className="font-black text-sm text-gray-400 uppercase tracking-[0.2em]">Portfolio Activity</h2>
             <button onClick={() => navigate('/contacts')} className="text-[10px] font-black text-[#2FED9A] uppercase tracking-widest bg-[#2FED9A]/10 px-3 py-1.5 rounded-full">Recent Log</button>
          </div>
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
             {recentActivities.map(activity => (
               <div key={activity.id} className="p-5 flex gap-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                     <activity.icon size={20} className={activity.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-center mb-1">
                        <p className="font-black text-sm text-gray-900">{activity.title}</p>
                        <span className="text-[10px] text-gray-400 font-bold">{activity.time}</span>
                     </div>
                     <p className="text-xs text-gray-500 font-medium mb-1">{activity.prop}</p>
                     <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2FED9A]"></span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{activity.type}</span>
                     </div>
                  </div>
                  <div className="self-center">
                     <ChevronRight size={16} className="text-gray-300" />
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Developer Subscription / Partner Program */}
        <div>
          <h2 className="font-black text-sm text-gray-400 uppercase tracking-[0.2em] mb-4 px-1">Partner Tier</h2>
          <div className="bg-gradient-to-br from-[#2FED9A] to-[#00AEEF] rounded-[40px] p-6 text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
             {/* Abstract Shapes */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
             
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                   <div>
                     <div className="flex items-center gap-3 mb-2">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                           <Crown size={24} className="text-white" />
                        </div>
                        <span className="font-black text-xl tracking-tight uppercase">PLATINUM PARTNER</span>
                     </div>
                     <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/20 border border-white/30 text-[9px] font-black tracking-widest uppercase">Premium Developer</div>
                   </div>
                   <div className="text-right">
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Next Renewal</p>
                      <p className="font-black text-sm">Dec 15, 2025</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-2">
                   <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                      <p className="text-[9px] text-white/60 font-black uppercase tracking-widest mb-1">Project Limit</p>
                      <p className="font-black text-lg">Unlimited</p>
                   </div>
                   <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
                      <p className="text-[9px] text-white/60 font-black uppercase tracking-widest mb-1">Boost Credits</p>
                      <p className="font-black text-lg">1,240</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Developer Support / Account Manager */}
        <div className="pb-10">
            <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4">
               <div className="relative">
                  <img src="https://picsum.photos/100/100?random=44" className="w-14 h-14 rounded-2xl object-cover" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#2FED9A] border-2 border-white rounded-full"></div>
               </div>
               <div className="flex-1">
                  <h3 className="font-black text-sm text-gray-900">Your Account Manager</h3>
                  <p className="text-[10px] text-gray-500 font-bold mb-2">Tejasvi Kapoor • Available Now</p>
                  <button className="bg-gray-900 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-gray-800 transition-colors">Contact Support</button>
               </div>
               <div className="p-3 bg-[#2FED9A]/10 rounded-2xl">
                  <MessageCircle size={20} className="text-[#2FED9A]" />
               </div>
            </div>
        </div>

      </div>
    </div>
  );
};
