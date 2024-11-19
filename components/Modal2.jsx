import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
    closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
};

const Modal = ({ modal, projects }) => {
    const { active, index } = modal;
    const modalContainer = useRef(null);
    const projectRefs = useRef([]);

    useEffect(() => {
        if (active && projectRefs.current[index]) {
            // Position the modal to the left of the active project title
            const projectElement = projectRefs.current[index];
            const modalElement = modalContainer.current;
            const { left, top, height } = projectElement.getBoundingClientRect();

            modalElement.style.left = `${left - 420}px`; // 400px width + 20px margin
            modalElement.style.top = `${top + height / 2}px`; // Vertically center with the project
        }
    }, [active, index]);

    return (
        <>
            {/* Modal Container */}
            <motion.div
                ref={modalContainer}
                variants={scaleAnimation}
                initial="initial"
                animate={active ? "enter" : "closed"}
                className="h-[450px] w-[400px] absolute overflow-hidden pointer-events-none flex justify-center items-center"
            >
                <div
                    style={{ top: index * -100 + "%" }}
                    className="h-full w-full absolute transition-top ease-custom duration-500"
                >
                    {projects.map((project, i) => (
                        <div
                            className="h-full w-full flex justify-center items-center"
                            key={`modal_${i}`}
                        >
                            <Image
                                src={project.image}
                                width={400}
                                height={0}
                                loading="lazy"
                                alt={project.title}
                                className="h-auto object-contain rounded-xl"
                            />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Projects List */}
            <div className="projects-list">
                {projects.map((project, i) => (
                    <div
                        key={`project_${i}`}
                        ref={(el) => (projectRefs.current[i] = el)}
                        className="project-item"
                    >
                        <h3>{project.title}</h3>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Modal;