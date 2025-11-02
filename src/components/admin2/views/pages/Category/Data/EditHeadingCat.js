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

export default function EditSubCategory() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [link, setLink] = useState('');
    const [status, setStatus] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    // ✅ Fetch categories for dropdown
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/sub-cat/get-category");
                if (res.data.success && Array.isArray(res.data.banners)) {
                    setCategories(res.data.banners);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // ✅ Fetch sub-category details by ID
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/investor/get-investor/${id}`);
                if (response.data.success && response.data.subCategory) {
                    const subCat = response.data.subCategory;
                    setTitle(subCat.title || '');
                    setYear(subCat.year || '');
                    setLink(subCat.link || '');
                    setStatus(subCat.status);
                    setSelectedCategory(subCat.cat_id);
                } else {
                    toast.error('Failed to load sub-category details');
                }
            } catch (error) {
                console.error('Error fetching sub-category:', error);
                toast.error('Error loading sub-category details');
            }
        };
        fetchData();
    }, [id]);


    // ✅ Handle update
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('cat_id', selectedCategory);
        formData.append('title', title);
        formData.append('year', year);
        formData.append('link', link);
        formData.append('status', status);

        try {
            const response = await api.put(`/investor/update-investor/${id}`, formData);

            if (response.data.success) {
                toast.success('Sub Category updated successfully!');
                setTimeout(() => navigate('/admin/investors-list'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to update sub-category');
            }
        } catch (error) {
            console.error('Error updating sub-category:', error);
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
                            <Link to="/admin/sub-category-list" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-3">
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            {/* Category Dropdown */}
                            <CCol md={12}>
                                <CFormSelect
                                    label="Main Category"
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

                            {/* Title */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Year */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                            </CCol>

                            {/* Link */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Link"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
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
