
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, PlusSquare, Heart, User, Bell, MapPin, SlidersHorizontal, ChevronRight, Search as SearchIcon, MessageSquare, BadgeDollarSign, Palette, Scale, BarChart3, ShieldCheck, Users, FileCheck, ArrowRight, Plus, Menu } from 'lucide-react';
import { PropertyDetails } from './screens/PropertyDetails';
import { AddProperty } from './screens/AddProperty';
import { ChatListScreen, ChatDetailScreen } from './screens/Chat';
import { MyListings } from './screens/MyListings';
import { SettingsScreen } from './screens/Settings';
import { EditProfileScreen } from './screens/EditProfile';
import { ChangePasswordScreen } from './screens/ChangePassword';
import { MySubscriptionScreen } from './screens/MySubscription';
import { OrdersScreen } from './screens/Orders';
import { SearchScreen } from './screens/Search';
import { SplashScreen } from './screens/Splash';
import { AuthScreen } from './screens/Auth';
import { DashboardScreen } from './screens/Dashboard';
import { InsightsScreen } from './screens/Insights';
import { HomeLoanScreen } from './screens/HomeLoan';
import { AdvertiseScreen } from './screens/Advertise';
import { SearchAgentsScreen } from './screens/SearchAgents';
import { CostCalculatorScreen } from './screens/CostCalculator';
import { CalculatorsScreen } from './screens/Calculators';
import { SubscriptionScreen } from './screens/Subscription';
import { Input, Badge, SectionHeader, Button } from './components/UI';
import { Drawer } from './components/Drawer';
import { Property, ChatSession, ChatMessage } from './types';

// Mock Data
export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Villa with Pool',
    price: 450000,
    type: 'Villa',
    bhk: 4,
    area: 3200,
    address: '12 Palm Grove',
    city: 'Beverly Hills',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop'],
    description: 'A stunning contemporary villa featuring a private infinity pool, expansive garden, and state-of-the-art home automation.',
    features: ['Pool', 'Garden', 'Smart Home', 'Garage'],
    isFeatured: true,
    owner: { id: 'o1', name: 'Sarah Connor', contact: '555-0192', verified: true, avatar: 'https://picsum.photos/100/100?random=10' },
    coordinates: { lat: 34.0736, lng: -118.4004 }
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    price: 280000,
    type: 'Apartment',
    bhk: 2,
    area: 1450,
    address: '45 Market St',
    city: 'San Francisco',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'],
    description: 'Luxurious penthouse with panoramic city views, floor-to-ceiling windows, and premium amenities including a rooftop gym.',
    features: ['View', 'Gym', 'Concierge', 'Elevator'],
    isFeatured: true,
    owner: { id: 'o2', name: 'John Wick', contact: '555-0199', verified: true, avatar: 'https://picsum.photos/100/100?random=11' },
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: '3',
    title: 'Cozy Suburban Home',
    price: 150000,
    type: 'Apartment',
    bhk: 3,
    area: 1800,
    address: '88 Maple Ave',
    city: 'Austin',
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop'],
    description: 'Perfect family home located near top-rated schools. Features a large backyard and newly renovated kitchen.',
    features: ['Backyard', 'School Nearby', 'Renovated'],
    isFeatured: true,
    owner: { id: 'o3', name: 'Elena Gilbert', contact: '555-0123', verified: false, avatar: 'https://picsum.photos/100/100?random=12' },
    coordinates: { lat: 30.2672, lng: -97.7431 }
  },
  {
    id: '4',
    title: 'Grand Family Estate',
    price: 850000,
    type: 'Villa',
    bhk: 5,
    area: 4500,
    address: '12 Ocean Dr',
    city: 'Miami',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'],
    description: 'Expansive estate with private beach access and lush tropical gardens. Includes a guest house and 3-car garage.',
    features: ['Beach Access', 'Pool', 'Guest House', 'Security'],
    isFeatured: true,
    owner: { id: 'o4', name: 'Michael Bay', contact: '555-0001', verified: true, avatar: 'https://picsum.photos/100/100?random=13' },
    coordinates: { lat: 25.7617, lng: -80.1918 }
  },
  {
    id: '5',
    title: 'Modern Urban Loft',
    price: 320000,
    type: 'Apartment',
    bhk: 1,
    area: 950,
    address: '101 Pine St',
    city: 'Seattle',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop'],
    description: 'Chic loft in the heart of the city with industrial design, high ceilings, and exposed brick walls.',
    features: ['City View', 'Gym', 'Concierge', 'Pet Friendly'],
    isFeatured: true,
    owner: { id: 'o5', name: 'Jessica Day', contact: '555-0002', verified: true, avatar: 'https://picsum.photos/100/100?random=14' },
    coordinates: { lat: 47.6062, lng: -122.3321 }
  },
  {
    id: '6',
    title: 'Tech Hub Office Space',
    price: 550000,
    type: 'Commercial',
    bhk: 0,
    area: 2200,
    address: '500 Silicon Way',
    city: 'San Jose',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'],
    description: 'Prime commercial space fully furnished, ready for startups. Includes conference rooms and break areas.',
    features: ['Conference Room', 'Parking', 'Cafeteria', 'High Speed Internet'],
    isFeatured: true,
    owner: { id: 'o6', name: 'David Lee', contact: '555-0003', verified: false, avatar: 'https://picsum.photos/100/100?random=15' },
    coordinates: { lat: 37.3382, lng: -121.8863 }
  },
  {
    id: '7',
    title: 'Luxury Lake House',
    price: 1250000,
    type: 'Villa',
    bhk: 4,
    area: 3800,
    address: '77 Lakeview Blvd',
    city: 'Austin',
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop'],
    description: 'Breathtaking lakefront property with private dock and boat house. Perfect for weekend getaways.',
    features: ['Waterfront', 'Dock', 'Fireplace', 'Deck'],
    isFeatured: true,
    owner: { id: 'o7', name: 'Robert Stark', contact: '555-0004', verified: true, avatar: 'https://picsum.photos/100/100?random=16' },
    coordinates: { lat: 30.2672, lng: -97.7431 }
  }
];

