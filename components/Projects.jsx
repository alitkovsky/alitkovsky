"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import Project from "@/components/Project";
import Modal from "@/components/Modal";

const projects = [
  {
    num: "01",
    category: "frontend",
    title: "Fullstack furniture ecommerce website",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error dignissimos aspernatur assumenda mollitia sint amet!",
    stack: [{ name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }],
    image: "/assets/work/thumb1.png",
    color: "#000000",
    live: "/",
    github: "",
    year: "2022",
  },
  {
    num: "02",
    category: "fullstack",
    title: "Capstone project of Restaurant booking webapp",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error dignissimos aspernatur assumenda mollitia sint amet!",
    stack: [{ name: "Next.js" }, { name: "TailwindCSS" }, { name: "Node.js" }],
    image: "/assets/work/thumb2.png",
    color: "#8c8c8c",
    live: "/",
    github: "",
    year: "2022",
  },
  {
    num: "03",
    category: "frontend",
    title: "Commerce landing page",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error dignissimos aspernatur assumenda mollitia sint amet!",
    stack: [{ name: "Next.js" }, { name: "TailwindCSS" }],
    image: "/assets/work/thumb3.png",
    color: "#efe8d3",
    live: "/",
    github: "",
    year: "2022",
  },
  {
    num: "04",
    category: "frontend",
    title: "Personal portfolio website",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error dignissimos aspernatur assumenda mollitia sint amet!",
    stack: [{ name: "Next.js" }, { name: "TailwindCSS" }],
    image: "/assets/work/thumb4.png",
    color: "#000000",
    live: "/",
    github: "",
    year: "2022",
  }
];

const Projects = () => {

   const [modal, setModal] = useState({active: false, index: 0});

  return (
    <motion.section
      className="section projects mt-[var(--grid--main-xheight)]"
      id="projects"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
    <div className="content">
      <h1>Feature projects</h1>
      <div className="project-container w-full flex flex-col items-center justify-center py-10">
          {projects.map( (project, index) => {
            return <Project key={index} index={index} setModal={setModal} title={project.title} year={project.year} live={project.live} projectsStack={project.stack} />
          })}
      </div>
      <Modal modal={modal} projects={projects} />
    </div>
   </motion.section>
  )
};

export default Projects;