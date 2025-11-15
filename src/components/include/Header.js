import React, { useState, useEffect, useRef } from "react";
import { Offcanvas } from "react-bootstrap";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Your website pages data
    const pages = [
        { title: 'Who We Are', url: '/about-us/who-we-are', category: 'About Us' },
        { title: 'Leadership Team', url: '/about-us/leadership-team', category: 'About Us' },
        { title: 'Project Portfolio', url: '/about-us/project-portfolio', category: 'About Us' },
        { title: 'Pre-Development EPC', url: '/business/pre-development', category: 'Business' },
        { title: 'Turnkey EPC Projects', url: '/business/epc-project', category: 'Business' },
        { title: 'Grid Infrastructure', url: '/business/grid-infrastructure', category: 'Business' },
        { title: 'Independent Power Producer', url: '/business/independent-power-producer', category: 'Business' },
        { title: 'Culture', url: '/culture', category: 'Culture' },
        { title: 'Careers', url: '/careers', category: 'Careers' },
        { title: 'Contact Us', url: '/contact-us', category: 'Contact' },
    ];

    // Filter pages based on search query
    const filteredPages = searchQuery.trim()
        ? pages.filter(page =>
            page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            page.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const handlePageClick = (url) => {
        // Navigate to page - replace with your router navigation
        console.log('Navigate to:', url);
        window.location.href = url;
        setIsOpen(false);
        setSearchQuery('');
    };

    const handleClose = () => {
        setIsOpen(false);
        setSearchQuery('');
    };

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

                                    {/* Search Icon - Always visible, no layout shift */}
                                    <li>
                                        <button
                                            onClick={() => setIsOpen(true)}
                                            className="p-2 hover:opacity-80 transition-opacity"
                                            aria-label="Open search"
                                            style={{
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                fill="#fff"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                            </svg>
                                        </button>
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

                                {/* Search Overlay - Positioned absolutely, doesn't affect layout */}
                                {isOpen && (
                                    <div
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                            zIndex: 9999,
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                            paddingTop: '100px',
                                            animation: 'fadeIn 0.3s ease-in-out',
                                            overflowY: 'auto'
                                        }}
                                        onClick={handleClose}
                                    >
                                        <div
                                            style={{
                                                position: 'relative',
                                                width: '90%',
                                                maxWidth: '700px',
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Search Input */}
                                            <div style={{ position: 'relative' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Search pages..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    autoFocus
                                                    style={{
                                                        width: '100%',
                                                        padding: '18px 60px 18px 24px',
                                                        fontSize: '18px',
                                                        border: '2px solid #fff',
                                                        borderRadius: '12px',
                                                        outline: 'none',
                                                        backgroundColor: '#fff',
                                                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                                                    }}
                                                />
                                                <button
                                                    onClick={handleClose}
                                                    aria-label="Close search"
                                                    style={{
                                                        position: 'absolute',
                                                        right: '15px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        padding: '8px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="#666"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Suggestions Dropdown */}
                                            {searchQuery.trim() && (
                                                <div
                                                    style={{
                                                        marginTop: '12px',
                                                        backgroundColor: '#fff',
                                                        borderRadius: '12px',
                                                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                                                        maxHeight: '400px',
                                                        overflowY: 'auto',
                                                        animation: 'slideDown 0.2s ease-out'
                                                    }}
                                                >
                                                    {filteredPages.length > 0 ? (
                                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                            {filteredPages.map((page, index) => (
                                                                <li
                                                                    key={index}
                                                                    onClick={() => handlePageClick(page.url)}
                                                                    style={{
                                                                        padding: '16px 24px',
                                                                        borderBottom: index < filteredPages.length - 1 ? '1px solid #f0f0f0' : 'none',
                                                                        cursor: 'pointer',
                                                                        transition: 'background-color 0.2s',
                                                                    }}
                                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                                >
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="18"
                                                                            height="18"
                                                                            fill="#666"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                                                                            <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z" />
                                                                        </svg>
                                                                        <div style={{ flex: 1 }}>
                                                                            <div style={{
                                                                                fontWeight: '600',
                                                                                color: '#333',
                                                                                fontSize: '16px',
                                                                                marginBottom: '4px'
                                                                            }}>
                                                                                {page.title}
                                                                            </div>
                                                                            <div style={{
                                                                                fontSize: '13px',
                                                                                color: '#888'
                                                                            }}>
                                                                                {page.category} • {page.url}
                                                                            </div>
                                                                        </div>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="16"
                                                                            height="16"
                                                                            fill="#999"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                                        </svg>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <div style={{
                                                            padding: '40px 24px',
                                                            textAlign: 'center',
                                                            color: '#999'
                                                        }}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="48"
                                                                height="48"
                                                                fill="#ddd"
                                                                viewBox="0 0 16 16"
                                                                style={{ marginBottom: '16px' }}
                                                            >
                                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                            </svg>
                                                            <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                                                No results found
                                                            </div>
                                                            <div style={{ fontSize: '14px', marginTop: '8px' }}>
                                                                Try searching for something else
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <style>{`
                                    @keyframes fadeIn {
                                    from { opacity: 0; }
                                    to { opacity: 1; }
                                    }
                                    @keyframes slideDown {
                                    from { 
                                        opacity: 0;
                                        transform: translateY(-10px);
                                    }
                                    to { 
                                        opacity: 1;
                                        transform: translateY(0);
                                    }
                                    }
                                `}</style>


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
                                        {/*<li>
                                            <div className="menu-li d-flex align-items-center justify-content-between">
                                                <Link to="/investors" onClick={closeAllOffcanvas}>
                                                    Investors
                                                </Link>
                                            </div>
                                        </li> */}
                                        <li>
                                            <div className="menu-li d-flex align-items-center justify-content-between">
                                                <Link to="/newsroom" onClick={closeAllOffcanvas}>
                                                    Newsroom
                                                </Link>
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
                                            <a href="https://www.facebook.com/share/162UfiWyhq/?mibextid=wwXIfr" aria-label="Facebook">
                                                <i className="fa fa-facebook-f custom-fa" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://x.com/DattaPowerInfra" aria-label="Twitter">
                                                <i className="bi bi-twitter-x custom-fa" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/company/datta-power-infra/posts/?feedView=all" aria-label="LinkedIn">
                                                <i className="fa fa-linkedin custom-fa" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/dattainfra/" aria-label="Instagram">
                                                <i className="fa fa-instagram custom-fa" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://youtube.com/@dattapowerinfra?si=O4eVtLD4h48BLO4f" aria-label="YouTube">
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
                                    <FaX className="fax-icon" />
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
                                    <FaX className="fax-icon" />
                                </button>
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                <div className="offcanvas-menu">
                                    <ul className="offcanvas-links w-75">
                                        <li>
                                            <Link to="/business/pre-development-epc" className="text-black" onClick={closeAllOffcanvas}>
                                                Pre-Development EPC
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/business/turnkey-epc-projects" className="text-black" onClick={closeAllOffcanvas}>
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
                                    <FaX className="fax-icon" />
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
                                    <FaX className="fax-icon" />
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
