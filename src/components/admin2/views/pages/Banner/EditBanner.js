import React, { useState, useEffect } from 'react';
import { CButton, CCol, CForm, CFormInput, CBreadcrumb, CBreadcrumbItem, CFormSelect } from '@coreui/react';
import { cilArrowLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import '../../../../admin2/scss/style.scss';
import '../../../../admin2/scss/examples.scss';
import '../../../../admin2/scss/custom.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../../../../api/axiosInstance';
import API_PATH from '../../../../../api/apiPath';
import { toast } from 'react-toastify';

export default function EditBanner() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [heading, setHeading] = useState('');
    const [subheading, setSubheading] = useState('');
    const [contentNumberList, setContentNumberList] = useState([{ content: '', number: '' }]);
    const [status, setStatus] = useState('');
    const [image, setImage] = useState(null);
    const [bannerImage, setBannerImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    // ✅ Fetch banner data
    useEffect(() => {
        if (id) {
            api
                .get(`/banners/banners/${id}`)
                .then((res) => {
                    const banner = res.data.banner;
                    setHeading(banner.heading);
                    setSubheading(banner.subheading);
                    setBannerImage(banner.image);
                    setStatus(banner.status);

                    // ✅ Try parsing content as JSON
                    try {
                        const parsed = JSON.parse(banner.content);
                        if (Array.isArray(parsed)) {
                            setContentNumberList(parsed);
                        } else {
                            setContentNumberList([{ content: banner.content || '', number: banner.number || '' }]);
                        }
                    } catch {
                        setContentNumberList([{ content: banner.content || '', number: banner.number || '' }]);
                    }
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    // ✅ Add / Remove / Update content-number pairs
    const handleAddContentNumber = () => {
        setContentNumberList([...contentNumberList, { content: '', number: '' }]);
    };

    const handleRemoveContentNumber = (index) => {
        const updatedList = contentNumberList.filter((_, i) => i !== index);
        setContentNumberList(updatedList);
    };

    const handleChange = (index, field, value) => {
        const updatedList = [...contentNumberList];
        updatedList[index][field] = value;
        setContentNumberList(updatedList);
    };

    // ✅ Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('subheading', subheading);
        formData.append('content', JSON.stringify(contentNumberList));
        formData.append('status', status);
        if (image) formData.append('image', image);

        api
            .put(`/banners/banners/${id}`, formData)
            .then((response) => {
                if (response.data.success) {
                    toast.success('Banner updated successfully');
                    setTimeout(() => {
                        navigate('/admin/banner');
                    }, 1000);
                } else {
                    toast.error(response.data.message || 'Failed to update banner');
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    {/* Breadcrumbs */}
                    <div className="row bg-white mx-1 mb-3 py-3 shadow-sm">
                        <div className="col-lg-12 d-flex align-items-center">
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem style={{ textDecoration: 'none' }}>
                                    <Link to="/admin/dashboard" className="text-decoration-none">Home</Link>/Edit Banner
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="row mb-3">
                        <div className="col-lg-6">
                            <CBreadcrumb className="mx-3 mb-4">
                                <CBreadcrumbItem style={{ textDecoration: 'none' }}></CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/banner" className="text-decoration-none">
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
                            <div className="col-lg-6">
                                <CCol md={12}>
                                    <CFormInput
                                        type="text"
                                        label="Heading"
                                        value={heading}
                                        onChange={(e) => setHeading(e.target.value)}
                                    />
                                </CCol>
                            </div>
                            <div className="col-lg-6">
                                <CCol md={12}>
                                    <CFormInput
                                        type="text"
                                        label="Sub Heading"
                                        value={subheading}
                                        onChange={(e) => setSubheading(e.target.value)}
                                    />
                                </CCol>
                            </div>

                            <div className="col-lg-12">


                                <CCol md={12}>
                                    <CFormInput
                                        type="file"
                                        label="Image Carousel"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </CCol>

                                <CCol md={12}>
                                    <label className="form-label">Old Image Carousel</label>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '110px',
                                            border: '1px solid #ccc',
                                            borderRadius: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                            marginBottom: '10px',
                                            backgroundColor: '#f8f9fa',
                                        }}
                                    >
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Selected Banner"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : bannerImage ? (
                                            <img
                                                src={`${API_PATH}/uploads/${bannerImage}`}
                                                alt="Current Banner"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </div>
                                </CCol>

                            </div>
                            <div className="col-lg-12">
                                {/* ✅ Dynamic Content + Number fields */}
                                {contentNumberList.map((item, index) => (
                                    <div key={index} className="border p-3 mb-3 rounded">
                                        <CCol md={12}>
                                            <CFormInput
                                                type="text"
                                                label={`Content ${index + 1}`}
                                                value={item.content}
                                                onChange={(e) => handleChange(index, 'content', e.target.value)}
                                            />
                                        </CCol>
                                        <CCol md={12}>
                                            <CFormInput
                                                type="text"
                                                label={`Number ${index + 1}`}
                                                value={item.number}
                                                onChange={(e) => handleChange(index, 'number', e.target.value)}
                                            />
                                        </CCol>

                                        <div className="mt-2 d-flex justify-content-end">
                                            {contentNumberList.length > 1 && (
                                                <CButton
                                                    color="danger"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleRemoveContentNumber(index)}
                                                >
                                                    Remove
                                                </CButton>
                                            )}
                                            {index === contentNumberList.length - 1 && (
                                                <CButton color="success" size="sm" onClick={handleAddContentNumber}>
                                                    + Add
                                                </CButton>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <CCol md={12}>
                                    <CFormSelect
                                        label="Status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </CFormSelect>
                                </CCol>
                            </div>

                            <CCol xs={12}>
                                <CButton color="primary" type="submit">
                                    Update Banner
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
