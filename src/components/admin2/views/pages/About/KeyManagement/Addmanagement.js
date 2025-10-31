import React, { useState } from 'react';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CBreadcrumb,
    CBreadcrumbItem
} from '@coreui/react';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../../components/index';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../../../api/axiosInstance';
import { toast } from 'react-toastify';
import '../../../../../admin2/scss/style.scss';
import '../../../../../admin2/scss/examples.scss';
import '../../../../../admin2/scss/custom.css';

export default function AddKeyManagement() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        facebook: '',
        instagram: '',
        designation: '',
        linkedin: '',
        twitter: '',
        key_status: 'Key Management',
        status: 1
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error('Please enter a name');
            return;
        }
        if (!formData.desc.trim()) {
            toast.error('Please enter a description');
            return;
        }
        if (!image) {
            toast.error('Please select an image');
            return;
        }

        const sendData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            sendData.append(key, value);
        });
        sendData.append('image', image);

        try {
            const response = await api.post('/management/add-key-management', sendData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Key Management record added successfully!');
                setTimeout(() => navigate('/admin/management'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to create record');
            }
        } catch (error) {
            console.error('Error creating key management record:', error);
            toast.error('An error occurred while creating the record');
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
                                    <Link to="/admin/dashboard" className='text-decoration-none'>Home</Link> / Add Key Management
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className='row mb-3'>
                        <div className='col-lg-6'></div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/about-key-management" className='text-decoration-none'>
                                <CButton className='custom-button text-white align-items-center d-flex gap-2'>
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <div className='bg-white p-3 shadow-sm'>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Name"
                                    name="name"
                                    placeholder="Enter name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Description"
                                    name="desc"
                                    placeholder="Enter description"
                                    value={formData.desc}
                                    onChange={handleChange}
                                    required
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    required
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Designation"
                                    name="designation"
                                    placeholder="Enter designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    required
                                />
                            </CCol>


                            <CCol md={6}>
                                <CFormInput
                                    type="url"
                                    label="Facebook"
                                    name="facebook"
                                    placeholder="Facebook profile URL"
                                    value={formData.facebook}
                                    onChange={handleChange}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="url"
                                    label="Instagram"
                                    name="instagram"
                                    placeholder="Instagram profile URL"
                                    value={formData.instagram}
                                    onChange={handleChange}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="url"
                                    label="LinkedIn"
                                    name="linkedin"
                                    placeholder="LinkedIn profile URL"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="url"
                                    label="Twitter"
                                    name="twitter"
                                    placeholder="Twitter profile URL"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormSelect
                                    label="Key Status"
                                    name="key_status"
                                    value={formData.key_status || 'Key Management'}  // Default value if empty
                                    onChange={handleChange}
                                >
                                    <option value="Key Management">Key Management</option>
                                    <option value="Board of Directors">Board of Directors</option>
                                    <option value="Head of Department">Head of Department</option>
                                </CFormSelect>
                            </CCol>


                            <CCol md={6}>
                                <CFormSelect
                                    label="Status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </CFormSelect>
                            </CCol>

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
