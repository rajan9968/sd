import React, { useState, useEffect, useRef } from "react";
import Header from "../include/Header";
import Footer from '../include/Footer';
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";

export default function ProjectPortfolio() {
    const [banner, setBanner] = useState({
        image: "",
        subHeading: "",
    });
    const [pageHeading, setPageHeading] = useState("");
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        const fetchAboutBanner = async () => {
            try {
                const response = await api.get(
                    "/project/get-project-banners"
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
        const fetchPageHeading = async () => {
            try {
                const res = await api.get(
                    "/portfolio-page-heading/get-portfolio-page-heading"
                );

                if (res.data.success && res.data.banners?.length > 0) {
                    setPageHeading(res.data.banners[0].sub_heading);
                }
            } catch (error) {
                console.error("Error fetching portfolio heading:", error);
            }
        };

        fetchPageHeading();
    }, []);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get(
                    "/portfolio-overview/get-portfolio-overview"
                );
                if (res.data.success && res.data.banners?.length > 0) {
                    setProjects(res.data.banners);
                }
            } catch (error) {
                console.error("Error fetching portfolio overview:", error);
            }
        };
        fetchProjects();
    }, []);
    return (
        <div>
            <Header />
            <main>
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={banner.image || "/assets/images/project-profolio-banner.png"}
                        alt="awards"
                        className="img-fluid desktop-banner"
                        srcSet=""
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2>Project Portfolio
                                <br></br>
                                <span>{banner.subHeading}</span>
                            </h2>
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
                        <div className="text-center mb-5">
                            <h2 className="section-title">Overview</h2>
                            <p className="section-text m-0 pb-2">
                                {pageHeading
                                    ? pageHeading
                                    : "Loading portfolio description..."}
                            </p>
                        </div>
                        <div className="row">
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4" key={project.id}>
                                        <div className="news-box rounded">
                                            <div className="new-image">
                                                <img
                                                    src={`https://datta-infra.wpdevstudio.site/uploads/about-banners/${project.image}`}
                                                    alt={project.project_name}
                                                    className="img-fluid rounded"
                                                />
                                            </div>
                                            <div className="news-content rounded-bottom custom-project-h">
                                                <p className="award-title mb-0">
                                                    {project.project_name}
                                                </p>
                                                <p className="pro-ti mb-0">{project.location}</p>
                                                <p className="content-news-para">{project.sub_heading}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Loading projects...</p>
                            )}
                            <div className="col-lg-12 my-5 text-center d-flex justify-content-center">
                                <div className="btn-design">
                                    <a href="" className="custom-btn">
                                        Load More
                                    </a>
                                </div></div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    )
}
