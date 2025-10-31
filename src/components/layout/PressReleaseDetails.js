import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../include/Header";
import Footer from "../include/Footer";
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";

export default function PressReleaseDetails() {
    const { slug } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [press, setPress] = useState(null);
    const [readMoreLink, setReadMoreLink] = useState("");

    // Helper to make slug from heading
    const createSlug = (text) =>
        text?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    useEffect(() => {
        const id = location.state?.id;

        const fetchDetails = async () => {
            try {
                const res = await api.get("/press-releases/get-press-releases");
                const all = res.data.pressReleases;

                let found;
                if (id) {
                    found = all.find((p) => p.id === id);
                } else {
                    found = all.find(
                        (p) => createSlug(p.press_release_heading) === slug
                    );
                }

                if (!found) {
                    navigate("/press-release");
                    return;
                }

                // Extract any “Read more at:” link from content
                const match = found.press_release_content.match(/https?:\/\/[^\s<>"']+/);
                if (match) setReadMoreLink(match[0]);

                setPress(found);
            } catch (error) {
                console.error("Error fetching press release details:", error);
            }
        };

        fetchDetails();
    }, [slug]);

    if (!press) return <p className="text-center py-5">Loading...</p>;

    const cleanedContent = press.press_release_content
        .replace(/Read more at:.*/i, "")
        .replace(/\r?\n/g, "<br />");

    const formattedDate = new Date(press.press_release_date).toLocaleDateString(
        "en-IN",
        { year: "numeric", month: "short", day: "numeric" }
    );

    return (
        <div>
            <Header />
            <main>
                {/* Banner */}
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={`${API_PATH}/uploads/press-releases/${press.detail_banner_image || "newsroom-banner.png"}`}
                        alt="newsroom banner"
                        className="img-fluid desktop-banner"
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption w-75">
                            <h2>Our Newsroom</h2>
                            <ul className="path-women-empow">
                                <li><a href="/">Home</a></li>
                                <li className="text-white">/</li>
                                <li><a href="/press-releases">{press.press_release_heading}</a></li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Details Section */}
                <section className="powering-progress py-5">
                    <div className="container-fluid plr">
                        <div className="row align-items-cente">
                            {/* Image */}
                            <div className="col-lg-4 mb-4">
                                <img
                                    src={`${API_PATH}/uploads/press-releases/${press.press_release_picture}`}
                                    alt={press.press_release_heading}
                                    className="img-fluid desktop-banner rounded w-100"
                                />
                            </div>

                            {/* Info */}
                            <div className="col-lg-8 newsroom">
                                <p
                                    dangerouslySetInnerHTML={{ __html: cleanedContent }}
                                />
                                <p><strong>Date:</strong> {formattedDate}</p>
                                <p><strong>Publication:</strong> {press.press_release_publication}</p>

                                {/* Show "Read More" link only if exists */}
                                {readMoreLink && (
                                    <p className="mt-3">
                                        <a
                                            href={readMoreLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-primary btn-sm rounded-pill"
                                        >
                                            Read More →
                                        </a>
                                    </p>
                                )}

                                {/* Social Icons */}
                                <div className="social-icons text-end mt-3">
                                    <a href="#" className="btn btn-outline-secondary btn-sm rounded-circle me-2">
                                        <i className="bi bi-linkedin"></i>
                                    </a>
                                    <a href="#" className="btn btn-outline-secondary btn-sm rounded-circle me-2">
                                        <i className="bi bi-twitter-x"></i>
                                    </a>
                                    <a href="#" className="btn btn-outline-secondary btn-sm rounded-circle me-2">
                                        <i className="bi bi-instagram"></i>
                                    </a>
                                    <a href="#" className="btn btn-outline-secondary btn-sm rounded-circle">
                                        <i className="bi bi-facebook"></i>
                                    </a>
                                </div>
                            </div>

                            {/* Description */}
                            {/* <div className="col-lg-12">
                                <div className="press-desc mt-4">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: cleanedContent }}
                                    />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
