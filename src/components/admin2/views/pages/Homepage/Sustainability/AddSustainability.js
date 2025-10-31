import React, { useState } from 'react';
import { CButton, CCol, CForm, CFormInput, CFormSelect, CFormTextarea, CBreadcrumb, CBreadcrumbItem } from '@coreui/react';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { AppSidebar, AppFooter, AppHeader } from '../../../../components/index';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../../../api/axiosInstance';
import { toast } from 'react-toastify';
import '../../../../../admin2/scss/style.scss';
import '../../../../../admin2/scss/examples.scss';
import '../../../../../admin2/scss/custom.css';

export default function AddSustainability() {
    const navigate = useNavigate();
    const [subHeading, setSubHeading] = useState('');
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.error('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('sub_heading', subHeading);
        formData.append('heading', heading);
        formData.append('content', content);
        formData.append('image', image);
        formData.append('status', status);

        try {
            const response = await api.post('/sustainability/add-sustainability', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Sustainability record created successfully!');
                setTimeout(() => {
                    navigate('/admin/sustainability'); // adjust to list page
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
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className='text-decoration-none'>Home</Link>/Add Sustainability
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-lg-6'></div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/sustainability" className='text-decoration-none'>
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


                            {/* Heading */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Heading"
                                    value={heading}
                                    onChange={(e) => setHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Content */}
                            <CCol md={12}>
                                <CFormTextarea
                                    label="Content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Image */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Image"
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
                                <CButton color="primary" type="submit">Submit</CButton>
                            </CCol>
                        </CForm>
                    </div>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
