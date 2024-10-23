import React from 'react';
import ProjectCard from '@/components/ui/projectcard';

const Projects: React.FC = () => {
  const projects = [
    {
      year: 2023,
      title: "Olliviere",
      description: "How we furthered AI in tech.",
      imageUrl: "https://framerusercontent.com/images/zXoCrASGMAI3AQC5w1fbMUozg.jpg",
      linkUrl: "./case-studies/olliviere"
    },
    {
      year: 2023,
      title: "Jubilant",
      description: "How we doubled market growth.",
      imageUrl: "https://framerusercontent.com/images/oju8MD5Ne5UmhaKovKif80VE9A.jpg",
      linkUrl: "./case-studies/jubilant"
    },
    // Add more projects here...
  ];

  return (
    <div>
      {projects.map((project, index) => (
        <ProjectCard githubUrl={''} key={index} {...project} />
      ))}
    </div>
  );
};

export default Projects;
