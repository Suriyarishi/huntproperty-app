
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, MapPin, Heart, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { MOCK_PROPERTIES } from '../App';
import { PropertyCard } from '../App';

export const ResidentialScreen = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Flats', 'Houses', 'Plots', 'Villas'];

    const residentialProperties = MOCK_PROPERTIES.filter(p =>
        p.type === 'Apartment' || p.type === 'Villa'
    );

    return (
        <div className="h-full overflow-y-auto no-scrollbar pb-24 bg-white relative">
            {/* Header */}
            <div className="bg-[#2FED9A] px-5 pt-10 pb-6 sticky top-0 z-30 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 bg-white/20 rounded-full text-gray-900">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-black text-gray-900">Residential</h1>
                </div>
                <button className="p-2 bg-white/20 rounded-full text-gray-900">
                    <Search size={20} />
                </button>
            </div>

            {/* Tabs */}
            <div className="px-5 py-4 flex gap-3 overflow-x-auto no-scrollbar sticky top-[84px] bg-white z-20 border-b border-gray-50">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-sm border ${activeTab === tab
                            ? 'bg-[#2FED9A] text-gray-900 border-[#2FED9A]'
                            : 'bg-white text-gray-500 border-gray-100'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="px-5 py-6 space-y-8">
                {/* Featured Section */}
                <div>
                    <h3 className="font-black text-lg text-gray-900 mb-4">Premium Residential Choices</h3>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
                        {residentialProperties.slice(0, 3).map((p, idx) => (
                            <PropertyCard key={p.id} property={p} compact index={idx} />
                        ))}
                    </div>
                </div>

                {/* All Listings */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-black text-lg text-gray-900">Recent Listings</h3>
                        <button className="p-2 bg-gray-50 rounded-xl text-gray-600">
                            <Filter size={18} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {residentialProperties.map((p, idx) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => navigate(`/property/${p.id}`)}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex group transition-all active:scale-[0.98]"
                            >
                                <div className="w-32 h-32 relative shrink-0">
                                    <img src={p.images[0]} className="w-full h-full object-cover" />
                                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase text-gray-900">
                                        {p.type}
                                    </div>
                                </div>
                                <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm truncate">{p.title}</h4>
                                        <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-1">
                                            <MapPin size={10} /> {p.city}
                                        </p>
                                    </div>
                                    <div className="flex items-end justify-between">
                                        <p className="font-black text-gray-900 text-lg">₹{(p.price / 100000).toFixed(0)}L</p>
                                        <div className="flex gap-2">
                                            <button className="p-2 bg-gray-50 rounded-full text-gray-400">
                                                <Heart size={14} />
                                            </button>
                                            <div className="p-2 bg-[#2FED9A]/10 rounded-full text-[#2FED9A]">
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
