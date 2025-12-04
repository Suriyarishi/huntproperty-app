
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AdvertiseScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPkg, setSelectedPkg] = useState<number | null>(null);

  const packages = [
    { id: 1, title: 'Horizontal Banners (Home Page)', price: '35000' },
    { id: 2, title: 'Vertical Banners (Home Page)', price: '35000' },
    { id: 3, title: 'Horizontal Banners (Dashboard)', price: '25000' },
    { id: 4, title: 'Vertical Banners (Dashboard)', price: '25000' },
  ];

  return (
    <div className="h-full bg-white flex flex-col relative overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex-none px-4 py-4 flex items-center border-b border-gray-100 shadow-sm z-10 bg-white sticky top-0">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-xl text-gray-900">Advertise with Us</h1>
      </div>

      <div className="flex-1 p-5 pb-24">
        <h2 className="font-bold text-lg text-gray-900 mb-5">Select Package</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packages.map((pkg) => (
                <div 
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg.id)}
                    className={`border transition-all cursor-pointer bg-white ${selectedPkg === pkg.id ? 'border-gray-400' : 'border-gray-200'}`}
                >
                    <div className="p-6 text-center border-b border-gray-200 min-h-[80px] flex items-center justify-center">
                        <span className="text-gray-400 text-sm font-medium">{pkg.title}</span>
                    </div>
                    <div className="p-4 flex items-center justify-center gap-3 min-h-[70px]">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPkg === pkg.id ? 'border-gray-400' : 'border-gray-300'}`}>
                            {selectedPkg === pkg.id && <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" />}
                        </div>
                        <span className="text-2xl font-bold text-[#DC2626]">₹ {pkg.price}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="p-5 border-t border-gray-100 flex justify-end sticky bottom-0 bg-white z-20 safe-area-bottom">
        <button 
            disabled={!selectedPkg}
            onClick={() => { alert('Proceeding to payment...'); }}
            className="bg-[#D90429] hover:bg-[#b90424] text-white px-8 py-3 rounded font-bold text-sm uppercase tracking-wide disabled:opacity-50 shadow-sm transition-colors"
        >
            PAYMENT
        </button>
      </div>
    </div>
  );
};
