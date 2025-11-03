import React, { useState, useEffect, useRef } from "react";
import { Offcanvas } from "react-bootstrap";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Header() {

    const [showMainOffcanvas, setShowMainOffcanvas] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null); // 'about', 'business', etc.
    const headerRef = useRef(null);

    // Handle main offcanvas
    const handleMainOffcanvasShow = () => setShowMainOffcanvas(true);
    const handleMainOffcanvasClose = () => {
        setShowMainOffcanvas(false);
        setActiveSubmenu(null);
    };

    // Submenu controls
    const openSubmenu = (name) => setActiveSubmenu(name);
    const closeSubmenu = () => setActiveSubmenu(null);
    const closeAllOffcanvas = () => {
        setShowMainOffcanvas(false);
        setActiveSubmenu(null);
    };

    // Scroll shrink logic
    useEffect(() => {
        const handleScroll = () => {
            if (!headerRef.current) return;
            if (window.scrollY > 50) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header ref={headerRef}>
            <div className="container-fluid">
                <div className="row">
                    <div className="nav mt-4">
                        {/* Logo */}
                        <div className="col-lg-4 col-6">
                            <Link to="/" className="logo">
                                <img src="/assets/images/datta-infra-logo.png" alt="logo" />
                            </Link>
                        </div>

                        {/* Navigation */}
                        <div className="col-lg-8 col-6 d-flex justify-content-end">
                            <button
                                type="button"
                                onClick={handleMainOffcanvasShow}
                                aria-label="Open navigation menu"
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                }}
                            >
                                <img className="navOpenBtn" src="/assets/images/menu-icon.jpg" alt="" />
                            </button>
                            {/* <img
                                src="assets/images/menu-icon.jpg"
                                className="navOpenBtn"
                                alt="Open menu"
                                role="button"
                                tabIndex={0}
                            /> */}
                            <div className="d-flex justify-content-end align-items-center h-100">
                                <ul className="nav-links">
                                    <i className="uil uil-times navCloseBtn" />
                                    <li className="dropdown">
                                        <Link to="#" className="dropdown-toggle">
                                            About Us
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link to="/about-us/who-we-are" className="text-color2">Who We Are</Link></li>
                                            <li><Link to="/about-us/leadership-team" className="text-color2">Leadership Team</Link></li>
                                            <li><Link to="/about-us/project-portfolio" className="text-color2">Project Portfolio</Link></li>
                                        </ul>
                                    </li>

                                    <li className="dropdown">
                                        <Link to="#" className="dropdown-toggle">
                                            Business
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link to="/business/pre-development" className="text-color2">Pre-Development EPC</Link></li>
                                            <li><Link to="/business/epc-project" className="text-color2">Turnkey EPC Projects</Link></li>
                                            <li><Link to="/business/grid-infrastructure" className="text-color2">Grid Infrastructure</Link></li>
                                            <li><Link to="/business/independent-power-producer" className="text-color2">Independent Power Producer</Link></li>
                                        </ul>
                                    </li>

                                    <li>
                                        <Link to="/culture">Culture</Link>
                                    </li>
                                    <li>
                                        <Link to="/careers">Careers</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact-us">Contact Us</Link>
                                    </li>
                                    <li>
                                        <a href="#" aria-label="Search">
                                            <i className="bi bi-search search-icon" id="searchIcon" />
                                        </a>
                                    </li>
                                    <li className="ml-3">
                                        <button
                                            type="button"
                                            onClick={handleMainOffcanvasShow}
                                            aria-label="Open navigation menu"
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                            }}
                                        >
                                            <img src="/assets/images/menu-icon.jpg" alt="" />
                                        </button>
                                    </li>
                                </ul>

                                <div className="search-box">
                                    <i className="bi bi-search search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search here..."
                                        aria-label="Search"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Main Offcanvas */}
                        <Offcanvas
                            show={showMainOffcanvas}
                            onHide={handleMainOffcanvasClose}
                            placement="end"
                            className="custom-off"
                            style={{
                                marginRight: activeSubmenu ? "21em" : "0",
                                transition: "margin-right 0.3s ease",
                            }}
                        >
                            <Offcanvas.Header className="justify-content-end">
                                {!activeSubmenu && (
                                    <button
                                        type="button"
                                        className="btn-clos text-reset custom-close"
                                        onClick={handleMainOffcanvasClose}
                                        aria-label="Close"
                                    >
                                        <FaX className="fax-icon" />
                                    </button>
                                )}
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                <div className="offcanvas-menu">
                                    <ul className="offcanvas-links">
                                        {/* ABOUT US */}
                                        <li>
                                            <div className="menu-li d-flex align-items-center justify-content-between">
                                                <button
                                                    onClick={() => setActiveSubmenu("about")}
                                                    className="submenu-toggle"
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        padding: 0,
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    About Us
                                                    <i className="fa fa-angle-right" />
                                                </button>

                                            </div>
                                        </li>

                                        {/* BUSINESS */}
                                        <li>
                                            <div className="menu-li d-flex align-items-center justify-content-between">
                                                <button
                                                    onClick={() => setActiveSubmenu("business")}
                                                    className="submenu-toggle"
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        padding: 0,
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Business
                                                    <i className="fa fa-angle-right" />
                                                </button>
                                            </div>
                                        </li>

                                        {/* REST OF YOUR LINKS */}
                                        <li>
                                            <div className="menu-li d-flex align-items-center justify-content-between">
                                                <Link to="/culture" onClick={closeAllOffcanvas}>
                                                    Culture
                                                </Link>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="menu-li d-flex align-items-center justify-content-between">
                                                <Link to="/awards" onClick={closeAllOffcanvas}>
                                                    Awards
                                                </Link>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="menu-li d-flex align-items-center justify-content-between">
                                                <Link to="/investors" onClick={closeAllOffcanvas}>
                                                    Investors
                                                </Link>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="menu-li d-flex align-items-center justify-content-between">
                                                <button
                                                    onClick={() => setActiveSubmenu("newsroom")}
                                                    className="submenu-toggle"
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        padding: 0,
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Newsroom
                                                    <i className="fa fa-angle-right" />
                                                </button>

                                            </div>
                                        </li>
                                        <li>
                                            <div className="menu-li d-flex align-items-center justify-content-between">
                                                <button
                                                    onClick={() => setActiveSubmenu("resources")}
                                                    className="submenu-toggle"
                                                    style={{
                                                        background: "none",
                                                        border: "none",
                                                        padding: 0,
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    Resources
                                                    <i className="fa fa-angle-right" />
                                                </button>

                                            </div>
                                        </li>
                                        <li>
                                            <div className="menu-li d-flex align-items-center justify-content-between">
                                                <Link to="/careers" onClick={closeAllOffcanvas}>
                                                    Careers
                                                </Link>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="menu-li d-flex align-items-center justify-content-between">
                                                <Link to="/contact-us" onClick={closeAllOffcanvas}>
                                                    Contact Us
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>

                                    <ul className="social-icons d-flex align-items-center justify-content-between">
                                        <li>
                                            <a href="#" aria-label="Facebook">
                                                <i className="fa fa-facebook-f custom-fa" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" aria-label="Twitter">
                                                <i className="bi bi-twitter-x custom-fa" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" aria-label="LinkedIn">
                                                <i className="fa fa-linkedin custom-fa" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" aria-label="Instagram">
                                                <i className="fa fa-instagram custom-fa" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" aria-label="YouTube">
                                                <i className="fa fa-youtube-play custom-fa" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>

                        {/* ABOUT US Submenu */}
                        <Offcanvas
                            show={activeSubmenu === "about"}
                            onHide={() => setActiveSubmenu(null)}
                            placement="end"
                            className="custom-off submenu-off"
                        >
                            <Offcanvas.Header className="justify-content-end m-0">
                                <button
                                    type="button"
                                    className="btn-clos text-reset custom-close"
                                    onClick={() => setActiveSubmenu(null)}
                                    aria-label="Close"
                                >
                                    <img src="assets/images/cross.svg" alt="" />
                                </button>
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                <div className="offcanvas-menu">
                                    <ul className="offcanvas-links w-75">
                                        <li>
                                            <Link to="/about-us/who-we-are" className="text-black" onClick={closeAllOffcanvas}>
                                                Who We Are
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/about-us/leadership-team" className="text-black" onClick={closeAllOffcanvas}>
                                                Leadership
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/about-us/project-portfolio" className="text-black" onClick={closeAllOffcanvas}>
                                                Project Portfolio
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>

                        {/* BUSINESS Submenu */}
                        <Offcanvas
                            show={activeSubmenu === "business"}
                            onHide={() => setActiveSubmenu(null)}
                            placement="end"
                            className="custom-off submenu-off"
                        >
                            <Offcanvas.Header className="justify-content-end m-0">
                                <button
                                    type="button"
                                    className="btn-clos text-reset custom-close"
                                    onClick={() => setActiveSubmenu(null)}
                                    aria-label="Close"
                                >
                                    <img src="assets/images/cross.svg" alt="" />
                                </button>
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                <div className="offcanvas-menu">
                                    <ul className="offcanvas-links w-75">
                                        <li>
                                            <Link to="/business/pre-development" className="text-black" onClick={closeAllOffcanvas}>
                                                Pre-Development EPC
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/business/epc-project" className="text-black" onClick={closeAllOffcanvas}>
                                                Turnkey EPC Projects
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/business/grid-infrastructure" className="text-black" onClick={closeAllOffcanvas}>
                                                Grid Infrastructure
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/business/independent-power-producer" className="text-black" onClick={closeAllOffcanvas}>
                                                Independent Power Producer
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                        {/* newsroom Submenu */}
                        <Offcanvas
                            show={activeSubmenu === "newsroom"}
                            onHide={() => setActiveSubmenu(null)}
                            placement="end"
                            className="custom-off submenu-off"
                        >
                            <Offcanvas.Header className="justify-content-end m-0">
                                <button
                                    type="button"
                                    className="btn-clos text-reset custom-close"
                                    onClick={() => setActiveSubmenu(null)}
                                    aria-label="Close"
                                >
                                    <img src="assets/images/cross.svg" alt="" />
                                </button>
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                <div className="offcanvas-menu">
                                    <ul className="offcanvas-links w-75">
                                        <li>
                                            <Link to="/press-release" className="text-black" onClick={closeAllOffcanvas}>
                                                Press Releases
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/media-coverages" className="text-black" onClick={closeAllOffcanvas}>
                                                Media Coverage
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/media-resources" className="text-black" onClick={closeAllOffcanvas}>
                                                Media Resources
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                        {/* resources Submenu */}
                        <Offcanvas
                            show={activeSubmenu === "resources"}
                            onHide={() => setActiveSubmenu(null)}
                            placement="end"
                            className="custom-off submenu-off"
                        >
                            <Offcanvas.Header className="justify-content-end m-0">
                                <button
                                    type="button"
                                    className="btn-clos text-reset custom-close"
                                    onClick={() => setActiveSubmenu(null)}
                                    aria-label="Close"
                                >
                                    <img src="assets/images/cross.svg" alt="" />
                                </button>
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                <div className="offcanvas-menu">
                                    <ul className="offcanvas-links w-75">
                                        <li>
                                            <Link to="/blogs" className="text-black" onClick={closeAllOffcanvas}>
                                                Blogs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/case-studies" className="text-black" onClick={closeAllOffcanvas}>
                                                Case Studies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/faqs" className="text-black" onClick={closeAllOffcanvas}>
                                                FAQs
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>

                    </div>
                </div>
            </div>
        </header>
    );
}
