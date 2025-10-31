import React, { useEffect, useState } from "react";
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../../components/index';
import '../../../../../admin2/scss/style.scss';
import '../../../../../admin2/scss/examples.scss';
import '../../../../../admin2/scss/custom.css';
import DataTable from 'react-data-table-component';
import { CBreadcrumb, CBreadcrumbItem, CButton } from '@coreui/react';
import { Link } from 'react-router-dom';
import { cilPlus, cilTrash, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { toast } from 'react-toastify';
import api from '../../../../../../api/axiosInstance';
import API_PATH from '../../../../../../api/apiPath';

export default function AboutBannerList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Delete handler
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            api
                .delete(`/mapping/delete-mapping/${id}`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Deleted successfully');
                        setData(prev => prev.filter(item => item.id !== id));
                    } else {
                        toast.error(response.data.message || 'Failed to delete');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Something went wrong!');
                });
        }
    };

    // ✅ Table columns (only Image, Locations)
    const columns = [
        {
            name: "Image",
            cell: (row) =>
                row.image ? (
                    <img
                        src={`${API_PATH}/uploads/about-banners/${row.image}`}
                        alt="Banner"
                        style={{
                            width: "80px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "8px",
                        }}
                    />
                ) : (
                    <span>No Image</span>
                ),
            width: "120px",
        },
        {
            name: "Locations",
            cell: (row) => (
                <ul className="mb-0 ps-3">
                    {Array.isArray(row.state_location) && row.state_location.length > 0 ? (
                        row.state_location.map((loc, i) => (
                            <li key={i}>
                                <strong>{loc.state}</strong> – {loc.location}
                            </li>
                        ))
                    ) : (
                        <li>No locations</li>
                    )}
                </ul>
            ),
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex gap-2">
                    {/* ✏️ Edit Button */}
                    <Link to="/admin/edit-mapping" state={{ id: row.id }}>
                        <CButton color="primary" variant="outline" size="sm">
                            <CIcon icon={cilPencil} />
                        </CButton>
                    </Link>

                    {/* 🗑️ Delete Button */}
                    <CButton
                        color="danger"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(row.id)}
                    >
                        <CIcon icon={cilTrash} />
                    </CButton>
                </div>
            ),
            width: "120px",
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }

    ];

    // ✅ Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/mapping/get-mappings");
                if (response.data.success && response.data.banners) {
                    setData(response.data.banners);
                } else {
                    console.warn("Unexpected API response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    return (
        <div>
            <AppSidebar />

            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    {/* Breadcrumb */}
                    <div className='row bg-white mx-1 mb-3 py-3 shadow-sm'>
                        <div className='col-lg-12 d-flex align-items-center'>
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className='text-decoration-none'>
                                        Home
                                    </Link>/Mapping List
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Add Button */}
                    <div className='row mb-3'>
                        <div className='col-lg-6'></div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/add-mapping" className='text-decoration-none'>
                                <CButton className='custom-button text-white align-items-center d-flex gap-2'>
                                    <CIcon icon={cilPlus} size="lg" />
                                    Add Mapping
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    {/* DataTable */}
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        progressPending={loading}
                        highlightOnHover
                    />
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
