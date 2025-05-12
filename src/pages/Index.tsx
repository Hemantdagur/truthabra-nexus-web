
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
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-[-1]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-truthabra-blue/20 to-transparent blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 12,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-truthabra-purple/20 to-transparent blur-3xl"
        />
      </div>
      
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
                onClick={() => document.getElementById('fact-check')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started
              </Button>
            </motion.div>
            
            {/* Animated circles */}
            <div className="relative w-full max-w-2xl h-32 mt-16">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute left-1/4 top-0 w-16 h-16 rounded-full bg-truthabra-blue/30 backdrop-blur-md border border-white/10"
              />
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute right-1/4 bottom-0 w-24 h-24 rounded-full bg-truthabra-purple/30 backdrop-blur-md border border-white/10"
              />
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute left-1/3 bottom-0 w-20 h-20 rounded-full bg-truthabra-cyan/30 backdrop-blur-md border border-white/10"
              />
            </div>
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
