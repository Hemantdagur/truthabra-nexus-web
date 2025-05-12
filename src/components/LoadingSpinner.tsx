
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className="relative flex justify-center items-center">
      <div className={`${sizeClasses[size]} animate-spin-slow`}>
        <div className="absolute w-full h-full rounded-full border-2 border-transparent border-t-truthabra-purple border-r-truthabra-blue opacity-75"></div>
        <div className="absolute w-full h-full rounded-full border-2 border-transparent border-b-truthabra-cyan opacity-75" style={{animationDelay: '-0.5s'}}></div>
      </div>
      <div className={`absolute ${sizeClasses[size]} animate-pulse-glow`}>
        <div className="w-2 h-2 rounded-full bg-truthabra-purple absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-2 h-2 rounded-full bg-truthabra-blue absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
        <div className="w-2 h-2 rounded-full bg-truthabra-cyan absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-2 h-2 rounded-full bg-truthabra-purple absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
