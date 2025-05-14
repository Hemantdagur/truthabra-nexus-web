
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Linkedin, Mail, User } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface TeamMemberProps {
  name: string;
  email: string;
  linkedin: string;
  imageUrl: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
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
      <div className="w-28 h-28 mb-4 overflow-hidden rounded-full border-2 border-truthabra-purple/30">
        <AspectRatio ratio={1/1}>
          <Avatar className="h-full w-full">
            <AvatarImage src={imageUrl} alt={name} className="object-cover" />
            <AvatarFallback className="bg-truthabra-purple/20 text-white">
              <User className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>
        </AspectRatio>
      </div>
      
      <h3 className="text-xl font-bold mb-4 font-['Space_Grotesk'] text-center">{name}</h3>
      
      <div className="flex flex-col gap-3 w-full">
        <a 
          href={`mailto:${email}`} 
          className="flex items-center gap-2 text-white/80 hover:text-truthabra-blue transition-colors duration-200"
        >
          <Mail className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm truncate">{email}</span>
        </a>
        
        <a 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 text-white/80 hover:text-truthabra-blue transition-colors duration-200"
        >
          <Linkedin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">LinkedIn</span>
        </a>
      </div>
    </motion.div>
  );
};

export default TeamMember;
