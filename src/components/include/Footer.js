import React from 'react'
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <div>
            <footer className="footer pt-5">
                <div className="container-fluid plr">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="logo-footer mb-5">
                                <img src="assets/images/footer-logo.png" alt="" srcSet="" />
                            </div>
                            <div className="footer-menu d-flex">
                                <div>
                                    <h5>About Us</h5>
                                    <ul className="footer-links">
                                        <li>
                                            <a href="#">Who We Are</a>
                                        </li>
                                        <li>
                                            <a href="#">Leadership</a>
                                        </li>
                                        <li>
                                            <a href="#">Project Portfolio</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5>Business</h5>
                                    <ul className="footer-links">
                                        <li>
                                            <a href="#">Pre-Development EPC</a>
                                        </li>
                                        <li>
                                            <a href="#">Turnkey EPC Projects</a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Grid Infrastructure
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Independent Power
                                                <br /> Producer
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                                <div>
                                    <h5>Resources</h5>
                                    <ul className="footer-links">
                                        <li>
                                            <a href="#">Blogs</a>
                                        </li>
                                        <li>
                                            <a href="#">Case Studies</a>
                                        </li>
                                        <li>
                                            <a href="#">FAQs</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5>News Room</h5>
                                    <ul className="footer-links">
                                        <li>
                                            <a href="#">Press Release</a>
                                        </li>
                                        <li>
                                            <a href="#">Media Coverage</a>
                                        </li>
                                        <li>
                                            <a href="#">Media Resources</a>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h5>
                                        <Link to="/" className="text-decoration-none text-white">Culture</Link>
                                    </h5>
                                    <h5>
                                        <Link to="/" className="text-decoration-none text-white">Investor</Link>
                                    </h5>
                                    <h5>
                                        <Link to="/" className="text-decoration-none text-white">Awards</Link>
                                    </h5>
                                    <h5>
                                        <Link to="/" className="text-decoration-none text-white">Careers</Link>
                                    </h5>
                                    <h5>
                                        <Link to="/" className="text-decoration-none text-white">Contact</Link>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-10">
                            <div className="footer-menu contact">
                                <h5>Headquarter</h5>
                                <ul className="">
                                    <li>
                                        AIPL Business Club, Tower-3, 12th Floor, Sector - 62, Gurugram -
                                        122002, Haryana
                                    </li>
                                    <li>
                                        <img src="assets/images/phone-icon.png" alt="" srcSet="" />
                                        <a href="tel:+">+91-124-448-8852</a>
                                    </li>
                                    <li>
                                        <img src="assets/images/mail-icon.png" alt="" srcSet="" />
                                        <a href="mailto:info@dattainfra.com">info@dattainfra.com</a>
                                    </li>
                                </ul>
                                <ul className="social-icons d-flex align-items-center justify-content-center gap-1 mt-4">
                                    <li>
                                        <i className="fa fa-facebook-f custom-fa" />
                                    </li>
                                    <li>
                                        <i className="bi bi-twitter-x custom-fa" />
                                    </li>
                                    <li>
                                        <i className="fa fa-linkedin custom-fa" />
                                    </li>
                                    <li>
                                        <i className="fa fa-instagram custom-fa" />
                                    </li>
                                    <li>
                                        <i className="fa fa-youtube-play custom-fa" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row border-top copy-section">
                            <div className="col-lg-7">
                                <p className='text-white'> Copyright © 2025 DIPL. All rights reserved.</p>
                            </div>
                            <div className="col-lg-5 copy-list">
                                <Link className="text-decoration-none text-white">
                                    PRIVACY POLICY
                                </Link>
                                <Link className="text-decoration-none text-white">
                                    TERMS OF USE & DISCLAIMER
                                </Link>
                                <Link className="text-decoration-none text-white">
                                    FRAUD ALERT
                                </Link>
                                <Link className="text-decoration-none text-white">
                                    CSR POLICY
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="copyright" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
