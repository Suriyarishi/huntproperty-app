
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, User, Mail, Phone, FileText } from 'lucide-react';
import { Button, Input } from '../components/UI';

export const EditProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    phone: '+1 555 019 2834',
    bio: 'Real estate enthusiast and property investor.',
    avatar: 'https://picsum.photos/200/200'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate(-1); // Go back
    }, 1000);
  };

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-white relative">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-bold text-xl">Edit Profile</h1>
      </div>

      <div className="p-5 space-y-8 pb-24">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img src={formData.avatar} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-gray-50" />
            <button className="absolute bottom-0 right-0 bg-primary text-black p-2 rounded-full shadow-lg hover:scale-105 transition-transform">
              <Camera size={18} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">Tap to change profile picture</p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <Input 
            label="Full Name" 
            name="name" 
            icon={User} 
            value={formData.name} 
            onChange={handleChange} 
          />
          <Input 
            label="Email Address" 
            name="email" 
            icon={Mail} 
            value={formData.email} 
            onChange={handleChange} 
          />
          <Input 
            label="Phone Number" 
            name="phone" 
            icon={Phone} 
            value={formData.phone} 
            onChange={handleChange} 
          />
          
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 ml-1 uppercase tracking-wider">Bio</label>
            <div className="relative">
              <FileText className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 pl-11 py-3.5 outline-none transition-all text-gray-800 placeholder:text-gray-400 min-h-[100px] resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 safe-area-bottom">
        <Button fullWidth onClick={handleSave} disabled={loading}>
          {loading ? 'Saving Changes...' : 'Save Profile'}
        </Button>
      </div>
    </div>
  );
};
