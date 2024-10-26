import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming ShadCN's Button is imported from here

interface ProjectCardProps {
  year: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string; // Optional live URL
}

const ProjectCard: React.FC<ProjectCardProps> = ({ year, title, description, imageUrl, githubUrl, liveUrl }) => {
  return (
    <div className="block w-full bg-black transition-all relative group container max-w-7xl mx-auto">
      <div className="flex flex-row justify-between items-center py-8 px-4">
        {/* Text Content */}
        <div className="flex flex-col space-y-2 flex-1 pr-4">
          <p className="text-sm text-gray-600">{year}</p>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <h3 className="text-lg text-gray-600">{description}</h3>

          {/* Hover Buttons Below Text */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
            <div className="mt-2 flex space-x-2">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="sm" className="bg-white text-black">
                  GitHub
                </Button>
              </a>
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="default" size="sm" className="bg-white text-black">
                    Live
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Image Container */}
        <div className="relative rounded-xl overflow-hidden shadow-md" style={{ 
          width: `max((min(100vw - 80px, 1024px) - 80px) / 2, 0px)`, 
          height: `max((min(100vw - 80px, 1024px) - 80px) / 2, 0px)` 
        }}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
