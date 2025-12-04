
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, User, Smartphone, Mail, ShieldCheck, List, CreditCard, 
  Lock, Bell, EyeOff, Moon, Globe, HelpCircle, LogOut, Trash2, ChevronRight, AlertTriangle, Info, ShoppingBag
} from 'lucide-react';
import { Toggle, Button } from '../components/UI';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  
  // Modals State
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Settings State (Mock)
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    priceDrop: true,
    alerts: true
  });
  
  const [privacy, setPrivacy] = useState({
    appLock: false,
    hideProfile: false
  });

  const [general, setGeneral] = useState({
    darkMode: false,
    language: 'English'
  });

  const handleToggle = (category: string, key: string) => {
    if (category === 'notifications') setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] });
    if (category === 'privacy') setPrivacy({ ...privacy, [key]: !privacy[key as keyof typeof privacy] });
    if (category === 'general') setGeneral({ ...general, [key]: !general[key as keyof typeof general] });
  };

  const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-6 px-2">{children}</h3>
  );

  const SettingsItem = ({ 
    icon: Icon, 
    label, 
    subLabel, 
    onClick, 
    rightElement,
    destructive = false 
  }: { 
    icon: any, 
    label: string, 
    subLabel?: string, 
    onClick?: () => void, 
    rightElement?: React.ReactNode,
    destructive?: boolean
  }) => (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-3.5 mb-2 rounded-xl bg-white border border-gray-100 shadow-sm active:scale-[0.99] transition-all ${onClick ? 'cursor-pointer hover:border-primary/30' : ''}`}
    >
      <div className="flex items-center gap-3.5">
        <div className={`p-2.5 rounded-full ${destructive ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-600'}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className={`font-semibold text-sm ${destructive ? 'text-red-500' : 'text-gray-800'}`}>{label}</p>
          {subLabel && <p className="text-[10px] text-gray-400">{subLabel}</p>}
        </div>
      </div>
      <div>
        {rightElement || (onClick && <ChevronRight size={16} className="text-gray-300" />)}
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-gray-50 relative">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-xl text-gray-900">Settings</h1>
      </div>

      <div className="p-4 pb-24">
        {/* Profile Section */}
        <SectionTitle>Profile Settings</SectionTitle>
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100/50">
          <SettingsItem icon={User} label="Edit Profile" subLabel="Name, Bio, Avatar" onClick={() => navigate('/edit-profile')} />
          <SettingsItem icon={Smartphone} label="Update Mobile Number" subLabel="+1 555 *** **99" onClick={() => navigate('/edit-profile')} />
          <SettingsItem icon={Mail} label="Update Email" subLabel="alex.j@example.com" onClick={() => navigate('/edit-profile')} />
          <SettingsItem icon={ShieldCheck} label="KYC Verification" subLabel="Verified Badge: Active" onClick={() => {}} />
        </div>

        {/* Account Section */}
        <SectionTitle>Account</SectionTitle>
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100/50">
          <SettingsItem icon={List} label="My Listings" onClick={() => navigate('/my-listings')} />
          <SettingsItem icon={CreditCard} label="My Subscription" subLabel="Current Plan & Usage" onClick={() => navigate('/my-subscription')} />
          <SettingsItem icon={ShoppingBag} label="Order History" subLabel="Past Transactions" onClick={() => navigate('/orders')} />
          <SettingsItem icon={Lock} label="Change Password" onClick={() => navigate('/change-password')} />
        </div>

        {/* Notifications */}
        <SectionTitle>Notifications</SectionTitle>
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100/50">
          <SettingsItem 
            icon={Bell} 
            label="Push Notifications" 
            rightElement={<Toggle checked={notifications.push} onChange={() => handleToggle('notifications', 'push')} />} 
          />
          <SettingsItem 
            icon={AlertTriangle} 
            label="Price Drop Alerts" 
            rightElement={<Toggle checked={notifications.priceDrop} onChange={() => handleToggle('notifications', 'priceDrop')} />} 
          />
          <SettingsItem 
            icon={Mail} 
            label="Email Updates" 
            rightElement={<Toggle checked={notifications.email} onChange={() => handleToggle('notifications', 'email')} />} 
          />
        </div>

        {/* Privacy & Security */}
        <SectionTitle>Privacy & Security</SectionTitle>
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100/50">
          <SettingsItem 
            icon={Lock} 
            label="App Lock" 
            subLabel="Biometric / PIN"
            rightElement={<Toggle checked={privacy.appLock} onChange={() => handleToggle('privacy', 'appLock')} />} 
          />
           <SettingsItem 
            icon={EyeOff} 
            label="Hide Profile" 
            subLabel="Visible only to contacts"
            rightElement={<Toggle checked={privacy.hideProfile} onChange={() => handleToggle('privacy', 'hideProfile')} />} 
          />
        </div>

        {/* General */}
        <SectionTitle>General</SectionTitle>
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100/50">
          <SettingsItem 
             icon={Globe} 
             label="Language" 
             subLabel={general.language}
             onClick={() => {}} 
          />
          <SettingsItem 
            icon={Moon} 
            label="Dark Mode" 
            rightElement={<Toggle checked={general.darkMode} onChange={() => handleToggle('general', 'darkMode')} />} 
          />
        </div>

        {/* Support */}
        <SectionTitle>Support</SectionTitle>
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100/50">
          <SettingsItem icon={HelpCircle} label="Help Center" onClick={() => {}} />
          <SettingsItem icon={Info} label="About App" subLabel="v2.5.0" onClick={() => {}} />
        </div>

        {/* Danger Zone */}
        <SectionTitle>Actions</SectionTitle>
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100/50">
          <SettingsItem icon={LogOut} label="Log Out" onClick={() => setShowLogoutModal(true)} destructive />
          <SettingsItem icon={Trash2} label="Delete Account" onClick={() => setShowDeleteModal(true)} destructive />
        </div>

        <div className="text-center mt-8 mb-4">
           <p className="text-[10px] text-gray-400 font-medium">HuntProperty v2.5.0 (Build 2024)</p>
        </div>
      </div>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowLogoutModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-xs relative z-10 shadow-2xl"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto text-primary">
                <LogOut size={24} />
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Log Out?</h3>
              <p className="text-center text-sm text-gray-500 mb-6">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex gap-3">
                <Button variant="ghost" fullWidth onClick={() => setShowLogoutModal(false)} className="bg-gray-100">Cancel</Button>
                <Button fullWidth onClick={() => { setShowLogoutModal(false); navigate('/'); }}>Log Out</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-xs relative z-10 shadow-2xl"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto text-red-500">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold text-center mb-2">Delete Account?</h3>
              <p className="text-center text-sm text-gray-500 mb-6">
                This will permanently delete your profile, listings, and chat history. This action cannot be undone.
              </p>
              <div className="flex flex-col gap-3">
                <Button 
                  className="bg-red-500 hover:bg-red-600 text-white shadow-red-200" 
                  fullWidth 
                  onClick={() => { setShowDeleteModal(false); alert('Account scheduled for deletion.'); }}
                >
                  Delete Permanently
                </Button>
                <Button variant="ghost" fullWidth onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
