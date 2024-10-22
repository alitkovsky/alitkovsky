import Photo from "@/components/Photo";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  return (
      <section className="container mx-auto mt-6">
        <div className="grid-container grid gap-[var(--grid--app-gutter)] items-center justify-between xl:pt-8 xl:pb-24" style={{ '--grid--app-columns': 'var(--grid--app-columns-12)' }}>

          <div className="text-start lg:text-left lg:order-none">
            <span className="text-xl">React Front-End Developer</span>
            <h1 className="h1 mb-12 mt-6">
              Hello, I&apos;m Andrii Litkovskyi a React Front-End developer with a passion for creating beautiful and functional user interfaces.
            </h1>

            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row items-center gap-10">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
              <div className="">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="w-[300px] md:order-0 lg:order-none lg:mb-0 xl:order-none xl:mb-0 2xl:order-none 2xl:mb-0">
            {/* <Photo /> */}
            <Image
               src="/assets/photo.png"
               alt=""
               priority
               width={300}
               height={400}
               className="object-contain"
            />
          </div>

        </div>
      </section>
  )
};

export default Hero;