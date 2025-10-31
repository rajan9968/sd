import React, { useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../../../api/axiosInstance';
import { toast } from 'react-toastify';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../../components/index'
import '../../../../../admin2/scss/style.scss'
import '../../../../../admin2/scss/examples.scss'
import '../../../../../admin2/scss/custom.css'

export default function AddAboutBanner() {
    const navigate = useNavigate();
    const [subHeading, setSubHeading] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [PurposeType, setPurposeType] = useState('');
    const [status, setStatus] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subHeading.trim()) {
            toast.error('Please enter a sub-heading');
            return;
        }

        const formData = new FormData();
        formData.append('sub_heading', subHeading);
        formData.append('purpose_type', PurposeType);
        formData.append('status', status);
        console.log(formData);
        try {
            const response = await api.post('/purpose/add-purpose', formData);

            if (response.data.success) {
                toast.success('Purpose created successfully!');

                setTimeout(() => {
                    navigate('/admin/purpose'); // Redirect to purpose list
                }, 1000);
            } else {
                toast.error(response.data.message || 'Failed to create purpose');
            }
        } catch (error) {
            console.error('Error creating purpose:', error);
            toast.error('An error occurred while creating the purpose');
        }
    };


    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    {/* Breadcrumb */}
                    <div className='row bg-white mx-1 mb-3 py-3 shadow-sm'>
                        <div className='col-lg-12 d-flex align-items-center'>
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className='text-decoration-none'>Home</Link>/Add Purpose
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className='row mb-3'>
                        <div className='col-lg-6'></div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/about-banners" className='text-decoration-none'>
                                <CButton className='custom-button text-white align-items-center d-flex gap-2'>
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <div className='bg-white p-3'>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            {/* Sub Heading */}
                            <CCol md={12}>
                                <CFormTextarea
                                    type="text"
                                    label="Sub Heading"
                                    placeholder="Enter Content"
                                    value={subHeading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>



                            {/* Status */}
                            <CCol md={12}>
                                <CFormSelect
                                    label="Purpose Type"
                                    value={PurposeType}
                                    onChange={(e) => setPurposeType(e.target.value)}
                                >
                                    <option value="0">Select Purpose Type</option>
                                    <option value="Vision">Vision</option>
                                    <option value="Mission">Mission</option>
                                    <option value="Purpose">Purpose</option>
                                </CFormSelect>
                            </CCol>
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
