import React, { useEffect, useState } from "react";
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../../components/index';
import '../../../../../admin2/scss/style.scss';
import '../../../../../admin2/scss/examples.scss';
import '../../../../../admin2/scss/custom.css';
import DataTable from 'react-data-table-component';
import { CBreadcrumb, CBreadcrumbItem, CButton, CBadge } from '@coreui/react';
import { Link } from 'react-router-dom';
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { toast } from 'react-toastify';
import api from '../../../../../../api/axiosInstance';
import API_PATH from '../../../../../../api/apiPath';

export default function SustainabilityList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            api.delete(`/sustainability/${id}`)
                .then(response => {
                    if (response.data.success) {
                        toast.success('Record deleted successfully');
                        setData(prev => prev.filter(item => item.id !== id));
                    } else {
                        toast.error(response.data.message || 'Failed to delete record');
                    }
                })
                .catch(err => {
                    console.error(err);
                    toast.error('Something went wrong!');
                });
        }
    };

    const columns = [
        { name: "S.No.", selector: (row, index) => index + 1, sortable: true, width: "80px" },
        {
            name: "Image",
            cell: (row) => (
                <img
                    src={`${API_PATH}/uploads/sustainability/${row.image}`}
                    alt={row.heading}
                    width="80"
                    style={{ borderRadius: "8px" }}
                />
            ),
        },
        { name: "Heading", selector: row => row.heading, sortable: true },
        { name: "Content", selector: row => row.content, sortable: false, wrap: true },
        {
            name: "Status",
            cell: row => (
                <CBadge color={row.status === 1 ? "success" : "danger"}>
                    {row.status === 1 ? "Active" : "Inactive"}
                </CBadge>
            ),
            sortable: true,
            width: "80px"
        },
        {
            name: "Action",
            cell: row => (
                <div className="d-flex gap-2">
                    <Link
                        to="/admin/edit-sustainability"
                        state={{ id: row.id }}
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
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/sustainability/getsustainability");
                if (response.data.success && response.data.records) {
                    setData(response.data.records);
                } else {
                    console.warn("Unexpected API response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching sustainability records:", error);
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
                                <CBreadcrumbItem style={{ textDecoration: 'none' }}>
                                    <Link to="/admin/dashboard" className='text-decoration-none'>Home</Link>/Sustainability
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-lg-6 d-flex align-items-center'>
                            <CBreadcrumb className="mx-3 mb-0">
                                <CBreadcrumbItem style={{ textDecoration: 'none' }}>Sustainability</CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/add-sustainability" className='text-decoration-none'>
                                <CButton className='custom-button text-white align-items-center d-flex gap-2'>
                                    <CIcon icon={cilPlus} size="lg" />
                                    Add Sustainability
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        progressPending={loading}
                    />
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
