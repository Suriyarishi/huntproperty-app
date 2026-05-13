import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Check, ShieldCheck } from 'lucide-react';

interface ContactOwnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    ownerDetails: {
        name: string;
        email: string;
        contact: string;
    };
}

type Step = 'FORM' | 'OTP' | 'INFO';

export const ContactOwnerModal: React.FC<ContactOwnerModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    ownerDetails
}) => {
    const [step, setStep] = useState<Step>('FORM');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        interest: '',
        userType: 'Individual',
        agree: true
    });

    const [otp, setOtp] = useState(['', '', '', '']);
    const [errors, setErrors] = useState({ phone: '' });
    const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    // Reset flow on open
    useEffect(() => {
        if (isOpen) {
            setStep('FORM');
            setOtp(['', '', '', '']);
        }
    }, [isOpen]);

    const validatePhone = (value: string) => {
        if (value && !/^\d{10}$/.test(value)) {
            setErrors({ phone: 'The input value was not a correct number' });
        } else {
            setErrors({ phone: '' });
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
        setFormData({ ...formData, phone: val });
        validatePhone(val);
    };

    const handleLeadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.phone || errors.phone) {
            validatePhone(formData.phone);
            return;
        }
        if (formData.agree) {
            setStep('OTP');
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    const handleVerifyOtp = () => {
        if (otp.every(digit => digit !== '')) {
            setStep('INFO');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="absolute inset-0 z-[110] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-w-[340px]"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-100 bg-white">
                            <h3 className="text-gray-700 font-bold text-lg">
                                {step === 'FORM' && 'Contact Owner'}
                                {step === 'OTP' && 'Verify OTP'}
                                {step === 'INFO' && 'Property Info'}
                            </h3>
                            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
                                <X size={24} strokeWidth={1} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="p-5">
                            <AnimatePresence mode="wait">
                                {step === 'FORM' && (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <p className="text-gray-500 text-[13px] mb-5 font-medium leading-relaxed">Please share your details to contact the Owner.</p>
                                        <form onSubmit={handleLeadSubmit} className="space-y-4">
                                            <div className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm">
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full px-4 py-3.5 text-sm outline-none border-b border-gray-50"
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3.5 text-sm outline-none border-b border-gray-50"
                                                />
                                                <div className="p-3.5 bg-white">
                                                    <span className="block text-[11px] text-gray-400 font-bold uppercase mb-1">Phone Number</span>
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={handlePhoneChange}
                                                        className="w-full text-base text-gray-800 font-medium outline-none"
                                                    />
                                                    {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone}</p>}
                                                </div>
                                            </div>

                                            <div className="border border-gray-100 rounded-lg p-3.5 flex items-center justify-between text-sm shadow-sm">
                                                <span className="text-gray-500 font-medium">You are</span>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.userType === 'Individual' ? 'border-red-500' : 'border-gray-200'}`}>
                                                            {formData.userType === 'Individual' && <div className="w-2 h-2 bg-red-500 rounded-full" />}
                                                        </div>
                                                        <input type="radio" className="sr-only" onChange={() => setFormData({ ...formData, userType: 'Individual' })} />
                                                        <span className="text-xs font-bold text-gray-600">Individual</span>
                                                    </label>
                                                    <label className="flex items-center gap-1.5 cursor-pointer">
                                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.userType === 'Dealer' ? 'border-red-500' : 'border-gray-200'}`}>
                                                            {formData.userType === 'Dealer' && <div className="w-2 h-2 bg-red-500 rounded-full" />}
                                                        </div>
                                                        <input type="radio" className="sr-only" onChange={() => setFormData({ ...formData, userType: 'Dealer' })} />
                                                        <span className="text-xs font-bold text-gray-600">Dealer</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <label className="flex gap-2 cursor-pointer pt-1">
                                                <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-all ${formData.agree ? 'bg-red-500 border-red-500' : 'border-gray-200'}`}>
                                                    <Check size={12} className="text-white" />
                                                </div>
                                                <input type="checkbox" className="sr-only" checked={formData.agree} onChange={(e) => setFormData({ ...formData, agree: e.target.checked })} />
                                                <span className="text-[11px] text-gray-400 font-medium leading-tight">I agree to be contacted for similar properties.</span>
                                            </label>

                                            <button
                                                type="submit"
                                                disabled={!formData.agree}
                                                className="w-full h-12 bg-[#FF3C2F] text-white rounded-xl font-bold text-sm shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all"
                                            >
                                                Get Owner Details
                                            </button>
                                        </form>
                                    </motion.div>
                                )}

                                {step === 'OTP' && (
                                    <motion.div
                                        key="otp"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="py-4"
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                                                <ShieldCheck size={32} className="text-red-500" />
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">Verification</h4>
                                            <p className="text-xs text-gray-500 mb-8 font-medium">Enter the 4-digit code sent to <br /><span className="text-gray-900 font-bold">+91 {formData.phone}</span></p>

                                            <div className="flex gap-3 mb-8">
                                                {otp.map((digit, idx) => (
                                                    <input
                                                        key={idx}
                                                        ref={otpRefs[idx]}
                                                        type="text"
                                                        value={digit}
                                                        maxLength={1}
                                                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                                                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                                        className="w-12 h-14 border border-gray-100 bg-gray-50 rounded-xl text-center text-2xl font-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:bg-white transition-all shadow-sm"
                                                    />
                                                ))}
                                            </div>

                                            <button
                                                onClick={handleVerifyOtp}
                                                disabled={otp.some(d => d === '')}
                                                className="w-full h-12 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
                                            >
                                                Verify Code
                                            </button>
                                            <button className="mt-6 text-xs text-gray-400 font-bold hover:text-red-500 transition-colors uppercase tracking-widest">
                                                Resend OTP
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 'INFO' && (
                                    <motion.div
                                        key="info"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div className="space-y-4 pt-1">
                                            <div className="border border-gray-200 rounded-sm overflow-hidden bg-white">
                                                <div className="p-4 border-b border-gray-100 flex items-center gap-1">
                                                    <span className="text-[15px] text-gray-600 font-medium">Name :</span>
                                                    <span className="text-[15px] text-gray-700 font-medium">{ownerDetails.name}</span>
                                                </div>
                                                <div className="p-4 border-b border-gray-100 flex items-center gap-1 overflow-hidden">
                                                    <span className="text-[15px] text-gray-600 font-medium shrink-0">Email Id :</span>
                                                    <span className="text-[15px] text-gray-700 font-medium truncate">{ownerDetails.email}</span>
                                                </div>
                                                <div className="p-4 flex items-center gap-1">
                                                    <span className="text-[15px] text-gray-600 font-medium">Mobile No :</span>
                                                    <span className="text-[15px] text-gray-700 font-medium">{ownerDetails.contact}</span>
                                                </div>
                                            </div>

                                            <div className="pt-4">
                                                <button
                                                    onClick={() => {
                                                        onSubmit(formData);
                                                        onClose();
                                                    }}
                                                    className="w-full h-12 bg-[#FF3C2F] text-white rounded-md font-bold text-sm shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all"
                                                >
                                                    Start Chatting
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