// User's listings (Mock)
const USER_PROPERTIES: Property[] = [
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
  // ... more items if needed
];

// News Data
const NEWS_ITEMS = [
  {
    id: 1,
    title: 'The Chintels Paradiso Crisis: A Turning Point in Real Estate Safety',
    date: 'February 21, 2025',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Noida Seals Four Major Housing Projects Due to Violation',
    date: 'January 12, 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Great Days Ahead for Indian Real Estate: Foreign Investments',
    date: 'January 12, 2025',
    image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'YEIDA Unveils New Residential Plot Scheme Near Noida Airport',
    date: 'January 11, 2025',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop'
  }
];

const TESTIMONIALS = [
  {
    name: 'Anamika',
    location: 'India',
    quote: "Hunt Property is amazing. I was quite nervous about the process of selling my first house, considering I was overseas for the entire process. The team walked me through step-by-step."
  },
  {
    name: 'Amit Sharma',
    location: 'New Delhi',
    quote: "I would like to thank Mr. Tejasvi Kapoor for his valued assistance in bringing this sale to completion. I have been so impressed with his approachability and professionalism."
  },
  {
    name: 'Nem Chand Sanghvi',
    location: 'India',
    quote: "We were looking for an apartment in Noida Extension. We were convinced with the quality of services provided. We made the right choice!"
  }
];


// --- Components ---

