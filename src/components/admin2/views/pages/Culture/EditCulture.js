import React, { useState, useEffect } from 'react';
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../../../../api/axiosInstance';
import API_PATH from '../../../../../api/apiPath';
import { toast } from 'react-toastify';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import '../../../../admin2/scss/style.scss';
import '../../../../admin2/scss/examples.scss';
import '../../../../admin2/scss/custom.css';

export default function EditCulture() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    // ====== State Fields ======
    const [bannerSubHeading, setBannerSubHeading] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerPreview, setBannerPreview] = useState('');
    const [cultureSubHeading, setCultureSubHeading] = useState('');
    const [communitySubHeading, setCommunitySubHeading] = useState('');

    const [ourCultureItems, setOurCultureItems] = useState([]);
    const [communityItems, setCommunityItems] = useState([]);


    const [keySubHeading, setKeySubHeading] = useState('');
    const [keyImage, setKeyImage] = useState(null);
    const [keyPreview, setKeyPreview] = useState('');
    const [keyTextOnImage, setKeyTextOnImage] = useState('');

    // ✅ Employee Initiatives (Dynamic)
    const [employeeSubHeading, setEmployeeSubHeading] = useState('');
    const [employeeItems, setEmployeeItems] = useState([]);

    const [existingBannerImage, setExistingBannerImage] = useState('');
    const [existingKeyImage, setExistingKeyImage] = useState('');

    const [type, setType] = useState('single');
    const [status, setStatus] = useState(1);

    // ====== Fetch Data ======
    useEffect(() => {
        if (!id) return;

        const fetchCulture = async () => {
            try {
                const response = await api.get(`/culture/get-culture/${id}`);
                if (response.data.success && response.data.culture) {
                    const c = response.data.culture;
                    const BASE_URL = `${API_PATH}/uploads/about-banners/`;

                    setBannerSubHeading(c.banner_sub_heading || '');
                    if (c.banner_image) setBannerPreview(`${BASE_URL}${c.banner_image}`);
                    setExistingBannerImage(c.banner_image || '');

                    setCultureSubHeading(c.culture_sub_heading || '');
                    setCommunitySubHeading(c.community_sub_heading || '');
                    setOurCultureItems(
                        Array.isArray(c.our_culture)
                            ? c.our_culture
                            : c.our_culture
                                ? JSON.parse(c.our_culture)
                                : []
                    );

                    setCommunityItems(
                        Array.isArray(c.community_initiatives)
                            ? c.community_initiatives
                            : c.community_initiatives
                                ? JSON.parse(c.community_initiatives)
                                : []
                    );

                    setKeySubHeading(c.key_sub_heading || '');
                    if (c.key_image) setKeyPreview(`${BASE_URL}${c.key_image}`);
                    setExistingKeyImage(c.key_image || '');
                    setKeyTextOnImage(c.key_text_on_image || '');

                    setEmployeeSubHeading(c.employee_sub_heading || '');
                    setEmployeeItems(
                        Array.isArray(c.employee_initiatives)
                            ? c.employee_initiatives
                            : c.employee_initiatives
                                ? JSON.parse(c.employee_initiatives)
                                : []
                    );

                    setType(c.type || 'single');
                    setStatus(c.status || 1);
                } else {
                    toast.error('Culture data not found!');
                }
            } catch (error) {
                console.error('Error fetching culture:', error);
                toast.error('Failed to fetch culture details');
            }
        };

        fetchCulture();
    }, [id]);

    // ====== Handlers ======
    const handleCultureChange = (index, field, value) => {
        const updated = [...ourCultureItems];
        updated[index][field] = value;
        setOurCultureItems(updated);
    };
    const addCulture = () =>
        setOurCultureItems([...ourCultureItems, { sub_heading: '', description: '', image: null }]);
    const removeCulture = (index) =>
        setOurCultureItems(ourCultureItems.filter((_, i) => i !== index));

    const handleCommunityChange = (index, field, value) => {
        const updated = [...communityItems];
        updated[index][field] = value;
        setCommunityItems(updated);
    };
    const addCommunity = () =>
        setCommunityItems([
            ...communityItems,
            { sub_heading: '', heading: '', description: '', image: null },
        ]);
    const removeCommunity = (index) =>
        setCommunityItems(communityItems.filter((_, i) => i !== index));

    // ✅ Employee handlers
    const handleEmployeeChange = (index, field, value) => {
        const updated = [...employeeItems];
        updated[index][field] = value;
        setEmployeeItems(updated);
    };
    const addEmployee = () =>
        setEmployeeItems([...employeeItems, { heading: '', description: '', image: null }]);
    const removeEmployee = (index) =>
        setEmployeeItems(employeeItems.filter((_, i) => i !== index));

    // ====== Submit ======
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('banner_sub_heading', bannerSubHeading);
        formData.append('culture_sub_heading', cultureSubHeading);
        formData.append('community_sub_heading', communitySubHeading);

        // ===== Banner Image =====
        if (bannerImage) formData.append('banner_image', bannerImage);
        else formData.append('existing_banner_image', existingBannerImage);

        // ===== Our Culture =====
        formData.append('our_culture', JSON.stringify(ourCultureItems));
        ourCultureItems.forEach((item, i) => {
            if (item.image && item.image instanceof File) {
                formData.append(`our_culture_image_${i}`, item.image);
            }
        });

        // ===== Community Initiatives =====
        formData.append('community_initiatives', JSON.stringify(communityItems));
        communityItems.forEach((item, i) => {
            if (item.image && item.image instanceof File) {
                formData.append(`community_image_${i}`, item.image);
            }
        });

        // ===== Key Section =====
        formData.append('key_sub_heading', keySubHeading);
        if (keyImage) formData.append('key_image', keyImage);
        else formData.append('existing_key_image', existingKeyImage);
        formData.append('key_text_on_image', keyTextOnImage);

        // ✅ Employee Initiatives (fixed)
        formData.append('employee_sub_heading', employeeSubHeading);
        formData.append(
            'employee_initiatives',
            JSON.stringify(
                employeeItems.map((item) => {
                    let existingImage = null;

                    // 🧩 If existing image is a URL, extract filename only
                    if (item.image && !(item.image instanceof File)) {
                        const parts = item.image.split('/');
                        existingImage = parts[parts.length - 1];
                    }

                    return {
                        heading: item.heading,
                        description: item.description,
                        existing_image: existingImage,
                    };
                })
            )
        );

        // 🧩 Add new image files (if replaced)
        employeeItems.forEach((item, i) => {
            if (item.image && item.image instanceof File) {
                formData.append(`employee_image_${i}`, item.image);
            }
        });

        // ===== Other Data =====
        formData.append('type', type);
        formData.append('status', status);

        try {
            const response = await api.put(`/culture/update-culture/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Culture updated successfully!');
                setTimeout(() => navigate('/admin/cultures'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to update culture');
            }
        } catch (error) {
            console.error('Error updating culture:', error);
            toast.error('An error occurred while updating culture');
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
                                    / Edit Culture
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/cultures" className="text-decoration-none">
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
                            {/* Banner Section */}
                            <h5 className="fw-bold mt-3">Banner Section</h5>
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Banner Sub Heading"
                                    value={bannerSubHeading}
                                    onChange={(e) => setBannerSubHeading(e.target.value)}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Banner Image"
                                    onChange={(e) => setBannerImage(e.target.files[0])}
                                />
                                {bannerPreview && (
                                    <img
                                        src={bannerPreview}
                                        alt="Preview"
                                        className="mt-2"
                                        style={{ width: '100px', borderRadius: '5px' }}
                                    />
                                )}
                            </CCol>

                            {/* Our Culture Section */}
                            <h5 className="fw-bold mt-3">Our Culture</h5>
                            <CFormInput
                                type="text"
                                label="Culture Sub Heading"
                                value={cultureSubHeading}
                                onChange={(e) => setCultureSubHeading(e.target.value)}
                            />
                            {ourCultureItems.map((item, index) => (
                                <div key={index} className="border rounded p-3 mb-3">
                                    <div className="row g-3">

                                        <CCol md={12}>
                                            <CFormInput
                                                type="file"
                                                label="Image"
                                                onChange={(e) =>
                                                    handleCultureChange(index, 'image', e.target.files[0])
                                                }
                                            />
                                            {item.image && typeof item.image === 'string' && (
                                                <img
                                                    src={`${API_PATH}/uploads/about-banners/${item.image}`}
                                                    alt="Preview"
                                                    className="mt-2"
                                                    style={{ width: '80px' }}
                                                />
                                            )}
                                        </CCol>
                                        <CCol md={12}>
                                            <CFormTextarea
                                                label="Description"
                                                rows="3"
                                                value={item.description}
                                                onChange={(e) =>
                                                    handleCultureChange(index, 'description', e.target.value)
                                                }
                                            />
                                        </CCol>
                                    </div>
                                    {ourCultureItems.length > 1 && (
                                        <div className="mt-2 text-end">
                                            <CButton color="danger" onClick={() => removeCulture(index)}>
                                                <CIcon icon={cilMinus} /> Remove
                                            </CButton>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <CButton color="success" onClick={addCulture} type="button">
                                <CIcon icon={cilPlus} /> Add Our Culture
                            </CButton>

                            {/* Community Initiatives */}
                            <h5 className="fw-bold mt-4">Community Initiatives</h5>
                            <CFormInput
                                type="text"
                                label="Community Sub Heading"
                                value={communitySubHeading}
                                onChange={(e) => setCommunitySubHeading(e.target.value)}
                            />
                            {communityItems.map((item, index) => (
                                <div key={index} className="border rounded p-3 mb-3">
                                    <div className="row g-3">

                                        <CCol md={12}>
                                            <CFormInput
                                                type="text"
                                                label="Community Heading"
                                                value={item.heading}
                                                onChange={(e) =>
                                                    handleCommunityChange(index, 'heading', e.target.value)
                                                }
                                            />
                                        </CCol>
                                        <CCol md={4}>
                                            <CFormInput
                                                type="file"
                                                label="Community Image"
                                                onChange={(e) =>
                                                    handleCommunityChange(index, 'image', e.target.files[0])
                                                }
                                            />
                                            {item.image && typeof item.image === 'string' && (
                                                <img
                                                    src={`${API_PATH}/uploads/about-banners/${item.image}`}
                                                    alt="Preview"
                                                    className="mt-2"
                                                    style={{ width: '80px' }}
                                                />
                                            )}
                                        </CCol>
                                        <CCol md={12}>
                                            <CFormTextarea
                                                label="Community Description"
                                                rows="3"
                                                value={item.description}
                                                onChange={(e) =>
                                                    handleCommunityChange(index, 'description', e.target.value)
                                                }
                                            />
                                        </CCol>
                                    </div>
                                    {communityItems.length > 1 && (
                                        <div className="mt-2 text-end">
                                            <CButton color="danger" onClick={() => removeCommunity(index)}>
                                                <CIcon icon={cilMinus} /> Remove
                                            </CButton>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <CButton color="success" onClick={addCommunity} type="button">
                                <CIcon icon={cilPlus} /> Add Community Initiative
                            </CButton>

                            {/* ✅ Employee Initiatives Section */}
                            <h5 className="fw-bold mt-4">Employee Initiatives</h5>
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Employee Sub Heading"
                                    value={employeeSubHeading}
                                    onChange={(e) => setEmployeeSubHeading(e.target.value)}
                                />
                            </CCol>
                            {employeeItems.map((item, index) => (
                                <div key={index} className="border rounded p-3 mb-3">
                                    <div className="row g-3">
                                        <CCol md={4}>
                                            <CFormInput
                                                type="text"
                                                label="Heading"
                                                value={item.heading}
                                                onChange={(e) =>
                                                    handleEmployeeChange(index, 'heading', e.target.value)
                                                }
                                            />
                                        </CCol>
                                        <CCol md={4}>
                                            <CFormInput
                                                type="file"
                                                label="Image"
                                                onChange={(e) =>
                                                    handleEmployeeChange(index, 'image', e.target.files[0])
                                                }
                                            />
                                            {item.image && typeof item.image === 'string' && (
                                                <img
                                                    src={`${API_PATH}/uploads/about-banners/${item.image}`}
                                                    alt="Preview"
                                                    className="mt-2"
                                                    style={{ width: '80px' }}
                                                />
                                            )}
                                        </CCol>
                                        <CCol md={12}>
                                            <CFormTextarea
                                                label="Description"
                                                rows="3"
                                                value={item.description}
                                                onChange={(e) =>
                                                    handleEmployeeChange(index, 'description', e.target.value)
                                                }
                                            />
                                        </CCol>
                                    </div>
                                    {employeeItems.length > 1 && (
                                        <div className="mt-2 text-end">
                                            <CButton color="danger" onClick={() => removeEmployee(index)}>
                                                <CIcon icon={cilMinus} /> Remove
                                            </CButton>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <CButton color="success" onClick={addEmployee} type="button">
                                <CIcon icon={cilPlus} /> Add Employee Initiative
                            </CButton>


                            <CCol md={12}>
                                <CFormSelect
                                    label="Status"
                                    value={status}
                                    onChange={(e) => setStatus(Number(e.target.value))}
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </CFormSelect>
                            </CCol>

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
