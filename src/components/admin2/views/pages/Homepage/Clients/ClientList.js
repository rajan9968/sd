import React, { useEffect, useState } from "react";
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../../components/index'
import '../../../../../admin2/scss/style.scss'
import '../../../../../admin2/scss/examples.scss'
import '../../../../../admin2/scss/custom.css'
import DataTable from 'react-data-table-component';
import { CBreadcrumb, CBreadcrumbItem, CButton, CBadge } from '@coreui/react'
import { Link } from 'react-router-dom'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-toastify';
import axios from "axios";
import api from '../../../../../../api/axiosInstance';
import API_PATH from '../../../../../../api/apiPath';


export default function ClientList() {
    const [data, setData] = useState([]); // table data
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            api
                .delete(`/client-logos/getclient/${id}`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Business deleted successfully');
                        // Update table data immediately
                        setData(prev => prev.filter(banner => banner.id !== id));
                    } else {
                        toast.error(response.data.message || 'Failed to delete banner');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Something went wrong!');
                });
        }
    };



    // Define table columns based on your API structure
    const columns = [
        { name: "S.No.", selector: (row, index) => index + 1, sortable: true, width: "80px" },
        {
            name: "Image",
            cell: (row) => (
                <img
                    src={`${API_PATH}/uploads/client-logos/${row.image}`}
                    alt={row.heading}
                    width="80"
                    style={{ borderRadius: "8px" }}
                />
            ),
        },
        {
            name: "Status",
            cell: (row) => (
                <CBadge color={row.status === 1 ? "success" : "danger"}>
                    {row.status === 1 ? "Active" : "Inactive"}
                </CBadge>
            ),
            sortable: true,
            width: "80px"
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <Link
                        to="/admin/edit-client"
                        state={{ id: row.id }}  // 👈 Pass ID here
                    >
                        <CButton color="primary" variant="outline" size="sm">
                            <CIcon icon={cilPencil} />
                        </CButton>
                    </Link>
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
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    // Fetch banner data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/client-logos/getclient"); // your GET endpoint
                if (response.data.success && response.data.logos) {
                    setData(response.data.logos); // use 'logos' instead of 'businesses'
                } else {
                    console.warn("Unexpected API response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching client logos:", error);
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
                    <div className='row bg-white mx-1 mb-3 py-3 shadow-sm'>
                        <div className='col-lg-12 d-flex align-items-center'>
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem style={{ textDecoration: 'none' }}><Link to="/admin/dashboard" className='text-decoration-none'>Home</Link>/Clients</CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>

                    </div>
                    <div className='row mb-3'>
                        <div className='col-lg-6 d-flex align-items-center'>
                            <CBreadcrumb className=" mx-3 mb-0">
                                <CBreadcrumbItem style={{ textDecoration: 'none' }}>Clients</CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/add-client" className='text-decoration-none'>
                                <CButton className='custom-button text-white align-items-center d-flex gap-2'>
                                    <CIcon icon={cilPlus} size="lg" />
                                    Add Clients
                                </CButton>
                            </Link>
                        </div>

                    </div>
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination

                    />
                </div>
                <AppFooter />
            </div>
        </div>
    )
}
