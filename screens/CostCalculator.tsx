
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Save, Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { Button, Input } from '../components/UI';

// Define the structure for cost items
interface CostItemDef {
  id: string;
  label: string;
  section: 'Annexure I' | 'Annexure II' | 'Annexure III';
}

const COST_ITEMS: CostItemDef[] = [
  // Annexure I
  { id: 'bsp', label: 'Basic Selling Price (BSP)', section: 'Annexure I' },
  { id: 'efc', label: 'Electrification Charges (EFC)', section: 'Annexure I' },
  { id: 'ffc', label: 'Fire Fighting Charges (FFC)', section: 'Annexure I' },
  { id: 'ifms', label: 'Interest Free Maintainace Deposit (IFMS)', section: 'Annexure I' },
  { id: 'floorPlc', label: 'Floor PLC', section: 'Annexure I' },
  { id: 'viewPlc', label: 'View PLC', section: 'Annexure I' },
  { id: 'otherPlc', label: 'Other PLC', section: 'Annexure I' },
  { id: 'leaseRent', label: 'Lease Rent', section: 'Annexure I' },
  { id: 'amc', label: 'Annual Maintenance Charges', section: 'Annexure I' },
  { id: 'sinkingFund', label: 'Sinking Fund Charges', section: 'Annexure I' },
  
  // Annexure II
  { id: 'edc', label: 'External Development Charges (EDC)', section: 'Annexure II' },
  { id: 'idc', label: 'Internal Development Charges (IDC)', section: 'Annexure II' },

  // Annexure III
  { id: 'carOpen', label: 'Car Parking (Open)', section: 'Annexure III' },
  { id: 'carCovered', label: 'Car Parking (Covered)', section: 'Annexure III' },
  { id: 'club', label: 'Club Membership', section: 'Annexure III' },
  { id: 'water', label: 'Water Connection Charges', section: 'Annexure III' },
  { id: 'gas', label: 'Gas Connection Charges', section: 'Annexure III' },
  { id: 'meter', label: 'Meter Installation Charges (Per KVA)', section: 'Annexure III' },
  { id: 'golf', label: 'Golf Course Membership', section: 'Annexure III' },
  { id: 'essc', label: 'Electric Substation Charges (ESSC)', section: 'Annexure III' },
  { id: 'woodwork', label: 'Wood work Charges', section: 'Annexure III' },
  { id: 'appliance', label: 'Home Appliance Charges', section: 'Annexure III' },
];

