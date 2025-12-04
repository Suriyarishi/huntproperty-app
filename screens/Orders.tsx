
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Search } from 'lucide-react';

export const OrdersScreen: React.FC = () => {
  const navigate = useNavigate();

  // Mock Order Data
  const orders = [
    { id: 'ORD-2458', date: 'Oct 24, 2024', plan: 'Gold Plan Subscription', amount: '₹ 3,500', status: 'Success' },
    { id: 'ORD-2450', date: 'Sep 20, 2024', plan: 'Ad Boost - 7 Days', amount: '₹ 499', status: 'Success' },
    { id: 'ORD-2412', date: 'Aug 15, 2024', plan: 'Silver Plan Subscription', amount: '₹ 1,400', status: 'Expired' },
    { id: 'ORD-2390', date: 'Jul 01, 2024', plan: 'Ad Boost - 3 Days', amount: '₹ 199', status: 'Failed' },
  ];

  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-gray-50 relative">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-xl text-gray-900">Order History</h1>
      </div>

      <div className="p-4 space-y-4 pb-24">
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full bg-white pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary text-sm"
          />
        </div>

        {/* Order List */}
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
               <div className="flex justify-between items-start">
                 <div className="flex gap-3">
                   <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                     <FileText size={20} />
                   </div>
                   <div>
                     <h3 className="font-bold text-sm text-gray-900">{order.plan}</h3>
                     <p className="text-[10px] text-gray-500 font-medium mt-0.5">ID: {order.id}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <span className="font-bold text-gray-900">{order.amount}</span>
                 </div>
               </div>
               
               <div className="w-full h-px bg-gray-50"></div>

               <div className="flex justify-between items-center">
                 <div>
                   <p className="text-[10px] text-gray-400">Date</p>
                   <p className="text-xs font-medium text-gray-700">{order.date}</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                      order.status === 'Success' ? 'bg-green-50 text-green-600' : 
                      order.status === 'Failed' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {order.status}
                    </span>
                    {order.status === 'Success' && (
                      <button className="p-2 hover:bg-gray-50 rounded-full text-blue-600 transition-colors">
                        <Download size={16} />
                      </button>
                    )}
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
