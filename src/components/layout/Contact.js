import React, { useState, useEffect } from "react";
import Header from "../include/Header";
import Footer from '../include/Footer';
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import Select from "../admin2/views/forms/select/Select";
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";

export default function Contact() {
    const [contactData, setContactData] = useState(null);

    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        contactNo: "",
        companyName: "",
        message: "",
    });

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const res = await api.get("/contact-data/get-contacts");
                if (res.data.success && res.data.contacts.length > 0) {
                    setContactData(res.data.contacts[0]);
                }
            } catch (error) {
                console.error("Error fetching contact data:", error);
            }
        };

        fetchContactData();
    }, []);
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCaptcha = (value) => {
        setCaptchaValue(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!captchaValue) {
            alert("Please verify that you are not a robot.");
            return;
        }
        console.log(formData);
        alert("Form submitted!");
        // Send form data to your backend here
    };
    return (
        <div>
            <Header />
            <main>
                {/* ---------- Banner Section ---------- */}
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={
                            contactData
                                ? `${API_PATH}/uploads/contact/${contactData.contact_banner}`
                                : "assets/images/contact-us-banner.png"
                        }
                        alt="Contact Banner"
                        className="img-fluid desktop-banner"
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2>Contact Us
                                <br></br>
                                <span> {contactData?.contact_sub_heading}</span>
                            </h2>
                            <ul className="path-women-empow">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li className="text-white">/</li>
                                <li>
                                    <a href="#">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ---------- Query Form Section ---------- */}
                <section className="powering-progress pt-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Query Form</h2>
                        </div>

                        <form className="contect-form" onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label my-2">Full Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control" placeholder="Enter your Full name" required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label my-2">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter your email" required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label my-2">Contact No</label>
                                    <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} className="form-control" placeholder="Enter contact number" />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label my-2">Type of Query</label>
                                    <select className="form-control">
                                        <option>Select</option>
                                        <option value="1">General </option>
                                        <option value="2">Business Related</option>
                                        <option value="3">Career Related</option>
                                        <option value="3">Investor Related</option>
                                        <option value="3">Others</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-8">
                                    <label className="form-label my-2">Remark / Message*</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" placeholder="Enter your message" rows="4" required >

                                    </textarea>
                                </div>
                                <div className="col-md-4 d-flex align-items-center my-2">
                                    <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={handleCaptcha} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center contact-btn pb-5 my-5">
                                <div className="btn-design contact-submit-btn mb-5"> <Link to="#" className="custom-btn"> Submit </Link> </div> </div> </form>
                    </div>
                </section>

                {/* ---------- Office Location Section ---------- */}
                <section className="powering-progres pb-5 pt-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Office Locations</h2>
                        </div>

                        <div className="row">
                            <div className="col-lg-4">
                                <h4>Headquarter</h4>
                                <p>{contactData?.office_main}</p>

                                <h4 className="mt-5">Other</h4>
                                <p>{contactData?.office_other}</p>
                            </div>

                            <div className="col-lg-8">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.920644588653!2d77.0848661!3d28.401636099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d230011ef457b%3A0x65d9e1e2dde48a18!2sDatta%20Power%20Infra%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1761893409193!5m2!1sen!2sin"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Datta Power Infra Pvt Ltd Location"
                                ></iframe>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
