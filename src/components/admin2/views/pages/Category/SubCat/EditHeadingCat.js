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
    const [categories, setCategories] = useState([]); // ✅ Missing earlier
    const [selectedCategory, setSelectedCategory] = useState('');
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/cat/get-category");
                if (res.data.success && Array.isArray(res.data.banners)) {
                    setCategories(res.data.banners);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        // Fetch existing about banner details
        const fetchData = async () => {
            try {
                const response = await api.get(`/sub-cat/get-category/${id}`);
                if (response.data.success && response.data.banner) {
                    const banner = response.data.banner;
                    setSubHeading(banner.sub_heading);
                    setStatus(banner.status);
                    setSelectedCategory(banner.cat_id);
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
        formData.append('cat_id', selectedCategory);
        formData.append('status', status);
        try {
            const response = await api.put(`/sub-cat/update-category/${id}`, formData);

            if (response.data.success) {
                toast.success('category updated successfully!');
                setTimeout(() => navigate('/admin/sub-category-list'), 1000);
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
                                    / Edit Sub Category
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
                            <CCol md={12}>
                                <CFormSelect
                                    label="Category"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.sub_heading}
                                        </option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            {/* Sub Heading */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Category"
                                    value={subHeading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>



                            {/* Status */}
                            <CCol md={12}>
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
