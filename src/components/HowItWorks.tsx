
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Database, Globe, Check } from 'lucide-react';

const steps = [
  {
    icon: <Search className="h-8 w-8 text-truthabra-blue" />,
    title: 'Input Analysis',
    description: 'Advanced NLP techniques analyze your claim and break it down into checkable facts.'
  },
  {
    icon: <Globe className="h-8 w-8 text-truthabra-purple" />,
    title: 'Source Verification',
    description: 'Our system searches trusted sources across the web to find relevant information.'
  },
  {
    icon: <Database className="h-8 w-8 text-truthabra-cyan" />,
    title: 'Data Comparison',
    description: 'Claims are compared against our database of verified facts and expert information.'
  },
  {
    icon: <Check className="h-8 w-8 text-truthabra-blue" />,
    title: 'Verdict Delivery',
    description: 'Results are presented with a confidence score and detailed explanation.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        <span className="text-gradient">How It Works</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-lg relative"
          >
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 + 0.2 }}
              viewport={{ once: true }}
              className="w-16 h-16 flex items-center justify-center rounded-full glass-card mb-4 mx-auto"
            >
              {step.icon}
            </motion.div>
            
            <h3 className="text-xl font-bold text-center mb-3 text-white">{step.title}</h3>
            <p className="text-white/70 text-center">{step.description}</p>
            
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-truthabra-muted flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>
            
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-truthabra-blue to-transparent"></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
