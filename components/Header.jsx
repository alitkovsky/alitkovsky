import Link from "next/link";
import { Button } from "@/components/ui/button";


import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav";

const Header = () => {
   return (
      <header className="py-8 xl:py-12">
         <div className="container mx-auto flex justify-between items-center">

            <Link href="/">
               <div className="brand text-4xl">
                  <h3><span>A</span><span>n</span><span>d</span><span>r</span><span>i</span><span>i</span><span> </span><span>L</span><span>i</span><span>t</span><span>k</span><span>o</span><span>v</span><span>s</span><span>k</span><span>y</span><span>i</span></h3>
               </div>
            </Link>

            <div className="hidden xl:flex items-center gap-8">
               <Nav />
               <Link href="/contact">
                  <Button>Hire me</Button>
               </Link>
            </div>

            <div className="xl:hidden">
               <MobileNav />
            </div>

         </div>
      </header>
  )
};

export default Header;