"use client";

import Link from "next/link";

import Time from "@/components/Time";
import Socials from "@/components/Socials";

const Contact = () => {
  return (
    <section className="section contact justify-between">
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
            <Link href="mailto:alitkovsky@me.com" className="mail"><h2>alitkovsky@me.com</h2></Link>
          </div>
          <div className="more place-self-end justify-between gap-20">
            <p className="self-center">currently available for work</p>
            <div className="flex flex-col gap-1">
              <p><Time /></p>
              <p>Hille, NRW, Germany</p>
            </div>
          </div>
      </div>
      <footer className="content-end">
        <div className="content-end">
          <p>Andrii Litkovskyi <br />Creative developer</p>
          <Socials
            containerStyles="flex gap-2"
            iconStyles="flex text-[var(--color--foreground--33)] hover:bg-[var(--color--background--100)] hover:text-[var(--color--foreground--100)] hover:transition-all duration-500"
          />
        </div>
        <p className="text-right">Designed and coded by yours truly with<br />Next.js and Tailwind CSS, deployed with Vercel.<br />All text is set in the UnitySans typeface.</p>
      </footer>
    </section>
  )
};

export default Contact;