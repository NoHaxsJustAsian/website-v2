import React from 'react';
import HeroSection from './components/Hero';
import Skills from './components/Skills';
import Navbar from './components/NavBar';
import ParticleArts from './components/ParticleArts';
import Projects from './components/Projects';
import { ScrollProvider } from './components/ScrollContext';
const App: React.FC = () => {
  return (
    <ScrollProvider>
      <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
        <ParticleArts 
          particleCount={200} 
          connectionCount={75} 
          interactionRadius={100} 
          edgeDelay={0} 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
        <div className="relative z-10">
          <Navbar /> 
          <HeroSection />
          <Projects />
          <Skills />
        </div>
      </div>
    </ScrollProvider>
  );
};

export default App;
