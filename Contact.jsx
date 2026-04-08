import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import qs from "qs";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Contactservice = () => {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    option: "",
    message: "",
  });

  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const siteKey = process.env.GATSBY_RECAPTCHA_SITE_KEY;
  // console.log("captcha:", process.env.GATSBY_RECAPTCHA_SITE_KEY);

  const captchaRef = useRef(null);

  const services = useMemo(
    () => [
      { value: "", label: "How can we help you?" },
      { value: "Web Design and Development", label: "Web Design and Development" },
      { value: "Mobile App Development", label: "Mobile App Development" },
      { value: "Ecommerce development", label: "Ecommerce" },
      { value: "Digital Marketing", label: "Digital Marketing" },
      { value: "Other", label: "Other" },
    ],
    []
  );

  const handleFormChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Helpers
  const isValidEmail = (email) => {
    // simple & reliable
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  };

  const normalisePhone = (phone) => String(phone || "").replace(/[^\d+]/g, "").trim();

  // Main validation (returns array of errors)
  const validateForm = () => {
    const errors = [];

    const name = String(formData.name || "").trim();
    const email = String(formData.email || "").trim();
    const phone = normalisePhone(formData.phone);
    const option = String(formData.option || "").trim();
    const message = String(formData.message || "").trim();

    // Name
    if (!name) errors.push("Please enter your full name.");
    else if (name.length < 2) errors.push("Full name must be at least 2 characters.");

    // Phone (UK/International friendly)
    if (!phone) errors.push("Please enter your phone number.");
    else if (phone.length < 8) errors.push("Please enter a valid phone number.");

    // Email
    if (!email) errors.push("Please enter your email address.");
    else if (!isValidEmail(email)) errors.push("Please enter a valid email address.");

    // Service
    if (!option) errors.push("Please select a service.");

    // Message
    if (!message) errors.push("Please enter your message.");
    else if (message.length < 10) errors.push("Message must be at least 10 characters.");
    else if (message.length > 1000) errors.push("Message cannot exceed 1000 characters.");

    // Captcha
    if (!captchaToken) errors.push("Please complete the captcha before submitting.");

    return errors;
  };

  //  Show toast errors (choose first or all)
  const showValidationErrors = (errors) => {
    // Option A: show only first error (clean UX)
    toast.error(errors[0]);

    // Option B: show all errors (uncomment if you want)
    // errors.forEach((msg) => toast.error(msg));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errors = validateForm();
    if (errors.length) {
      showValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        phone: normalisePhone(formData.phone), // send clean phone
        captchaToken,
      };

      const response = await axios.post(
        "https://www.fleekvertex.co.uk/contact.php",
        qs.stringify(payload),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      if (response.data.type === "success") {
        toast.success(response.data.message || "Thanks! We’ll get back to you shortly.");

        setFormdata({ name: "", email: "", phone: "", option: "", message: "" });
        setCaptchaToken("");

        //  reset captcha widget UI
        if (captchaRef.current) captchaRef.current.reset();
      } else {
        toast.error(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>


      <section
        className="fv-contact-hero position-relative d-flex align-items-center"
        style={{ backgroundImage: "url('/assets/img/Contact-us-banner.jpg')" }}

      >

        <div className="fv-contact-overlay" />
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="fv-heroH1Glass text-center mb-4">
            <h1 className="fv-heroH1Glass__h1">Join us in creating something great</h1>
          </div>

          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="text-white pe-lg-4">
                <h3 className="color-main text-uppercase fs-6">Contact Us</h3>
                <h2 className="display-6 fw-bold mb-3">
                  Let’s build something that looks premium and converts.
                </h2>
                <p className="lead mb-3" style={{ opacity: 0.95 }}>
                  Tell us what you need and we’ll come back with the next best step.
                  No pressure, just helpful guidance.
                </p>

                <div className="d-flex flex-wrap color-main mb-3">
                  <i className="bi bi-house me-1"></i>
                  <p >Stevenage, Hertfordshire,SG2 0QG</p>

                  <span className="mx-1 ">|</span>
                  <i className="bi bi-envelope me-1"></i>
                  <p className="fv-info-label">support@fleekvertex.co.uk</p>
                </div>

                <div className="d-flex flex-wrap gap-3">
                  <div className="fv-pill">
                    <i className="bi bi-clock-history me-2" />
                    Reply within 24 hours
                  </div>
                  <div className="fv-pill">
                    <i className="bi bi-geo-alt me-2" />
                    UK-focused delivery
                  </div>

                  <div className="fv-pill">
                    <i className="bi bi-geo-alt me-2" />
                    Serving Clients worldwide
                  </div>
                  <div className="fv-pill">
                    <i className="bi bi-shield-check me-2" />
                    Privacy assured
                  </div>

                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="fv-card p-3 p-md-3">
                <div className="mb-4 text-center">
                  <h2 className="fw-bold mb-1">Get in touch</h2>
                  <p className="text-muted mb-0">
                    Share a few details and we’ll reply with a clear plan.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small mb-1">Full name</label>
                      <div className="input-group fv-input">
                        <span className="input-group-text">
                          <i className="bi bi-person" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="e.g. John Smith"
                          onChange={handleFormChange}
                          value={formData.name}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small mb-1">Phone number</label>
                      <div className="input-group fv-input">
                        <span className="input-group-text">
                          <i className="bi bi-telephone" />
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          placeholder="e.g. +44 7xxx xxx xxx"
                          onChange={handleFormChange}
                          value={formData.phone}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label small mb-1">Email address</label>
                      <div className="input-group fv-input">
                        <span className="input-group-text">
                          <i className="bi bi-envelope" />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="you@company.co.uk"
                          onChange={handleFormChange}
                          value={formData.email}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label small mb-1">Service</label>
                      <select
                        className="form-select fv-select"
                        name="option"
                        onChange={handleFormChange}
                        value={formData.option}
                      >
                        {services.map((s) => (
                          <option key={s.value || "placeholder"} value={s.value} disabled={s.value === ""}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label small mb-1">Message</label>
                      <textarea
                        rows="4"
                        className="form-control fv-textarea"
                        name="message"
                        placeholder="Tell us about your project, timeline, and what ‘success’ looks like."
                        onChange={handleFormChange}
                        value={formData.message}
                      />
                      <div className="d-flex justify-content-between mt-2 small text-muted">
                        <span>By submitting, you agree to be contacted about your enquiry.</span>
                        <span>{formData.message.length}/1000</span>
                      </div>
                    </div>

                    {/* Captcha */}
                    <div className="col-12">
                      {siteKey ? (
                        <ReCAPTCHA
                          ref={captchaRef}
                          sitekey={siteKey}
                          onChange={(token) => setCaptchaToken(token || "")}
                          onExpired={() => setCaptchaToken("")}
                        />
                      ) : (
                        <div className="alert alert-warning mb-0">
                          Missing reCAPTCHA site key. Add <b>REACT_APP_RECAPTCHA_SITE_KEY</b> in .env
                        </div>
                      )}
                    </div>

                    <div className="col-12 mt-2">
                      <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="d-inline-flex align-items-center gap-2">
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                            Sending…
                          </span>
                        ) : (
                          "Send enquiry"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>

        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      </section>
    </>
  );
};

export default Contactservice;
