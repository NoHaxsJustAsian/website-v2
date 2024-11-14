// App.tsx

import React, { useState } from "react"; // Added useState import
import HeroSection from "./components/Hero";
import Skills from "./components/Skills";
import Navbar from "./components/NavBar";
import ParticleArts3D from "./components/ParticleArts3Dv2";
import Projects from "./components/Projects";
import { ScrollProvider } from "./components/ScrollContext";
import Experience from "./components/Experience";

const App: React.FC = () => {
  const [isTransitionComplete, setIsTransitionComplete] = useState(false); // State to track transition

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
          <Navbar />
          <HeroSection />
          <Projects />
          <Skills />
          <Experience />
        </div>
      </div>
    </ScrollProvider>
  );
};

export default App;
