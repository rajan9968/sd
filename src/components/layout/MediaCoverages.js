import React, { useState, useEffect } from "react";
import Header from "../include/Header";
import Footer from '../include/Footer';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";

export default function MediaCoverages() {
    const [visibleCount, setVisibleCount] = useState(3); // show 3 initially
    const [pressReleases, setPressReleases] = useState([]);
    const navigate = useNavigate();
    const [banner, setBanner] = useState({
        image: "",
        subHeading: "",
    });
    useEffect(() => {
        const fetchFaqBanner = async () => {
            try {
                const response = await api.get("/media-banner/getallmedia-banner");
                const data = response.data;

                // Since the API returns an array directly
                if (Array.isArray(data) && data.length > 0) {
                    const bannerData = data[0];
                    setBanner({
                        image: `${API_PATH}/uploads/careers/${bannerData.image_carousel}`,
                        subHeading: bannerData.sub_heading,
                    });
                }
            } catch (error) {
                console.error("Error fetching FAQ banner:", error);
            }
        };

        fetchFaqBanner();
    }, []);
    const createSlug = (text) =>
        text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    useEffect(() => {
        const fetchPressReleases = async () => {
            try {
                const res = await api.get("/media-releases/get-media-releases");
                if (res.data.success) {
                    setPressReleases(res.data.pressReleases);
                }
            } catch (error) {
                console.error("Error fetching press releases:", error);
            }
        };

        fetchPressReleases();
    }, []);
    // function for load more / load less
    const handleLoadMore = (e) => {
        e.preventDefault();
        if (visibleCount < pressReleases.length) {
            setVisibleCount((prev) => Math.min(prev + 3, pressReleases.length));
        } else {
            setVisibleCount(3); // reset to 3 if all are shown
        }
    };
    return (
        <div>
            <Header />
            <main>
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={banner.image || "assets/images/newsroom-banner.png"}
                        alt="awards"
                        className="img-fluid desktop-banner"
                        srcSet=""
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2>Media Coverages
                                <br></br>
                                <span>{banner.subHeading}</span>
                            </h2>
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
                <section className='project-section py-5'>
                    <div className="container-fluid plr">
                        <div className="row mb-3">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-6">
                                <div className="text-center mb-5">
                                    <h2 className="section-title">Media Coverages</h2>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="d-flex gap-1">
                                    <div className="search-bar">
                                        <i className="fa fa-search"></i>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                        />
                                    </div>
                                    <Form.Select aria-label="Default select example" style={{ width: "40%" }}>
                                        <option>Year</option>
                                        <option value="1">2025</option>
                                        <option value="2">2024</option>
                                        <option value="3">2023</option>
                                        <option value="3">2022</option>
                                        <option value="3">2021</option>
                                        <option value="3">2020</option>
                                        <option value="3">2019</option>
                                    </Form.Select>
                                </div>
                            </div>
                        </div>



                        {pressReleases.length === 0 ? (
                            <p>Loading press releases...</p>
                        ) : (
                            pressReleases.slice(0, visibleCount).map((item) => {
                                const slug = createSlug(item.press_release_heading);
                                const date = new Date(item.press_release_date).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                });
                                return (
                                    <div className="row align-items-center mb-4" key={item.id}>
                                        <Link
                                            to={`/media-detail/${slug}`}
                                            state={{ id: item.id }}
                                            className="d-flex text-black w-100 align-items-center tag-link"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <div className="col-lg-4">
                                                <div className="card-cbb overflow-hidden">
                                                    <img
                                                        src={`${API_PATH}/uploads/press-releases/${item.press_release_picture}`}
                                                        alt={item.press_release_heading}
                                                        className="img-fluid rounded w-100"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-8 newsroom">
                                                <div className="news-con-view px-4">
                                                    <h5 className="press-tile-custom">{item.press_release_heading}</h5>
                                                    <p className="mb-2">
                                                        {item.press_release_content
                                                            .replace(/Read more at:.*/i, "")
                                                            .slice(0, 180)}...
                                                    </p>
                                                    <p className="mb-1">Date: {date}</p>
                                                    <p className="mb-0">Publication: {item.press_release_publication}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })
                        )}

                        {/* Load More / Load Less Button */}
                        {pressReleases.length > 3 && (
                            <div className="my-3 text-center d-flex justify-content-center">
                                <div className="btn-design contact-submit-btn">
                                    <a href="#" onClick={handleLoadMore} className="custom-btn">
                                        {visibleCount < pressReleases.length ? "Load More" : "Load Less"}
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
                </section>


            </main>
            <Footer />
        </div>
    )
}
