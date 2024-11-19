"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
   {
      name: "home",
      path: "/"
   },
   {
      name: "services",
      path: "/services"
   },
   {
      name: "resume",
      path: "/resume"
   },
   {
      name: "work",
      path: "/work"
   },
   {
      name: "contact",
      path: "/contact"
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
                        href={link.path}
                        className={`${link.path === pathname ? "border-b-2 border-accent" : ""} capitalize hover:text-accent transition-all`}
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