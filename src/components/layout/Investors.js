import React, { useState } from "react";
import Header from "../include/Header";
import Footer from "../include/Footer";
import { Table, Form, Pagination } from "react-bootstrap"; // ✅ include Pagination here
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination as SwiperPagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

export default function Investors() {

    const newsData = [
        {
            text: "Financial Performance",
        },
        {
            text: "Financial Performance",
        },
        {
            text: "Financial Performance",
        },
        {
            text: "Financial Performance",
        },
        {
            text: "Financial Performance",
        },
        {
            text: "Financial Performance",
        },
    ];
    const newsData2 = [
        {
            text: "Annual Reports",
        },
        {
            text: "Annual Reports",
        },
        {
            text: "Annual Reports",
        },
        {
            text: "Annual Reports",
        },
        {
            text: "Annual Reports",
        },
        {
            text: "Annual Reports",
        },
    ];
    // 🧾 Demo data
    const demo = [
        { name: "Financial Report Q1", email: "finance@vgigroup.co.in", status: "Active" },
        { name: "Annual Meeting 2025", email: "meet@vgigroup.co.in", status: "Pending" },
        { name: "Dividend Update", email: "dividend@vgigroup.co.in", status: "Inactive" },
        { name: "Corporate Governance", email: "corp@vgigroup.co.in", status: "Active" },
        { name: "Shareholder Notice", email: "share@vgigroup.co.in", status: "Pending" },
        { name: "Investor Presentation", email: "invest@vgigroup.co.in", status: "Active" },
        { name: "Market Analysis", email: "market@vgigroup.co.in", status: "Inactive" },
        { name: "Quarterly Earnings", email: "earnings@vgigroup.co.in", status: "Active" },
        { name: "Press Release", email: "press@vgigroup.co.in", status: "Pending" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
        { name: "Audit Report", email: "audit@vgigroup.co.in", status: "Active" },
    ];

    // ✅ States
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // 🔍 Filter + Search logic
    const filteredData = demo.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || item.status === filter;
        return matchesSearch && matchesFilter;
    });

    // 📄 Pagination logic
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    return (
        <div>
            <Header />
            <main>
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src="assets/images/investor-banner.png"
                        alt="awards"
                        className="img-fluid desktop-banner"
                        srcSet=""
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2>Investors</h2>
                            <ul className="path-women-empow">
                                <li>
                                    <a href="index.php">Home</a>
                                </li>
                                <li className="text-white">/</li>
                                <li>
                                    <a href="#">Investors</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="what-new investors-section py-5 bg-white">
                    <div className="container-fluid plr">
                        <div id="new-filter" className="mt-5" style={{ position: "relative" }}>
                            {/* Custom Navigation Buttons */}
                            <div className="swiper-button-prev new-prev"></div>
                            <div className="swiper-button-next new-next"></div>

                            <Swiper
                                className="news-swiper"
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={3}
                                navigation={{
                                    prevEl: ".new-prev",
                                    nextEl: ".new-next",
                                }}
                                loop={true}
                                autoplay={{ delay: 3000 }}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 5 },
                                }}
                            >
                                {newsData.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div>
                                            <p>{item.text}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div id="second-filter" className="second-filter mt-5" style={{ position: "relative" }}>
                            {/* Custom Navigation Buttons */}
                            <div className="swiper-button-prev second-prev"></div>
                            <div className="swiper-button-next second-next"></div>

                            <Swiper
                                className="news-swiper"
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={3}
                                navigation={{
                                    prevEl: ".second-prev",
                                    nextEl: ".second-next",
                                }}
                                loop={true}
                                // autoplay={{ delay: 3000 }}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 5 },
                                }}
                            >
                                {newsData2.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <Link>
                                            <div className="filterLink">
                                                {item.text}
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                    </div>
                </section>
                <section className="bg-white">
                    <div className="container-fluid plr">

                        <div className="custom-table-container">
                            <div className="row mb-3">
                                <div className="col-lg-6">
                                    <label className="pb-1">Year</label>
                                    <Form.Select
                                        className="search-bar"
                                        value={filter}
                                        onChange={(e) => {
                                            setFilter(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <option value="All">Selact All</option>
                                        <option value="Active">FY 2022-2023</option>
                                        <option value="Active">FY 2022-2023</option>
                                        <option value="Active">FY 2022-2023</option>
                                        <option value="Active">FY 2022-2023</option>
                                        <option value="Active">FY 2022-2023</option>
                                        <option value="Active">FY 2022-2023</option>

                                    </Form.Select>
                                </div>
                                <div className="col-lg-6 d-flex justify-content-end">
                                    <div>
                                        <label className="pb-1"></label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search by name..."
                                            className="search-bar"
                                            value={search}
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 📋 Table */}
                            <Table hover responsive className="custom-table">
                                <thead>
                                    <tr>
                                        <th colSpan="4" className="text-start">Title</th>
                                        <th className="text-start">Year</th>
                                        <th className="text-start">Download</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentRows.length > 0 ? (
                                        currentRows.map((item, index) => (
                                            <tr key={index}>
                                                <td colspan="4" style={{ width: "70%" }}>{item.name}</td>

                                                <td>{2025 - index}</td>

                                                {/* 1 column for “Download” */}
                                                <td>
                                                    <Link className="text-black">
                                                        Link</Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">No data found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>


                            {/* 🔢 Pagination */}

                            <Pagination className="custom-pagination">
                                <div> <p>Showing 1-20 of 20 items</p></div>
                                <div className="d-flex gap-2"> <Pagination.Prev
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                />
                                    {[...Array(totalPages)].map((_, i) => (
                                        <Pagination.Item
                                            key={i + 1}
                                            active={i + 1 === currentPage}
                                            onClick={() => setCurrentPage(i + 1)}
                                        >
                                            {i + 1}
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    /></div>
                            </Pagination>

                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
