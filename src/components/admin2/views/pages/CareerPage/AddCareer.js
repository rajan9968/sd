import React, { useState } from "react";
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormTextarea,
    CBreadcrumb,
    CBreadcrumbItem,
    CCard,
    CCardBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft, cilTrash, cilPlus } from "@coreui/icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../../api/axiosInstance";
import {
    AppContent,
    AppSidebar,
    AppFooter,
    AppHeader,
} from "../../../components/index";
import "../../../../admin2/scss/style.scss";
import "../../../../admin2/scss/examples.scss";
import "../../../../admin2/scss/custom.css";

export default function AddCareer() {
    const navigate = useNavigate();

    const [bannerSubHeading, setBannerSubHeading] = useState("");
    const [bannerImage, setBannerImage] = useState(null);

    const [whyJoin, setWhyJoin] = useState([
        { icon: null, heading: "", text: "" },
    ]);

    const [keyHighlights, setKeyHighlights] = useState([
        { number: "", text: "" },
    ]);

    const [employeeTestimonials, setEmployeeTestimonials] = useState([
        { video: "" },
    ]);

    // ✅ Add / Remove Functions
    const addWhyJoin = () =>
        setWhyJoin([...whyJoin, { icon: null, heading: "", text: "" }]);
    const removeWhyJoin = (index) =>
        setWhyJoin(whyJoin.filter((_, i) => i !== index));

    const addKeyHighlight = () =>
        setKeyHighlights([...keyHighlights, { number: "", text: "" }]);
    const removeKeyHighlight = (index) =>
        setKeyHighlights(keyHighlights.filter((_, i) => i !== index));

    const addEmployeeTestimonial = () =>
        setEmployeeTestimonials([...employeeTestimonials, { video: "" }]);
    const removeEmployeeTestimonial = (index) =>
        setEmployeeTestimonials(employeeTestimonials.filter((_, i) => i !== index));

    // ✅ Submit Handler with Icon Upload Support
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bannerSubHeading.trim()) {
            toast.error("Please enter banner sub-heading");
            return;
        }

        const formData = new FormData();
        formData.append("banner_sub_heading", bannerSubHeading);

        // Add banner image
        if (bannerImage) {
            formData.append("banner_image", bannerImage);
        }

        // Add why_join icons and data
        whyJoin.forEach((item, index) => {
            if (item.icon instanceof File) {
                formData.append(`why_join_icons`, item.icon); // Use array notation
                formData.append(`why_join_icon_index_${index}`, index); // Track which index
            }
            formData.append(`why_join_heading_${index}`, item.heading);
            formData.append(`why_join_text_${index}`, item.text);
        });
        formData.append("why_join_count", whyJoin.length);

        // Add key highlights
        formData.append("key_highlights", JSON.stringify(keyHighlights));

        // Add employee testimonials
        formData.append("employee_testimonials", JSON.stringify(employeeTestimonials));

        try {
            const response = await api.post("/careers-data/add-admin-career", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                toast.success("Career data added successfully!");
                navigate("/admin/careers-list");
            } else {
                toast.error(response.data.message || "Failed to save data");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error while saving data");
        }
    };
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    <div className="row bg-white mx-1 mb-3 py-3 shadow-sm">
                        <div className="col-lg-12 d-flex align-items-center">
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className="text-decoration-none">
                                        Home
                                    </Link>{" "}
                                    / Add Career
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    <div className="bg-white p-3">
                        <CForm onSubmit={handleSubmit} className="row g-3">
                            {/* Banner Sub Heading */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Banner Sub Heading"
                                    value={bannerSubHeading}
                                    onChange={(e) => setBannerSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Banner Image */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Banner Image"
                                    accept="image/*"
                                    onChange={(e) => setBannerImage(e.target.files[0])}
                                    required
                                />
                            </CCol>

                            {/* WHY JOIN */}
                            <CCol xs={12}>
                                <h5 className="mt-3">Why Join Us</h5>
                                {whyJoin.map((item, index) => (
                                    <CCard className="mb-3" key={index}>
                                        <CCardBody>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6>Item {index + 1}</h6>
                                                {whyJoin.length > 1 && (
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        onClick={() => removeWhyJoin(index)}
                                                    >
                                                        <CIcon icon={cilTrash} /> Remove
                                                    </CButton>
                                                )}
                                            </div>

                                            <CFormInput
                                                type="file"
                                                label="Icon"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const updated = [...whyJoin];
                                                    updated[index].icon = e.target.files[0];
                                                    setWhyJoin(updated);
                                                }}
                                            />
                                            <CFormInput
                                                type="text"
                                                label="Heading"
                                                value={item.heading}
                                                onChange={(e) => {
                                                    const updated = [...whyJoin];
                                                    updated[index].heading = e.target.value;
                                                    setWhyJoin(updated);
                                                }}
                                            />
                                            <CFormTextarea
                                                label="Text"
                                                value={item.text}
                                                onChange={(e) => {
                                                    const updated = [...whyJoin];
                                                    updated[index].text = e.target.value;
                                                    setWhyJoin(updated);
                                                }}
                                            />
                                        </CCardBody>
                                    </CCard>
                                ))}
                                <CButton color="primary" onClick={addWhyJoin}>
                                    <CIcon icon={cilPlus} /> Add Why Join
                                </CButton>
                            </CCol>

                            {/* KEY HIGHLIGHTS */}
                            <CCol xs={12}>
                                <h5 className="mt-3">Key Highlights</h5>
                                {keyHighlights.map((item, index) => (
                                    <CCard className="mb-3" key={index}>
                                        <CCardBody>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6>Highlight {index + 1}</h6>
                                                {keyHighlights.length > 1 && (
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        onClick={() => removeKeyHighlight(index)}
                                                    >
                                                        <CIcon icon={cilTrash} /> Remove
                                                    </CButton>
                                                )}
                                            </div>

                                            <CFormInput
                                                type="text"
                                                label="Number"
                                                value={item.number}
                                                onChange={(e) => {
                                                    const updated = [...keyHighlights];
                                                    updated[index].number = e.target.value;
                                                    setKeyHighlights(updated);
                                                }}
                                            />
                                            <CFormInput
                                                type="text"
                                                label="Text"
                                                value={item.text}
                                                onChange={(e) => {
                                                    const updated = [...keyHighlights];
                                                    updated[index].text = e.target.value;
                                                    setKeyHighlights(updated);
                                                }}
                                            />
                                        </CCardBody>
                                    </CCard>
                                ))}
                                <CButton color="primary" onClick={addKeyHighlight}>
                                    <CIcon icon={cilPlus} /> Add Key Highlight
                                </CButton>
                            </CCol>

                            {/* EMPLOYEE TESTIMONIALS */}
                            <CCol xs={12}>
                                <h5 className="mt-3">Employee Testimonials</h5>
                                {employeeTestimonials.map((item, index) => (
                                    <CCard className="mb-3" key={index}>
                                        <CCardBody>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6>Video {index + 1}</h6>
                                                {employeeTestimonials.length > 1 && (
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        onClick={() => removeEmployeeTestimonial(index)}
                                                    >
                                                        <CIcon icon={cilTrash} /> Remove
                                                    </CButton>
                                                )}
                                            </div>

                                            <CFormInput
                                                type="text"
                                                label="Video URL"
                                                placeholder="Enter video URL or path"
                                                value={item.video}
                                                onChange={(e) => {
                                                    const updated = [...employeeTestimonials];
                                                    updated[index].video = e.target.value;
                                                    setEmployeeTestimonials(updated);
                                                }}
                                            />
                                        </CCardBody>
                                    </CCard>
                                ))}
                                <CButton color="primary" onClick={addEmployeeTestimonial}>
                                    <CIcon icon={cilPlus} /> Add Video
                                </CButton>
                            </CCol>

                            {/* Submit */}
                            <CCol xs={12}>
                                <CButton color="success" type="submit">
                                    Submit
                                </CButton>
                            </CCol>
                        </CForm>
                    </div>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
