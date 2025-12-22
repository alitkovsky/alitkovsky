import Link from "next/link";

export default function References() {
  return (
   <section className="section references" id="references">
   <div className="content">

     <div className="item">
       <h2 className="quote">Truly one of the best marketer collaborators I’ve ever worked&nbsp;with.</h2>
       <p>
         <span className="person"><Link href="" target="_blank">Adam Smith</Link></span>
         <span className="role">Director of Marketing</span>
       </p>
     </div>

     <div className="item">
       <h2 className="quote">Andrii has an exceedingly rare blend of high craft and superb strategic and systems&nbsp;thinking.</h2>
       <p>
         <span className="person"><Link href="" target="_blank">Adam Smith</Link></span>
         <span className="role">Senior UX Program Manager</span>
       </p>
     </div>

     <div className="item">
       <h2 className="quote">Truly one of the best marketer collaborators I’ve ever worked&nbsp;with.</h2>
       <p>
         <span className="person"><Link href="" target="_blank">Adam Smith</Link></span>
         <span className="role">Director of Marketing</span>
       </p>
     </div>

   </div>
 </section>
  )
};