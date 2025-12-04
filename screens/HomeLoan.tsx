import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button, Input } from '../components/UI';
import { motion, AnimatePresence } from 'framer-motion';

export const HomeLoanScreen: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    loanType: 'Home Loan'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Simulate API call
      setTimeout(() => {
        setShowSuccess(true);
      }, 500);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col relative">
      {/* Header */}
      <div className="flex-none px-4 py-4 flex items-center border-b border-gray-100 shadow-sm z-10 bg-white">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-xl text-gray-900">Apply for Loan</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-1">Get Expert Assistance</h3>
          <p className="text-xs text-blue-600">Fill in your details and our loan experts will get back to you with the best rates.</p>
        </div>

        <div className="space-y-4">
          <Input 
            label="Full Name" 
            name="name" 
            placeholder="John Doe" 
            value={formData.name} 
            onChange={handleChange} 
            error={errors.name}
          />
          <Input 
            label="Email Address" 
            name="email" 
            type="email"
            placeholder="john@example.com" 
            value={formData.email} 
            onChange={handleChange} 
            error={errors.email}
          />
          <Input 
            label="Phone Number" 
            name="phone" 
            type="tel"
            placeholder="+91 98765 43210" 
            value={formData.phone} 
            onChange={handleChange} 
            error={errors.phone}
          />
          
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 ml-1 uppercase tracking-wider">Address</label>
            <textarea 
              name="address"
              placeholder="Enter your current address"
              value={formData.address}
              onChange={(e: any) => handleChange(e)}
              className={`w-full bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-100'} focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3.5 outline-none transition-all text-gray-800 placeholder:text-gray-400 min-h-[100px] resize-none`}
            />
            {errors.address && <p className="text-xs text-red-500 ml-1">{errors.address}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 ml-1 uppercase tracking-wider">Loan Type</label>
            <div className="relative">
              <select 
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/20 appearance-none text-gray-700"
              >
                <option value="Home Loan">Home Loan</option>
                <option value="Loan Against Property">Loan Against Property</option>
                <option value="Balance Transfer">Balance Transfer</option>
                <option value="Top Up Loan">Top Up Loan</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-none p-5 border-t border-gray-100 safe-area-bottom bg-white">
        <Button fullWidth onClick={handleSubmit}>Submit Application</Button>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-xs relative z-10 text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Application Sent!</h3>
              <p className="text-sm text-gray-500 mb-6">
                Your loan application has been submitted successfully. Our team will contact you shortly.
              </p>
              <Button fullWidth onClick={() => { setShowSuccess(false); navigate('/'); }}>
                Back to Home
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};