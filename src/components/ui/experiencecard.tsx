// ExperienceCard.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

// Icon imports remain the same
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
import latexDark from '@iconify/icons-skill-icons/latex-dark';
import pythonIcon from '@iconify/icons-logos/python';
import objcIcon from '@iconify/icons-vscode-icons/file-type-objectivec';
import verilogIcon from '@iconify/icons-vscode-icons/file-type-verilog';
import flaskIcon from '@iconify/icons-skill-icons/flask-light';
import mongoDBIcon from '@iconify/icons-vscode-icons/file-type-mongo';
import postgresIcon from '@iconify/icons-logos/postgresql';
import supabaseIcon from '@iconify/icons-devicon/supabase';
import pandasIcon from '@iconify/icons-devicon/pandas';
import numpyIcon from '@iconify/icons-logos/numpy';
import tensorflowIcon from '@iconify/icons-logos/tensorflow';
import pytorchIcon from '@iconify/icons-devicon/pytorch';
import sklearnIcon from '@iconify/icons-devicon/scikitlearn';
import dockerIcon from '@iconify/icons-logos/docker-icon';
import lispIcon from '@iconify/icons-file-icons/common-lisp';
import vueIcon from '@iconify/icons-logos/vue';

interface ExperienceCardProps {
  year: string;
  role: string;
  company: string;
  description: Array<string> | string;
  companyUrl: string;
  technologies: Array<string>;
}

const technologyIcons: { [key: string]: any } = {
  Swift: swiftIcon,
  'Vue.js': vueIcon,
  Flask: flaskIcon,
  MongoDB: mongoDBIcon,
  Python: pythonIcon,
  Docker: dockerIcon,
  JavaScript: javascriptIcon,
  TypeScript: typescriptIcon,
  React: reactIcon,
  Firebase: firebaseIcon,
  HTML: htmlIcon,
  CSS: cssIcon,
  Tailwind: tailwindIcon,
  Bootstrap: bootstrapIcon,
  SQL: sqlIcon,
  Linux: linuxIcon,
  LaTeX: latexDark,
  Java: javaIcon,
  ObjectiveC: objcIcon,
  Verilog: verilogIcon,
  Postgres: postgresIcon,
  Supabase: supabaseIcon,
  Pandas: pandasIcon,
  NumPy: numpyIcon,
  TensorFlow: tensorflowIcon,
  PyTorch: pytorchIcon,
  SKlearn: sklearnIcon,
  Lisp: lispIcon,
  NodeJS: nodejsIcon,
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  year,
  role,
  company,
  description,
  companyUrl,
  technologies,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Function to determine if the device is mobile based on viewport width
  const checkIsMobile = () => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    }
  };

  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    if (!isMobile || !cardRef.current) return;

    const observerOptions = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5, // Adjust based on when you want to trigger
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isMobile]);

  // Hover handlers for desktop
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsVisible(false);
    }
  };

  return (
    <div
      ref={cardRef}
      className="block w-full bg-black transition-all relative group container max-w-7xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="py-8 px-4">
        {/* Text Content */}
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-gray-600">{year}</p>
          <h2 className="text-2xl font-semibold text-white">{role}</h2>
          <h3 className="text-lg text-gray-400">{company}</h3>
          {Array.isArray(description) ? (
            <ul className="list-disc list-inside text-gray-300">
              {description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-300">{description}</p>
          )}
          {/* Technologies Section */}
          <div className="flex flex-wrap mt-4 gap-x-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center group m-2"
              >
                <Icon
                  icon={technologyIcons[tech]}
                  className="w-9 h-9 mb-1 text-gray-500 transition-transform duration-300"
                />
                <span
                  className={`text-xxs text-gray-500 pt-1 transition-all duration-300 ${
                    isMobile
                      ? isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                      : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                  }`}
                >
                  {tech}
                </span>
              </div>
            ))}
          </div>
          {/* Hover/Button Section */}
          <div
            className={`transition-opacity duration-300 mt-4 ${
              isMobile
                ? isVisible
                  ? "opacity-100"
                  : "opacity-0"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <div className="mt-2">
              <a href={companyUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="sm" className="bg-white text-black">
                  Website
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
