
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, MapPin, Heart, ArrowRight, Building2, Store, Warehouse } from 'lucide-react';
import { Property } from '../types';
import { MOCK_PROPERTIES } from '../App';
import { PropertyCard } from '../App';

export const CommercialScreen = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Office');
    const tabs = ['Office', 'Retail', 'Warehouse', 'Plot', 'Land'];

    const commercialCategories = [
        { icon: <Building2 size={20} />, label: 'Office Space', bg: 'bg-blue-50', text: 'text-blue-600' },
        { icon: <Store size={20} />, label: 'Shops & Retail', bg: 'bg-orange-50', text: 'text-orange-600' },
        { icon: <Warehouse size={20} />, label: 'Warehouse', bg: 'bg-purple-50', text: 'text-purple-600' },
        { icon: <Building2 size={20} />, label: 'Industrial', bg: 'bg-green-50', text: 'text-green-600' },
    ];

    return (
        <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white relative">
            {/* Header */}
            <div className="bg-[#2FED9A] px-5 pt-10 pb-6 sticky top-0 z-30 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 bg-white/20 rounded-full text-gray-900">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-black text-gray-900">Commercial</h1>
                </div>
                <button className="p-2 bg-white/20 rounded-full text-gray-900">
                    <Search size={20} />
                </button>
            </div>

            <div className="px-5 py-6 space-y-10">
                {/* Categories Grid */}
                <div>
                    <h3 className="font-black text-lg text-gray-900 mb-4">Choose Category</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {commercialCategories.map((cat, i) => (
                            <motion.div
                                key={i}
                                whileTap={{ scale: 0.95 }}
                                className={`p-4 rounded-2xl ${cat.bg} border border-transparent hover:border-white shadow-sm flex flex-col gap-3 cursor-pointer group transition-all`}
                            >
                                <div className={`p-3 rounded-xl bg-white/60 w-fit ${cat.text}`}>
                                    {cat.icon}
                                </div>
                                <p className="font-bold text-gray-900 text-sm">{cat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Featured Commercial Projects */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-black text-lg text-gray-900">Top Commercial Projects</h3>
                        <button className="p-2 bg-gray-50 rounded-xl text-gray-600">
                            <Filter size={18} />
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
                        {MOCK_PROPERTIES.filter(p => p.type === 'Commercial').map((p, idx) => (
                            <PropertyCard key={p.id} property={p} compact index={idx} />
                        ))}
                        {MOCK_PROPERTIES.filter(p => p.type === 'Commercial').length === 0 && (
                            <div className="w-full text-center py-10 text-gray-400 text-sm italic">
                                No commercial projects currently listed in this area.
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gray-900 rounded-[32px] p-8 text-center relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#2FED9A] opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <h4 className="text-white font-black text-xl mb-3 relative z-10">Looking for Bulk Deals?</h4>
                    <p className="text-gray-400 text-xs mb-6 relative z-10 leading-relaxed">Connect with our commercial experts for customized office & retail solutions.</p>
                    <button className="bg-[#2FED9A] text-gray-900 font-black px-8 py-3 rounded-xl transition-all active:scale-95 relative z-10">
                        Contact Expert
                    </button>
                </div>
            </div>
        </div>
    );
};
