// ProjectCard.tsx
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

// Import icons
import swiftIcon from "@iconify/icons-logos/swift";
import javaIcon from "@iconify/icons-logos/java";
import firebaseIcon from "@iconify/icons-logos/firebase";
import typescriptIcon from "@iconify/icons-logos/typescript-icon";
import javascriptIcon from "@iconify/icons-logos/javascript";
import reactIcon from "@iconify/icons-logos/react";
import nodejsIcon from "@iconify/icons-logos/nodejs-icon";
import htmlIcon from "@iconify/icons-vscode-icons/file-type-html";
import cssIcon from "@iconify/icons-vscode-icons/file-type-css";
import tailwindIcon from "@iconify/icons-vscode-icons/file-type-tailwind";
import bootstrapIcon from "@iconify/icons-logos/bootstrap";
import sqlIcon from "@iconify/icons-skill-icons/mysql-dark";
import linuxIcon from "@iconify/icons-logos/linux-tux";
import pythonIcon from "@iconify/icons-logos/python";
import flaskIcon from "@iconify/icons-skill-icons/flask-light";
import nextIcon from "@iconify/icons-skill-icons/nextjs-dark";
import threejsIcon from "@iconify/icons-skill-icons/threejs-light";
import supabaseIcon from '@iconify/icons-devicon/supabase';
import githubIcon from '@iconify/icons-mdi/github';
import devpostIcon from '@iconify/icons-simple-icons/devpost';
import websiteIcon from '@iconify/icons-mdi/web';

interface ProjectCardProps {
  year: number;
  title: string;
  description: string;
  videoUrl: string;
  githubUrl: string;
  liveUrl?: string;
  devPostUrl?: string;
  technologies: string[];
}

const technologyIcons: { [key: string]: any } = {
  Swift: swiftIcon,
  Java: javaIcon,
  Firebase: firebaseIcon,
  TypeScript: typescriptIcon,
  JavaScript: javascriptIcon,
  React: reactIcon,
  "Node.js": nodejsIcon,
  HTML: htmlIcon,
  CSS: cssIcon,
  "Tailwind CSS": tailwindIcon,
  Bootstrap: bootstrapIcon,
  SQL: sqlIcon,
  Linux: linuxIcon,
  Python: pythonIcon,
  Flask: flaskIcon,
  "Next.js": nextIcon,
  "Three.js": threejsIcon,
  Supabase: supabaseIcon,
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  year,
  title,
  description,
  videoUrl,
  githubUrl,
  liveUrl,
  devPostUrl,
  technologies,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
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
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
        } else {
          setIsVisible(false);
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
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

  const handleMouseEnter = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      ref={cardRef}
      className="block w-full bg-black transition-all relative group container max-w-7xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col md:flex-row justify-between items-center py-8 px-4">
        {/* Video Container */}
        <div className="relative w-full md:w-[500px] rounded-xl overflow-hidden shadow-md mb-6 md:mb-0 md:mr-6">
          <div className="aspect-video">
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-transform duration-500 ease-in-out transform ${
                isMobile
                  ? isVisible
                    ? "scale-105"
                    : "scale-100"
                  : "group-hover:scale-105"
              }`}
              muted
              playsInline
              loop
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="flex flex-col space-y-2 flex-1">
          <p className="text-sm text-gray-600">{year}</p>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <h3 className="text-lg text-gray-600">{description}</h3>

          {/* Technologies Used */}
          <div className="mt-6">
            <div className="flex flex-wrap mt-4 gap-x-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center group m-2"
                >
                  <Icon
                    icon={technologyIcons[tech]}
                    className="w-9 h-9 mb-1 text-gray-500 group-hover:scale-110 transition-transform duration-300"
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
          </div>

          {/* Buttons */}
          <div
            className={`mt-4 transition-opacity duration-300 ${
              isMobile
                ? isVisible
                  ? "opacity-100"
                  : "opacity-0"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <div className="mt-2 flex space-x-3">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                >
                  <Icon icon={githubIcon} className="w-4 h-4" />
                  GitHub
                </Button>
              </a>
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                  >
                    <Icon icon={websiteIcon} className="w-4 h-4" />
                    Live
                  </Button>
                </a>
              )}
              {devPostUrl && (
                <a href={devPostUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                  >
                    <Icon icon={devpostIcon} className="w-4 h-4" />
                    DevPost
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
