import Socials from "@/components/Socials";

const Footer = () => {
  return (
	<footer className="content-end">
		<div className="content-end">
			<p>Andrii Litkovskyi <br />Creative developer</p>
			<Socials
				containerStyles="flex gap-2"
				iconStyles="flex text-[var(--color--foreground--33)] hover:bg-[var(--color--background--100)] hover:text-[var(--color--foreground--100)] hover:transition-all duration-500 decoration"
			/>
		</div>
		<p className="text-right">Designed and coded by yours truly with<br />Next.js and Tailwind CSS, deployed with Vercel.<br />All text is set in the UnitySans typeface.</p>
 	</footer>
  )
};

export default Footer;