"use client";

const Contact = () => {
  return (
    <section className="section contact" id="contact">
      <div className="content">

        <div className="text">

          <div className="content">

            <div className="look">
              <div className="radius"></div>
              <div className="dot"></div>
            </div>

            <div className="status">
              <h3>Exploring new opportunities</h3>
            </div>

            <div className="interest">
              <h2>I am recently open to work.</h2>
            </div>

          </div>

          <div className="actions">
            <div className="item"><a href="mailto:alitkovsky@me.com?subject=Enquiry%20from%20website">alitkovsky@me.com</a></div>
            <div className="item"><a href="/" target="_blank">LinkedIn</a></div>
          </div>

        </div>

        <div className="image">
          <figure>
            <img src="assets/profile/andrii-litkovskyi-1600x1600.jpg" alt="Profile photo of Andrii Litkovskyi" />
            <div className="image-overlay-01"></div>
            <div className="image-overlay-02"></div>
          </figure>
        </div>

      </div>
    </section>
  )
};

export default Contact;