import React, { useEffect, useState } from "react";
import Header from "../include/Header";
import Footer from '../include/Footer';
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import API_PATH from "../../api/apiPath";
import api from "../../api/axiosInstance";
export default function Culture() {
    const [slides, setSlides] = useState([]);
    const [initiatives, setInitiatives] = useState([]);
    const [portfolioHeading, setPortfolioHeading] = useState("");

    useEffect(() => {
        const fetchPortfolioHeading = async () => {
            try {
                const res = await api.get("/portfolio-heading/get-portfolio-heading");
                const data = res.data;

                if (data.banners && data.banners.length > 0) {
                    setPortfolioHeading(data.banners[0].sub_heading);
                }
            } catch (error) {
                console.error("Error fetching portfolio heading:", error);
            }
        };

        fetchPortfolioHeading();
    }, []);

    useEffect(() => {
        const lightbox = GLightbox({
            selector: ".glightbox",
            touchNavigation: true,
            loop: true,
        });
        return () => {
            lightbox.destroy();
        };
    }, []);

    useEffect(() => {
        const fetchInitiatives = async () => {
            try {
                const res = await api.get("/culture-portfolio/get-all-portfolios");
                const data = res.data;

                if (data.portfolios) {
                    const formatted = data.portfolios.map((item) => ({
                        bgImage: `${API_PATH}/uploads/portfolio-images/${item.image}`,
                        title: item.sub_heading,
                        location: item.sub_heading.split("|")[0]?.trim() || "",
                        description: item.text_on_image,
                        icon: `${API_PATH}/uploads/portfolio-images/${item.image}`,
                        number: item.id,
                    }));
                    setInitiatives(formatted);
                }
            } catch (error) {
                console.error("Error fetching initiatives:", error);
            }
        };

        fetchInitiatives();
    }, []);


    const [data, setData] = useState(null);
    // const [slides, setSlides] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const BASE_URL = `${API_PATH}/uploads/about-banners/`;

    useEffect(() => {
        const fetchCulture = async () => {
            try {
                const res = await api.get("/culture/get-culture");

                if (res.data.success && res.data.cultures.length > 0) {
                    const c = res.data.cultures[0];

                    setData({
                        bannerImage: BASE_URL + c.banner_image,
                        bannerHeading: c.banner_sub_heading,
                        cultureSubHeading: c.culture_sub_heading,
                        communitySubHeading: c.community_sub_heading,
                        employeeSubHeading: c.employee_sub_heading,
                        keyImage: c.key_image ? BASE_URL + c.key_image : null,
                        keyText: c.key_text_on_image,
                    });

                    setSlides(
                        JSON.parse(c.our_culture || "[]").map((item) => ({
                            img: BASE_URL + item.image,
                        }))
                    );

                    setCommunity(JSON.parse(c.community_initiatives || "[]"));
                    setEmployees(JSON.parse(c.employee_initiatives || "[]"));
                }
            } catch (err) {
                console.error("Culture API error:", err);
            }

        };

        fetchCulture();
    }, []);

    const [community, setCommunity] = useState([]);
    const [employees, setEmployees] = useState([]);

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <Header />
            <main>
                {/* ---------- Banner ---------- */}
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={data.bannerImage}
                        alt="culture-banner"
                        className="img-fluid desktop-banner"
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2>
                                Culture
                                <br></br>
                                <span>{data.bannerHeading}</span>
                            </h2>
                            <ul className="path-women-empow">
                                <li><a href="/">Home</a></li>
                                <li className="text-white">/</li>
                                <li><a href="#">Culture</a></li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ---------- Our Culture ---------- */}
                <section className="what-new py-5 bg-white">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Our Culture</h2>
                            <p>{data.cultureSubHeading}</p>
                        </div>
                        <div id="new-carousel" style={{ position: 'relative' }}> {/* Custom Navigation Buttons */} <div className="swiper-button-prev"></div> <div className="swiper-button-next"></div>
                            <Swiper
                                className="news-swiper"
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={3}
                                navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next', }}
                                loop
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 3 },
                                }}
                            >
                                {slides.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="news-box rounded">
                                            <div className="new-image">
                                                <a href={item.img} className="glightbox" data-gallery="news-gallery">
                                                    <img src={item.img} className="img-fluid rounded" alt="Culture" />
                                                </a>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>

                {/* ---------- Community Initiatives ---------- */}
                <section className="project-section bg-white py-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Community Initiatives</h2>
                            <p>{data.communitySubHeading}</p>
                        </div>
                        <div id="new-carousel" style={{ position: 'relative' }}> {/* Custom Navigation Buttons */} <div className="swiper-button-prev"></div> <div className="swiper-button-next"></div>
                            <Swiper
                                className="news-swiper"
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={3}
                                navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next', }}
                                loop
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 3 },
                                }}
                            >
                                {community.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="news-box rounded">
                                            <div className="new-image">
                                                <img src={BASE_URL + item.image} className="img-fluid rounded" alt="Community" />
                                            </div>
                                            <div className="news-content rounded-bottom costom-community">
                                                <p className="award-title">{item.heading}</p>
                                                <p className="content-news-para">{item.description}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>

                <section className="our-portfolio-datta pt-5 pb-4 bg-white">
                    <div className="container-fluid plr">
                        <div className="text-center">
                            <h2 className="section-title">Key Initiatives</h2>
                            <p className="section-text m-0 pb-2">
                                {portfolioHeading}
                            </p>

                        </div>
                    </div>
                </section>
                <section
                    className="our-portfolio cul-pot bg-white"
                    style={{
                        background: initiatives.length
                            ? `url(${initiatives[activeIndex].bgImage}) no-repeat center center/cover`
                            : "#000",
                        minHeight: "80vh",
                        display: "flex",
                        alignItems: "center",
                        color: "#fff",
                        padding: "0 2rem",
                    }}
                >
                    <div className="container-fluid">
                        {/* Dynamic content-text */}
                        <div className="content-text cul-sec">
                            <h3 className="pp-title-h">
                                {initiatives[activeIndex]?.title} <br />
                            </h3>
                            <p>{initiatives[activeIndex]?.description}</p>
                        </div>

                        {/* Swiper Carousel */}
                        <div id="history-carousel">
                            <Swiper
                                className="history-swiper"
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={3}
                                navigation={{
                                    prevEl: "#history-carousel .swiper-button-prev",
                                    nextEl: "#history-carousel .swiper-button-next",
                                }}
                                loop
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 3 },
                                }}
                            >
                                {initiatives.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="history-box d-flex">
                                            <div className="history-image" style={{ maxWidth: "54%" }}>
                                                <img
                                                    src={item.icon}
                                                    alt={item.location}
                                                    className="custom-size-image"
                                                    style={{ maxWidth: "100%",objectFit:"cover" }}
                                                />
                                            </div>
                                            <div>
                                                <div className="history-content">
                                                     <p>
                                                        {item.title}
                                                    </p>
                                                </div>

                                                <div className="number-part">
                                                    <div className="outline-text">&nbsp;</div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Navigation Buttons */}
                            <div className="custom-ali">
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-button-next"></div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* ---------- Employee Initiatives ---------- */}
                <section className="project-section bg-white py-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Employee Initiatives</h2>
                            <p>{data.employeeSubHeading}</p>
                        </div>
                        <div id="new-carousel" style={{ position: 'relative' }}>
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>

                            <Swiper
                                className="news-swiper"
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={3}
                                navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next', }}
                                loop
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 3 },
                                }}
                            >
                                {employees.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="news-box rounded">
                                            <div className="new-image">
                                                <img src={BASE_URL + item.image} className="img-fluid rounded" alt="Employee" />
                                            </div>
                                            <div className="news-content rounded-bottom">
                                                <p className="award-title">{item.heading}</p>
                                                <p className="content-news-para">{item.description}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
