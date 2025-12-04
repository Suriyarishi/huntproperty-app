
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search, User, Phone, BadgeCheck } from 'lucide-react';
import { Button } from '../components/UI';

const CITIES = ['Delhi', 'Noida', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'All'];

const MOCK_AGENTS = [
  { id: 1, name: 'Agent', location: 'Delhi', subLocation: 'D-24, Uttam Nagar', experience: '2016', avatar: 'https://picsum.photos/100/100?random=50' },
  { id: 2, name: 'shyam', location: 'Aligarh', subLocation: 'pratibha', experience: '2015', avatar: 'https://picsum.photos/100/100?random=51' },
  { id: 3, name: 'Manish Kadyan', location: 'Delhi', subLocation: 'Adhyapak Nagar, Delhi', experience: '2015', avatar: 'https://picsum.photos/100/100?random=52' },
  { id: 4, name: 'Rahul Verma', location: 'Noida', subLocation: 'Sector 62', experience: '2018', avatar: 'https://picsum.photos/100/100?random=53' },
  { id: 5, name: 'Priya Singh', location: 'Bangalore', subLocation: 'Whitefield', experience: '2017', avatar: 'https://picsum.photos/100/100?random=54' },
];

export const SearchAgentsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [customLocation, setCustomLocation] = useState('');

  const filteredAgents = MOCK_AGENTS.filter(agent => {
    if (customLocation) {
        return agent.location.toLowerCase().includes(customLocation.toLowerCase()) || 
               agent.subLocation.toLowerCase().includes(customLocation.toLowerCase());
    }
    if (selectedCity === 'All') return true;
    return agent.location === selectedCity;
  });

  return (
    <div className="h-full bg-gray-50 flex flex-col relative overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex-none px-4 py-4 flex items-center border-b border-gray-100 shadow-sm z-10 bg-white sticky top-0">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-xl text-gray-900">Agents</h1>
      </div>

      <div className="flex-1 p-5 pb-24">
        
        {/* Filters */}
        <div className="bg-gray-100 p-1 rounded-xl mb-6 overflow-x-auto no-scrollbar flex gap-1">
            {CITIES.map(city => (
                <button
                    key={city}
                    onClick={() => { setSelectedCity(city); setCustomLocation(''); }}
                    className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                        selectedCity === city && !customLocation
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    {city}
                </button>
            ))}
        </div>

        {/* Custom Search */}
        <div className="flex gap-2 mb-8">
            <div className="relative flex-1">
                <input 
                    type="text" 
                    placeholder="Other Location" 
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    className="w-full bg-white pl-4 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm"
                />
            </div>
            <button className="bg-[#D90429] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#b90424] transition-colors">
                Search
            </button>
        </div>

        <h3 className="font-bold text-gray-800 mb-4 uppercase text-xs tracking-wider">All Agents:</h3>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredAgents.length > 0 ? (
                filteredAgents.map(agent => (
                    <div key={agent.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="w-20 h-20 rounded-full bg-gray-100 mb-3 overflow-hidden border-2 border-white shadow-sm">
                            <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <h3 className="font-bold text-gray-900 text-lg">{agent.name}</h3>
                        <p className="text-gray-500 text-sm mb-1">{agent.subLocation}</p>
                        
                        <div className="flex flex-col gap-1 text-[10px] text-gray-400 mb-4 bg-gray-50 w-full py-2 rounded-lg mt-2">
                            <p>Operating since: <span className="font-medium text-gray-600">{agent.experience}</span></p>
                            <p>Dealing in {agent.location}</p>
                        </div>

                        <Button 
                            fullWidth 
                            className="bg-[#D90429] hover:bg-[#b90424] shadow-none h-10 text-xs text-white"
                            onClick={() => alert(`Contacting ${agent.name}...`)}
                        >
                            Contact Agent
                        </Button>
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center py-10 text-gray-400">
                    <User size={48} className="mx-auto mb-2 opacity-20" />
                    <p>No agents found in this location.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
