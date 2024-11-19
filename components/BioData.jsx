"use client";

import Link from "next/link";

import { MdArrowOutward } from "react-icons/md";

const about = {
   title: "About me",
   description: "As a code/design hybrid with experience in both frontend and backend development, I bring a unique perspective to every project. With my in-depth knowledge of U! design, I take a holistic approach that combines both aesthetic and functional aspects. I love to work with my team on new challenges and always find an efficient solution to complex problems through clean code and good communication.",
   info: [
     {
       fieldName: "Bithday",
       fieldValue: "27.07.1987"
     },
     {
       fieldName: "Andress",
       fieldValue: "Mindener Str. 87, 32479 Hille (NRW), Germany"
     },
     {
       fieldName: "alitkovsky.vercel.app",
       fieldValue: ""
     },
     {
       fieldName: "Phone",
       fieldValue: "+49 17658238236"
     },
     {
       fieldName: "Email",
       fieldValue: "alitkovsky@me.com"
     },
   ]
};

const experience = {
   title: "Experience",
   description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis totam maxime nulla ducimus at quasi enim itaque.",
   items: [
     {
       company: "Tech Solution Inc. | Feodosia, UA",
       position: "Full Stack Developer",
       start: "MAR, 2022",
       end: "PRESENT",
       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis totam maxime nulla ducimus at quasi enim itaque."
     },
     {
       company: "Web Design Agency | Feodosia, UA",
       position: "Front-End Developer Intern",
       start: "JUL, 2021",
       end: "AUG, 2021",
       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis totam maxime nulla ducimus at quasi enim itaque."
     },
   ]
};

const education = {
   title: "Education",
   items: [
     {
       institution: "Taurida National University | Simferopol, UA",
       degree: "Master-Studium Tourismus-Manager",
       start: "FEB, 2008",
       end: "DEC, 2009",
     },
   ]
};

const certification = {
   title: "Certification",
   items: [
     {
       platform: "telc",
       link: "https://results.telc.net/qr/4DfpYIMoQ3u1skjqxfDgxU3uv472s0sDmrqtjq5D10_SKNDXlANETac3r5mTpnxe",
       direction: "German B2 Certificate",
       date: "SEP, 2024",
     },
     {
       platform: "g.a.s.t.",
       link: "",
       direction: "German B1 Certificate",
       date: "MAR, 2024",
     },
     {
       platform: "Meta",
       link: "",
       direction: "Front-End Developer Professional Certificate",
       date: "JAN, 2024",
     },
     {
       platform: "Meta",
       link: "https://coursera.org/verify/4MFYPVG52S8T",
       direction: "Programming with JavaScript",
       date: "AUG, 2023",
     },
     {
       platform: "EF SET",
       link: "https://cert.efset.org/227RcM",
       direction: "English C1 Certificate",
       date: "JUL, 2023",
     },
   ]
};

const skills = {
   title: "Skills",
   skillList: [
     {
       name: "HTML5"
     },
     {
       name: "CSS3 / SCSS"
     },
     {
       name: "JavaScript"
     },
     {
       name: "React"
     },
     {
       name: "Typescript"
     },
     {
       name: "Tailwind CSS"
     },
     {
       name: "Next.js"
     },
   ]
};
const interests = {
   title: "Interests",
   list: [
     {
       name: "Triathlon"
     },
     {
       name: "Bouldering"
     },
     {
       name: "Drone filming"
     },
     {
       name: "Vanlife"
     },
   ]
};

