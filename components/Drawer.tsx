
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronRight, Home, Search, PlusSquare, Heart, User, Settings, LogOut,
  BadgeDollarSign, Calculator, Palette, Scale, Users, Headphones, Star,
  FileText, ShoppingBag, CreditCard, Facebook, Youtube, Linkedin, Instagram, Twitter, Megaphone, UserPlus, Building2, Briefcase
} from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, onLogout }) => {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  const menuItems = [
    {
      title: "Main Actions",
      items: [
        { icon: Search, label: "Property Search", path: "/search" },
        { icon: PlusSquare, label: "Sell or Rent Property", path: "/add" },
        { icon: Building2, label: "ADD Projects", path: "/add-project" },
        { icon: Briefcase, label: "Add Commercial Project", path: "/add-commercial-project" },
        { icon: FileText, label: "Post Your Requirement", path: "/add" },
      ]
    },
    {
      title: "My Account",
      items: [
        { icon: Home, label: "My Listings", path: "/my-listings" },
        { icon: CreditCard, label: "My Subscriptions", path: "/my-subscription" },
        { icon: Star, label: "Buy Plans", path: "/subscription" },
        { icon: ShoppingBag, label: "Order History", path: "/orders" },
      ]
    },
    {
      title: "Our Service & Tools",
      items: [
        { icon: BadgeDollarSign, label: "Home Loan", path: "/home-loan" },
        { icon: Calculator, label: "Financial Calculators", path: "/calculators" },
        { icon: Calculator, label: "Property Cost Calculator", path: "/cost-calculator" },
        { icon: UserPlus, label: "Search Agents", path: "/search-agents" },
        { icon: Calculator, label: "Vastu Calculator", path: "/search" }, // Mock
        { icon: Palette, label: "Interior Design", path: "/search" }, // Mock
        { icon: Home, label: "RERA Service", path: "/search" }, // Mock
        { icon: Scale, label: "Legal Advisory", path: "/search" }, // Mock
        { icon: Users, label: "Channel Partner/ Investors Space", path: "/search" }, // Mock
        { icon: Megaphone, label: "Advertise with Us", path: "/advertise" },
        { icon: Headphones, label: "Customer Care", path: "/settings" },
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[70] overflow-y-auto no-scrollbar shadow-2xl rounded-r-3xl"
          >
            {/* Header / Profile */}
            <div className="p-6 bg-gray-50 border-b border-gray-100">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-gray-900"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mt-4">
                <img
                  src="https://picsum.photos/200/200"
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div>
                  <h2 className="font-bold text-lg text-gray-900 leading-tight">Esther Howard</h2>
                  <p className="text-xs text-gray-500 mb-1">abc@gmail.com</p>
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-[10px] font-bold rounded-md uppercase tracking-wider">
                    Free member
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-6">
              {menuItems.map((section, idx) => (
                <div key={idx}>
                  {section.title && (
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleNav(item.path)}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-primary transition-all group"
                      >
                        <item.icon size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Rate App */}
              <div>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-primary transition-all group">
                  <Star size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium">Rate this App</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 mt-4">
              <div className="flex justify-center gap-4 mb-6">
                {[Facebook, Youtube, Linkedin, Instagram, Twitter].map((Icon, i) => (
                  <button key={i} className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                    <Icon size={16} fill="currentColor" className="stroke-none" />
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] text-gray-500 font-medium text-center">
                <button className="hover:text-gray-900">Terms and Conditions</button>
                <span>|</span>
                <button className="hover:text-gray-900">Privacy Policy</button>
                <span>|</span>
                <button className="hover:text-gray-900">Package Policy</button>
                <button className="hover:text-gray-900 w-full">Refund and Cancellation Policy</button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => { onClose(); onLogout?.(); }}
                  className="w-full flex items-center justify-center gap-2 text-red-500 font-bold text-sm py-2 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
