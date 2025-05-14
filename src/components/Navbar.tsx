
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 glass-card' : 'py-6 bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gradient">
            Truthabra
          </span>
        </div>
        
        <div className="flex items-center space-x-8">
          <a href="#home" className="text-white hover:text-truthabra-blue transition">
            Home
          </a>
          <a href="#fact-check" className="text-white hover:text-truthabra-blue transition">
            Fact Check
          </a>
          <a href="#how-it-works" className="text-white hover:text-truthabra-blue transition">
            How It Works
          </a>
          <a href="#contact-us" className="text-white hover:text-truthabra-blue transition">
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
