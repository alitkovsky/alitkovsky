"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ScrollToSection from "@/components/ScrollToSection";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
   const toggleVisibility = () => {
     setVisible(window.scrollY > 250);
   };

   window.addEventListener("scroll", toggleVisibility);
   return () => window.removeEventListener("scroll", toggleVisibility);
 }, []);

  return (
    <>
      <div className={`scroll mix-blend-difference ${visible ? "invisible" : ""}`}>
         <div className="scroll-line"></div>
      </div>
       <Link
         onClick={(event) => {
            ScrollToSection(link.path, event);
            onNavClick();
         }}
         href=""
         scroll={false}
       >
         <div className={`to-top mix-blend-difference ${visible ? "visible animated" : ""}`}>
           <div className="arrow">
             <div className="line">
               <div className="content"></div>
             </div>
             <div className="line">
               <div className="content"></div>
             </div>
           </div>
         </div>
       </Link>
    </>
  );
};

export default ScrollToTop;