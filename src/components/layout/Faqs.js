import React, { useState, useEffect } from "react";
import Header from "../include/Header";
import Footer from '../include/Footer';
import Accordion from 'react-bootstrap/Accordion';
import api from "../../api/axiosInstance";
import API_PATH from "../../api/apiPath";


export default function Faqs() {
    const [banner, setBanner] = useState({
        image: "",
        subHeading: "",
    });
    const [faqList, setFaqList] = useState([]);
    const [activeKey, setActiveKey] = useState(null);

    const handleToggle = (key) => {
        setActiveKey(activeKey === key ? null : key);
    };

    // Split FAQs into two columns
    const half = Math.ceil(faqList.length / 2);
    const firstColumn = faqList.slice(0, half);
    const secondColumn = faqList.slice(half);
    useEffect(() => {
        const fetchFaqBanner = async () => {
            try {
                const response = await api.get("/faqs/getallfaqs-banner");
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
        const fetchFaqs = async () => {
            try {
                const response = await api.get("/faqs-questions/get-faqs-questions");

                if (response.data.success && Array.isArray(response.data.banners)) {
                    setFaqList(response.data.banners);
                }
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            }
        };

        fetchFaqs();
    }, []);

    return (
        <div>
            <Header />
            <main>
                <section className="leadership-banner position-relative wings-top-section">
                    <img
                        src={banner.image || "/assets/images/assets/images/faq-banner.png"}
                        alt="awards"
                        className="img-fluid desktop-banner"
                        srcSet=""
                    />
                    <div className="container-fluid plr">
                        <div className="leadership-banner-caption">
                            <h2>Our FAQs
                                <br></br>
                                <span>{banner.subHeading}</span>
                            </h2>
                            <ul className="path-women-empow">
                                <li>
                                    <a href="index.php">Home</a>

                                </li>
                                <li className="text-white">/</li>
                                <li>
                                    <a href="#">FAQs</a>
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
                                    <h2 className="section-title">FAQs</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {/* Left Column */}
                            <div className="col-lg-6">
                                <Accordion activeKey={activeKey}>
                                    {firstColumn.map((faq, index) => (
                                        <Accordion.Item key={faq.id} eventKey={String(index)}>
                                            <Accordion.Header onClick={() => handleToggle(String(index))}>
                                                {faq.sub_heading}
                                            </Accordion.Header>
                                            <Accordion.Body>{faq.content}</Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </div>

                            {/* Right Column */}
                            <div className="col-lg-6">
                                <Accordion activeKey={activeKey}>
                                    {secondColumn.map((faq, index) => {
                                        const actualIndex = index + half;
                                        return (
                                            <Accordion.Item key={faq.id} eventKey={String(actualIndex)}>
                                                <Accordion.Header onClick={() => handleToggle(String(actualIndex))}>
                                                    {faq.sub_heading}
                                                </Accordion.Header>
                                                <Accordion.Body>{faq.content}</Accordion.Body>
                                            </Accordion.Item>
                                        );
                                    })}
                                </Accordion>
                            </div>
                        </div>

                    </div>
                </section>



            </main>
            <Footer />
        </div>
    )
}
