"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Photo = () => {
  return (
    <div className="">
      <motion.div
         initial={{ opacity: 0 }}
         animate={{
            opacity: 1,
            transition: { delay: 2, duration: 0.4, ease: "easeIn" },
         }}
      >
         <Image
               src="/assets/photo.png"
               alt=""
               priority
               width={300}
               height={400}
               className="object-contain"
            />
         {/* <motion.div
            className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute"
            initial={{ opacity: 0 }}
            animate={{
               opacity: 1,
               transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
            }}
         >
            <Image
               src="/assets/photo.png"
               alt=""
               priority
               quality={100}
               fill
               className="object-contain"
            />
         </motion.div> */}

         {/* <motion.svg
            className="w-[400px] xl:w-[506px] h-[400px] xl:h-[506px]"
            fill="transparent"
            viewBox="0 0 506 506"
            xmlns="http://www.w3.org/2000/svg"
         >
            <motion.circle
               cx="253"
               cy="253"
               r="250"
               stroke="rgb(195 235 241 / 1)"
               strokeWidth="4"
               strokeLinecap="round"
               strokeLinejoin="round"
               initial={{ strokeDasharray: "24 10 0 0" }}
               animate={{
                  strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                  rotate: [120, 360],
               }}
               transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse"
               }}
            />
         </motion.svg> */}
      </motion.div>
    </div>
  )
};

export default Photo;