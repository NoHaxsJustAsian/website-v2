import React, { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useScrollContext } from '@/components/ScrollContext';

const Navbar: React.FC = () => {
  const { scrollY, threshold } = useScrollContext();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((y) => {
      setScrolled(y >= threshold);
    });
    return () => unsubscribe();
  }, [scrollY, threshold]);

  const winVariants = {
    hidden: {
      opacity: 0,
      width: 0,
      marginRight: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      width: "auto",
      marginRight: "0.5rem",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <header
      className={`fixed top-0 w-full flex justify-center items-center p-6 shadow-lg z-50 ${
        scrolled
          ? "bg-opacity-90 backdrop-filter backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <motion.div
        className="flex justify-between items-center w-full max-w-7xl gap-4"
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            variants={winVariants}
            animate={scrolled ? "visible" : "hidden"}
            className="flex items-center cursor-pointer overflow-hidden"
          >
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <div>
                  <Avatar className="w-10 h-10 cursor-pointer">
                    <AvatarImage
                      src="https://github.com/nohaxsjustasian.png"
                      alt="@nohaxsjustasian"
                    />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <div className="flex space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src="https://github.com/nohaxsjustasian.png"
                      alt="@nohaxsjustasian"
                    />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-semibold">
                      Tunwa (Win) Tongtawee
                    </h4>
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
            <span className="ml-2">Win.</span>
          </motion.div>

          <motion.nav
            className="flex space-x-4"
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.button
              className="bg-transparent border border-gray-200 rounded-full px-4 py-2 shadow-md text-gray-200 hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Work
            </motion.button>
            <motion.button
              className="bg-transparent border border-gray-200 rounded-full px-4 py-2 shadow-md text-gray-200 hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.button>
          </motion.nav>
        </div>
        <motion.div
          className="text-2xl cursor-pointer text-gray-200 hover:text-white transition-colors"
          layout
          initial={false}
        >
          &#x2630;
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Navbar;
