
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Eye, MessageCircle, Heart, Edit2, Trash2, Rocket, MoreVertical, AlertCircle, Layers, X, Check, Zap, Star, Crown } from 'lucide-react';
import { Property } from '../types';
import { Button, Badge } from '../components/UI';

// Mock Data specific to User's Listings
const MY_PROPERTIES: Property[] = [
  {
    id: 'mp1',
    title: 'Green Valley Apartment',
    price: 250000,
    type: 'Apartment',
    bhk: 3,
    area: 1500,
    address: '45 Green Way',
    city: 'Austin',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop'],
    description: 'Spacious apartment with great views of the valley.',
    features: ['Balcony'],
    owner: { id: 'me', name: 'Me', contact: '', verified: true, avatar: '' },
    coordinates: { lat: 0, lng: 0 },
    status: 'Active',
    stats: { views: 1240, leads: 12, saved: 45 },
    createdAt: Date.now() - 86400000 * 2
  },
  {
    id: 'mp2',
    title: 'Sunrise Villa Plot',
    price: 120000,
    type: 'Plot',
    bhk: 0,
    area: 2400,
    address: 'Sector 4',
    city: 'Austin',
    images: ['https://images.unsplash.com/photo-1524813686514-a5756c97759e?q=80&w=800&auto=format&fit=crop'],
    description: 'Corner plot facing the park.',
    features: [],
    owner: { id: 'me', name: 'Me', contact: '', verified: true, avatar: '' },
    coordinates: { lat: 0, lng: 0 },
    status: 'Pending',
    stats: { views: 45, leads: 0, saved: 2 },
    createdAt: Date.now() - 3600000
  },
  {
    id: 'mp3',
    title: 'Old Town Studio',
    price: 90000,
    type: 'Apartment',
    bhk: 1,
    area: 600,
    address: 'Main St',
    city: 'Austin',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop'],
    description: 'Cozy studio in the heart of the city.',
    features: [],
    owner: { id: 'me', name: 'Me', contact: '', verified: true, avatar: '' },
    coordinates: { lat: 0, lng: 0 },
    status: 'Rejected',
    stats: { views: 10, leads: 0, saved: 0 },
    createdAt: Date.now() - 86400000 * 10
  }
];

interface BoostPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  benefits: string[];
  icon: any;
  color: string;
  accent: string;
}

const BOOST_PLANS: BoostPlan[] = [
  {
    id: 'basic',
    name: 'Starter',
    price: 9,
    duration: '3 Days',
    benefits: ['Highlighted Border', 'Standard Visibility'],
    icon: Zap,
    color: 'bg-blue-100',
    accent: 'text-blue-600'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 29,
    duration: '7 Days',
    benefits: ['Top of Search', 'Email Newsletter', 'Verified Badge'],
    icon: Star,
    color: 'bg-yellow-100',
    accent: 'text-yellow-600'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 99,
    duration: '30 Days',
    benefits: ['Homepage Spotlight', 'Social Media Ad', 'Premium Support'],
    icon: Crown,
    color: 'bg-purple-100',
    accent: 'text-purple-600'
  }
];

interface Props {
  properties?: Property[];
}