const BioData = () => {
  return (
    <section className="section profile mt-36">
      <div className="content">
         <div className="flex flex-row gap-8 w-full">
            {/* <div className="flex w-[30%] flex-col gap-8">
               <div className="flex flex-col">
                  <div className="pb-5">
                     <h2 className="text-large--sm">{skills.title}</h2>
                     <div className="pt-6">
                        <ul className="grid grid-cols-1 gap-2">
                           {skills.skillList.map((item, index) => {
                              return (
                              <li
                                 key={index}
                                 className="flex flex-col gap-1"
                              >
                                 <span className="">{item.name}</span>
                              </li>
                              );
                           })}
                        </ul>
                     </div>
                  </div>
                  <div className="pb-5">
                     <h2 className="text-large--sm">Languages</h2>
                     <div className="pt-6">
                        <ul className="grid grid-cols-1 gap-2">
                              <li className="flex flex-col gap-1">
                                 <span className="">English | C1</span>
                                 <span className="">German | B2</span>
                                 <span className="">Ukrainian & Russian | Native </span>
                              </li>
                        </ul>
                     </div>
                  </div>
                  <div className="pb-5">
                     <h2 className="text-large--sm">Interests</h2>
                     <div className="pt-6">
                        <ul className="grid grid-cols-1 gap-2">
                              <li className="flex gap-2 items-center">
                                 <p>Triathlon </p>
                                 <Link href="https://www.strava.com/athletes/32473024">
                                    <MdArrowOutward />
                                 </Link>
                              </li>
                              <li className="flex flex-col gap-1">
                                 <p>Bouldering </p>
                              </li>
                              <li className="flex gap-2 items-center">
                                 <p>Drone filming </p>
                                 <Link href="https://www.youtube.com/@alitkovsky">
                                    <MdArrowOutward />
                                 </Link>
                              </li>
                              <li className="flex flex-col gap-1">
                                 <p>Vanlife</p>
                              </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div> */}
            <div className="flex flex-col gap-2 w-full">
               <div className="">
                  <h2 className="text-large--lg">Experience</h2>
                  <ul className="grid grid-cols-1 gap-2">
                     {experience.items.map((item, index) => {
                        return (
                        <li
                           key={index}
                           className="flex gap-2 py-6"
                        >
                           <div className="flex-none w-28 pr-6 border-foreground border-r-[1px] text-right h-[50px] self-baseline">
                              <p>{item.end}</p>
                              <p>{item.start}</p>
                           </div>
                           <div className="flex-initial px-4 flex flex-col content-between self-baseline">
                              <h3>{item.company}</h3>
                              <p>{item.position}</p>
                              <p>{item.description}</p>
                           </div>
                        </li>
                        );
                     })}
                  </ul>
               </div>

               <div className="">
                  <h2 className="text-large--lg">{education.title}</h2>
                  <ul className="grid grid-cols-1 gap-2">
                     {education.items.map((item, index) => {
                        return (
                        <li
                           key={index}
                           className="flex flex-row gap-2 py-6"
                        >
                           <div className="flex-none w-28 pr-6 border-foreground border-r-[1px] text-right h-[50px] self-baseline">
                              <p>{item.end}</p>
                              <p>{item.start}</p>
                           </div>
                           <div className="flex-initial px-4 flex flex-col content-between self-baseline">
                              <h3 className="text-lg">{item.institution}</h3>
                              <p className="text-white/60 font-bold">{item.degree}</p>
                           </div>
                        </li>
                        );
                     })}
                  </ul>
               </div>

               <div className="">
                  <h2 className="pb-6">{certification.title}</h2>
                  <ul className="grid grid-cols-1 gap-2 pt-2">
                     {certification.items.map((item, index) => {
                        return (
                        <li
                           key={index}
                           className="flex gap-2"
                        >
                           <div className="flex-none w-28 pr-6 border-foreground border-r-[1px] text-right items-baseline">
                              <p>{item.date}</p>
                           </div>
                           <div className="px-4 flex items-center gap-2">
                              <h3>{item.platform}</h3>
                              <p>{item.direction}</p>
                              {item.link ? (
                                 <Link href={item.link}>
                                    <MdArrowOutward />
                                 </Link>
                              ) : null}
                           </div>
                        </li>
                        );
                     })}
                  </ul>
               </div>

            </div>
         </div>
      </div>
    </section>
  )
};

export default BioData;