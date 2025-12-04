
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ArrowRight, Share2 } from 'lucide-react';

// Mock Data for Insights
const INSIGHTS_DATA = [
  {
    id: 1,
    title: 'The Chintels Paradiso Crisis: A Turning Point in Real Estate Safety',
    date: 'February 21, 2025',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
    summary: "Gurugram's Chintels Paradiso: A Case for Safer Construction Practices. The Chintels Paradiso residential complex in Gurugram has become a focal point for discussions on construction quality and safety standards in high-rise buildings..."
  },
  {
    id: 2,
    title: 'Noida Seals Four Major Housing Projects Due to Violation',
    date: 'January 12, 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    summary: "In a recent crackdown, the Noida Authority has taken decisive action against four major housing projects for violating building by-laws, signaling a stricter regulatory environment..."
  },
  {
    id: 3,
    title: 'Great Days Ahead for Indian Real Estate: Foreign Investments',
    date: 'January 12, 2025',
    image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=800&auto=format&fit=crop',
    summary: "The Indian real estate sector is seeing promising growth, as highlighted by industry experts. Institutional investments are flowing in, driven by transparency and regulatory reforms..."
  },
  {
    id: 4,
    title: 'YEIDA Unveils New Residential Plot Scheme Near Noida Airport',
    date: 'January 11, 2025',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    summary: "The Yamuna Expressway Industrial Development Authority (YEIDA) has launched a new residential plot scheme, offering a prime investment opportunity near the upcoming Noida International Airport..."
  }
];

export const InsightsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-gray-50 relative">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-xl text-gray-900">Real Estate Insights</h1>
      </div>

      <div className="p-5 space-y-6 pb-24">
        {/* Featured/Hero Article */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer">
           <div className="h-48 overflow-hidden relative">
             <img 
               src={INSIGHTS_DATA[0].image} 
               alt="" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
             />
             <div className="absolute top-4 left-4 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">
               Featured
             </div>
           </div>
           <div className="p-5">
             <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
               <Calendar size={14} />
               <span>{INSIGHTS_DATA[0].date}</span>
             </div>
             <h2 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
               {INSIGHTS_DATA[0].title}
             </h2>
             <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
               {INSIGHTS_DATA[0].summary}
             </p>
             <button className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
               Read Full Story <ArrowRight size={16} />
             </button>
           </div>
        </div>

        <h3 className="font-bold text-lg text-gray-900 px-1">Latest Updates</h3>

        {/* List of other articles */}
        <div className="space-y-4">
          {INSIGHTS_DATA.slice(1).map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer">
               <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                 <img src={item.image} alt="" className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                 <div>
                   <p className="text-[10px] text-gray-400 mb-1">{item.date}</p>
                   <h3 className="font-bold text-sm text-gray-900 leading-tight line-clamp-2 mb-1">
                     {item.title}
                   </h3>
                 </div>
                 <div className="flex items-center justify-between mt-2">
                   <span className="text-xs font-bold text-primary">Read</span>
                   <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-full">
                     <Share2 size={14} />
                   </button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
