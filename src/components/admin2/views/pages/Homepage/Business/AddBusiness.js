import React, { useState } from 'react';
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { cilArrowLeft } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../../components/index'
import '../../../../../admin2/scss/style.scss'
import '../../../../../admin2/scss/examples.scss'
import '../../../../../admin2/scss/custom.css'
import { Link } from 'react-router-dom'
import api from '../../../../../../api/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function AddBusiness() {
    const navigate = useNavigate();
    const [sub_heading, setSubHeading] = useState('');
    const [card_content, setCardContent] = useState('');
    const [card_url, setCardUrl] = useState('');
    const [status, setStatus] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Build data for ourbusiness
            const data = {
                sub_heading,
                card_content,
                card_url,
                status
            };

            const response = await api.post('business/add-bussiness', data);

            if (response.data.success) {
                toast.success('Our Business record created successfully!');

                // Wait briefly before redirect
                setTimeout(() => {
                    navigate('/admin/business'); // adjust path as needed
                }, 1000);
            } else {
                toast.error(response.data.message || 'Failed to create record');
            }
        } catch (error) {
            console.error('Error creating record:', error);
            toast.error('An error occurred while creating the record');
        }
    };

    return (
        <div>
            <AppSidebar />

            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    <div className='row bg-white mx-1 mb-3 py-3 shadow-sm'>
                        <div className='col-lg-12 d-flex align-items-center'>
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem style={{ textDecoration: 'none' }}><Link to="/admin/dashboard" className='text-decoration-none'>Home</Link>/Add Business</CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>

                    </div>
                    <div className='row mb-3'>
                        <div className='col-lg-6'>
                            <CBreadcrumb className="mx-3 mb-4">
                                <CBreadcrumbItem style={{ textDecoration: 'none' }}></CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/business" className='text-decoration-none'>
                                <CButton className='custom-button text-white align-items-center d-flex gap-2'>
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>
                    <div className='bg-white p-3'>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            {/* Sub Heading */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Title Heading"
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

                            {/* Status (optional dropdown) */}
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

                            {/* Submit button */}
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
    )
}
