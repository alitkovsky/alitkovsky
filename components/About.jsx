"use client";

import Link from "next/link";

const education = {
  title: "Education",
  items: [
    {
      institution: "Taurida 'V.I. Vernadsky' National University",
      location: "Simferopol, UA",
      degree: "Master's degree in Tourism and Travel Services Management",
      start: "SEP, 2004",
      end: "JUN, 2009",
      skills: "Tourism, Travel Services Management, Marketing",
    },
  ]
};

const certification = {
  title: "Certification",
  items: [
    {
      platform: "Content Marketing Institute",
      link: "https://www.linkedin.com/learning/certificates/dd2e4956921f69e82c024361171b6a4364a3b12bf7a8d298f7f8b4d974c69785",
      direction: "Digital Marketing Professional Certificate",
      date: "MAR, 2025",
      skills: "Content Marketing, Digital Marketing, Marketing",
    },
    {
      platform: "HubSpot Academy",
      link: "https://app.hubspot.com/academy/achievements/41jh50tc/en/1/andrii-litkovskyi/hubspot-marketing-hub-software",
      direction: "HubSpot Marketing Hub Software",
      date: "MAR, 2025",
      skills: "HubSpot Marketing Hub Software, Marketing",
    },
    {
      platform: "LinkedIn",
      link: "https://verify.skilljar.com/c/ompyyiw62qyi",
      direction: "LinkedIn Certified Marketing Insider",
      date: "MAR, 2025",
      skills: "LinkedIn Certified Marketing Insider, Marketing",
    },
    {
      platform: "Google Digital Academy",
      link: "https://skillshop.credential.net/8f0ae8dd-61e4-436b-8def-22f710dc4802",
      direction: "Google Analytics Certification",
      date: "JAN, 2025",
      skills: "Google Analytics, Analytics, Marketing",
    },
    {
      platform: "telc",
      link: "https://results.telc.net/qr/4DfpYIMoQ3u1skjqxfDgxU3uv472s0sDmrqtjq5D10_SKNDXlANETac3r5mTpnxe",
      direction: "German B2 Certificate",
      date: "SEP, 2024",
      skills: "German B2, German, Language",
    },
    {
      platform: "EF SET",
      link: "https://cert.efset.org/227RcM",
      direction: "English C1 Certificate",
      date: "JUL, 2023",
      skills: "English C1, English, Language",
    },
  ]
};

export default function About() {
  return (
   <section className="section about" id="about">
   <div className="content">

     <div className="biography">
       <p>With 15 years of experience across brand and product design, at companies large and small, I’ve developed a skillset with breadth and depth. I’m currently working on design systems products at <a href="https://www.figma.com/" target="_blank">Figma</a>, was previously the Director of Design at <a href="https://www.cocoon.com/" target="_blank">Cocoon</a>, a Staff Product Designer at <a href="https://www.dropbox.com/" target="_blank">Dropbox</a>, a Product Designer at <a href="https://www.facebook.com/" target="_blank">Facebook</a>, the Head of Design at <a href="https://www.thread.com/" target="_blank">Thread</a>, a Design Lead at <a href="https://www.squarespace.com/" target="_blank">Squarespace</a>, a freelance designer and director commissioned by a variety of clients, and a close collaborator to many incredible people across multiple disciplines. I’m a classically trained designer, who holds a Bachelor of Science in Graphic Design. I live in Seattle with my wife and son, spending time outside as often&nbsp;as&nbsp;possible.</p>
     </div>

     <div className="certification">

      <h2>Certifications</h2>
      {certification.items.map((item, index) => {
        return (
          <p key={index}>
            <span className="title">{item.direction}<br /></span>
            <span className="description">{item.platform}<br /></span>
            <span className="description">{item.date}<br /></span>
            <span className="description">Skills: {item.skills}<br /></span>
            <span className="description">
              {item.link ? (
                <Link href={item.link} target="_blank">View Certificate</Link>
              ) : null}
            </span>
          </p>
          );
        })}
     </div>

     <div className="education">
       <h2>Education</h2>
       {education.items.map((item, index) => {
        return (
          <p key={index}>
            <span className="title">{item.degree}<br /></span>
            <span className="description">{item.institution}<br /></span>
            <span className="description">{item.location}<br /></span>
            <span className="description">{item.start} – {item.end}<br /></span>
            <span className="description">Skills: {item.skills}<br /></span>
          </p>
          );
        })}

     </div>

     <div className="colophon">
       <h2>Colophon</h2>
       <p>
         <span className="description">Design and code by <a href="index.html">Andrii Litkovskyi</a><br /></span>
         <span className="description">Typeset in <a href="https://displaay.net/typeface/roobert-collection/roobert/" target="_blank">Roobert Medium</a> by <a href="https://displaay.net/" target="_blank">Displaay Type Foundry</a><br /><br /></span>
         <span className="copyright">© <span className="year">{new Date().getFullYear()}</span></span>
       </p>
     </div>

   </div>
 </section>
  )
};