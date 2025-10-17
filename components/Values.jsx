"use client";

import TextEffect from "@/components/TextEffect";

export default function Values() {
  return (
    <section className="section values" id="values">
      <div className="content">
        <div className="title">
          <h1>strategic</h1>
          <h1>performance</h1>
          <TextEffect
            as="h1"
            variant="ellipseBold"
            trigger="visible"
            visibilityRootMargin="0px 0px -33%"
            className="inline-block"
          >
            humanity
          </TextEffect>
          <h1>curious</h1>
        </div>
        <div className="main">
          <p className="description">
            I started my marketing journey in the hospitality industry — first creating campaigns for hotels, then evolving into a digital strategist for full-funnel performance. That hands-on foundation taught me to blend brand, business, and behavior into growth engines.<br />I've always been making things and inventing ways to improve my surroundings. Solving a tangible need with a beautiful solution is a practice I love and resides in my core. Collaborating with a team to create a far better outcome than otherwise possible alone gives me energy.
          </p>
        </div>
        <div className="tools">
          <h3 className="title">
            core tools
          </h3>
          <div className="content">
            <div>
              <h3>google ads & analytics</h3>
              <p>Google Ads, GA4, GTM, Keyword Planner are strong with performance-max and conversion tracking, enabling hyper-targeted campaigns and advanced performance tracking, optimizing budgets and scaling conversions at every funnel stage.</p>
              <div className="metrics">+20% Conversion Rate • +40% Revenue</div>
            </div>
            <div>
              <h3>seo & semrush</h3>
              <p>On-page, tech, and content SEO using tools like Screaming Frog, Ahrefs, and SEMrush are strong with content briefs, clusters, and SERP intent drives long-term organic visibility through keyword strategy, SERP intent mapping, and technical audits.</p>
              <div className="metrics">+35% Organic Traffic • +25% Lead Volume</div>
            </div>
            <div>
              <h3>meta & linkedIn ads</h3>
              <p>Meta Ads Manager, Instagram, LinkedIn Campaign Manager are strong with aligning paid social strategy with funnel stage and creative testing builds awareness and drives leads via paid social campaigns tailored by audience behavior and intent.</p>
              <div className="metrics">+20% Paid Revenue • Lower CPA</div>
            </div>
            <div>
              <h3>crm & automation</h3>
              <p>HubSpot, Mailchimp, Klaviyo are strong with built nurture flows, onboarding journeys, and integrated lead scoring into paid media workflows, streamlines lifecycle marketing and automates retention flows across email, web, and ads.</p>
              <div className="metrics">+30 % Engagement • Improved Retention</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};