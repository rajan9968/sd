import React, { useEffect, useState } from "react";
import Header from "../include/Header";
import Footer from '../include/Footer';
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";

export default function MediaResources() {
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Fetch photos from API
        const fetchPhotos = async () => {
            try {
                const response = await api.get("/resources-photo/get-resources-photos");
                if (response.data.success && response.data.banners?.length > 0) {
                    setPhotos(response.data.banners);
                }
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchPhotos();
    }, []);

    // Initialize lightbox once data is loaded
    useEffect(() => {
        if (photos.length > 0) {
            const lightbox = GLightbox({
                selector: ".glightbox",
                touchNavigation: true,
                loop: true,
            });
            return () => lightbox.destroy();
        }
    }, [photos]);
    useEffect(() => {
        // Fetch video data
        const fetchVideos = async () => {
            try {
                const response = await api.get("/resources-video/get-resources-videos");
                if (response.data.success && response.data.banners?.length > 0) {
                    setVideos(response.data.banners);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, []);

    // Initialize lightbox for video popups
    useEffect(() => {
        if (videos.length > 0) {
            const lightbox = GLightbox({
                selector: ".glightbox",
                touchNavigation: true,
                autoplayVideos: true,
            });
            return () => lightbox.destroy();
        }
    }, [videos]);

    // ✅ Helper: get YouTube thumbnail from link
    const getYouTubeThumbnail = (url) => {
        const match = url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/);
        return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "/assets/images/video-placeholder.jpg";
    };
    return (
        <div>
            <Header />
            <main>
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src="assets/images/newsroom-banner.png"
                        alt="awards"
                        className="img-fluid desktop-banner"
                        srcSet=""
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2>Our Newsroom</h2>
                            <ul className="path-women-empow">
                                <li>
                                    <a href="index.php">Home</a>

                                </li>
                                <li className="text-white">/</li>
                                <li>
                                    <a href="#">Newsroom</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </section>
                {/* Progress start  */}
                <section className="powering-progress pt-5">
                    <div className="container-fluid plr">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center mb-5">
                                    <h2 className="section-title">Media Resources</h2>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
                <section className='leader-section pb-5'>
                    <div className="container-fluid plr">
                        <ul
                            className="nav nav-pills mb-3 position-unset"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active pl-0"
                                    id="pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected="true"
                                >
                                    Photos
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false"
                                >
                                    Videos
                                </button>
                            </li>

                        </ul>
                        <div className="tab-content mt-4" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                            >
                                <div className="row">
                                    {photos.length > 0 ? (
                                        photos.map((item) => (
                                            <div className="col-lg-4 mb-3 col-md-6" key={item.id}>
                                                <div className="team-card shadow rounded bg-light h-100 cursor-pointer">
                                                    <a
                                                        href={`${API_PATH}/uploads/about-banners/${item.banner_image}`}
                                                        className="glightbox"
                                                        data-gallery="resources-gallery"
                                                        data-title={item.sub_heading}
                                                    >
                                                        <img
                                                            src={`${API_PATH}/uploads/about-banners/${item.banner_image}`}
                                                            alt={item.sub_heading}
                                                            className="img-fluid rounded-top mb-3"
                                                        />
                                                    </a>
                                                    <div className="team-name px-3 pb-3">
                                                        <p className="blog-title">
                                                            {item.sub_heading}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center py-5">Loading photos...</p>
                                    )}
                                </div>


                            </div>
                            <div
                                className="tab-pane fade"
                                id="pills-profile"
                                role="tabpanel"
                                aria-labelledby="pills-profile-tab"
                            >
                                <div className="row">
                                    {videos.length > 0 ? (
                                        videos.map((item) => (
                                            <div className="col-lg-4 mb-3 col-md-6" key={item.id}>
                                                <div className="team-card shadow rounded bg-light h-100 cursor-pointer">
                                                    <a
                                                        href={item.video_url}
                                                        className="glightbox"
                                                        data-gallery="video-gallery"
                                                        data-title={item.sub_heading}
                                                    >
                                                        <img
                                                            src={getYouTubeThumbnail(item.video_url)}
                                                            alt={item.sub_heading}
                                                            className="img-fluid rounded-top mb-3"
                                                        />
                                                    </a>
                                                    <div className="team-name px-3 pb-3">
                                                        <p className="blog-title">{item.sub_heading}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center py-5">Loading videos...</p>
                                    )}
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
