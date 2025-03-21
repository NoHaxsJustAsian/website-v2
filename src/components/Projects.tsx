// Projects.tsx
import React from 'react';
import ProjectCard from '@/components/ui/projectcard';

const Projects: React.FC = () => {
  const projects = [
    {
      year: 2025,
      title: "Supabase Compliance Checker",
      description: "Check your Supabase database for compliance with your organization's policies.",
      videoUrl: "./SCC.mp4",
      liveUrl: "https://supabase-compliance-checker-nine.vercel.app/",
      githubUrl: "https://github.com/NoHaxsJustAsian/supabase-compliance-checker",
      technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Supabase']
    },
    {
      year: 2025,
      title: "throwapin.com",
      description: "Take a chance and find your next favorite location.",
      videoUrl: "./throwapin.mp4",
      liveUrl: "https://www.throwapin.com",
      devPostUrl: "https://devpost.com/software/throw-a-pin",
      githubUrl: "https://github.com/NoHaxsJustAsian/throw-a-pin",
      technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Three.js', 'Supabase']
    },
    {
      year: 2024,
      title: "GenSchedule.com",
      description: "Screenshot any schedule to produce a downloadable ICS.",
      videoUrl: "./genschedule.mp4",
      liveUrl: "https://genschedule.com",
      githubUrl: "https://github.com/NoHaxsJustAsian/genschedule",
      technologies: ['Python', 'TypeScript', 'Flask', 'React', 'Tailwind CSS']
    },
    {
      year: 2024,
      title: "RecieptOCR.com",
      description: "Take a photo of receipt to immediately parse and sync it to your Notion page.",
      videoUrl: "./recieptocr.mp4",
      liveUrl: "https://recieptocr.com",
      githubUrl: "https://github.com/NoHaxsJustAsian/receipt-ocr-to-notion",
      technologies: ['Python', 'TypeScript', 'Flask', 'React', 'Tailwind CSS']
    },
    {
      year: 2024,
      title: "Personal Website v2",
      description: "This website you are currently on.",
      videoUrl: "./portfolio.mp4",
      liveUrl: "https://wintongtawee.dev",
      githubUrl: "https://github.com/NoHaxsJustAsian/website-v2",
      technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Three.js']
    },
  ];

  return (
    <div className="bg-black py-10 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white pb-4">
          Recent Projects
        </h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-semibold text-white mr-4 whitespace-nowrap">
                {project.year} - {project.title}
              </h3>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