export const MyListings: React.FC<Props> = ({ properties = MY_PROPERTIES }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | 'Active' | 'Pending' | 'Rejected' | 'Expired'>('All');
  const [listings, setListings] = useState<Property[]>(properties);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  
  // Boost State
  const [showBoostModal, setShowBoostModal] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState('gold');
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredListings = filter === 'All' 
    ? listings 
    : listings.filter(p => p.status === filter);

  const handleDelete = () => {
    if (showDeleteModal) {
      setListings(prev => prev.filter(p => p.id !== showDeleteModal));
      setShowDeleteModal(null);
    }
  };

  const handleBoostClick = (id: string) => {
    setShowBoostModal(id);
    setSelectedPlan('gold'); // Default
  };

  const confirmBoost = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowBoostModal(null);
      alert("Boost Activated! Your property is now being promoted.");
    }, 2000);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      // Using exact requested hex codes
      case 'Active': return 'bg-[#2FED9A] text-black shadow-md'; 
      case 'Pending': return 'bg-[#FFB900] text-black shadow-md'; 
      case 'Rejected': return 'bg-[#FF4E4E] text-white shadow-md'; 
      case 'Expired': return 'bg-[#7C7C7C] text-white shadow-md'; 
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-gray-50 relative">
      {/* Header */}
      <div className="sticky top-0 bg-white z-20 px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/profile')} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="font-bold text-xl text-gray-900">My Listings</h1>
        </div>
        <button 
          onClick={() => navigate('/add')}
          className="bg-black text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-transform shadow-lg shadow-black/20"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white px-4 pb-4 pt-1 border-b border-gray-100 sticky top-[72px] z-10 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {['All', 'Active', 'Pending', 'Rejected', 'Expired'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                filter === tab 
                  ? 'bg-primary text-text shadow-md shadow-primary/20' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24 space-y-4">
        {filteredListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Layers size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-[200px]">
              You haven't posted any properties in this category yet.
            </p>
            <Button onClick={() => navigate('/add')}>Add Property Now</Button>
          </div>
        ) : (
          filteredListings.map((property) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100"
            >
              {/* Card Header */}
              <div className="flex gap-3 mb-3">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <img 
                    src={property.images[0]} 
                    alt={property.title} 
                    className="w-full h-full object-cover rounded-xl" 
                  />
                  <div className={`absolute top-2 left-2 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider z-10 ${getStatusColor(property.status)}`}>
                    {property.status}
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                   <div>
                     <h3 className="font-bold text-gray-900 text-sm truncate mb-0.5">{property.title}</h3>
                     <p className="text-xs text-gray-500 truncate">{property.address}, {property.city}</p>
                   </div>
                   <div>
                     <p className="text-primary font-bold text-base">${(property.price / 1000).toFixed(1)}k</p>
                     <p className="text-[10px] text-gray-400">Posted on {new Date(property.createdAt || Date.now()).toLocaleDateString()}</p>
                   </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                   <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-full">
                     <MoreVertical size={16} />
                   </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex items-center justify-between bg-card rounded-xl p-3 mb-3 border border-blue-50">
                <div className="flex items-center gap-1.5">
                  <Eye size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-gray-700">{property.stats?.views || 0}</span>
                  <span className="text-[10px] text-gray-400">Views</span>
                </div>
                <div className="w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle size={14} className="text-primary" />
                  <span className="text-xs font-bold text-gray-700">{property.stats?.leads || 0}</span>
                  <span className="text-[10px] text-gray-400">Leads</span>
                </div>
                <div className="w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-1.5">
                  <Heart size={14} className="text-red-400" />
                  <span className="text-xs font-bold text-gray-700">{property.stats?.saved || 0}</span>
                  <span className="text-[10px] text-gray-400">Saves</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-4 gap-2">
                <button 
                   onClick={() => navigate(`/property/${property.id}`)}
                   className="col-span-1 flex flex-col items-center justify-center py-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Eye size={16} className="mb-1" />
                  <span className="text-[10px] font-medium">View</span>
                </button>
                <button 
                   onClick={() => navigate(`/edit/${property.id}`)}
                   className="col-span-1 flex flex-col items-center justify-center py-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Edit2 size={16} className="mb-1" />
                  <span className="text-[10px] font-medium">Edit</span>
                </button>
                <button 
                   onClick={() => setShowDeleteModal(property.id)}
                   className="col-span-1 flex flex-col items-center justify-center py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} className="mb-1" />
                  <span className="text-[10px] font-medium">Delete</span>
                </button>
                <button 
                  onClick={() => handleBoostClick(property.id)}
                  className="col-span-1 flex flex-col items-center justify-center py-2 rounded-xl bg-primary text-text shadow-md shadow-primary/20 hover:brightness-95 transition-all"
                >
                  <Rocket size={16} className="mb-1" />
                  <span className="text-[10px] font-bold">Boost</span>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowDeleteModal(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-xs relative z-10 shadow-2xl"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto text-red-500">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Delete Listing?</h3>
              <p className="text-center text-sm text-gray-500 mb-6">
                Are you sure you want to delete this property? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 py-3 bg-gray-100 rounded-xl font-semibold text-sm text-gray-600"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="flex-1 py-3 bg-red-500 rounded-xl font-semibold text-sm text-white shadow-lg shadow-red-200"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Boost Modal */}
      <AnimatePresence>
        {showBoostModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowBoostModal(null)}
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                   <h2 className="text-xl font-bold">Boost Property</h2>
                   <p className="text-sm text-gray-500">Rank higher & get more leads</p>
                </div>
                <button onClick={() => setShowBoostModal(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {BOOST_PLANS.map(plan => (
                  <div 
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                      selectedPlan === plan.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                       <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${plan.color} ${plan.accent}`}>
                            <plan.icon size={20} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{plan.name}</h3>
                            <p className="text-xs text-gray-500">{plan.duration}</p>
                          </div>
                       </div>
                       <div className="text-right">
                         <p className="font-bold text-lg">${plan.price}</p>
                       </div>
                    </div>
                    <div className="space-y-1 pl-[52px]">
                       {plan.benefits.map((b, i) => (
                         <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                           <Check size={12} className="text-green-500" /> {b}
                         </div>
                       ))}
                    </div>
                    {selectedPlan === plan.id && (
                      <div className="absolute top-4 right-4 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check size={12} className="text-black" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                 <Button fullWidth onClick={confirmBoost} disabled={isProcessing}>
                   {isProcessing ? 'Processing Payment...' : `Proceed to Pay $${BOOST_PLANS.find(p => p.id === selectedPlan)?.price}`}
                 </Button>
                 <p className="text-center text-[10px] text-gray-400 mt-3">
                   Secure payment processed via Stripe. By continuing you agree to terms.
                 </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
