"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
   const pathname = usePathname();

   return (
      <AnimatePresence>
         <div key={pathname}>
            <motion.div
               initial={{ opacity: 1 }}
               animate={{
                  opacity: 0,
                  transition: { duration: 0.4, delay: 1, ease: "easeInOut" },
               }}
               className="h-full w-full fixed bg-background top-0 pointer-events-none"
            />
            {children}
         </div>
      </AnimatePresence>
  )
};

export default PageTransition;