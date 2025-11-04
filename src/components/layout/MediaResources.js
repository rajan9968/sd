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
    const [visiblePhotoCount, setVisiblePhotoCount] = useState(3);
    const [visibleVideoCount, setVisibleVideoCount] = useState(3);

    // ✅ Fetch Photos
    useEffect(() => {
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

    // ✅ Lightbox for Photos
useEffect(() => {
    if (photos.length > 0) {
        const lightbox = GLightbox({
            selector: ".glightbox-photo",
            touchNavigation: true,
            loop: true,
        });
        return () => lightbox.destroy();
    }
}, [photos, visiblePhotoCount]); // 👈 added visiblePhotoCount here


    // ✅ Fetch Videos
    useEffect(() => {
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

    // ✅ Lightbox for Videos
    useEffect(() => {
    if (videos.length > 0) {
        const lightbox = GLightbox({
            selector: ".glightbox-video",
            touchNavigation: true,
            autoplayVideos: true,
        });
        return () => lightbox.destroy();
    }
}, [videos, visibleVideoCount]); // 👈 added visibleVideoCount here


    // ✅ YouTube Thumbnail Helper
    const getYouTubeThumbnail = (url) => {
        const match = url.match(/(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&]+)/);
        return match
            ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
            : "/assets/images/video-placeholder.jpg";
    };

    // ✅ Load More / Less — Photos
    const handlePhotoLoadMore = (e) => {
        e.preventDefault();
        setVisiblePhotoCount((prev) =>
            prev < photos.length ? Math.min(prev + 3, photos.length) : 3
        );
    };

    // ✅ Load More / Less — Videos
    const handleVideoLoadMore = (e) => {
        e.preventDefault();
        setVisibleVideoCount((prev) =>
            prev < videos.length ? Math.min(prev + 3, videos.length) : 3
        );
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
                            className="nav nav-pills mb-3 position-unset justify-content-start"
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
                                        photos.slice(0, visiblePhotoCount).map((item) => (
                                            <div className="col-lg-4 mb-3 col-md-6" key={item.id}>
                                                <div className="team-card shadow rounded bg-light h-100 cursor-pointer custom-mobile-tt">
                                                    <a
                                                        href={`${API_PATH}/uploads/about-banners/${item.banner_image}`}
                                                        className="glightbox-photo"
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
                                                        <p className="blog-title">{item.sub_heading}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center py-5">Loading photos...</p>
                                    )}

                                    {photos.length > 3 && (
                                        <div className="my-3 text-center d-flex justify-content-center">
                                            <div className="btn-design contact-submit-btn" style={{
                                                left: "unset"
                                            }}>
                                                <a href="#" onClick={handlePhotoLoadMore} className="custom-btn">
                                                    {visiblePhotoCount < photos.length ? "Load More" : "Load Less"}
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
                                                </a>
                                            </div>
                                        </div>
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
                                        videos.slice(0, visibleVideoCount).map((item) => (
                                            <div className="col-lg-4 mb-3 col-md-6" key={item.id}>
                                                <div className="team-card shadow rounded bg-light h-100 cursor-pointer">
                                                    <a
                                                        href={item.video_url}
                                                        className="glightbox-video"
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

                                    {videos.length > 3 && (
                                        <div className="my-3 text-center d-flex justify-content-center">
                                            <div className="btn-design contact-submit-btn" style={{
                                                left: "unset"
                                            }}>
                                                <a href="#" onClick={handleVideoLoadMore} className="custom-btn">
                                                    {visibleVideoCount < videos.length ? "Load More" : "Load Less"}
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
                                                </a>
                                            </div>
                                        </div>
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
