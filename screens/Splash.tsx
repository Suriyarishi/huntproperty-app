
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../components/UI';

interface Props {
  onFinish: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // 2.5 seconds splash duration
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full w-full bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)',
          backgroundSize: '24px 24px'
      }}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="z-10 flex flex-col items-center"
      >
        <Logo size="lg" showTagline />
      </motion.div>

      {/* Loading Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-20 z-10"
      >
        <div className="flex gap-2">
           {[0, 1, 2].map(i => (
             <motion.div
               key={i}
               animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
               className="w-2.5 h-2.5 bg-primary rounded-full"
             />
           ))}
        </div>
      </motion.div>
    </div>
  );
};
