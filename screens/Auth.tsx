
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, User, ChevronRight, ArrowRight, Smartphone } from 'lucide-react';
import { Button, Input, Logo } from '../components/UI';

interface Props {
  onLogin: () => void;
}

export const AuthScreen: React.FC<Props> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email/Phone is required";
    if (!formData.password) newErrors.password = "Password is required";
    
    if (!isLogin) {
      if (!formData.name) newErrors.name = "Full Name is required";
      if (!formData.phone) newErrors.phone = "Mobile number is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin();
      }, 1500);
    }
  };

  return (
    <div className="h-full w-full bg-white flex flex-col relative overflow-y-auto no-scrollbar">
      {/* Header / Branding */}
      <div className="pt-16 pb-8 px-6 flex flex-col items-center">
        <Logo size="md" />
        <h2 className="text-2xl font-bold mt-8 text-gray-900">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-500 text-sm mt-2 text-center max-w-[240px]">
          {isLogin 
            ? 'Sign in to access your personalized real estate dashboard.' 
            : 'Join HuntProperty to find your dream home today.'}
        </p>
      </div>

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
              placeholder="+1 234 567 8900" 
              icon={Smartphone} 
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
          </motion.div>
        )}

        <Input 
          label="Email or Mobile" 
          name="email" 
          placeholder="user@example.com" 
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
              <button className="text-xs font-medium text-primary hover:text-green-600 transition-colors">
                Forgot Password?
              </button>
            </div>
          )}
        </div>

        <div className="pt-4">
          <Button fullWidth onClick={handleSubmit} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative py-4">
           <div className="absolute inset-0 flex items-center">
             <div className="w-full border-t border-gray-100"></div>
           </div>
           <div className="relative flex justify-center text-xs uppercase">
             <span className="bg-white px-2 text-gray-400 font-medium">Or continue with</span>
           </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors active:scale-95">
             <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
             <span className="text-sm font-medium text-gray-700">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors active:scale-95">
             <img src="https://www.svgrepo.com/show/448234/apple.svg" className="w-5 h-5" alt="Apple" />
             <span className="text-sm font-medium text-gray-700">Apple</span>
          </button>
        </div>
      </div>

      {/* Toggle Auth Mode */}
      <div className="py-6 text-center pb-safe">
        <p className="text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
            className="font-bold text-primary ml-1 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};
