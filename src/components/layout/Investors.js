import React, { useState, useEffect } from "react";
import Header from "../include/Header";
import Footer from "../include/Footer";
import { Table, Form, Pagination } from "react-bootstrap"; // ✅ include Pagination here
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination as SwiperPagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";
import { Link } from "react-router-dom";


export default function Investors() {
    // const [categories, setCategories] = useState([]);
    // const [subCatNames, setSubCatNames] = useState([]);
    // const [allSubCats, setAllSubCats] = useState([]);
    // const [selectedCatId, setSelectedCatId] = useState("all");
    // useEffect(() => {
    //     const fetchInvestorData = async () => {
    //         try {
    //             const response = await api.get("/investor/get-investor");
    //             if (response.data.success) {
    //                 const data = response.data.subCategories;

    //                 // Step 1: Get unique cat_ids from investors
    //                 const uniqueCatIds = [...new Set(data.map(item => item.cat_id))];

    //                 // Step 2: Fetch all subcategories based on investor cat_ids
    //                 const subCategoryPromises = uniqueCatIds.map(id =>
    //                     api.get(`http://localhost:50000/sub-cat/get-category/${id}`)
    //                 );

    //                 const subCategoryResponses = await Promise.all(subCategoryPromises);

    //                 // Extract subcategory data and their cat_ids
    //                 const allSubCategories = subCategoryResponses.flatMap(res =>
    //                     Array.isArray(res.data.banner) ? res.data.banner : [res.data.banner]
    //                 );

    //                 setSubCatNames(allSubCategories);

    //                 // Step 3: Get unique cat_ids from subcategories
    //                 const categoryIds = [...new Set(allSubCategories.map(subCat => subCat.cat_id))];

    //                 // Step 4: Fetch main categories based on subcategory cat_ids
    //                 const categoryPromises = categoryIds.map(id =>
    //                     api.get(`http://localhost:50000/cat/get-category/${id}`)
    //                 );

    //                 const categoryResponses = await Promise.all(categoryPromises);

    //                 // Extract category data
    //                 const allCategories = categoryResponses.flatMap(res =>
    //                     Array.isArray(res.data.banner) ? res.data.banner : [res.data.banner]
    //                 );

    //                 setCategories(allCategories);
    //                 setAllSubCats(allCategories);

    //                 console.log("✅ Main Categories:", allCategories);
    //                 console.log("✅ Subcategories:", allSubCategories);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchInvestorData();
    // }, []);

    const [categories, setCategories] = useState([]);
    const [subCatNames, setSubCatNames] = useState([]);
    const [allSubCats, setAllSubCats] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
    const [investorData, setInvestorData] = useState([]); // All investor data
    const [filteredInvestorData, setFilteredInvestorData] = useState([]); // Filtered data
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchInvestorData = async () => {
            try {
                const response = await api.get("/investor/get-investor");
                if (response.data.success) {
                    const data = response.data.subCategories;

                    // Store investor data
                    setInvestorData(data);
                    setFilteredInvestorData(data); // Initially show all

                    // Step 1: Get unique cat_ids from investors
                    const uniqueCatIds = [...new Set(data.map(item => item.cat_id))];

                    // Step 2: Fetch all subcategories based on investor cat_ids
                    const subCategoryPromises = uniqueCatIds.map(id =>
                        api.get(`/sub-cat/get-category/${id}`)
                    );

                    const subCategoryResponses = await Promise.all(subCategoryPromises);

                    // Extract subcategory data and their cat_ids
                    const allSubCategories = subCategoryResponses.flatMap((res, idx) => {
                        const subs = Array.isArray(res.data.banner) ? res.data.banner : [res.data.banner];
                        return subs.map(sub => ({
                            ...sub,
                            cat_id: sub.cat_id || uniqueCatIds[idx]
                        }));
                    });

                    setSubCatNames(allSubCategories);
                    setAllSubCats(allSubCategories);

                    // Step 3: Get unique cat_ids from subcategories
                    const categoryIds = [...new Set(allSubCategories.map(subCat => subCat.cat_id))];

                    // Step 4: Fetch main categories based on subcategory cat_ids
                    const categoryPromises = categoryIds.map(id =>
                        api.get(`/cat/get-category/${id}`)
                    );

                    const categoryResponses = await Promise.all(categoryPromises);

                    // Extract category data with proper ID mapping
                    const allCategories = categoryResponses.flatMap((res, idx) => {
                        const cats = Array.isArray(res.data.banner) ? res.data.banner : [res.data.banner];
                        return cats.map(cat => ({
                            ...cat,
                            id: cat.id || categoryIds[idx]
                        }));
                    });

                    setCategories(allCategories);

                    // console.log("✅ Main Categories:", allCategories);
                    // console.log("✅ Subcategories:", allSubCategories);
                    // console.log("✅ Investor Data:", data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchInvestorData();
    }, []);

    // Handle category click - filters both subcategories and table data
    const handleCategoryClick = (categoryId) => {
        console.log("🔍 Clicked Category ID:", categoryId);
        setCurrentPage(1); // Reset pagination

        if (selectedCategoryId === categoryId) {
            // Toggle off - show all
            setSelectedCategoryId(null);
            setSelectedSubCategoryId(null);
            setSubCatNames(allSubCats);
            setFilteredInvestorData(investorData);
            console.log("✅ Showing all data");
        } else {
            // Filter by category
            setSelectedCategoryId(categoryId);
            setSelectedSubCategoryId(null);

            // Filter subcategories by category
            const filteredSubs = allSubCats.filter(subCat => subCat.cat_id == categoryId);
            setSubCatNames(filteredSubs);

            // Filter investor data - show investors whose cat_id matches any of the filtered subcategory IDs
            const subCatIds = filteredSubs.map(sub => sub.id);
            const filteredData = investorData.filter(inv => subCatIds.includes(inv.cat_id));
            setFilteredInvestorData(filteredData);

            console.log("✅ Filtered Subcategories:", filteredSubs);
            console.log("✅ Filtered Investor Data:", filteredData);
        }
    };

    // Handle subcategory click - filters table to specific subcategory
    const handleSubCategoryClick = (subCategoryId) => {
        console.log("🔍 Clicked SubCategory ID:", subCategoryId);
        setCurrentPage(1); // Reset pagination

        if (selectedSubCategoryId === subCategoryId) {
            // Toggle off - show data for selected category or all
            setSelectedSubCategoryId(null);

            if (selectedCategoryId) {
                // Show all data for the selected category
                const filteredSubs = allSubCats.filter(subCat => subCat.cat_id == selectedCategoryId);
                const subCatIds = filteredSubs.map(sub => sub.id);
                const filteredData = investorData.filter(inv => subCatIds.includes(inv.cat_id));
                setFilteredInvestorData(filteredData);
            } else {
                setFilteredInvestorData(investorData);
            }
        } else {
            // Filter by specific subcategory
            setSelectedSubCategoryId(subCategoryId);
            const filteredData = investorData.filter(inv => inv.cat_id == subCategoryId);
            setFilteredInvestorData(filteredData);

            console.log("✅ Filtered by SubCategory:", filteredData);
        }
    };

    // Pagination
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredInvestorData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredInvestorData.length / rowsPerPage);
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
    // const [currentPage, setCurrentPage] = useState(1);
    // const rowsPerPage = 10;

    // 🔍 Filter + Search logic
    const filteredData = demo.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || item.status === filter;
        return matchesSearch && matchesFilter;
    });

    // 📄 Pagination logic
    // const indexOfLastRow = currentPage * rowsPerPage;
    // const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    // const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    // const totalPages = Math.ceil(filteredData.length / rowsPerPage);
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
                        {/* First Swiper - Main Categories */}
                        <div id="new-filter" className="mt-5" style={{ position: "relative" }}>
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
                                loop={categories.length > 3}
                                autoplay={{ delay: 3000 }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                        navigation: false,
                                    },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 5 },
                                }}
                            >
                                {categories.map((item, index) => (
                                    <SwiperSlide key={item.id || index}>
                                        <div
                                            onClick={() => handleCategoryClick(item.id)}
                                            style={{
                                                cursor: 'pointer',
                                                padding: '10px',
                                                backgroundColor: selectedCategoryId === item.id ? '#02A683' : 'transparent',
                                                color: selectedCategoryId === item.id ? '#fff' : 'inherit',
                                                borderRadius: '5px',
                                                transition: 'all 0.3s ease',
                                                marginBottom: '1em'
                                            }}
                                        >
                                            <p style={{ margin: 0 }}>{item.sub_heading}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Second Swiper - SubCategories */}
                        <div id="second-filter" className="second-filter mt-5" style={{ position: "relative" }}>
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
                                loop={subCatNames.length > 3}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    576: { slidesPerView: 2 },
                                    992: { slidesPerView: 5 },
                                }}
                            >
                                {subCatNames.map((item, index) => (
                                    <SwiperSlide key={item.id || index}>
                                        <div onClick={() => handleSubCategoryClick(item.id)}>
                                            <div
                                                className="filterLink"
                                                style={{
                                                    cursor: 'pointer',
                                                    padding: '10px',
                                                    backgroundColor: selectedSubCategoryId === item.id ? '#02A683' : 'transparent',
                                                    color: selectedSubCategoryId === item.id ? '#fff' : 'inherit',
                                                    borderRadius: '5px',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                {item.sub_heading}
                                            </div>
                                        </div>
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
                                <div className="col-lg-6 col-6">
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
                                <div className="col-lg-6 col-6 d-flex justify-content-end">
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
                                            <tr key={item.id || index}>
                                                <td colSpan="4" style={{ width: "70%" }}>{item.title}</td>
                                                <td>{new Date().getFullYear() - (indexOfFirstRow + index)}</td>
                                                <td>
                                                    <Link to={item.download_link || "#"} className="text-black">
                                                        Link
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-4">
                                                No data found for the selected filter
                                            </td>
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
