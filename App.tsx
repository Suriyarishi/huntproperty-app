
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, PlusSquare, PlusCircle, Heart, User, Bell, MapPin, SlidersHorizontal, ChevronRight, Search as SearchIcon, MessageSquare, BadgeDollarSign, Palette, Scale, BarChart3, ShieldCheck, Users, FileCheck, ArrowRight, Plus, Menu, Building2 } from 'lucide-react';
import { PropertyDetails } from './screens/PropertyDetails';
import { AddProperty } from './screens/AddProperty';
import { AddProject } from './screens/AddProject';
import { AddCommercialProject } from './screens/AddCommercialProject';
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
import { ResidentialScreen } from './screens/Residential';
import { CommercialScreen } from './screens/Commercial';
import { ProjectsScreen } from './screens/Projects';
import { CityProjectsScreen } from './screens/CityProjects';
import { ProjectAnalysisScreen } from './screens/ProjectAnalysis';
import { BuilderProjectsScreen } from './screens/BuilderProjects';
import { CompareProjectsScreen } from './screens/CompareProjects';
import { UnitDetailsScreen } from './screens/UnitDetails';
import { ContactsResponsesScreen } from './screens/ContactsResponses';
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
    city: 'Anna Nagar, Chennai',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop'],
    description: 'A stunning contemporary villa featuring a private infinity pool, expansive garden, and state-of-the-art home automation.',
    features: ['Pool', 'Garden', 'Smart Home', 'Garage'],
    isFeatured: true,
    owner: { id: 'o1', name: 'Sarah Connor', contact: '555-0192', verified: true, avatar: 'https://picsum.photos/100/100?random=10' },
    coordinates: { lat: 13.0850, lng: 80.2101 }
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    price: 280000,
    type: 'Apartment',
    bhk: 2,
    area: 1450,
    address: '45 Market St',
    city: 'Nungambakkam, Chennai',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'],
    description: 'Luxurious penthouse with panoramic city views, floor-to-ceiling windows, and premium amenities including a rooftop gym.',
    features: ['View', 'Gym', 'Concierge', 'Elevator'],
    isFeatured: true,
    owner: { id: 'o2', name: 'John Wick', contact: '555-0199', verified: true, avatar: 'https://picsum.photos/100/100?random=11' },
    coordinates: { lat: 13.0588, lng: 80.2435 }
  },
  {
    id: '3',
    title: 'Fully furnished flat',
    price: 15000,
    type: 'Apartment',
    bhk: 3,
    area: 1800,
    address: '88 Maple Ave',
    city: 'Anna Nagar, Chennai',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400&auto=format&fit=crop'],
    description: 'Perfect family home located near top-rated schools. Features a large backyard and newly renovated kitchen.',
    features: ['Backyard', 'School Nearby', 'Renovated'],
    isFeatured: true,
    owner: { id: 'o3', name: 'Elena Gilbert', contact: '555-0123', verified: false, avatar: 'https://picsum.photos/100/100?random=12' },
    coordinates: { lat: 13.0827, lng: 80.2117 }
  },
  {
    id: '4',
    title: 'Grand Family Estate',
    price: 850000,
    type: 'Villa',
    bhk: 5,
    area: 4500,
    address: '12 Ocean Dr',
    city: 'Besant Nagar, Chennai',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'],
    description: 'Expansive estate with private beach access and lush tropical gardens. Includes a guest house and 3-car garage.',
    features: ['Beach Access', 'Pool', 'Guest House', 'Security'],
    isFeatured: true,
    owner: { id: 'o4', name: 'Michael Bay', contact: '555-0001', verified: true, avatar: 'https://picsum.photos/100/100?random=13' },
    coordinates: { lat: 13.0003, lng: 80.2662 }
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
  },
  {
    id: '8',
    title: 'Cozy Mountain Cabin',
    price: 180000,
    type: 'Villa',
    bhk: 2,
    area: 1200,
    address: '42 Pine Ridge',
    city: 'Asheville',
    images: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop'],
    description: 'Rustic wooden cabin with a large stone fireplace and stunning mountain views.',
    features: ['Fireplace', 'Mountain View', 'Deck'],
    isFeatured: true,
    owner: { id: 'o8', name: 'Albus Dumbledore', contact: '555-0005', verified: true, avatar: 'https://picsum.photos/100/100?random=17' },
    coordinates: { lat: 35.5951, lng: -82.5515 }
  },
  {
    id: '9',
    title: 'Sleek Minimalist Condo',
    price: 670000,
    type: 'Apartment',
    bhk: 2,
    area: 1600,
    address: '100 Modern Way',
    city: 'Miami',
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop'],
    description: 'Ultra-modern condo with high-end finishes and floor-to-ceiling windows overlooking the ocean.',
    features: ['Ocean View', 'Pool', 'Gym'],
    isFeatured: true,
    owner: { id: 'o9', name: 'Minerva McGonagall', contact: '555-0006', verified: true, avatar: 'https://picsum.photos/100/100?random=18' },
    coordinates: { lat: 25.7617, lng: -80.1918 }
  },
  {
    id: '10',
    title: 'Historic Townhouse',
    price: 950000,
    type: 'Villa',
    bhk: 4,
    area: 2800,
    address: '123 Heritage Row',
    city: 'Boston',
    images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop'],
    description: 'Beautifully restored townhouse in a historic district with original architectural details.',
    features: ['Garden', 'Fireplace', 'Historic'],
    isFeatured: true,
    owner: { id: 'o10', name: 'Severus Snape', contact: '555-0007', verified: true, avatar: 'https://picsum.photos/100/100?random=19' },
    coordinates: { lat: 42.3601, lng: -71.0589 }
  }
];

