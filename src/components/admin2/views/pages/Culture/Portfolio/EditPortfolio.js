import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CBreadcrumb,
    CBreadcrumbItem
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

export default function EditPortfolio() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    const [subHeading, setSubHeading] = useState('');
    const [heading, setHeading] = useState('');
    const [textOnImage, setTextOnImage] = useState('');
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState('');
    const [status, setStatus] = useState(1);
    const [loading, setLoading] = useState(true);

    // Fetch portfolio data by ID
    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await api.get(`/culture-portfolio/get-portfolio/${id}`);
                if (response.data.success && response.data.portfolio) {
                    const data = response.data.portfolio;
                    setSubHeading(data.sub_heading || '');
                    setHeading(data.heading || '');
                    setTextOnImage(data.text_on_image || '');
                    setStatus(data.status ?? 1);
                    setOldImage(data.image || '');
                } else {
                    toast.error('Failed to load portfolio data');
                }
            } catch (error) {
                console.error('Error fetching portfolio:', error);
                toast.error('Error loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('subHeading', subHeading);
        formData.append('textOnImage', textOnImage);
        formData.append('status', status);
        formData.append('image', image ? image : oldImage);



        try {
            const response = await api.put(`/culture-portfolio/update-portfolio/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast.success('Portfolio updated successfully!');
                setTimeout(() => {
                    navigate('/admin/culture-portfolio-list');
                }, 1000);
            } else {
                toast.error(response.data.message || 'Failed to update record');
            }
        } catch (error) {
            console.error('Error updating record:', error);
            toast.error('An error occurred while updating the record');
        }
    };

    if (loading) return <div className="p-3">Loading...</div>;

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
                                    / Edit Culture Portfolio
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/portfolio" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilArrowLeft} size="lg" />
                                    Back
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-3">
                        <CForm className="row g-3" onSubmit={handleSubmit}>
                            {/* Sub Heading */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Heading"
                                    value={subHeading}
                                    onChange={(e) => setSubHeading(e.target.value)}
                                    required
                                />
                            </CCol>



                            {/* Text on Image */}
                            <CCol md={12}>
                                <CFormInput
                                    type="text"
                                    label="Text on Image"
                                    value={textOnImage}
                                    onChange={(e) => setTextOnImage(e.target.value)}
                                />
                            </CCol>

                            {/* Image */}
                            <CCol md={6}>
                                <CFormInput
                                    type="file"
                                    label="Image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                {oldImage && (
                                    <div className="mt-2">
                                        <label>Current Image:</label>
                                        <div className="border p-2 rounded" style={{ width: '150px', height: 'auto' }}>
                                            <img
                                                src={`${API_PATH}/uploads/portfolio-images/${oldImage}`}
                                                alt="Current"
                                                className="img-fluid rounded"
                                            />
                                        </div>
                                    </div>
                                )}
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
