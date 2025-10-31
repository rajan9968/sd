import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Header from "../include/Header";
import Footer from '../include/Footer';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";


export default function Leadership() {
    const [banner, setBanner] = useState({
        image: "",
        subHeading: "",
    });
    const [teamMembers, setTeamMembers] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [activeTab, setActiveTab] = useState("Key Management");
    useEffect(() => {
        const fetchAboutBanner = async () => {
            try {
                const response = await api.get(
                    "/leadership/get-leadership-banners"
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
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            const res = await api.get("/management/all-key-management");
            if (res.data.success) {
                setTeamMembers(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleShow = (member) => {
        setSelectedMember(member);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    // Filter data by active tab
    const filteredMembers = teamMembers.filter(
        (member) => member.key_status === activeTab
    );



    return (
        <div>
            <Header />
            <main>
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={banner.image || "/assets/images/leadership-banner.png"}
                        alt="awards"
                        className="img-fluid desktop-banner"
                        srcSet=""
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2 className="text-left">Leadership Team
                                <br></br>
                                <span>{banner.subHeading}</span>
                            </h2>                            <ul className="path-women-empow">
                                <li>
                                    <a href="index.php">Home</a>

                                </li>
                                <li className="text-white">/</li>
                                <li>
                                    <a href="#">Leadership Team</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </section>


                <section className="leader-section py-5">
                    <div className="container-fluid plr">
                        {/* Tabs */}
                        <ul className="nav nav-pills mb-3 position-unset" id="pills-tab" role="tablist">
                            {["Key Management", "Board of Directors", "Head of Department"].map((tab) => (
                                <li className="nav-item" role="presentation" key={tab}>
                                    <button
                                        className={`nav-link ${activeTab === tab ? "active" : ""}`}
                                        onClick={() => setActiveTab(tab)}
                                        type="button"
                                    >
                                        {tab}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Tab Content */}
                        <div className="tab-content mt-4">
                            <div className="row">
                                {filteredMembers.map((member) => (
                                    <div
                                        className="col-lg-4 mb-4"
                                        key={member.id}
                                        onClick={() => handleShow(member)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="team-card shadow rounded bg-light">
                                            <img
                                                src={`${API_PATH}/uploads/key-management/${member.image}`}
                                                alt={member.name}
                                                className="img-fluid rounded-top mb-3"
                                            />
                                            <div className="team-name">
                                                <h5 className="mb-1">{member.name}</h5>
                                                <p className="">{member.designation}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Offcanvas for details */}
                            <Offcanvas show={show} onHide={handleClose} placement="end" className="custom-offcanvas">
                                {selectedMember && (
                                    <>
                                        <Offcanvas.Header closeButton></Offcanvas.Header>
                                        <Offcanvas.Body className="p-4">
                                            <div className="row g-0">
                                                <div className="col-md-5">
                                                    <img
                                                        src={`${API_PATH}/uploads/key-management/${selectedMember.image}`}
                                                        alt={selectedMember.name}
                                                        className="img-fluid h-100 object-fit-cover"
                                                    />
                                                </div>
                                                <div className="col-md-7 p-4">
                                                    <h3 className="member-name">{selectedMember.name}</h3>
                                                    <h6 className="member-position mb-3">{selectedMember.designation}</h6>

                                                    {/* Social Icons */}
                                                    <div className="social-icons mt-3">
                                                        {selectedMember.linkedin && (
                                                            <a
                                                                href={selectedMember.linkedin}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-outline-secondary btn-sm rounded-circle me-2"
                                                            >
                                                                <i className="bi bi-linkedin"></i>
                                                            </a>
                                                        )}
                                                        {selectedMember.twitter && (
                                                            <a
                                                                href={selectedMember.twitter}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-outline-secondary btn-sm rounded-circle me-2"
                                                            >
                                                                <i className="bi bi-twitter-x"></i>
                                                            </a>
                                                        )}
                                                        {selectedMember.instagram && (
                                                            <a
                                                                href={selectedMember.instagram}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-outline-secondary btn-sm rounded-circle me-2"
                                                            >
                                                                <i className="bi bi-instagram"></i>
                                                            </a>
                                                        )}
                                                        {selectedMember.facebook && (
                                                            <a
                                                                href={selectedMember.facebook}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-outline-secondary btn-sm rounded-circle"
                                                            >
                                                                <i className="bi bi-facebook"></i>
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="mt-3">{selectedMember.desc}</p>
                                        </Offcanvas.Body>
                                    </>
                                )}
                            </Offcanvas>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    )
}
