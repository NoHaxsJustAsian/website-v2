'use client'
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import Skills from './Skills';

export default function MainContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="transition ease-in-out">
      <main className="px-4">
        <section className="pb-10">
          <p className="text-base leading-6 text-white/70">
          Hi, I'm Win. I'm a junior at Northeastern University, majoring in Computer Science, with a concentraion in Software Development.
          Outside of school, I'm a project lead for FirstByte, a club focused on expanding accessibility to STEM.
          </p>
          <p className="text-base leading-6 text-white/70">
          Currently exploring machine learning, and iOS/visionOS app development.
          </p>
          <p className="text-base leading-6 text-white/70">
          Looking for Fall 2024 Co-ops/Internships.
          </p>
        </section>
      </main>
    </motion.div>
  );
}