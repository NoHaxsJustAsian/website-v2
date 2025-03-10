// Skills.tsx
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Icon } from '@iconify/react';
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
import nextIcon from '@iconify/icons-skill-icons/nextjs-dark';
import vueIcon from '@iconify/icons-logos/vue';
import threejsIcon from '@iconify/icons-skill-icons/threejs-light';
import svelteIcon from '@iconify/icons-logos/svelte-icon';
import svelteKitIcon from '@iconify/icons-skill-icons/svelte';
import viteIcon from '@iconify/icons-logos/vitejs';
import expressIcon from '@iconify/icons-skill-icons/expressjs-light';

export const languages = [
  { icon: swiftIcon, label: 'Swift' },
  { icon: pythonIcon, label: 'Python' },
  { icon: typescriptIcon, label: 'TypeScript' },
  { icon: javascriptIcon, label: 'JavaScript' },
  { icon: javaIcon, label: 'Java' },
  { icon: objcIcon, label: 'Obj-C' },
  { icon: htmlIcon, label: 'HTML' },
  { icon: cssIcon, label: 'CSS' },
  { icon: verilogIcon, label: 'Verilog' },
  { icon: lispIcon, label: 'Lisp' },
];

export const frameworksAndTools = [
  { icon: reactIcon, label: 'React' },
  { icon: reactIcon, label: 'React Native' },
  { icon: nextIcon, label: 'Next.js' },
  { icon: vueIcon, label: 'Vue.js' },
  { icon: svelteIcon, label: 'Svelte' },
  { icon: svelteKitIcon, label: 'SvelteKit' },
  { icon: nodejsIcon, label: 'Node.js' },
  { icon: viteIcon, label: 'Vite' },
  { icon: threejsIcon, label: 'Three.js' },
  { icon: tailwindIcon, label: 'Tailwind CSS' },
  { icon: bootstrapIcon, label: 'Bootstrap' },
  { icon: flaskIcon, label: 'Flask' },
  { icon: expressIcon, label: 'Express.js' },
  { icon: mongoDBIcon, label: 'MongoDB' },
  { icon: firebaseIcon, label: 'Firebase' },
  { icon: supabaseIcon, label: 'Supabase' },
  { icon: postgresIcon, label: 'PostgreSQL' },
  { icon: sqlIcon, label: 'SQL' },
  { icon: pandasIcon, label: 'Pandas' },
  { icon: pytorchIcon, label: 'PyTorch' },
  { icon: numpyIcon, label: 'NumPy' },
  { icon: tensorflowIcon, label: 'TensorFlow' },
  { icon: sklearnIcon, label: 'SKlearn' },
  { icon: dockerIcon, label: 'Docker' },
  { icon: latexDark, label: 'LaTeX' },
  { icon: linuxIcon, label: 'Linux' },
];

const Skills: React.FC = () => {
  return (
    <div>
      <div className="w-full container max-w-7xl mx-auto sm:px-6 lg:px-8" />
      <Card className="text-white py-10 container max-w-7xl mx-auto">
        <CardHeader className="text-4xl font-bold mb-4 text-white">
          Technical Skills
        </CardHeader>
        <CardContent>
          {/* Section for Languages with line and text above */}
          <div className="relative mb-8">
            <h3 className="text-2xl font-semibold relative z-10 inline-block bg-black px-4">
              Languages
            </h3>
            <div className="absolute inset-0 top-1/2 w-full border-t border-gray-700"></div>
          </div>
          <div className="grid lg:grid-cols-10 sm:grid-cols-5 grid-cols-3 gap-6 justify-items-center">
            {languages.map((skill, index) => (
              <div key={index} className="flex flex-col items-center group">
                <Icon
                  icon={skill.icon}
                  className="w-12 h-12 mb-2 transition-transform duration-300 group-hover:scale-110"
                />
                <span
                  className="
                    text-lg 
                    text-center
                    w-full
                    opacity-100 translate-y-0 
                    md:opacity-0 md:translate-y-2 
                    group-hover:opacity-100 group-hover:translate-y-0 
                    transition-all duration-300
                  "
                >
                  {skill.label}
                </span>
              </div>
            ))}
          </div>

          {/* Section for Libraries & Tools with line and text above */}
          <div className="relative mt-16 mb-8">
            <h3 className="text-2xl font-semibold relative z-10 inline-block bg-black px-4">
              Libraries & Tools
            </h3>
            <div className="absolute inset-0 top-1/2 w-full border-t border-gray-700"></div>
          </div>
          <div className="grid lg:grid-cols-10 sm:grid-cols-5 grid-cols-3 gap-6 justify-items-center">
            {frameworksAndTools.map((skill, index) => (
              <div key={index} className="flex flex-col items-center group">
                <Icon
                  icon={skill.icon}
                  className="w-12 h-12 mb-2 transition-transform duration-300 group-hover:scale-110"
                />
                <span
                  className="
                    text-lg 
                    text-center
                    w-full
                    opacity-100 translate-y-0 
                    md:opacity-0 md:translate-y-2 
                    group-hover:opacity-100 group-hover:translate-y-0 
                    transition-all duration-300
                  "
                >
                  {skill.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Skills;
