
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Smartphone, Building2, UserCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button, Input, Logo } from '../components/UI';

interface Props {
  onLogin: (email: string, role: 'agent' | 'developer') => void;
}

export const AuthScreen: React.FC<Props> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [activeRole, setActiveRole] = useState<'agent' | 'developer'>('agent');
  const [loading, setLoading] = useState(false);
  const [showAutofillSuccess, setShowAutofillSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleRoleChange = (role: 'agent' | 'developer') => {
    setActiveRole(role);
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: ''
    });
    setErrors({});
  };

  const handleAutofill = () => {
    if (activeRole === 'agent') {
      setFormData({
        ...formData,
        email: 'agent@gmail.com',
        password: 'Agent'
      });
    } else {
      setFormData({
        ...formData,
        email: 'dev@gmail.com',
        password: 'Dev'
      });
    }
    setErrors({});
    setShowAutofillSuccess(true);
    setTimeout(() => setShowAutofillSuccess(false), 2000);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = "Email/Phone is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    if (!isLogin) {
      if (!formData.name) newErrors.name = "Full Name is required";
      if (!formData.phone) newErrors.phone = "Mobile number is required";
    } else {
      // Validate credentials if user is logging in
      if (formData.email && formData.password) {
        if (activeRole === 'agent') {
          if (formData.email !== 'agent@gmail.com') {
            newErrors.email = "Invalid agent email. Try: agent@gmail.com";
          }
          if (formData.password !== 'Agent') {
            newErrors.password = "Incorrect password. Try: Agent";
          }
        } else {
          if (formData.email !== 'dev@gmail.com') {
            newErrors.email = "Invalid developer email. Try: dev@gmail.com";
          }
          if (formData.password !== 'Dev') {
            newErrors.password = "Incorrect password. Try: Dev";
          }
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin(formData.email, activeRole);
      }, 1200);
    }
  };

  return (
    <div className="h-full w-full bg-white flex flex-col relative overflow-y-auto no-scrollbar">
      {/* Top Ambient Light Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#2FED9A]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header / Branding */}
      <div className="pt-12 pb-6 px-6 flex flex-col items-center z-10">
        <Logo size="md" />
        <h2 className="text-2xl font-bold mt-6 text-gray-900">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-500 text-xs mt-2 text-center max-w-[280px]">
          {isLogin 
            ? 'Sign in to access your premium real estate ecosystem.' 
            : 'Join HuntProperty to find your dream home today.'}
        </p>
      </div>

      {/* Sliding Auth Mode Switcher */}
      {isLogin && (
        <div className="px-6 mb-6 z-10">
          <div className="bg-gray-50 p-1.5 rounded-2xl border border-gray-100 flex relative">
            {/* Sliding Background */}
            <motion.div
              layoutId="activeRoleTab"
              className={`absolute top-1.5 bottom-1.5 rounded-xl shadow-sm ${
                activeRole === 'agent' ? 'bg-[#2FED9A] text-gray-900' : 'bg-[#00AEEF] text-white'
              }`}
              style={{ width: 'calc(50% - 6px)' }}
              animate={{ x: activeRole === 'agent' ? 0 : '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
              onClick={() => handleRoleChange('agent')}
              className={`flex-1 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 relative z-10 transition-colors duration-200 ${
                activeRole === 'agent' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <UserCheck size={16} />
              Agent Login
            </button>

            <button
              onClick={() => handleRoleChange('developer')}
              className={`flex-1 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 relative z-10 transition-colors duration-200 ${
                activeRole === 'developer' ? 'text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Building2 size={16} />
              Developer Login
            </button>
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="flex-1 px-6 space-y-4 z-10">
        
        {/* Credentials Suggestion Card */}
        {isLogin && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleAutofill}
            className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
              activeRole === 'agent' 
                ? 'bg-[#2FED9A]/5 border-[#2FED9A]/20 hover:bg-[#2FED9A]/10' 
                : 'bg-[#00AEEF]/5 border-[#00AEEF]/20 hover:bg-[#00AEEF]/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${
                activeRole === 'agent' ? 'bg-[#2FED9A]/10 text-green-700' : 'bg-[#00AEEF]/10 text-blue-700'
              }`}>
                <Sparkles size={16} className="animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-gray-800 uppercase tracking-tight">
                  Test {activeRole === 'agent' ? 'Agent' : 'Developer'} Credentials
                </p>
                <p className="text-[10px] text-gray-500 font-medium font-mono mt-0.5">
                  Email: {activeRole === 'agent' ? 'agent@gmail.com' : 'dev@gmail.com'}
                  <br />
                  Pass: {activeRole === 'agent' ? 'Agent' : 'Dev'}
                </p>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {showAutofillSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-1 text-[10px] font-black text-green-600"
                >
                  <CheckCircle2 size={12} />
                  Filled!
                </motion.div>
              ) : (
                <motion.span 
                  key="action"
                  className={`text-[9px] font-bold px-2 py-1 rounded-md border ${
                    activeRole === 'agent' 
                      ? 'border-[#2FED9A]/40 text-green-700 bg-white' 
                      : 'border-[#00AEEF]/40 text-blue-700 bg-white'
                  }`}
                >
                  Autofill
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLogin && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-4 overflow-hidden">
            <Input 
              label="Full Name" 
              name="name" 
              placeholder="John Doe" 
              icon={User} 
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Input 
              label="Mobile Number" 
              name="phone" 
              placeholder="+1 234 567 8900" 
              icon={Smartphone} 
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
          </motion.div>
        )}

        <Input 
          label="Email Address" 
          name="email" 
          placeholder={activeRole === 'agent' ? 'agent@gmail.com' : 'dev@gmail.com'}
          icon={Mail} 
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        
        <div className="space-y-1.5">
          <Input 
            label="Password" 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            icon={Lock} 
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          {isLogin && (
            <div className="text-right">
              <button className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                Forgot Password?
              </button>
            </div>
          )}
        </div>

        <div className="pt-4">
          <Button 
            fullWidth 
            onClick={handleSubmit} 
            disabled={loading}
            className={`shadow-lg text-white font-bold transition-all ${
              activeRole === 'agent' 
                ? 'bg-[#2FED9A] text-gray-900 shadow-[#2FED9A]/20 hover:bg-[#2FED9A]/90' 
                : 'bg-[#00AEEF] text-white shadow-[#00AEEF]/20 hover:bg-[#00AEEF]/90'
            }`}
          >
            {loading ? 'Logging in...' : (isLogin ? 'Login Securely' : 'Sign Up')}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative py-4">
           <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-gray-100"></div>
           </div>
           <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
             <span className="bg-white px-3 text-gray-400 font-bold">Or continue with</span>
           </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors active:scale-95">
             <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
             <span className="text-xs font-semibold text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors active:scale-95">
             <img src="https://www.svgrepo.com/show/448234/apple.svg" className="w-5 h-5" alt="Apple" />
             <span className="text-xs font-semibold text-gray-700">Apple</span>
          </button>
        </div>
      </div>

      {/* Toggle Auth Mode */}
      <div className="py-6 text-center pb-safe z-10">
        <p className="text-sm text-gray-500 font-medium">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
            className={`font-bold ml-1 hover:underline ${
              activeRole === 'agent' ? 'text-[#2FED9A]' : 'text-[#00AEEF]'
            }`}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

