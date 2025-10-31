import React, { useState, useEffect } from "react";
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormTextarea,
    CBreadcrumb,
    CBreadcrumbItem,
} from "@coreui/react";
import { cilArrowLeft } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { AppSidebar, AppFooter, AppHeader } from "../../../components/index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../../../../api/axiosInstance";
import API_PATH from "../../../../../api/apiPath";
import { toast } from "react-toastify";
import "../../../../admin2/scss/style.scss";
import "../../../../admin2/scss/examples.scss";
import "../../../../admin2/scss/custom.css";

export default function EditPressRelease() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [pressHeading, setPressHeading] = useState("");
    const [pressContent, setPressContent] = useState("");
    const [pressDate, setPressDate] = useState("");
    const [publication, setPublication] = useState("");
    const [pressImage, setPressImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    const [detailSubHeading, setDetailSubHeading] = useState("");
    const [detailBannerImage, setDetailBannerImage] = useState(null);
    const [previewDetailImage, setPreviewDetailImage] = useState("");

    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [twitter, setTwitter] = useState("");
    useEffect(() => {
        const fetchPressRelease = async () => {
            try {
                const response = await api.get(`/media-releases/get-media-releases/${id}`);
                if (response.data.success && response.data.pressRelease) {
                    const pr = response.data.pressRelease;

                    setPressHeading(pr.press_release_heading || "");
                    setPressContent(pr.press_release_content || "");
                    setPressDate(pr.press_release_date || "");
                    setPublication(pr.press_release_publication || "");
                    setDetailSubHeading(pr.detail_banner_subheading || "");
                    setFacebook(pr.social_media_link_facebook || "");
                    setInstagram(pr.social_media_link_instagram || "");
                    setLinkedin(pr.social_media_link_linkedin || "");
                    setTwitter(pr.social_media_link_twitter || "");

                    if (pr.press_release_picture) {
                        setPreviewImage(
                            `${API_PATH}/uploads/press-releases/${pr.press_release_picture}`
                        );
                    }
                    if (pr.detail_banner_image) {
                        setPreviewDetailImage(
                            `${API_PATH}/uploads/press-releases/${pr.detail_banner_image}`
                        );
                    }
                } else {
                    toast.error("Failed to load press release details");
                }
            } catch (error) {
                console.error("Error fetching press release:", error);
                toast.error("Error loading press release details");
            }
        };

        if (id) fetchPressRelease();
    }, [id]);

    // Image handlers
    const handlePressImageChange = (e) => {
        const file = e.target.files[0];
        setPressImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleDetailImageChange = (e) => {
        const file = e.target.files[0];
        setDetailBannerImage(file);
        setPreviewDetailImage(URL.createObjectURL(file));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        if (pressDate) {
            const formattedDate = new Date(pressDate).toISOString().split("T")[0];
            formData.append("press_release_date", formattedDate);
        }
        formData.append("press_release_heading", pressHeading);
        formData.append("press_release_content", pressContent);
        formData.append("press_release_publication", publication);
        formData.append("detail_banner_subheading", detailSubHeading);
        formData.append("social_media_link_facebook", facebook);
        formData.append("social_media_link_instagram", instagram);
        formData.append("social_media_link_linkedin", linkedin);
        formData.append("social_media_link_twitter", twitter);

        if (pressImage) formData.append("press_release_picture", pressImage);
        if (detailBannerImage) formData.append("detail_banner_image", detailBannerImage);

        try {
            const response = await api.put(`/media-releases/update-media-release/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                toast.success("Press release updated successfully!");
                setTimeout(() => navigate("/admin/media-release-list"), 1000);
            } else {
                toast.error(response.data.message || "Failed to update press release");
            }
        } catch (error) {
            console.error("Error updating press release:", error);
            toast.error("An error occurred while updating");
        }
    };

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    {/* Breadcrumb */}
                    <div className="row bg-white mx-1 mb-3 py-3 shadow-sm">
                        <div className="col-lg-12 d-flex align-items-center">
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className="text-decoration-none">
                                        Home
                                    </Link>{" "}
                                    / Edit Press Release
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/press-releases" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-3">
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            {/* Heading */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Press Release Heading"
                                    value={pressHeading}
                                    onChange={(e) => setPressHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Publication */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Publication Name"
                                    value={publication}
                                    onChange={(e) => setPublication(e.target.value)}
                                />
                            </CCol>

                            {/* Date */}
                            <CCol md={6}>
                                <CFormInput
                                    type="date"
                                    label="Press Release Date"
                                    value={pressDate ? pressDate.split("T")[0] : ""}
                                    onChange={(e) => setPressDate(e.target.value)}
                                    required
                                />

                            </CCol>

                            {/* Press Release Picture */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Press Release Picture"
                                    accept="image/*"
                                    onChange={handlePressImageChange}
                                />
                                {previewImage && (
                                    <div className="mt-2">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            style={{
                                                width: "120px",
                                                height: "80px",
                                                objectFit: "cover",
                                                borderRadius: "5px",
                                                border: "1px solid #ddd",
                                            }}
                                        />
                                    </div>
                                )}
                            </CCol>

                            {/* Detail Banner Subheading */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Detail Banner Subheading"
                                    value={detailSubHeading}
                                    onChange={(e) => setDetailSubHeading(e.target.value)}
                                />
                            </CCol>

                            {/* Detail Banner Image */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Detail Banner Image"
                                    accept="image/*"
                                    onChange={handleDetailImageChange}
                                />
                                {previewDetailImage && (
                                    <div className="mt-2">
                                        <img
                                            src={previewDetailImage}
                                            alt="Preview"
                                            style={{
                                                width: "120px",
                                                height: "80px",
                                                objectFit: "cover",
                                                borderRadius: "5px",
                                                border: "1px solid #ddd",
                                            }}
                                        />
                                    </div>
                                )}
                            </CCol>

                            {/* Content */}
                            <CCol md={12}>
                                <CFormTextarea
                                    type="text"
                                    label="Content"
                                    value={pressContent}
                                    onChange={(e) => setPressContent(e.target.value)}
                                />
                            </CCol>

                            {/* Social Links */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Facebook Link"
                                    value={facebook}
                                    onChange={(e) => setFacebook(e.target.value)}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Instagram Link"
                                    value={instagram}
                                    onChange={(e) => setInstagram(e.target.value)}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="LinkedIn Link"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Twitter Link"
                                    value={twitter}
                                    onChange={(e) => setTwitter(e.target.value)}
                                />
                            </CCol>

                            {/* Submit */}
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                    Update
                                </CButton>
                            </CCol>
                        </CForm>
                    </div>
                </div>
                <AppFooter />
            </div>
        </div >
    );
}
