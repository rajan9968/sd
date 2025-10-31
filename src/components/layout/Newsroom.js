import React from 'react'
import Header from "../include/Header";
import Footer from '../include/Footer';
import { Link } from "react-router-dom";

export default function Newsroom() {
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
                <section className='project-section py-5'>
                    <div className="container-fluid plr">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center mb-5">
                                    <h2 className="section-title">Press Releases</h2>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <Link to="/news-detail" className="d-flex text-black w-100 align-items-center tag-link" style={{ textDecoration: "none" }}>
                                <div className="col-lg-4 mb-4">
                                    <div className="card-cbb overflow-hidden">
                                        <img
                                            src="assets/images/newsroom-1.png"
                                            alt="awards"
                                            className="img-fluid desktop-banner card-img-top rounded w-100"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-8 newsroom">
                                    <div className='px-4'>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                            volutpat.
                                        </p>
                                        <p>Date: xx/xxx/xxxx</p>
                                        <p>Publication:</p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="row align-items-center">
                            <Link to="/news-detail" className="d-flex text-black w-100 align-items-center tag-link" style={{ textDecoration: "none" }}>
                                <div className="col-lg-4 mb-4">
                                    <div className="card-cbb overflow-hidden">
                                        <img
                                            src="assets/images/newsroom-1.png"
                                            alt="awards"
                                            className="img-fluid desktop-banner card-img-top rounded w-100"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-8 newsroom">
                                    <div className='px-4'>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                            volutpat.
                                        </p>
                                        <p>Date: xx/xxx/xxxx</p>
                                        <p>Publication:</p>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="row align-items-center">
                            <Link to="/news-detail" className="d-flex text-black w-100 align-items-center tag-link" style={{ textDecoration: "none" }}>
                                <div className="col-lg-4 mb-4">
                                    <div className="card-cbb overflow-hidden">
                                        <img
                                            src="assets/images/newsroom-1.png"
                                            alt="awards"
                                            className="img-fluid desktop-banner card-img-top rounded w-100"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-8 newsroom">
                                    <div className='px-4'>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                            volutpat.
                                        </p>
                                        <p>Date: xx/xxx/xxxx</p>
                                        <p>Publication:</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="my-3 text-center d-flex justify-content-center">
                            <div className="btn-design">
                                <Link to="/press-release" className="custom-btn">
                                    View More
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
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='project-section py-5'>
                    <div className="container-fluid plr">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center mb-5">
                                    <h2 className="section-title">Media Coverages</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <Link to="/news-detail" className="d-flex text-black w-100 align-items-center tag-link" style={{ textDecoration: "none" }}>
                                <div className="col-lg-4 mb-4">
                                    <div className="card-cbb overflow-hidden">
                                        <img
                                            src="assets/images/newsroom-1.png"
                                            alt="awards"
                                            className="img-fluid desktop-banner card-img-top rounded w-100"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-8 newsroom">
                                    <div className='px-4'>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                            volutpat.
                                        </p>
                                        <p>Date: xx/xxx/xxxx</p>
                                        <p>Publication:</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="row align-items-center">
                            <Link to="/news-detail" className="d-flex text-black w-100 align-items-center tag-link" style={{ textDecoration: "none" }}>
                                <div className="col-lg-4 mb-4">
                                    <div className="card-cbb overflow-hidden">
                                        <img
                                            src="assets/images/newsroom-1.png"
                                            alt="awards"
                                            className="img-fluid desktop-banner card-img-top rounded w-100"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-8 newsroom">
                                    <div className='px-4'>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                            volutpat.
                                        </p>
                                        <p>Date: xx/xxx/xxxx</p>
                                        <p>Publication:</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="row align-items-center">
                            <Link to="/news-detail" className="d-flex text-black w-100 align-items-center tag-link" style={{ textDecoration: "none" }}>
                                <div className="col-lg-4 mb-4">
                                    <div className="card-cbb overflow-hidden">
                                        <img
                                            src="assets/images/newsroom-1.png"
                                            alt="awards"
                                            className="img-fluid desktop-banner card-img-top rounded w-100"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-8 newsroom">
                                    <div className='px-4'>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                                            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                                            volutpat.
                                        </p>
                                        <p>Date: xx/xxx/xxxx</p>
                                        <p>Publication:</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="my-3 text-center d-flex justify-content-center">
                            <div className="btn-design">
                                <Link to="/media-coverages" className="custom-btn">
                                    View More
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
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='project-section py-5'>
                    <div className="container-fluid plr">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center mb-5">
                                    <h2 className="section-title">Media Resources</h2>
                                </div>
                            </div>

                        </div>
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-4">
                                <div className="media-card">
                                    <img
                                        src="assets/images/media-1.png"
                                        alt="Photos"
                                        className="img-fluid desktop-banner rounded w-100"
                                    />
                                    <p className='media-text'>Photos</p>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="media-card">
                                    <img
                                        src="assets/images/media-2.png"
                                        alt="Videos"
                                        className="img-fluid desktop-banner rounded w-100"
                                    />
                                    <p className="media-text position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center" style={{ margin: 0 }}>
                                        <img
                                            src="assets/images/play-icon.png"
                                            alt="play"
                                            className='play-icon'
                                        />
                                    </p>
                                    <p className='media-text'>Videos</p>
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
