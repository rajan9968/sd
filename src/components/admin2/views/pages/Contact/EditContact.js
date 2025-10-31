import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormTextarea,
    CFormSelect,
    CBreadcrumb,
    CBreadcrumbItem,
} from '@coreui/react';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../../../../api/axiosInstance';
import API_PATH from '../../../../../api/apiPath';
import { toast } from 'react-toastify';
import '../../../../admin2/scss/style.scss';
import '../../../../admin2/scss/examples.scss';
import '../../../../admin2/scss/custom.css';

export default function EditContact() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [contactSubHeading, setContactSubHeading] = useState('');
    const [officeMain, setOfficeMain] = useState('');
    const [officeOther, setOfficeOther] = useState('');
    const [status, setStatus] = useState(1);
    const [existingBanner, setExistingBanner] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [previewBanner, setPreviewBanner] = useState(null);

    // Fetch existing contact data
    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await api.get(`/contact-data/get-contact/${id}`);
                if (response.data.success && response.data.contact) {
                    const contact = response.data.contact;
                    setContactSubHeading(contact.contact_sub_heading);
                    setOfficeMain(contact.office_main || '');
                    setOfficeOther(contact.office_other || '');
                    setStatus(contact.status);
                    setExistingBanner(contact.contact_banner);
                } else {
                    toast.error('Failed to load contact details');
                }
            } catch (error) {
                console.error('Error fetching contact:', error);
                toast.error('Error loading contact details');
            }
        };
        if (id) fetchContact();
    }, [id]);

    // Handle new image selection
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerImage(file);
            setPreviewBanner(URL.createObjectURL(file));
        }
    };

    // Submit updated contact
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('contact_sub_heading', contactSubHeading);
        formData.append('office_main', officeMain);
        formData.append('office_other', officeOther);
        formData.append('status', status);

        if (bannerImage) {
            formData.append('contact_banner', bannerImage);
        } else if (existingBanner) {
            formData.append('existing_banner', existingBanner);
        }

        try {
            const response = await api.put(`/contact-data/update-contact/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Contact updated successfully!');
                setTimeout(() => navigate('/admin/contact'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to update contact');
            }
        } catch (error) {
            console.error('Error updating contact:', error);
            toast.error('An error occurred while updating the contact');
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
                                    / Edit Contact
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/contact" className="text-decoration-none">
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

                            {/* Contact Banner */}
                            <CCol md={12}>
                                <CFormInput
                                    type="file"
                                    label="Contact Banner"
                                    onChange={handleBannerChange}
                                />
                            </CCol>

                            {/* Preview Section */}
                            {(previewBanner || existingBanner) && (
                                <CCol md={12}>
                                    <label className="form-label fw-bold">Preview:</label>
                                    <div>
                                        <img
                                            src={
                                                previewBanner ||
                                                `${API_PATH}/uploads/contact/${existingBanner}`
                                            }
                                            alt="Banner Preview"
                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                            }}
                                        />
                                    </div>
                                </CCol>
                            )}

                            {/* Contact Sub Heading */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Contact Sub Heading"
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
