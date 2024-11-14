// ProjectCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

// Import icons
import swiftIcon from '@iconify/icons-logos/swift';
import javaIcon from '@iconify/icons-logos/java';
import firebaseIcon from '@iconify/icons-logos/firebase';
import typescriptIcon from '@iconify/icons-logos/typescript-icon';
import javascriptIcon from '@iconify/icons-logos/javascript';
import reactIcon from '@iconify/icons-logos/react';
import nodejsIcon from '@iconify/icons-logos/nodejs-icon';
import htmlIcon from '@iconify/icons-vscode-icons/file-type-html';
import cssIcon from '@iconify/icons-vscode-icons/file-type-css';
import tailwindIcon from '@iconify/icons-vscode-icons/file-type-tailwind';
import bootstrapIcon from '@iconify/icons-logos/bootstrap';
import sqlIcon from '@iconify/icons-skill-icons/mysql-dark';
import linuxIcon from '@iconify/icons-logos/linux-tux';
import pythonIcon from '@iconify/icons-logos/python';
import flaskIcon from '@iconify/icons-skill-icons/flask-light';
import nextIcon from '@iconify/icons-skill-icons/nextjs-dark';
import threejsIcon from '@iconify/icons-skill-icons/threejs-light';

interface ProjectCardProps {
  year: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
}

const technologyIcons: { [key: string]: any } = {
  'Swift': swiftIcon,
  'Java': javaIcon,
  'Firebase': firebaseIcon,
  'TypeScript': typescriptIcon,
  'JavaScript': javascriptIcon,
  'React': reactIcon,
  'Node.js': nodejsIcon,
  'HTML': htmlIcon,
  'CSS': cssIcon,
  'Tailwind CSS': tailwindIcon,
  'Bootstrap': bootstrapIcon,
  'SQL': sqlIcon,
  'Linux': linuxIcon,
  'Python': pythonIcon,
  'Flask': flaskIcon,
  'Next.js': nextIcon,
  'Three.js': threejsIcon,
};

const ProjectCard: React.FC<ProjectCardProps> = ({ year, title, description, imageUrl, githubUrl, liveUrl, technologies }) => {
  return (
    <div className="block w-full bg-black transition-all relative group container max-w-7xl mx-auto">
      <div className="flex flex-row justify-between items-center py-8 px-4">
        <div className="flex flex-col space-y-2 flex-1 pr-4">
          <p className="text-sm text-gray-600">{year}</p>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <h3 className="text-lg text-gray-600">{description}</h3>
          
          {/* Technologies Used */}
          <div className="mt-6">
          <div className="flex flex-wrap mt-4 gap-x-4">
            {technologies.map((tech, index) => (
              <div key={index} className="flex flex-col items-center group m-2">
                <Icon
                  icon={technologyIcons[tech]}
                  className="w-9 h-9 mb-1 text-gray-500 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-xxs text-gray-500 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pt-1">
                  {tech}
                </span>
              </div>
            ))}
          </div>
          </div>

          {/* Buttons */}
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

        {/* Project Image */}
        <div
          className="relative rounded-xl overflow-hidden shadow-md"
          style={{
            width: `max((min(100vw - 80px, 1024px) - 80px) / 2, 0px)`,
            height: `max((min(100vw - 80px, 1024px) - 80px) / 2, 0px)`,
          }}
        >
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
