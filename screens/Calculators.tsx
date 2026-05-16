
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Calculator, CheckCircle, AlertCircle } from 'lucide-react';
import { Button, Input } from '../components/UI';

type TabType = 'eligibility' | 'emi' | 'rental' | 'future';

export const CalculatorsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('eligibility');

  // --- LOAN ELIGIBILITY STATE ---
  const [eligibilityForm, setEligibilityForm] = useState({
    loanAmount: '',
    netIncome: '',
    existingEmi: '',
    tenure: '20',
    rate: '8.5'
  });
  const [eligibilityResult, setEligibilityResult] = useState<{ eligible: boolean; maxLoan: number; emi: number } | null>(null);

  // --- EMI STATE ---
  const [emiForm, setEmiForm] = useState({
    amount: '2500000',
    tenure: '10',
    rate: '10'
  });
  const [emiResult, setEmiResult] = useState<number | null>(null);

  // --- RENTAL STATE ---
  const [rentalForm, setRentalForm] = useState({
    value: '40000',
    yieldRate: '12' // Annual yield %
  });
  const [rentalResult, setRentalResult] = useState<number | null>(null);

  // --- FUTURE VALUE STATE ---
  const [futureForm, setFutureForm] = useState({
    currentValue: '2500000',
    years: '10',
    appreciation: '10'
  });
  const [futureResult, setFutureResult] = useState<number | null>(null);

  // --- HELPERS ---
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const calculatePMT = (rate: number, nper: number, pv: number) => {
    const r = rate / 1200;
    const n = nper * 12;
    return (pv * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const calculatePV = (rate: number, nper: number, pmt: number) => {
    const r = rate / 1200;
    const n = nper * 12;
    return pmt * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
  };

  // --- HANDLERS ---

  const handleEligibilityCheck = () => {
    const income = parseFloat(eligibilityForm.netIncome) || 0;
    const obligations = parseFloat(eligibilityForm.existingEmi) || 0;
    const requestedLoan = parseFloat(eligibilityForm.loanAmount) || 0;
    const rate = parseFloat(eligibilityForm.rate) || 8.5;
    const tenure = parseFloat(eligibilityForm.tenure) || 20;

    // Logic: Assuming 50% of net income can go towards EMIs (FOIR)
    const disposableIncome = income - obligations;
    const maxEmiCapacity = disposableIncome * 0.50;

    if (maxEmiCapacity <= 0) {
      setEligibilityResult({ eligible: false, maxLoan: 0, emi: 0 });
      return;
    }

    const maxLoanPossible = calculatePV(rate, tenure, maxEmiCapacity);
    const requestedLoanEmi = calculatePMT(rate, tenure, requestedLoan);

    setEligibilityResult({
      eligible: maxLoanPossible >= requestedLoan,
      maxLoan: maxLoanPossible,
      emi: requestedLoanEmi
    });
  };

  const handleEmiCalculate = () => {
    const P = parseFloat(emiForm.amount) || 0;
    const R = parseFloat(emiForm.rate) || 0;
    const N = parseFloat(emiForm.tenure) || 0;

    if (P > 0 && R > 0 && N > 0) {
      const emi = calculatePMT(R, N, P);
      setEmiResult(emi);
    }
  };

  const handleRentalCalculate = () => {
    const val = parseFloat(rentalForm.value) || 0;
    const rate = parseFloat(rentalForm.yieldRate) || 0;
    // Simple logic: Value * (Rate/100) / 12 months?? Or just Value * Rate/100?
    // Using standard yield formula: (Annual Rent / Property Value) * 100 = Yield
    // So Monthly Rent = (Property Value * Yield/100) / 12
    const monthlyRent = (val * (rate / 100)) / 12;
    setRentalResult(monthlyRent);
  };

  const handleFutureCalculate = () => {
    const pv = parseFloat(futureForm.currentValue) || 0;
    const r = parseFloat(futureForm.appreciation) || 0;
    const n = parseFloat(futureForm.years) || 0;
    // FV = PV * (1 + r/100)^n
    const fv = pv * Math.pow((1 + r / 100), n);
    setFutureResult(fv);
  };

  const resetAll = () => {
    if (activeTab === 'eligibility') {
      setEligibilityForm({ loanAmount: '', netIncome: '', existingEmi: '', tenure: '20', rate: '8.5' });
      setEligibilityResult(null);
    } else if (activeTab === 'emi') {
      setEmiForm({ amount: '2500000', tenure: '10', rate: '10' });
      setEmiResult(null);
    } else if (activeTab === 'rental') {
      setRentalForm({ value: '', yieldRate: '3' });
      setRentalResult(null);
    } else {
      setFutureForm({ currentValue: '', years: '10', appreciation: '5' });
      setFutureResult(null);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col relative overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex-none px-4 py-4 flex items-center border-b border-gray-100 shadow-sm z-10 bg-white sticky top-0">
        <button onClick={() => navigate(-1)} className="mr-4 p-2 hover:bg-gray-50 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="font-bold text-xl text-gray-900">Financial Calculators</h1>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar bg-gray-50 border-b border-gray-200">
        {[
          { id: 'eligibility', label: 'Loan Eligibility' },
          { id: 'emi', label: 'EMI' },
          { id: 'rental', label: 'Rental Value' },
          { id: 'future', label: 'Future Value' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex-1 min-w-[120px] py-4 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors ${activeTab === tab.id
                ? 'border-[#D90429] text-[#D90429] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-5 pb-24">

        {/* --- LOAN ELIGIBILITY CONTENT --- */}
        {activeTab === 'eligibility' && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <Input
                label="Loan Required (₹)"
                type="number"
                value={eligibilityForm.loanAmount}
                onChange={(e) => setEligibilityForm({ ...eligibilityForm, loanAmount: e.target.value })}
              />
              <Input
                label="Net income per month (₹)"
                type="number"
                value={eligibilityForm.netIncome}
                onChange={(e) => setEligibilityForm({ ...eligibilityForm, netIncome: e.target.value })}
              />
              <Input
                label="Existing loan commitments (₹)"
                type="number"
                value={eligibilityForm.existingEmi}
                onChange={(e) => setEligibilityForm({ ...eligibilityForm, existingEmi: e.target.value })}
              />
              <Input
                label="Loan Tenure (years)"
                type="number"
                value={eligibilityForm.tenure}
                onChange={(e) => setEligibilityForm({ ...eligibilityForm, tenure: e.target.value })}
              />
              <Input
                label="Rate of Interest (%)"
                type="number"
                value={eligibilityForm.rate}
                onChange={(e) => setEligibilityForm({ ...eligibilityForm, rate: e.target.value })}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleEligibilityCheck} className="bg-[#D90429] hover:bg-[#b90424]">Check Eligibility</Button>
              <button onClick={resetAll} className="px-4 text-xs text-gray-500 hover:text-gray-700">Reset all</button>
            </div>

            {eligibilityResult && (
              <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                {eligibilityResult.eligible ? (
                  <div className="text-left space-y-2">
                    <h3 className="text-lg font-bold text-gray-900">You are Eligible for this loan</h3>
                    <p className="text-sm text-gray-600">
                      ₹{parseFloat(eligibilityForm.loanAmount).toLocaleString()} at EMI {formatCurrency(eligibilityResult.emi)}
                    </p>
                    <div className="pt-2">
                      <p className="text-xs text-gray-500">You are Eligible for a maximum loan of</p>
                      <p className="text-sm font-bold text-[#D90429]">{formatCurrency(eligibilityResult.maxLoan)}</p>
                    </div>
                    <Button variant="outline" className="mt-4 border-red-200 text-[#D90429] h-10 px-6 text-sm" onClick={() => navigate('/home-loan')}>Apply for Loan</Button>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2">
                      <AlertCircle size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Eligibility Check Failed</h3>
                    <p className="text-sm text-gray-600">
                      Maximum eligible amount: {formatCurrency(eligibilityResult.maxLoan)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* --- EMI CALCULATOR CONTENT --- */}
        {activeTab === 'emi' && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <Input
                label="Loan Amount (₹)"
                type="number"
                value={emiForm.amount}
                onChange={(e) => setEmiForm({ ...emiForm, amount: e.target.value })}
              />
              <Input
                label="Loan Tenure (years)"
                type="number"
                value={emiForm.tenure}
                onChange={(e) => setEmiForm({ ...emiForm, tenure: e.target.value })}
              />
              <Input
                label="Rate of Interest (%)"
                type="number"
                value={emiForm.rate}
                onChange={(e) => setEmiForm({ ...emiForm, rate: e.target.value })}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleEmiCalculate} className="bg-[#D90429] hover:bg-[#b90424]">Check Eligibility</Button>
              <button onClick={resetAll} className="px-4 text-xs text-gray-500 hover:text-gray-700">Reset all</button>
            </div>

            {emiResult !== null && (
              <div className="mt-8 flex flex-col items-end">
                <p className="text-lg text-gray-600 mb-1">Monthly EMI</p>
                <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(emiResult)}</h3>

                <div className="mt-6 w-full flex justify-end">
                  <Button variant="outline" className="border-red-200 text-[#D90429] h-10 px-6 text-sm" onClick={() => navigate('/home-loan')}>Apply for Loan</Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- RENTAL VALUE CONTENT --- */}
        {activeTab === 'rental' && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <Input
                label="Property Value (₹)"
                type="number"
                value={rentalForm.value}
                onChange={(e) => setRentalForm({ ...rentalForm, value: e.target.value })}
              />
              <Input
                label="Year (per month)"
                type="number"
                value="12"
                readOnly
                className="bg-gray-100"
              />
              <Input
                label="Rate of Rent (%)"
                type="number"
                value={rentalForm.yieldRate}
                onChange={(e) => setRentalForm({ ...rentalForm, yieldRate: e.target.value })}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleRentalCalculate} className="bg-[#D90429] hover:bg-[#b90424]">Check Value</Button>
              <button onClick={resetAll} className="px-4 text-xs text-gray-500 hover:text-gray-700">Reset all</button>
            </div>

            {rentalResult !== null && (
              <div className="mt-8 flex flex-col items-center justify-center py-10">
                <p className="text-xl font-bold text-gray-700 mb-2">Your rental value is</p>
                <h2 className="text-3xl font-bold text-gray-800">{formatCurrency(rentalResult)}</h2>
              </div>
            )}
          </div>
        )}

        {/* --- FUTURE VALUE CONTENT --- */}
        {activeTab === 'future' && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <Input
                label="Current property value (₹)"
                type="number"
                value={futureForm.currentValue}
                onChange={(e) => setFutureForm({ ...futureForm, currentValue: e.target.value })}
              />
              <Input
                label="No. of year"
                type="number"
                value={futureForm.years}
                onChange={(e) => setFutureForm({ ...futureForm, years: e.target.value })}
              />
              <Input
                label="Average appreciation (%)"
                type="number"
                value={futureForm.appreciation}
                onChange={(e) => setFutureForm({ ...futureForm, appreciation: e.target.value })}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleFutureCalculate} className="bg-[#D90429] hover:bg-[#b90424] px-8">Check</Button>
              <button onClick={resetAll} className="px-4 text-xs text-gray-500 hover:text-gray-700">Reset all</button>
            </div>

            {futureResult !== null && (
              <div className="mt-8 flex flex-col items-center justify-center py-6">
                <p className="text-xl font-bold text-gray-900 mb-2">Your value is</p>
                <h2 className="text-3xl font-bold text-gray-900">{formatCurrency(futureResult)}</h2>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
