import React, { useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../../api/axiosInstance';
import { toast } from 'react-toastify';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import '../../../../admin2/scss/style.scss';
import '../../../../admin2/scss/examples.scss';
import '../../../../admin2/scss/custom.css';

export default function AddAwards() {
    const navigate = useNavigate();

    const [subHeading, setSubHeading] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [status, setStatus] = useState(1);

    // Spotlight section
    const [spotlightItems, setSpotlightItems] = useState([
        { carousel_image: null, award_name: '', category: '', date: '' },
    ]);

    // All Awards section
    const [allAwards, setAllAwards] = useState([
        { image: null, award_name: '', category: '', date: '' },
    ]);

    // Add Spotlight item
    const addSpotlightItem = () => {
        setSpotlightItems([...spotlightItems, { carousel_image: null, award_name: '', category: '', date: '' }]);
    };

    // Remove Spotlight item
    const removeSpotlightItem = (index) => {
        const updated = [...spotlightItems];
        updated.splice(index, 1);
        setSpotlightItems(updated);
    };

    // Add All Award item
    const addAllAward = () => {
        setAllAwards([...allAwards, { image: null, award_name: '', category: '', date: '' }]);
    };

    // Remove All Award item
    const removeAllAward = (index) => {
        const updated = [...allAwards];
        updated.splice(index, 1);
        setAllAwards(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subHeading.trim()) {
            toast.error('Please enter a sub-heading');
            return;
        }

        if (!bannerImage) {
            toast.error('Please upload a banner image');
            return;
        }

        const formData = new FormData();
        formData.append('sub_heading', subHeading);
        formData.append('banner_image', bannerImage);
        formData.append('status', status);

        // Prepare JSON without file objects for Spotlight and All Awards
        const spotlightData = spotlightItems.map((item, i) => ({
            award_name: item.award_name,
            category: item.category,
            date: item.date,
            carousel_image: item.carousel_image ? `spotlight_${i}_${item.carousel_image.name}` : '',
        }));

        const allAwardsData = allAwards.map((item, i) => ({
            award_name: item.award_name,
            category: item.category,
            date: item.date,
            image: item.image ? `allaward_${i}_${item.image.name}` : '',
        }));

        formData.append('spotlight', JSON.stringify(spotlightData));
        formData.append('all_awards', JSON.stringify(allAwardsData));

        // Append actual image files separately
        spotlightItems.forEach((item, i) => {
            if (item.carousel_image) formData.append(`spotlight_image_${i}`, item.carousel_image);
        });
        allAwards.forEach((item, i) => {
            if (item.image) formData.append(`all_award_image_${i}`, item.image);
        });

        try {
            const response = await api.post('/awards-data/add-awards', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Awards section created successfully!');
                setTimeout(() => navigate('/admin/awards'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to create record');
            }
        } catch (error) {
            console.error('Error:', error);
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
                    <div className="row bg-white mx-1 mb-3 py-3 shadow-sm">
                        <div className="col-lg-12 d-flex align-items-center">
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className="text-decoration-none">Home</Link> / Add Awards
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/awards" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-3 shadow-sm">
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            {/* Sub Heading */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Sub Heading"
                                    placeholder="Enter sub heading"
                                    value={subHeading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Banner Image */}
                            <CCol md={12}>
                                <CFormInput
                                    type="file"
                                    label="Banner Image"
                                    accept="image/*"
                                    onChange={(e) => setBannerImage(e.target.files[0])}
                                    required
                                />
                            </CCol>

                            {/* Spotlight Section */}
                            <CCol md={12}>
                                <h5 className="mt-3 mb-2">Spotlight Awards</h5>
                                {spotlightItems.map((item, index) => (
                                    <div key={index} className="border p-3 mb-2 rounded">
                                        <CFormInput
                                            type="file"
                                            label="Carousel Image"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const updated = [...spotlightItems];
                                                updated[index].carousel_image = e.target.files[0];
                                                setSpotlightItems(updated);
                                            }}
                                        />
                                        <CFormInput
                                            type="text"
                                            label="Award Name"
                                            value={item.award_name}
                                            onChange={(e) => {
                                                const updated = [...spotlightItems];
                                                updated[index].award_name = e.target.value;
                                                setSpotlightItems(updated);
                                            }}
                                        />
                                        <CFormInput
                                            type="text"
                                            label="Category"
                                            value={item.category}
                                            onChange={(e) => {
                                                const updated = [...spotlightItems];
                                                updated[index].category = e.target.value;
                                                setSpotlightItems(updated);
                                            }}
                                        />
                                        <CFormInput
                                            type="date"
                                            label="Date"
                                            value={item.date}
                                            onChange={(e) => {
                                                const updated = [...spotlightItems];
                                                updated[index].date = e.target.value;
                                                setSpotlightItems(updated);
                                            }}
                                        />
                                        <CButton
                                            color="danger"
                                            className="mt-2"
                                            onClick={() => removeSpotlightItem(index)}
                                        >
                                            Remove
                                        </CButton>
                                    </div>
                                ))}
                                <CButton color="secondary" onClick={addSpotlightItem}>
                                    + Add Spotlight
                                </CButton>
                            </CCol>

                            {/* All Awards Section */}
                            <CCol md={12}>
                                <h5 className="mt-4 mb-2">All Awards</h5>
                                {allAwards.map((item, index) => (
                                    <div key={index} className="border p-3 mb-2 rounded">
                                        <CFormInput
                                            type="file"
                                            label="Award Image"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const updated = [...allAwards];
                                                updated[index].image = e.target.files[0];
                                                setAllAwards(updated);
                                            }}
                                        />
                                        <CFormInput
                                            type="text"
                                            label="Award Name"
                                            value={item.award_name}
                                            onChange={(e) => {
                                                const updated = [...allAwards];
                                                updated[index].award_name = e.target.value;
                                                setAllAwards(updated);
                                            }}
                                        />
                                        <CFormInput
                                            type="text"
                                            label="Category"
                                            value={item.category}
                                            onChange={(e) => {
                                                const updated = [...allAwards];
                                                updated[index].category = e.target.value;
                                                setAllAwards(updated);
                                            }}
                                        />
                                        <CFormInput
                                            type="date"
                                            label="Date"
                                            value={item.date}
                                            onChange={(e) => {
                                                const updated = [...allAwards];
                                                updated[index].date = e.target.value;
                                                setAllAwards(updated);
                                            }}
                                        />
                                        <CButton
                                            color="danger"
                                            className="mt-2"
                                            onClick={() => removeAllAward(index)}
                                        >
                                            Remove
                                        </CButton>
                                    </div>
                                ))}
                                <CButton color="secondary" onClick={addAllAward}>
                                    + Add All Award
                                </CButton>
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
