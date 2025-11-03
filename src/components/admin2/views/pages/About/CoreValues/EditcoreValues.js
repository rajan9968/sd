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

    const [content, setContent] = useState('');
    const [subHeading, setSubHeading] = useState('');
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const [bannerImage, setBannerImage] = useState('');

    const [previewImage, setPreviewImage] = useState('');
    const [status, setStatus] = useState(1);
    const [loading, setLoading] = useState(true);

    // Fetch existing banner details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/values/get-core-values/${id}`);
                if (response.data.success && response.data.banner) {
                    const banner = response.data.banner;
                    setSubHeading(banner.sub_heading || '');
                    setExistingImage(banner.banner_image || '');
                    setBannerImage(banner.banner_image || '');
                    setStatus(banner.status ?? 1);
                    setContent(banner.content || '');
                } else {
                    toast.error('Failed to load banner details');
                }
            } catch (error) {
                console.error('Error fetching banner:', error);
                toast.error('Error loading banner details');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('sub_heading', subHeading);
        formData.append('content', content);
        formData.append('status', status);
        formData.append('existing_image', existingImage);

        if (image) {
            formData.append('banner_image', image);
        }

        try {
            const response = await api.put(`/values/update-add-core-values/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Core Value updated successfully!');
                setTimeout(() => navigate('/admin/core-values'), 1000);
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
                                    / Edit Core Value
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/core-values" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-3">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
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
                                <CCol md={6}>
                                    <CFormInput
                                        type="file"
                                        label="Image Carousel"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </CCol>
                                {/* Banner Image Upload */}
                                <CCol md={6}>
                                    <label className="form-label">Old Image Carousel</label>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '110px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                            marginBottom: '10px',
                                            backgroundColor: '#f8f9fa',
                                        }}
                                    >
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Selected Banner"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : bannerImage ? (
                                            <img
                                                src={`${API_PATH}/uploads/our-culture/${bannerImage}`}
                                                alt="Current Banner"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </div>
                                </CCol>

                                {/* Content */}
                                <CCol md={12}>
                                    <CFormTextarea
                                        label="Content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
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

                                {/* Submit Button */}
                                <CCol xs={12}>
                                    <CButton color="primary" type="submit">
                                        Update
                                    </CButton>
                                </CCol>
                            </CForm>
                        )}
                    </div>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
