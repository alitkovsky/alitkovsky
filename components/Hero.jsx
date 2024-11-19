"use client";

import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import Stats from "@/components/Stats";
import Time from "@/components/Time";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="section hero" id="hero">
      {/* <div className="text-head hidden opacity-100 transform translate-x-0 translate-y-0">
				<div className="toggleversion-bloc">
          <p className="opacity-100 transform translate-x-0 translate-y-0">Apparence</p></div>
			</div> */}
      <div className="content content-between">
        <div>
          <h2>Front-End Developer</h2>
          <h3 className="text-[var(--color--foreground--33)]">based in Germany / available worldwide</h3>
          <div className="place-self-end">
          <p className="pr-4 justify-start text-[var(--color--foreground--33)]">Berlin <Time /></p>
        </div>
        </div>
        <h1>
          With a unique blend of marketing insight and frontend expertise, I bridge the gap between user needs and product design.
        </h1>
        {/* <Image
            alt="Andrii Litkovskyi"
            src="/assets/photo_bg_last.png"
            width={500}
            height={500}
            layout="responsive"
            className="place-self-end"
          /> */}
      </div>
      <div className="links items-end flex justify-between">
        <div className="flex flex-col gap-[2px]">
          <p>Contact</p>
          <p>
            <Link href="mailto:alitkovsky@me.com" className="mail">alitkovsky@me.com</Link>
          </p>
          <p className="text-[var(--color--foreground--33)]">
            <Link href="tel:+4917658238236">+49 176 5823 8236</Link>
          </p>
        </div>
        <div className="">
          <Socials
            containerStyles="flex flex-col gap-[2px]"
            iconStyles="flex justify-end items-end text-[var(--color--foreground--33)] hover:bg-[var(--color--background--100)] hover:text-[var(--color--foreground--100)] hover:transition-all duration-500"
          />
        </div>
      </div>
      {/* <div id="scroll">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 285" width="10" height="285" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);"><defs><clipPath id="__lottie_element_6"><rect width="10" height="285" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_6)"><g transform="matrix(0,0.7144200205802917,-1,0,43.5,141.93800354003906)" opacity="1" style="display: block;"><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path stroke-linecap="butt" stroke-linejoin="miter" fill-opacity="0" stroke-miterlimit="4" stroke="rgb(255,255,255)" stroke-opacity="1" stroke-width="10" d=" M142.9810028076172,38.5 C177.55799865722656,38.5 200.25,38.5 200.25,38.5"></path></g></g></g></svg>
      </div> */}
    </section>
  )
};

export default Hero;