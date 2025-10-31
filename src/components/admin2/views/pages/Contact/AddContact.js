import React, { useState } from 'react';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormTextarea,
    CFormSelect,
    CBreadcrumb,
    CBreadcrumbItem
} from '@coreui/react';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../../api/axiosInstance';
import { toast } from 'react-toastify';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import '../../../../admin2/scss/style.scss';
import '../../../../admin2/scss/examples.scss';
import '../../../../admin2/scss/custom.css';

export default function AddContact() {
    const navigate = useNavigate();

    // Form states
    const [contactBanner, setContactBanner] = useState(null);
    const [contactSubHeading, setContactSubHeading] = useState('');
    const [officeMain, setOfficeMain] = useState('');
    const [officeOther, setOfficeOther] = useState('');
    const [status, setStatus] = useState(1);

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contactSubHeading.trim()) {
            toast.error('Please enter the sub heading');
            return;
        }

        if (!contactBanner) {
            toast.error('Please upload a banner image');
            return;
        }

        const formData = new FormData();
        formData.append('contact_banner', contactBanner);
        formData.append('contact_sub_heading', contactSubHeading);
        formData.append('office_main', officeMain);
        formData.append('office_other', officeOther);
        formData.append('status', status);

        try {
            const response = await api.post('/contact-data/add-contact', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Contact added successfully!');
                setTimeout(() => navigate('/admin/contact'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to add contact');
            }
        } catch (error) {
            console.error('Error creating contact:', error);
            toast.error('An error occurred while creating the contact');
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
                                    <Link to="/admin/dashboard" className='text-decoration-none'>Home</Link>/Add Contact
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className='row mb-3'>
                        <div className='col-lg-6'></div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/contact" className='text-decoration-none'>
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

                            {/* Contact Banner */}
                            <CCol md={12}>
                                <CFormInput
                                    type="file"
                                    label="Contact Banner"
                                    onChange={(e) => setContactBanner(e.target.files[0])}
                                    required
                                />
                            </CCol>

                            {/* Contact Sub Heading */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Contact Sub Heading"
                                    placeholder="Enter sub heading"
                                    value={contactSubHeading}
                                    onChange={(e) => setContactSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Main Office */}
                            <CCol md={12}>
                                <CFormTextarea
                                    label="Main Office Location"
                                    placeholder="Enter main office address"
                                    rows={3}
                                    value={officeMain}
                                    onChange={(e) => setOfficeMain(e.target.value)}
                                />
                            </CCol>

                            {/* Other Offices */}
                            <CCol md={12}>
                                <CFormTextarea
                                    label="Other Office Locations"
                                    placeholder="Enter other office addresses"
                                    rows={3}
                                    value={officeOther}
                                    onChange={(e) => setOfficeOther(e.target.value)}
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
