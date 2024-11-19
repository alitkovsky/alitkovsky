"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

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
   const pathname = usePathname();

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
                        className={`decoration ${link.path === pathname ? "" : ""}`}
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