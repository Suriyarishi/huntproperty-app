import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

interface FraudAlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    phoneNumber: string;
    isVerified: boolean;
}

export const FraudAlertModal: React.FC<FraudAlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    phoneNumber,
    isVerified
}) => {
    const [understood, setUnderstood] = useState(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="absolute inset-0 z-[100] flex items-center justify-center px-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Top Section */}
                        <div className="pt-8 pb-6 px-8 flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4 border border-amber-100">
                                <ShieldAlert size={32} className="text-amber-500" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-2">Fraud Alert ⚠️</h2>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                Some owners or agents may ask for <span className="text-gray-900 font-bold">advance payment</span> before a property visit.
                            </p>
                        </div>

                        {/* Warning Message */}
                        <div className="px-8 pb-6">
                            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 space-y-3">
                                <div className="flex gap-3">
                                    <div className="mt-0.5 shrink-0">
                                        <AlertCircle size={16} className="text-amber-600" />
                                    </div>
                                    <p className="text-[13px] text-amber-900 font-bold leading-tight">
                                        Never pay any money before physically verifying the property.
                                    </p>
                                </div>
                                <p className="text-[11px] text-amber-700/70 font-medium leading-relaxed">
                                    Hunt Property does not control financial transactions outside our platform. Please exercise caution.
                                </p>
                            </div>
                        </div>

                        {/* Checkbox */}
                        <div className="px-8 pb-6">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative mt-0.5">
                                    <input
                                        type="checkbox"
                                        checked={understood}
                                        onChange={(e) => setUnderstood(e.target.checked)}
                                        className="peer sr-only"
                                    />
                                    <div className="h-5 w-5 border-2 border-gray-200 rounded-md bg-white transition-all peer-checked:bg-[#2FED9A] peer-checked:border-[#2FED9A]" />
                                    <CheckCircle2 size={12} className="absolute inset-0 m-auto text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                                </div>
                                <span className="text-[12px] text-gray-500 font-bold leading-tight select-none">
                                    I understand and will not pay any advance without verification
                                </span>
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="px-8 pb-4 flex flex-col gap-3">
                            <div className="text-center">
                                <button
                                    disabled={!understood}
                                    onClick={onConfirm}
                                    className={`w-full h-14 rounded-2xl flex flex-col items-center justify-center transition-all shadow-lg active:scale-95 ${understood
                                        ? 'bg-[#2FED9A] text-gray-900 shadow-[#2FED9A]/30'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed grayscale shadow-none'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Phone size={18} fill="currentColor" />
                                        <span className="font-black text-lg">Call {phoneNumber}</span>
                                    </div>
                                    {isVerified ? (
                                        <span className="text-[10px] font-bold opacity-70">Verified Contact ✓</span>
                                    ) : (
                                        <span className="text-[10px] font-bold opacity-70">Unverified Listing – Proceed carefully</span>
                                    )}
                                </button>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full h-12 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 py-4 text-center border-t border-gray-100">
                            <button className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-red-400 transition-colors">
                                Report Suspicious Activity
                            </button>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-300 hover:text-gray-500 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
