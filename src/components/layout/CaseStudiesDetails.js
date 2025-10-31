import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import Header from "../include/Header";
import Footer from '../include/Footer';
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";

export default function CaseStudiesDetails() {
    const { slug } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [readMoreLink, setReadMoreLink] = useState("");

    // Slug converter helper
    const createSlug = (text) =>
        text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

    useEffect(() => {
        const id = location.state?.id;

        const fetchBlogs = async () => {
            try {
                const res = await api.get("/case-studies/getall-case-studies");
                const blogs = res.data;

                let found;
                if (id) {
                    found = blogs.find((b) => b.id === id);
                } else {
                    found = blogs.find((b) => createSlug(b.sub_heading) === slug);
                }

                if (found) {
                    // Extract "Read more" link if present
                    const match = found.content?.match(/https?:\/\/[^\s<>"']+/);
                    if (match) {
                        setReadMoreLink(match[0]);
                    }
                    setBlog(found);
                } else {
                    navigate("/blogs");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchBlogs();
    }, [slug]);

    if (!blog) return <p>Loading...</p>;

    // Remove "Read more at:" from displayed content
    const cleanedContent = blog.content
        ?.replace(/Read more at:.*/i, "")
        .replace(/\r\n/g, "<br />");
    return (
        <div>
            <Header />
            <main>
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={`${API_PATH}/uploads/blogs/${blog.banner_image}`}
                        alt="awards"
                        className="img-fluid desktop-banner"
                        srcSet=""
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption w-75">
                            <h2>Our Case Studies</h2>
                            <ul className="path-women-empow">
                                <li><a href="/">Home</a></li>
                                <li className="text-white">/</li>
                                <li><a href="#">{blog.sub_heading}</a></li>
                            </ul>
                        </div>
                    </div>

                </section>
                {/* Progress start  */}
                <section className="powering-progress py-5">
                    <div className="container-fluid plr">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="power-img">
                                    <img
                                        src={`${API_PATH}/uploads/blogs/${blog.blog_inner_image}`}
                                        className="img-fluid w-100"
                                        alt={blog.sub_heading}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex flex-column">
                                <div className="power-content mb-auto">
                                    <h4 className="blog-details-title">{blog.sub_heading}</h4>

                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: cleanedContent,
                                        }}
                                    />

                                    {/* Conditionally show Read More link */}
                                    {readMoreLink && (
                                        <p className="mt-3">
                                            <a
                                                href={readMoreLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary fw-semibold"
                                            >
                                                Click Here
                                            </a>
                                        </p>
                                    )}
                                </div>

                                <div className="d-flex align-items-end justify-content-end">
                                    <div className="group-icon">
                                        <img src="/assets/images/Group-icon.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Progress end  */}

            </main>
            <Footer />
        </div>
    )
}
