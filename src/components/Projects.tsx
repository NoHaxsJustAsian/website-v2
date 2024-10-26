// Projects.tsx
import React from 'react';
import ProjectCard from '@/components/ui/projectcard';

const Projects: React.FC = () => {
  const projects = [
    {
      year: 2024,
      title: "RecieptOCR.com",
      description: "Receipt photo straight to your Notion page.",
      imageUrl: "https://framerusercontent.com/images/zXoCrASGMAI3AQC5w1fbMUozg.jpg",
      liveUrl: "https://recieptocr.com",
      githubUrl: "https://github.com/example/olliviere"
    },
    {
      year: 2024,
      title: "Jubilant",
      description: "How we doubled market growth.",
      imageUrl: "https://framerusercontent.com/images/oju8MD5Ne5UmhaKovKif80VE9A.jpg",
      liveUrl: "./case-studies/jubilant",
      githubUrl: "https://github.com/example/jubilant"
    },
  ];

  return (
    <div className="bg-black py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white pb-4">
          Recent Projects
        </h2>

        {/* Project Cards with Title and Line Effect */}
        {projects.map((project, index) => (
          <div key={index} className="mb-4">
            {/* Project Title with Line */}
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-semibold text-white mr-4 whitespace-nowrap">
                {project.year} - {project.title}
              </h3>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            {/* Project Card Content */}
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
