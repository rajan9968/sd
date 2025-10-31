import React, { useState } from 'react'
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CBreadcrumb,
    CBreadcrumbItem,
} from '@coreui/react'
import { cilArrowLeft, cilPlus, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../../../../../api/axiosInstance'
import { toast } from 'react-toastify'
import { AppSidebar, AppFooter, AppHeader } from '../../../../components/index'
import '../../../../../admin2/scss/style.scss'
import '../../../../../admin2/scss/examples.scss'
import '../../../../../admin2/scss/custom.css'

export default function AddMapping() {
    const navigate = useNavigate()
    const [image, setImage] = useState(null)
    const [status, setStatus] = useState(1)
    const [locations, setLocations] = useState([{ state: '', location: '' }]) // multiple pairs

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

    // ✏️ Update a specific location
    const handleLocationChange = (index, field, value) => {
        const updated = [...locations]
        updated[index][field] = value
        setLocations(updated)
    }

    // ✅ Submit form
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', image)
        formData.append('state_location', JSON.stringify(locations)) // ✅ must match backend name


        try {
            const response = await api.post('/mapping/add-mapping', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            if (response.data.success) {
                toast.success('Mapping created successfully!')
                setTimeout(() => navigate('/admin/mapping'), 1000)
            } else {
                toast.error(response.data.message || 'Failed to create mapping')
            }
        } catch (error) {
            console.error('Error creating mapping:', error)
            toast.error('An error occurred while creating the mapping')
        }
    }

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
                                    </Link> / Add Mapping
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="row mb-3">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/mappings" className="text-decoration-none">
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

                            {/* Image Upload */}
                            <CCol md={12}>
                                <CFormInput
                                    type="file"
                                    label="Upload Image"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    required
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
                                    Submit
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
