"use client";

import useIntroSwitcher from "@/hooks/useIntroSwitcher";

export default function Intro() {
  useIntroSwitcher();

  return (
    <section className="section intro" id="intro">
      <div className="content">

        <div className="gradient-mask left"></div>
        <div className="gradient-mask right is--visible"></div>

        <div className="options">
          <div className="option anyone is--active">For anyone</div>
          <div className="option recruiters">Recruiters</div>
          <div className="option marketing-leads">Marketing Leads</div>
          <div className="option founders">Founders</div>
          <div className="option product-managers">Product Managers</div>
          <div className="option developers">Developers</div>
        </div>

        <div className="texts">
          <h1 className="text anyone is--visible">
            Hello! I’m a marketing strategist who crafts full-funnel campaigns that not only look good—but drive real growth.<br />
            I mix performance with personality to help brands scale smarter.
          </h1>

          <h1 className="text recruiters">
            I bring 7+ years of experience across paid media, SEO, CRO, and analytics. Proven track record in both B2B and B2C, with 70%+ YoY booking growth in my latest role.<br />
            I’m not just a channel expert—I connect dots between creative, data, and business strategy.
          </h1>

          <h1 className="text marketing-leads">
            From zero to revenue—I'm your go-to for structuring strategy, scaling performance, and aligning campaigns with business goals. Expect numbers.<br />
            I thrive in iterative teams and love diving into dashboards, testing hypotheses, and building growth loops.
          </h1>

          <h1 className="text founders">
            Need traction? I help early-stage teams find clarity, build marketing engines, and scale sustainably—no fluff, just frameworks that work.<br />
            Think of me as a fractional growth partner with sleeves already rolled up.
          </h1>

          <h1 className="text product-managers">
            I bring cross-functional energy to any product table. Clear on GTM, strong on insights, fluent in the metrics that matter.<br />
            I’ve built launch plans, campaign roadmaps, and feedback loops that bridge teams—not just silos.
          </h1>

          <h1 className="text developers">
            I don’t touch code (anymore), but I’ll happily debug a GTM container, optimize site speed, or coordinate a clean SEO rollout with you.<br />
            I get how marketing and tech intersect—and speak enough “dev” to stay out of your way (and sometimes help).
          </h1>
        </div>

      </div>
    </section>
  );
};