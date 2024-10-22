"use client";
import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

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

const MobileNav = () => {
   const pathname = usePathname();

   const [sheetOpen, setSheetOpen] = useState(false);
   const toggleSheet = () => setSheetOpen(!sheetOpen);


   return (
      <>
         {/* <div
            className={`navigation ${sheetOpen ? "mobile-nav--is--visible" : ""}`}
            onClick={toggleSheet}
         >
               <div className="content">
                  <div className="icon">
                  <div className="line"><div className="content"></div></div>
                  <div className="line"><div className="content"></div></div>
                  </div>
               </div>
         </div> */}
         <Sheet open={sheetOpen} onOpenChange={toggleSheet}>
            <SheetTrigger>
                     <div
                        className={`navigation ${sheetOpen ? "mobile-nav--is--visible z-50" : ""}`}
                        onClick={toggleSheet}
                     >
                           <div className="content">
                              <div className="icon">
                              <div className="line"><div className="content"></div></div>
                              <div className="line"><div className="content"></div></div>
                              </div>
                           </div>
                     </div>
            </SheetTrigger>
            <SheetContent className="flex flex-col w-full left-0 bg-background">
               <nav className="container flex flex-col justify-start items-start mt-[50px] gap-2 z-20 font-primary">
                  {links.map((link, index) => {
                     return (
                        <Link
                           key={index}
                           href={link.path}
                           onClick={toggleSheet}
                           className={`${
                              link.path === pathname && "text-foreground border-none"
                           } text-2xl capitalize hover:text-foreground text-link transition-all`}
                        >
                           {link.name}
                        </Link>
                     )
                  })}
               </nav>
            </SheetContent>
         </Sheet>
      </>
  )
};

export default MobileNav;