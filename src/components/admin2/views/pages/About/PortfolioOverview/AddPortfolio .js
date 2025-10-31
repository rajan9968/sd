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
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../../components/index';
import '../../../../../admin2/scss/style.scss';
import '../../../../../admin2/scss/examples.scss';
import '../../../../../admin2/scss/custom.css';

export default function AddPortfolioOverview() {
    const navigate = useNavigate();

    const [subHeading, setSubHeading] = useState('');
    const [projectName, setProjectName] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subHeading.trim()) {
            toast.error('Please enter a sub-heading');
            return;
        }

        if (!projectName.trim()) {
            toast.error('Please enter project name');
            return;
        }

        if (!image) {
            toast.error('Please upload an image');
            return;
        }

        const formData = new FormData();
        formData.append('sub_heading', subHeading);
        formData.append('project_name', projectName);
        formData.append('location', location);
        formData.append('status', status);
        formData.append('image', image);

        try {
            const response = await api.post('/portfolio-overview/add-portfolio-overview', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Portfolio overview added successfully!');
                setTimeout(() => {
                    navigate('/admin/portfolio-overview');
                }, 1000);
            } else {
                toast.error(response.data.message || 'Failed to create portfolio overview');
            }
        } catch (error) {
            console.error('Error creating portfolio overview:', error);
            toast.error('An error occurred while creating the portfolio overview');
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
                                    <Link to="/admin/dashboard" className='text-decoration-none'>Home</Link> / Add Portfolio Overview
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className='row mb-3'>
                        <div className='col-lg-6'></div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/portfolio-overview" className='text-decoration-none'>
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


                            {/* Project Name */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Project Name"
                                    placeholder="Enter project name"
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
                                    placeholder="Enter location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </CCol>

                            {/* Sub Heading */}
                            <CCol md={12}>
                                <CFormTextarea
                                    type="text"
                                    label="Content"
                                    placeholder="Enter Content"
                                    value={subHeading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Image Upload */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Upload Image"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
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
