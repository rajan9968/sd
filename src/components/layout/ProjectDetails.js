import React, { useState } from "react";
import Header from "../include/Header";
import Footer from '../include/Footer';

export default function ProjectDetails() {
    return (
        <div>
            <Header />
            <main>
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src="assets/images/project-profolio-banner.png"
                        alt="awards"
                        className="img-fluid desktop-banner"
                        srcSet=""
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2>Project Portfolio</h2>
                            <ul className="path-women-empow">
                                <li>
                                    <a href="index.php">Home</a>

                                </li>
                                <li className="text-white">/</li>
                                <li>
                                    <a href="#">Project Portfolio</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </section>
                <section className='project-section py-5'>
                    <div className="container-fluid plr">
                        {/* Top Image Section */}
                        <div className="position-relative mb-5">
                            <img
                                src="assets/images/project-details.png"
                                alt="Project Banner"
                                className="img-fluid w-100 rounded-4 shadow-sm"
                            />

                            {/* Floating Project Info Card */}
                            <div className="project-info-card bg-white shadow p-4">
                                <h5 className="project-info mb-3 pt-4 pb-4">Project Info:</h5>
                                <div className="project-point mb-2 d-flex justify-content-between">
                                    <span className="text-muted">Client:</span>
                                    <span className="fw-semibold">Datta Infra</span>
                                </div>
                                <div className="project-point mb-2 d-flex justify-content-between">
                                    <span className="text-muted">Category:</span>
                                    <span className="fw-semibold">Grid Infrastructure</span>
                                </div>
                                <div className="project-point d-flex justify-content-between">
                                    <span className="text-muted">Location:</span>
                                    <span className="fw-semibold">India</span>
                                </div>

                                <div className="project-point d-flex align-items-center justify-content-between">
                                    <span className="me-2 text-muted">Share:</span>
                                    <div className="social-icons">
                                        <a href="#" className="btn btn-outline-secondary btn-sm rounded-circle me-2">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                        <a href="#" className="btn btn-outline-secondary btn-sm rounded-circle me-2">
                                            <i className="bi bi-instagram"></i>
                                        </a>
                                        <a href="#" className="btn btn-outline-secondary btn-sm rounded-circle">
                                            <i className="bi bi-facebook"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Overview Section */}
                        <div className="project-first-details mb-5">
                            <h5 className="fw-bold mb-3">Overview</h5>
                            <p className="text-muted">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel justo
                                at lorem consequat congue. Integer porttitor, erat nec interdum
                                tincidunt, neque nisl faucibus arcu, sit amet mattis felis lacus id
                                magna. Pellentesque habitant morbi tristique senectus et netus.
                            </p>
                        </div>

                        {/* Scope Section */}
                        <div className="mb-5">
                            <h5 className="fw-bold mb-3">Scope</h5>
                            <p className="text-muted">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                efficitur, nisl non convallis sagittis, tortor arcu convallis augue,
                                nec tincidunt enim enim vel nisi. Suspendisse faucibus lorem vel
                                libero ultricies, et bibendum arcu tristique.
                            </p>
                        </div>

                        {/* Result Section */}
                        <div className="mb-5">
                            <h5 className="fw-bold mb-3">Result</h5>
                            <p className="text-muted">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                                placerat justo nec ante pharetra, non volutpat ex faucibus. Aliquam
                                erat volutpat. Curabitur imperdiet varius felis vel commodo.
                            </p>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    )
}
