import React, { useState } from 'react';
import {
    ArrowLeft, ArrowRight, Building2, MapPin,
    User, Phone, Mail, FileText, ChevronRight,
    Plus, Image as ImageIcon, Layout, Navigation,
    DollarSign, Percent, ShieldCheck, Check,
    Upload, Trash2, Calendar, Search, Home,
    Info, Star, Layers, Activity, Dumbbell,
    Waves, Bike, Timer, Sun, Wifi, Video
} from 'lucide-react';

interface ProjectListingFlowProps {
    onCancel: () => void;
}

const ProjectListingFlow: React.FC<ProjectListingFlowProps> = ({ onCancel }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [projectCategory, setProjectCategory] = useState<'Commercial' | 'Residential' | 'Agricultural' | null>(null);
    const [projectSubtype, setProjectSubtype] = useState<string | null>(null);
    const [residentialSubtype, setResidentialSubtype] = useState<'Apartment' | 'Plot' | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        // STEP 1: Builder Details
        builderName: '',
        builderAddress: '',
        builderCity: '',
        builderState: '',
        builderPincode: '',
        builderContactPerson: '',
        builderMobile: '',
        builderEmail: '',

        // STEP 2: Builder RERA
        hasBuilderRera: null as boolean | null,
        builderFirmState: '',
        reraRegistrationState: '',
        incorporationCert: null as File | null,
        reraCert: null as File | null,
        incorporationNumber: '',
        reraNumber: '',
        acceptedTerms: false,

        // STEP 3: Authorized Person
        authName: '',
        authDesignation: '',
        authEmail: '',
        authMobile: '',
        authPan: '',
        authPanFile: null as File | null,
        authAadhaar: '',
        authAadhaarFile: null as File | null,

        // STEP 5: Conditional Flow Data (Simplified for this example)
        projectDetails: {
            name: '',
            location: '',
            description: '',
            price: '',
        },

        // FINAL STEP: Media
        media: [] as File[],
    });

    const nextStep = () => {
        if (currentStep === 2 && !formData.hasBuilderRera) {
            if (!formData.incorporationCert) {
                alert("Incorporation Certificate is required to proceed.");
                return;
            }
            if (!formData.acceptedTerms) {
                alert("You must accept the Terms & Conditions.");
                return;
            }
        }

        if (currentStep === 4) {
            if (!projectCategory) {
                alert("Please select a project category.");
                return;
            }
            if (!projectSubtype) {
                alert(`Please select a specific ${projectCategory} type.`);
                return;
            }
        }

        setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(1, prev - 1));
    };

    const handleFileUpload = (field: keyof typeof formData | string, file: File | null) => {
        setFormData(prev => ({ ...prev, [field]: file }));
    };

    const renderProgressBar = () => {
        const percentage = (currentStep / 6) * 100;
        return (
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-8">
                <div
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        );
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[600px] flex flex-col items-center justify-center space-y-12 py-20 animate-fade-in">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                    <div className="relative w-32 h-32 bg-primary text-[#1a1c21] rounded-[40px] flex items-center justify-center shadow-2xl shadow-primary/40 animate-bounce">
                        <Check size={64} strokeWidth={3} />
                    </div>
                </div>

                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-5xl font-black text-[#1a1c21] uppercase tracking-tighter">Congratulations!</h2>
                        <h3 className="text-xl font-bold text-emerald-500 uppercase tracking-widest">Project Submitted Successfully</h3>
                    </div>
                    <p className="text-gray-400 font-bold text-sm max-w-md mx-auto leading-relaxed">
                        Your project listing has been sent for review. Our team will verify the details and it will be live within 24-48 hours.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
                    <button 
                        onClick={() => onCancel()}
                        className="flex-1 h-18 bg-[#1a1c21] text-white rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-xl py-6"
                    >
                        Go to Home
                    </button>
                    <button 
                        className="flex-1 h-18 bg-primary text-[#1a1c21] rounded-[24px] font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl py-6"
                    >
                        Project Boost Option
                    </button>
                </div>

                <div className="pt-8 flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center">
                        <Mail size={18} />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confirmation email sent</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-8 md:py-16">
            <div className="bg-white rounded-[48px] shadow-2xl shadow-gray-200/40 border border-gray-100/50 overflow-hidden">
                <div className="p-8 md:p-16">
                    <div className="flex flex-col lg:flex-row gap-12 min-h-[700px] animate-fade-in-up">
                        <aside className="hidden lg:block w-72 border-r border-gray-100 pr-8">
                            <nav className="space-y-1">
                                {[
                                    "Builder Details",
                                    "RERA Validation",
                                    "Authorized Person",
                                    "Project Category",
                                    "Project Flow",
                                    "Review & Submit"
                                ].map((label, idx) => {
                                    const stepIdx = idx + 1;
                                    const isActive = currentStep === stepIdx;
                                    const isCompleted = currentStep > stepIdx;
                                    return (
                                        <div
                                            key={idx}
                                            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-primary text-[#1a1c21] font-black' : 'text-gray-400'
                                                }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${isActive ? 'bg-white text-[#1a1c21]' : isCompleted ? 'bg-primary text-[#1a1c21]' : 'bg-gray-100'
                                                }`}>
                                                {isCompleted ? <Check size={12} strokeWidth={4} /> : stepIdx}
                                            </div>
                                            <span className="text-xs truncate">{label}</span>
                                        </div>
                                    );
                                })}
                            </nav>
                        </aside>

                        <div className="flex-1 flex flex-col">
                            {renderProgressBar()}

                            <div className="flex-1 space-y-12">
                                <div className="flex items-center justify-between border-b border-gray-50 pb-8">
                                    <div className="space-y-1">
                                        <h3 className="text-3xl font-black text-[#1a1c21] uppercase tracking-tight">
                                            {currentStep === 1 && "Builder Details"}
                                            {currentStep === 2 && "Builder RERA Validation"}
                                            {currentStep === 3 && "Authorized Person Details"}
                                            {currentStep === 4 && "Select Project Category"}
                                            {currentStep === 5 && `Project Flow: ${projectCategory}`}
                                            {currentStep === 6 && "Review & Media Upload"}
                                        </h3>
                                        <p className="text-[10px] font-bold text-teal-500 uppercase tracking-[0.3em]">
                                            Step {currentStep} of 6
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        {currentStep > 1 && (
                                            <button
                                                onClick={prevStep}
                                                className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-[#1a1c21] hover:text-primary transition-all flex items-center gap-2 group"
                                            >
                                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                                <span className="text-[10px] font-black uppercase tracking-widest pr-2">Back</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={onCancel}
                                            className="p-4 text-gray-300 hover:text-red-500 transition-colors uppercase font-black text-[10px] tracking-widest"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                                <div className="min-h-[500px]">
                                    {currentStep === 1 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Builder / Developer Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.builderName}
                                                    onChange={(e) => setFormData({ ...formData, builderName: e.target.value })}
                                                    placeholder="Enter Builder Name"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address Line</label>
                                                <input
                                                    type="text"
                                                    value={formData.builderAddress}
                                                    onChange={(e) => setFormData({ ...formData, builderAddress: e.target.value })}
                                                    placeholder="Full Address"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                                                <input
                                                    type="text"
                                                    value={formData.builderCity}
                                                    onChange={(e) => setFormData({ ...formData, builderCity: e.target.value })}
                                                    placeholder="City"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">State</label>
                                                <input
                                                    type="text"
                                                    value={formData.builderState}
                                                    onChange={(e) => setFormData({ ...formData, builderState: e.target.value })}
                                                    placeholder="State"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pincode</label>
                                                <input
                                                    type="text"
                                                    value={formData.builderPincode}
                                                    onChange={(e) => setFormData({ ...formData, builderPincode: e.target.value })}
                                                    placeholder="6-digit Pincode"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Contact Person</label>
                                                <input
                                                    type="text"
                                                    value={formData.builderContactPerson}
                                                    onChange={(e) => setFormData({ ...formData, builderContactPerson: e.target.value })}
                                                    placeholder="Name"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label>
                                                <input
                                                    type="text"
                                                    value={formData.builderMobile}
                                                    onChange={(e) => setFormData({ ...formData, builderMobile: e.target.value })}
                                                    placeholder="10-digit Mobile"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email ID</label>
                                                <input
                                                    type="email"
                                                    value={formData.builderEmail}
                                                    onChange={(e) => setFormData({ ...formData, builderEmail: e.target.value })}
                                                    placeholder="Email"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div className="space-y-12 animate-fade-in">
                                            <div className="space-y-6">
                                                <label className="text-sm font-black text-[#1a1c21] uppercase tracking-widest block text-center">Do you have Builder RERA?</label>
                                                <div className="flex gap-4 max-w-md mx-auto">
                                                    {[
                                                        { value: true, label: 'Yes' },
                                                        { value: false, label: 'No' },
                                                    ].map((opt) => (
                                                        <button
                                                            key={opt.label}
                                                            onClick={() => setFormData({ ...formData, hasBuilderRera: opt.value })}
                                                            className={`flex-1 h-16 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${formData.hasBuilderRera === opt.value
                                                                ? 'bg-primary border-primary text-[#1a1c21] shadow-xl shadow-primary/20'
                                                                : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                                                }`}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {formData.hasBuilderRera === true && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 p-8 rounded-[32px] border border-gray-100 animate-fade-in-up">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Builder Firm Registration State</label>
                                                        <select 
                                                            className="w-full h-14 bg-white border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm appearance-none"
                                                            value={formData.builderFirmState}
                                                            onChange={(e) => setFormData({...formData, builderFirmState: e.target.value})}
                                                        >
                                                            <option value="">Select State</option>
                                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                            <option value="Haryana">Haryana</option>
                                                            <option value="Delhi">Delhi</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">RERA Registration State</label>
                                                        <select 
                                                            className="w-full h-14 bg-white border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm appearance-none"
                                                            value={formData.reraRegistrationState}
                                                            onChange={(e) => setFormData({...formData, reraRegistrationState: e.target.value})}
                                                        >
                                                            <option value="">Select State</option>
                                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                            <option value="Haryana">Haryana</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Incorporation Certificate Number</label>
                                                        <input
                                                            type="text"
                                                            value={formData.incorporationNumber}
                                                            onChange={(e) => setFormData({ ...formData, incorporationNumber: e.target.value })}
                                                            placeholder="CIN Number"
                                                            className="w-full h-14 bg-white border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">RERA Number</label>
                                                        <input
                                                            type="text"
                                                            value={formData.reraNumber}
                                                            onChange={(e) => setFormData({ ...formData, reraNumber: e.target.value })}
                                                            placeholder="RERA Number"
                                                            className="w-full h-14 bg-white border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Company Incorporation Certificate</label>
                                                        <div className="relative group">
                                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleFileUpload('incorporationCert', e.target.files?.[0] || null)} />
                                                            <div className="w-full h-14 bg-white border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center gap-2 text-gray-400 group-hover:border-primary group-hover:text-primary transition-all">
                                                                <Upload size={16} />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">{formData.incorporationCert ? formData.incorporationCert.name : 'Upload Certificate'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">RERA Certificate</label>
                                                        <div className="relative group">
                                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleFileUpload('reraCert', e.target.files?.[0] || null)} />
                                                            <div className="w-full h-14 bg-white border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center gap-2 text-gray-400 group-hover:border-primary group-hover:text-primary transition-all">
                                                                <Upload size={16} />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">{formData.reraCert ? formData.reraCert.name : 'Upload RERA Cert'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {formData.hasBuilderRera === false && (
                                                <div className="space-y-8 animate-fade-in-up">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50 p-8 rounded-[32px] border border-gray-100">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Builder Firm Registration State</label>
                                                            <input
                                                                type="text"
                                                                value={formData.builderFirmState}
                                                                onChange={(e) => setFormData({ ...formData, builderFirmState: e.target.value })}
                                                                placeholder="Registration State"
                                                                className="w-full h-14 bg-white border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Incorporation Certificate Number</label>
                                                            <input
                                                                type="text"
                                                                value={formData.incorporationNumber}
                                                                onChange={(e) => setFormData({ ...formData, incorporationNumber: e.target.value })}
                                                                placeholder="CIN Number"
                                                                className="w-full h-14 bg-white border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                            />
                                                        </div>
                                                        <div className="md:col-span-2 space-y-2">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Company Incorporation Certificate</label>
                                                            <div className="relative group">
                                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleFileUpload('incorporationCert', e.target.files?.[0] || null)} />
                                                                <div className="w-full h-32 bg-white border-4 border-dashed border-gray-100 rounded-[24px] flex flex-col items-center justify-center gap-3 text-gray-400 group-hover:border-primary group-hover:text-primary transition-all">
                                                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-teal-50">
                                                                        <Upload size={24} />
                                                                    </div>
                                                                    <span className="text-[10px] font-black uppercase tracking-widest">{formData.incorporationCert ? formData.incorporationCert.name : 'Click to upload Incorporation Certificate'}</span>
                                                                </div>
                                                            </div>
                                                            {!formData.incorporationCert && (
                                                                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-2 flex items-center gap-1">
                                                                    <Info size={12} /> This document is mandatory
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="bg-[#1a1c21] text-white p-10 rounded-[40px] space-y-6 shadow-2xl">
                                                        <div className="space-y-2">
                                                            <h4 className="text-xl font-black uppercase tracking-tight text-primary">Consent Declaration</h4>
                                                            <p className="text-xs font-bold text-gray-400 tracking-wide uppercase">Hunt Property Compliance Framework</p>
                                                        </div>
                                                        <div className="max-h-48 overflow-y-auto pr-4 space-y-4 text-xs font-medium text-gray-400 leading-relaxed scrollbar-thin scrollbar-thumb-teal-500">
                                                            <p>I hereby declare that the information provided regarding the non-RERA status of the builder and project is true to the best of my knowledge.</p>
                                                            <p>I understand that providing false information can lead to immediate termination of the listing and potential legal action.</p>
                                                            <p>We commit to adhering to all local laws and regulations governing real estate developments in the respective state of operation.</p>
                                                            <p>The developer acknowledges that Hunt Property is a listing platform and does not guarantee the legal standing of the project to end consumers.</p>
                                                        </div>
                                                        <label className="flex items-center gap-4 cursor-pointer pt-4 group">
                                                            <input 
                                                                type="checkbox" 
                                                                className="hidden" 
                                                                checked={formData.acceptedTerms}
                                                                onChange={(e) => setFormData({...formData, acceptedTerms: e.target.checked})}
                                                            />
                                                            <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${formData.acceptedTerms ? 'bg-primary border-primary text-[#1a1c21]' : 'border-gray-700'}`}>
                                                                {formData.acceptedTerms && <Check size={16} strokeWidth={4} />}
                                                            </div>
                                                            <span className="text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors">I accept the Terms & Conditions</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {currentStep === 3 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.authName}
                                                    onChange={(e) => setFormData({ ...formData, authName: e.target.value })}
                                                    placeholder="Authorized Person Name"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Designation</label>
                                                <input
                                                    type="text"
                                                    value={formData.authDesignation}
                                                    onChange={(e) => setFormData({ ...formData, authDesignation: e.target.value })}
                                                    placeholder="e.g., Director, CEO"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={formData.authEmail}
                                                    onChange={(e) => setFormData({ ...formData, authEmail: e.target.value })}
                                                    placeholder="Official Email"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label>
                                                <input
                                                    type="text"
                                                    value={formData.authMobile}
                                                    onChange={(e) => setFormData({ ...formData, authMobile: e.target.value })}
                                                    placeholder="10-digit Mobile"
                                                    className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">PAN Number & Upload</label>
                                                <div className="flex gap-4">
                                                    <input
                                                        type="text"
                                                        value={formData.authPan}
                                                        onChange={(e) => setFormData({ ...formData, authPan: e.target.value })}
                                                        placeholder="PAN Number"
                                                        className="flex-1 h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                    />
                                                    <div className="relative">
                                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload('authPanFile', e.target.files?.[0] || null)} />
                                                        <div className={`h-14 px-6 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-all ${formData.authPanFile ? 'border-teal-500 bg-teal-50 text-teal-600' : 'border-gray-100 text-gray-400 hover:border-primary'}`}>
                                                            <Upload size={16} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">{formData.authPanFile ? 'Done' : 'Attach'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Aadhaar Number & Upload</label>
                                                <div className="flex gap-4">
                                                    <input
                                                        type="text"
                                                        value={formData.authAadhaar}
                                                        onChange={(e) => setFormData({ ...formData, authAadhaar: e.target.value })}
                                                        placeholder="Aadhaar Number"
                                                        className="flex-1 h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                    />
                                                    <div className="relative">
                                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload('authAadhaarFile', e.target.files?.[0] || null)} />
                                                        <div className={`h-14 px-6 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-all ${formData.authAadhaarFile ? 'border-teal-500 bg-teal-50 text-teal-600' : 'border-gray-100 text-gray-400 hover:border-primary'}`}>
                                                            <Upload size={16} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">{formData.authAadhaarFile ? 'Done' : 'Attach'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 4 && (
                                        <div className="space-y-16 animate-fade-in max-w-6xl mx-auto">
                                            <div className="flex flex-col items-center gap-16">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
                                                    {[
                                                        { id: 'Commercial', label: 'Commercial', icon: Building2, desc: 'Corporate & Retail' },
                                                        { id: 'Residential', label: 'Residential', icon: Home, desc: 'Living & Housing' },
                                                        { id: 'Agricultural', label: 'Agricultural', icon: MapPin, desc: 'Land & Farming' }
                                                    ].map((cat) => (
                                                        <button
                                                            key={cat.id}
                                                            onClick={() => {
                                                                setProjectCategory(cat.id as any);
                                                                setProjectSubtype(null);
                                                            }}
                                                            className={`group p-8 rounded-[32px] transition-all duration-300 relative flex flex-col items-center gap-5 border bg-white/50 backdrop-blur-sm ${
                                                                projectCategory === cat.id 
                                                                ? 'border-primary ring-4 ring-primary/5 shadow-xl shadow-teal-500/5' 
                                                                : 'border-gray-200 hover:border-primary/30 shadow-sm hover:shadow-md'
                                                            }`}
                                                        >
                                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                                                                projectCategory === cat.id 
                                                                ? 'bg-primary text-[#1a1c21]' 
                                                                : 'bg-gray-50 text-gray-600 group-hover:bg-gray-100 group-hover:text-primary'
                                                            }`}>
                                                                <cat.icon size={28} strokeWidth={1.5} />
                                                            </div>
                                                            <div className="space-y-1 text-center">
                                                                <h4 className={`text-[15px] font-bold uppercase tracking-widest transition-colors ${projectCategory === cat.id ? 'text-[#1a1c21]' : 'text-gray-800'}`}>{cat.label}</h4>
                                                                <p className="text-[12px] font-medium text-gray-500 uppercase tracking-widest leading-none">{cat.desc}</p>
                                                            </div>
                                                            {projectCategory === cat.id && (
                                                                <div className="absolute top-4 right-4 text-primary">
                                                                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[#1a1c21]">
                                                                        <Check size={12} strokeWidth={4} />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>

                                                {projectCategory && (
                                                    <div className="w-full space-y-10 pt-16 animate-fade-in-up border-t border-gray-50/50 px-4">
                                                        <div className="text-center space-y-3">
                                                            <h4 className="text-lg font-bold text-[#1a1c21] uppercase tracking-[0.2em]">Select {projectCategory} Classification</h4>
                                                            <div className="w-12 h-1 bg-primary mx-auto rounded-full opacity-50" />
                                                        </div>

                                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                                            {(projectCategory === 'Residential' 
                                                                ? [
                                                                    'Flats', 'Multi-Story Apartments', 'House or Kothi', 'Villa', 
                                                                    'Duplex', 'Penthouse', 'Plot/Land', 'Builder Floor', 
                                                                    'Studio Apartment', 'Service Apartment'
                                                                ] 
                                                                : projectCategory === 'Commercial' 
                                                                ? [
                                                                    'Shop', 'Office Space', 'Showroom', 'Commercial Land', 
                                                                    'IT Space', 'Food Court', 'Restaurants', 'Industrial Land', 
                                                                    'Warehouse/Godown', 'Banquet Hall', 'Cineplex/Cinema Hall', 
                                                                    'Hostel/PG', 'Industrial Building', 'Industrial Shed'
                                                                ] 
                                                                : [
                                                                    'Farm House', 'Farm Land', 'Agricultural Land'
                                                                ]
                                                            ).map((sub) => (
                                                                <button
                                                                    key={sub}
                                                                    onClick={() => {
                                                                        setProjectSubtype(sub);
                                                                        if (projectCategory === 'Residential') {
                                                                            if (sub === 'Plot/Land') setResidentialSubtype('Plot');
                                                                            else setResidentialSubtype('Apartment');
                                                                        }
                                                                    }}
                                                                    className={`px-4 py-5 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-4 text-center group relative ${
                                                                        projectSubtype === sub
                                                                        ? 'bg-[#1a1c21] border-primary text-white shadow-lg'
                                                                        : 'bg-white border-gray-200 text-gray-500 hover:border-primary/30 hover:bg-gray-50/50'
                                                                    }`}
                                                                >
                                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                                                        projectSubtype === sub 
                                                                        ? 'bg-primary text-[#1a1c21]' 
                                                                        : 'bg-gray-50 text-primary opacity-60 group-hover:opacity-100 group-hover:bg-gray-100'
                                                                    }`}>
                                                                        {projectCategory === 'Residential' ? <Home size={18} strokeWidth={2} /> : projectCategory === 'Commercial' ? <Building2 size={18} strokeWidth={2} /> : <MapPin size={18} strokeWidth={2} />}
                                                                    </div>
                                                                    <span className={`text-[11px] font-bold uppercase tracking-widest leading-relaxed ${projectSubtype === sub ? 'text-white' : 'text-[#1a1c21] opacity-70 hover:opacity-100 transition-opacity'}`}>
                                                                        {sub}
                                                                    </span>
                                                                    {projectSubtype === sub && (
                                                                        <div className="absolute top-2 right-2">
                                                                            <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center text-[#1a1c21]">
                                                                                <Check size={8} strokeWidth={5} />
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 5 && (
                                        <div className="space-y-12 animate-fade-in">
                                            <div className="bg-teal-50 border border-teal-100 p-8 rounded-[32px] flex items-center gap-6">
                                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm shrink-0">
                                                    <Activity size={32} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-xl font-black text-[#1a1c21] uppercase tracking-tight">
                                                        {projectSubtype || projectCategory} Details
                                                    </h4>
                                                    <p className="text-xs font-bold text-teal-600 uppercase tracking-widest opacity-70">
                                                        Tailoring the list for {projectCategory} requirements
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Project Name</label>
                                                    <input
                                                        type="text"
                                                        value={formData.projectDetails.name}
                                                        onChange={(e) => setFormData({...formData, projectDetails: {...formData.projectDetails, name: e.target.value}})}
                                                        placeholder="Name of your project"
                                                        className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Location / Locality</label>
                                                    <input
                                                        type="text"
                                                        value={formData.projectDetails.location}
                                                        onChange={(e) => setFormData({...formData, projectDetails: {...formData.projectDetails, location: e.target.value}})}
                                                        placeholder="Locality, City"
                                                        className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm"
                                                    />
                                                </div>

                                                {projectCategory === 'Commercial' && (
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price Range (Cr)</label>
                                                        <input type="text" placeholder="Start - End" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm" />
                                                    </div>
                                                )}

                                                {projectCategory === 'Residential' && residentialSubtype === 'Apartment' && (
                                                    <>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bedroom Configuration</label>
                                                            <div className="flex gap-2">
                                                                {['1BHK', '2BHK', '3BHK', '4BHK+'].map(bhk => (
                                                                    <button key={bhk} className="flex-1 h-12 bg-white border border-gray-100 rounded-xl font-bold text-[10px] uppercase hover:bg-primary transition-colors">{bhk}</button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Total Floors</label>
                                                            <input type="number" placeholder="Number" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm" />
                                                        </div>
                                                    </>
                                                )}

                                                {projectCategory === 'Residential' && residentialSubtype === 'Plot' && (
                                                    <>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Plot Area (Sq.Yd)</label>
                                                            <input type="text" placeholder="Area" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Dimensions (LxW)</label>
                                                            <input type="text" placeholder="e.g. 50x30" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm" />
                                                        </div>
                                                    </>
                                                )}

                                                {projectCategory === 'Agricultural' && (
                                                    <>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Land Type</label>
                                                            <select className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary appearance-none shadow-sm">
                                                                <option>Select Option</option>
                                                                <option>Farmland</option>
                                                                <option>Orchard</option>
                                                                <option>Plantation</option>
                                                            </select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Water Supply</label>
                                                            <input type="text" placeholder="Well, Canal, Borewell" className="w-full h-14 bg-gray-50 border border-gray-100 rounded-xl px-6 font-bold text-sm outline-none focus:border-primary shadow-sm" />
                                                        </div>
                                                    </>
                                                )}

                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">About Project</label>
                                                    <textarea
                                                        rows={4}
                                                        value={formData.projectDetails.description}
                                                        onChange={(e) => setFormData({...formData, projectDetails: {...formData.projectDetails, description: e.target.value}})}
                                                        placeholder="Describe your project highlights..."
                                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-6 font-bold text-sm outline-none focus:border-primary shadow-sm resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 6 && (
                                        <div className="space-y-12 animate-fade-in">
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-xl font-black uppercase tracking-tight text-[#1a1c21]">Project Media Center</h4>
                                                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg flex items-center gap-2">
                                                        <ImageIcon size={16} />
                                                        <span className="text-[8px] font-black uppercase tracking-widest">{formData.media.length} Files Uploaded</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                    <div className="relative aspect-square">
                                                        <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => {
                                                            const files = Array.from(e.target.files || []);
                                                            setFormData({...formData, media: [...formData.media, ...files]});
                                                        }} />
                                                        <div className="w-full h-full border-4 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center gap-2 text-gray-300 hover:border-primary hover:text-primary transition-all bg-gray-50/30 group">
                                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center group-hover:bg-teal-50 transition-colors">
                                                                <Plus size={24} />
                                                            </div>
                                                            <span className="text-[8px] font-black uppercase tracking-widest">Add Media</span>
                                                        </div>
                                                    </div>
                                                    {formData.media.map((file, i) => (
                                                        <div key={i} className="relative aspect-square rounded-[32px] border border-gray-100 overflow-hidden group shadow-sm">
                                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                                <ImageIcon size={32} />
                                                            </div>
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <button 
                                                                    onClick={() => setFormData({...formData, media: formData.media.filter((_, idx) => idx !== i)})}
                                                                    className="w-10 h-10 bg-white text-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                                                <p className="truncate text-[8px] font-black text-white uppercase tracking-widest">
                                                                    {file.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="bg-[#1a1c21] p-10 rounded-[48px] border border-white/5 space-y-10 shadow-2xl relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-10 opacity-5">
                                                    <Building2 size={200} />
                                                </div>
                                                
                                                <div className="flex items-center justify-between relative z-10">
                                                    <div className="space-y-1">
                                                        <h4 className="text-2xl font-black uppercase tracking-tight text-white">Project Dossier</h4>
                                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Reference ID: HP-{Math.floor(Math.random() * 100000)}</p>
                                                    </div>
                                                    <div className="px-6 py-2 bg-primary text-[#1a1c21] rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                                                        <ShieldCheck size={14} /> Compliance verified
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                                                    <div className="space-y-6">
                                                        <div className="flex items-center gap-3 text-primary">
                                                            <Building2 size={24} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Entity Details</span>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="text-xl font-black text-white leading-tight">{formData.builderName || 'Unnamed Developer'}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formData.builderCity}, {formData.builderState}</p>
                                                            <div className="flex items-center gap-2 pt-2">
                                                                <div className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${formData.hasBuilderRera ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                                                    {formData.hasBuilderRera ? 'RERA Certified' : 'Non-RERA Declaration'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div className="flex items-center gap-3 text-primary">
                                                            <Navigation size={24} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Project Scope</span>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="text-xl font-black text-white leading-tight">{formData.projectDetails.name || 'New Listing'}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{projectCategory} • {projectSubtype || 'Standard'}</p>
                                                            <p className="text-[10px] font-bold text-teal-500 uppercase tracking-widest pt-2 flex items-center gap-2">
                                                                <MapPin size={12} /> {formData.projectDetails.location}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div className="flex items-center gap-3 text-primary">
                                                            <User size={24} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Primary Liaison</span>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="text-xl font-black text-white leading-tight">{formData.authName || 'Not Set'}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formData.authDesignation}</p>
                                                            <p className="text-[10px] font-bold text-white uppercase tracking-widest pt-2 truncate">{formData.authEmail}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>

                                <div className="flex items-center justify-between pt-12 border-t border-gray-50">
                                    <button
                                        onClick={onCancel}
                                        className="text-gray-300 font-bold uppercase tracking-widest text-[10px] hover:text-[#1a1c21] transition-colors"
                                    >
                                        Exit Flow
                                    </button>
                                    <div className="flex gap-6">
                                        {currentStep > 1 && (
                                            <button
                                                onClick={prevStep}
                                                className="px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-gray-400 hover:text-[#1a1c21] transition-all"
                                            >
                                                Back
                                            </button>
                                        )}
                                        <button
                                            onClick={currentStep === 6 ? () => setIsSubmitted(true) : nextStep}
                                            className="px-12 py-5 bg-primary text-[#1a1c21] rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                                        >
                                            {currentStep === 6 ? 'Submit Project' : 'Proceed to next step'} 
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectListingFlow;
