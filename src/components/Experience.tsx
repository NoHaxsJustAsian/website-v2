// Experience.tsx
import React from "react";
import ExperienceCard from "@/components/ui/experiencecard";

const Experience: React.FC = () => {
  const experiences = [
    {
      year: "2024 - Present",
      role: "Full Stack Software Engineer",
      company: "Ubiwell Lab",
      description:
        'Built and maintained iOS sensing app, "Ubiwell Connect", admin and user facing dashboards, RESTful APIs, and data processing pipelines used for digital phenotyping studies. Spearheaded the refactoring of the iOS app leading to a 40% reduction in the code base.',
      imageUrl: "https://example.com/images/techcorp-logo.jpg",
      companyUrl: "https://ubiwell.io/",
      technologies: ["Swift", "Python","TypeScript", "JavaScript", "Vue.js", "Flask", "SKlearn", "Pandas","NumPy","MongoDB"],
    },
    {
      year: "2023 - Present",
      role: "Computer Science Curricula Lead, Brand and Marketing Lead",
      company: "FirstByte",
      description:
        "Led the curriculum team for the Computer Science program, building 5 different workshops, spanning from Python/ML to React. Led the marketing team in managing the club's social media presence and recruitment efforts, leading to a 200% increase in membership.",
      imageUrl: "https://example.com/images/designstudio-logo.jpg",
      companyUrl: "https://teachfirstbyte.com",
      technologies: ["Python", "JavaScript", "HTML", "CSS", "React"],
    },
  ];

  return (
    <div className="bg-black sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white pb-4">Experience</h2>

        {/* Experience Cards with Title and Line Effect */}
        {experiences.map((experience, index) => (
          <div key={index} className="mb-8">
            {/* Experience Title with Line */}
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-semibold text-white mr-4 whitespace-nowrap">
                {experience.year}
              </h3>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
            <ExperienceCard {...experience} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