const PropertyCard: React.FC<{ property: Property, compact?: boolean, index?: number }> = ({ property, compact, index = 0 }) => (
  <Link to={`/property/${property.id}`} className="block h-full">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -2, boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex-shrink-0 ${compact ? 'w-72' : 'w-full mb-4'} transition-shadow hover:shadow-lg h-full flex flex-col`}
    >
      <div className="relative h-40 bg-gray-200 shrink-0">
        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
          <span className="text-primary">★</span> 4.8
        </div>
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded-lg text-xs font-medium text-white">
          {property.bhk} BHK • {property.type}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-gray-900 truncate pr-2 text-sm">{property.title}</h3>
            <Badge color="bg-green-50 text-green-700">Sell</Badge>
          </div>
          <div className="flex items-center text-gray-500 text-xs mb-2">
            <MapPin size={12} className="mr-1" />
            {property.city}
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-2">
          <p className="font-bold text-primary text-lg">${(property.price/1000).toFixed(0)}k</p>
          <div className="flex items-center gap-2">
             <span className="text-xs text-gray-400">View Details</span>
             <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
               <ArrowRight size={12} className="text-gray-400" />
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);

const BottomNav = () => {
  const location = useLocation();
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: PlusSquare, label: 'Add', path: '/add' },
    { icon: Heart, label: 'Saved', path: '/saved' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isTabActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/profile') return ['/profile', '/dashboard', '/settings', '/my-listings'].some(p => location.pathname.startsWith(p));
    return location.pathname.startsWith(path);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center h-[80px] px-2 sm:px-6 max-w-[500px] mx-auto w-full">
        {navItems.map((item) => {
          const isActive = isTabActive(item.path);
          
          return (
            <Link 
              key={item.label} 
              to={item.path} 
              className="flex-1 flex flex-col items-center justify-center h-full gap-1 group min-w-[64px]"
            >
              <div className="relative flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute bg-[#d4fce5] rounded-full w-16 h-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                
                <div className="relative z-10">
                  <item.icon 
                    size={24} 
                    className={`transition-colors duration-200 ${isActive ? 'text-[#005c34]' : 'text-gray-500 group-hover:text-gray-700'}`} 
                    strokeWidth={isActive ? 2.5 : 2}
                    fill={isActive ? "currentColor" : "none"}
                    fillOpacity={isActive ? 0.2 : 0}
                  />
                </div>
              </div>
              <span className={`text-[12px] font-medium transition-colors duration-200 ${isActive ? 'text-[#005c34] font-bold' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const HomeScreen: React.FC<{ unreadCount: number, onOpenDrawer: () => void }> = ({ unreadCount, onOpenDrawer }) => {
  const [searchType, setSearchType] = useState<'Buy' | 'Rent' | 'Sell'>('Buy');
  const navigate = useNavigate();

  const banners = [
    { 
      title: "Find Your Dream Home", 
      sub: "Explore over 5,000+ properties", 
      cta: "Explore Now", 
      img: "https://images.unsplash.com/photo-1600596542815-faad4c1539a9?q=80&w=800&auto=format&fit=crop",
      link: "/search"
    },
    { 
      title: "Post Your Property", 
      sub: "Get the best price in the market", 
      cta: "Post Ad", 
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
      link: "/add"
    },
    { 
      title: "Premium Interiors", 
      sub: "Transform your space today", 
      cta: "Learn More", 
      img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
      link: "/search"
    },
  ];

  const services = [
    { icon: BadgeDollarSign, label: 'Home Loan', color: 'text-blue-600', bg: 'bg-blue-50', link: '/home-loan' },
    { icon: Palette, label: 'Interiors', color: 'text-purple-600', bg: 'bg-purple-50', link: '/search' },
    { icon: Scale, label: 'Legal Aid', color: 'text-green-600', bg: 'bg-green-50', link: '/search' },
    { icon: BarChart3, label: 'Valuation', color: 'text-orange-600', bg: 'bg-orange-50', link: '/search' },
  ];

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white px-5 pt-8 pb-4 sticky top-0 z-30 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
             <button onClick={onOpenDrawer} className="p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-gray-700">
                <Menu size={22} />
             </button>
             <div>
               <p className="text-xs text-gray-400 font-medium">LOCATION</p>
               <div className="flex items-center font-bold text-gray-800 text-sm cursor-pointer">
                 Beverly Hills, CA <ChevronRight size={14} />
               </div>
             </div>
          </div>
          <div className="flex gap-2">
            <Link to="/chats" className="p-2 bg-gray-50 rounded-full relative hover:bg-gray-100 transition-colors">
              <MessageSquare size={20} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-primary border-2 border-white rounded-full"></span>
              )}
            </Link>
            <div className="p-2 bg-gray-50 rounded-full relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
           <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
           <input 
             type="text" 
             placeholder="Buy / Rent / Sell your property..." 
             className="w-full bg-gray-50 text-gray-800 pl-12 pr-12 py-3.5 rounded-xl border border-gray-100 outline-none focus:border-primary transition-colors shadow-sm"
           />
           <button onClick={() => navigate('/search')} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-1.5 rounded-lg shadow-sm border border-gray-100">
             <SlidersHorizontal size={16} className="text-gray-600" />
           </button>
        </div>

        {/* Quick Toggles */}
        <div className="bg-gray-100 p-1 rounded-xl flex">
          {['Buy', 'Rent', 'Sell'].map((type) => (
            <button
              key={type}
              onClick={() => setSearchType(type as any)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                searchType === type 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8 pt-6">
        
        {/* Hero Carousel */}
        <div className="px-5">
           <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-5 px-5">
              {banners.map((banner, idx) => (
                <div key={idx} className="snap-center shrink-0 w-full relative rounded-2xl overflow-hidden h-48 shadow-md group">
                   <img src={banner.img} alt={banner.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6">
                      <h2 className="text-white font-bold text-xl mb-1 max-w-[70%]">{banner.title}</h2>
                      <p className="text-gray-200 text-xs mb-4">{banner.sub}</p>
                      <Button 
                        variant="primary" 
                        onClick={() => navigate(banner.link)} 
                        className="w-fit py-2 px-4 text-xs h-auto"
                      >
                        {banner.cta}
                      </Button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Quick Services Grid */}
        <div className="px-5">
          <h3 className="font-bold text-lg text-gray-900 mb-4">All-in-one Realty Services</h3>
          <div className="grid grid-cols-2 gap-3">
            {services.map((s, i) => (
              <div 
                key={i} 
                onClick={() => navigate(s.link)}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`p-2.5 rounded-xl ${s.bg} ${s.color}`}>
                  <s.icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">{s.label}</p>
                  <p className="text-[10px] text-gray-400">Expert Help</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Properties */}
        <div className="px-5">
          <SectionHeader title="Featured Properties" action={<Link to="/search" className="text-primary text-xs font-bold">See All</Link>} />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
            {MOCK_PROPERTIES.filter(p => p.isFeatured).map((p, idx) => (
              <PropertyCard key={p.id} property={p} compact index={idx} />
            ))}
             {/* See More Card */}
             <Link to="/search" className="w-24 shrink-0 flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-colors mb-4">
               <div className="p-2 bg-gray-50 rounded-full mb-2 group-hover:bg-primary/10">
                 <ArrowRight size={20} />
               </div>
               <span className="text-xs font-bold">See All</span>
             </Link>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="px-5">
           <h3 className="font-bold text-lg text-gray-900 mb-4">Why Choose Hunt Property?</h3>
           <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex justify-between">
              {[
                { icon: Users, label: 'Trusted Experts' },
                { icon: FileCheck, label: 'Transparent Deals' },
                { icon: ShieldCheck, label: 'End-to-End Service' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                   <div className="p-3 bg-primary/10 text-primary rounded-full">
                     <item.icon size={24} />
                   </div>
                   <span className="text-[10px] font-bold text-gray-700 w-16 leading-tight">{item.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Latest News */}
        <div className="px-5">
          <SectionHeader 
            title="Real Estate Insights" 
            action={
              <button onClick={() => navigate('/insights')} className="text-xs font-bold text-primary hover:underline">
                View Blog
              </button>
            } 
          />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
            {NEWS_ITEMS.map(news => (
              <div key={news.id} onClick={() => navigate('/insights')} className="w-64 shrink-0 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-32 relative">
                   <img src={news.image} alt="" className="w-full h-full object-cover" />
                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                     <span className="text-[10px] text-white font-medium bg-primary px-2 py-0.5 rounded-md text-black">News</span>
                   </div>
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-gray-400 mb-1">{news.date}</p>
                  <h4 className="font-bold text-sm text-gray-900 line-clamp-2 leading-tight mb-2">{news.title}</h4>
                  <span className="text-[10px] font-bold text-primary flex items-center gap-1">Read More <ArrowRight size={10} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="px-5 pb-4">
           <h3 className="font-bold text-lg text-gray-900 mb-4">What People Say</h3>
           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="w-72 shrink-0 bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-2xl text-white shadow-lg relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                     <MessageSquare size={64} />
                   </div>
                   <p className="text-xs text-gray-300 leading-relaxed italic mb-4 relative z-10">"{t.quote}"</p>
                   <div className="flex items-center gap-3 relative z-10">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black font-bold text-xs">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{t.name}</p>
                        <p className="text-[10px] text-gray-400">{t.location}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Footer CTA */}
        <div className="px-5 pb-8">
           <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Selling or Renting?</h3>
              <p className="text-sm text-gray-600 mb-4 max-w-[250px] mx-auto">Post your property for free and reach thousands of potential buyers today.</p>
              <Button fullWidth onClick={() => navigate('/add')} className="shadow-lg shadow-primary/20">
                Post Your Property
              </Button>
           </div>
           <p className="text-center text-[10px] text-gray-400 mt-8 mb-4">HuntProperty © 2025. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};

const SavedScreen = ({ shortlisted }: { shortlisted: string[] }) => (
  <div className="h-full overflow-y-auto no-scrollbar pt-8 px-5 pb-24 bg-white">
     <h1 className="text-2xl font-bold mb-6">Shortlisted ({shortlisted.length})</h1>
     {shortlisted.length === 0 ? (
       <div className="text-center py-20 text-gray-400">
         <Heart size={48} className="mx-auto mb-4 opacity-20" />
         <p>No properties saved yet.</p>
       </div>
     ) : (
       <div className="space-y-4">
         {MOCK_PROPERTIES.filter(p => shortlisted.includes(p.id)).map((p, idx) => (
           <PropertyCard key={p.id} property={p} index={idx} />
         ))}
       </div>
     )}
  </div>
);

// Wrapper manages global state and routing
const Wrapper = ({ onLogout }: { onLogout: () => void }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  const [chats, setChats] = useState<ChatSession[]>([
    {
      id: 'c1',
      owner: { id: 'o1', name: 'Sarah Connor', avatar: 'https://picsum.photos/100/100?random=10' },
      messages: [
        { id: 'm1', text: 'Hello! Is the villa still available?', sender: 'user', timestamp: Date.now() - 3600000, isRead: true },
        { id: 'm2', text: 'Yes, it is available for viewing this weekend.', sender: 'other', timestamp: Date.now() - 1800000, isRead: false }
      ],
      lastUpdated: Date.now(),
    }
  ]);
  
  const navigate = useNavigate();

  const toggleShortlist = (id: string) => {
    setShortlisted(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const startChat = (propertyId: string, owner: { id: string, name: string, avatar: string }) => {
    const existingChat = chats.find(c => c.owner.id === owner.id);
    if (existingChat) {
      navigate(`/chat/${existingChat.id}`);
    } else {
      const newChat: ChatSession = {
        id: 'c' + Date.now(),
        propertyId,
        owner,
        messages: [],
        lastUpdated: Date.now()
      };
      setChats(prev => [newChat, ...prev]);
      navigate(`/chat/${newChat.id}`);
    }
  };

  const sendMessage = (chatId: string, text: string) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const newMsg: ChatMessage = {
          id: 'msg' + Date.now(),
          text,
          sender: 'user',
          timestamp: Date.now(),
          isRead: true
        };
        setTimeout(() => {
          setChats(currentChats => currentChats.map(c => {
            if (c.id === chatId) {
              return {
                ...c,
                messages: [...c.messages, {
                  id: 'msg_reply' + Date.now(),
                  text: "Thanks for your message! I'll get back to you shortly.",
                  sender: 'other',
                  timestamp: Date.now(),
                  isRead: false
                }]
              };
            }
            return c;
          }));
        }, 2000);
        return { ...chat, messages: [...chat.messages, newMsg], lastUpdated: Date.now() };
      }
      return chat;
    }));
  };

  return (
    <>
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<><HomeScreen onOpenDrawer={() => setIsDrawerOpen(true)} unreadCount={chats.reduce((acc, c) => acc + (c.messages[c.messages.length-1]?.sender === 'other' && !c.messages[c.messages.length-1]?.isRead ? 1 : 0), 0)} /><BottomNav /></>} />
        <Route path="/search" element={<><SearchScreen properties={MOCK_PROPERTIES} /><BottomNav /></>} />
        <Route path="/saved" element={<><SavedScreen shortlisted={shortlisted} /><BottomNav /></>} />
        <Route path="/profile" element={<><DashboardScreen /><BottomNav /></>} />
        <Route path="/dashboard" element={<><DashboardScreen /><BottomNav /></>} />
        <Route path="/property/:id" element={<PropertyDetails properties={MOCK_PROPERTIES} toggleShortlist={toggleShortlist} shortlisted={shortlisted} onStartChat={startChat} />} />
        <Route path="/add" element={<AddProperty properties={USER_PROPERTIES} />} />
        <Route path="/chats" element={<ChatListScreen chats={chats} />} />
        <Route path="/chat/:id" element={<ChatDetailScreen chats={chats} onSendMessage={sendMessage} />} />
        <Route path="/my-listings" element={<MyListings properties={USER_PROPERTIES} />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/edit-profile" element={<EditProfileScreen />} />
        <Route path="/change-password" element={<ChangePasswordScreen />} />
        <Route path="/my-subscription" element={<MySubscriptionScreen />} />
        <Route path="/orders" element={<OrdersScreen />} />
        <Route path="/edit/:id" element={<AddProperty properties={USER_PROPERTIES} />} />
        <Route path="/insights" element={<InsightsScreen />} />
        <Route path="/home-loan" element={<HomeLoanScreen />} />
        <Route path="/advertise" element={<AdvertiseScreen />} />
        <Route path="/search-agents" element={<SearchAgentsScreen />} />
        <Route path="/cost-calculator" element={<CostCalculatorScreen />} />
        <Route path="/calculators" element={<CalculatorsScreen />} />
        <Route path="/subscription" element={<SubscriptionScreen />} />
      </Routes>
    </>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#eef2f6] flex items-center justify-center font-sans">
        <div className="w-full h-[100dvh] sm:w-[360px] sm:h-[800px] bg-white sm:rounded-[32px] shadow-2xl overflow-hidden relative flex flex-col border-[6px] border-gray-900/5">
          <AnimatePresence mode='wait'>
            {showSplash ? (
              <motion.div 
                key="splash"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                <SplashScreen onFinish={handleSplashFinish} />
              </motion.div>
            ) : !isAuthenticated ? (
              <motion.div 
                key="auth"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full"
              >
                <AuthScreen onLogin={handleLogin} />
              </motion.div>
            ) : (
               <motion.div 
                key="app"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                <Wrapper onLogout={handleLogout} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </HashRouter>
  );
}
