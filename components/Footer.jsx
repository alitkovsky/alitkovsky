import Socials from "@/components/Socials";

const Footer = () => {
  return (
	<footer className="items-end flex justify-between gap-4">
			<div className="content-end">
				<p>Andrii Litkovskyi <br />Creative developer</p>
				<Socials
					containerStyles="flex gap-2"
					iconStyles="flex text-[var(--color--foreground--33)] hover:bg-[var(--color--background--100)] hover:text-[var(--color--foreground--100)] hover:transition-all duration-500 decoration"
				/>
			</div>
			<div className="shrink w-[30%]"></div>
			<div className="text-right flex-initial">
				<p>Designed and coded by yours truly with Next.js and Tailwind CSS, deployed with Vercel.<span className="hidden md:block">&nbsp;All text is set in the UnitySans typeface.</span></p>
			</div>
 	</footer>
  )
};

export default Footer;