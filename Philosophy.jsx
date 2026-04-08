import React from "react";

const Philosophy = ({ rtl }) => {
  return (
    <section className="fv-values section-padding bg-gray">
      <div className="container">
        {/* Head */}
        <div className="fv-values__head">
          <h2 className="color-main text-uppercase fs-6">Fleek Core Values</h2>

          {/* ✅ Added H2 below the eyebrow */}
          <h2 className="fv-values__title">
            The principles that guide how we build, collaborate, and deliver
          </h2>
        </div>

        {/* Grid */}
        <div className="row g-4 mt-1">
          <div className="col-lg-4 col-md-6">
            <div className="fv-values__card">
              <div className="fv-values__icon">
                <i className="bi bi-lightning-charge-fill" />
              </div>
              <h4 className="fv-values__cardTitle">Innovation</h4>
              <p className="fv-values__text">
                We embrace the latest in AI, blockchain, and cloud-native technologies to build
                future-proof solutions.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="fv-values__card">
              <div className="fv-values__icon">
                <i className="bi bi-shield-check" />
              </div>
              <h4 className="fv-values__cardTitle">Integrity</h4>
              <p className="fv-values__text">
                Upholding high standards in data privacy, security compliance (GDPR, ISO 27001), and
                ethical business practices.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="fv-values__card">
              <div className="fv-values__icon">
                <i className="bi bi-people-fill" />
              </div>
              <h4 className="fv-values__cardTitle">Collaboration</h4>
              <p className="fv-values__text">
                Partnering closely with stakeholders using Agile and Scrum for transparent communication
                and rapid iteration.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="fv-values__card">
              <div className="fv-values__icon">
                <i className="bi bi-heart-fill" />
              </div>
              <h4 className="fv-values__cardTitle">Customer Centricity</h4>
              <p className="fv-values__text">
                Putting user experience first through research, accessibility standards, and continuous
                usability testing.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="fv-values__card">
              <div className="fv-values__icon">
                <i className="bi bi-award-fill" />
              </div>
              <h4 className="fv-values__cardTitle">Excellence</h4>
              <p className="fv-values__text">
                Committing to rigorous QA, automated CI/CD pipelines, and performance tuning to deliver
                reliable, scalable systems.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="fv-values__card">
              <div className="fv-values__icon">
                <i className="bi bi-arrow-repeat" />
              </div>
              <h4 className="fv-values__cardTitle">Agility</h4>
              <p className="fv-values__text">
                Adapting quickly with incremental releases, feature flags, and data-driven decisions to
                meet changing needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional background bubbles (kept from your design) */}
      <img
        src="/assets/img/about/about_s6_bubbles.png"
        alt="Background Bubbles"
        className="fv-values__bubbles rotate-center"
      />
    </section>
  );
};

export default Philosophy;
