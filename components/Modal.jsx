import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

const scaleAnimation = {
    initial: {scale: 0, x:"-50%", y:"-50%"},
    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
};

const Modal = ( {modal, projects, live} ) => {

   const { active, index } = modal;
   const modalContainer = useRef(null);
   const cursor = useRef(null);
   const cursorLabel = useRef(null);

   useEffect( () => {
      //Move Container
      let xMoveContainer = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
      let yMoveContainer = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
      //Move cursor
      let xMoveCursor = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
      let yMoveCursor = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
      //Move cursor label
      let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
      let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})

      window.addEventListener("mousemove", (e) => {
        const { pageX, pageY } = e;
        xMoveContainer(pageX)
        yMoveContainer(pageY)
        xMoveCursor(pageX)
        yMoveCursor(pageY)
        xMoveCursorLabel(pageX)
        yMoveCursorLabel(pageY)
      })
    }, [])

  return (
   <>
      <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className="h-[450px] w-[400px] absolute overflow-hidden pointer-events-none flex justify-center items-center">
          <div style={{top: index * -100 + "%"}} className="h-full w-full absolute transition-top ease-custom duration-500">
          {
              projects.map( (project, index) => {
              const { src, color } = project
              return <div className="h-full w-full flex justify-center items-center" key={`modal_${index}`}>
                <Image
                  src={project.image}
                  width={400}
                  height={0}
                  loading="lazy"
                  alt={project.title}
                  className="h-auto object-contain rounded-xl"
                />
              </div>
              })
          }
          </div>
      </motion.div>
    </>
  )
};

export default Modal;