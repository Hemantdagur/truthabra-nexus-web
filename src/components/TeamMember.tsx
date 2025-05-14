
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin, Mail, User } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  imageUrl: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  email, 
  linkedin, 
  imageUrl 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="glass-card p-6 rounded-lg flex flex-col items-center"
    >
      <Avatar className="h-28 w-28 mb-4 border-2 border-truthabra-purple/30">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback className="bg-truthabra-purple/20 text-white">
          <User className="w-10 h-10" />
        </AvatarFallback>
      </Avatar>
      
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-white/60 mb-3">{role}</p>
      
      <div className="mt-4 flex flex-col gap-2 w-full">
        <a 
          href={`mailto:${email}`} 
          className="flex items-center gap-2 text-white/80 hover:text-truthabra-blue transition"
        >
          <Mail className="w-4 h-4" />
          <span className="text-sm">{email}</span>
        </a>
        
        <a 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 text-white/80 hover:text-truthabra-blue transition"
        >
          <Linkedin className="w-4 h-4" />
          <span className="text-sm">LinkedIn</span>
        </a>
      </div>
    </motion.div>
  );
};

export default TeamMember;
