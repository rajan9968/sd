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
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../../api/axiosInstance';
import { toast } from 'react-toastify';
import '../../../../admin2/scss/style.scss';
import '../../../../admin2/scss/examples.scss';
import '../../../../admin2/scss/custom.css';

export default function AddBlogDetail() {
    const navigate = useNavigate();

    // State
    const [subHeading, setSubHeading] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [innerImage, setInnerImage] = useState(null);
    const [content, setContent] = useState('');
    const [blogDate, setBlogDate] = useState('');
    const [status, setStatus] = useState('active');

    // Submit Handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subHeading.trim()) {
            toast.error('Please enter a sub heading');
            return;
        }
        if (!bannerImage) {
            toast.error('Please select a banner image');
            return;
        }
        if (!content.trim()) {
            toast.error('Please enter blog content');
            return;
        }
        if (!blogDate) {
            toast.error('Please select a blog date');
            return;
        }

        const formData = new FormData();
        formData.append('sub_heading', subHeading);
        formData.append('banner_image', bannerImage);
        formData.append('blog_inner_image', innerImage);
        formData.append('content', content);
        formData.append('blog_date', blogDate);
        formData.append('status', status);

        try {
            const response = await api.post('/case-studies/add-case-study', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Case Study added successfully!');
            setTimeout(() => navigate('/admin/case-studies-list'), 1000);
        } catch (error) {
            console.error('Error adding case study:', error);
            toast.error(error.response?.data?.message || 'Failed to add case study');
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
                                    </Link>
                                    / Add Case Study
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back button */}
                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/blog-list" className="text-decoration-none">
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
                            {/* Sub Heading */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Heading"
                                    placeholder="Enter sub heading"
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
                                    accept="image/*"
                                    onChange={(e) => setBannerImage(e.target.files[0])}
                                    required
                                />
                            </CCol>

                            {/* Inner Image */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Case Inner Image"
                                    accept="image/*"
                                    onChange={(e) => setInnerImage(e.target.files[0])}
                                />
                            </CCol>

                            {/* Blog Date */}
                            <CCol md={6}>
                                <CFormInput
                                    type="date"
                                    label="Case Date"
                                    value={blogDate}
                                    onChange={(e) => setBlogDate(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Content */}
                            <CCol xs={12}>
                                <CFormTextarea
                                    label="Case  Content"
                                    rows="6"
                                    placeholder="Enter case content..."
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
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </CFormSelect>
                            </CCol>

                            {/* Submit */}
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
