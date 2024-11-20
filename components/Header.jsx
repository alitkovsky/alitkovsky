"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav";
import ScrollToSection from "@/components/ScrollToSection";
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

   return (
      <header className="section py-[var(--grid--main-margin)] sticky top-0 min-h-[120px] z-50">
         <div className="mx-auto flex justify-between items-center col-span-12 w-full">

            <Link
               href=""
               className=""
               onMouseEnter={LogoAnimation}
               onMouseLeave={LogoAnimation}
               onClick={(event) => ScrollToSection("hero", event)}
               scroll={false}
               aria-label="Get to the top"
            >
               <div>
                  <h3>
                     <LogoAnimation
                        initialText="Andrii Litkovskyi" hoverText="alitkovsky@me.com"
                     />
                  </h3>
               </div>
            </Link>

            {!isMobileViewport && (
               <Nav />
            )}

            {isMobileViewport && (
               <MobileNav toggleMobileNav={toggleMobileNav} isMobileNavOpen={isMobileNavOpen} />
            )}

         </div>
      </header>
  )
};

export default Header;