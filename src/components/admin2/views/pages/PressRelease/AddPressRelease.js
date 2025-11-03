import React, { useState } from 'react';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormTextarea,
    CFormSelect,
    CBreadcrumb,
    CBreadcrumbItem,
} from '@coreui/react';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../../api/axiosInstance';
import { toast } from 'react-toastify';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import '../../../../admin2/scss/style.scss';
import '../../../../admin2/scss/examples.scss';
import '../../../../admin2/scss/custom.css';

export default function AddPressRelease() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        press_release_heading: '',
        press_release_date: '',
        press_release_content: '',
        press_release_publication: '',
        detail_banner_subheading: '',
        social_media_link_facebook: '',
        social_media_link_instagram: '',
        social_media_link_linkedin: '',
        social_media_link_twitter: '',
    });

    const [press_release_picture, setPressReleasePicture] = useState(null);
    const [detail_banner_image, setDetailBannerImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.press_release_heading.trim()) {
            toast.error('Please enter press release heading');
            return;
        }

        if (!press_release_picture) {
            toast.error('Please upload press release picture');
            return;
        }

        if (!formData.press_release_date) {
            toast.error('Please select release date');
            return;
        }

        const sendData = new FormData();
        for (const key in formData) {
            sendData.append(key, formData[key]);
        }
        sendData.append('press_release_picture', press_release_picture);
        if (detail_banner_image) sendData.append('detail_banner_image', detail_banner_image);

        try {
            const response = await api.post('/press-releases/add-press-release', sendData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Press release added successfully!');
                setTimeout(() => navigate('/admin/press-release-list'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to add press release');
            }
        } catch (error) {
            console.error('Error creating press release:', error);
            toast.error('An error occurred while adding the press release');
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
                                    </Link>{' '}
                                    / Add Press Release
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
                            {/* Press Release Picture */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Press Release Picture"
                                    accept="image/*"
                                    onChange={(e) => setPressReleasePicture(e.target.files[0])}
                                    required
                                />
                            </CCol>

                            {/* Heading */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    name="press_release_heading"
                                    label="Heading"
                                    placeholder="Enter press release heading"
                                    value={formData.press_release_heading}
                                    onChange={handleChange}
                                    required
                                />
                            </CCol>

                            {/* Date */}
                            <CCol md={6}>
                                <CFormInput
                                    type="date"
                                    name="press_release_date"
                                    label="Release Date"
                                    value={formData.press_release_date}
                                    onChange={handleChange}
                                    required
                                />
                            </CCol>

                            {/* Publication */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    name="press_release_publication"
                                    label="Publication"
                                    placeholder="Enter publication name"
                                    value={formData.press_release_publication}
                                    onChange={handleChange}
                                />
                            </CCol>

                            {/* Detail Banner Subheading */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    name="detail_banner_subheading"
                                    label="Detail Banner Subheading"
                                    placeholder="Enter subheading"
                                    value={formData.detail_banner_subheading}
                                    onChange={handleChange}
                                />
                            </CCol>

                            {/* Detail Banner Image */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Detail Banner Image"
                                    accept="image/*"
                                    onChange={(e) => setDetailBannerImage(e.target.files[0])}
                                />
                            </CCol>
                            <CCol md={12}>
                                <CFormTextarea
                                    type="text"
                                    label="Content"
                                    name="press_release_content"
                                    value={formData.press_release_content}
                                    onChange={handleChange}
                                />
                            </CCol>

                            {/* Social Media Links */}
                            <CCol md={6}>
                                <CFormInput
                                    type="url"
                                    name="social_media_link_facebook"
                                    label="Facebook Link"
                                    placeholder="Enter Facebook URL"
                                    value={formData.social_media_link_facebook}
                                    onChange={handleChange}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type="url"
                                    name="social_media_link_instagram"
                                    label="Instagram Link"
                                    placeholder="Enter Instagram URL"
                                    value={formData.social_media_link_instagram}
                                    onChange={handleChange}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type="url"
                                    name="social_media_link_linkedin"
                                    label="LinkedIn Link"
                                    placeholder="Enter LinkedIn URL"
                                    value={formData.social_media_link_linkedin}
                                    onChange={handleChange}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type="url"
                                    name="social_media_link_twitter"
                                    label="Twitter Link"
                                    placeholder="Enter Twitter URL"
                                    value={formData.social_media_link_twitter}
                                    onChange={handleChange}
                                />
                            </CCol>

                            {/* Submit Button */}
                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
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
