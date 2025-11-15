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

export default function EditKeyManagement() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [facebook, setFacebook] = useState('');
    const [insta, setInsta] = useState('');
    const [linked, setLinked] = useState('');
    const [designation, setDesignation] = useState('');
    const [twitter, setTwitter] = useState('');
    const [key, setKey] = useState('');
    const [status, setStatus] = useState(1);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');

    useEffect(() => {
        // Fetch existing Key Management data
        const fetchData = async () => {
            try {
                const response = await api.get(`/management/key-management/${id}`);
                if (response.data.success && response.data.data) {
                    const record = response.data.data;
                    setName(record.name);
                    setDesc(record.desc);
                    setFacebook(record.facebook || '');
                    setInsta(record.instagram || '');
                    setDesignation(record.designation || '');
                    setLinked(record.linkedin || '');
                    setTwitter(record.twitter || '');
                    setKey(record.key_status || '');
                    setStatus(record.status);
                    setExistingImage(record.image);
                } else {
                    toast.error('Failed to load details');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error loading details');
            }
        };
        fetchData();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('desc', desc);
        formData.append('facebook', facebook);
        formData.append('insta', insta);
        formData.append('linked', linked);
        formData.append('twitter', twitter);
        formData.append('key_status', key);
        formData.append('status', status);
        formData.append('designation', designation);
        if (image) formData.append('image', image);

        try {
            const response = await api.put(`/management/key-management/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Key Management record updated successfully!');
                setTimeout(() => navigate('/admin/management'), 1000);
            } else {
                toast.error(response.data.message || 'Failed to update record');
            }
        } catch (error) {
            console.error('Error updating record:', error);
            toast.error('An error occurred while updating');
        }
    };

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    <div className="row bg-white mx-1 mb-3 py-3 shadow-sm">
                        <div className="col-lg-12 d-flex align-items-center">
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className="text-decoration-none">
                                        Home
                                    </Link>
                                    / Edit Key Management
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/key-management" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-3">
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Description"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    required
                                />
                            </CCol>



                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Designation"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    required
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Facebook URL"
                                    value={facebook}
                                    onChange={(e) => setFacebook(e.target.value)}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Instagram URL"
                                    value={insta}
                                    onChange={(e) => setInsta(e.target.value)}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="LinkedIn URL"
                                    value={linked}
                                    onChange={(e) => setLinked(e.target.value)}
                                />
                            </CCol>

                            <CCol md={6}>
                                <CFormInput
                                    type="text"
                                    label="Twitter URL"
                                    value={twitter}
                                    onChange={(e) => setTwitter(e.target.value)}
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormSelect
                                    label="Key Status"
                                    name="key"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    required
                                >
                                    <option value="">Select Key Status</option>
                                    <option value="Key Management">Key Management</option>
                                    <option value="Advisors">Advisors</option>
                                    <option value="Head of Department">Head of Department</option>
                                </CFormSelect>
                            </CCol>


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
                                <CFormInput
                                    type="file"
                                    label="Image"
                                    onChange={handleImageChange}
                                />

                                {existingImage && !previewImage && (
                                    <div className="mt-2">
                                        <p className="text-muted mb-1">Current Image:</p>
                                        <img
                                            src={`${API_PATH}/uploads/key-management/${existingImage}`}
                                            alt="Current"
                                            width="150"
                                            className="rounded shadow-sm"
                                        />
                                    </div>
                                )}

                                {previewImage && (
                                    <div className="mt-2">
                                        <p className="text-muted mb-1">New Image Preview:</p>
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            width="150"
                                            className="rounded shadow-sm"
                                        />
                                    </div>
                                )}
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
