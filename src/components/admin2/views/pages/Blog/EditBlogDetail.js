import React, { useState, useEffect } from 'react';
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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../../../../api/axiosInstance';
import API_PATH from '../../../../../api/apiPath';
import { toast } from 'react-toastify';
import '../../../../admin2/scss/style.scss';
import '../../../../admin2/scss/examples.scss';
import '../../../../admin2/scss/custom.css';

export default function EditBlogDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {}; // passed from list page

    // States
    const [subHeading, setSubHeading] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [innerImage, setInnerImage] = useState(null);
    const [oldBanner, setOldBanner] = useState('');
    const [oldInner, setOldInner] = useState('');
    const [content, setContent] = useState('');
    const [blogDate, setBlogDate] = useState('');
    const [status, setStatus] = useState('active');

    // Fetch existing blog detail
    useEffect(() => {
        if (!id) {
            toast.error('No blog ID found!');
            navigate('/admin/blog-list');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await api.get(`/blog-detail/get-blog-detailid/${id}`);
                if (response.data && response.data.blog) {
                    const blog = response.data.blog;
                    setSubHeading(blog.sub_heading || '');
                    setContent(blog.content || '');
                    setBlogDate(blog.blog_date ? blog.blog_date.split('T')[0] : ''); // format date
                    setStatus(blog.status || 'active');
                    setOldBanner(blog.banner_image || '');
                    setOldInner(blog.blog_inner_image || '');
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                toast.error('Failed to load blog details');
            }

        };

        fetchData();
    }, [id, navigate]);

    // Handle update
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subHeading.trim()) {
            toast.error('Please enter a sub heading');
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
        formData.append('content', content);
        formData.append('blog_date', blogDate);
        formData.append('status', status);
        if (bannerImage) formData.append('banner_image', bannerImage);
        if (innerImage) formData.append('blog_inner_image', innerImage);

        try {
            await api.put(`/blog-detail/update-blog-detail/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Blog updated successfully!');
            setTimeout(() => navigate('/admin/blog-detail-list'), 1000);
        } catch (error) {
            console.error('Error updating blog:', error);
            toast.error(error.response?.data?.message || 'Failed to update blog');
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
                                    / Edit Blog Detail
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
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
                                    value={subHeading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Blog Date */}
                            <CCol md={6}>
                                <CFormInput
                                    type="date"
                                    label="Blog Date"
                                    value={blogDate}
                                    onChange={(e) => setBlogDate(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Banner Image */}
                            <CCol md={6}>
                                <label className="form-label">Banner Image</label>
                                {oldBanner && (
                                    <div className="mb-2">
                                        <img
                                            src={`${API_PATH}/uploads/blogs/${oldBanner}`}
                                            alt="banner"
                                            width="120"
                                            className="rounded mb-2"
                                        />
                                    </div>
                                )}
                                <CFormInput
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setBannerImage(e.target.files[0])}
                                />
                            </CCol>

                            {/* Inner Image */}
                            <CCol md={6}>
                                <label className="form-label">Blog Inner Image</label>
                                {oldInner && (
                                    <div className="mb-2">
                                        <img
                                            src={`${API_PATH}/uploads/blogs/${oldInner}`}
                                            alt="inner"
                                            width="120"
                                            className="rounded mb-2"
                                        />
                                    </div>
                                )}
                                <CFormInput
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setInnerImage(e.target.files[0])}
                                />
                            </CCol>

                            {/* Content */}
                            <CCol xs={12}>
                                <CFormTextarea
                                    label="Blog Content"
                                    rows="6"
                                    placeholder="Enter blog content..."
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
