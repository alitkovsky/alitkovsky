"use client";

import Socials from "@/components/Socials";
import Time from "@/components/Time";

import { motion } from "framer-motion";

import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="section hero"
      id="hero"
    >
      <div className="content content-between">
        <div className="col-span-10 grid">
          <h2>Front-End Developer</h2>
          <h3 className="text-(--color--foreground--33)">based in Germany / available worldwide</h3>
          <div className="place-self-end">
            <p className="justify-start text-(--color--foreground--33) mt-8">Berlin <Time /></p>
          </div>
        </div>
        <h1 className="col-span-9">
          With a unique blend of marketing insight and frontend expertise, I bridge the gap between user needs and product design.
        </h1>
      </div>
      <div className="links items-end flex justify-between">
        <div className="flex flex-col gap-[2px]">
          <p>Contact</p>
          <p>
            <Link href="mailto:alitkovsky@me.com" className="mail">alitkovsky@me.com</Link>
          </p>
          <p className="text-(--color--foreground--33)">
            <Link href="tel:+4917658238236">+49 176 5823 8236</Link>
          </p>
        </div>
        <div>
          {/* <Socials
            containerStyles="flex flex-col gap-[2px]"
            iconStyles="flex justify-end items-end text-(--color--foreground--33) hover:bg-(--color--background--100) hover:text-(--color--foreground--100) hover:transition-all duration-500"
          /> */}
        </div>
      </div>
    </section>
  )
};

export default Hero;