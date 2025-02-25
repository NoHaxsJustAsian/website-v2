import React, { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ChevronUpIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollContext } from "@/components/ScrollContext";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

interface NavbarProps {
  onNavigate: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { scrollY, threshold } = useScrollContext();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);

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
      className={`fixed top-4 w-full flex justify-center items-center p-2 z-50 transition-all duration-300`}
      style={{
        marginTop: scrolled ? "0" : "1rem",
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          className={`flex justify-between items-center w-full max-w-[90rem] mx-auto gap-6 rounded-full ${
            scrolled
              ? "backdrop-blur-md bg-white/[0.07]"
              : "bg-transparent"
          } p-4 px-4 sm:px-6 lg:px-8 transition-colors duration-300`}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              onClick={() => onNavigate("hero")}
              variants={winVariants}
              animate={scrolled ? "visible" : "hidden"}
              className="flex items-center cursor-pointer overflow-hidden"
            >
              <HoverCard openDelay={100} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 cursor-pointer">
                      <AvatarImage
                        src="https://github.com/nohaxsjustasian.png"
                        alt="@nohaxsjustasian"
                      />
                      <AvatarFallback>NA</AvatarFallback>
                    </Avatar>
                    <span className="ml-2">Win.</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent 
                  className="w-80 p-4 bg-black/90 backdrop-blur-xl border border-gray-700 shadow-xl"
                  side="bottom"
                  align="start"
                  sideOffset={5}
                  asChild
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
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
                      </div>
                    </div>
                  </motion.div>
                </HoverCardContent>
              </HoverCard>
            </motion.div>

            <motion.nav
              className="hidden sm:flex space-x-4"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.button
                onClick={() => onNavigate("skills")}
                className="bg-transparent border border-gray-200 rounded-full px-4 py-2 shadow-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Skills
              </motion.button>
              <motion.button
                onClick={() => onNavigate("projects")}
                className="bg-transparent border border-gray-200 rounded-full px-4 py-2 shadow-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Projects
              </motion.button>
              <motion.button
                onClick={() => onNavigate("experience")}
                className="bg-transparent border border-gray-200 rounded-full px-4 py-2 shadow-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Experience
              </motion.button>
            </motion.nav>
          </div>
          <motion.div
            className="flex items-center gap-4"
            layout
            initial={false}
          >
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="flex space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href="https://github.com/nohaxsjustasian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white transition-colors"
                  >
                    <GitHubLogoIcon className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tunwa-tongtawee/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white transition-colors"
                  >
                    <LinkedInLogoIcon className="h-6 w-6" />
                  </a>
                  <a
                    href="https://x.com/nohaxsjustasian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white transition-colors"
                  >
                    <TwitterLogoIcon className="h-6 w-6" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              className="text-2xl cursor-pointer text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white transition-colors"
              layout
              initial={false}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.div
                animate={{ rotate: menuOpen ? -90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronUpIcon className="h-6 w-6" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
