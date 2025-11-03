import React, { useState, useEffect } from 'react'
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CBreadcrumb,
    CBreadcrumbItem,
} from '@coreui/react'
import { cilArrowLeft, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import api from '../../../../../../api/axiosInstance'
import API_PATH from '../../../../../../api/apiPath';
import { toast } from 'react-toastify'
import { AppSidebar, AppFooter, AppHeader } from '../../../../components/index'
import '../../../../../admin2/scss/style.scss'
import '../../../../../admin2/scss/examples.scss'
import '../../../../../admin2/scss/custom.css'


export default function EditMapping() {
    const navigate = useNavigate()
    const location = useLocation();
    const { id } = location.state || {};
    const [image, setImage] = useState(null)
    const [existingImage, setExistingImage] = useState('')
    const [locations, setLocations] = useState([{ state: '', location: '' }])
    const [loading, setLoading] = useState(true)

    // 🔹 Fetch existing mapping data
    useEffect(() => {
        const fetchMapping = async () => {
            try {
                const response = await api.get(`/mapping/get-mapping/${id}`)
                if (response.data.success) {
                    const mapping = response.data.banner // or response.data.data, check your key
                    setExistingImage(mapping.image)
                    setLocations(mapping.state_location || [])
                } else {
                    toast.error(response.data.message || 'Failed to fetch mapping data')
                }
            } catch (error) {
                console.error('Error fetching mapping:', error)
                toast.error('Error loading mapping data')
            } finally {
                setLoading(false)
            }
        }

        fetchMapping()
    }, [id])


    // ➕ Add new location
    const handleAddLocation = () => {
        setLocations([...locations, { state: '', location: '' }])
    }

    // ❌ Remove location
    const handleRemoveLocation = (index) => {
        const updated = [...locations]
        updated.splice(index, 1)
        setLocations(updated)
    }

    // ✏️ Update specific location
    const handleLocationChange = (index, field, value) => {
        const updated = [...locations]
        updated[index][field] = value
        setLocations(updated)
    }

    // ✅ Submit updated form
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('state_location', JSON.stringify(locations))
        formData.append('existing_image', existingImage)
        if (image) formData.append('image', image)

        try {
            const response = await api.put(`/mapping/update-mapping/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            if (response.data.success) {
                toast.success('Mapping updated successfully!')
                setTimeout(() => navigate('/admin/mapping'), 1000)
            } else {
                toast.error(response.data.message || 'Failed to update mapping')
            }
        } catch (error) {
            console.error('Error updating mapping:', error)
            toast.error('An error occurred while updating the mapping')
        }
    }

    if (loading) return <div className="text-center mt-5">Loading...</div>

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
                                    </Link> / Edit Mapping
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/mapping" className="text-decoration-none">
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

                            {/* Existing Image Preview */}
                            {existingImage && (
                                <CCol md={12}>
                                    <label className="form-label fw-bold">Current Image</label>
                                    <div>
                                        <img
                                            src={`${API_PATH}/uploads/about-banners/${existingImage}`}
                                            alt="Mapping"
                                            style={{ width: '150px', borderRadius: '8px' }}
                                        />
                                    </div>
                                </CCol>
                            )}

                            {/* New Image Upload */}
                            <CCol md={12}>
                                <CFormInput
                                    type="file"
                                    label="Replace Image (optional)"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </CCol>

                            {/* Dynamic Locations */}
                            <CCol md={12}>
                                <label className="form-label fw-bold">Locations</label>
                                {locations.map((loc, index) => (
                                    <div key={index} className="d-flex align-items-center gap-2 mb-2">
                                        <CFormInput
                                            type="text"
                                            placeholder="State"
                                            value={loc.state}
                                            onChange={(e) => handleLocationChange(index, 'state', e.target.value)}
                                            required
                                        />
                                        <CFormInput
                                            type="text"
                                            placeholder="Location"
                                            value={loc.location}
                                            onChange={(e) => handleLocationChange(index, 'location', e.target.value)}
                                            required
                                        />
                                        {locations.length > 1 && (
                                            <CButton color="danger" variant="outline" onClick={() => handleRemoveLocation(index)}>
                                                <CIcon icon={cilTrash} />
                                            </CButton>
                                        )}
                                    </div>
                                ))}
                                <CButton color="success" variant="outline" size="sm" onClick={handleAddLocation}>
                                    <CIcon icon={cilPlus} className="me-1" /> Add Location
                                </CButton>
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
    )
}
