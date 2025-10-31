import React, { useState } from 'react';
import {
    CButton, CCol, CForm, CFormInput, CBreadcrumb, CBreadcrumbItem
} from '@coreui/react';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import '../../../../admin2/scss/style.scss';
import '../../../../admin2/scss/examples.scss';
import '../../../../admin2/scss/custom.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../../api/axiosInstance';
import { toast } from 'react-toastify';

export default function AddBanner() {
    const navigate = useNavigate();

    const [heading, setHeading] = useState('');
    const [subheading, setSubheading] = useState('');
    const [contents, setContents] = useState([{ content: '', number: '' }]);
    const [image, setImage] = useState(null);

    // Handle input changes in dynamic fields
    const handleContentChange = (index, field, value) => {
        const newContents = [...contents];
        newContents[index][field] = value;
        setContents(newContents);
    };

    // Add a new content-number pair
    const handleAddContent = () => {
        setContents([...contents, { content: '', number: '' }]);
    };

    // Remove a content-number pair
    const handleRemoveContent = (index) => {
        const newContents = contents.filter((_, i) => i !== index);
        setContents(newContents);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('subheading', subheading);
        formData.append('status', 1);
        if (image) formData.append('image', image);

        // Append content array
        formData.append('contents', JSON.stringify(contents));

        try {
            const response = await api.post('/banners/add-banner', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success('Banner created successfully!');
                setTimeout(() => navigate('/admin/banner'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to create banner');
            }
        } catch (error) {
            console.error(error);
            alert('Error creating banner');
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
                                    <Link to="/admin/dashboard" className='text-decoration-none'>
                                        Home
                                    </Link> / Add Banner
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-lg-6'></div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/banner" className='text-decoration-none'>
                                <CButton className='custom-button text-white align-items-center d-flex gap-2'>
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    <div className='bg-white p-3'>
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Heading"
                                    value={heading}
                                    onChange={(e) => setHeading(e.target.value)}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Sub Heading"
                                    value={subheading}
                                    onChange={(e) => setSubheading(e.target.value)}
                                />
                            </CCol>

                            {/* Dynamic Content + Number Fields */}
                            <CCol xs={12}>
                                <label className='fw-bold mb-2'>Content & Number</label>
                                {contents.map((item, index) => (
                                    <div key={index} className="row mb-2 align-items-end">
                                        <div className="col-md-5">
                                            <CFormInput
                                                type="text"
                                                label={`Content ${index + 1}`}
                                                value={item.content}
                                                onChange={(e) => handleContentChange(index, 'content', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <CFormInput
                                                type="text"
                                                label="Number"
                                                value={item.number}
                                                onChange={(e) => handleContentChange(index, 'number', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-end">
                                            {contents.length > 1 && (
                                                <CButton color="danger" onClick={() => handleRemoveContent(index)}>
                                                    Remove
                                                </CButton>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <CButton color="secondary" onClick={handleAddContent}>
                                    + Add More
                                </CButton>
                            </CCol>

                            <CCol md={12}>
                                <CFormInput
                                    type="file"
                                    label="Image Carousel"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
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
