import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import Header from "../include/Header";
import Footer from "../include/Footer";
import { Link } from "react-router-dom";
import API_PATH from "../../api/apiPath";
import api from "../../api/axiosInstance";
import axios from "axios";



export default function Home() {
    const [businessText, setBusinessText] = useState("");
    const [businesses, setBusinesses] = useState([]);
    const [logos, setLogos] = useState([]);
    const [subHeading, setSubHeading] = useState("");
    const [sustainabilityData, setSustainabilityData] = useState(null);
    const [subPortHeading, setPortSubHeading] = useState("");
    const [slides, setSlides] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [careerHeading, setCareerHeading] = useState("");
    const [slides2, setSlides2] = useState([]);
    const [latestEntries, setLatestEntries] = useState([]);


    const [slidesData, setSlidesData] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = useRef(null);
    const sliderRef = useRef(null);
    const totalSlides = slidesData.length;
    const showSlide = (n) => setCurrentSlide((n + totalSlides) % totalSlides);
    const nextSlide = () => showSlide(currentSlide + 1);
    const prevSlide = () => showSlide(currentSlide - 1);
    // ✅ Fetch banners from API
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await api.get(`/banners/getbanners`);

                if (response.data.success && response.data.banners) {
                    const formattedData = response.data.banners.map((banner) => ({
                        bg: `${API_PATH}/uploads/${encodeURIComponent(banner.image)}`,
                        title: banner.heading,
                        subheading: banner.subheading,
                        stats: JSON.parse(banner.content || "[]").map((item) => ({
                            number: item.number,
                            label: item.content.replace("|", "\n"),
                        })),
                    }));

                    setSlidesData(formattedData);
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };

        fetchBanners();
    }, []);

    // ✅ Auto Slide
    useEffect(() => {
        if (slidesData.length > 0) {
            slideInterval.current = setInterval(nextSlide, 5000);
            return () => clearInterval(slideInterval.current);
        }
    }, [currentSlide, slidesData]);

    // ✅ Pause on hover
    useEffect(() => {
        const sliderEl = sliderRef.current;
        if (!sliderEl) return;

        const handleMouseEnter = () => clearInterval(slideInterval.current);
        const handleMouseLeave = () => (slideInterval.current = setInterval(nextSlide, 5000));

        sliderEl.addEventListener("mouseenter", handleMouseEnter);
        sliderEl.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            sliderEl.removeEventListener("mouseenter", handleMouseEnter);
            sliderEl.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [slidesData]);

    // ✅ Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "ArrowRight") nextSlide();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    });
    // Headinh 
    useEffect(() => {
        const fetchBusinessHeading = async () => {
            try {

                const response = await api.get(`/business-heading/get-business-heading`);

                if (response.data.success && response.data.banners.length > 0) {
                    // ✅ Extract text from sub_heading
                    setBusinessText(response.data.banners[0].sub_heading);
                } else {
                    console.warn("No business heading found");
                }
            } catch (error) {
                console.error("Error fetching business heading:", error);
            }
        };

        fetchBusinessHeading();
    }, []);
    // card 
    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                const response = await api.get(
                    "/business/getbussiness"
                );
                if (response.data.success) {
                    setBusinesses(response.data.businesses);
                }
            } catch (error) {
                console.error("Error fetching business data:", error);
            }
        };

        fetchBusinessData();
    }, []);

    // Static icons mapped by index (you can also return from API if needed)
    const icons = [
        "assets/images/bussniess-icon-1.png",
        "assets/images/bussniess-icon-2.png",
        "assets/images/bussniess-icon-3.png",
        "assets/images/bussniess-icon-4.png",
    ];
    useEffect(() => {
        const fetchClientLogos = async () => {
            try {
                const response = await api.get(
                    "client-logos/getclient"
                );
                if (response.data.success) {
                    setLogos(response.data.logos);
                }
            } catch (error) {
                console.error("Error fetching client logos:", error);
            }
        };

        fetchClientLogos();
    }, []);


    useEffect(() => {
        const fetchSustainabilityHeading = async () => {
            try {
                const response = await api.get(
                    "/sustainability-heading/get-sustainability-heading"
                );

                if (response.data.success && response.data.banners.length > 0) {
                    setSubHeading(response.data.banners[0].sub_heading);
                }
            } catch (error) {
                console.error("Error fetching sustainability heading:", error);
            }
        };

        fetchSustainabilityHeading();
    }, []);

    useEffect(() => {
        const fetchSustainabilityData = async () => {
            try {
                const response = await api.get(
                    "/sustainability/getsustainability"
                );

                if (response.data.success && response.data.records.length > 0) {
                    setSustainabilityData(response.data.records[0]);
                }
            } catch (error) {
                console.error("Error fetching sustainability data:", error);
            }
        };

        fetchSustainabilityData();
    }, []);

    useEffect(() => {
        const fetchPortfolioHeading = async () => {
            try {
                const response = await axios.get(
                    "https://datta-infra.wpdevstudio.site/api/portfolio-heading/get-portfolio-heading"
                );

                if (response.data.success && response.data.banners?.length > 0) {
                    setPortSubHeading(response.data.banners[0].sub_heading);
                }
            } catch (error) {
                console.error("Error fetching portfolio heading:", error);
            }
        };

        fetchPortfolioHeading();
    }, []);

    useEffect(() => {
        const fetchPortfolios = async () => {

            try {
                const res = await api.get("/portfolio/get-all-portfolios");
                const data = res.data;

                if (data.success) {
                    // Transform API data for easy use in Swiper
                    const formatted = data.portfolios.map((item) => ({
                        bgImage: `${API_PATH}/uploads/portfolio-images/${item.image}`,
                        title: item.sub_heading, // Full title
                        location: item.sub_heading.split("|")[0]?.trim() || "", // Extract part before "|"
                        description: item.text_on_image,
                        icon: `${API_PATH}/uploads/portfolio-images/${item.image}`,
                        number: item.id,
                    }));
                    setSlides(formatted);
                }
            } catch (error) {
                console.error("Error fetching portfolio data:", error);
            }

        };

        fetchPortfolios();
    }, []);

    useEffect(() => {
        const fetchCareerHeading = async () => {
            try {
                const response = await api.get(
                    "/careers-heading/get-careers-heading"
                );

                if (response.data.success && response.data.banners?.length > 0) {
                    setCareerHeading(response.data.banners[0].sub_heading);
                }
            } catch (error) {
                console.error("Error fetching career heading:", error);
            }
        };

        fetchCareerHeading();
    }, []);

    useEffect(() => {
        const fetchCareerImages = async () => {
            try {
                const response = await api.get(
                    "/career/getallcareer"
                );

                if (response.data && Array.isArray(response.data)) {
                    // ✅ Map API data to usable format for Swiper
                    const formattedSlides = response.data.map((item) => ({
                        img: `${API_PATH}/uploads/careers/${item.image_carousel}`,
                        alt: item.sub_heading || "Career Image",
                    }));

                    setSlides2(formattedSlides);
                }
            } catch (error) {
                console.error("Error fetching career images:", error);
            }
        };

        fetchCareerImages();
    }, []);
    useEffect(() => {
        const fetchLatestData = async () => {
            try {
                // Fetch all APIs in parallel
                const [pressRes, caseRes, blogRes, mediaRes] = await Promise.all([
                    api.get("/press-releases/get-press-releases"),
                    api.get("/case-studies/getall-case-studies"),
                    api.get("/blog-detail/getall-blog-detail"),
                    api.get("/media-releases/get-media-releases"),
                ]);

                // Sort and pick latest Press Release
                const latestPress =
                    pressRes.data?.pressReleases
                        ?.sort((a, b) => new Date(b.press_release_date) - new Date(a.press_release_date))[0];

                // Sort and pick latest Case Study
                const latestCase =
                    caseRes.data
                        ?.sort((a, b) => new Date(b.blog_date || b.created_at) - new Date(a.blog_date || a.created_at))[0];

                // Sort and pick latest Blog
                const latestBlog =
                    blogRes.data
                        ?.sort((a, b) => new Date(b.blog_date) - new Date(a.blog_date))[0];

                // Sort and pick latest Media Coverage
                const latestMedia =
                    mediaRes.data?.pressReleases
                        ?.sort((a, b) => new Date(b.press_release_date) - new Date(a.press_release_date))[0];

                // Create combined array
                const combinedData = [];

                if (latestPress) {
                    combinedData.push({
                        type: "Press Release",
                        img: `${API_PATH}/uploads/press-releases/${latestPress.press_release_picture}`,
                        date: new Date(latestPress.press_release_date).toLocaleDateString("en-GB"),
                        text: latestPress.press_release_heading,
                        link: latestPress.press_release_content?.match(/https?:\/\/[^\s]+/)?.[0] || "#",
                    });
                }

                if (latestCase) {
                    combinedData.push({
                        type: "Case Study",
                        img: `${API_PATH}/uploads/blogs/${latestCase.blog_inner_image}`,
                        date: new Date(latestCase.blog_date).toLocaleDateString("en-GB"),
                        text: latestCase.sub_heading,
                        link: latestCase.content?.match(/https?:\/\/[^\s]+/)?.[0] || "#",
                    });
                }

                if (latestBlog) {
                    combinedData.push({
                        type: "Blog",
                        img: `${API_PATH}/uploads/blogs/${latestBlog.blog_inner_image}`,
                        date: new Date(latestBlog.blog_date).toLocaleDateString("en-GB"),
                        text: latestBlog.sub_heading,
                        link: latestBlog.content?.match(/https?:\/\/[^\s]+/)?.[0] || "#",
                    });
                }

                if (latestMedia) {
                    combinedData.push({
                        type: "Media Coverage",
                        img: `${API_PATH}/uploads/press-releases/${latestMedia.press_release_picture}`,
                        date: new Date(latestMedia.press_release_date).toLocaleDateString("en-GB"),
                        text: latestMedia.press_release_heading,
                        link: latestMedia.press_release_content?.match(/https?:\/\/[^\s]+/)?.[0] || "#",
                    });
                }

                // Sort all combined items by date (newest first)
                combinedData.sort((a, b) => {
                    const dateA = new Date(a.date.split("/").reverse().join("-"));
                    const dateB = new Date(b.date.split("/").reverse().join("-"));
                    return dateB - dateA;
                });

                setLatestEntries(combinedData);
            } catch (error) {
                console.error("Error fetching latest entries:", error);
            }
        };

        fetchLatestData();
    }, []);
    if (slides.length === 0) return null;


    return (
        <div>
            <Header />
            <main>
                <section className="top-banner">
                    <div className="slider-container" ref={sliderRef}>
                        {slidesData.map((slide, index) => (
                            <div
                                key={index}
                                className={`slide ${index === currentSlide ? "active" : ""}`}
                                style={{ backgroundImage: `url(${slide.bg})` }}
                            >
                                <div className="slide-content">
                                    <h1 className="slide-title">{slide.title}</h1>
                                    <div className="stats-container">
                                        {slide.stats.map((stat, i) => (
                                            <div key={i} className="stat-item">
                                                <div className="stat-number">{stat.number}</div>
                                                <div className="stat-label">
                                                    {stat.label.split("\n").map((line, idx) => (
                                                        <span key={idx}>
                                                            {line}
                                                            <br />
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Navigation Arrows */}
                        {/* <button className="slider-arrow prev" onClick={prevSlide}>
                            &#10094;
                        </button>
                        <button className="slider-arrow next" onClick={nextSlide}>
                            &#10095;
                        </button> */}

                        {/* Dots */}
                        <div className="slider-nav">
                            {slidesData.map((_, index) => (
                                <span
                                    key={index}
                                    className={`slider-dot ${index === currentSlide ? "active" : ""}`}
                                    onClick={() => showSlide(index)}
                                ></span>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Our Business start  */}
                <section className="our-business py-5 bg-white">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">Our Business</h2>
                            <p className="section-text">
                                {businessText || "Loading content..."}
                            </p>
                        </div>
                        <div className="row g-5 custom-row-css">
                            {businesses.map((business, index) => (
                                <div key={business.id} className="col-md-6 col-lg-3 col-6">
                                    <Link
                                        to={
                                            business.card_url
                                                ? business.card_url
                                                : `/business/${business.sub_heading
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")}`
                                        }
                                    >
                                        <div className="card-custom">
                                            <img
                                                src={icons[index] || "assets/images/default-icon.png"}
                                                className="card-image"
                                                alt={business.sub_heading}
                                            />
                                            <h3>{business.sub_heading}</h3>
                                            <p>{business.card_content}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="trusted-section mt-5">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-3 col-md-12 d-flex align-items-center justify-content-center mb-3 mb-lg-0">
                                    <div className="trusted-title d-flex align-items-center">
                                        <div className="circle" />
                                        <h2 className="section-title mb-0 ms-2">Trusted By</h2>
                                    </div>
                                    <div className="divider" />
                                </div>
                                <div className="col-lg-9">
                                    <div className="trusted-logos">
                                        <Swiper
                                            modules={[Autoplay]}
                                            spaceBetween={30}
                                            slidesPerView={3}
                                            loop={true}
                                            autoplay={{
                                                delay: 2000,
                                                disableOnInteraction: false,
                                            }}
                                            breakpoints={{
                                                320: { slidesPerView: 2 },
                                                576: { slidesPerView: 3 },
                                                992: { slidesPerView: 4 },
                                                1200: { slidesPerView: 5 },
                                            }}
                                            className="mySwiper"
                                        >
                                            {logos.map((logo, index) => (
                                                <SwiperSlide key={logo.id || index}>
                                                    <img
                                                        src={`${API_PATH}/uploads/client-logos/${logo.image}`}
                                                        alt={`Client Logo ${index + 1}`}
                                                        className="img-fluid trust-logo"
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Our Business end  */}
                {/* Progress start  */}
                <section className="powering-progress py-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">
                                Powering Progress, Sustaining Tomorrow
                            </h2>
                            <p className="section-text">
                                {subHeading}
                            </p>
                        </div>
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="power-img">
                                    <img
                                        src={
                                            sustainabilityData
                                                ? `${API_PATH}/uploads/sustainability/${encodeURIComponent(
                                                    sustainabilityData.image
                                                )}`
                                                : "assets/images/pro-1.png"
                                        }
                                        className="img-fluid w-100"
                                        alt={sustainabilityData?.heading || "Sustainability"}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-5 d-flex flex-column">
                                <div className="power-content mb-auto">
                                    <h4>
                                        {sustainabilityData?.heading ||
                                            "Lorem ipsum dolor sit amet, consectetuer adipiscing ipsum"}
                                    </h4>
                                    <p className="sus-para">
                                        {sustainabilityData?.content ||
                                            "Lorem ipsum dolor sit amet, consectetuer adipiscing ipsum dolor sit amet..."}
                                    </p>
                                </div>

                                <div className="d-flex align-items-end justify-content-between">
                                    <div className="btn-design-new mt-3">
                                        <a href="/business/pre-development" className="custom-btn">
                                            Read More
                                        </a>
                                        <svg
                                            viewBox="-19.04 0 75.804 75.804"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#ffffff"
                                            stroke="#ffffff"
                                        >
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
                                    <div className="group-icon">
                                        <img src="assets/images/Group-icon.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Progress end  */}
                {/* Our Portfolio start  */}
                <section className="our-portfolio-datta pt-5 pb-4 bg-white">
                    <div className="container-fluid plr">
                        <div className="text-center">
                            <h2 className="section-title">Our Portfolio</h2>
                            <p className="section-text m-0 pb-2">
                                {subPortHeading}
                            </p>
                        </div>
                    </div>
                </section>
                <section
                    className="our-portfolio custom-view mb-4 bg-white"
                    style={{
                        background: `url(${slides[activeIndex].bgImage}) no-repeat center center/cover`,
                        minHeight: "80vh",
                        display: "flex",
                        alignItems: "center",
                        color: "#fff",
                        padding: "0 2rem",
                    }}
                >
                    <div className="container-fluid">
                        {/* Dynamic content-text */}
                        <div className="content-text">
                            <h3>
                                {slides[activeIndex].title} <br />
                                {/* {slides[activeIndex].location} */}
                            </h3>
                            <p>{slides[activeIndex].description}</p>
                        </div>

                        <div className="btn-design d-flex justify-content-center align-items-center gap-2">
                            <a href="/culture" className="custom-btn">
                                View Our Portfolio
                            </a>
                            <svg
                                viewBox="-19.04 0 75.804 75.804"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#ffffff"
                                stroke="#ffffff"
                            >
                                <g id="SVGRepo_iconCarrier">
                                    <g transform="translate(-831.568 -384.448)">
                                        <path
                                            d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                            fill="#ffffff"
                                        />
                                    </g>
                                </g>
                            </svg>
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
                                // autoplay={{ delay: 4000 }}
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 3 },
                                }}
                            >
                                {slides.map((slide, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="history-box d-flex">
                                            <div className="history-image" style={{ maxWidth: "54%" }}>
                                                <img src={slide.icon} className="custom-size-image" alt={slide.location} style={{ maxWidth: "100%" }} />
                                            </div>
                                            <div>
                                                <div className="history-content">
                                                    <p>
                                                        {/* {slide.location} */}
                                                        {slide.title}
                                                    </p>
                                                </div>
                                                <div className="number-part">
                                                    {/* <div className="outline-text">{slide.number}</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Navigation Buttons */}
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>
                        </div>
                    </div>
                </section>
                {/* Our Portfolio end  */}
                {/* Join start  */}
                <section className="join-us py-5">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title text-white">Why Join Datta Infra?</h2>
                            <p className="section-text text-white">
                                {careerHeading}
                            </p>
                            <div className="d-flex justify-content-center align-items-center mt-5 mb-4">
                                <div className="btn-design-new d-flex align-items-center">
                                    <a href="/careers" className="custom-btn">
                                        Explore Opportunities
                                    </a>
                                    <svg
                                        viewBox="-19.04 0 75.804 75.804"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#ffffff"
                                        stroke="#ffffff"
                                        width={28}
                                        height={28}
                                        className="ml-2"
                                    >
                                        <g id="SVGRepo_iconCarrier">
                                            <g id="Group_65" transform="translate(-831.568 -384.448)">
                                                <path
                                                    id="Path_57"
                                                    d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                                    fill="#ffffff"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* Owl Carousel */}
                        <div id="join-carousel-w" className="join-carousel-wrapper">
                            <Swiper
                                modules={[Autoplay, Pagination]} // use Pagination instead of Navigation
                                spaceBetween={20}
                                slidesPerView={3}
                                id="join-carousel"
                                loop={true}
                                autoplay={{ delay: 3000 }}
                                pagination={{ clickable: true }} // enable dots
                                breakpoints={{
                                    0: { slidesPerView: 1 },    // mobile
                                    576: { slidesPerView: 2 },  // small devices
                                    992: { slidesPerView: 2 },  // desktop
                                }}
                            >
                                {slides2.map((slide, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={slide.img} className="img-fluid" alt={slide.alt} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                    </div>
                </section>
                {/* Join end  */}
                {/* What's New start  */}
                <section className="what-new py-5 bg-white">
                    <div className="container-fluid plr">
                        <div className="text-center mb-5">
                            <h2 className="section-title">What's New</h2>
                            <p className="section-text">
                                Catch the latest updates and insights reflecting Datta Infra's journey and growth.
                            </p>
                        </div>

                        <div id="new-carousel" style={{ position: "relative" }}>
                            {/* Custom Navigation Buttons */}
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
                                autoplay={{ delay: 4000 }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                        navigation: false,
                                    },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 3 },
                                }}
                            >
                                {latestEntries.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="news-box">
                                            <div className="new-image">
                                                <img src={item.img} className="img-fluid home-all-card" style={{ objectFit: "cover", height: "25em" }} alt="news" />
                                            </div>
                                            <div className="news-content">
                                                <p className="news-title">
                                                    {item.date} / {item.type}
                                                </p>
                                                <p className="content-news-para">{item.text}</p>
                                                <div className="btn-design-new">
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="custom-btn"
                                                    >
                                                        Read More
                                                    </a>
                                                    <svg
                                                        viewBox="-19.04 0 75.804 75.804"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="#ffffff"
                                                        stroke="#ffffff"
                                                    >
                                                        <g id="Group_65" transform="translate(-831.568 -384.448)">
                                                            <path
                                                                id="Path_57"
                                                                d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z"
                                                                fill="#ffffff"
                                                            ></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
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
                                    <h2>Ready to connect?</h2>
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
        </div >
    )
}