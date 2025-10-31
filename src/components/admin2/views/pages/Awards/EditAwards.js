import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CBreadcrumb,
    CBreadcrumbItem,
    CRow,
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

export default function EditAwards() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [subHeading, setSubHeading] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [previewBanner, setPreviewBanner] = useState('');
    const [spotlight, setSpotlight] = useState([]);
    const [allAwards, setAllAwards] = useState([]);
    const [status, setStatus] = useState(1);

    // Fetch Award Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/awards-data/get-awards/${id}`);
                if (response.data.success && response.data.award) {
                    const award = response.data.award;

                    setSubHeading(award.sub_heading || '');

                    const safeParse = (data) => {
                        try {
                            return typeof data === 'string' ? JSON.parse(data) : data || [];
                        } catch {
                            return [];
                        }
                    };

                    setSpotlight(safeParse(award.spotlight));
                    setAllAwards(safeParse(award.all_awards));

                    setStatus(Number(award.status));
                    setPreviewBanner(`${API_PATH}/uploads/awards/${award.banner_image}`);
                } else {
                    toast.error('Failed to load award details');
                }
            } catch (error) {
                console.error('Error fetching award:', error);
                toast.error('Error loading award details');
            }
        };
        if (id) fetchData();
    }, [id]);

    // Banner Image Preview
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        setBannerImage(file);
        setPreviewBanner(URL.createObjectURL(file));
    };

    // 🔹 Spotlight handlers
    const addSpotlight = () => {
        setSpotlight([
            ...spotlight,
            { date: '', category: '', award_name: '', carousel_image: null, preview: '' },
        ]);
    };

    const removeSpotlight = (index) => {
        setSpotlight(spotlight.filter((_, i) => i !== index));
    };

    const handleSpotlightChange = (index, field, value) => {
        const updated = [...spotlight];
        updated[index][field] = value;
        setSpotlight(updated);
    };

    const handleSpotlightImageChange = (index, file) => {
        const updated = [...spotlight];
        updated[index].carousel_image = file;
        updated[index].preview = URL.createObjectURL(file);
        setSpotlight(updated);
    };

    // 🔹 All Awards handlers
    const addAllAwards = () => {
        setAllAwards([
            ...allAwards,
            { date: '', category: '', award_name: '', image: null, preview: '' },
        ]);
    };

    const removeAllAwards = (index) => {
        setAllAwards(allAwards.filter((_, i) => i !== index));
    };

    const handleAllAwardsChange = (index, field, value) => {
        const updated = [...allAwards];
        updated[index][field] = value;
        setAllAwards(updated);
    };

    const handleAllAwardsImageChange = (index, file) => {
        const updated = [...allAwards];
        updated[index].image = file;
        updated[index].preview = URL.createObjectURL(file);
        setAllAwards(updated);
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('sub_heading', subHeading);
        if (bannerImage) formData.append('banner_image', bannerImage);
        formData.append('status', status);

        // Spotlight Data
        const spotlightData = spotlight.map((item, i) => {
            if (item.carousel_image instanceof File) {
                formData.append(`spotlight_image_${i}`, item.carousel_image);
            }
            return {
                date: item.date,
                category: item.category,
                award_name: item.award_name,
                carousel_image:
                    item.carousel_image instanceof File ? `spotlight_image_${i}` : item.carousel_image,
            };
        });

        // All Awards Data
        const allAwardsData = allAwards.map((item, i) => {
            if (item.image instanceof File) {
                formData.append(`all_award_image_${i}`, item.image);
            }
            return {
                date: item.date,
                category: item.category,
                award_name: item.award_name,
                image: item.image instanceof File ? `all_award_image_${i}` : item.image,
            };
        });

        formData.append('spotlight', JSON.stringify(spotlightData));
        formData.append('all_awards', JSON.stringify(allAwardsData));

        try {
            const response = await api.put(`/awards-data/update-award/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Award updated successfully!');
                setTimeout(() => navigate('/admin/awards'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to update award');
            }
        } catch (error) {
            console.error('Error updating award:', error);
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
                                    </Link>{' '}
                                    / Edit Award
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
                    <div className="bg-white p-3">
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            {/* Sub Heading */}
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Sub Heading"
                                    value={subHeading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>

                            {/* Banner Image */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Banner Image"
                                    accept="image/*"
                                    onChange={handleBannerChange}
                                />
                                {previewBanner && (
                                    <div className="mt-2">
                                        <img
                                            src={previewBanner}
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

                            {/* 🔹 Spotlight Section */}
                            <div className="mt-4">
                                <h5>Spotlight Awards</h5>
                                {spotlight.map((item, index) => (
                                    <div key={index} className="border p-3 rounded mb-3">
                                        <CRow className="g-3">
                                            <CCol md={3}>
                                                <CFormInput
                                                    type="date"
                                                    label="Date"
                                                    value={item.date || ''}
                                                    onChange={(e) => handleSpotlightChange(index, 'date', e.target.value)}
                                                />
                                            </CCol>
                                            <CCol md={3}>
                                                <CFormInput
                                                    type="text"
                                                    label="Category"
                                                    value={item.category || ''}
                                                    onChange={(e) => handleSpotlightChange(index, 'category', e.target.value)}
                                                />
                                            </CCol>
                                            <CCol md={3}>
                                                <CFormInput
                                                    type="text"
                                                    label="Award Name"
                                                    value={item.award_name || ''}
                                                    onChange={(e) => handleSpotlightChange(index, 'award_name', e.target.value)}
                                                />
                                            </CCol>
                                            <CCol md={3}>
                                                <CFormInput
                                                    type="file"
                                                    label="Image"
                                                    accept="image/*"
                                                    onChange={(e) => handleSpotlightImageChange(index, e.target.files[0])}
                                                />
                                                {(item.preview || item.carousel_image) && (
                                                    <img
                                                        src={
                                                            item.preview
                                                                ? item.preview
                                                                : `${API_PATH}/uploads/awards/${item.carousel_image}`
                                                        }
                                                        alt="Spotlight"
                                                        style={{
                                                            width: '100px',
                                                            height: '70px',
                                                            marginTop: '5px',
                                                            borderRadius: '4px',
                                                            objectFit: 'cover',
                                                            border: '1px solid #ccc',
                                                        }}
                                                    />
                                                )}
                                            </CCol>
                                        </CRow>
                                        <CButton
                                            color="danger"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => removeSpotlight(index)}
                                        >
                                            Remove
                                        </CButton>
                                    </div>
                                ))}
                                <CButton color="success" size="sm" onClick={addSpotlight}>
                                    + Add Spotlight
                                </CButton>
                            </div>

                            {/* 🔹 All Awards Section */}
                            <div className="mt-4">
                                <h5>All Awards</h5>
                                {allAwards.map((item, index) => (
                                    <div key={index} className="border p-3 rounded mb-3">
                                        <CRow className="g-3">
                                            <CCol md={3}>
                                                <CFormInput
                                                    type="date"
                                                    label="Date"
                                                    value={item.date || ''}
                                                    onChange={(e) => handleAllAwardsChange(index, 'date', e.target.value)}
                                                />
                                            </CCol>
                                            <CCol md={3}>
                                                <CFormInput
                                                    type="text"
                                                    label="Category"
                                                    value={item.category || ''}
                                                    onChange={(e) => handleAllAwardsChange(index, 'category', e.target.value)}
                                                />
                                            </CCol>
                                            <CCol md={3}>
                                                <CFormInput
                                                    type="text"
                                                    label="Award Name"
                                                    value={item.award_name || ''}
                                                    onChange={(e) => handleAllAwardsChange(index, 'award_name', e.target.value)}
                                                />
                                            </CCol>
                                            <CCol md={3}>
                                                <CFormInput
                                                    type="file"
                                                    label="Image"
                                                    accept="image/*"
                                                    onChange={(e) => handleAllAwardsImageChange(index, e.target.files[0])}
                                                />
                                                {(item.preview || item.image) && (
                                                    <img
                                                        src={
                                                            item.preview
                                                                ? item.preview
                                                                : `${API_PATH}/uploads/awards/${item.image}`
                                                        }
                                                        alt="Award"
                                                        style={{
                                                            width: '100px',
                                                            height: '70px',
                                                            marginTop: '5px',
                                                            borderRadius: '4px',
                                                            objectFit: 'cover',
                                                            border: '1px solid #ccc',
                                                        }}
                                                    />
                                                )}
                                            </CCol>
                                        </CRow>
                                        <CButton
                                            color="danger"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => removeAllAwards(index)}
                                        >
                                            Remove
                                        </CButton>
                                    </div>
                                ))}
                                <CButton color="success" size="sm" onClick={addAllAwards}>
                                    + Add Award
                                </CButton>
                            </div>

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