export const CostCalculatorScreen: React.FC = () => {
  const navigate = useNavigate();
  
  // Header Form State
  const [headerDetails, setHeaderDetails] = useState({
    developer: '',
    project: '',
    propertyType: '',
    paymentPlan: '',
    location: '',
    size: '',
    unitType: ''
  });

  // Table Row State: Keyed by ID, stores price and units
  const [rows, setRows] = useState<Record<string, { price: string; units: string }>>({});

  // Accordion State
  const [expandedSections, setExpandedSections] = useState({
    'Annexure I': true,
    'Annexure II': true,
    'Annexure III': true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section as keyof typeof prev] }));
  };

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setHeaderDetails({ ...headerDetails, [e.target.name]: e.target.value });
  };

  const handleRowChange = (id: string, field: 'price' | 'units', value: string) => {
    // Allow numbers only
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setRows(prev => ({
        ...prev,
        [id]: {
          ...prev[id] || { price: '0', units: '0' },
          [field]: value
        }
      }));
    }
  };

  // Calculate totals
  const totalCost = useMemo(() => {
    return COST_ITEMS.reduce((acc, item) => {
      const row = rows[item.id] || { price: '0', units: '0' };
      const price = parseFloat(row.price) || 0;
      const units = parseFloat(row.units) || 0;
      return acc + (price * units);
    }, 0);
  }, [rows]);

  const resetForm = () => {
    if (window.confirm("Are you sure you want to reset all fields?")) {
      setHeaderDetails({
        developer: '', project: '', propertyType: '', 
        paymentPlan: '', location: '', size: '', unitType: ''
      });
      setRows({});
    }
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const renderSection = (sectionName: string) => {
    const items = COST_ITEMS.filter(i => i.section === sectionName);
    const isExpanded = expandedSections[sectionName as keyof typeof expandedSections];

    return (
      <div className="mb-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <button 
          onClick={() => toggleSection(sectionName)}
          className="w-full flex items-center justify-between bg-gray-50 py-3 px-4 text-left border-b border-gray-200 transition-colors hover:bg-gray-100"
        >
          <span className="font-bold text-sm text-gray-800 uppercase tracking-wide">{sectionName}</span>
          {isExpanded ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
        </button>
        
        {isExpanded && (
          <div className="divide-y divide-gray-100">
            {/* Table Header inside section for clarity on mobile when expanded */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1.2fr] bg-gray-50/50 text-[10px] font-bold text-gray-500 uppercase tracking-wider py-2">
              <div className="px-3">Particulars</div>
              <div className="px-2 text-center">Price/Unit</div>
              <div className="px-2 text-center">Units</div>
              <div className="px-3 text-right">Amount</div>
            </div>

            {items.map((item, index) => {
              const rowData = rows[item.id] || { price: '0', units: '0' };
              const amount = (parseFloat(rowData.price) || 0) * (parseFloat(rowData.units) || 0);
              const serialNo = index + 1 + (sectionName === 'Annexure II' ? 10 : sectionName === 'Annexure III' ? 12 : 0);
              
              return (
                <div key={item.id} className="grid grid-cols-[2fr_1fr_1fr_1.2fr] items-center hover:bg-blue-50/30 transition-colors py-1">
                  <div className="p-3 text-xs font-medium text-gray-700 flex items-start gap-2 leading-tight">
                    <span className="text-gray-400 w-5 shrink-0 text-[10px] pt-0.5">{serialNo}.</span>
                    {item.label}
                  </div>
                  <div className="px-1 py-2">
                    <input 
                      type="text" 
                      value={rowData.price === '0' ? '' : rowData.price}
                      placeholder="0"
                      onChange={(e) => handleRowChange(item.id, 'price', e.target.value)}
                      className="w-full text-center text-xs bg-gray-50 border border-gray-200 rounded-lg py-2 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="px-1 py-2">
                    <input 
                      type="text" 
                      value={rowData.units === '0' ? '' : rowData.units}
                      placeholder="0"
                      onChange={(e) => handleRowChange(item.id, 'units', e.target.value)}
                      className="w-full text-center text-xs bg-gray-50 border border-gray-200 rounded-lg py-2 focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="p-3 text-right text-xs font-bold text-gray-900 truncate">
                    {amount > 0 ? amount.toLocaleString('en-IN') : '0'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="flex-none px-4 py-4 flex items-center bg-white border-b border-gray-100 shadow-sm z-30">
        <button onClick={() => navigate(-1)} className="mr-3 p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-lg text-gray-900 flex-1">Cost Calculator</h1>
        <button onClick={resetForm} className="p-2 text-gray-500 hover:text-red-500 rounded-full transition-colors flex items-center gap-1 text-xs font-medium bg-gray-50 border border-gray-100">
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 pb-32">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3 mb-6">
           <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm"><Calculator size={20} /></div>
           <div>
             <h3 className="font-bold text-sm text-blue-900">Estimate Total Cost</h3>
             <p className="text-xs text-blue-700 mt-1 leading-relaxed opacity-80">
               Fill in the property details and cost breakdown below to get an accurate estimate of the total unit cost.
             </p>
           </div>
        </div>

        {/* Top Form */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-5 mb-6">
          <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3 mb-2">Property Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Developer Name *" name="developer" value={headerDetails.developer} onChange={handleHeaderChange} />
            <Input label="Project Name *" name="project" value={headerDetails.project} onChange={handleHeaderChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">Property Type</label>
              <select name="propertyType" value={headerDetails.propertyType} onChange={handleHeaderChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm appearance-none transition-all">
                <option value="">Select Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            
             <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">Payment Plan</label>
              <select name="paymentPlan" value={headerDetails.paymentPlan} onChange={handleHeaderChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm appearance-none transition-all">
                <option value="">Select Plan</option>
                <option value="Down Payment">Down Payment</option>
                <option value="CLP">Construction Linked (CLP)</option>
                <option value="Flexi">Flexi Payment Plan</option>
                <option value="PLP">Possession Linked (PLP)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Input label="Location *" name="location" value={headerDetails.location} onChange={handleHeaderChange} />
            <Input label="Size (Area) *" name="size" value={headerDetails.size} onChange={handleHeaderChange} />
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">Price Unit *</label>
              <select name="unitType" value={headerDetails.unitType} onChange={handleHeaderChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm appearance-none transition-all">
                <option value="">Select Unit</option>
                <option value="Sq. Ft.">Per Sq. Ft.</option>
                <option value="Sq. Yard">Per Sq. Yard</option>
                <option value="Sq. Meter">Per Sq. Meter</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calculation Table */}
        <div className="space-y-4">
           {renderSection('Annexure I')}
           {renderSection('Annexure II')}
           {renderSection('Annexure III')}
        </div>

      </div>

      {/* Sticky Bottom Summary */}
      <div className="flex-none border-t border-gray-100 bg-white z-40 safe-area-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
           <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Grand Total</span>
           <span className="text-lg font-bold text-[#D90429] font-mono">{formatCurrency(totalCost)}</span>
        </div>
        <div className="p-4">
          <Button 
            fullWidth 
            className="bg-[#D90429] hover:bg-[#b90424] text-white shadow-lg shadow-red-200 py-3.5 rounded-xl font-bold tracking-wide"
            onClick={() => alert(`Cost Sheet Saved! Total: ${formatCurrency(totalCost)}`)}
          >
            <Save size={18} className="mr-2" /> Save Estimate
          </Button>
        </div>
      </div>
    </div>
  );
};
