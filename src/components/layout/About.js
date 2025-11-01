import React, { useState, useEffect, useRef } from "react";
import Header from "../include/Header";
import Footer from '../include/Footer';
import { FaLocationDot } from "react-icons/fa6";
import API_PATH from "../../api/apiPath";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import api from "../../api/axiosInstance";
import axios from "axios";


export default function About() {
    const [banner, setBanner] = useState({
        image: "",
        subHeading: "",
    });
    const [overview, setOverview] = useState({
        image: "",
        subHeading: "",
    });
    const [purposes, setPurposes] = useState([]);
    const [coreValues, setCoreValues] = useState([]);
    const [hoveredId, setHoveredId] = useState(null);
    const [timelineData, setTimelineData] = useState([]);
    const [mapData, setMapData] = useState(null);

    useEffect(() => {
        const fetchAboutBanner = async () => {
            try {
                const response = await api.get(
                    "/about-banner/get-about-banners"
                );

                if (response.data.success && response.data.banners?.length > 0) {
                    const bannerData = response.data.banners[0];
                    setBanner({
                        image: `${API_PATH}/uploads/about-banners/${bannerData.banner_image}`,
                        subHeading: bannerData.sub_heading,
                    });
                }
            } catch (error) {
                console.error("Error fetching about banner:", error);
            }
        };

        fetchAboutBanner();
    }, []);
    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const response = await api.get(
                    "/com-banner/get-com-banners"
                );

                if (response.data.success && response.data.banners?.length > 0) {
                    const data = response.data.banners[0];
                    setOverview({
                        image: `${API_PATH}/uploads/about-banners/${data.banner_image}`,
                        subHeading: data.sub_heading,
                    });
                }
            } catch (error) {
                console.error("Error fetching overview data:", error);
            }
        };

        fetchOverview();
    }, []);
    useEffect(() => {
        const fetchPurposes = async () => {
            try {
                const response = await api.get(
                    "/purpose/get-purpose"
                );

                if (response.data.success && response.data.banners?.length > 0) {
                    const sorted = response.data.banners.sort((a, b) => a.id - b.id); // ascending

                    setPurposes(sorted);
                }
            } catch (error) {
                console.error("Error fetching purpose data:", error);
            }
        };

        fetchPurposes();
    }, []);

    const getIcon = (type) => {
        switch (type.toLowerCase()) {
            case "vision":
                return "/assets/images/Vision-icon.png";
            case "mission":
                return "/assets/images/mission-icon.png";
            case "purpose":
                return "/assets/images/pur-icon.png";
            default:
                return "/assets/images/default-icon.png";
        }
    };
    const iconMap = {
        Sustainability: "/assets/images/sustainability-icon.png",
        Innovation: "/assets/images/innovation-icon.png",
        Collaboration: "/assets/images/collaboration-icon.png",
        Integrity: "/assets/images/tntegrity-icon.png",
        Safety: "/assets/images/Safety-01.svg",
    };
    useEffect(() => {
        const fetchCoreValues = async () => {
            try {
                const res = await api.get("/values/get-core-values");
                if (res.data.success && res.data.banners?.length > 0) {
                    const sorted = res.data.banners.sort((a, b) => a.id - b.id);
                    setCoreValues(sorted);
                }
            } catch (error) {
                console.error("Error fetching core values:", error);
            }
        };
        fetchCoreValues();
    }, []);
    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const res = await api.get(
                    "/timeline/get-timelines"
                );

                if (res.data.success && res.data.banners?.length > 0) {
                    const formatted = res.data.banners.map((item) => {
                        const employeeCount = extractEmployeeCount(item.content);

                        // ✅ Remove any "Number of Employees" text from content
                        const cleanedContent = item.content.replace(
                            /Number of Employees.*$/i,
                            ""
                        );

                        return {
                            id: item.id,
                            year: item.year || "",
                            title: item.sub_heading || "",
                            description: cleanedContent.trim(),
                            employees: employeeCount || null,
                            img: item.image
                                ? `${API_PATH}/uploads/about-banners/${item.image}`
                                : "/assets/images/timeline-1.png",
                        };
                    });

                    setTimelineData(formatted);
                }
            } catch (error) {
                console.error("Error fetching timeline data:", error);
            }
        };

        const extractEmployeeCount = (text) => {
            const match = text.match(/Employees?\s*[:\-]?\s*(\d+\+?)/i);
            return match ? match[1] : "";
        };

        fetchTimeline();
    }, []);

    useEffect(() => {
        const fetchMappingData = async () => {
            try {
                const res = await api.get(
                    "/mapping/get-mappings"
                );

                if (res.data.success && res.data.banners?.length > 0) {
                    setMapData(res.data.banners[0]); // ✅ directly use the first banner
                }
            } catch (error) {
                console.error("Error fetching mapping data:", error);
            }
        };

        fetchMappingData();
    }, []);

    return (
        <div>
            <Header />
            <main>
                <section className="about-banner position-relative wings-top-section">
                    <img
                        src={banner.image || "/assets/images/about-us-banner.png"}
                        alt="About Banner"
                        className="img-fluid desktop-banner"
                    />
                    <div className="container-fluid plr">
                        <div className="about-banner-caption text-center text-white">
                            <h2 className="text-start">Who we are
                                <br></br>
                                <span>{banner.subHeading}</span>
                            </h2>
                            <ul className="path-women-empow">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="#">Who we are</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                {/* Progress start  */}
                <section className="powering-progress vision-section py-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Overview</h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="power-img">
                                    <img
                                        src="/assets/images/join-1.png"
                                        className="img-fluid w-100 rounded"
                                        alt="Team working together"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex flex-column justify-content-between">
                                <div className="power-content">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                        volutpat.
                                    </p>
                                    <p>
                                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
                                        suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                                <div className="d-flex align-items-end justify-content-end">
                                    <div className="group-icon">
                                        <img src="/assets/images/Group-icon.png" alt="Decorative group icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Progress end  */}
                <section className="our-business vision-section my-5">
                    <div className="container-fluid plr">
                        <div className="row g-5">
                            {purposes.map((item) => (
                                <div className="col-md-6 col-lg-4 col-6" key={item.id}>
                                    <div className="card-custom about-card-second text-center">
                                        <img
                                            src={getIcon(item.purpose_type)}
                                            className="card-image about-custom-car-image mb-3"
                                            alt={item.purpose_type}
                                        />
                                        <h3>{item.purpose_type}</h3>
                                        <p>{item.sub_heading}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                <section className="our-business core-values my-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Core Values</h2>
                        </div>

                        <div id="new-carousel" style={{ position: 'relative' }}>
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>

                            <Swiper
                                className="news-swiper"
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={4}
                                // autoplay={{
                                //     delay: 3000,
                                //     disableOnInteraction: false,
                                //     pauseOnMouseEnter: true
                                // }}
                                navigation={{
                                    prevEl: '.swiper-button-prev',
                                    nextEl: '.swiper-button-next',
                                }}
                                loop={true}
                                breakpoints={{
                                    0: { slidesPerView: 2 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 4 },
                                }}
                            >
                                {coreValues.map((item) => {
                                    const iconSrc = iconMap[item.sub_heading?.trim()] || "/assets/images/default-icon.png";
                                    const bannerImg = item.banner_image
                                        ? `https://datta-infra.wpdevstudio.site/uploads/our-culture/${item.banner_image}`
                                        : null;

                                    return (
                                        <SwiperSlide key={item.id}>
                                            <div
                                                className="col-md-6 col-lg-12 col-12"
                                                onMouseEnter={() => setHoveredId(item.id)}
                                                onMouseLeave={() => setHoveredId(null)}
                                            >
                                                <div
                                                    className="card-custom about-core-card-h"
                                                    style={{
                                                        backgroundImage:
                                                            hoveredId === item.id && bannerImg
                                                                ? `url(${bannerImg})`
                                                                : "none",
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                        transition: "all 0.3s ease",
                                                        transform:
                                                            hoveredId === item.id ? "scale(1)" : "scale(1)",
                                                        filter:
                                                            hoveredId === item.id ? "brightness(1.1)" : "brightness(1)",
                                                    }}
                                                >
                                                    <img src={iconSrc} className="card-image about-core-icon" alt={item.sub_heading} />
                                                    <h3>{item.sub_heading}</h3>
                                                    <p>{item.content}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                </section>
                <section className="timeline-banner">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Our Journey</h2>
                        </div>
                        <div className="timeline">
                            {timelineData.map((item, index) => (
                                <div className="timeline-item-wrapper" key={item.id}>
                                    <div className="timeline-dot"></div>

                                    <div
                                        className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                                    >
                                        <div className="timeline-content pt-0 p-3 mb-5">
                                            <h4 className="year">{item.year}</h4>
                                            <h5>{item.title}</h5>
                                            <p>{item.description}</p>
                                            <p>
                                                <strong>Number of Employees:</strong> {item.employees}
                                            </p>
                                        </div>

                                        <div className="timeline-image">
                                            <img
                                                src={item.img}
                                                alt={item.year}
                                                className="img-fluid rounded w-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="timeline-line"></div>
                        </div>

                    </div>
                </section>
                <section className="our-presence-section my-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Our Presence</h2>
                        </div>

                        <div className="row">
                            {/* 🗺️ Left Column - Map Image */}
                            <div className="col-lg-6 text-center">
                                {mapData?.image ? (
                                    <img
                                        src={`${API_PATH}/uploads/about-banners/${mapData.image}`}
                                        alt="Our Presence Map"
                                        className="img-fluid"
                                    />
                                ) : (
                                    <img
                                        src="/assets/mages/our-presence-map.png"
                                        alt="Fallback Map"
                                        className="img-fluid"
                                    />
                                )}
                            </div>

                            {/* 📍 Right Column - States & Locations */}
                            <div className="col-lg-6">
                                <div className="text-start custom-vew-state pl-4">
                                    <ul className="list-unstyled m-0">
                                        {mapData?.state_location?.length > 0 ? (
                                            mapData.state_location.map((loc, index) => (
                                                <li
                                                    key={index}
                                                    className="d-flex align-items-start gap-2 mb-4"
                                                >
                                                    <FaLocationDot className="text-color mt-1 fs-5" />
                                                    <div>
                                                        <span className="fw-semibold about-state">{loc.state}</span>
                                                        <p className="mb-0 text-muted about-location">{loc.location}</p>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-muted">No location data available.</p>
                                        )}
                                    </ul>
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
