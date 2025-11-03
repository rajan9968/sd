import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CBreadcrumb,
    CBreadcrumbItem,
} from '@coreui/react';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { AppSidebar, AppFooter, AppHeader } from '../../../../components/index';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../../../../../api/axiosInstance';
import API_PATH from '../../../../../../api/apiPath';

import { toast } from 'react-toastify';
import '../../../../../admin2/scss/style.scss';
import '../../../../../admin2/scss/examples.scss';
import '../../../../../admin2/scss/custom.css';

export default function EditAboutBanner() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [subHeading, setSubHeading] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // for new image preview
    const [status, setStatus] = useState(1);
    const [existingImage, setExistingImage] = useState('');

    useEffect(() => {
        // Fetch existing about banner details
        const fetchData = async () => {
            try {
                const response = await api.get(`/leadership/get-leadership-banner/${id}`);
                if (response.data.success && response.data.banner) {
                    const banner = response.data.banner;
                    setSubHeading(banner.sub_heading);
                    setStatus(banner.status);
                    setExistingImage(banner.banner_image);
                } else {
                    toast.error('Failed to load banner details');
                }
            } catch (error) {
                console.error('Error fetching banner:', error);
                toast.error('Error loading banner details');
            }
        };
        fetchData();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file)); // preview the new image
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('sub_heading', subHeading);
        formData.append('status', status);
        if (image) {
            formData.append('banner_image', image);
        }

        try {
            const response = await api.put(`/leadership/update-leadership-banner/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success('About banner updated successfully!');
                setTimeout(() => navigate('/admin/leadership'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to update banner');
            }
        } catch (error) {
            console.error('Error updating banner:', error);
            toast.error('An error occurred while updating');
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
                                    </Link>
                                    / Edit About Banner
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/about-banner" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-3">
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            {/* Sub Heading */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Sub Heading"
                                    value={subHeading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Banner Image */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Banner Image"
                                    onChange={handleImageChange}
                                />

                                {/* Show existing image */}
                                {existingImage && !previewImage && (
                                    <div className="mt-2">
                                        <p className="text-muted mb-1">Current Image:</p>
                                        <img
                                            src={`${API_PATH}/uploads/about-banners/${existingImage}`}
                                            alt="Current Banner"
                                            width="150"
                                            className="rounded shadow-sm"
                                        />
                                    </div>
                                )}

                                {/* Show preview of new image */}
                                {previewImage && (
                                    <div className="mt-2">
                                        <p className="text-muted mb-1">New Image Preview:</p>
                                        <img
                                            src={previewImage}
                                            alt="Preview Banner"
                                            width="150"
                                            className="rounded shadow-sm"
                                        />
                                    </div>
                                )}
                            </CCol>

                            {/* Status */}
                            <CCol md={6}>
                                <CFormSelect
                                    label="Status"
                                    value={status}
                                    onChange={(e) => setStatus(Number(e.target.value))}
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </CFormSelect>
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
        </div>
    );
}
