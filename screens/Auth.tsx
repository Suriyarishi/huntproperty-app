import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, User, Smartphone, ShieldCheck, Briefcase } from 'lucide-react';
import { Button, Input, Logo } from '../components/UI';

interface Props {
  onLogin: (role: 'agent' | 'dev') => void;
}

type LoginType = 'agent' | 'dev';

export const AuthScreen: React.FC<Props> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<LoginType>('agent');
  
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
    if (errors.auth) setErrors({ ...errors, auth: '' });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (isLogin) {
      if (loginType === 'agent') {
        if (formData.email !== 'agent@gmail.com' || formData.password !== 'Agent') {
          newErrors.auth = "Invalid Agent credentials. (Use agent@gmail.com / Agent)";
        }
      } else {
        if (formData.email !== 'dev@gmail.com' || formData.password !== 'Dev') {
          newErrors.auth = "Invalid Developer credentials. (Use dev@gmail.com / Dev)";
        }
      }
    } else {
      if (!formData.name) newErrors.name = "Full Name is required";
      if (!formData.phone) newErrors.phone = "Mobile number is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin(loginType);
      }, 1000);
    }
  };

  return (
    <div className="h-full w-full bg-white flex flex-col relative overflow-y-auto no-scrollbar">
      {/* Header / Branding */}
      <div className="pt-16 pb-8 px-6 flex flex-col items-center">
        <Logo size="md" />
        <h2 className="text-2xl font-black mt-8 text-gray-900 tracking-tight">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="text-gray-500 text-sm mt-2 text-center max-w-[240px] font-medium">
          Access your premium real estate dashboard.
        </p>
      </div>

      {/* Role Selector (Only for Login) */}
      {isLogin && (
        <div className="px-6 mb-8">
          <div className="bg-gray-100 p-1.5 rounded-2xl flex relative h-14">
            <motion.div 
              className="absolute h-[calc(100%-12px)] top-1.5 bg-white rounded-[14px] shadow-sm z-0"
              initial={false}
              animate={{ 
                left: loginType === 'agent' ? '6px' : '50%',
                width: 'calc(50% - 9px)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button 
              onClick={() => setLoginType('agent')}
              className={`flex-1 flex items-center justify-center gap-2 z-10 text-sm font-black transition-colors ${loginType === 'agent' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              <Briefcase size={16} />
              Agent
            </button>
            <button 
              onClick={() => setLoginType('dev')}
              className={`flex-1 flex items-center justify-center gap-2 z-10 text-sm font-black transition-colors ${loginType === 'dev' ? 'text-gray-900' : 'text-gray-400'}`}
            >
              <ShieldCheck size={16} />
              Developer
            </button>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="flex-1 px-6 space-y-4">
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
              placeholder="+91 98765 43210" 
              icon={Smartphone} 
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
          </motion.div>
        )}

        <Input 
          label={loginType === 'agent' ? "Agent Email" : "Developer Email"}
          name="email" 
          placeholder={loginType === 'agent' ? "agent@gmail.com" : "dev@gmail.com"}
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
              <button className="text-[10px] font-black uppercase tracking-widest text-[#2FED9A] hover:text-green-600 transition-colors">
                Forgot Password?
              </button>
            </div>
          )}
        </div>

        {errors.auth && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-500 font-bold text-center bg-red-50 p-3 rounded-xl border border-red-100"
          >
            {errors.auth}
          </motion.p>
        )}

        <div className="pt-4">
          <Button fullWidth onClick={handleSubmit} disabled={loading} className="py-4 shadow-xl shadow-[#2FED9A]/20">
            {loading ? 'Processing...' : (isLogin ? `Sign In as ${loginType === 'agent' ? 'Agent' : 'Developer'}` : 'Create Account')}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative py-4">
           <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-gray-100"></div>
           </div>
           <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]">
             <span className="bg-white px-3 text-gray-300">Or continue with</span>
           </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-3 py-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
             <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
             <span className="text-xs font-black text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center gap-3 py-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
             <img src="https://www.svgrepo.com/show/448234/apple.svg" className="w-5 h-5" alt="Apple" />
             <span className="text-xs font-black text-gray-700">Apple</span>
          </button>
        </div>
      </div>

      {/* Toggle Auth Mode */}
      <div className="py-8 text-center pb-safe">
        <p className="text-sm text-gray-500 font-medium">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
            className="font-black text-[#2FED9A] ml-1.5 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};
