import React, { useEffect, useState, useRef } from "react";
import Header from "../include/Header";
import Footer from '../include/Footer';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Parse the number and suffix from the value string
    const parseValue = (val) => {
        if (!val) return { number: 0, prefix: '', suffix: '' };

        const str = String(val);

        // Extract number (including decimals)
        const match = str.match(/(\d+\.?\d*)/);
        const number = match ? parseFloat(match[0]) : 0;

        // Get everything before the number (prefix)
        const prefix = str.substring(0, str.indexOf(match ? match[0] : ''));

        // Get everything after the number (suffix like GW+, ×, etc.)
        const suffix = str.substring(str.indexOf(match ? match[0] : '') + (match ? match[0].length : 0));

        return { number, prefix, suffix };
    };

    const { number: endValue, prefix, suffix } = parseValue(value);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateValue();
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateValue = () => {
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = easeOutQuart * endValue;

            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    const formatNumber = (num) => {
        // If it's a whole number, show no decimals
        if (num === Math.floor(num)) {
            return Math.floor(num);
        }
        // Otherwise keep one decimal place
        return num.toFixed(1);
    };

    return (
        <h3 className="display-4" ref={countRef}>
            {prefix}{formatNumber(count)}{suffix}
        </h3>
    );
};

export default function Independent() {
    const slides2 = [
        { img: "/assets/images/join-1.png", alt: "Join 1" },
        { img: "/assets/images/join-2.png", alt: "Join 2" },
        { img: "/assets/images/join-2.png", alt: "Join 2" },
    ];

    const counters = [
        { value: 6.6, label: "Completed Pre-Development Projects" },
        { value: 6.7, label: "Ongoing Pre-Development Projects" },
        { value: 2.7, label: "In-Pipeline Pre-Development Projects" },
    ];

    const [bannerData, setBannerData] = useState(null);
    const [keyHighlights, setKeyHighlights] = useState([]);
    const [ourApproach, setOurApproach] = useState([]);
    const [ourProjects, setOurProjects] = useState([]);

    const parseDoubleEncodedJSON = (str) => {
        if (!str) return [];
        try {
            return JSON.parse(JSON.parse(str));
        } catch {
            try {
                return JSON.parse(str);
            } catch {
                console.error("Invalid JSON format:", str);
                return [];
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/pre-development/get-pre-development-banners`);

                if (res.data.success) {
                    const selected = res.data.banners.find(
                        (item) => item.page_type === "" || item.page_type === "Independent Power Producer"
                    );

                    if (selected) {
                        setBannerData(selected);
                        setKeyHighlights(parseDoubleEncodedJSON(selected.key_highlights));
                        setOurApproach(parseDoubleEncodedJSON(selected.our_approach));
                        setOurProjects(parseDoubleEncodedJSON(selected.our_projects));
                    }
                }
            } catch (error) {
                console.error("Error fetching Independent Power Producer data:", error);
            }
        };

        fetchData();
    }, []);

    if (!bannerData) return <p className="text-center py-5">Loading...</p>;

    return (
        <div>
            <Header />
            <main>
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={
                            bannerData?.banner_image
                                ? `${API_PATH}/uploads/about-banners/${bannerData.banner_image}`
                                : "/assets/images/business-banner.png"
                        }
                        alt="awards"
                        className="img-fluid desktop-banner"
                        srcSet=""
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2>Independent Power Producer
                                <br></br>
                                <span>{bannerData.sub_heading}</span>
                            </h2>
                            <ul className="path-women-empow">
                                <li>
                                    <a href="index.php">Home</a>
                                </li>
                                <li className="text-white">/</li>
                                <li>
                                    <a href="#">Independent Power Producer</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="powering-progre bg-white py-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Overview</h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="power-img">
                                    <img
                                        src={`${API_PATH}/uploads/about-banners/${bannerData.overview_image}`}
                                        className="img-fluid w-100"
                                        alt="Overview"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex flex-column">
                                <div className="power-content mb-auto">
                                    <p>{bannerData.overview_text}</p>
                                </div>
                                <div className="d-flex align-items-end justify-content-end">
                                    <div className="group-icon">
                                        <img src="/assets/images/business-icon.png" alt="icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- Key Highlights Section with Animated Counter ---------- */}
                <section className="powering-progres key-highlights bg-white py-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Key Highlights</h2>
                        </div>
                        <div className="row text-center mt-4">
                            {keyHighlights.map((item, index) => (
                                <div className="col-md-4" key={index}>
                                    <AnimatedCounter value={item.number} />
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------- Our Approach Section ---------- */}
                <section className="what-new py-5 bg-white">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Our Approach</h2>
                        </div>
                        <div className="row">
                            {ourApproach.map((item, index) => (
                                <div className="col-lg-4 mb-3" key={index}>
                                    <div className="news-box rounded">
                                        <div className="new-image">
                                            <img
                                                src={`${API_PATH}/uploads/about-banners/${item.image}`}
                                                className="img-fluid rounded"
                                                alt={item.heading}
                                            />
                                        </div>
                                        <div className="news-content rounded-bottom">
                                            <p className="award-title">{item.heading}</p>
                                            <p className="content-news-para">{item.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ---------- Key Projects Section ---------- */}
                <section className="join-us our-project py-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Key Projects</h2>
                        </div>

                        <div id="join-carousel-w" className="join-carousel-wrapper custom-ind-dosts">
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                spaceBetween={20}
                                slidesPerView={2}
                                loop={true}
                                autoplay={{ delay: 3000 }}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 2 },
                                }}
                            >
                                {ourProjects.map((project, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={`${API_PATH}/uploads/about-banners/${project.image}`}
                                            className="img-fluid"
                                            alt="Project"
                                            style={{ border: "2px solid #cda837", borderRadius: "15px" }}
                                        />
                                        <p className="pt-2"><strong>{project.text}</strong></p>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>

                {/* ready to talk start */}
                <section className="ready">
                    <div className="container-fluid plr">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-center gap-3 align-items-center text-center">
                                    <h2>Talk to an Expert</h2>
                                    <div className="btn-design-new">
                                        <a href="/contact-us" className="custom-btn">
                                            Contact Us
                                        </a>
                                        <svg
                                            viewBox="-19.04 0 75.804 75.804"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#ffffff"
                                            stroke="#ffffff"
                                        >
                                            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <g id="SVGRepo_iconCarrier">
                                                <g
                                                    id="Group_65"
                                                    data-name="Group 65"
                                                    transform="translate(-831.568 -384.448)"
                                                >
                                                    <path
                                                        id="Path_57"
                                                        data-name="Path 57"
                                                        d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                                        fill="#ffffff"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ready to talk end */}
            </main>
            <Footer />
        </div>
    );
}