
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from './LoadingSpinner';
import { toast } from "@/components/ui/sonner";

interface FactCheckResult {
  verdict: string;
  confidence: number;
  explanation: string;
}

const FactCheckForm: React.FC = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error("Please enter some text to fact-check");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Using the provided ngrok endpoint with the correct field name 'claim'
      const response = await fetch('https://41a9-43-230-199-242.ngrok-free.app/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ claim: text }), // Changed 'text' to 'claim'
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
      toast.success("Fact check completed!");
    } catch (err) {
      console.error("Error during fact checking:", err);
      setError(err instanceof Error ? err.message : 'Failed to connect to the fact-checking service. Please try again later.');
      toast.error("Failed to complete fact check");
    } finally {
      setIsLoading(false);
    }
  };
  
  const getVerdictClass = (verdict?: string) => {
    if (!verdict) return '';
    return verdict.toLowerCase() === 'true' ? 'text-green-400' : 'text-red-400';
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            className="w-full h-40 p-6 bg-truthabra-muted/30 glass-card rounded-lg border-none text-white focus:ring-2 focus:ring-truthabra-purple/50 focus:outline-none resize-none"
            placeholder="Enter a claim to fact-check..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="absolute bottom-4 left-6 text-xs text-truthabra-blue/70">
            {text.length > 0 ? `${text.length} characters` : ''}
          </div>
        </div>
        
        <Button 
          type="submit"
          className="w-full py-6 bg-gradient-to-r from-truthabra-blue to-truthabra-purple hover:opacity-90 text-white font-medium text-lg relative overflow-hidden group"
          disabled={isLoading}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-truthabra-blue to-truthabra-purple opacity-0 group-hover:opacity-20 transition-opacity"></span>
          {isLoading ? 'Analyzing...' : 'Check Now'}
        </Button>
      </form>
      
      <div className="mt-8">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-white/70 animate-pulse">Analyzing claim...</p>
          </div>
        )}
        
        {error && (
          <div className="p-6 glass-card rounded-lg border border-red-500/30">
            <p className="text-red-400">{error}</p>
          </div>
        )}
        
        {result && !isLoading && !error && (
          <div className="p-6 glass-card rounded-lg neon-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium">Verdict:</h3>
              <span className={`text-xl font-bold ${getVerdictClass(result.verdict)}`}>
                {result.verdict}
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm text-white/70 mb-1">Confidence:</h4>
              <div className="w-full h-2 bg-truthabra-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-truthabra-blue to-truthabra-purple" 
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-white/50">0%</span>
                <span className="text-xs font-medium text-white/80">{result.confidence.toFixed(1)}%</span>
                <span className="text-xs text-white/50">100%</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-white/70 mb-2">Explanation:</h4>
              <p className="text-white/90">{result.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FactCheckForm;
