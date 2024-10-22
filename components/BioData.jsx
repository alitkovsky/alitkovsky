import React from 'react'

const BioData = () => {
  return (
    <section className="container mx-auto mt-6">
      <div className="flex flex-cols gap-8" data-aos="fade-up">
         <div className="col-lg-6 pb-5">
            <h2 className="display-4 txt-fx slide-up">Experiences</h2>
            <div className="data-info py-3" data-aos="fade-up" data-aos-delay="200">
            <span className="meta-date">2007 - 2012</span>
            <h3 className="info-title">Creative Agency Inc.: Design head</h3>
            <p>iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.</p>
            </div>
            <div className="data-info" data-aos="fade-up" data-aos-delay="300">
            <span className="meta-date">2013 - present</span>
            <h3 className="info-title">Studio Alpha.: Project Manager</h3>
            <p>iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.</p>
            </div>
         </div>
         <div className="col-lg-6 pb-5">
            <h2 className="display-4 txt-fx slide-up">Education</h2>
            <div className="data-info py-3" data-aos="fade-up">
            <span className="meta-date">1998 - 2004</span>
            <h3 className="info-title">Bachelors in Engineering in Information Technology</h3>
            <p>Harvard School of Science and management</p>
            </div>
            <div className="data-info" data-aos="fade-up" data-aos-delay="100">
            <span className="meta-date">2004 - 2006</span>
            <h3 className="info-title">Masters in Data Analysis</h3>
            <p>Harvard School of Science and management</p>
            </div>
         </div>
      </div>
      <div className="row d-flex flex-wrap" data-aos="fade-up">
         <div className="col-lg-6 pb-5">
            <h2 className="display-4 txt-fx slide-up">Interests</h2>
            <div className="data-info py-3" data-aos="fade-up">
            <span className="meta-date">2007 - 2012</span>
            <h3 className="info-title">Bachelors in Engineering in Information Technology</h3>
            <p>Harvard School of Science and management</p>
            </div>
            <div className="data-info" data-aos="fade-up" data-aos-delay="100">
            <span className="meta-date">2013 - present</span>
            <h3 className="info-title">Studio Alpha.: Project Manager</h3>
            <p>iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.</p>
            </div>
         </div>
         <div className="col-lg-6 pb-5">
            <h2 className="display-4 txt-fx slide-up">References</h2>
            <div className="data-info py-3" data-aos="fade-up" data-aos-delay="200">
            <span className="meta-date">1998 - 2004</span>
            <h3 className="info-title">Dr. Stephen H. King</h3>
            <p>iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.</p>
            </div>
            <div className="data-info" data-aos="fade-up" data-aos-delay="300">
            <span className="meta-date">2004 - 2006</span>
            <h3 className="info-title">Dr. David Howard</h3>
            <p>iacentem substantiales um se sed esse haec Possit facis qui a a a patriam.</p>
            </div>
         </div>
      </div>
    </section>
  )
}

export default BioData;