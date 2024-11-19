"use client";

import { motion } from "framer-motion";

const Intro = () => {
  return (
    <motion.section
      className="section intro"
      id="intro"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="content">Intro</div>
    </motion.section>
  )
};

export default Intro;