import React, { useState, useEffect } from "react";
import Header from "../include/Header";
import Footer from '../include/Footer';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import Form from 'react-bootstrap/Form';
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";


export default function Awards() {
    const [awardsData, setAwardsData] = useState([]);
    const [spotlight, setSpotlight] = useState([]);
    const [allAwards, setAllAwards] = useState([]);
    useEffect(() => {
        const fetchAwardsData = async () => {
            try {
                const res = await api.get("/awards-data/get-awards");
                const data = res.data;

                if (data.success && data.awards.length > 0) {
                    const activeAward = data.awards[0];

                    // Parse JSON fields safely
                    const spotlightData = JSON.parse(activeAward.spotlight || "[]");
                    const allAwardsData = JSON.parse(activeAward.all_awards || "[]");

                    setAwardsData(data.awards);
                    setSpotlight(spotlightData);
                    setAllAwards(allAwardsData);
                }
            } catch (error) {
                console.error("Error fetching awards:", error);
            }
        };

        fetchAwardsData();
    }, []);
    return (
        <div>
            <Header />
            <main>
                {/* --- Banner --- */}
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={`${API_PATH}/uploads/awards/${awardsData[0]?.banner_image || "awards-banner.png"}`}
                        alt="awards"
                        className="img-fluid desktop-banner"
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2 className="mb-0">Our Awards</h2>
                            <p className="text-white mb-5">{awardsData[0]?.sub_heading}</p>
                            <ul className="path-women-empow">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li className="text-white">/</li>
                                <li>
                                    <a href="#">Awards</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- Spotlight Section --- */}
                <section className="what-new py-5 bg-white">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Spotlight</h2>
                        </div>

                        <div id="new-carousel" style={{ position: "relative" }}>
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>

                            <Swiper
                                className="news-swiper"
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={3}
                                navigation={{
                                    prevEl: ".swiper-button-prev",
                                    nextEl: ".swiper-button-next",
                                }}
                                loop={true}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 3 },
                                }}
                            >
                                {spotlight.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="news-box rounded">
                                            <div className="new-image">
                                                <img
                                                    src={`${API_PATH}/uploads/awards/${item.carousel_image}`}
                                                    className="img-fluid rounded"
                                                    alt={item.award_name}
                                                />
                                            </div>
                                            <div className="news-content rounded-bottom">
                                                <p className="award-title">
                                                    <strong>Award:</strong> {item.award_name}
                                                </p>
                                                <p className="award-title">
                                                    <strong>Category:</strong> {item.category}
                                                </p>
                                                <p className="award-title">
                                                    <strong>Date:</strong>{" "}
                                                    {new Date(item.date).toLocaleDateString("en-GB")}
                                                </p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>

                {/* --- All Awards Section --- */}
                <section className="project-section py-5">
                    <div className="container-fluid plr">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className="text-center mb-5">
                                    <h2 className="section-title">All Awards</h2>
                                </div>
                            </div>

                            <div className="col-lg-3 d-flex gap-1">
                                <div className="search-bar">
                                    <i className="fa fa-search"></i>
                                    <input type="text" placeholder="Search..." />
                                </div>
                                <Form.Select style={{ width: "40%" }}>
                                    <option>Year</option>
                                    <option>2025</option>
                                    <option>2024</option>
                                    <option>2023</option>
                                </Form.Select>
                            </div>
                        </div>

                        <div className="row">
                            {allAwards.map((item, index) => (
                                <div className="col-lg-4 mb-4" key={index}>
                                    <Link to="#" className="text-black text-decoration-none">
                                        <div className="team-car shadow rounded bg-light h-100 cursor-pointer bg-color">
                                            <img
                                                src={`${API_PATH}/uploads/awards/${item.image}`}
                                                alt={item.award_name}
                                                className="img-fluid rounded-top mb-2"
                                            />
                                            <div className="team-name">
                                                <h5 className="mb-2 blog-date text-white">
                                                    Award: {item.award_name}
                                                </h5>
                                                <p className="award-title text-white">
                                                    Category: {item.category}
                                                </p>
                                                <p className="award-title text-white">
                                                    Date: {new Date(item.date).toLocaleDateString("en-GB")}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                            <div className="col-lg-12 my-5 text-center d-flex justify-content-center">
                                <div className="btn-design">
                                    <a href="#" className="custom-btn">
                                        Load More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
