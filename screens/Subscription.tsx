
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Info, Check, Star, Crown, Shield, Zap } from 'lucide-react';
import { Button } from '../components/UI';

export const SubscriptionScreen: React.FC = () => {
  const navigate = useNavigate();
  // Mocking the user's current plan ID
  const currentPlanId = 'silver'; 

  const plans = [
    { 
      id: 'metal',
      name: 'Metal', 
      price: 'Free', 
      period: '30 Days',
      color: 'bg-gradient-to-r from-gray-200 to-gray-300', 
      textColor: 'text-gray-800',
      icon: Shield,
      features: [
        '1 Listing',
        'Photos Posting (Upto 5MB)',
        'Basic Support'
      ]
    },
    { 
      id: 'bronze',
      name: 'Bronze', 
      price: '₹ 730', 
      period: '60 Days',
      color: 'bg-gradient-to-r from-[#CD7F32] to-[#A05A2C]', 
      textColor: 'text-white',
      icon: Shield,
      features: [
        '3 Listings',
        'Chat Option',
        'Expert Property Description',
        'Buyer Contacts'
      ]
    },
    { 
      id: 'silver',
      name: 'Silver', 
      price: '₹ 1400', 
      period: '90 Days',
      color: 'bg-gradient-to-r from-gray-400 to-gray-500', 
      textColor: 'text-white',
      icon: Star,
      features: [
        '5 Listings',
        'Email Alerts',
        'Chat Option',
        'Expert Description',
        'Get Buyer Contacts'
      ]
    },
    { 
      id: 'gold',
      name: 'Gold', 
      price: '₹ 3500', 
      period: '120 Days',
      color: 'bg-gradient-to-r from-[#FFD700] to-[#E6C200]', 
      textColor: 'text-black',
      icon: Crown,
      features: [
        '7 Listings',
        'Video Posting',
        'SMS & Email Alerts',
        'Verified Tag',
        'Premium Visibility'
      ]
    },
    { 
      id: 'platinum',
      name: 'Platinum', 
      price: '₹ 5000', 
      period: '150 Days',
      color: 'bg-gradient-to-r from-slate-900 to-slate-800', 
      textColor: 'text-white',
      icon: Zap,
      features: [
        '9 Listings',
        'All Gold Features',
        'Top Search Rank',
        'Dedicated Relationship Manager',
        'Social Media Promotion'
      ]
    }
  ];

  // Helper to determine plan status (Downgrade, Current, Upgrade)
  const getPlanStatus = (index: number) => {
    const currentIndex = plans.findIndex(p => p.id === currentPlanId);
    if (index === currentIndex) return 'current';
    if (index > currentIndex) return 'upgrade';
    return 'downgrade';
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex-none px-4 py-4 flex items-center bg-white border-b border-gray-100 shadow-sm z-30 sticky top-0">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-xl text-gray-900">Subscription Plans</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5 pb-32 space-y-6">
        
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-2">
          <h3 className="font-bold text-blue-900 text-sm">Choose your growth partner</h3>
          <p className="text-xs text-blue-700 mt-1">Upgrade to higher tiers for better visibility and faster leads.</p>
        </div>

        {plans.map((plan, index) => {
          const status = getPlanStatus(index);
          const isCurrent = status === 'current';
          const isUpgrade = status === 'upgrade';

          return (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                isCurrent 
                  ? 'border-2 border-green-500 shadow-lg ring-4 ring-green-50 scale-[1.01] z-10' 
                  : 'border border-gray-200 shadow-md hover:shadow-lg'
              }`}
            >
              {/* Badge for Current Plan */}
              {isCurrent && (
                <div className="bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider text-center py-1">
                  Your Current Plan
                </div>
              )}

              {/* Card Header */}
              <div className={`${plan.color} ${plan.textColor} p-5 flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white/20 backdrop-blur-sm`}>
                    <plan.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-none">{plan.name}</h3>
                    <p className="text-xs opacity-90 mt-1 font-medium">{plan.period}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl">{plan.price}</p>
                </div>
              </div>

              {/* Features */}
              <div className="p-5 space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <Check size={16} className={`mt-0.5 ${isCurrent ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className="leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                {isCurrent ? (
                  <button disabled className="w-full py-3 bg-gray-100 text-gray-500 font-bold rounded-xl text-sm flex items-center justify-center gap-2 cursor-default">
                    <Check size={18} /> Active Plan
                  </button>
                ) : isUpgrade ? (
                  <button 
                    onClick={() => alert(`Upgrading to ${plan.name}`)}
                    className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 ${
                      plan.id === 'platinum' 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'bg-[#2FED9A] text-black hover:bg-[#26d489]'
                    }`}
                  >
                    Upgrade to {plan.name}
                  </button>
                ) : (
                  <button 
                    onClick={() => alert(`Downgrading to ${plan.name}`)}
                    className="w-full py-3 border border-gray-200 text-gray-500 font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors"
                  >
                    Downgrade
                  </button>
                )}
              </div>
            </div>
          );
        })}

      </div>

      {/* Footer Contact */}
      <div className="bg-white p-5 border-t border-gray-100 safe-area-bottom z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
         <div className="flex items-center gap-4 text-gray-500 text-xs">
            <div className="p-2 bg-gray-100 rounded-full"><Phone size={16} /></div>
            <div>
              <p className="font-bold text-gray-900">Need Help?</p>
              <p>Call us at 85588 002009</p>
            </div>
         </div>
      </div>
    </div>
  );
};
