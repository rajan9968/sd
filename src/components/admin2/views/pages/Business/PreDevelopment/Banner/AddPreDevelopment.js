import React, { useState } from 'react';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormTextarea,
    CBreadcrumb,
    CBreadcrumbItem,
} from '@coreui/react';
import { cilArrowLeft, cilPlus, cilMinus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { AppSidebar, AppFooter, AppHeader } from '../../../../../components/index';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../../../../api/axiosInstance';
import { toast } from 'react-toastify';
import '../../../../../../admin2/scss/style.scss';
import '../../../../../../admin2/scss/examples.scss';
import '../../../../../../admin2/scss/custom.css';

export default function AddAboutBanner() {
    const navigate = useNavigate();

    // Basic banner info
    const [subHeading, setSubHeading] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [status, setStatus] = useState(1);
    const [page_type, setPageType] = useState('');

    // Overview section
    const [overviewText, setOverviewText] = useState('');
    const [overviewImage, setOverviewImage] = useState(null);

    // Key Highlights section
    const [highlights, setHighlights] = useState([{ number: '', text: '' }]);

    // Our Approach section
    const [approaches, setApproaches] = useState([{ image: null, heading: '', text: '' }]);

    // Our Projects section (NEW)
    const [projectText, setProjectText] = useState([{ image: null, text: '' }]);

    const handleHighlightChange = (index, field, value) => {
        const updated = [...highlights];
        updated[index][field] = value;
        setHighlights(updated);
    };

    const addHighlight = () => setHighlights([...highlights, { number: '', text: '' }]);
    const removeHighlight = (index) => setHighlights(highlights.filter((_, i) => i !== index));

    const handleApproachChange = (index, field, value) => {
        const updated = [...approaches];
        updated[index][field] = value;
        setApproaches(updated);
    };

    const addApproach = () => setApproaches([...approaches, { image: null, heading: '', text: '' }]);
    const removeApproach = (index) => setApproaches(approaches.filter((_, i) => i !== index));

    // NEW: Our Projects functions
    const handleProjectChange = (index, field, value) => {
        const updated = [...projectText];
        updated[index][field] = value;
        setProjectText(updated);
    };

    const addProject = () => setProjectText([...projectText, { image: null, text: '' }]);
    const removeProject = (index) => setProjectText(projectText.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('sub_heading', subHeading);
        formData.append('banner_image', bannerImage);
        formData.append('status', status);
        formData.append('page_type', page_type);
        formData.append('overview_text', overviewText);
        if (overviewImage) formData.append('overview_image', overviewImage);

        // Key Highlights
        formData.append('key_highlights', JSON.stringify(highlights));

        // Our Approach
        formData.append(
            'our_approach',
            JSON.stringify(
                approaches.map((a) => ({
                    heading: a.heading,
                    text: a.text,
                }))
            )
        );

        approaches.forEach((a, index) => {
            if (a.image) {
                formData.append(`approach_image_${index}`, a.image);
            }
        });

        // Our Projects (NEW)
        formData.append(
            'our_projects',
            JSON.stringify(
                projectText.map((p) => ({
                    text: p.text,
                }))
            )
        );

        projectText.forEach((p, index) => {
            if (p.image) {
                formData.append(`project_image_${index}`, p.image);
            }
        });

        try {
            const response = await api.post('/pre-development/add-pre-development-banner', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Banner created successfully!');
                setTimeout(() => navigate('/admin/businesses'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to create banner');
            }
        } catch (error) {
            console.error('Error creating banner:', error);
            toast.error('An error occurred while creating the banner');
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
                                    / Add Business
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/about-banners" className="text-decoration-none">
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
                            {/* Main Banner */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Sub Heading"
                                    value={subHeading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Banner Image"
                                    onChange={(e) => setBannerImage(e.target.files[0])}
                                    required
                                />
                            </CCol>

                            {/* Overview Section */}
                            <h5 className="mt-4">Overview</h5>
                            <CCol md={6}>
                                <CFormTextarea
                                    label="Overview Text"
                                    rows="4"
                                    value={overviewText}
                                    onChange={(e) => setOverviewText(e.target.value)}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Overview Image"
                                    onChange={(e) => setOverviewImage(e.target.files[0])}
                                />
                            </CCol>

                            {/* Key Highlights */}
                            <h5 className="mt-4">Key Highlights</h5>
                            {highlights.map((item, index) => (
                                <div key={index} className="d-flex gap-3 align-items-center mb-2">
                                    <CFormInput
                                        type="text"
                                        placeholder="Number"
                                        value={item.number}
                                        onChange={(e) => handleHighlightChange(index, 'number', e.target.value)}
                                    />
                                    <CFormInput
                                        type="text"
                                        placeholder="Text below number"
                                        value={item.text}
                                        onChange={(e) => handleHighlightChange(index, 'text', e.target.value)}
                                    />
                                    {highlights.length > 1 && (
                                        <CButton color="danger" onClick={() => removeHighlight(index)}>
                                            <CIcon icon={cilMinus} />
                                        </CButton>
                                    )}
                                </div>
                            ))}
                            <CButton color="success" onClick={addHighlight}>
                                <CIcon icon={cilPlus} /> Add Highlight
                            </CButton>

                            {/* Our Approach */}
                            <h5 className="mt-4">Our Approach</h5>
                            {approaches.map((item, index) => (
                                <div key={index} className="row g-3 mb-3">
                                    <CCol md={4}>
                                        <CFormInput
                                            type="file"
                                            label="Tile Image"
                                            onChange={(e) => handleApproachChange(index, 'image', e.target.files[0])}
                                        />
                                    </CCol>
                                    <CCol md={4}>
                                        <CFormInput
                                            type="text"
                                            label="Tile Heading"
                                            value={item.heading}
                                            onChange={(e) => handleApproachChange(index, 'heading', e.target.value)}
                                        />
                                    </CCol>
                                    <CCol md={4}>
                                        <CFormTextarea
                                            label="Tile Text"
                                            rows="2"
                                            value={item.text}
                                            onChange={(e) => handleApproachChange(index, 'text', e.target.value)}
                                        />
                                    </CCol>
                                    <CCol md={12}>
                                        {approaches.length > 1 && (
                                            <CButton color="danger" onClick={() => removeApproach(index)}>
                                                <CIcon icon={cilMinus} /> Remove Tile
                                            </CButton>
                                        )}
                                    </CCol>
                                </div>
                            ))}
                            <CButton color="success" onClick={addApproach}>
                                <CIcon icon={cilPlus} /> Add Tile
                            </CButton>

                            {/* Our Projects (Dynamic Add/Remove) */}
                            <h5 className="mt-4">Our Projects</h5>
                            {projectText.map((item, index) => (
                                <div key={index} className="row g-3 mb-3">
                                    <CCol md={4}>
                                        <CFormInput
                                            type="file"
                                            label="Project Image"
                                            onChange={(e) => handleProjectChange(index, 'image', e.target.files[0])}
                                        />
                                    </CCol>
                                    <CCol md={8}>
                                        <CFormTextarea
                                            label="Project Content"
                                            rows="3"
                                            value={item.text}
                                            onChange={(e) => handleProjectChange(index, 'text', e.target.value)}
                                        />
                                    </CCol>
                                    <CCol md={12}>
                                        {projectText.length > 1 && (
                                            <CButton color="danger" onClick={() => removeProject(index)}>
                                                <CIcon icon={cilMinus} /> Remove Project
                                            </CButton>
                                        )}
                                    </CCol>
                                </div>
                            ))}
                            <CButton color="success" onClick={addProject}>
                                <CIcon icon={cilPlus} /> Add Project
                            </CButton>

                            {/* Status & Type */}
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
                            <CCol md={6}>
                                <CFormSelect
                                    label="Type"
                                    value={page_type}
                                    onChange={(e) => setPageType(e.target.value)}
                                >
                                    <option value="Pre-Development EPC" selected>Pre-Development EPC</option>
                                    <option value="Turnkey EPC Projects">Turnkey EPC Projects</option>
                                    <option value="Grid Infrastructure">Grid Infrastructure</option>
                                    <option value="Independent Power Producer">Independent Power Producer</option>
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
