
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Button } from '../components/UI';

export const ChangePasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleShow = (field: keyof typeof showPass) => {
    setShowPass(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    if (passwords.new.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }
    
    setLoading(true);
    // Simulate API
    setTimeout(() => {
      setLoading(false);
      alert("Password updated successfully!");
      navigate(-1);
    }, 1500);
  };

  // Custom Password Input to handle show/hide toggle inside
  const PasswordInput = ({ 
    label, 
    name, 
    value, 
    show, 
    onToggle 
  }: { 
    label: string, 
    name: string, 
    value: string, 
    show: boolean, 
    onToggle: () => void 
  }) => (
    <div className="space-y-1.5 w-full">
      <label className="text-xs font-medium text-gray-500 ml-1 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full bg-gray-50 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 pl-11 pr-12 py-3.5 outline-none transition-all text-gray-800"
          placeholder="••••••••"
        />
        <button 
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-white relative">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-xl">Change Password</h1>
      </div>

      <div className="p-5 pt-8 space-y-8 pb-24">
        <div className="flex flex-col items-center text-center mb-8">
           <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
             <ShieldCheck size={32} />
           </div>
           <h2 className="font-bold text-lg text-gray-900">Secure Your Account</h2>
           <p className="text-sm text-gray-500 mt-1 max-w-[250px]">
             Choose a strong password that you haven't used on other devices.
           </p>
        </div>

        <div className="space-y-5">
          <PasswordInput 
            label="Current Password" 
            name="current" 
            value={passwords.current} 
            show={showPass.current} 
            onToggle={() => toggleShow('current')} 
          />
          <PasswordInput 
            label="New Password" 
            name="new" 
            value={passwords.new} 
            show={showPass.new} 
            onToggle={() => toggleShow('new')} 
          />
          <PasswordInput 
            label="Confirm New Password" 
            name="confirm" 
            value={passwords.confirm} 
            show={showPass.confirm} 
            onToggle={() => toggleShow('confirm')} 
          />
        </div>

        <div className="pt-8">
            <ul className="text-xs text-gray-400 space-y-2 pl-2">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400 rounded-full"></div> At least 8 characters long</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400 rounded-full"></div> Includes uppercase & lowercase</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-400 rounded-full"></div> Contains at least one number</li>
            </ul>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 safe-area-bottom">
        <Button fullWidth onClick={handleSubmit} disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </div>
    </div>
  );
};
