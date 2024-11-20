"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import ScrollToSection from "@/components/ScrollToSection";

const links = [
   {
      name: "intro",
      path: "intro"
   },
   {
      name: "projects",
      path: "projects"
   },
   {
      name: "bio",
      path: "bio"
   },
   {
      name: "contact",
      path: "contact"
   }
];

const Nav = () => {
   const [activeSection, setActiveSection] = useState("");

   useEffect(() => {
      const sections = document.querySelectorAll("section");
      const observerOptions = {
         root: null, // viewport
         rootMargin: "0px",
         threshold: 0.6, // section is active when 60% is visible
      };

      const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               setActiveSection(entry.target.id); // update active section
            }
         });
      }, observerOptions);

      sections.forEach((section) => observer.observe(section));

      return () => {
         sections.forEach((section) => observer.unobserve(section)); // cleanup observer
      };
   }, []);

   const isActive = (id) => activeSection === id;

   return (
      <nav className="main-nav">
         <ul>
            {links.map((link, index) => (
                  <li key={index}>
                     <Link
                        onClick={(event) => ScrollToSection(link.path, event)}
                        href=""
                        scroll={false}
                        aria-label={link.name}
                        aria-current={isActive(link.name) ? "true" : "false"}
                        className={`decoration ${isActive(link.path) ? "active" : ""}`}
                     >
                        {link.name}
                     </Link>
                  </li>
            ))}
         </ul>
      </nav>
   )
};

export default Nav;