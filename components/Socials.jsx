import Link from "next/link";

import {FaGithub, FaLinkedin, FaInstagram, FaYoutube} from "react-icons/fa";

const socials = [
   {
      icon: <FaGithub />,
      title: "Github",
      path: "https://github.com/alitkovsky"
   },
   {icon: <FaLinkedin />,
      title: "LinkedIn",
      path: "https://www.linkedin.com/in/andrii-litkovskyi/"
   },
   {icon: <FaInstagram />,
      title: "Instagram",
      path: "https://www.instagram.com/alitkovsky/"
   },
   {
      icon: <FaYoutube />,
      title: "Youtube",
      path: "https://www.youtube.com/channel/UCfJRg3ayFNVP-FVQd-o8b5w"
   }
];

const Socials = ({containerStyles, iconStyles}) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
         return (
            <p key={index}>
               <Link href={item.path} className={iconStyles}>
                  {item.title}
               </Link>
            </p>
         );
      })}
    </div>
  )
};

export default Socials;