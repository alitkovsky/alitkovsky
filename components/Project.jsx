"use client";

import Link from "next/link";


const Project = ( {index, title, year, live, projectsStack, setModal} ) => {
  return (
    <div onMouseEnter={() => {setModal({active: true, index})}} onMouseLeave={() => {setModal({active: false, index})}} className="project-item flex w-full justify-between items-center px-0 py-10 border-b-[1px] border-b-foreground cursor-pointer transition-all delay-2000 last-of-type:border-none h-[200px] hover:h-[400px]">
      <div className="flex flex-col">
        <h1 className="text-large--lg m-0 font-normal transition-all delay-4000 hover:translate-x-[-10px]">
          <Link href={live}>{title}</Link>
        </h1>
        <ul className="flex gap-4">
          {projectsStack.map((item, i) => {
            return (
              <li
                key={index}
                className="mt-4"
              >
                {item.name}
                {index !== projectsStack.length - 1 && ","}
              </li>
            )
          })}
        </ul>
      </div>
      <p className="transition-all delay-4000 font-light hover:translate-x-[10px]">{year}</p>
    </div>
  )
};

export default Project;