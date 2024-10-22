import { animate, motion } from "framer-motion";

const stairAnimation = {
   initial: {
      top: "0%",
   },
   animate: {
      top: "100%",
   },
   exit: {
      top: ["100%","0%"],
   },
};

const reserveIndex = (index) => {
   const totalSteps = 6;
   return totalSteps - index - 1;
};

const Stairs = () => {
  return (
      <>
         {[...Array(6)].map((_, index) => {
            return (
               <motion.div
                  key={index}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={stairAnimation}
                  transition={{
                     duration: 0.4,
                     delay: 0.1 * reserveIndex(index)
                  }}
                  className="h-full w-full bg-foreground relative"
               />
            );
         })}
      </>
  );
};

export default Stairs;