
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Phone, Mail, Info, Check, Star, Crown, Shield, Zap, 
  TrendingUp, Mail as MailIcon, Award 
} from 'lucide-react';

// Types for Plan Data
interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  gradient: string;
  textColor: string;
  icon: any;
  features: string[];
  buttonColor?: string;
  shineColor?: string;
  isPopular?: boolean;
}

export const SubscriptionScreen: React.FC = () => {
  const navigate = useNavigate();
  const currentPlanId = 'silver'; 

  const plans: Plan[] = [
    { 
      id: 'metal',
      name: 'Metal', 
      price: 'Free', 
      period: '1 Month',
      gradient: 'from-[#D1D5DB] via-[#F3F4F6] to-[#9CA3AF]', 
      textColor: 'text-gray-800',
      icon: Shield,
      features: [
        '1 Listing',
        'Free Posting',
        'Photos Posting (Upto 5MB)',
      ],
      shineColor: 'bg-white/30'
    },
    { 
      id: 'bronze',
      name: 'Bronze', 
      price: '₹ 730', 
      period: '2 Months',
      gradient: 'from-[#B45F06] via-[#E69138] to-[#783F04]', 
      textColor: 'text-white',
      icon: Shield,
      features: [
        '3 Listing',
        'Chat Option',
        'Expert Property Description',
        'Buyer Contacts'
      ],
      shineColor: 'bg-white/20'
    },
    { 
      id: 'silver',
      name: 'Silver', 
      price: '₹ 1400', 
      period: '3 Months', 
      gradient: 'from-[#9CA3AF] via-[#E5E7EB] to-[#4B5563]', 
      textColor: 'text-gray-900',
      icon: Star,
      features: [
        '5 Listing',
        'Email Alerts',
        'Chat Option',
        'Get Buyer Contacts',
        'Expert Property Description'
      ],
      shineColor: 'bg-white/30'
    },
    { 
      id: 'gold',
      name: 'Gold', 
      price: '₹ 3500', 
      period: '3 Months',
      gradient: 'from-[#F1C232] via-[#FFE599] to-[#BF9000]', 
      textColor: 'text-black',
      icon: Crown,
      features: [
        '7 Listing',
        'Video Posting',
        'SMS & Email Alerts',
        'Verified Tag',
        'Premium Visibility'
      ],
      buttonColor: 'bg-gradient-to-r from-[#F1C232] to-[#BF9000]',
      shineColor: 'bg-white/40',
      isPopular: true
    },
    { 
      id: 'platinum',
      name: 'Platinum', 
      price: '₹ 5000', 
      period: '6 Months',
      gradient: 'from-[#1E293B] via-[#334155] to-[#0F172A]', 
      textColor: 'text-white',
      icon: Zap,
      features: [
        '9 Listing',
        'All Gold Features',
        'Top Search Rank',
        'Dedicated Relationship Manager',
        'Social Media Promotion'
      ],
      buttonColor: 'bg-slate-800 text-white',
      shineColor: 'bg-white/10'
    }
  ];

  const getPlanStatus = (index: number) => {
    const currentIndex = plans.findIndex(p => p.id === currentPlanId);
    if (index === currentIndex) return 'current';
    if (index > currentIndex) return 'upgrade';
    return 'downgrade';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-xl text-gray-900 mx-auto -ml-0">Subscription Plans</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto w-full max-w-lg mx-auto p-4 space-y-6 no-scrollbar">
        
        {/* Promo Banner */}
        <div className="bg-[#D1F1FF]/50 p-5 rounded-2xl border border-[#A5E3FF]/30 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingUp size={60} />
          </div>
          <h3 className="font-bold text-sky-900 text-base">Choose your growth partner</h3>
          <p className="text-sm text-sky-700 mt-1 font-medium leading-tight">
            Upgrade to higher tiers for better visibility and faster leads.
          </p>
        </div>

        {/* Plans List */}
        <div className="space-y-8 pb-32">
          {plans.map((plan, index) => {
            const status = getPlanStatus(index);
            const isCurrent = status === 'current';
            const isUpgrade = status === 'upgrade';
            const Icon = plan.icon;

            return (
              <div 
                key={plan.id}
                className={`group relative rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ${
                  isCurrent ? 'ring-2 ring-gray-900/10' : ''
                } ${plan.isPopular ? 'scale-[1.03] z-10 border-2 border-yellow-400/50 shadow-yellow-500/20' : ''}`}
              >
                {/* Main Metallic Body */}
                <div className={`bg-gradient-to-br ${plan.gradient} p-8 relative overflow-hidden min-h-[400px] flex flex-col`}>
                  
                  {/* Glossy Sheen Overlay */}
                  <div className={`absolute -inset-x-[100%] h-[200%] top-0 rotate-[35deg] ${plan.shineColor} blur-3xl opacity-30 group-hover:animate-shine transition-all duration-1000`} />
                  
                  {/* Status Banner */}
                  {isCurrent ? (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-800/80 backdrop-blur-md px-10 py-1.5 rounded-b-3xl border border-white/20 shadow-lg z-20">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">YOUR CURRENT PLAN</span>
                    </div>
                  ) : plan.isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 px-10 py-1.5 rounded-b-3xl border border-white/20 shadow-lg z-20">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black flex items-center gap-1.5">
                         <Award size={12} fill="black" /> MOST POPULAR
                       </span>
                    </div>
                  )}

                  {/* Card Section: Header */}
                  <div className={`flex justify-between items-start z-10 ${isCurrent ? 'pt-12' : ''}`}>
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-white/30 backdrop-blur-2xl rounded-[1.5rem] border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">
                        <Icon size={28} className={plan.textColor} />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-black tracking-tight ${plan.textColor} uppercase`}>{plan.name}</h2>
                        <span className={`text-[11px] font-bold opacity-70 uppercase tracking-[0.2em] ${plan.textColor}`}>
                          {plan.period}
                        </span>
                      </div>
                    </div>
                    <div className={`px-4 py-2 bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 ${plan.textColor}`}>
                      <p className="text-xl font-black tracking-tight capitalize">
                        {plan.price}
                        {plan.price !== 'Free' && (
                          <span className="text-xs opacity-80 font-bold ml-1.5 align-middle">
                            / {plan.period.toLowerCase()}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Card Section: Features (The "Card" on Gradient Look) */}
                  <div className="flex-1 mt-10 z-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center p-0.5 ${isCurrent ? 'bg-black text-white shadow-lg' : 'bg-white/20 text-gray-700'} border border-white/30`}>
                            <Check size={12} strokeWidth={4} />
                          </div>
                          <span className={`text-[15px] font-bold tracking-tight opacity-90 ${plan.textColor}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="mt-10">
                      {isCurrent ? (
                        <div className="w-full py-5 bg-white/20 backdrop-blur-xl border border-white/40 rounded-[1.5rem] text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-inner">
                           <Check size={20} strokeWidth={3} /> Active Plan
                        </div>
                      ) : (
                        <button 
                          onClick={() => alert(`${isUpgrade ? 'Upgrading' : 'Downgrading'} to ${plan.name}`)}
                          className={`w-full py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-[0.97] hover:brightness-110 flex items-center justify-center relative group/btn overflow-hidden ${
                            isUpgrade ? (plan.buttonColor || 'bg-white text-black') : 'bg-black text-white'
                          }`}
                        >
                          <span className="relative z-10">{isUpgrade ? `Upgrade to ${plan.name}` : 'Downgrade'}</span>
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Guarantee */}
        <div className="pt-10 pb-16 text-center space-y-3 px-4">
          <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Secure payment | Cancel anytime</p>
          <div className="inline-flex items-center justify-center gap-3 px-6 py-2 bg-gray-50 rounded-full border border-gray-100 shadow-sm">
             <Shield size={16} className="text-sky-500" />
             <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Need help? Contact our support team.</span>
          </div>
        </div>

        {/* Contact Footer Cards */}
        <div className="space-y-5 pt-8 border-t border-gray-100 pb-20">
          <footer className="grid gap-4">
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:border-blue-100 transition-colors cursor-pointer group">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
                <Phone size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Call Us</h4>
                <p className="text-sm text-gray-500 mt-1 font-medium">85588 002009</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:border-emerald-100 transition-colors cursor-pointer group">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
                <MailIcon size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Mail Us</h4>
                <div className="text-[12px] text-gray-500 mt-1 font-medium space-y-1">
                  <p className="hover:text-emerald-600">info@huntproperty.com</p>
                  <p className="hover:text-emerald-600">customercare@huntproperty.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 hover:border-purple-100 transition-colors cursor-pointer group">
              <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
                <Info size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Information</h4>
                <p className="text-[11px] font-bold text-emerald-500 mt-1 leading-tight uppercase tracking-widest">Customer Services</p>
              </div>
            </div>
          </footer>

          {/* Apple Compliance UI Section */}
          <div className="mt-16 pt-10 border-t border-gray-100 text-center space-y-5">
             <div className="flex flex-col gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                <span className="flex items-center justify-center gap-2">
                  <Shield size={10} className="text-gray-300" />
                  Auto-renewable subscription
                </span>
                <span>Payment charged to Apple ID</span>
                <span>Cancel anytime in Apple ID settings</span>
             </div>
             
             <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 pt-4 pb-10">
                <button 
                  onClick={() => alert('Opening Privacy Policy')}
                  className="text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] hover:text-sky-700 transition-colors flex items-center gap-1.5"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => alert('Opening Terms of Service')}
                  className="text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] hover:text-sky-700 transition-colors flex items-center gap-1.5"
                >
                  Terms and Conditions
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
