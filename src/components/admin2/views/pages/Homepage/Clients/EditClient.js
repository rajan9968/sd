import React, { useState, useEffect } from 'react';
import { CButton, CCol, CForm, CFormInput, CFormSelect, CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../../components/index';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../../../../../api/axiosInstance';
import API_PATH from '../../../../../../api/apiPath';
import { toast } from 'react-toastify';
import '../../../../../admin2/scss/style.scss';
import '../../../../../admin2/scss/examples.scss';
import '../../../../../admin2/scss/custom.css';

export default function EditClient() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [image, setImage] = useState(null); // new uploaded file
    const [currentImage, setCurrentImage] = useState(''); // existing logo preview
    const [status, setStatus] = useState(1);
    const [loading, setLoading] = useState(true);

    // Fetch existing logo
    useEffect(() => {
        if (!id) return;
        const fetchLogo = async () => {
            try {
                const response = await api.get(`/client-logos/getclient/${id}`);
                if (response.data.success && response.data.logo) {
                    setCurrentImage(response.data.logo.image); // assuming API returns `image` field
                    setStatus(response.data.logo.status);
                } else {
                    toast.error('Logo not found');
                    navigate('/admin/client-logos');
                }
            } catch (error) {
                console.error(error);
                toast.error('Error fetching logo');
            } finally {
                setLoading(false);
            }
        };
        fetchLogo();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (image) formData.append('image', image); // only if new file uploaded
        formData.append('status', status);

        try {
            const response = await api.put(`/client-logos/update-logo/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Client logo updated successfully!');
                setTimeout(() => navigate('/admin/clients'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to update logo');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error updating logo');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    <div className='row bg-white mx-1 mb-3 py-3 shadow-sm'>
                        <div className='col-lg-12 d-flex align-items-center'>
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className='text-decoration-none'>Home</Link>/Edit Client Logo
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-lg-6'></div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/client-logos" className='text-decoration-none'>
                                <CButton className='custom-button text-white align-items-center d-flex gap-2'>
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    <div className='bg-white p-3'>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            {/* Current Logo Preview */}
                            {currentImage && (
                                <CCol md={6}>
                                    <label>Current Logo</label>
                                    <div>
                                        <img
                                            src={`${API_PATH}/uploads/client-logos/${currentImage}`}
                                            alt="Current Logo"
                                            style={{ width: '150px', height: 'auto', marginBottom: '10px' }}
                                        />
                                    </div>
                                </CCol>
                            )}

                            {/* Upload New Logo */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Replace Logo"
                                    onChange={(e) => setImage(e.target.files[0])}
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
