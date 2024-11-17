// App.tsx

import React, { useState } from "react"; // Added useState import
import HeroSection from "./components/Hero";
import Skills from "./components/Skills";
import Navbar from "./components/NavBar";
import ParticleArts3D from "./components/ParticleArts3Dv2";
import Projects from "./components/Projects";
import { ScrollProvider } from "./components/ScrollContext";
import Experience from "./components/Experience";
import { useRef } from "react";

const App: React.FC = () => {
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);

  return (
    <ScrollProvider>
      <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
        <ParticleArts3D
          particleCount={200}
          connectionCount={75}
          onComplete={() => setIsTransitionComplete(true)} // Set state on completion
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />
        <div
          className={`relative z-10 transition-opacity duration-1000 ${
            isTransitionComplete
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <Navbar
            onNavigate={(section) => {
              if (section === "projects" && projectsRef.current) {
                projectsRef.current.scrollIntoView({ behavior: "smooth" });
              } else if (section === "skills" && skillsRef.current) {
                skillsRef.current.scrollIntoView({ behavior: "smooth" });
              }
              else if
              (section === "experience" && experienceRef.current) {
                experienceRef.current.scrollIntoView({ behavior: "smooth" });
              } else if (section === "hero" && heroRef.current) {
                heroRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
          <section ref={heroRef}>
          <HeroSection/>
          </section>
          <section ref={skillsRef} className="scroll-mt-[64px]">
            <Skills />
          </section>
          <section ref={projectsRef} className="scroll-mt-[64px]">
            <Projects />
          </section>
          <section ref={experienceRef} className="scroll-mt-[16px]">
            <Experience />
          </section>
        </div>
      </div>
    </ScrollProvider>
  );
};

export default App;


