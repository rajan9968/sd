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
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../../components/index';
import '../../../../../admin2/scss/style.scss';
import '../../../../../admin2/scss/examples.scss';
import '../../../../../admin2/scss/custom.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../../../../../api/axiosInstance';
import { toast } from 'react-toastify';

export default function EditBusiness() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {}; // ID passed via navigation
    const [loading, setLoading] = useState(true);

    // Form fields
    const [sub_heading, setSubHeading] = useState('');
    const [card_content, setCardContent] = useState('');
    const [card_url, setCardUrl] = useState('');
    const [status, setStatus] = useState(1);

    // Fetch existing record
    useEffect(() => {
        if (!id) return;
        const fetchBusiness = async () => {
            try {
                const response = await api.get(`/business/getbussiness/${id}`);
                if (response.data.success && response.data.business) {
                    const data = response.data.business;
                    setSubHeading(data.sub_heading);
                    setCardContent(data.card_content);
                    setCardUrl(data.card_url || '');
                    setStatus(data.status);
                } else {
                    toast.error('Failed to load business data');
                }
            } catch (error) {
                console.error('Error fetching business:', error);
                toast.error('Error fetching business details');
            } finally {
                setLoading(false);
            }
        };
        fetchBusiness();
    }, [id]);

    // Handle form submit (Update record)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                sub_heading,
                card_content,
                card_url,
                status,
            };

            const response = await api.put(`/business/getbussiness/${id}`, data);
            if (response.data.success) {
                toast.success('Our Business record updated successfully!');
                setTimeout(() => {
                    navigate('/admin/business'); // redirect back to list
                }, 1000);
            } else {
                toast.error(response.data.message || 'Failed to update record');
            }
        } catch (error) {
            console.error('Error updating record:', error);
            toast.error('Error updating record');
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <h5>Loading business details...</h5>
            </div>
        );
    }

    return (
        <div>
            <AppSidebar />

            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    {/* Header & Breadcrumb */}
                    <div className="row bg-white mx-1 mb-3 py-3 shadow-sm">
                        <div className="col-lg-12 d-flex align-items-center">
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className="text-decoration-none">
                                        Home
                                    </Link>
                                    / Edit Business
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/business" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    {/* Edit Form */}
                    <div className="bg-white p-3">
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            {/* Sub Heading */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Sub Heading"
                                    value={sub_heading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Card Content */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Card Content"
                                    value={card_content}
                                    onChange={(e) => setCardContent(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Card URL */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Card URL"
                                    value={card_url}
                                    onChange={(e) => setCardUrl(e.target.value)}
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
                    </div>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
