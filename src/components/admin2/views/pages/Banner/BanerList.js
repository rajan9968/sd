import React, { useEffect, useState } from "react";
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index'
import '../../../../admin2/scss/style.scss'
import '../../../../admin2/scss/examples.scss'
import '../../../../admin2/scss/custom.css'
import DataTable from 'react-data-table-component';
import { CBreadcrumb, CBreadcrumbItem, CButton, CBadge } from '@coreui/react'
import { Link } from 'react-router-dom'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-toastify';
import api from '../../../../../api/axiosInstance';
import API_PATH from '../../../../../api/apiPath';



export default function BanerList() {
    const [data, setData] = useState([]); // table data
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            api
                .delete(`/banners/banners/${id}`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Banner deleted successfully');
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
        { name: "Heading", selector: (row) => row.heading, sortable: true },
        { name: "Subheading", selector: (row) => row.subheading },
        {
            name: "Content & Numbers",
            cell: (row) => {
                let items = [];
                try {
                    // Safely parse JSON stored in the DB
                    items = JSON.parse(row.content || "[]");
                } catch (err) {
                    console.error("Invalid JSON for banner content:", row.content);
                }

                // If array is empty, show fallback
                if (!Array.isArray(items) || items.length === 0) {
                    return <span className="text-muted">No items</span>;
                }

                return (
                    <ul className="mb-0 ps-3">
                        {items.map((item, i) => (
                            <li key={i}>
                                <strong>{item.content}</strong> — {item.number}
                            </li>
                        ))}
                    </ul>
                );
            },
        },
        {
            name: "Image",
            cell: (row) => (
                <img
                    src={`${API_PATH}/uploads/${row.image}`}
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
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <Link
                        to="/admin/edit-banner"
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
                const response = await api.get("/banners/getbanners");
                if (response.data.success && response.data.banners) {
                    setData(response.data.banners);
                } else {
                    console.warn("Unexpected API response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
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
                                <CBreadcrumbItem style={{ textDecoration: 'none' }}><Link to="/admin/dashboard" className='text-decoration-none'>Home</Link>/Banner</CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>

                    </div>
                    <div className='row mb-3'>
                        <div className='col-lg-6 d-flex align-items-center'>
                            <CBreadcrumb className=" mx-3 mb-0">
                                <CBreadcrumbItem style={{ textDecoration: 'none' }}>Banners</CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/add-banner" className='text-decoration-none'>
                                <CButton className='custom-button text-white align-items-center d-flex gap-2'>
                                    <CIcon icon={cilPlus} size="lg" />
                                    Add Banner
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
