"use client";

import CountUp from "@/components/CountUp";

export default function CaseStudy() {
  return (
    <section className="section cases">
      <div className="content">
        <div className="title">
          <h1>
            i can help you
          </h1>
          <h1>
            boost efficiency
          </h1>
        </div>
        <div className="main">
          <h3>case study</h3>
          <h3 className="description">Virtu Legal entered into an agreement with MediGen Pharma in June 2023 to provide legal services, including the drafting of an exclusive distribution agreement for the new pain reliever.</h3>
        </div>
        <div className="bio">
          <div className="title">
            <div><p>industry</p><h3>hotel</h3></div>
            <div><p>client</p><h3>sport resort</h3></div>
            <div><p>location</p><h3>ukraine</h3></div>
          </div>
          <div className="text">
            <div>
              <p>Through extensive consultation and research, Virtu Legal's legal team tailored the agreement to the chent's specific product and industry needs, providing maximum legal protection against counterfeiters and unauthonzed distributors. The agreement resulted in a seamiess distribution process, ensuring the client's product was distributed ethically and only through legitmate channels.
              </p>
            </div>
            <div>
              <p>The deal also included a three-year warranty, which gave the client legal recourse in case of contract Violations. Virtu Legal's expertise in IP law provided the medical cient with the legal protection needed to safeguard their product, resulting In a successful partnership that demonstrates Virtu Legal's commitment to providing talor-made legal solutions for each cient's unique needs.</p>
            </div>
            <div>
              <p>The performance of the exclusive distribution agreement was reflected in the client's sales figures. In the first three quarters after the agreement's launch, sales of the medical product had increased by 30%, resulting in a revenue increase of S1.5 million. Moreover, the legal agreement prevented unauthorized distributors from diluting the medical product's reputation through sub-standard delivery or low-price sale tactics. This secured the client's market position and strengthened their brand.</p>
            </div>
            <div>
              <p>Additionally, Virtu Legal's collaborative approach ensured seamless integration of the warranty terms, fostering a robust legal framework for the MediGen Pharma With a keen focus on intellectual property law, our team fortified the clent's product, ensuring a secure foundation for the partnership. This exemplifies Virtu Legal's dedication to delivering customized legal solutions that align with the distinctive requrements of every cient</p>
            </div>
          </div>
        </div>
        <div className="metrics">
          <div className="item">
            <div>
              <h2>
                <CountUp
                  from={0}
                  to={48}
                  separator=","
                  direction="up"
                  duration={2}
                  className="px-1"
                />
                <span>%</span>
              </h2>
              <p>more visibility</p>
            </div>
          </div>
          <div className="item col-start-5">
            <div>
              <h2>
                <CountUp
                  from={0}
                  to={35}
                  separator=","
                  direction="up"
                  duration={2}
                  className="px-1"
                />
                <span>%</span>
              </h2>
              <p>more conversions</p>
            </div>
          </div>
          <div className="item col-start-8">
            <div>
            <h2>
                <CountUp
                  from={0}
                  to={70}
                  separator=","
                  direction="up"
                  duration={1}
                  className="px-1"
                />
                <span>%</span>
              </h2>
              <p>more bookings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};