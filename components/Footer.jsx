import Link from "next/link";
import Socials from "@/components/Socials";


const Footer = () => {
  return (
   <section className="section footer">
      <div className="content items-end">
			<div>
				<p>Andrii Litkovskyi <br />Creative developer</p>
				<Socials
					containerStyles="flex gap-2"
					iconStyles="flex text-[var(--color--foreground--33)] hover:bg-[var(--color--background--100)] hover:text-[var(--color--foreground--100)] hover:transition-all duration-500"
				/>
			</div>
			{/* <div className="flex flex-col items-center">
				<Link href="mailto:alitkovsky@me.com" className="mail">alitkovsky@me.com</Link>
			</div> */}
			{/* <div className="flex gap-4 mt-8">
				<div class="look">
					<div class="radius"></div>
					<div class="dot"></div>
				</div>
				<h3 className="text-[var(--color--foreground--33)]">currently available worldwide</h3>
			</div> */}
			<p className="text-right">Designed and coded by yours truly with<br />Next.js and Tailwind CSS, deployed with Vercel.<br />All text is set in the UnitySans typeface.</p>
      </div>
   </section>
  )
};

export default Footer;