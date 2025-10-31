import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CBreadcrumb,
    CBreadcrumbItem,
    CFormTextarea
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
    const [projectName, setProjectName] = useState('');
    const [locationName, setLocationName] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [status, setStatus] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/portfolio-overview/get-portfolio-overview/${id}`);
                if (response.data.success && response.data.banner) {
                    const banner = response.data.banner;
                    setSubHeading(banner.sub_heading || '');
                    setProjectName(banner.project_name || '');
                    setLocationName(banner.location || '');
                    setStatus(banner.status);
                    if (banner.image) {
                        setPreviewImage(`${API_PATH}/uploads/about-banners/${banner.image}`);
                    }
                } else {
                    toast.error('Failed to load banner details');
                }
            } catch (error) {
                console.error('Error fetching banner:', error);
                toast.error('Error loading banner details');
            }
        };
        if (id) fetchData();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('sub_heading', subHeading);
        formData.append('project_name', projectName);
        formData.append('location', locationName);
        formData.append('status', status);
        if (image) formData.append('image', image);

        try {
            const response = await api.put(`/portfolio-overview/update-portfolio-overview/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('About banner updated successfully!');
                setTimeout(() => navigate('/admin/portfolio-overview'), 1000);
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
                    {/* Breadcrumb */}
                    <div className="row bg-white mx-1 mb-3 py-3 shadow-sm">
                        <div className="col-lg-12 d-flex align-items-center">
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className="text-decoration-none">
                                        Home
                                    </Link> / Edit About Banner
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/about-banners" className="text-decoration-none">
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


                            {/* Project Name */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Project Name"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Location */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Location"
                                    value={locationName}
                                    onChange={(e) => setLocationName(e.target.value)}

                                />
                            </CCol>
                            {/* Sub Heading */}
                            <CCol md={12}>
                                <CFormTextarea
                                    type="text"
                                    label="Content"
                                    value={subHeading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>
                            {/* Image */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Update Image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {previewImage && (
                                    <div className="mt-2">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            style={{
                                                width: '120px',
                                                height: '80px',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                                border: '1px solid #ddd',
                                            }}
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
