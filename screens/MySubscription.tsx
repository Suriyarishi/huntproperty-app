
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, CheckCircle, Zap, Calendar, AlertCircle } from 'lucide-react';
import { Button, Badge } from '../components/UI';

export const MySubscriptionScreen: React.FC = () => {
  const navigate = useNavigate();

  // Mock Active Subscription Data
  const subscription = {
    plan: 'Gold Plan',
    status: 'Active',
    expiry: 'Oct 24, 2025',
    price: '₹ 3,500',
    daysLeft: 120,
    features: [
      { name: 'Listings Posted', used: 4, total: 7 },
      { name: 'Premium Boosts', used: 1, total: 3 },
      { name: 'Contact Views', used: 24, total: 50 },
    ]
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-gray-50 relative flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-xl text-gray-900">My Subscription</h1>
      </div>

      <div className="flex-1 p-5 pb-24 space-y-6">
        
        {/* Active Plan Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Crown size={140} />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Current Plan</p>
                <h2 className="text-2xl font-bold text-yellow-400">{subscription.plan}</h2>
              </div>
              <Badge color="bg-green-500/20 text-green-400 border border-green-500/30">
                {subscription.status}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300 mb-6">
              <Calendar size={16} />
              <span>Expires on <span className="text-white font-semibold">{subscription.expiry}</span></span>
            </div>

            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-medium text-gray-300">Days Remaining</span>
                 <span className="text-xs font-bold text-white">{subscription.daysLeft} Days</span>
               </div>
               <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                 <div className="bg-yellow-400 h-full rounded-full" style={{ width: '60%' }}></div>
               </div>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Plan Usage</h3>
          <div className="space-y-5">
            {subscription.features.map((feature, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-medium text-gray-700">{feature.name}</span>
                  <span className="text-xs font-bold text-primary">
                    {feature.used} <span className="text-gray-400 font-normal">/ {feature.total}</span>
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-500" 
                    style={{ width: `${(feature.used / feature.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex gap-4 items-start">
           <div className="bg-blue-100 p-2.5 rounded-full text-blue-600 shrink-0">
             <Zap size={24} />
           </div>
           <div>
             <h4 className="font-bold text-gray-900 text-sm">Need more capabilities?</h4>
             <p className="text-xs text-gray-600 mt-1 leading-relaxed">
               Upgrade to Platinum to unlock unlimited listings and top search placement.
             </p>
           </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="p-5 bg-white border-t border-gray-100 safe-area-bottom flex gap-3">
         <Button variant="outline" fullWidth className="border-red-100 text-red-500 hover:bg-red-50" onClick={() => alert('Cancel logic')}>
           Cancel Plan
         </Button>
      </div>
    </div>
  );
};
