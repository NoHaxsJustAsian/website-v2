import React, { useEffect } from 'react';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { motion, useTransform } from 'framer-motion';
import { useScrollContext } from '@/components/ScrollContext';

const HeroSection: React.FC = () => {
  const { scrollY, threshold, heroRef } = useScrollContext();
  const [scrolled, setScrolled] = React.useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((y) => {
      setScrolled(y >= threshold);
    });
    return () => unsubscribe();
  }, [scrollY, threshold]);


  const textOpacity = useTransform(scrollY, [threshold - 100, threshold], [1, 0]);
  const textX = useTransform(scrollY, [threshold - 100, threshold], [0, -50]);
  const gradientOpacity = useTransform(scrollY, [threshold - 100, threshold], [1, 0.4]); // Less harsh fade
  const para1Opacity = useTransform(scrollY, [threshold, threshold + 60], [1, 0.4]);
  const para2Opacity = useTransform(scrollY, [threshold + 20, threshold + 80], [1, 0.4]);
  const para3Opacity = useTransform(scrollY, [threshold + 40, threshold + 100], [1, 0.4]);
  const para4Opacity = useTransform(scrollY, [threshold + 60, threshold + 120], [1, 0.4]);

  return (
    <div ref={heroRef} className="relative h-screen w-full z-10">
      <motion.div
        className="absolute bottom-0 left-0 w-screen h-64"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          opacity: gradientOpacity,
          transition: 'opacity 0.3s ease-out',
          pointerEvents: 'none',
        }}
      ></motion.div>
      <div className="container max-w-7xl mx-auto relative z-20 flex flex-col justify-end h-full pb-6 text-left">
        <h1 className="text-5xl font-semibold leading-tight text-white flex items-center">
          <motion.span style={{ opacity: textOpacity, x: textX }}>
            Hi, I'm{' '}
          </motion.span>
          {!scrolled && (
            <motion.div 
              layoutId="shared-avatar-win"
              className="flex items-center cursor-pointer ml-5"
              style={{ opacity: textOpacity, x: textX }}
            >
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div className="flex items-center cursor-pointer">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage
                        src="https://github.com/nohaxsjustasian.png"
                        alt="@nohaxsjustasian"
                      />
                      <AvatarFallback>NA</AvatarFallback>
                    </Avatar>
                    <span>Win.</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4" side="top" align="start">
                  <div className="flex space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src="https://github.com/nohaxsjustasian.png"
                        alt="@nohaxsjustasian"
                      />
                      <AvatarFallback>NA</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">Tunwa (Win) Tongtawee</h4>
                      <h4 className="text-sm font-semibold">
                        <a
                          href="https://github.com/nohaxsjustasian"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          @nohaxsjustasian
                        </a>
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        NEU 25' | Searching for new grad SWE positions.
                      </p>
                      <div className="flex items-center mt-2">
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          )}
        </h1>
        <motion.p className="text-lg text-white mt-4" style={{ opacity: para1Opacity }}>
          Software Engineer currently at <strong>Ubiwell Lab</strong>, 
          researching how we can use sensing data and machine learning to treat depression.
        </motion.p>
        <motion.p className="text-lg text-white mt-1" style={{ opacity: para2Opacity }}>
          I'm also a <strong>Computer Science</strong> student at <strong>Northeastern University</strong>, 
          graduating in <strong>2025.</strong>
        </motion.p>
        <motion.p className="text-lg text-white mt-1" style={{ opacity: para3Opacity }}>
          Currently searching for <strong>Spring 2025 New Grad Positions.</strong>
        </motion.p>
        <motion.p className="text-lg text-white mt-1" style={{ opacity: para4Opacity }}>
          <strong>Yes, you can touch it. It won't bite.</strong>
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection;
