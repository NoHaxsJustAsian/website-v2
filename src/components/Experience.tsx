// Experience.tsx
import React from "react";
import ExperienceCard from "@/components/ui/experiencecard";

const Experience: React.FC = () => {
  const experiences = [
    {
      year: "Feb 2025 - Present",
      role: "Full Stack Developer",
      company: "Memenome",
      description: "Turn PDFs into brainrot videos. Supercharge your learning with engaging content. Led iOS development, and contributed to frontend + UX/UX development of web app.",
      imageUrl: "/memenome.png",
      companyUrl: "https://memenome.gg/",
      technologies: ["TypeScript", "Svelte", "SvelteKit", "Tailwind CSS", "Vite", "Node.js", "Swift"],
    },
    {
      year: "Feb 2025 - Present",
      role: "Full Stack Developer",
      company: "Pagent",
      description: "Developing a social gaming platform for users to compete in against each other in social competitions. Led web development + mobile development.",
      imageUrl: "/pagent.png",
      companyUrl: "https://pagent.tv/",
      technologies: ["TypeScript", "React", "React Native", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    },
    {
      year: "Jan 2025 - Present",
      role: "Teaching Assistant",
      company: "Northeastern University",
      description: "Fundmentals of Software Engineering (CS 4530).",
      imageUrl: "/NEU.png",
      companyUrl: "https://www.northeastern.edu/",
      technologies: ["TypeScript", "React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    },
    {
      year: "Jan 2025 - Present",
      role: "Research Assistant",
      company: "Ubiwell Lab",
      description: "Developing a \"Cursor for Writing\" document editor tool, similar to Google Docs, to evaluate how writers and researchers can use LLM tools to potentially increase their cohesion and coherence across their writing.",
      imageUrl: "/ubiwell.png",
      companyUrl: "https://ubiwell.io/",
      technologies: ["TypeScript", "React", "Tailwind CSS", "Python", "Flask", "MongoDB"],
    },
    {
      year: "Jun 2024 - Dec 2024",
      role: "Full Stack Developer Co-Op",
      company: "Ubiwell Lab",
      description:
        'Built and maintained iOS sensing app, "Ubiwell Connect", along with admin dashboards, RESTful APIs, and ML data processing pipelines for digital phenotyping studies.',
      imageUrl: "/ubiwell.png",
      companyUrl: "https://ubiwell.io/",
      technologies: ["TypeScript", "JavaScript", "Vue.js", "Tailwind CSS", "Python", "Flask", "MongoDB", "Pandas", "NumPy", "SKlearn", "Swift"],
    },
    {
      year: "Jan 2023 - Present",
      role: "Computer Science Curricula Lead, Brand and Marketing Lead",
      company: "FirstByte",
      description:
        "Led the curriculum team for the Computer Science program, building 5 different workshops, spanning from Python/ML to React. Led the marketing team in managing the club's social media presence and recruitment efforts, leading to a 200% increase in membership.",
      imageUrl: "/FirstByte.png",
      companyUrl: "https://teachfirstbyte.com",
      technologies: ["JavaScript", "React", "HTML", "CSS", "Tailwind CSS", "Python"],
    },
  ];

  // Group experiences by company
  const groupedExperiences = experiences.reduce((acc, exp) => {
    if (!acc[exp.company]) {
      acc[exp.company] = [];
    }
    acc[exp.company].push(exp);
    return acc;
  }, {} as Record<string, typeof experiences>);

  return (
    <div className="bg-black sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-white pb-4">Experience</h2>

        {/* Display experiences grouped by company */}
        {Object.entries(groupedExperiences).map(([company, exps], companyIndex) => (
          <div key={companyIndex} className="mb-8">
            {/* Company Title with Line */}
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <div className="flex items-center justify-center backdrop-blur-sm bg-white/5 p-1.5 rounded-lg mr-3">
                  <img 
                    src={exps[0].imageUrl} 
                    alt={`${company} logo`}
                    className={`object-contain ${
                      company === "Northeastern University" 
                        ? "h-8 w-8" 
                        : company === "Ubiwell Lab"
                          ? "h-7 w-7" 
                          : "h-8 w-8"
                    }`}
                    style={{ 
                      filter: "brightness(1.1) contrast(1.1)"
                    }}
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white whitespace-nowrap">
                  {company}
                </h3>
              </div>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
            
            {/* Sort experiences by date (newest first) */}
            {exps
              .sort((a, b) => {
                // Extract year and month to compare dates more precisely
                const getDateValue = (dateStr: string) => {
                  if (dateStr.includes("Present")) return Infinity;
                  
                  const months: Record<string, number> = {
                    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
                    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
                  };
                  
                  // Handle date formats like "Jun 2024" or "2024"
                  const parts = dateStr.split(" ");
                  if (parts.length > 1) {
                    // Format: "Jun 2024"
                    const month = months[parts[0]] || 1;
                    const year = parseInt(parts[1]);
                    return year * 100 + month;
                  } else {
                    // Format: "2024"
                    return parseInt(parts[0]) * 100;
                  }
                };
                
                const aStart = getDateValue(a.year.split(" - ")[0]);
                const bStart = getDateValue(b.year.split(" - ")[0]);
                
                // Sort in descending order (newest first)
                return bStart - aStart;
              })
              .map((experience, index) => (
                <div key={index} className="mb-6">
                  {/* Experience Title with Date */}
                  <div className="flex items-center mb-3">
                    <h4 className="text-xl font-medium text-gray-300 mr-4 whitespace-nowrap">
                      {experience.year}
                    </h4>
                    <div className="flex-grow border-t border-gray-800"></div>
                  </div>
                  <ExperienceCard 
                    year=""
                    role={experience.role}
                    company=""
                    description={experience.description}
                    companyUrl={experience.companyUrl}
                    technologies={experience.technologies}
                  />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
