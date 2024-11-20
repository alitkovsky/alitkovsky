"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import Time from "@/components/Time";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <motion.section
      className="section contact justify-between"
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="side content-center justify-between gap-20">
        <div className="flex flex-col gap-1 mt-8">
          {/* <div class="look">
            <div class="radius"></div>
            <div class="dot"></div>
          </div> */}
          <p className="self-center">currently available for work</p>
        </div>
        <div className="flex flex-col gap-1">
          <p><Time /></p>
          <p>Hille, NRW, Germany</p>
        </div>
      </div>
      <div className="content content-evenly">
          <h1>Reach out</h1>
          <div>
            <h2 className="flex flex-col">
              For any collaborative projects <br />or inquiries feel free to <br />reach out to me.
            </h2>
            <Link href="mailto:alitkovsky@me.com" className="mail decoration"><h2>alitkovsky@me.com</h2></Link>
          </div>
          <div className="more place-self-end justify-between gap-20">
            <p className="self-center">currently available for work</p>
            <div className="flex flex-col gap-1">
              <p><Time /></p>
              <p>Hille, NRW, Germany</p>
            </div>
          </div>
      </div>
      <Footer />
    </motion.section>
  )
};

export default Contact;