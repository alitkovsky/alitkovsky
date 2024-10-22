"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Web Development",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores quo obcaecati fugit autem vel at expedita. Voluptates.",
    href: ""
  },
  {
    num: "02",
    title: "UI/UX Design",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores quo obcaecati fugit autem vel at expedita. Voluptates.",
    href: ""
  },
  {
    num: "03",
    title: "Logo Design",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores quo obcaecati fugit autem vel at expedita. Voluptates.",
    href: ""
  },
  {
    num: "04",
    title: "SEO",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores quo obcaecati fugit autem vel at expedita. Voluptates.",
    href: ""
  },
];

const Services = () => {
  return (
    <section className="flex flex-col justify-center min-h-[80vh] py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1, transition: {delay: 2.4}, ease: "easeIn"}}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return(
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                <div className="w-svh flex items-center justify-between">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">{service.num}</div>
                  <Link
                    href={service.href}
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex items-center justify-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">{service.title}</h2>
                <p className="text-white/60">{service.description}</p>
                <div className="border-b border-white/20 w-svh"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  )
};

export default Services;