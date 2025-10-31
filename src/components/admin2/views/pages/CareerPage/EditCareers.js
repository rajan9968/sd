import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormTextarea,
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

export default function EditCareers() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [bannerSubHeading, setBannerSubHeading] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    const [whyJoin, setWhyJoin] = useState([]);
    const [keyHighlights, setKeyHighlights] = useState([]);
    const [employeeTestimonials, setEmployeeTestimonials] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/careers-data/get-admin-career/${id}`);
                if (response.data.success && response.data.career) {
                    const career = response.data.career;

                    setBannerSubHeading(career.banner_sub_heading || '');

                    if (career.banner_image) {
                        setPreviewImage(`${API_PATH}/uploads/careers/${career.banner_image}`);
                    }

                    // Parse JSON arrays or use directly if already parsed
                    const whyJoinData = Array.isArray(career.why_join)
                        ? career.why_join
                        : (career.why_join ? JSON.parse(career.why_join) : []);

                    const keyHighlightsData = Array.isArray(career.key_highlights)
                        ? career.key_highlights
                        : (career.key_highlights ? JSON.parse(career.key_highlights) : []);

                    const testimonialsData = Array.isArray(career.employee_testimonials)
                        ? career.employee_testimonials
                        : (career.employee_testimonials ? JSON.parse(career.employee_testimonials) : []);

                    setWhyJoin(whyJoinData);
                    setKeyHighlights(keyHighlightsData);
                    setEmployeeTestimonials(testimonialsData);
                } else {
                    toast.error('Failed to load career details');
                }
            } catch (error) {
                console.error('Error fetching career:', error);
                toast.error('Error loading career details');
            }
        };
        if (id) fetchData();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // 🔹 Handle icon file change for Why Join
    const handleIconChange = (index, file) => {
        if (file) {
            setWhyJoin((prev) => {
                const updated = [...prev];
                updated[index].iconFile = file; // Store the file object
                updated[index].iconPreview = URL.createObjectURL(file);
                return updated;
            });
        }
    };

    // 🔹 Dynamic input handling
    const handleArrayChange = (setter, index, field, value) => {
        setter((prev) => {
            const updated = [...prev];
            updated[index][field] = value;
            return updated;
        });
    };

    const handleAddItem = (setter, newItem) => setter((prev) => [...prev, newItem]);
    const handleRemoveItem = (setter, index) => setter((prev) => prev.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bannerSubHeading.trim()) {
            toast.error("Please enter banner sub-heading");
            return;
        }

        const formData = new FormData();
        formData.append('banner_sub_heading', bannerSubHeading);

        if (bannerImage) {
            formData.append('banner_image', bannerImage);
        }

        // Add why_join with icon files
        whyJoin.forEach((item, index) => {
            if (item.iconFile instanceof File) {
                formData.append(`why_join_icons`, item.iconFile);
            }
            formData.append(`why_join_heading_${index}`, item.heading || '');
            formData.append(`why_join_text_${index}`, item.text || '');
            // Keep existing icon if no new file uploaded
            if (!item.iconFile && item.icon) {
                formData.append(`why_join_existing_icon_${index}`, item.icon);
            }
        });
        formData.append('why_join_count', whyJoin.length);

        formData.append('key_highlights', JSON.stringify(keyHighlights));
        formData.append('employee_testimonials', JSON.stringify(employeeTestimonials));

        try {
            const response = await api.put(`/careers-data/update-admin-career/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Career section updated successfully!');
                setTimeout(() => navigate('/admin/careers-list'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to update career section');
            }
        } catch (error) {
            console.error('Error updating career:', error);
            toast.error('An error occurred while updating');
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
                                    </Link> / Edit Careers
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
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
                            {/* Banner Sub Heading */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Banner Sub Heading"
                                    value={bannerSubHeading}
                                    onChange={(e) => setBannerSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Banner Image */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Banner Image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {previewImage && (
                                    <div className="mt-2">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            style={{
                                                width: '120px',
                                                height: '80px',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                                border: '1px solid #ddd',
                                            }}
                                        />
                                    </div>
                                )}
                            </CCol>

                            {/* Why Join Section */}
                            <CCol xs={12}>
                                <h5 className="mt-4">Why Join</h5>
                                {whyJoin.length > 0 ? (
                                    whyJoin.map((item, index) => (
                                        <div key={index} className="p-3 border rounded mb-3">
                                            {/* Icon Upload */}
                                            <CFormInput
                                                type="file"
                                                label="Icon Image"
                                                accept="image/*"
                                                onChange={(e) => handleIconChange(index, e.target.files[0])}
                                                className="mb-2"
                                            />
                                            {/* Show existing or preview icon */}
                                            {(item.iconPreview || item.icon) && (
                                                <div className="mb-2">
                                                    <img
                                                        src={
                                                            item.iconPreview ||
                                                            `${API_PATH}/uploads/careers/${item.icon}`
                                                        }
                                                        alt="Icon"
                                                        style={{
                                                            width: '60px',
                                                            height: '60px',
                                                            objectFit: 'cover',
                                                            borderRadius: '5px',
                                                            border: '1px solid #ddd',
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            <CFormInput
                                                type="text"
                                                label="Heading"
                                                value={item.heading || ''}
                                                onChange={(e) => handleArrayChange(setWhyJoin, index, 'heading', e.target.value)}
                                                className="mb-2"
                                            />
                                            <CFormTextarea
                                                label="Text"
                                                value={item.text || ''}
                                                onChange={(e) => handleArrayChange(setWhyJoin, index, 'text', e.target.value)}
                                                className="mb-2"
                                                rows={3}
                                            />
                                            <CButton
                                                color="danger"
                                                size="sm"
                                                onClick={() => handleRemoveItem(setWhyJoin, index)}
                                            >
                                                Remove
                                            </CButton>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No items added yet</p>
                                )}
                                <CButton
                                    color="success"
                                    onClick={() => handleAddItem(setWhyJoin, { icon: '', heading: '', text: '', iconFile: null })}
                                >
                                    + Add Why Join
                                </CButton>
                            </CCol>

                            {/* Key Highlights */}
                            <CCol xs={12}>
                                <h5 className="mt-4">Key Highlights</h5>
                                {keyHighlights.length > 0 ? (
                                    keyHighlights.map((item, index) => (
                                        <div key={index} className="p-2 border rounded mb-2">
                                            <CFormInput
                                                type="text"
                                                label="Number"
                                                value={item.number || ''}
                                                onChange={(e) => handleArrayChange(setKeyHighlights, index, 'number', e.target.value)}
                                                className="mb-2"
                                            />
                                            <CFormInput
                                                type="text"
                                                label="Text"
                                                value={item.text || ''}
                                                onChange={(e) => handleArrayChange(setKeyHighlights, index, 'text', e.target.value)}
                                            />
                                            <CButton
                                                color="danger"
                                                size="sm"
                                                className="mt-2"
                                                onClick={() => handleRemoveItem(setKeyHighlights, index)}
                                            >
                                                Remove
                                            </CButton>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No highlights added yet</p>
                                )}
                                <CButton
                                    color="success"
                                    onClick={() => handleAddItem(setKeyHighlights, { number: '', text: '' })}
                                >
                                    + Add Key Highlight
                                </CButton>
                            </CCol>

                            {/* Employee Testimonials */}
                            <CCol xs={12}>
                                <h5 className="mt-4">Employee Testimonials</h5>
                                {employeeTestimonials.length > 0 ? (
                                    employeeTestimonials.map((item, index) => (
                                        <div key={index} className="p-2 border rounded mb-2">
                                            <CFormInput
                                                type="text"
                                                label="Video URL"
                                                value={item.video || ''}
                                                onChange={(e) => handleArrayChange(setEmployeeTestimonials, index, 'video', e.target.value)}
                                            />
                                            <CButton
                                                color="danger"
                                                size="sm"
                                                className="mt-2"
                                                onClick={() => handleRemoveItem(setEmployeeTestimonials, index)}
                                            >
                                                Remove
                                            </CButton>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">No testimonials added yet</p>
                                )}
                                <CButton
                                    color="success"
                                    onClick={() => handleAddItem(setEmployeeTestimonials, { video: '' })}
                                >
                                    + Add Testimonial
                                </CButton>
                            </CCol>

                            {/* Submit */}
                            <CCol xs={12} className="mt-4">
                                <CButton color="primary" type="submit">
                                    Update Career
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