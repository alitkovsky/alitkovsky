"use client";

const MobileNav = ({ isMobileNavOpen, toggleMobileNavOpen }) => {

   return (
      <>
         {/* <div
            className="fixed top-0 left-0 w-full h-full bg-[var(--color--background--100)] z-50"

         /> */}
         <div
            className={`navigation ${isMobileNavOpen ? "mobile-nav--is--visible" : ""}`}
         >
            <div className="content">
               <div className="icon">
               <div className="line"><div className="content"></div></div>
               <div className="line"><div className="content"></div></div>
               </div>
            </div>
         </div>
      </>
  )
};

export default MobileNav;