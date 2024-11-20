"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav";
import LogoAnimation from "@/components/LogoAnimation";

const Header = () => {
   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
   const [isMobileViewport, setIsMobileViewport] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobileViewport(window.innerWidth < 1020);
         if (window.innerWidth >= 1020) {
            setIsMobileNavOpen(false);
         }
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const toggleMobileNav = () => {
      setIsMobileNavOpen((prev) => !prev);
   };

   const closeMobileNav = () => {
      setIsMobileNavOpen(false);
   };

   return (
      <motion.header
         className="section py-[var(--grid--main-margin)] sticky top-0 min-h-[120px] z-50"
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
      >
         <div className="mx-auto flex justify-between items-center col-span-12 w-full">

            <h3>
               <LogoAnimation
                  initialText="Andrii Litkovskyi" hoverText="alitkovsky@me.com"
               />
            </h3>

            {!isMobileViewport && (
               <Nav />
            )}

            {isMobileViewport && (
               <MobileNav
                  toggleMobileNav={toggleMobileNav}
                  isMobileNavOpen={isMobileNavOpen}
               />
            )}

            {isMobileViewport && isMobileNavOpen && (
               <div
                  className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-300 bg-[var(--color--background--100)] ${
                     isMobileNavOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                  onClick={closeMobileNav}
               >
                  <Nav
                     onNavClick={closeMobileNav}
                     isMobile={true}
                  />
               </div>
            )}

         </div>
      </motion.header>
  );
};

export default Header;