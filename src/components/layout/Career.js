import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Header from "../include/Header";
import Footer from '../include/Footer';
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";

const parseJSON = (str) => {
    if (!str) return [];
    try {
        return JSON.parse(str);
    } catch (e) {
        console.error("Invalid JSON:", str);
        return [];
    }
};

const Careers = () => {
    const [bannerData, setBannerData] = useState({});
    const [whyJoin, setWhyJoin] = useState([]);
    const [keyHighlights, setKeyHighlights] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchCareersData = async () => {
            try {
                const res = await api.get(`/careers-data/get-admin-careers`);
                const data = res.data?.[0]; // first record

                if (data) {
                    setBannerData(data);
                    setWhyJoin(parseJSON(data.why_join));
                    setKeyHighlights(parseJSON(data.key_highlights));
                    setTestimonials(parseJSON(data.employee_testimonials));
                }
            } catch (error) {
                console.error("Error fetching Careers data:", error);
            }
        };

        fetchCareersData();
    }, []);

    return (
        <div>
            <Header />
            <main>
                {/* Banner Section */}
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={
                            bannerData?.banner_image
                                ? `${API_PATH}/uploads/careers/${bannerData.banner_image}`
                                : "assets/images/career-banner.png"
                        }
                        alt="Careers Banner"
                        className="img-fluid desktop-banner"
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2>Careers
                                <br></br>
                                <span> {bannerData?.banner_sub_heading || "Careers"}</span></h2>
                            <ul className="path-women-empow">
                                <li><a href="/">Home</a></li>
                                <li className="text-white">/</li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>

                        <div className="work-with-us-card p-4 text-center">
                            <div className="d-flex justify-content-center">
                                <h2 className="font-weight-bold">Work with Us</h2>
                            </div>
                            <div className="d-flex justify-content-center mt-1">
                                <div className="btn btn-design">
                                    <Link to="/press-release-details" className="custom-btn">
                                        View Latest Jobs
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Join Section */}
                <section className="our-business join-datta py-5 bg-white">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Why Join Datta Infra?</h2>
                        </div>

                        <div className="row" id="new-carousel" style={{ position: "relative" }}>
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>

                            <Swiper
                                className="news-swiper"
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={4}
                                navigation={{
                                    prevEl: ".swiper-button-prev",
                                    nextEl: ".swiper-button-next",
                                }}
                                loop={true}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 4 },
                                }}
                            >
                                {whyJoin.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="card-custom">
                                            {item.icon && (
                                                <img
                                                    src={`${API_PATH}/uploads/careers/${item.icon}`}
                                                    className="card-image custom-carerr-icon"
                                                    alt={item.heading}
                                                />
                                            )}
                                            <h3>{item.heading}</h3>
                                            <p>{item.text}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>

                {/* Key Highlights Section */}
                <section className="powering-progres key-highlights bg-white py-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Key Highlights</h2>
                        </div>
                        <div className="row text-center mt-4">
                            {keyHighlights.map((item, index) => (
                                <div
                                    key={index}
                                    className={`col-md-4 ${index !== keyHighlights.length - 1 ? "border-right" : ""}`}
                                >
                                    <h3 className="display-4">{item.number}</h3>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Employee Testimonial */}
                {testimonials.length > 0 && (
                    <section className="powering-progres key-highlights bg-white py-5">
                        <div className="container-fluid plr">
                            <div className="text-center mb-5">
                                <h2 className="section-title">Employee Testimonials</h2>
                            </div>

                            <div className="position-relative">
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-button-next"></div>

                                <Swiper
                                    modules={[Navigation, Autoplay]}
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    loop={true}
                                    navigation={{
                                        prevEl: ".swiper-button-prev",
                                        nextEl: ".swiper-button-next",
                                    }}
                                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                                    breakpoints={{
                                        0: { slidesPerView: 1 },
                                        768: { slidesPerView: 1 },
                                    }}
                                    className="employee-testimonial-swiper"
                                >
                                    {testimonials.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <div
                                                className="position-relative text-center"
                                                onClick={() => setShow(index)} // open modal for specific index
                                                style={{ cursor: "pointer" }}
                                            >
                                                <img
                                                    src={
                                                        item.thumbnail
                                                            ? `${API_PATH}/uploads/portfolio-images/${item.thumbnail}`
                                                            : "assets/images/test-1.png"
                                                    }
                                                    alt={`Testimonial ${index + 1}`}
                                                    className="img-fluid desktop-banner rounded w-75"
                                                />
                                                <p className="media-text position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
                                                    <img
                                                        src="assets/images/play-white-icon.png"
                                                        alt="play"
                                                        className="play-icon"
                                                    />
                                                </p>
                                                <h5 className="mt-3">{item.name}</h5>
                                                <p className="text-muted">{item.designation}</p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            {/* Modal for each testimonial */}
                            {typeof show === "number" && testimonials[show] && (
                                <Modal show={true} onHide={handleClose} size="lg" centered>
                                    <Modal.Body className="p-0 position-relative">
                                        <button
                                            type="button"
                                            className="btn-close position-absolute end-0 m-2"
                                            onClick={handleClose}
                                            aria-label="Close"
                                        ></button>
                                        <div className="ratio ratio-16x9">
                                            <iframe
                                                src={testimonials[show].video.replace("watch?v=", "embed/")}
                                                title={`Employee Testimonial ${show + 1}`}
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            )}
                        </div>
                    </section>
                )}


                {/* Apply Section */}
                <section className="ready">
                    <div className="container-fluid plr">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-center gap-3 align-items-center text-center">
                                    <h2>Be a part of Datta Infra</h2>
                                    <div className="btn-design-new">
                                        <a href="#" className="custom-btn">Apply Now</a>
                                        <svg viewBox="-19.04 0 75.804 75.804" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff">
                                            <g transform="translate(-831.568 -384.448)">
                                                <path
                                                    d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                                    fill="#ffffff"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Careers;
