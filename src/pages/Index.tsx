
import React from 'react';
import { motion } from 'framer-motion';
import GlobeAnimation from '@/components/GlobeAnimation';
import FactCheckForm from '@/components/FactCheckForm';
import HowItWorks from '@/components/HowItWorks';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* 3D Background */}
      <GlobeAnimation />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen w-full flex items-center justify-center relative px-4">
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-truthabra-dark z-[-5]"></div>
        
        <div className="container mx-auto pt-20">
          <div className="flex flex-col items-center text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-glow"
            >
              <span className="text-gradient">Truth</span>abra
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/80 max-w-3xl mb-10"
            >
              Cutting-edge AI technology to verify facts and combat misinformation in real-time
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-truthabra-blue to-truthabra-purple hover:opacity-90 text-white px-8 py-6 text-lg"
              >
                Get Started
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 w-full max-w-2xl mx-auto animate-float"
            >
              <div className="glass-card p-4 rounded-lg shadow-lg">
                <img 
                  src="https://placehold.co/800x450/0f0e17/e2e2e2?text=Truthabra+UI+Demo" 
                  alt="Truthabra Dashboard" 
                  className="w-full h-auto rounded"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Fact Check Section */}
      <section id="fact-check" className="min-h-screen w-full flex items-center justify-center relative px-4 py-20">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center"
          >
            <span className="text-gradient">Fact Check</span> Now
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-10 rounded-lg"
          >
            <FactCheckForm />
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="min-h-screen w-full flex items-center justify-center relative px-4 py-20">
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-truthabra-dark/80 z-[-5]"></div>
        
        <HowItWorks />
      </section>
      
      {/* Footer */}
      <footer className="w-full py-10 glass-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold text-gradient">Truthabra</span>
              <p className="text-white/60 mt-2">© 2025 Truthabra. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-10">
              <a href="#" className="text-white/80 hover:text-truthabra-blue transition">Privacy</a>
              <a href="#" className="text-white/80 hover:text-truthabra-blue transition">Terms</a>
              <a href="#" className="text-white/80 hover:text-truthabra-blue transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
