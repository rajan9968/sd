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
import API_PATH from '../../../../../../api/apiPath';
import { toast } from 'react-toastify';
import '../../../../../admin2/scss/style.scss';
import '../../../../../admin2/scss/examples.scss';
import '../../../../../admin2/scss/custom.css';

export default function EditCareer() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {}; // get id from state

    const [subHeading, setSubHeading] = useState('');
    const [images, setImages] = useState([]); // new uploaded images
    const [existingImage, setExistingImage] = useState(''); // existing image filename
    const [status, setStatus] = useState('active');

    // Fetch career data on mount
    useEffect(() => {
        if (!id) return;

        const fetchCareer = async () => {
            try {
                const response = await api.get(`/case-studies-banner/get-case-studies-bannerid/${id}`);
                if (response.data.success && response.data.career) {
                    const career = response.data.career;
                    setSubHeading(career.sub_heading || '');
                    setExistingImage(career.image_carousel || '');
                    setStatus(career.status || 'active');
                }
            } catch (error) {
                console.error('Error fetching career:', error);
                toast.error('Failed to fetch career data');
            }
        };

        fetchCareer();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subHeading.trim()) {
            toast.error('Please enter a sub heading');
            return;
        }

        const formData = new FormData();
        formData.append('sub_heading', subHeading);
        formData.append('status', status);
        formData.append('existingImage', existingImage); // send current image if no new upload
        if (images[0]) {
            formData.append('image', images[0]);
        }


        try {
            const response = await api.put(`/case-studies-banner/updatecase-studies-banner/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Case Studies Banner updated successfully!');
            setTimeout(() => navigate('/admin/case-studies-banner'), 1000);
        } catch (error) {
            console.error('Error updating career:', error);
            toast.error(error.response?.data?.message || 'Failed to update career');
        }
    };

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    {/* Breadcrumb */}
                    <div className="row bg-white mx-1 mb-3 py-3 shadow-sm">
                        <div className="col-lg-12 d-flex align-items-center">
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className="text-decoration-none">
                                        Home
                                    </Link>
                                    / Edit FAQs Banner
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back button */}
                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/careers" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-3">
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            {/* Sub Heading */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Sub Heading"
                                    placeholder="Enter sub heading"
                                    value={subHeading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Existing Image */}
                            {existingImage && (
                                <CCol md={6} className="mb-2">
                                    <label>Current Image</label>
                                    <div>
                                        <img
                                            src={`${API_PATH}/uploads/careers/${existingImage}`}
                                            alt="career"
                                            width="100"
                                        />
                                    </div>
                                </CCol>
                            )}

                            {/* Upload new image */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Change Image (optional)"
                                    onChange={(e) => setImages([...e.target.files])}
                                />
                            </CCol>

                            {/* Status */}
                            <CCol md={6}>
                                <CFormSelect
                                    label="Status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
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
