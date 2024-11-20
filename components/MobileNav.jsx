"use client";

const MobileNav = ({ isMobileNavOpen, toggleMobileNav}) => {

   return (
      <>
         <div
            className={`navigation ${isMobileNavOpen ? "mobile-nav--is--visible" : ""}`}
            onClick={toggleMobileNav}
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