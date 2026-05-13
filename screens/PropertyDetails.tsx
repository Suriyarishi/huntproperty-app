
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Heart, Share2, Search, MapPin,
  School, Library, Car, Baby, Utensils, Home, Dumbbell, Flower2,
  Bed, Bath, Layout, Ruler, Layers, Navigation, ShieldCheck,
  ArrowRight, Phone, MessageCircle
} from 'lucide-react';
import { Property } from '../types';
import { Button } from '../components/UI';
import { FraudAlertModal } from '../components/FraudAlertModal';
import { ContactOwnerModal } from '../components/ContactOwnerModal';
import { AlertTriangle } from 'lucide-react';

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
  const isShortlisted = id ? shortlisted.includes(id) : false;
  const [isFraudAlertOpen, setIsFraudAlertOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  useEffect(() => {
    const container = document.getElementById('property-details-content');
    if (container) container.scrollTop = 0;
  }, [property]);

  if (!property) return <div className="p-8 text-center font-medium text-gray-500">Property not found</div>;

  // Use the generated assets
  const heroImage = "/C:/Users/suriy/.gemini/antigravity/brain/b70f208c-1d96-4e0e-ad53-9a39a16b2c25/modern_apartment_hero_1772182509336.png";
  const mapImage = "/C:/Users/suriy/.gemini/antigravity/brain/b70f208c-1d96-4e0e-ad53-9a39a16b2c25/hyderabad_map_preview_1772182539997.png";

  const amenities = [
    { icon: <School className="text-red-500" />, label: 'School', bg: 'bg-red-50' },
    { icon: <Library className="text-orange-500" />, label: 'Library', bg: 'bg-orange-50' },
    { icon: <Car className="text-gray-800" />, label: 'Car Parking', bg: 'bg-gray-100' },
    { icon: <Baby className="text-black" />, label: "Kids Playground", bg: 'bg-red-50' },
    { icon: <Utensils className="text-red-600" />, label: 'Restaurants', bg: 'bg-red-50' },
    { icon: <Home className="text-rose-500" />, label: 'Club House', bg: 'bg-rose-50' },
    { icon: <Dumbbell className="text-slate-800" />, label: 'Fitness Gym', bg: 'bg-slate-100' },
    { icon: <Flower2 className="text-teal-600" />, label: 'Yoga', bg: 'bg-teal-50' },
  ];

  const highlights = [
    { label: 'Bedrooms', value: '-' },
    { label: 'Bathrooms', value: '2' },
    { label: 'Balcony', value: '1' },
    { label: 'Store Room', value: 'No' },
    { label: 'Covered area', value: '-' },
    { label: 'Carpet area', value: '937 Sq ft' },
    { label: 'Plot area', value: '-' },
    { label: 'Status', value: '-' },
    { label: 'Transaction type', value: 'Resale' },
    { label: 'Floor', value: '2 (Out of 5 Floors)' },
    { label: 'Car Parking', value: 'yes' },
    { label: 'Furnished Status', value: '-' },
    { label: 'Lift', value: 'yes' },
    { label: 'Type of Ownership', value: 'Leasehold' },
    { label: 'Facing', value: '-' },
  ];

  const descriptionTable = [
    { label: 'Description', value: 'Located at prime location of Noida' },
    { label: 'Property For', value: 'Sell' },
    { label: 'State', value: 'Uttar Pradesh' },
    { label: 'City', value: 'Gautam Buddh Nagar' },
    { label: 'Locality', value: 'Sector 104' },
    { label: 'Address', value: 'Sector 100' },
    { label: 'Landmark', value: 'Near Pathways School' },
    { label: 'Bedrooms', value: '4' },
    { label: 'Bathrooms', value: '4' },
    { label: 'Balconies', value: '5' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full bg-white font-sans relative overflow-hidden"
    >
      {/* Top Search Bar & Action Buttons */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-50 z-30">
        <button onClick={() => navigate(-1)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search City/Location/Project"
            className="w-full bg-gray-50 border border-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
        <button className="p-2 bg-teal-50 text-teal-400 rounded-full hover:bg-teal-100 transition-colors">
          <Heart size={18} fill={isShortlisted ? "currentColor" : "none"} />
        </button>
        <button className="p-2 bg-teal-50 text-teal-400 rounded-full hover:bg-teal-100 transition-colors">
          <Share2 size={18} />
        </button>
      </div>

      <div id="property-details-content" className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        {/* Hero Image Section */}
        <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden">
          <img src={heroImage} alt="Property" className="w-full h-full object-cover" />

          {/* Overlays */}
          <div className="absolute bottom-4 left-4 text-white drop-shadow-md text-xs font-medium">
            Posted 2m ago by owner
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold">
            <Layout size={12} /> 3 Photos
          </div>
        </div>

        {/* Price & Location Title */}
        <div className="px-5 pt-6 pb-4">
          <div className="text-[28px] font-bold text-[#1a1a1a] mb-4">
            ₹ 45Lac
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">Best Location</h2>
            <p className="text-sm text-gray-500 font-medium">For Sell in Hyderabad, Hyderabad City</p>
          </div>

          <div className="h-[1px] bg-gray-100 w-full mb-6"></div>

          {/* Location / Map Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-800">See Location</h2>
              <span className="text-sm text-gray-500 font-medium">Map</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-50 aspect-[2/1]">
              <img src={mapImage} alt="Map View" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded shadow-md border border-gray-50">
                <p className="text-[12px] font-bold text-[#1a1a1a]">Hyderabad</p>
                <button className="text-[10px] text-blue-500 font-medium hover:underline">view larger map</button>
              </div>
              <button className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-md border border-gray-50">
                <Navigation size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="px-5 py-6 bg-gray-50/50">
          <h2 className="text-lg font-bold text-[#4B2F5D] mb-6">Amenities</h2>
          <div className="grid grid-cols-4 gap-y-8 gap-x-2">
            {amenities.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-2 shadow-sm transition-transform group-active:scale-95`}>
                  {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                </div>
                <span className="text-[10px] font-semibold text-gray-500 tracking-tight leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Highlights Table */}
        <div className="px-5 py-8">
          <h2 className="text-lg font-bold text-[#4B2F5D] mb-4">Key Highlight</h2>
          <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {highlights.map((item, idx) => (
              <div key={idx} className={`flex justify-between items-center px-4 py-3.5 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F9F9FB]'}`}>
                <span className="text-sm text-gray-500 font-medium">{item.label}</span>
                <span className="text-sm text-gray-700 font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Property Description Section */}
        <div className="px-5 py-8 bg-gray-50/30">
          <h2 className="text-lg font-bold text-[#4B2F5D] mb-4">Property Description</h2>
          <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
            {descriptionTable.map((item, idx) => (
              <div key={idx} className="flex border-b last:border-0 border-gray-50 items-start">
                <div className="w-[35%] px-4 py-4 bg-white">
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{item.label}</span>
                </div>
                <div className="flex-1 px-4 py-4 border-l border-gray-50">
                  <span className="text-[13px] text-gray-800 font-semibold leading-relaxed">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extra spacing for footer */}
        <div className="h-24"></div>
      </div>

      {/* Floating Bottom Actions (Inside Frame Look) */}
      <div className="absolute bottom-6 left-4 right-4 p-3 bg-white/80 backdrop-blur-lg flex gap-3 z-40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/20">
        <button
          onClick={() => {
            const isConfirmed = localStorage.getItem('hp_fraud_alert_confirmed') === 'true';
            const sessionCount = parseInt(sessionStorage.getItem('hp_fraud_alert_count') || '0');
            console.log('Fraud Alert Triggered:', { isConfirmed, sessionCount });

            if (isConfirmed || sessionCount >= 5) {
              setShowPhoneNumber(true);
            } else {
              setIsFraudAlertOpen(true);
              sessionStorage.setItem('hp_fraud_alert_count', (sessionCount + 1).toString());
            }
          }}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 h-12 border-2 border-[#2FED9A] text-[#2FED9A] rounded-xl font-bold tracking-wide transition-colors active:bg-teal-50 bg-white/50"
        >
          <span className="text-sm">{showPhoneNumber ? property.owner.contact : 'Get Phone No'}</span>
          {showPhoneNumber && (
            <span className="text-[8px] font-black uppercase tracking-tighter opacity-70">
              {property.owner.verified ? 'Verified ✓' : 'Unverified Listing'}
            </span>
          )}
        </button>
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 h-12 bg-[#2FED9A] text-white rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-primary/20 transition-transform active:scale-95"
        >
          Contact Owner
        </button>
      </div>

      <FraudAlertModal
        isOpen={isFraudAlertOpen}
        onClose={() => setIsFraudAlertOpen(false)}
        onConfirm={() => {
          localStorage.setItem('hp_fraud_alert_confirmed', 'true');
          setIsFraudAlertOpen(false);
          setShowPhoneNumber(true);
          // Trigger actual call after a tiny delay to show number change
          setTimeout(() => {
            window.location.href = `tel:${property.owner.contact}`;
          }, 100);
        }}
        phoneNumber={property.owner.contact}
        isVerified={property.owner.verified}
      />

      <ContactOwnerModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        ownerDetails={{
          name: property.owner.name,
          email: `${property.owner.name.toLowerCase().replace(' ', '')}@gmail.com`,
          contact: property.owner.contact
        }}
        onSubmit={(data) => {
          console.log('Lead Captured:', data);
          setIsContactModalOpen(false);
          // Proceed to chat after short delay
          setTimeout(() => {
            onStartChat(property.id, property.owner);
          }, 300);
        }}
      />
    </motion.div>
  );
};
