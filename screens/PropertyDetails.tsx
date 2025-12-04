
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, MapPin, Bed, Ruler, Bath, User, MessageCircle, Calendar, Sparkles, ExternalLink, Map as MapIcon } from 'lucide-react';
import { Property } from '../types';
import { Button, Badge } from '../components/UI';
import { getNeighborhoodInsights } from '../services/gemini';

interface Props {
  properties: Property[];
  toggleShortlist: (id: string) => void;
  shortlisted: string[];
  onStartChat: (propertyId: string, owner: { id: string, name: string, avatar: string }) => void;
}

export const PropertyDetails: React.FC<Props> = ({ properties, toggleShortlist, shortlisted, onStartChat }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === id);
  const [aiInsights, setAiInsights] = useState<{ text: string, sources: any[] } | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const isShortlisted = id ? shortlisted.includes(id) : false;

  useEffect(() => {
    const container = document.getElementById('property-details-content');
    if (container) container.scrollTop = 0;
  }, [property]);

  const fetchInsights = async () => {
    if (!property) return;
    setLoadingAi(true);
    const data = await getNeighborhoodInsights(property.address, property.city);
    setAiInsights(data);
    setLoadingAi(false);
  };

  if (!property) return <div className="p-8 text-center">Property not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-white relative"
    >
      {/* Scrollable Content */}
      <div id="property-details-content" className="flex-1 overflow-y-auto no-scrollbar bg-white">
        
        {/* Header Image & Nav */}
        <div className="relative h-72 md:h-80 bg-gray-200">
          <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <button onClick={() => navigate(-1)} className="p-2 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="flex gap-2">
              <button className="p-2 bg-white/80 backdrop-blur rounded-full shadow-sm hover:bg-white transition-colors">
                <Share2 size={24} />
              </button>
              <button 
                onClick={() => toggleShortlist(property.id)}
                className={`p-2 rounded-full shadow-sm backdrop-blur transition-colors ${isShortlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-700 hover:bg-white'}`}
              >
                <Heart size={24} fill={isShortlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Content Card */}
        <div className="px-5 -mt-8 relative z-20 rounded-t-3xl bg-white pt-8 pb-8 min-h-[500px]">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Badge color="bg-primary/20 text-green-900">{property.type}</Badge>
              <h1 className="text-2xl font-bold mt-2 leading-tight">{property.title}</h1>
              <div className="flex items-center text-gray-500 mt-1 text-sm">
                <MapPin size={14} className="mr-1" />
                {property.address}, {property.city}
              </div>
            </div>
            <div className="text-right">
               <div className="text-2xl font-bold text-primary">${(property.price / 1000).toFixed(1)}k</div>
               <div className="text-xs text-gray-400">/ month</div>
            </div>
          </div>

          {/* Specs */}
          <div className="flex gap-4 py-6 overflow-x-auto no-scrollbar border-b border-gray-100">
            <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl min-w-[100px] flex-shrink-0">
              <div className="p-2 bg-white rounded-lg shadow-sm text-primary"><Bed size={20} /></div>
              <div>
                <p className="text-xs text-gray-400">Bedrooms</p>
                <p className="font-bold">{property.bhk} BHK</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl min-w-[100px] flex-shrink-0">
              <div className="p-2 bg-white rounded-lg shadow-sm text-primary"><Bath size={20} /></div>
              <div>
                <p className="text-xs text-gray-400">Baths</p>
                <p className="font-bold">2 Baths</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl min-w-[100px] flex-shrink-0">
              <div className="p-2 bg-white rounded-lg shadow-sm text-primary"><Ruler size={20} /></div>
              <div>
                <p className="text-xs text-gray-400">Area</p>
                <p className="font-bold">{property.area} sqft</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="py-6 border-b border-gray-100">
            <h3 className="font-bold text-lg mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: property.description }} />
          </div>

          {/* Amenities */}
          <div className="py-6 border-b border-gray-100">
            <h3 className="font-bold text-lg mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* AI Insights (Search Grounding) */}
          <div className="py-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
               <div className="flex items-center gap-2">
                 <Sparkles className="text-primary" size={20} />
                 <h3 className="font-bold text-lg">Neighborhood Insights</h3>
               </div>
               {!aiInsights && !loadingAi && (
                 <button onClick={fetchInsights} className="text-xs font-bold text-primary underline">Generate AI Report</button>
               )}
            </div>

            <div className="bg-card p-4 rounded-2xl border border-blue-50">
              {loadingAi ? (
                <div className="flex flex-col items-center py-4 text-gray-400">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mb-2"></div>
                  <p className="text-xs">Analyzing location data...</p>
                </div>
              ) : aiInsights ? (
                <div className="animate-fade-in">
                  <p className="text-sm text-gray-700 leading-relaxed">{aiInsights.text}</p>
                  {aiInsights.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-400 mb-2">Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {aiInsights.sources.map((s, i) => (
                           <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] bg-white px-2 py-1 rounded border text-blue-600 truncate max-w-[200px]">
                             <ExternalLink size={10} /> {s.title}
                           </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Tap "Generate" to ask HuntProperty AI about schools, safety, and market trends in {property.address}.
                </p>
              )}
            </div>
          </div>

          {/* Location Map Mock */}
           <div className="py-6 border-b border-gray-100">
            <h3 className="font-bold text-lg mb-3">Location</h3>
            <div className="w-full h-48 bg-gray-100 rounded-2xl relative overflow-hidden">
               {/* Pseudo Map Pattern */}
               <div className="absolute inset-0 opacity-10" style={{
                   backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)',
                   backgroundSize: '20px 20px'
               }}></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary/20 w-32 h-32 rounded-full animate-ping absolute"></div>
                  <div className="bg-white p-2 rounded-full shadow-lg z-10">
                    <MapPin className="text-primary" fill="currentColor" size={24} />
                  </div>
               </div>
               <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md text-xs font-bold flex items-center gap-2 hover:bg-gray-50">
                 <MapIcon size={14} /> View on Map
               </button>
            </div>
          </div>

          {/* Owner Info */}
          <div className="py-6 mb-4">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <img src={property.owner.avatar} alt={property.owner.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary" />
                  <div>
                     <p className="font-bold text-gray-900">{property.owner.name}</p>
                     <p className="text-xs text-gray-500">Property Owner</p>
                  </div>
               </div>
               <div className="flex gap-2">
                 <button 
                  onClick={() => onStartChat(property.id, property.owner)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 transition-transform active:scale-95 hover:bg-green-200"
                 >
                   <MessageCircle size={20} />
                 </button>
                 <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 transition-transform active:scale-95 hover:bg-blue-200">
                   <Calendar size={20} />
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer CTA */}
      <div className="bg-white border-t border-gray-100 p-4 flex gap-3 z-50 items-center safe-area-bottom shadow-[0_-5px_10px_rgba(0,0,0,0.05)] flex-shrink-0">
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase">Total Price</p>
          <p className="text-xl font-bold text-gray-900">${(property.price / 1000).toFixed(1)}k <span className="text-sm font-normal text-gray-500">/mo</span></p>
        </div>
        <Button className="flex-1 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-shadow">Book Visit</Button>
      </div>
    </motion.div>
  );
};
