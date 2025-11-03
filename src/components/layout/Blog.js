import React, { useState, useEffect } from "react";
import Header from "../include/Header";
import Footer from '../include/Footer';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";

export default function Blog() {
    const [banner, setBanner] = useState({
        image: "",
        subHeading: "",
    });
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchFaqBanner = async () => {
            try {
                const response = await api.get("/blog-banner/getallblog-banner");
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
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await api.get("/blog-detail/getall-blog-detail");
                if (Array.isArray(response.data)) {
                    setBlogs(response.data);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    // Convert date into readable format
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const createSlug = (text) =>
        text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with hyphen
            .replace(/^-+|-+$/g, ""); // trim hyphens

    useEffect(() => {
        api.get("/blog-detail/getall-blog-detail")
            .then((res) => setBlogs(res.data))
            .catch((err) => console.error("Error fetching blogs:", err));
    }, []);
    return (
        <div>
            <Header />
            <main>
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={banner.image || "assets/images/blog-banner.png"}
                        alt="awards"
                        className="img-fluid desktop-banner"
                        srcSet=""
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2>Our Blogs
                                <br></br>
                                <span>{banner.subHeading}</span>
                            </h2>
                            <ul className="path-women-empow">
                                <li>
                                    <a href="index.php">Home</a>

                                </li>
                                <li className="text-white">/</li>
                                <li>
                                    <a href="#">Blogs</a>
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
                                    <h2 className="section-title">Read Our Latest Blogs</h2>
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


                        <div className="row">
                            {blogs.map((blog) => {
                                const slug = createSlug(blog.sub_heading);
                                return (
                                    <div className="col-lg-4 mb-4" key={blog.id}>
                                        <Link
                                            to={`/blog-detail/${slug}`}
                                            state={{ id: blog.id }} // pass ID secretly in state
                                            className="text-black text-decoration-none"
                                        >
                                            <div className="team-card shadow rounded bg-light h-100 cursor-pointer">
                                                <img
                                                    src={`${API_PATH}/uploads/blogs/${blog.blog_inner_image}`}
                                                    alt={blog.sub_heading}
                                                    className="img-fluid rounded-top custom-css-in-blog mb-3"
                                                />
                                                <div className="team-name p-3">
                                                    <h5 className="mb-1 blog-date">
                                                        {new Date(blog.blog_date).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </h5>
                                                    <p className="text-mute blog-title">{blog.sub_heading}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                            <div className="col-lg-12 my-5 text-center d-flex justify-content-center">
                                <div className="btn-design contact-submit-btn">
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