const POPULAR_BUILDERS = [
  { id: 'dda', name: 'Delhi Dev. Authority', logo: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=200&auto=format&fit=crop', totalProjects: 191, cityProjects: 52 },
  { id: 'lodha', name: 'Lodha Group', logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop', totalProjects: 145, cityProjects: 38 },
  { id: 'godrej', name: 'Godrej Properties', logo: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=200&auto=format&fit=crop', totalProjects: 112, cityProjects: 24 },
  { id: 'dlf', name: 'DLF Limited', logo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=200&auto=format&fit=crop', totalProjects: 85, cityProjects: 18 }
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

export const PropertyCard: React.FC<{ property: Property, compact?: boolean, index?: number }> = ({ property, compact, index = 0 }) => (
  <Link to={`/property/${property.id}`} className="block h-full">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 shrink-0 ${compact ? 'w-64' : 'w-full mb-4'} transition-all h-full flex flex-col`}
    >
      <div className="relative h-32 bg-gray-100 shrink-0">
        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full shadow-sm">
          <Heart size={14} className="text-gray-600" />
        </button>
      </div>
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-gray-900 truncate pr-2 text-sm">{property.title}</h3>
          <p className="text-[10px] text-gray-500 mb-2 flex items-center gap-1">
            <MapPin size={10} /> {property.city}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-black text-gray-900 text-sm">₹{(property.price / 100000).toFixed(0)}L</p>
          <div className="w-6 h-6 rounded-full bg-[#2FED9A]/10 flex items-center justify-center">
            <ArrowRight size={12} className="text-[#2FED9A]" />
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
    { icon: PlusCircle, label: 'Add', path: '/add' },
    { icon: Heart, label: 'Shortlist', path: '/saved' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isTabActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/profile') return ['/profile', '/dashboard', '/settings', '/my-listings'].some(p => location.pathname.startsWith(p));
    return location.pathname.startsWith(path);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 pb-safe shadow-[0_-8px_20px_-5px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center h-[70px] px-2 sm:px-6 max-w-[500px] mx-auto w-full">
        {navItems.map((item) => {
          const isActive = isTabActive(item.path);

          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex-1 flex flex-col items-center justify-center h-full gap-1 group"
            >
              <div className="relative flex items-center justify-center">
                <item.icon
                  size={20}
                  className={`transition-all duration-300 ${isActive ? 'text-[#2FED9A] scale-110' : 'text-gray-400 group-hover:text-gray-600'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                  fill={isActive ? "currentColor" : "none"}
                  fillOpacity={isActive ? 0.2 : 0}
                />
              </div>
              <span className={`text-[10px] font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-[#2FED9A]' : 'text-gray-400'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute bottom-1 w-1 h-1 bg-[#2FED9A] rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const HomeScreen: React.FC<{ unreadCount: number, onOpenDrawer: () => void }> = ({ unreadCount, onOpenDrawer }) => {
  const [activeCategory, setActiveCategory] = useState('Home');
  const navigate = useNavigate();

  const categories = ['Home', 'Buy', 'Rent', 'Projects', 'Residential', 'Commercial'];

  const onCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'Residential') navigate('/residential');
    if (cat === 'Commercial') navigate('/commercial');
    if (cat === 'Projects') navigate('/projects');
    if (cat === 'Buy' || cat === 'Rent') navigate('/search');
  };

  const services = [
    { icon: <img src="https://img.icons8.com/color/48/home.png" className="w-8 h-8" />, label: 'Home Loan', bg: 'bg-[#EBF5FF]' },
    { icon: <img src="https://img.icons8.com/color/48/calculator.png" className="w-8 h-8" />, label: 'Property Worth Calculator', bg: 'bg-[#EBF5FF]' },
    { icon: <img src="https://img.icons8.com/color/48/compass.png" className="w-8 h-8" />, label: 'Vastu Calculator', bg: 'bg-[#EBF5FF]' },
    { icon: <img src="https://img.icons8.com/color/48/package.png" className="w-8 h-8" />, label: 'Sell/Rent Ad Packages', bg: 'bg-[#EBF5FF]' },
    { icon: <img src="https://img.icons8.com/color/48/handshake.png" className="w-8 h-8" />, label: 'Channel Partner', bg: 'bg-[#EBF5FF]' },
    { icon: <img src="https://img.icons8.com/color/48/legal.png" className="w-8 h-8" />, label: 'Legal Advisory', bg: 'bg-[#EBF5FF]' },
    { icon: <img src="https://img.icons8.com/color/48/organization.png" className="w-8 h-8" />, label: 'NRI Center', bg: 'bg-[#EBF5FF]' },
    { icon: <img src="https://img.icons8.com/color/48/customer-support.png" className="w-8 h-8" />, label: 'ROA Service', bg: 'bg-[#EBF5FF]' },
  ];

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white relative">
      {/* Dynamic Header with Gradient */}
      <div className="bg-gradient-to-b from-[#2FED9A] via-[#2FED9A]/80 to-white px-5 pt-10 pb-4 sticky top-0 z-30">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button onClick={onOpenDrawer} className="text-gray-800">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 bg-[#FF4E4E] rounded-full flex items-center justify-center shadow-lg">
                <MapPin size={18} className="text-white" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg leading-none tracking-tight text-gray-900">HuntProperty</span>
                <span className="text-[8px] font-bold text-gray-600 tracking-[0.2em] uppercase mt-0.5">Search. Buy. Rent. Property.</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <Bell size={24} className="text-gray-800" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF4E4E] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#2FED9A]">2</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by city, area, or project..."
            className="w-full bg-white text-gray-800 pl-11 pr-11 py-3.5 rounded-full border-none outline-none shadow-xl shadow-black/5 text-sm font-medium"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" /></svg>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar -mx-5 px-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryClick(cat)}
              className={`text-sm font-bold whitespace-nowrap pb-2 transition-all relative ${activeCategory === cat ? 'text-gray-900' : 'text-gray-600/70'}`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10 pt-4">
        <div className="px-5">
          <h3 className="font-black text-lg text-gray-900 mb-4">Top Selling Projects in Chennai</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {MOCK_PROPERTIES.slice(0, 5).map((p, idx) => (
              <PropertyCard key={p.id} property={p} compact index={idx} />
            ))}
          </div>
        </div>

        {/* Recommend Your Location */}
        <div className="px-5">
          <h3 className="font-black text-lg text-gray-900 mb-4">Recommend Your Location</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {MOCK_PROPERTIES.slice(5, 10).map((p, idx) => (
              <PropertyCard key={p.id} property={p} compact index={idx} />
            ))}
          </div>
        </div>

        {/* Property for Rent */}
        <div className="px-5">
          <h3 className="font-black text-lg text-gray-900 mb-4">Property for Rent</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {MOCK_PROPERTIES.filter(p => [1500000, 280000].includes(p.price)).map((p, idx) => (
              <PropertyCard key={p.id} property={p} compact index={idx} />
            ))}
          </div>
        </div>

        {/* Our Service Grid */}
        <div className="px-5">
          <h3 className="font-black text-lg text-gray-900 mb-4">Our Service</h3>
          <div className="grid grid-cols-4 gap-2">
            {services.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`p-4 rounded-xl ${s.bg} shadow-sm border border-blue-50 w-full aspect-square flex items-center justify-center transition-transform active:scale-95`}>
                  {s.icon}
                </div>
                <p className="text-[9px] font-bold text-gray-600 text-center leading-tight h-6 flex items-center">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Builders (Brand Projects) */}
        <div className="px-5">
          <h3 className="font-black text-xs text-gray-400 uppercase tracking-widest mb-4">POPULAR BUILDERS</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 pb-4">
            {POPULAR_BUILDERS.map((builder) => (
              <motion.div 
                key={builder.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/builder-projects?builders=${builder.id}`)}
                className="flex flex-col items-center gap-2 min-w-[140px] shrink-0 group cursor-pointer"
              >
                <div className="w-24 h-24 rounded-[24px] bg-white border border-gray-100 shadow-sm flex items-center justify-center p-2 relative overflow-hidden">
                  <img src={builder.logo} alt={builder.name} className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-gray-900 leading-tight">{builder.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-0.5">{builder.totalProjects} Total</p>
                  <p className="text-[10px] text-[#00AEEF] font-bold mt-0.5">{builder.cityProjects} in this city</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real Estate Insights */}
        <div className="px-5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-xs text-gray-400 uppercase tracking-widest">REAL ESTATE INSIGHTS</h3>
            <button onClick={() => navigate('/insights')} className="text-[#2FED9A] text-xs font-bold">View Blog</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {NEWS_ITEMS.slice(0, 2).map((news, i) => (
              <div key={news.id} className="w-64 shrink-0 bg-[#F5F9FF] rounded-2xl overflow-hidden border border-blue-50 shadow-sm">
                <div className="h-32 relative">
                  <img src="file:///C:/Users/suriy/.gemini/antigravity/brain/b70f208c-1d96-4e0e-ad53-9a39a16b2c25/real_estate_news_banner_1_1772186540127.png" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2">
                    <span className="bg-[#2FED9A] text-white text-[8px] font-black px-2 py-1 rounded tracking-widest uppercase">News</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-gray-400 mb-2">{news.date}</p>
                  <h4 className="font-black text-sm text-gray-900 line-clamp-2 leading-tight mb-4">{news.title}</h4>
                  <button className="text-[#2FED9A] text-[10px] font-black flex items-center gap-1 uppercase tracking-widest">Read more +</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-5 pb-8">
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/add')}
                className="bg-[#2FED9A] p-6 rounded-[32px] shadow-xl shadow-[#2FED9A]/20 flex flex-col items-center gap-3 group"
              >
                <div className="bg-white/30 p-3 rounded-2xl group-hover:rotate-12 transition-transform">
                  <Plus size={24} className="text-gray-900" strokeWidth={3} />
                </div>
                <span className="font-black text-gray-900 text-sm">Post Property</span>
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/add-project')}
                className="bg-[#00AEEF] p-6 rounded-[32px] shadow-xl shadow-[#00AEEF]/20 flex flex-col items-center gap-3 group text-white"
              >
                <div className="bg-white/20 p-3 rounded-2xl group-hover:rotate-12 transition-transform">
                  <Building2 size={24} strokeWidth={2.5} />
                </div>
                <span className="font-black text-sm">Post Project</span>
              </motion.button>
            </div>
          <p className="text-center text-[10px] text-gray-400 mt-10 tracking-widest">HuntProperty © 2025. All rights reserved.</p>
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
        <Route path="/" element={<><HomeScreen onOpenDrawer={() => setIsDrawerOpen(true)} unreadCount={chats.reduce((acc, c) => acc + (c.messages[c.messages.length - 1]?.sender === 'other' && !c.messages[c.messages.length - 1]?.isRead ? 1 : 0), 0)} /><BottomNav /></>} />
        <Route path="/search" element={<><SearchScreen properties={MOCK_PROPERTIES} /><BottomNav /></>} />
        <Route path="/saved" element={<><SavedScreen shortlisted={shortlisted} /><BottomNav /></>} />
        <Route path="/profile" element={<><DashboardScreen /><BottomNav /></>} />
        <Route path="/dashboard" element={<><DashboardScreen /><BottomNav /></>} />
        <Route path="/property/:id" element={<PropertyDetails properties={MOCK_PROPERTIES} toggleShortlist={toggleShortlist} shortlisted={shortlisted} onStartChat={startChat} />} />
        <Route path="/add" element={<AddProperty properties={USER_PROPERTIES} />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/add-commercial-project" element={<AddCommercialProject />} />
        <Route path="/chats" element={<ChatListScreen chats={chats} />} />
        <Route path="/chat/:id" element={<ChatDetailScreen chats={chats} onSendMessage={sendMessage} />} />
        <Route path="/contacts" element={<ContactsResponsesScreen />} />
        <Route path="/my-listings" element={<MyListings properties={USER_PROPERTIES} />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/edit-profile" element={<EditProfileScreen />} />
        <Route path="/change-password" element={<ChangePasswordScreen />} />
        <Route path="/my-subscription" element={<MySubscriptionScreen />} />
        <Route path="/orders" element={<OrdersScreen />} />
        <Route path="/edit/:id" element={<AddProperty properties={USER_PROPERTIES} />} />
        <Route path="/insights" element={<InsightsScreen />} />
        <Route path="/home-loan" element={<HomeLoanScreen />} />
        <Route path="/residential" element={<ResidentialScreen />} />
        <Route path="/commercial" element={<CommercialScreen />} />
        <Route path="/projects" element={<ProjectsScreen />} />
        <Route path="/city-projects" element={<CityProjectsScreen />} />
        <Route path="/project-analysis/:id" element={<ProjectAnalysisScreen />} />
        <Route path="/unit/:id" element={<UnitDetailsScreen />} />
        <Route path="/builder-projects" element={<BuilderProjectsScreen />} />
        <Route path="/compare" element={<CompareProjectsScreen />} />
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
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
      <div className="min-h-screen bg-white font-sans flex flex-col items-center">
        <div className="w-full max-w-[500px] min-h-screen shadow-sm relative flex flex-col">
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
